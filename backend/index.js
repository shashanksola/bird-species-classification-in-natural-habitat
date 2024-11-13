require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { generateSlug } = require('random-word-slugs');

// Load SSL certificates for HTTPS
const privateKey = fs.readFileSync(path.resolve(__dirname, 'ssl/private-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, 'ssl/certificate.pem'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://indian-bird-species.netlify.app'] // Allow specific origin
}));

// Set up AWS S3 credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload to S3
const uploadToS3 = async (fileContent, filename, mimetype) => {
  const prefix = process.env.AWS_BUCKET_PREFIX.replace('https://bird-species.s3.ap-south-1.amazonaws.com/', '');
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${prefix}${generateSlug()}_${filename}`,
    Body: fileContent,
    ContentType: mimetype,
  };
  return s3.upload(uploadParams).promise();
};

// Function to delete from S3
const deleteFromS3 = async (fileKey) => {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey
  };
  return s3.deleteObject(deleteParams).promise();
};

// Schedule deletion
const scheduleDeletion = (fileKey, delay) => {
  setTimeout(async () => {
    try {
      await deleteFromS3(fileKey);
      console.log(`File deleted successfully: ${fileKey}`);
    } catch (error) {
      console.error(`Failed to delete file: ${fileKey}`, error);
    }
  }, delay);
};

// Endpoint for uploading images
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const result = await uploadToS3(file.buffer, file.originalname, file.mimetype);
    const s3ImageUrl = result.Location;
    const fileKey = result.Key;
    scheduleDeletion(fileKey, 15 * 60 * 1000);
    res.status(200).json({ url: s3ImageUrl });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Error uploading file to S3" });
  }
});

// Bird detection function
const detectBird = async (birdLink) => {
  try {
    const response = await axios.post(`${process.env.PYTHON_API}predict/`, {
      image_url: birdLink,
    });
    return response.data.isBird;
  } catch (error) {
    console.error(`Error: ${error.response ? error.response.data : error.message}`);
    throw new Error("Error in prediction");
  }
};

// Validation route
app.post("/validate/", async (req, res) => {
  const birdLink = req.body.birdLink || "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  try {
    const isBird = await detectBird(birdLink);
    res.status(200).json({ isBird });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Classification route
app.post("/classify", async (req, res) => {
  const { birdLink } = req.body;
  if (!birdLink) {
    return res.status(400).json({ error: "No image URL provided" });
  }
  try {
    const response = await axios.post(`${process.env.PYTHON_API}classify/`, {
      image_url: birdLink,
    });
    const classifiedBirds = response.data.classified_birds;
    const message = response.data.message;

    if (message === "No birds detected") res.status(200).json({ classifiedBirds: "No birds detected" });

    const s3UploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `classified_images/${generateSlug()}_classified_image.jpg`,
      Body: fs.createReadStream(path.join(__dirname, 'classified_image.jpg')),
      ContentType: "image/jpg",
    };

    const s3Result = await s3.upload(s3UploadParams).promise();
    const s3ImageUrl = s3Result.Location;
    console.log(s3ImageUrl);

    fs.rm(path.join(__dirname, 'classified_image.jpg'), () => {
      console.log('deleted image');
    });

    res.status(200).json({
      classifiedBirds,
      message,
      s3ImageUrl,
    });
  } catch (error) {
    console.error("Error during classification or S3 upload:", error);
    res.status(500).json({ error: "Classification or upload failed" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("The server is running securely over HTTPS");
});

// Start HTTPS server
const PORT = process.env.PORT || 3000;
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server is running securely on https://localhost:${PORT}`);
});
