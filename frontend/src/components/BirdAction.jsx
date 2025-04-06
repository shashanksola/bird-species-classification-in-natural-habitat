/* eslint-disable react/prop-types */
import { useState } from "react";
import Dropzone from "./Dropzone";
import { DNA } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const BACKEND_URL = "https://mytownly.in";

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

async function getProbabilities(birdUrl) {
    try {
        const response = await fetch(`${BACKEND_URL}/get-probabilities/`, {
            method: 'POST',
            body: JSON.stringify({ birdLink: birdUrl }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Unknown error occurred');
        }

        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (err) {
        console.log('Probabilities Error:', err.message);
        throw err;
    }
}

async function getAdjustedPredictions(birdUrl, selected_class1_name, selected_class2_name, selected_class1_value, selected_class2_value) {
    try {
        const response = await fetch(`${BACKEND_URL}/get-adjusted-predictions/`, {
            method: 'POST',
            body: JSON.stringify({
                birdLink: birdUrl,
                selected_class1_name,
                selected_class2_name,
                selected_class1_value,
                selected_class2_value
            }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Unknown error occurred');
        }

        const data = await response.json();
        return data.data;
    } catch (err) {
        console.log('Adjusted Predictions Error:', err.message);
        throw err;
    }
}

// Function to correct image URL extensions
const correctImageUrl = (url) => {
    // Convert .JPG to .jpg and handle other potential case issues
    return url.replace(/\.JPG$/i, '.jpg');
};
const ImageGrid = ({ probabilities, selectedImages, onImageSelect, onSubmitSelections, onNoneSelection }) => {
    const visibleImages = probabilities?.images || [];

    return (
        <div className="text-white w-full p-4 max-w-3xl mx-auto bg-gray-900 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-center">
                Select 3 similar images <span className="text-yellow-400">({selectedImages.length}/3)</span>
            </h3>

            {/* 2-column grid with larger images */}
            <div className="mb-4 flex justify-center">
                <div className="grid grid-cols-2 gap-4 place-items-center w-80 h-50">
                    {visibleImages.slice(0, 6).map((img, idx) => {
                        const correctedUrl = img.replace(/\.JPG$/i, '.jpg');
                        const isSelected = selectedImages.includes(img);
                        const isFirstClass = img.includes(`/${probabilities.classIndex}_`);
                        const classLabel = isFirstClass ? probabilities.className : probabilities.topPrediction2_class;
                        const labelColor = isFirstClass ? 'bg-green-500' : 'bg-blue-500';

                        return (
                            <div
                                key={`img-${idx}`}
                                className={`relative cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 ${
                                    isSelected 
                                      ? 'ring-4 ring-yellow-400 scale-105 shadow-lg shadow-yellow-400/50' 
                                      : 'hover:opacity-90 hover:shadow-lg hover:scale-[1.02]'
                                }`}
                                style={{ width: '350px', height: '200px' }}
                                onClick={() => onImageSelect(img)}
                                title={classLabel}
                            >
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                    <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <img
                                    src={correctedUrl}
                                    alt={`${classLabel}-example`}
                                    className="w-full h-full object-cover relative z-10"
                                    onError={(e) => {
                                        if (e.target.src !== img) {
                                            e.target.src = img;
                                        } else {
                                            e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Found';
                                            e.target.className = 'w-full h-full object-fill bg-gray-700 relative z-10';
                                        }
                                    }}
                                />
                                <div className={`absolute bottom-0 left-0 right-0 ${labelColor} bg-opacity-80 p-1 text-center text-xs truncate z-20`}>
                                    {classLabel}
                                </div>
                                {isSelected && (
                                    <>
                                        {/* Enhanced selection overlay with pulse effect */}
                                        <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 z-20 animate-pulse"></div>
                                        {/* Selection number badge */}
                                        <div className="absolute top-2 right-2 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md z-30">
                                            {selectedImages.indexOf(img) + 1}
                                        </div>
                                        {/* Checkmark icon */}
                                        <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-30">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Progress indicator */}
           {/* Progress indicator */}
<div className="w-full bg-gray-700 h-2 rounded-full mb-4 overflow-hidden">
    <div
        className="bg-yellow-400 h-full transition-all duration-300 ease-out"
        style={{ width: `${(selectedImages.length / 3) * 100}%` }}
    />
</div>
            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4">
                <button
                    className={`px-6 py-2 rounded-lg font-bold text-white transition-all duration-300 ${
                        selectedImages.length === 3
                            ? 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
                            : 'bg-gray-600 opacity-70 cursor-not-allowed'
                    }`}
                    onClick={onSubmitSelections}
                    disabled={selectedImages.length !== 3}
                >
                    {selectedImages.length === 3 ? 'Confirm Selection' : `Select ${3 - selectedImages.length} More`}
                </button>

                <button
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-all duration-300 hover:scale-105"
                    onClick={onNoneSelection}
                >
                    None Match
                </button>
            </div>
        </div>
    );
};

const BirdAction = () => {
    const { t } = useTranslation();
    const [birdUrl, setBirdUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [probabilities, setProbabilities] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    const onDropZoneInputChange = (imageURL) => {
        setLoading(true);
        setBirdUrl(imageURL);
        setResult(null);
        setError(null);
        setProbabilities(null);
        setSelectedImages([]);
        setLoading(false);
    };

    const handleImageSelect = (imageUrl) => {
        setSelectedImages(prev => {
            if (prev.includes(imageUrl)) {
                return prev.filter(url => url !== imageUrl);
            }
            if (prev.length < 3) {
                return [...prev, imageUrl];
            }
            return prev;
        });
    };

    const getImageClass = (imageUrl) => {
        if (!probabilities) return '';
        if (imageUrl.includes(`/${probabilities.classIndex}_`)) {
            return probabilities.className;
        }
        return probabilities.topPrediction2_class;
    };

    const handleSubmitSelections = async () => {
        if (!birdUrl || !probabilities) return;

        setLoading(true);
        try {
            const classCounts = selectedImages.reduce((acc, img) => {
                const className = getImageClass(img);
                acc[className] = (acc[className] || 0) + 1;
                return acc;
            }, {});

            const adjusted = await getAdjustedPredictions(
                birdUrl,
                probabilities.className,
                probabilities.topPrediction2_class,
                classCounts[probabilities.className] || 0,
                classCounts[probabilities.topPrediction2_class] || 0
            );
            console.log("after adjusted")
            console.log(adjusted)
            console.log("before conversion")
            console.log(birdUrl)
            const cbirdUrl=correctImageUrl(birdUrl);
            setResult({
                ...adjusted,
                s3ImageUrl: birdUrl,
                classifiedBirds: adjusted.final_prediction.class
            });
            console.log("after conversion")
            console.log(cbirdUrl)
            setProbabilities(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNoneSelection = () => {
        setResult({
            class: "None",
            s3ImageUrl: birdUrl,
            classifiedBirds: "None"
        });
        setProbabilities(null);
    };

    const handleActionClick = async (actionType) => {
        if (!birdUrl) {
            alert('Provide a valid input image to proceed');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setProbabilities(null);
        setSelectedImages([]);

        try {
            if (actionType === "validate") {
                const response = await validateBird(birdUrl);
                setResult(response);
            } else {
                const response = await classifyBird(birdUrl);
                console.log(response.classifiedBirds)
                if (response.classifiedBirds && response.classifiedBirds.length === 1) {
                    const probData = await getProbabilities(birdUrl);
                    console.log("after getting probabilities")
                    console.log(probData)
                    setProbabilities(probData);
                    setResult({
                        ...response,
                        s3ImageUrl: birdUrl
                    });
                } else {
                    const uniqueString = [...new Set(response.classifiedBirds)].join(", ");
                    response.classifiedBirds = uniqueString;
                    setResult(response);
                }
            }
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
                <div className="max-md:w-full max-md:mt-4 md:ml-8 w-[60%] rounded-md flex justify-center items-center h-fit border bg-black bg-opacity-30 border-slate-100 p-2 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100 overflow-auto">
                    {error === null && result === null && !probabilities ? (
                        <p>{t('birdAction.resultPlaceholder')}</p>
                    ) : null}

                    {error && (
                        <p className="mt-4 self-center text-red-600">
                            {t('birdAction.errorPrefix')} {error}
                        </p>
                    )}

                    {result && !probabilities && (
                        <div className="text-white flex flex-col justify-center">
                            {result.isBird !== undefined ? (
                                <p className="self-center">
                                    {t('birdAction.ValidationResult')} {result.isBird ? "Contains Bird" : "Doesn't contain any Bird"}
                                </p>
                            ) : (
                                <div className="self-center flex flex-col items-center w-full">
                                    {result.s3ImageUrl && (
                                        <div className="w-64 h-64 mt-2">
                                            <img
                                                src={correctImageUrl(result.s3ImageUrl)}
                                                alt="classified-bird"
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                                    e.target.className = 'w-full h-full object-contain bg-gray-200';
                                                }}
                                            />
                                        </div>
                                    )}
                                    {result.initial_prediction && result.final_prediction ? (
                                       <div className="mt-6 text-center flex  justify-center items-stretch gap-4 w-full">
                                       <div className="bg-gray-800 rounded-lg p-4 flex-1 border-l-4 border-yellow-400 shadow-md hover:shadow-yellow-400/20 transition-all duration-300">
                                           <p className="font-bold text-lg mb-2 text-white">Model Prediction: {result.initial_prediction.class}</p>
                                          
                                           {/* Uncomment if you want to show probability
                                           <p className="text-white text-sm mt-1 opacity-80">
                                               ({(result.initial_prediction.probability * 100).toFixed(2)}% confidence)
                                           </p> */}
                                       </div>
                                       
                                       <div className="bg-gray-800 rounded-lg p-4 flex-1 border-l-4 border-green-400 shadow-md hover:shadow-green-400/20 transition-all duration-300">
                                           <p className="font-bold text-lg mb-2 text-white">User Prediction: {result.final_prediction.class}</p>
                                           
                                           {/* Uncomment if you want to show probability
                                           <p className="text-white text-sm mt-1 opacity-80">
                                               ({(result.final_prediction.probability * 100).toFixed(2)}% confidence)
                                           </p> */}
                                       </div>
                                   </div>
                                    ) : (
                                        <p className="mt-2 text-center">
                                            {result.classifiedBirds}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {probabilities && (
                        <ImageGrid
                            probabilities={probabilities}
                            selectedImages={selectedImages}
                            onImageSelect={handleImageSelect}
                            onSubmitSelections={handleSubmitSelections}
                            onNoneSelection={handleNoneSelection}
                        />
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
                    <div className="flex flex-col items-center space-y-6 mb-10">
                        <div>
                            <button
                                type="button"
                                onClick={() => handleActionClick("validate")}
                                className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 mx-2 rounded border transition delay-100 max-md:w-[30vw] w-[20vw]"
                            >
                                {t('birdAction.validateButton')}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleActionClick("classify")}
                                className="hover:bg-slate-200 hover:text-slate-900 text-white font-bold py-2 px-4 mx-2 rounded border transition delay-100 mas-md:w-[30vw] w-[20vw]"
                            >
                                {t('birdAction.classifyButton')}
                            </button>
                        </div>
                        <div className="mt-6 mb-8 flex justify-center">
  <a 
    href="https://t.me/BirdzClassification_Bot" 
    target="_blank" 
    rel="noopener noreferrer"
    className="
      relative
      inline-flex
      items-center
      justify-center
      px-6 py-3
      text-lg font-bold
      text-white
      bg-gradient-to-r from-cyan-500 to-blue-600
      rounded-xl
      shadow-lg
      hover:shadow-cyan-400/40
      transition-all
      duration-300
      hover:scale-105
      border-2 border-cyan-300/30
      overflow-hidden
      group
    "
  >
    {/* Animated background */}
    <span className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>
    
    {/* Telegram icon with animation */}
    <svg 
      className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110" 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.57-1.38-.93-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.09.06-.42-.08-.59-.14-.17-.42-.12-.6-.07-.26.08-4.39 2.79-6.21 3.92-.59.37-1.13.56-1.62.54-.52-.01-1.52-.3-2.26-.54-.92-.3-1.66-.46-1.59-.97.03-.28.4-.56 1.1-.85 4.43-1.98 7.37-3.39 11.2-5.18.53-.25 1.01-.37 1.44-.38.45-.01 1.38.09 1.99.35.76.33.76.98.72 1.38z"/>
    </svg>
    
    <span className="relative">
      <span className="block text-xl opacity-80 font-bold">Upload via Telegram Bot</span>
      <span className="block text-base font-bold">Classify dozens of bird photos in seconds!</span>
    </span>
    
    {/* Glow effect */}
    <span className="absolute -inset-1 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
  </a>
</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BirdAction;