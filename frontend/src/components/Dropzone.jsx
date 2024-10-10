import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'; // For making API requests to backend

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 'auto',
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const imgStyle = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const selectedImg = {
    display: 'block',
    width: '100%',
    height: '98%',
    border: '2px solid lightblue'
};

function Dropzone({ onDropZoneInputChange }) {
    const [file, setFile] = useState(null); // Single file state
    const [filePreview, setFilePreview] = useState(""); // Preview of the file
    const [uploading, setUploading] = useState(false); // Upload state

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1, // Limit to 1 file at a time
        onDrop: acceptedFiles => {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile); // Set the file
            setFilePreview(URL.createObjectURL(selectedFile)); // Create a preview
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

    const handleFileUpload = async () => {
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Call the backend API to upload the file to S3
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const s3ImageUrl = response.data.url; // Assume backend returns the S3 URL of the uploaded image
            onDropZoneInputChange(s3ImageUrl); // Pass the S3 URL back to the parent component
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section>
            <div
                {...getRootProps({
                    className: 'rounded-md bg-black bg-opacity-30 border border-slate-100 h-48 p-16 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100',
                })}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select an image</p>
            </div>

            <aside className="rounded-md mt-4 flex min-h-28 border bg-black bg-opacity-30 border-slate-100 p-2 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100">
                {filePreview && (
                    <div style={thumb}>
                        <div style={thumbInner}>
                            <img src={filePreview} alt="Preview" style={imgStyle} />
                        </div>
                    </div>
                )}
            </aside>

            {file && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    onClick={handleFileUpload}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            )}
        </section>
    );
}

export default Dropzone;
