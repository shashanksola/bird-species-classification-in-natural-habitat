import  { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { DNA } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';

const BACKEND_URL = "https://mytownly.in";
//const BACKEND_URL = "https://localhost:443";

// eslint-disable-next-line react/prop-types
const Dropzone = ({ onDropZoneInputChange }) => {
    const [filePreview, setFilePreview] = useState(""); // Preview of the file
    const [uploading, setUploading] = useState(false); // Upload state

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            setFilePreview(URL.createObjectURL(selectedFile)); // Create a preview
            await handleFileUpload(selectedFile); // Immediately upload the file
        }
    });

    useEffect(() => {
        // Revoke the object URL to free memory when the component unmounts or the file changes
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);

    const handleFileUpload = async (file) => {
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Call the backend API to upload the file to S3
            const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const s3ImageUrl = response.data.url;
            console.log(s3ImageUrl);
            onDropZoneInputChange(s3ImageUrl); // Pass the uploaded image URL back to parent component
        } catch (error) {
            alert('Upload Failed');
            console.error('Error uploading file:', error);
            console.log('Failed to upload image.');
        } finally {
            setUploading(false);
        }
    };
    
    const { t } = useTranslation();
    
    return (
        <section className="flex justify-center flex-col">
            <div
                {...getRootProps({
                    className: 'rounded-md bg-white/80 border border-slate-200 h-48 p-16 text-blue-600 font-medium hover:bg-blue-50 transition duration-300 shadow-sm cursor-pointer',
                })}
            >
                <input {...getInputProps()} />
                <p className="text-center flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {t('drop.input')}
                </p>
            </div>

            <aside className="h-[30vh] rounded-md mt-4 flex justify-center min-h-28 border bg-slate-50 border-slate-200 p-2 text-slate-800 shadow-sm transition duration-300">
                {filePreview ? (
                    <div className="rounded-md p-1 overflow-hidden h-full">
                        <img 
                            src={filePreview} 
                            alt="Preview" 
                            className="h-full w-auto object-contain rounded-md" 
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center text-slate-400">
                        <p>Image preview will appear here</p>
                    </div>
                )}
            </aside>
            
            {uploading && (
                <div className="self-center mt-4">
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                    <p className="text-blue-600 text-center mt-2">Uploading image...</p>
                </div>
            )}
        </section>
    );
};

export default Dropzone;