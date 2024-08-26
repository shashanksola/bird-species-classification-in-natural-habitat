import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import sys
import requests
import os

# Load the trained model
model = load_model('bird_detection_model.h5')


def download_bird(url):
    img_data = requests.get(image_url).content
    with open('image_name.jpg', 'wb') as handler:
        handler.write(img_data)
    return "image_name.jpg"


def prepare_image(img_path):
    # Load the image from the path
    # Resize the image to 32x32 pixels
    img = image.load_img(img_path, target_size=(32, 32))

    # Convert the image to a numpy array
    img_array = image.img_to_array(img)

    # Normalize the image array
    img_array = img_array.astype('float32') / 255.0

    # Add an extra dimension to match the input shape of the model (batch size, height, width, channels)
    img_array = np.expand_dims(img_array, axis=0)

    return img_array


def predict_bird(img_path):
    # Prepare the image
    img_array = prepare_image(img_path)

    # Make the prediction
    prediction = model.predict(img_array)

    # Interpret the prediction result
    if prediction[0] > 0.5:
        return True
    else:
        return False


# Example usage
img_path = 'car.jpg'
predict_bird(img_path)

req = str(sys.argv[1])

bird_path = download_bird(req)

if (predict_bird(bird_path)):
    print(True)
else:
    print(False)

os.remove(bird_path)
