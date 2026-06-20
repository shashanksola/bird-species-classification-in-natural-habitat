import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from ultralytics import YOLO
import aiohttp
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import io
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import json

# Initialize FastAPI app
app = FastAPI()

# Load YOLOv8 pretrained model for bird detection
yolo_model = YOLO("yolov8x.pt")  # Pretrained model (COCO dataset)
bird_class_index = 14  # Bird class ID in COCO dataset

# Load the custom classification model for bird species
classification_model = tf.keras.models.load_model("Model_V3_7525.h5")

class_names = [
    'Ashy crowned sparrow lark', 'Asian Openbill', 'Black-headed ibis', 'Crow',
    'Eurasian Coot', 'Indian Roller', 'Large-billed Crow', 'Little Cormorant',
    'Paddyfield pipit', 'Painted Stork', 'Red-wattled lapwing', 'Spot-billed Pelican',
    'White-breasted Waterhen', 'Yellow wattled lapwing'
]

# Define request body schema
class ImageURL(BaseModel):
    image_url: str

# Helper function to fetch image from a URL
async def fetch_image_from_url(image_url: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(image_url) as response:
            if response.status != 200:
                raise HTTPException(status_code=404, detail="Image not found")
            image_data = await response.read()
            img = Image.open(io.BytesIO(image_data)).convert('RGB')
            return np.array(img)

# Preprocess the image for classification
def preprocess_image_for_classification(cropped_img):
    cropped_img = cropped_img.resize((224, 224))  # Resize to model input size
    img_array = image.img_to_array(cropped_img)
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions
    img_array /= 255.0  # Normalize pixel values
    return img_array

# Draw text with a background on the image
def draw_text_with_background(draw, text, position, font_size=24):
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

# Route to detect birds in an image
@app.post("/predict/")
async def predict_bird_in_image(data: ImageURL):
    # Fetch the image from the provided URL
    img = await fetch_image_from_url(data.image_url)

    # Perform detection using YOLOv8 model
    results = yolo_model.predict(img)
    # Extract detected class IDs
    detected_classes = results[0].boxes.cls.numpy()

    # Check if a bird is detected
    bird_count = sum(1 for cls in detected_classes if cls == bird_class_index)
    if bird_count > 0:
        return {"isBird": True, "birdCount": bird_count}
    else:
        return {"isBird": False, "birdCount": 0}

# Route to classify bird species in an image
@app.post("/classify/")
async def classify_bird_in_image(data: ImageURL):
    # Fetch the image from the provided URL
    img = await fetch_image_from_url(data.image_url)

    # Convert to PIL image for further processing
    img_pil = Image.fromarray(img)

    # Detect bird presence using YOLOv8
    results = yolo_model.predict(img_pil)
    detected_boxes = results[0].boxes.xyxy.numpy()  # Extract bounding boxes
    detected_classes = results[0].boxes.cls.numpy()

    classified_birds = []
    draw = ImageDraw.Draw(img_pil)
    for box, cls in zip(detected_boxes, detected_classes):
        if cls == bird_class_index:  # Check if class is a bird
            # Crop the bird region for classification
            x1, y1, x2, y2 = map(int, box)
            cropped_img = img_pil.crop((x1, y1, x2, y2))

            # Preprocess and classify
            img_array = preprocess_image_for_classification(cropped_img)
            predictions = classification_model.predict(img_array, verbose=0)
            predicted_class_index = np.argmax(predictions, axis=1)[0]
            predicted_class_name = class_names[predicted_class_index]

            # Save the classification result
            classified_birds.append(predicted_class_name)

            # Annotate the image
            draw.rectangle([x1, y1, x2, y2], outline=(255, 0, 0), width=3)
            draw_text_with_background(
                draw, predicted_class_name, (x1, y1 - 30))

    # Save the annotated image locally
    img_pil.save("classified_image.jpg")

    if not classified_birds:
        return {"message": "No birds detected"}

    return {
        "classified_birds": classified_birds,
        "message": f"Classified {len(classified_birds)} bird(s). Annotated image saved as 'classified_image.jpg'"
    }

# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)