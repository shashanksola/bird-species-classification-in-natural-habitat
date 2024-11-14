import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { DNA } from 'react-loader-spinner';

const BACKEND_URL = "43.205.140.97";

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

            const response = await axios.post(`https://${BACKEND_URL}/upload`, formData, {
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

    return (
        <section className='flex justify-center flex-col'>
            <div
                {...getRootProps({
                    className: 'rounded-md bg-black bg-opacity-30 border border-slate-100 h-48 p-16 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100',
                })}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select an image</p>
            </div>

            <aside className="h-[30vh] rounded-md mt-4 flex justify-center min-h-28 border bg-black bg-opacity-30 border-slate-100 p-2 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100">
                {filePreview && (
                    <div style={{
                        display: 'inline-flex',
                        borderRadius: 2,
                        border: '1px solid #eaeaea',
                        marginBottom: 8,
                        marginRight: 8,
                        width: 'auto',
                        height: '100%',
                        padding: 4,
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
                            <img src={filePreview} alt="Preview" style={{ display: 'block', width: 'auto', height: '100%' }} />
                        </div>
                    </div>
                )}
            </aside>
            {uploading && <div className="self-center">
                <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                /></div>}
        </section>
    );
};

export default Dropzone;
