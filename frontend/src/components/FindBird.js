import { useState } from "react";

async function validateBird(birdUrl) {
    await fetch('http://localhost:3000/validate/', {
        method: 'POST',
        body: JSON.stringify({
            birdLink: birdUrl
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });
}

export default function FindBird() {
    const [bird, setBird] = useState("");

    validateBird = () => {
        // this code uploads the image to aws s3 and validates the bird later it will predict the bird as well if the bird is present.
    }

    return (
        <div>
            <p>Input Here</p>;
            <button type="button" onClick={() => this.validateBird()}>Validate & Predict</button>
        </div>
    )
}