"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10">

            <Link href="/" className="text-2xl font-bold tracking-tight">
                <span className="text-violet-500">PIXEL</span>VAULT
            </Link>

            <div className="flex gap-8 text-sm text-gray-400">

                <Link
                    href="/"
                    className={`transition hover:text-white ${
                        pathname === "/" ? "text-white" : ""
                    }`}
                >
                    Upload
                </Link>

                <Link
                    href="/gallery"
                    className={`transition hover:text-white ${
                        pathname === "/gallery" ? "text-white" : ""
                    }`}
                >
                    Gallery
                </Link>

            </div>
        </nav>
    );
}