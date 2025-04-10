/* eslint-disable react/prop-types */
import { useState } from "react";
import Dropzone from "./Dropzone";
import { DNA } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import BirdInfoDisplay from "./BirdInfoDisplay";

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

const correctImageUrl = (url) => {
    return url.replace(/\.JPG$/i, '.jpg');
};

const ImageGrid = ({ probabilities, selectedImages, onImageSelect, onSubmitSelections, onNoneSelection }) => {
    const visibleImages = probabilities?.images || [];
    
    // Handle image selection with visual feedback
    const handleImageSelect = (img) => {
        // Apply click animation through DOM for better performance
        const element = document.getElementById(`img-container-${visibleImages.indexOf(img)}`);
        if (element) {
            // Add a temporary inline style for the click effect
            element.style.transform = 'scale(0.95)';
            element.style.transition = 'transform 0.15s ease';
            
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        }
        
        // Call the original selection handler
        onImageSelect(img);
    };

    return (
        <div className="w-full p-6 max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-2xl border border-gray-800 backdrop-blur-lg text-white">
            <h3 className="text-2xl font-bold mb-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                Select 3 similar images <span className="text-yellow-400">({selectedImages.length}/3)</span>
            </h3>

            <div className="mb-6 flex justify-center">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
                    {visibleImages.slice(0, 6).map((img, idx) => {
                        const correctedUrl = correctImageUrl(img);
                        const isSelected = selectedImages.includes(img);
                        const isFirstClass = img.includes(`/${probabilities.classIndex}_`);
                        const classLabel = isFirstClass ? probabilities.className : probabilities.topPrediction2_class;
                        const labelColor = isFirstClass ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600';
                        
                        // Container styling
                        const containerStyle = {
                            position: 'relative',
                            cursor: 'pointer',
                            height: '200px',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            margin: '2px', // Minimal gap between images
                            ...(isSelected ? {
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', // No yellow border, just a shadow
                                transform: 'scale(1.05)'
                            } : {
                                ':hover': {
                                    opacity: 0.95,
                                    transform: 'scale(1.03)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }
                            })
                        };

                        return (
                            <div
                                id={`img-container-${idx}`}
                                key={`img-${idx}`}
                                className="relative cursor-pointer rounded-xl overflow-hidden"
                                style={containerStyle}
                                onClick={() => handleImageSelect(img)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleImageSelect(img);
                                    }
                                }}
                                title={classLabel}
                                tabIndex={0}
                                role="button"
                                aria-pressed={isSelected}
                                aria-label={`${classLabel} image${isSelected ? ' (selected)' : ''}`}
                            >
                                <div style={{
                                    position: 'absolute',
                                    inset: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#1f2937'
                                }}>
                                    <div style={{
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '9999px',
                                        border: '3px solid #d1d5db',
                                        borderTopColor: 'transparent',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                </div>
                                <img
                                    src={correctedUrl}
                                    alt={`${classLabel}-example`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        position: 'relative',
                                        zIndex: '10',
                                        transition: 'transform 0.5s ease',
                                        ':hover': {
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                    onError={(e) => {
                                        if (e.target.src !== img) {
                                            e.target.src = img;
                                        } else {
                                            e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Found';
                                            e.target.style.backgroundColor = '#374151';
                                        }
                                    }}
                                />
                                <div className={`absolute bottom-0 left-0 right-0 ${labelColor} bg-opacity-85 py-2 text-center text-sm font-medium truncate z-20`}>
                                    {classLabel}
                                </div>
                                
                                {isSelected && (
                                    <>
                                        {/* Pulsing overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: '0',
                                            backgroundColor: 'rgba(251, 191, 36, 0.2)',
                                            zIndex: '20',
                                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                        }}></div>
                                        
                                        {/* Order number badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '0.75rem',
                                            right: '0.75rem',
                                            backgroundColor: '#FBBF24',
                                            color: 'black',
                                            borderRadius: '9999px',
                                            width: '2rem',
                                            height: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            zIndex: '30'
                                        }}>
                                            {selectedImages.indexOf(img) + 1}
                                        </div>
                                        
                                        {/* Checkmark badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '0.75rem',
                                            left: '0.75rem',
                                            backgroundColor: '#10B981',
                                            color: 'white',
                                            borderRadius: '9999px',
                                            width: '2rem',
                                            height: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            zIndex: '30'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
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

            <div className="w-full bg-gray-700 h-3 rounded-full mb-6 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${(selectedImages.length / 3) * 100}%` }}
                />
            </div>
            
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-5">
                <button
                    className={`px-6 sm:px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 border border-white ${
                        selectedImages.length === 3
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105'
                            : 'bg-gray-600 opacity-70 cursor-not-allowed'
                    }`}
                    onClick={onSubmitSelections}
                    disabled={selectedImages.length !== 3}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {selectedImages.length === 3 && (
                        <span 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                                transform: 'translateX(-100%)',
                                animation: 'shimmer 2s infinite',
                            }}
                        />
                    )}
                  Confirm Selection
                </button>

                <button
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r border border-white from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/30 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105"
                    onClick={onNoneSelection}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <span 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                            transform: 'translateX(-100%)',
                            animation: 'shimmer 2s infinite',
                        }}
                    />
                    None of These
                </button>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 0.3; }
                }
            `}</style>
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
            console.log(adjusted)
          
            setResult({
                ...adjusted,
                s3ImageUrl: birdUrl,
                classifiedBirds: adjusted.final_prediction.class
            });
            
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
            classifiedBirds: "Hmm, this bird doesn't match any species in our system. We're constantly expanding—stay tuned!"
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

    // Custom button styles 
    const buttonBaseStyle = {
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.875rem 1.5rem',
        fontWeight: 'bold',
        borderRadius: '0.75rem',
        minWidth: '200px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const validateButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        border: '1px solid rgba(99, 102, 241, 0.5)',
    };

    const classifyButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
        border: '1px solid rgba(14, 165, 233, 0.5)',
    };

    const buttonHoverStyle = {
        transform: 'translateY(-2px) scale(1.03)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    };

    return (
        <div className="min-h-screen bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/classify-bg.svg')] bg-cover bg-fixed bg-center pt-16 pb-20" id="process">
            <div className="container mx-auto px-4">
                <div className="rounded-xl p-8 md:flex items-center w-full md:flex-row justify-around bg-black bg-opacity-20 backdrop-blur-sm shadow-2xl border border-gray-800">
                    <Dropzone onDropZoneInputChange={onDropZoneInputChange} />
                    
                    <div className="max-md:w-full max-md:mt-8 md:ml-8 w-full md:w-3/5 rounded-xl flex justify-center items-center h-fit border border-gray-700 bg-black bg-opacity-50 backdrop-blur-md p-6 text-slate-50 font-medium shadow-lg transition-all duration-300 hover:border-cyan-700 overflow-auto">
                        {error === null && result === null && !probabilities ? (
                            <div className="text-center py-8 px-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p className="text-xl">{t('birdAction.resultPlaceholder')}</p>
                            </div>
                        ) : null}

                        {error && (
                            <div className="bg-red-500 bg-opacity-20 border border-red-700 rounded-lg p-4 w-full text-center">
                                <svg className="w-6 h-6 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p className="text-red-100 font-medium">
                                    {t('birdAction.errorPrefix')} {error}
                                </p>
                            </div>
                        )}

                        {result && !probabilities && (
                            <div className="text-white flex flex-col justify-center w-full">
                                {result.isBird !== undefined ? (
                                    <div className={`text-center p-6 rounded-xl ${result.isBird ? 'bg-green-500 bg-opacity-20 border border-green-700' : 'bg-amber-500 bg-opacity-20 border border-amber-700'}`}>
                                        <svg className={`w-16 h-16 mx-auto mb-4 ${result.isBird ? 'text-green-400' : 'text-amber-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            {result.isBird ? 
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path> :
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            }
                                        </svg>
                                        <p className="text-xl font-bold">
                                            {t('birdAction.ValidationResult')} {result.isBird ? "Contains Bird" : "Doesn't contain any Bird"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="self-center flex flex-col items-center w-full">
                                        {result.s3ImageUrl && (
                                            <div style={{ width: '400px', height: '250px', marginTop: '8px', overflow: 'hidden', marginBottom: '24px', display:"flex" , flexDirection:"row", justifyContent:"center"}}>
                                            <img
                                              src={result.s3ImageUrl}
                                              alt="classified-bird"
                                              style={{ width: 'full', height: '250px', objectFit: 'contain', backgroundColor: '#1a202c' }}
                                              onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                                e.target.style.width = '400px';
                                                e.target.style.height = '250px';
                                                e.target.style.objectFit = 'contain';
                                                e.target.style.backgroundColor = '#2d3748';
                                              }}
                                            />
                                          </div>
                                        )}
                                        {result.initial_prediction && result.final_prediction ? (<>
                                            <div className="mt-6 text-center flex flex-col md:flex-row justify-center items-stretch gap-6 w-full">
                                                <div className="bg-gray-800 rounded-xl p-5 flex-1 border-l-4 border-yellow-400 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                                                    <p className="font-bold text-xl mb-2 text-white">Pre-User Prediction: <span className="text-slate-200">{result.initial_prediction.class}</span></p>
                                                    
                                                </div>
                                                
                                                <div className="bg-gray-800 rounded-xl p-5 flex-1 border-l-4 border-green-400 shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                                                    <p className="font-bold text-xl mb-2 text-white">Final Prediction: {result.final_prediction.class}</p>
                                                   
                                                </div>
                                            </div>
                                            {result.final_prediction && <BirdInfoDisplay name={result.final_prediction.class}/>}
                                            </>

                                        ) : (
                                            <div className="mt-6 text-center p-6 bg-blue-500 bg-opacity-20 border border-blue-700 rounded-xl w-full">
                                                <p className="text-xl font-bold mb-2">Classification Result:</p>
                                                <p className="text-blue-300 text-xl">
                                                    {console.log(result.classifiedBirds)}
                                                    
                                                 {
                                                    result?result.classifiedBirds:" Hmm, this bird doesn't match any species in our system. We're constantly expanding—stay tuned!"
                                                 }
                                                   
                                                </p>
                                            </div>
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
                        <div className="flex flex-col items-center">
                            <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                            <p className="mt-4 text-white text-xl">Processing your image...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-8">
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleActionClick("validate")}
                                    style={validateButtonStyle}
                                    onMouseOver={(e) => {
                                        Object.assign(e.currentTarget.style, buttonHoverStyle);
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = buttonBaseStyle.boxShadow;
                                    }}
                                >
                                    <span style={{ 
                                        position: 'absolute', 
                                        top: 0, 
                                        left: 0, 
                                        right: 0, 
                                        bottom: 0, 
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                                        transform: 'translateX(-100%)',
                                        animation: 'shimmer 2s infinite'
                                    }}></span>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {t('birdAction.validateButton')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleActionClick("classify")}
                                    style={classifyButtonStyle}
                                    onMouseOver={(e) => {
                                        Object.assign(e.currentTarget.style, buttonHoverStyle);
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = buttonBaseStyle.boxShadow;
                                    }}
                                >
                                    <span style={{ 
                                        position: 'absolute', 
                                        top: 0, 
                                        left: 0, 
                                        right: 0, 
                                        bottom: 0, 
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                                        transform: 'translateX(-100%)',
                                        animation: 'shimmer 2s infinite'
                                    }}></span>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                    {t('birdAction.classifyButton')}
                                </button>
                            </div>
                            
                            <div className="mt-10 mb-8 flex justify-center">
                                <a 
                                    href="https://t.me/BirdzClassification_Bot" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-105 border-2 border-cyan-300/30 overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>
                                    
                                    <svg 
                                        className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 transition-transform duration-300 group-hover:scale-110" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.57-1.38-.93-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.09.06-.42-.08-.59-.14-.17-.42-.12-.6-.07-.26.08-4.39 2.79-6.21 3.92-.59.37-1.13.56-1.62.54-.52-.01-1.52-.3-2.26-.54-.92-.3-1.66-.46-1.59-.97.03-.28.4-.56 1.1-.85 4.43-1.98 7.37-3.39 11.2-5.18.53-.25 1.01-.37 1.44-.38.45-.01 1.38.09 1.99.35.76.33.76.98.72 1.38z"/>
                                    </svg>
                                    
                                    <span className="relative flex flex-col">
                                        <span className="block text-base sm:text-xl font-bold">{t('birdAction.BotHeader')}</span>
                                        <span className="block text-xs sm:text-base font-medium text-cyan-200">{t('birdAction.BotPara')}</span>
                                    </span>
                                    
                                    <span className="absolute -inset-1 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BirdAction;