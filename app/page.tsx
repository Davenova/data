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
  const [buttonStage, setButtonStage] = useState<'check' | 'claim' | 'claimed'>('check')

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

  const handleClick = () => {
    if (buttonStage === 'check') {
      // Open YouTube link
      window.open('https://youtube.com', '_blank')
      setButtonStage('claim')
    } else if (buttonStage === 'claim') {
      // Increase points
      if (user) {
        fetch('/api/increase-points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegramId: user.telegramId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setUser({ ...user, points: data.points })
              setButtonStage('claimed')
              setNotification('Points increased successfully!')
              setTimeout(() => setNotification(''), 3000)
            } else {
              setError('Failed to increase points')
            }
          })
          .catch(() => {
            setError('An error occurred while increasing points')
          })
      }
    }
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>

 return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {user.firstName}!</h1>
    
    {/* Centered points display */}
    <div className="text-center mb-4">
      <p className="text-lg">Your current points: {user.points}</p>
    </div>
    
    <div
      className={`py-2 px-4 rounded mt-4 ${
        buttonStage === 'check'
          ? 'bg-green-500 hover:bg-green-700'
          : buttonStage === 'claim'
          ? 'bg-orange-500 hover:bg-orange-700'
          : 'bg-lightblue' 
      }`}
      >
        <button
          onClick={handleClick}
          disabled={buttonStage === 'claimed'}
          className={`w-full text-white font-bold py-2 rounded ${
            buttonStage === 'claimed' ? 'cursor-not-allowed' : ''
          }`}
        >
          {buttonStage === 'check' && 'Check'}
          {buttonStage === 'claim' && 'Claim'}
          {buttonStage === 'claimed' && 'Claimed'}
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
