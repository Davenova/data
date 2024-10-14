'use client';

import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
      ready: () => void;
      navigateTo: (url: string) => void;
    };
  }
}

export default function Home() {
  const [user, setUser ] = useState<any>(null);
  const [inviterInfo, setInviterInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      // Navigate to the index.html page as the initial page
      tg.navigateTo('index.html');
    } else {
      setError('This app should be opened in Telegram');
    }
  }, []);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {user.firstName}!</h1>
      <div className="text-center mb-4">
        <p className="text-lg">Your current points: {user.points}</p>
      </div>

      {/* Add a new section to display the invitedBy data */}
      {user.invitedBy && (
        <div className="text-center mb-4">
          <p>Invited by: {user.invitedBy}</p>
        </div>
      )}

      {/* Additional content can go here... */}

      {notification && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
    </div>
  );
}
