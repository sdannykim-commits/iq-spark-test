import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "IQ Spark — Nonverbal IQ-Style Test",
    description: "Take a fast, modern nonverbal reasoning test. Pay once ($14.99) to unlock your detailed report. No subscription.",
    keywords: ["IQ test", "intelligence test", "nonverbal reasoning", "cognitive test"],
    authors: [{ name: "IQ Spark" }],
    openGraph: {
        title: "IQ Spark — Nonverbal IQ-Style Test",
        description: "Take a fast, modern nonverbal reasoning test. One-time $14.99 payment. No subscription.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen antialiased">
                {children}
            </body>
        </html>
    );
}
