'use client'

import { useState, useEffect } from 'react'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      try {
        const savedPreferences = JSON.parse(cookieConsent)
        setPreferences(savedPreferences)
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences)
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences))
  }

  const hasConsent = (type: keyof CookiePreferences) => {
    return preferences[type] === true
  }

  const canUseAnalytics = () => {
    return isLoaded && hasConsent('analytics')
  }

  const canUseMarketing = () => {
    return isLoaded && hasConsent('marketing')
  }

  return {
    preferences,
    isLoaded,
    updatePreferences,
    hasConsent,
    canUseAnalytics,
    canUseMarketing
  }
}
