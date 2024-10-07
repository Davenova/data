// Add this at the top of the file to make it a Client Component
"use client";

import type { Metadata } from "next";
import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram mini app using Next.js and Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mimic the script2.js functionality
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Simulating loading time

    let counter = 0;
    const imageChangeInterval = setInterval(() => {
      if (counter === 3) {
        counter = 0;
      }
      changeImage(counter);
      counter++;
    }, 3000);

    return () => clearInterval(imageChangeInterval);
  }, []);

  const changeImage = (counter: number) => {
    // Logic to change the image
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        {loading ? (
          <div id="loading-container">
            <div className="loader">
              <div className="image">
                <img src="/cool.png" alt="Loading icon" />
              </div>
              <span>Loading...</span>
            </div>
          </div>
        ) : (
          <div id="home-container">
            <div className="bg-gradient-to-r from-blue-100 to-blue-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/IMG_0113.jpeg" alt="Cat icon" className="mr-2" width="24" height="24" />
                <span>Check Our Latest Update!</span>
              </div>
              <button className="bg-white font-bold text-blue-600 px-4 py-2 rounded-full">Check</button>
            </div>
            {/* Continue adding JSX content here based on index.html */}
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
