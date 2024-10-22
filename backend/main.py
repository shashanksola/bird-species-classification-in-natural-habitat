import torch
from PIL import Image
import io
import numpy as np
import aiohttp
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

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

# Route to accept an image URL and predict bird presence


@app.post("/predict/")
async def predict_bird_in_image(data: ImageURL):
    # Fetch the image from the provided URL
    print(data.image_url)
    try:
        img = await fetch_image_from_url(data.image_url)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image URL")

    # Perform inference using YOLOv5 model
    results = model(img)
    print(results)

    # Extract detected classes
    detected_classes = results.pred[0][:, -1].cpu().numpy()
    print(detected_classes)

    # Check if class 14 ("bird") is detected in the image
    if 14 in detected_classes:
        result = True
    else:
        result = False

    return {"isBird": result}
