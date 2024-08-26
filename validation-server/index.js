const express = require("express");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());

const detectBird = (birdLink) => {
  return new Promise((resolve, reject) => {
    const detect = spawn("python", ["main.py", birdLink]);

    let dataString = "";

    detect.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    detect.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(data.toString());
    });

    detect.on("close", (code) => {
      if (code !== 0) {
        reject(`Process exited with code ${code}`);
      } else {
        resolve(dataString);
      }
    });
  });
};

app.post("/validate/", async (req, res) => {
  // const { birdLink } = req.body;
  // this link is just for testing puposes.
  const birdLink =
    "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  try {
    const isBird = await detectBird(birdLink);
    res.send({ isBird });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
