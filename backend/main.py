import uvicorn
import torch
from PIL import Image, ImageDraw, ImageFont
import tensorflow as tf
import numpy as np
import cv2
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tensorflow.keras.preprocessing import image
from ultralytics import YOLO
import matplotlib.pyplot as plt
import io
import aiohttp

# FastAPI app initialization
app = FastAPI()

# Load YOLO model
yolo_model = YOLO('yolov8x.pt')

# Load your custom bird species classification model
classification_model = tf.keras.models.load_model("Model_V3_7525.h5")

# Define the class names corresponding to your classification model
class_names = ['Ashy crowned sparrow lark', 'Asian Openbill', 'Black-headed ibis', 'Crow', 'Eurasian Coot',
               'Indian Roller', 'Large-billed Crow', 'Little Cormorant', 'Paddyfield pipit', 'Painted Stork',
               'Red-wattled lapwing', 'Spot-billed Pelican', 'White-breasted Waterhen', 'Yellow wattled lapwing']

# Define a request body model for image URL


class ImageURL(BaseModel):
    image_url: str

# Helper function to fetch image from a URL


async def fetch_image_from_url(image_url: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(image_url) as response:
            if response.status != 200:
                raise HTTPException(status_code=404, detail="Image not found")
            image_data = await response.read()
            image = Image.open(io.BytesIO(image_data)).convert(
                'RGB')  # Open the image as RGB
            return np.array(image)  # Convert it to a NumPy array

# Preprocess the image for classification


def preprocess_image_for_classification(cropped_img):
    cropped_img = cropped_img.resize((224, 224))  # Resize to model input size
    img_array = image.img_to_array(cropped_img)
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions
    return img_array

# Draw text with a background


def draw_text_with_background(draw, text, position, font_size=48):
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text_bbox = draw.textbbox(position, text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    padding = 8
    background_bbox = [
        position[0] - padding,
        position[1] - padding,
        position[0] + text_width + padding,
        position[1] + text_height + padding
    ]
    # Semi-transparent black background
    draw.rectangle(background_bbox, fill=(0, 0, 0, 180))
    draw.text(position, text, fill='white', font=font)

# Route to accept an image URL and predict bird presence


@app.post("/predict/")
async def predict_bird_in_image(data: ImageURL):
    # Fetch the image from the provided URL
    img = await fetch_image_from_url(data.image_url)

    # Perform inference using YOLO model
    results = yolo_model(img)

    # Extract detected classes
    detected_classes = [det.boxes.cls.numpy()
                        for det in results if det.boxes is not None]

    # Check if class 14 ("bird") is detected
    is_bird_detected = any(14 in cls for cls in detected_classes)

    return {"isBird": is_bird_detected}

# Route to accept an image URL and classify birds


@app.post("/classify/")
async def classify_bird_in_image(data: ImageURL):
    # Fetch the image from the provided URL
    img = await fetch_image_from_url(data.image_url)

    # Convert to PIL image for further processing
    img_pil = Image.fromarray(img)

    # Detect bird presence using YOLO
    results = yolo_model(img_pil)
    classified_birds = []
    bird_class_index = 14

    if results:
        for det in results:
            if det.boxes is not None:
                boxes = det.boxes.xyxy.numpy()
                classes = det.boxes.cls.numpy()

                for box, cls in zip(boxes, classes):
                    if cls == bird_class_index:
                        # Draw bounding box
                        draw = ImageDraw.Draw(img_pil)
                        draw.rectangle([box[0], box[1], box[2], box[3]],
                                       outline=(255, 0, 0), width=5)

                        # Crop the bird region for classification
                        cropped_img = img_pil.crop(
                            (box[0], box[1], box[2], box[3]))

                        # Classify the bird species
                        img_array = preprocess_image_for_classification(
                            cropped_img)
                        predictions = classification_model.predict(
                            img_array, verbose=0)
                        predicted_class_index = np.argmax(predictions, axis=1)
                        predicted_class_name = class_names[predicted_class_index[0]]

                        # Add the predicted class name to the list
                        classified_birds.append(predicted_class_name)

                        # Add label above the bounding box
                        text_position = (int(box[0]), max(0, int(box[1] - 35)))
                        draw_text_with_background(
                            draw, predicted_class_name, text_position)

    if not classified_birds:
        return {"message": "No birds detected"}

    # Save the processed image temporarily
    img_pil.save('classified_image.jpg')

    return {
        "classified_birds": classified_birds,
        "message": f"Classified {len(classified_birds)} bird(s). Output saved as 'classified_image.jpg'"
    }
