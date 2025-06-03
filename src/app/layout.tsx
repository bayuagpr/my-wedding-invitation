import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "The Wedding of Shahya & Bayu",
  description: "Join us to celebrate the wedding of Shahya & Bayu on Sunday, 27th July 2025",
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
