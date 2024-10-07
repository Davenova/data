'use client';

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
  const [buttonStage, setButtonStage] = useState('check'); // 'check', 'claim', 'claimed'
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const initData = tg.initData || '';
      const initDataUnsafe = tg.initDataUnsafe || {};

      if (initDataUnsafe.user) {
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initDataUnsafe.user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setUser(data);
            }
          })
          .catch(() => {
            setError('Failed to fetch user data');
          });
      } else {
        setError('No user data available');
      }
    } else {
      setError('This app should be opened in Telegram');
    }
  }, []);

  const handleClick = async () => {
    if (buttonStage === 'check') {
      window.open('https://www.youtube.com', '_blank');
      setButtonStage('claim'); // Move to claim stage after opening link
    } else if (buttonStage === 'claim' && user) {
      try {
        const res = await fetch('/api/increase-points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegramId: user.telegramId }),
        });
        const data = await res.json();
        if (data.success) {
          setUser({ ...user, points: data.points });
          setNotification('Points increased successfully!');
          setButtonStage('claimed'); // Move to claimed stage
          setTimeout(() => setNotification(''), 3000);
        } else {
          setError('Failed to increase points');
        }
      } catch (err) {
        setError('An error occurred while increasing points');
      }
    }
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
        onClick={handleClick}
        disabled={buttonStage === 'claimed'}
        className={`py-2 px-4 rounded mt-4 ${
          buttonStage === 'check'
            ? 'bg-green-500 hover:bg-green-700'
            : buttonStage === 'claim'
            ? 'bg-orange-500 hover:bg-orange-700'
            : 'bg-lightblue cursor-not-allowed'
        } text-white font-bold`}
      >
        {buttonStage === 'check' && 'Check'}
        {buttonStage === 'claim' && 'Claim'}
        {buttonStage === 'claimed' && 'Claimed'}
      </button>
      {notification && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
    </div>
  );
}
