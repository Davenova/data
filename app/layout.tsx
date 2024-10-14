import type { Metadata } from "next";
import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Buttons from './buttons'; // Import the Buttons component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram mini app using Next.js and Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - CATS Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Linking External CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
    <!-- Linking External JavaScript -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link rel="stylesheet" href="styles.css"> <!-- link to your CSS file -->
</head>
<body class="bg-gray-100 font-sans">
    <!-- Loading screen container -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <div id="loading-container">
        <div class="loader">
            <div class="image">
                <img src="cool.png" alt="Loading icon" />
            </div>
            <span></span>
        </div>
    </div>
    <!-- Home page container -->
    <div id="home-container" style="display: none;">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-100 to-blue-600 text-white p-4 flex justify-between items-center">
            <div class="flex items-center">
                <img src="IMG_0113.jpeg" alt="Cat icon" class="mr-2" width="24" height="24">
                <span>Check Our Latest Update!</span>
            </div>
            <button class="bg-white font-bold text-Blue-600 px-4 py-2 rounded-full">Check</button>
        </div>
        <!-- Main Content -->
        <div class="p-4">
            <div class="bg-blue-100 text-blue-600 text-center py-2 rounded mb-4">
                Access exclusive streams with <a href="#" class="text-blue-800 font-bold">OG Pass</a> <i class="fa-cat"></i>
            </div>
            <div class="text-center mb-6">
                <img src="IMG_0113.jpeg" alt="Cat logo" class="mx-auto mb-4" width="200" height="200">
                <div class="text-4xl font-bold">18,078 $PixelDogs</div>
                <div class="flex justify-center mt-2 space-x-8">
                    <div class="text-center">
                        <div class="text-gray-500">Rewards</div>
                        <div class="font-bold">+1.4k <i class="fas fa-cat"></i></div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-500">Tasks</div>
                        <div class="font-bold">+9.3k <i class="fas fa-cat"></i></div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-500"> Invites</div>
                        <div class="font-bold">+263 <i class="fas fa-cat"></i></div>
                    </div>
                </div>
            </div>
            <!-- Daily Tasks -->
            <div class="mb-6">
                <div class="text-lg font-bold mb-2 ">Daily Tasks</div>
                <div class="bg-white p-4 rounded shadow">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="font-bold">Login Daily</div >
                            <div class=" text-gray-500">+100 $PixelDogs</div>
                            <div class="text-gray-500 text-sm">1 completed</div>
                        </div>
                        <div class="bg-blue-500 text-white p-2 rounded-full">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Tasks -->
            <div class="mb-6">
                <div class="text-lg font-bold mb-2">Tasks</div>
                <div class="bg-white p-4 rounded shadow mb-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="font-bold"> Follow PixelDogs on YouTube</div>
                            <div class="text-gray-500">+50 $PixelDogs</div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out active:bg-blue-900 active:scale-85" onclick="this.style.display='none'">Check</button>
                            <div class="bg-blue-500 text-white p-2 rounded-full">
                                <i class="fab fa-youtube"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-4 rounded shadow">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="font-bold">Follow PixelDogs on X</div>
                            <div class="text-gray-500">+50 $PixelDogs</div>
                        </div>
                <div class="flex items-center space-x-2">
                    <button id="myButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out active:bg-blue-900 active:scale-85">
                        Check
                    </button>
                    <div class="bg-blue-500 text-white p-2 rounded-full">
                        <i class="fab fa-twitter"></i>
                    </div>
                </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Show more tasks -->
            <div class="text-center text-blue-600">
                <button class="flex items-center mx-auto">Show more tasks <i class="fas fa-chevron-down ml-2"></i></button>
            </div>
        </div>
        <!-- Footer -->
        <div class="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex justify-around">
            <a href="index.html" class="text-center">
                <i class="fas fa-home text-gray-500"></i>
                <div class="text-sm text-gray-500">Home</div>
            </a>
            <a href="https://t.me/data501bot/invos32" class="text-center">
                <i class="fas fa-user-friends text-gray-500"></i>
                <div class="text-sm text-gray-500">Friends</div>
            </a>
            <a href="task.html" class="text-center">
                <i class="fas fa-cat text-gray-500"></i>
                <div class="text-sm text-gray-500">Task</div>
            </a>
            <a href="https://wonmmet.vercel.app/" class="text-center">
                <i class="fas fa-trophy text-gray-500"></i>
                <div class="text-sm text-gray-500">Wallet</div>
            </a>
        </div>
    </div>
    <script src="script2.js"></script> 
</body>
</html>
  );
}
