"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const savedImages = JSON.parse(
            localStorage.getItem("pixelvault-images") || "[]"
        );

        setImages(savedImages);
    }, []);

    function deleteImage(id) {
        const updatedImages = images.filter(
            (image) => image.id !== id
        );

        localStorage.setItem(
            "pixelvault-images",
            JSON.stringify(updatedImages)
        );

        setImages(updatedImages);
    }

    return (
        <main className="min-h-screen bg-[#09090f]">
            <Navbar />

            <section className="max-w-6xl mx-auto px-6 py-16">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">

                    <div>
                        <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
                            Your Collection
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Image Gallery.
                        </h1>

                        <p className="text-gray-400">
                            Browse and manage your uploaded images.
                        </p>
                    </div>

                    <div className="bg-[#151520] border border-white/10 rounded-xl px-6 py-4">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                            Total Images
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {images.length}
                        </p>
                    </div>

                </div>

                {images.length === 0 ? (
                    <div className="border border-dashed border-white/15 bg-[#11111b] rounded-2xl py-24 text-center">

                        <div className="text-5xl text-violet-400 mb-5">
                            ▧
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            Your gallery is empty
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Upload your first image to see it here.
                        </p>

                        <a
                            href="/"
                            className="inline-block bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Upload Image
                        </a>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="bg-[#11111b] border border-white/10 rounded-2xl overflow-hidden group"
                            >
                                <div className="h-64 bg-black flex items-center justify-center">
                                    <img
                                        src={image.url}
                                        alt={image.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-5">

                                    <div className="flex justify-between items-start gap-3">

                                        <div className="min-w-0">
                                            <h3 className="font-semibold truncate">
                                                {image.name}
                                            </h3>

                                            <p className="text-gray-500 text-xs mt-2">
                                                {(image.size / 1024).toFixed(1)} KB
                                            </p>

                                            <p className="text-gray-600 text-xs mt-1">
                                                Uploaded {image.date}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => deleteImage(image.id)}
                                            className="text-gray-500 hover:text-red-400 transition text-sm"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </section>
        </main>
    );
}