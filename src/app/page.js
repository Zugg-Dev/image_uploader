"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [message, setMessage] = useState("");

    function handleImage(file) {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage("Image must be smaller than 5MB.");
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
        setMessage("");
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);

        handleImage(e.dataTransfer.files[0]);
    }

    function handleUpload() {
        if (!image) return;

        const reader = new FileReader();

        reader.onload = () => {
            const savedImages = JSON.parse(
                localStorage.getItem("pixelvault-images") || "[]"
            );

            savedImages.push({
                id: Date.now(),
                name: image.name,
                size: image.size,
                url: reader.result,
                date: new Date().toLocaleDateString()
            });

            localStorage.setItem(
                "pixelvault-images",
                JSON.stringify(savedImages)
            );

            setImage(null);
            setPreview(null);
            setMessage("Image added to your gallery!");
        };

        reader.readAsDataURL(image);
    }

    return (
        <main className="min-h-screen bg-[#09090f]">
            <Navbar />

            <section className="max-w-3xl mx-auto px-6 py-20">

                <div className="mb-10">
                    <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
                        Image Management
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Upload your images.
                    </h1>

                    <p className="text-gray-400">
                        Store and manage your images in one place.
                        Upload an image to get started.
                    </p>
                </div>

                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() =>
                        document.getElementById("imageInput").click()
                    }
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${
                        dragging
                            ? "border-violet-400 bg-violet-500/10"
                            : "border-white/15 bg-[#11111b] hover:border-violet-500/60"
                    }`}
                >
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleImage(e.target.files[0])}
                    />

                    {preview ? (
                        <div className="space-y-5">
                            <img
                                src={preview}
                                alt="Image preview"
                                className="max-h-72 mx-auto rounded-xl object-contain"
                            />

                            <p className="font-semibold">{image.name}</p>

                            <p className="text-gray-500 text-sm">
                                Click to select another image
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="w-16 h-16 rounded-2xl bg-violet-500/15 flex items-center justify-center mx-auto text-violet-400 text-3xl">
                                ↑
                            </div>

                            <div>
                                <p className="text-lg font-semibold">
                                    Drop your image here
                                </p>

                                <p className="text-gray-500 text-sm mt-2">
                                    Or click to browse your files
                                </p>
                            </div>

                            <p className="text-gray-600 text-xs">
                                PNG, JPG, WEBP • Maximum 5MB
                            </p>
                        </div>
                    )}
                </div>

                {message && (
                    <p className="text-center text-sm text-violet-400 mt-5">
                        {message}
                    </p>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!image}
                    className="w-full mt-6 py-4 rounded-xl font-semibold bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-500 transition"
                >
                    Upload Image
                </button>

                <p className="text-center text-gray-600 text-xs mt-6">
                    Powered by Microsoft Azure Blob Storage
                </p>

            </section>
        </main>
    );
}