import { useState } from "react";
import Dropzone from "./Dropzone";
import Navbar from "./Navbar";

async function classifyBird(birdUrl) {
    try {
        const response = await fetch('http://localhost:3000/classify/', {
            method: 'POST',
            body: JSON.stringify({
                birdLink: birdUrl
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Unknown error occurred');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error: ' + err.message);
        return null;
    }
}

const ClassifyBird = () => {
    const [bird, setBird] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onClassifyClick = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await classifyBird(bird);
            setResult(response);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    const onInputChange = (event) => {
        setBird(event.target.value);
    }

    const onDropZoneInputChange = (imageURL) => {
        setBird(imageURL);
    }

    return (
        <div className="bg-orange-100 md:p-8 pt-8 min-h-screen" id="classify">
            <div className="rounded-md p-8 pt-16 flex flex-col items-center w-full md:flex-row justify-around bg-orange-100 bg-center bg-cover">
                <Dropzone onDropZoneInputChange={onDropZoneInputChange} />
                <h1 className="text-slate-800 m-4">OR</h1>
                <div className="flex flex-col max-md:w-full">
                    <label htmlFor="url-input" className="text-slate-900 font-bold self-start mb-1 md:text-slate-50">Input Url</label>
                    <input
                        placeholder="Enter URL"
                        value={bird}
                        onChange={onInputChange}
                        id="url-input"
                        type="url"
                        className="rounded-md bg-slate-950 border-slate-400 border py-2 px-4"
                    />
                    <div className="border md:size-96 mt-4 bg-orange-100 bg-opacity-30 border-slate-100 p-16 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100 text-center">
                        <p className="text-slate-300">Image Area</p>
                        {bird && <img src={bird} alt="input-bird" style={{ width: '20vw', maxHeight: '100%', maxWidth: '100%' }} />}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-12">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <button
                            type="button"
                            onClick={onClassifyClick}
                            className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 rounded border transition delay-100"
                        >
                            Classify
                        </button>
                        {error && <p>Error: {error.message}</p>}
                        {result && (
                            <div>
                                <p style={{ color: 'white' }}>Classification Result: {result.class}</p>
                                <img src={`${result.s3ImageUrl}`} alt="classified-bird" />
                                <p style={{ color: 'white' }}>Classes In Image: {result.classifiedBirds}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassifyBird;
