import { useState } from "react";
import Header from './Header';

async function validateBird(birdUrl) {
    try {
        const response = await fetch('http://localhost:3000/validate/', {
            method: 'POST',
            body: JSON.stringify({
                birdLink: birdUrl
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error: ' + err);
        return null;
    }
}

const FindBird = () => {
    const [bird, setBird] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const onValidateClick = async () => {
        try {
            const response = await validateBird(bird);
            setResult(response);
        } catch (err) {
            setError(err);
        }
    }

    const onInputChange = (event) => {
        setBird(event.target.value);
    }

    return (
        <>
            <Header />
            <div className="find-a-bird">
                <p>Input Here</p>
                <div className="url-field">
                    <input
                        placeholder="Enter URL"
                        value={bird}
                        onChange={onInputChange}
                        className="url-input"
                    />
                    <button type="button" onClick={onValidateClick}>Validate & Predict</button>
                </div>

                {error && <p>Error: {error.message}</p>}
                {result && <p>Validation Result: {JSON.stringify(result)}</p>}
            </div>
        </>
    );
}

export default FindBird;
