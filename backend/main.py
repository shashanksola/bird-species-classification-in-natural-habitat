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

class_names_extended = class_names + ['None']

# Define a request body model for image URL


class ImageURL(BaseModel):
    image_url: str


class PredictionRequest(BaseModel):
    image_url: str
    selected_class1_name: str
    selected_class2_name: str
    selected_class1_value: int
    selected_class2_value: int


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


def preprocess_image(img_np):
    img = Image.fromarray(img_np).convert('RGB')
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
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


def bayesian_update(prior_probs, likelihoods):
    numerators = likelihoods * prior_probs
    denominator = np.sum(numerators)
    if denominator == 0:
        return np.zeros_like(numerators)
    return numerators / denominator


@app.post("/get-probabilities/")
async def bayesian_classify_image(data: ImageURL):
    img = await fetch_image_from_url(data.image_url)

    img_array = preprocess_image(img)

    predictions = classification_model.predict(img_array)

    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_names[predicted_class_index]

    print(f"Predicted class index: {predicted_class_index}")
    print(f"Predicted class name: {predicted_class_name}\n")

    print("Initial Prediction Probabilities:")
    for i, prob in enumerate(predictions[0]):
        print(f"{class_names[i]}: {prob:.4f}")

    top_2_indices = np.argsort(predictions[0])[-2:][::-1]
    top_2_predictions = [
        {"class": class_names[i], "probability": predictions[0][i]}
        for i in top_2_indices
    ]

    print("\nTop 2 Predictions:")
    for pred in top_2_predictions:
        print(f"{pred['class']}: {pred['probability']:.4f}")

    idx_1 = class_names.index(top_2_predictions[0]["class"])
    idx_2 = class_names.index(top_2_predictions[1]["class"])

    images = []

    for i in range(1, 4):
        images.append(
            "https://bird-species.s3.ap-south-1.amazonaws.com/output_folder/{index}_{sub}.JPG".format(index=idx_1, sub=i))
        images.append(
            "https://bird-species.s3.ap-south-1.amazonaws.com/output_folder/{index}_{sub}.JPG".format(index=idx_2, sub=i))

    return {
        "classIndex": int(predicted_class_index),
        "className": predicted_class_name,
        "topPrediction1_class": top_2_predictions[0]["class"],
        "topPrediction1_probability": float(top_2_predictions[0]["probability"]),
        "topPrediction2_class": top_2_predictions[1]["class"],
        "topPrediction2_probability": float(top_2_predictions[1]["probability"]),
        "images": images
    }


@app.post("/get-adjusted-predictions/")
async def get_adjusted_predictions(data: PredictionRequest):
    user_selected_classes = {
        data.selected_class1_name: data.selected_class1_value,
        data.selected_class2_name: data.selected_class2_value
    }

    img = await fetch_image_from_url(data.image_url)
    img_array = preprocess_image(img)

    predictions = classification_model.predict(img_array)
    prior_probs = predictions[0]

    prior_probs = np.append(prior_probs, 0.0)

    initial_class_index = int(np.argmax(prior_probs))
    initial_class_name = class_names_extended[initial_class_index]

    likelihoods = np.ones_like(prior_probs)
    if 'None' in user_selected_classes:
        final_class_name = 'None'
        posterior_probs = prior_probs

        return {"message": "Not in dataset"}
    else:
        likelihoods = np.zeros_like(prior_probs)
        total_selected = sum(user_selected_classes.values())

        for class_name, count in user_selected_classes.items():
            if class_name in class_names_extended:
                index = class_names_extended.index(class_name)
                likelihoods[index] = count / total_selected

        posterior_probs = bayesian_update(prior_probs, likelihoods)
        final_class_index = int(np.argmax(posterior_probs))
        final_class_name = class_names_extended[final_class_index]

    return {
        "initial_prediction": {
            "class": initial_class_name,
            "probability": float(prior_probs[initial_class_index])
        },
        "final_prediction": {
            "class": final_class_name,
            "probability": float(posterior_probs[final_class_index])
        },
        "prior_probabilities": {
            class_names_extended[i]: float(prior_probs[i])
            for i in range(len(class_names_extended))
        },
        "posterior_probabilities": {
            class_names_extended[i]: float(posterior_probs[i])
            for i in range(len(class_names_extended))
        },
        "user_selected_classes": user_selected_classes
    }


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
