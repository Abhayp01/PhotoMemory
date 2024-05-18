import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        if (!auth) {
            navigate('/login', { replace: true });
        }
        const fetchUploadedImages = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/users/get-images', {
                    credentials: 'include' 
                });

                if (response.ok) {
                    const data = await response.json();
                    setUploadedImages(data.images);
                } else {
                    console.error('Failed to fetch images:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchUploadedImages()
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            document.querySelectorAll('.userimg').forEach(img => {
                if (img.getBoundingClientRect().top < viewportHeight) {
                    img.style.animationPlayState = 'running';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        // Initial check to trigger animations for images already in view
        handleScroll();

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [auth, navigate]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const verifyCookies = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/some-protected-route', {
                credentials: 'include' 
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error verifying cookies:', error);
        }
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/api/v1/users/image-upload', {
                method: 'POST',
                body: formData,
                credentials: 'include' 
            });
            const data = await response.json(); 

            if (response.ok && data.imageUrl) {
                alert('Upload successful!');
                setUploadedImages(prev => [...prev, data.imageUrl]);
            } else {
                console.log(data);
                alert('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Upload failed!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h1 className="text-center text-2xl font-semibold mb-4">Image Upload Site</h1>
            <form onSubmit={handleFileUpload} className="flex flex-col items-center gap-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Image
                </button>
            </form>
            <div className="grid grid-cols-3 gap-4 mt-8">
                {uploadedImages.map((imageUrl, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <img src={imageUrl} alt={`Uploaded ${index}`} className="w-full h-auto userimg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageUpload;
