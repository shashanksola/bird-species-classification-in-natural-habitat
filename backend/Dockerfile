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

COPY index.js index.js
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY .env .env

# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# RUN nvm install 20.18.0
# RUN node -v && npm -v
# RUN npm install
# RUN npm i pm2
# RUN pm2 start index.js

# CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

# Install NVM, Node.js, npm, and pm2 in a single RUN command
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install 20.18.0 && \
    nvm use 20.18.0 && \
    nvm alias default 20.18.0 && \
    npm install -g pm2 && \
    npm install

COPY ssl/ ssl/
# Start Node.js and Python apps

EXPOSE 443

CMD . "$NVM_DIR/nvm.sh" && pm2-runtime start index.js & uvicorn main:app --reload --host 0.0.0.0 --port 8000