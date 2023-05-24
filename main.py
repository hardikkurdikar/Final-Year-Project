from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("C:\\Users\\acer\\anaconda3\\models\\skindisease2.h5")

CLASS_NAMES = ["Acne:A skin condtiton that occurs when hair follicles plug with oil and dead skin cells.",
               "Eczema: is a condition in which patches of skin become inflamed,itchy,cracked and rough",
               "Melanoma:occurs when the pigment-producing cells that give color to skin, become cancerous",
               "Psoriasis:a condition in which skin cells build up and form scales and itchy,dry patches",
               "Ringworm:often causes a ring-shaped rash, that is itchy,scaly and slightly raised.",
               "Warts:a small, fleshy bump on the skin or mucous membrane caused by human paillomavirus"]


@app.get("/ping")
async def ping():
    return "Welcome"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(
        file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'Predicted class': predicted_class,
        'confidence': float(confidence)
    }


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)