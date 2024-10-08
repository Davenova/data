'use client'

import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
    };
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState('');
  const [buttonStage1, setButtonStage1] = useState('check');
  const [buttonStage2, setButtonStage2] = useState('check');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetching user data logic here...
  }, []);

  const handleButtonClick1 = () => {
    if (buttonStage1 === 'check') {
      window.open('https://youtube.com', '_blank');
      setButtonStage1('claim');
    } else if (buttonStage1 === 'claim') {
      setIsLoading(true); // Set loading state
      setTimeout(() => {
        setIsLoading(false); // Stop loading after 3 seconds
        setButtonStage1('claimed');
      }, 3000); // Wait for 3 seconds
    }
  };

  const handleButtonClick2 = () => {
    if (buttonStage2 === 'check') {
      window.open('https://twitter.com', '_blank');
      setButtonStage2('claim');
    } else if (buttonStage2 === 'claim') {
      // Increase points logic here...
      setButtonStage2('claimed');
    }
  };

  const handleIncreasePoints = async () => {
    if (!user) return;
    // Points increasing logic...
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <p>Your current points: {user.points}</p>

      <button
        onClick={handleButtonClick1}
        className={`py-2 px-4 rounded mt-4 ${
          buttonStage1 === 'check'
            ? 'bg-green-500 hover:bg-green-700 text-white'
            : buttonStage1 === 'claim'
            ? 'bg-orange-500 hover:bg-orange-700 text-white'
            : 'bg-lightblue-500 text-white cursor-not-allowed'
        }`}
        disabled={buttonStage1 === 'claimed'}
      >
        {isLoading ? 'Loading...' : buttonStage1}
      </button>

      <button
        onClick={handleButtonClick2}
        className={`py-2 px-4 rounded mt-4 ${
          buttonStage2 === 'check'
            ? 'bg-green-500 hover:bg-green-700 text-white'
            : buttonStage2 === 'claim'
            ? 'bg-orange-500 hover:bg-orange-700 text-white'
            : 'bg-lightblue-500 text-white cursor-not-allowed'
        }`}
        disabled={buttonStage2 === 'claimed'}
      >
        {buttonStage2}
      </button>

      {notification && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
    </div>
  );
}
