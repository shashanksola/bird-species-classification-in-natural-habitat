FROM python:3.11

WORKDIR /app

COPY req.txt req.txt
COPY main.py main,py
COPY yolov5s.pt yolov5s.pt
COPY New_bird_species_model.h5 New_bird_species_model.h5

RUN pip install uvicorn
RUN pip install -r req.txt
RUN pip install tensorflow
RUN apt-get update && apt-get install -y libgl1
RUN mv main,py main.py

CMD ["uvicorn", "main:app", "--reload", "--port", "80"]