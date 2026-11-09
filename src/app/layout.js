import "./globals.css";

export const metadata = {
    title: "PixelVault",
    description: "Cloud Image Repository"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}