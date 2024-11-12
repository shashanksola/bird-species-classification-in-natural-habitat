// ===BirdAction.jsx===
import { useState } from "react";
import Dropzone from "./Dropzone";

async function validateBird(birdUrl) {
    try {
        const response = await fetch('http://43.205.90.65/validate/', {
            method: 'POST',
            body: JSON.stringify({ birdLink: birdUrl }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Unknown error occurred');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Validation Error:', err.message);
        throw err;
    }
}

async function classifyBird(birdUrl) {
    try {
        const response = await fetch('http://43.205.90.65/classify/', {
            method: 'POST',
            body: JSON.stringify({ birdLink: birdUrl }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Unknown error occurred');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Classification Error:', err.message);
        throw err;
    }
}

const BirdAction = () => {
    const [birdUrl, setBirdUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const onDropZoneInputChange = (imageURL) => {
        setBirdUrl(imageURL);
        setResult(null); // Clear any previous results
        setError(null);   // Clear any previous errors
    };

    const handleActionClick = async (actionType) => {
        if (!birdUrl) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = actionType === "validate"
                ? await validateBird(birdUrl)
                : await classifyBird(birdUrl);
            setResult(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:p-8 pt-8 min-h-screen bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/classify-bg.svg')] bg-cover" id="process">
            <div className="rounded-md p-8 pt-16 flex flex-col items-center w-full md:flex-row justify-around bg-center bg-cover">
                <Dropzone onDropZoneInputChange={onDropZoneInputChange} />
            </div>
            <div className="flex justify-center items-center p-12">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <button
                            type="button"
                            onClick={() => handleActionClick("validate")}
                            className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 mx-2 rounded border transition delay-100"
                        >
                            Validate
                        </button>
                        <button
                            type="button"
                            onClick={() => handleActionClick("classify")}
                            className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 mx-2 rounded border transition delay-100"
                        >
                            Classify
                        </button>
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                        {result && (
                            <div style={{ color: 'white' }}>
                                {result.isBird !== undefined ? (
                                    <p>Validation Result: {result.isBird ? "Contains Bird" : "Doesn't contain any Bird"}</p>
                                ) : (
                                    <div>
                                        <p>Classification Result: {result.class}</p>
                                        <img src={result.s3ImageUrl} alt="classified-bird" />
                                        <p>Classes In Image: {result.classifiedBirds}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BirdAction;
