require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require('multer'); // For handling file uploads
const AWS = require('aws-sdk'); // AWS SDK to interact with S3
const fs = require('fs'); // File system to handle file streams
const { generateSlug } = require('random-word-slugs');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://indian-bird-species.netlify.app'] // Allow specific origin
}));

// Set up AWS S3 credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION // Ensure region is correct
});

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// S3 upload function
const uploadToS3 = async (file) => {
  const prefix = process.env.AWS_BUCKET_PREFIX.replace('https://bird-species.s3.ap-south-1.amazonaws.com/', ''); // Extract the path part of the prefix

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
    Key: `${prefix}${generateSlug()}_${file.originalname}`, // Upload to the desired folder
    Body: file.buffer, // File buffer for uploading
    ContentType: file.mimetype, // The file type
  };

  return s3.upload(uploadParams).promise();
};

// S3 delete function
const deleteFromS3 = async (fileKey) => {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
    Key: fileKey // The file key (path) to delete
  };

  return s3.deleteObject(deleteParams).promise();
};

// Schedule deletion of file from S3 after 15 minutes
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

// Endpoint for uploading images to S3
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Upload the file to S3
    const result = await uploadToS3(file);
    const s3ImageUrl = result.Location; // The URL of the uploaded image
    const fileKey = result.Key; // The S3 key of the uploaded file (path)

    // Schedule deletion after 15 minutes (900000 ms)
    scheduleDeletion(fileKey, 15 * 60 * 1000); // 15 minutes in milliseconds

    // Return the URL to the frontend
    res.status(200).json({ url: s3ImageUrl });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Error uploading file to S3" });
  }
});

// Existing bird detection function
const detectBird = async (birdLink) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/predict/", {
      image_url: birdLink,
    });

    return response.data.isBird;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw new Error("Error in prediction");
  }
};

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

// Default route
app.get("/", (req, res) => {
  res.send("The server is running");
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
