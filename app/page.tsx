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

  const handleIncreasePoints = async () => {
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
        setNotification('Points increased successfully!')
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
      window.open('https://youtube.com', '_blank');
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
      handleIncreasePoints(); // Add points when claiming
      setButtonStage1('claimed');
    }
  }

  const handleClaim2 = () => {
    if (buttonStage2 === 'claim') {
      handleIncreasePoints(); // Add points when claiming
      setButtonStage2('claimed');
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
            handleButtonClick1();
            handleClaim1();
          }}
          disabled={buttonStage1 === 'claimed'}
          className={`w-full text-white font-bold py-2 rounded ${
            buttonStage1 === 'claimed' ? 'cursor-not-allowed' : ''
          }`}
        >
          {buttonStage1 === 'check' && 'Check'}
          {buttonStage1 === 'claim' && 'Claim'}
          {buttonStage1 === 'claimed' && 'Claimed'}
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
          disabled={buttonStage2 === 'claimed'}
          className={`w-full text-white font-bold py-2 rounded ${
            buttonStage2 === 'claimed' ? 'cursor-not-allowed' : ''
          }`}
        >
          {buttonStage2 === 'check' && 'Check'}
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
