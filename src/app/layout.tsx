import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "The Wedding of Bayu & Shahya",
  description: "Coming soon: The wedding of Bayu & Shahya on Sunday, 27th July 2025",
  openGraph: {
    title: "The Wedding of Bayu & Shahya",
    description: "You are invited to the wedding of Bayu & Shahya on Sunday, 27th July 2025",
    images: [
      {
        url: "https://res.cloudinary.com/dizje8tlf/image/upload/v1748935028/bayu-shahya-og-image-2_zajyfb.jpg",
        width: 1200,
        height: 630,
        alt: "Bayu & Shahya Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Bayu & Shahya",
    description: "You are invited to the wedding of Bayu & Shahya on Sunday, 27th July 2025",
    images: ["https://res.cloudinary.com/dizje8tlf/image/upload/v1748935028/bayu-shahya-og-image-2_zajyfb.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Prefetch critical images */}
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748856434/OSM-11_b8hidc.jpg" />
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748856443/OSM-48_hejhs5.jpg" />
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748900273/OSM-3-rev-2_sfuw2j.jpg" />
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748856431/OSM-8_ucmzab.jpg" />
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748856432/OSM-5_fq3ttw.jpg" />
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748900273/OSM-10-rev-2_un86ns.jpg" />
        <link rel="prefetch" href="https://res.cloudinary.com/dizje8tlf/image/upload/v1748856445/OSM-51_jdgbz8.jpg" />
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
