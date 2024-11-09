import { useState } from "react";
import Dropzone from "./Dropzone";
import Navbar from "./Navbar";

async function validateBird(birdUrl) {
    console.log(birdUrl);
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

        if (!response.ok) {
            const errorResponse = await response.json();  // Parse the error response as JSON
            throw new Error(errorResponse.error || 'Unknown error occurred');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error: ' + err.message);
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
        } catch (err) {
            setError(err);
        }

        setLodaing(false);
    }


    const onInputChange = (event) => {
        setBird(event.target.value);
    }

    const onDropZoneInputChange = (imageURL) => {
        setBird(imageURL);
    }

    return (
        <div className=" md:p-8 pt-8 min-h-screen" id="findabird">
            {/*<Navbar />*/}
            <div className="rounded-md p-8 pt-16 flex flex-col items-center w-full md:flex-row justify-around bg-center bg-cover">
                <div>
                    <Dropzone onDropZoneInputChange={onDropZoneInputChange} />
                </div>
                <h1 className="text-slate-300 m-4">OR</h1>
                <div className="flex flex-col max-md:w-full">
                    <label htmlFor="url-input" className="text-slate-900 font-bold self-start mb-1 md:text-slate-50">Input Url</label>
                    <input
                        placeholder="Enter URL"
                        value={bird}
                        onChange={onInputChange}
                        id="url-input"
                        type="url"
                        className="rounded-md bg-slate-950 border-slate-400 border py-2 px-4"
                        style={{ color: 'while' }}
                    />
                    <div className="border md:size-96 mt-4 bg-black bg-opacity-30 border-slate-100 p-16 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100 text-center">
                        <p className="text-slate-300">Image Area</p>
                        {bird && <img src={bird} alt="input-bird" style={{ width: '20vw', maxHeight: '100%', maxWidth: '100%' }} />}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-12">
                {loading ?
                    <div>Loading</div> :
                    <div>
                        <button type="button" onClick={onValidateClick} className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 rounded border transition delay-100">Validate & Predict</button>
                        {error && <p>Error: {error.message}</p>}
                        {result && <p style={{ color: 'white' }}>Validation Result: {result.isBird ? "Contains Bird" : "Doesn't contain any Bird"}</p>}
                    </div>}
            </div>
        </div>
    );
}

export default FindBird;