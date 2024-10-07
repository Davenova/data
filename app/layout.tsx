"use client"; // Marking this file as a Client Component

import './globals.css'; // Assuming you will place the styles from styles.css here
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { metadata } from './metadata'; // Import the metadata from the metadata.ts file

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for controlling loading and home page visibility
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const images = ['fa fa-gamepad', 'cool.png'];

  useEffect(() => {
    // Hide loading after 5 seconds
    const loadingTimer = setTimeout(() => setLoading(false), 5000);

    // Image change interval
    const imageInterval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter === 1 ? 0 : prevCounter + 1));
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(imageInterval);
    };
  }, []);

  useEffect(() => {
    // Loading animation for percentage
    let num = 0;
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        document.querySelector('.loader span')!.textContent = `${num}%`;
        num++;
      }, i * 50);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className + " bg-gray-100 font-sans"}>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" strategy="beforeInteractive" />
        {loading ? (
          // Loader Section
          <div id="loading-container" className="loader">
            <div className="image">
              {images[counter].startsWith('fa') ? (
                <i className={images[counter]}></i>
              ) : (
                <img src={images[counter]} alt="Loading icon" />
              )}
            </div>
            <span></span>
          </div>
        ) : (
          // Home Section
          <div id="home-container">
            {/* Your home container code here... */}
          </div>
        )}
        {children}
      </body>
    </html>
  );
}