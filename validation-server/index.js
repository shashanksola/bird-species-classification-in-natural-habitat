const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

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
    res.send({ isBird });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
