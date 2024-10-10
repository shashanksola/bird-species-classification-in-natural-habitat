from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import requests
import os

app = FastAPI()

# Load the model once at startup
model = tf.keras.models.load_model(os.getcwd() + "/bird_detection_model.h5")


# Define a request body model for image URL
class ImageURL(BaseModel):
    image_url: str


def download_bird(url: str) -> str:
    """Download the image from the given URL."""
    img_data = requests.get(url).content
    img_path = 'image_name.jpg'
    with open(img_path, 'wb') as handler:
        handler.write(img_data)
    return img_path


def prepare_image(img_path: str):
    """Prepare the image for model prediction."""
    img = image.load_img(img_path, target_size=(32, 32))
    img_array = image.img_to_array(img)
    img_array = img_array.astype('float32') / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


def predict_bird(img_path: str) -> bool:
    """Predict if the image contains a bird."""
    img_array = prepare_image(img_path)
    prediction = model.predict(img_array, verbose=0)
    return bool(prediction[0] > 0.5)


@app.post("/predict/")
async def predict_bird_in_image(data: ImageURL):
    """API endpoint to predict if a bird is in the image."""
    try:
        img_path = download_bird(data.image_url)
        result = predict_bird(img_path)
        os.remove(img_path)  # Clean up the image after prediction
        return {"isBird": result}
    except Exception as e:
        return {"error": str(e)}
