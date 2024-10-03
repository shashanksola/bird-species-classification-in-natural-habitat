import { useState } from "react";
import Dropzone from "./Dropzone";
import Navbar from "./Navbar";

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
        <div>
            <Navbar />
            <div className="min-h- p-8 flex flex-col items-center dark:bg-slate-700 w-full md:flex-row justify-around">
                <div>
                    <Dropzone onInputChange={onInputChange} />
                </div>
                <h1 className="text-slate-300">OR</h1>
                <div className="flex flex-col justify-center items-center">
                    <label htmlFor="url-input" className="text-slate-200 font-bold">Input Url</label>
                    <br />
                    <input
                        placeholder="Enter URL"
                        value={bird}
                        onChange={onInputChange}
                        id="url-input"
                        type="url"
                        className="rounded-md dark:bg-slate-800 border-slate-400 border py-2 px-4"
                    />
                    <div className="border size-96 mt-4 dark:bg-slate-800 p-4">
                        <p className="text-slate-300">Image Area</p>
                        {bird && <img src={bird} alt="input-bird" style={{ width: '20vw' }} />}
                    </div>
                </div>
            </div>
            <div className="bg-slate-700 flex justify-center items-center p-14">
                {loading ? Loading : <div>
                    <button type="button" onClick={onValidateClick} className="bg-slate-800 hover:bg-slate-200 hover:text-slate-800 text-white font-bold py-2 px-4 rounded">Validate & Predict</button>
                    {error && <p>Error: {error.message}</p>}
                    {result && <p>Validation Result: {result?.isBird ? "Contains Bird" : "Doesn't contain any Bird"}</p>}
                </div>}
            </div>
        </div>
    );
}

export default FindBird;
