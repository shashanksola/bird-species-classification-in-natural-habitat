import { useState } from "react";
import Dropzone from "../Dropzone";
import Navbar from "../Navbar";
import "./styles.css"

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
    const [loading, setLodaing] = useState(false);

    const onValidateClick = async () => {
        setLodaing(true);
        try {
            const response = await validateBird(bird);
            setResult(response);
            console.log(result);
        } catch (err) {
            setError(err);
        }

        setLodaing(false);
    }


    const onInputChange = (event) => {
        console.log(event);
        setBird(event.target.value);
    }

    return (
        <>
            <Navbar />
            <div className="page">
                <div>
                    <Dropzone onInputChange={onInputChange} />
                </div>
                <h1 style={{ color: 'white' }}>OR</h1>
                <div>
                    <label htmlFor="url-input" style={{ color: 'white', fontWeight: 'bold' }}>Input Url</label>
                    <br />
                    <input
                        placeholder="Enter URL"
                        value={bird}
                        onChange={onInputChange}
                        id="url-input"
                        type="url"
                        className="url-input"
                    />
                    {bird && <img src={bird} alt="input-bird" style={{ width: '20vw' }} />}
                </div>
            </div>
            {loading ? <div>
                Loading
            </div> : <div className="generated-content">
                <button type="button" onClick={onValidateClick} className="btn btn-primary">Validate & Predict</button>
                {error && <p>Error: {error.message}</p>}
                {result && <p>Validation Result: {result?.isBird ? "Contains Bird" : "Doesn't contain any Bird"}</p>}
            </div>}
        </>
    );
}

export default FindBird;
