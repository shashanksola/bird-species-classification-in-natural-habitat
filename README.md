# bird-species-classification-in-natural-habitat

Indian Bird Species Detection web app with:
- `frontend`: React + Vite UI
- `backend/index.js`: Node.js (20.18.0) HTTPS API (uploads to S3 + orchestrates inference)
- `backend/main.py`: FastAPI + YOLO + TensorFlow inference API

## Architecture Overview
1. User uploads image in frontend.
2. Node backend (`/upload`) stores image in S3 and returns URL.
3. Node backend calls Python API for:
- bird validation (`/predict/`)
- species classification (`/classify/`)
- probability endpoints
4. Node returns final response to frontend.

## Prerequisites
Install these before running locally:
- Node.js `20.x` (recommended)
- npm `10.x`+
- Python `3.11` (recommended)
- pip (latest)

System packages (Linux only, for OpenCV/TensorFlow display libs):
- `libgl1`

## Repository Structure
- `README.md`
- `frontend/`
- `backend/`

## Local Setup (Complete)
Run in **3 terminals**:
1. Python inference server
2. Node HTTPS backend
3. React frontend

### 1. Backend: Install Node dependencies
```bash
cd backend
npm install
```

### 2. Backend: Create Python virtual environment
Windows (PowerShell):
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r req.txt
```

macOS/Linux:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r req.txt
```

### 3. Backend: Configure environment variables
Create `backend/.env`:
```env
PORT=443
PYTHON_API="http://127.0.0.1:8000/"

AWS_BUCKET_PREFIX="https://<your-bucket>.s3.<region>.amazonaws.com/<prefix>/"
AWS_ACCESS_KEY_ID="<your-access-key>"
AWS_SECRET_ACCESS_KEY="<your-secret-key>"
AWS_REGION="<your-region>"
AWS_BUCKET_NAME="<your-bucket-name>"
```

Notes:
- Keep `PYTHON_API` ending with `/`.
- Do not commit real AWS secrets.

### 4. Backend: SSL certificates required by Node server
`backend/index.js` expects:
- `backend/ssl/private-key.pem`
- `backend/ssl/certificate.pem`

If missing, generate self-signed certs (local dev):
```bash
cd backend/ssl
openssl req -x509 -newkey rsa:2048 -keyout private-key.pem -out certificate.pem -days 365 -nodes
```

### 5. Start Python API (Terminal 1)
From `backend/` with venv activated:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 6. Start Node HTTPS API (Terminal 2)
From `backend/`:
```bash
node index.js
```

Server runs at:
- `https://localhost:443`

### 7. Frontend setup
```bash
cd frontend
npm install
```

### 8. Point frontend to local backend (important)
In both files, switch backend URL from production to localhost:
- `frontend/src/components/Dropzone.jsx`
- `frontend/src/components/BirdAction.jsx`

Use:
```js
const BACKEND_URL = "https://localhost:443";
```

### 9. Start frontend (Terminal 3)
From `frontend/`:
```bash
npm run dev
```

Default Vite URL:
- `http://localhost:5173`

## Verify It Works
1. Open `http://localhost:5173`.
2. Upload a bird image.
3. Click `Validate` then `Classify`.
4. Confirm backend logs in both terminals:
- Node logs request and S3 upload results.
- Python logs model inference.

## The application should be up and running, the below part is optional and can be ignored

## API Endpoints
Node HTTPS API (`https://localhost:443`):
- `POST /upload`
- `POST /validate/`
- `POST /classify`
- `POST /get-probabilities`
- `POST /get-adjusted-predictions`

Python API (`http://localhost:8000`):
- `POST /predict/`
- `POST /classify/`
- `POST /get-probabilities/`
- `POST /get-adjusted-predictions/`

## Docker (Backend only)
From `backend/`:
```bash
docker build -t bird-backend .
docker run --env-file .env -p 443:443 bird-backend
```

Note:
- Current Dockerfile starts Node + Uvicorn together.
- Ensure model files and SSL files are present before build.

## Troubleshooting
- `ENOENT ... ssl/private-key.pem`:
  Certificate files are missing or wrong path in `backend/ssl/`.

- Frontend still calling production URL:
  Confirm both files updated:
  `frontend/src/components/Dropzone.jsx` and `frontend/src/components/BirdAction.jsx`.

- Browser SSL warning on `https://localhost:443`:
  Expected with self-signed cert; proceed locally or use trusted certs.

- `Error uploading file to S3`:
  Re-check AWS variables in `backend/.env` and bucket permissions.

- Python model load errors:
  Ensure `Model_V3_7525.h5` and YOLO weights exist in `backend/`.

- CORS or network failures:
  Make sure Node backend is running and reachable at the exact `BACKEND_URL` used by frontend.

## Stop Services
- Frontend terminal: `Ctrl + C`
- Node backend terminal: `Ctrl + C`
- Python terminal: `Ctrl + C`, then deactivate venv:

Windows:
```powershell
deactivate
```

macOS/Linux:
```bash
deactivate
```

## Security Note
If real cloud credentials are ever committed to git history, rotate them immediately in AWS and replace with new keys.
