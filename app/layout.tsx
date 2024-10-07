import type { Metadata } from "next";
import './globals.css'; // Assuming you will place the styles from styles.css here
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home - CATS Dashboard',
  description: 'A simple Telegram mini app using Next.js and Prisma',
};

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
            <div className="bg-gradient-to-r from-blue-100 to-blue-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="IMG_0113.jpeg" alt="Cat icon" className="mr-2" width="24" height="24" />
                <span>Check Our Latest Update!</span>
              </div>
              <button className="bg-white font-bold text-blue-600 px-4 py-2 rounded-full">Check</button>
            </div>

            <div className="p-4">
              <div className="bg-blue-100 text-blue-600 text-center py-2 rounded mb-4">
                Access exclusive streams with <a href="#" className="text-blue-800 font-bold">OG Pass</a> <i className="fa fa-cat"></i>
              </div>

              <div className="text-center mb-6">
                <img src="IMG_0113.jpeg" alt="Cat logo" className="mx-auto mb-4" width="200" height="200" />
                <div className="text-4xl font-bold">18,078 $PixelDogs</div>
                <div className="flex justify-center mt-2 space-x-8">
                  <div className="text-center">
                    <div className="text-gray-500">Rewards</div>
                    <div className="font-bold">+1.4k <i className="fas fa-cat"></i></div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">Tasks</div>
                    <div className="font-bold">+9.3k <i className="fas fa-cat"></i></div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">Invites</div>
                    <div className="font-bold">+263 <i className="fas fa-cat"></i></div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-lg font-bold mb-2">Daily Tasks</div>
                <div className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Login Daily</div>
                      <div className="text-gray-500">+100 $PixelDogs</div>
                      <div className="text-gray-500 text-sm">1 completed</div>
                    </div>
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <i className="fas fa-check"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-lg font-bold mb-2">Tasks</div>
                <div className="bg-white p-4 rounded shadow mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Follow PixelDogs on YouTube</div>
                      <div className="text-gray-500">+50 $PixelDogs</div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" onClick={(e) => e.currentTarget.style.display = 'none'}>Check</button>
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <i className="fab fa-youtube"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Follow PixelDogs on X</div>
                      <div className="text-gray-500">+50 $PixelDogs</div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Check</button>
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <i className="fab fa-twitter"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-blue-600">
                <button className="flex items-center mx-auto">Show more tasks <i className="fas fa-chevron-down ml-2"></i></button>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex justify-around">
              <a href="#" className="text-center">
                <i className="fas fa-home text-gray-500"></i>
                <div className="text-sm text-gray-500">Home</div>
              </a>
              <a href="#" className="text-center">
                <i className="fas fa-user-friends text-gray-500"></i>
                <div className="text-sm text-gray-500">Friends</div>
              </a>
              <a href="#" className="text-center">
                <i className="fas fa-cat text-gray-500"></i>
                <div className="text-sm text-gray-500">Task</div>
              </a>
              <a href="#" className="text-center">
                <i className="fas fa-trophy text-gray-500"></i>
                <div className="text-sm text-gray-500">Wallet</div>
              </a>
            </div>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}