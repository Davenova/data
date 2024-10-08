'use client'

import { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/types'

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp
    }
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState('')

  // State for both buttons
  const [buttonStage1, setButtonStage1] = useState<'check' | 'claim' | 'claimed'>('check')
  const [buttonStage2, setButtonStage2] = useState<'check' | 'claim' | 'claimed'>('check')

  // New loading states for each button
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()

      const initDataUnsafe = tg.initDataUnsafe || {}

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
              setError(data.error)
            } else {
              setUser(data)
            }
          })
          .catch(() => {
            setError('Failed to fetch user data')
          })
      } else {
        setError('No user data available')
      }
    } else {
      setError('This app should be opened in Telegram')
    }
  }, [])

  const handleIncreasePoints = async (points: number) => {
    if (!user) return

    try {
      const res = await fetch('/api/increase-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId }),
      })
      const data = await res.json()
      if (data.success) {
        setUser({ ...user, points: data.points })
        setNotification(`Points increased successfully! (${points})`)
        setTimeout(() => setNotification(''), 3000)
      } else {
        setError('Failed to increase points')
      }
    } catch {
      setError('An error occurred while increasing points')
    }
  }

  const handleButtonClick1 = () => {
    if (buttonStage1 === 'check') {
      window.open('https://youtu.be/xvFZjo5PgG0', '_blank');
      setButtonStage1('claim'); // Change to claim after opening the link
    }
  }

  const handleButtonClick2 = () => {
    if (buttonStage2 === 'check') {
      window.open('https://twitter.com', '_blank');
      setButtonStage2('claim'); // Change to claim without opening link
    }
  }

  const handleClaim1 = () => {
    if (buttonStage1 === 'claim') {
      setIsLoading1(true); // Show loading state for button 1
      handleIncreasePoints(2); // Increase points by 2
      setTimeout(() => {
        setButtonStage1('claimed'); // After 3 seconds, change to 'claimed'
        setIsLoading1(false); // Stop loading after 3 seconds
      }, 3000); // 3-second delay
    }
  };

  const handleClaim2 = () => {
    if (buttonStage2 === 'claim') {
      setIsLoading2(true); // Show loading state for button 2
      handleIncreasePoints(1); // Increase points by 1
      setTimeout(() => {
        setButtonStage2('claimed'); // Change to 'claimed'
        setIsLoading2(false); // Stop loading after 3 seconds
      }, 3000); // 3-second delay
    }
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {user.firstName}!</h1>
      <div className="text-center mb-4">
        <p className="text-lg">Your current points: {user.points}</p>
      </div>

      {/* First Button for YouTube */}
      <div
        className={`py-2 px-4 rounded mt-4 ${
          buttonStage1 === 'check'
            ? 'bg-green-500 hover:bg-green-700'
            : buttonStage1 === 'claim'
            ? 'bg-orange-500 hover:bg-orange-700'
            : 'bg-lightblue'
        }`}
      >
        <button
          onClick={() => {
            if (buttonStage1 === 'check') {
              handleButtonClick1(); // Opens YouTube link
            } else if (buttonStage1 === 'claim') {
              handleClaim1(); // Triggers claim logic
            }
          }}
          disabled={buttonStage1 === 'claimed' || isLoading1} // Disable when claimed or loading
          className={`w-full text-white font-bold py-2 rounded ${
            buttonStage1 === 'claimed' || isLoading1 ? 'cursor-not-allowed' : ''
          }`}
        >
          {isLoading1 ? <div className="loader"></div> : buttonStage1 === 'check' ? 'Check' : buttonStage1 === 'claim' ? 'Claim' : 'Claimed'}
        </button>
      </div>

      {/* Second Button for Twitter */}
      <div
        className={`py-2 px-4 rounded mt-4 ${
          buttonStage2 === 'check'
            ? 'bg-green-500 hover:bg-green-700'
            : buttonStage2 === 'claim'
            ? 'bg-orange-500 hover:bg-orange-700'
            : 'bg-lightblue'
        }`}
      >
        <button
          onClick={() => {
            handleButtonClick2();
            handleClaim2();
          }}
          disabled={buttonStage2 === 'claimed' || isLoading2} // Disable when claimed or loading
          className={`w-full text-white font-bold py-2 rounded ${
            buttonStage2 === 'claimed' || isLoading2 ? 'cursor-not-allowed' : ''
          }`}
        >
          {isLoading2 ? <div className="loader"></div> : buttonStage2 === 'check' && 'Check'}
          {buttonStage2 === 'claim' && 'Claim'}
          {buttonStage2 === 'claimed' && 'Claimed'}
        </button>
      </div>

      {notification && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
    </div>
  )
}
