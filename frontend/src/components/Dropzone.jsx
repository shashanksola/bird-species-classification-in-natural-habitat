import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

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


const img = {
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


function Dropzone(props) {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const updateSelectedFile = (localURL) => {
        setSelectedFile(localURL);
    }

    const thumbs = files.map(file => {
        return <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={file.preview === selectedFile ? selectedImg : img}
                    // Revoke data uri after image is loaded
                    // onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    onClick={() => updateSelectedFile(file.preview)}
                />
            </div>
        </div>
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => {
            URL.revokeObjectURL(file.preview);
        });
    }, []);

    return (
        <section>
            <div {...getRootProps({ className: 'rounded-md bg-black bg-opacity-30 border border-slate-100 h-48 p-16 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className='rounded-md mt-4 flex min-h-28 border bg-black bg-opacity-30 border-slate-100 p-2 text-slate-50 font-bold hover:backdrop-blur-md transition delay-100'>
                {thumbs}
            </aside>
            {files.length >= 1 ? <p style={{ color: 'white' }}>*Click on the image to select a image*</p> : null}
        </section>
    );
}

export default Dropzone;