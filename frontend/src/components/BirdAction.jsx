import { useState } from "react";
import Dropzone from "./Dropzone";
import { DNA } from "react-loader-spinner";

const BACKEND_URL = "https://mytownly.in";
//const BACKEND_URL = "https://localhost:443";


async function validateBird(birdUrl) {
    try {
        const response = await fetch(`${BACKEND_URL}/validate/`, {
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
        const response = await fetch(`${BACKEND_URL}/classify/`, {
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
        setLoading(true); // Set loading to true while uploading
        setBirdUrl(imageURL);
        setResult(null); // Clear any previous results
        setError(null);   // Clear any previous errors
        setLoading(false); // Reset loading to false after setting the URL
    };

    const handleActionClick = async (actionType) => {

        if (!birdUrl) {
            alert('Provide a valid input image to proceed');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = actionType === "validate"
                ? await validateBird(birdUrl)
                : await classifyBird(birdUrl);
            const uniqueString = [...new Set(response.classifiedBirds)].join(", ");
            response.classifiedBirds = uniqueString;
            setResult(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-md:-mt-50 animate-slidein md:p-8 pt-8 min-h-screen bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/classify-bg.svg')] bg-cover" id="process">
            <div className="rounded-md p-8 pt-16 md:flex items-center w-full md:flex-row justify-around">
                <Dropzone onDropZoneInputChange={onDropZoneInputChange} />
                <div className="max-md:w-full max-md:mt-4 md:ml-8 w-[60%] rounded-md flex justify-center items-center h-[55vh] border bg-black bg-opacity-30 border-slate-100 p-2 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100 overflow-auto">
                    {error === null && result === null ? <p>Result displays here</p> : null}
                    {error && <p className="mt-4 self-center text-red-600">Error: {error}</p>}
                    {result && (
                        <div className="text-white flex flex-col justify-center">
                            {result.isBird !== undefined ? (
                                <p className=" self-center">Validation Result: {result.isBird ? "Contains Bird" : "Doesn't contain any Bird"}</p>
                            ) : (
                                <div className="self-center flex flex-col items-center w-full">
                                    <p className="text-xl font-bold">Classification Result: {result.class}</p>
                                    {result.s3ImageUrl ? <img src={result.s3ImageUrl} alt="classified-bird" className="mt-2  w-[100%] h-[40vh]" /> : null}
                                    <p className="mt-2">Classes In Image: {result.classifiedBirds}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center p-12">
                {loading ? (
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                ) : (
                    <div className="flex flex-col items-center">
                        <div>
                            <button
                                type="button"
                                onClick={() => handleActionClick("validate")}
                                className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 mx-2 rounded border transition delay-100 max-md:w-[30vw] w-[20vw]"
                            >
                                Validate
                            </button>
                            <button
                                type="button"
                                onClick={() => handleActionClick("classify")}
                                className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 mx-2 rounded border transition delay-100 mas-md:w-[30vw] w-[20vw]"
                            >
                                Classify
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BirdAction;
