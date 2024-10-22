require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require('multer'); // For handling file uploads
const AWS = require('aws-sdk'); // AWS SDK to interact with S3
const fs = require('fs'); // File system to handle file streams
const path = require('path'); // Path module for handling file paths
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
const uploadToS3 = async (fileContent, filename, mimetype) => {
  const prefix = process.env.AWS_BUCKET_PREFIX.replace('https://bird-species.s3.ap-south-1.amazonaws.com/', ''); // Extract the path part of the prefix

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
    Key: `${prefix}${generateSlug()}_${filename}`, // Upload to the desired folder
    Body: fileContent, // File content buffer for uploading
    ContentType: mimetype, // The file type (mimetype)
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
    const result = await uploadToS3(file.buffer, file.originalname, file.mimetype);
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
    const response = await axios.post(`${process.env.PYTHON_API}predict/`, {
      image_url: birdLink,
    });

    return response.data.isBird;
  } catch (error) {
    console.error(`Error: ${error.response ? error.response.data : error.message}`);
    throw new Error("Error in prediction");
  }
};

// Route for validating bird image prediction
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


// Route for classifying birds and uploading classified image to S3
app.post("/classify", async (req, res) => {
  const { birdLink } = req.body;

  if (!birdLink) {
    return res.status(400).json({ error: "No image URL provided" });
  }

  try {
    // Step 1: Send request to FastAPI /classify endpoint
    const response = await axios.post(`${process.env.PYTHON_API}classify/`, {
      image_url: birdLink,
    });

    // Step 2: Get classification result
    const classifiedBirds = response.data.classified_birds;
    const message = response.data.message;

    if (message === "No birds detected") res.status(200).json({ classifiedBirds: "No birds detected" })


    // Step 4: Upload image to S3
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
    })

    // Step 5: Clean up (if needed)
    // No need to delete the file here as it's on the FastAPI server, but you can handle it there if needed

    // Step 6: Return classification result and S3 image URL to the client
    res.status(200).json({
      classifiedBirds,
      message,
      s3ImageUrl, // Return S3 URL for the classified image
    });

  } catch (error) {
    console.error("Error during classification or S3 upload:", error);
    res.status(500).json({ error: "Classification or upload failed" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("The server is running");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
