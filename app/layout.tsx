import type { Metadata } from "next"
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram mini app using Next.js and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta charSet="UTF-8" />
  <title>Home - CATS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <link rel="stylesheet" href="styles.css" />
</head>
      <body className="bg-gray-100 font-sans">
        <div id="loading-container">
          <div className="loader">
            <div className="image">
              <img src="cool.png" alt="Loading icon" />
            </div>
            <span></span>
          </div>
        </div>
        <div id="home-container" style={{ display: 'none' }}>
          <div className="bg-gradient-to-r from-blue-100 to-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="IMG_0113.jpeg" alt="Cat icon" className="mr-2" width="24" height="24" />
              <span>Check Our Latest Update!</span>
            </div>
            <button className="bg-white font-bold text-Blue-600 px-4 py-2 rounded-full">Check</button>
          </div>
          <div className="p-4">
            <div className="bg-blue-100 text-blue-600 text-center py-2 rounded mb-4">
              Access exclusive streams with <a href="#" className="text-blue-800 font-bold">OG Pass</a> <i className="fa-cat"></i>
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
                  <div className="text-gray-500"> Invites</div>
                  <div className="font-bold">+263 <i className="fas fa-cat"></i></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-lg font-bold mb-2 ">Daily Tasks</div>
              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">Login Daily</div >
                    <div className=" text-gray-500">+100 $PixelDogs</div>
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
              <div className="bg-white p-4 rounded shadow mb -4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold"> Follow PixelDogs on YouTube</div>
                    <div className="text-gray-500">+50 $PixelDogs</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out active:bg-blue-900 active:scale-85" onClick={(e) => e.target.style.display = 'none'}>Check</button>
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <i className="fab fa-youtube"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">Follow PixelDogs on X</div>
                    <div className="text-gray-500">+50 $PixelDogs</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button id="myButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out active:bg-blue-900 active:scale-85">
                      Check
                    </button>
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <i className="fab fa-twitter"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-blue-600">
              <button className="flex items-center mx-auto">Show more tasks <i className="fas fa-chevron-down ml-2"></i></button>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex justify-around">
            <a href="index.html" className="text-center">
              <i className="fas fa-home text-gray-500"></i>
              <div className="text-sm text-gray-500">Home</div>
            </a>
            <a href="https://t.me/data501bot/invos32" className="text-center">
              <i className="fas fa-user-friends text-gray-500"></i>
              <div className="text-sm text-gray-500">Friends</div>
            </a>
            <a href="task.html" className="text-center">
              <i className="fas fa-cat text-gray-500"></i>
              <div className="text-sm text-gray-500">Task</div>
            </a>
            <a href="https://wonmmet.vercel.app/" className="text-center">
              <i className="fas fa-trophy text-gray-500"></i>
              <div className="text-sm text-gray-500">Wallet</div>
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
