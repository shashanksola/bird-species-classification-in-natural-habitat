require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001' // Allow specific origin
}));

const detectBird = async (birdLink) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/predict/", {
      image_url: birdLink,
    });

    //getEnvironmentTags(birdLink); invoke from endpoint code
    return response.data.isBird;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw new Error("Error in prediction");
  }
};

const getEnvironmentTags = async (birdLink) => { // needs updation
  try {
    const response = await axios.post("http://127.0.0.1:8000/envTags/", {
      image_url: birdLink,
    });

    return response.data.tags;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw new Error("Error in tags classification");
  }
}

app.post("/validate/", async (req, res) => {
  const birdLink = req.body.birdLink || "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  try {
    const isBird = await detectBird(birdLink);
    res.status(200).send({ isBird });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.post("/tagClassifier/", async (req, res) => { // needs updation
  const birdLink = req.body.birdLink || "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  try {
    const isBird = await getEnvironmentTags(birdLink);
    res.status(200).send({ tags });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
