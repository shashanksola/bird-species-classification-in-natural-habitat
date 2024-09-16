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

const FindBird = async () => {
    const [bird, setBird] = useState("");

    const onValidateClick = async () => {
        console.log(await validateBird(bird));
    }

    const onInputChange = (event) => {
        setBird(event.target.value);
    }

    return (
        <div>
            <p>Input Here</p>;
            <input placeholder="Enter url" onChange={(event) => onInputChange(event)} />
            <button type="button" onClick={onValidateClick()}>Validate & Predict</button>
        </div>
    )
}

export default FindBird;