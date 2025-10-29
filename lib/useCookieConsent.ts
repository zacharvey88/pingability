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
        // If previous versions saved a string like "accepted"/"declined", normalise it
        if (cookieConsent === 'accepted') {
          setPreferences({ necessary: true, analytics: true, marketing: true })
        } else if (cookieConsent === 'declined') {
          setPreferences({ necessary: true, analytics: false, marketing: false })
        } else if (cookieConsent.startsWith('{') || cookieConsent.startsWith('[')) {
          const savedPreferences = JSON.parse(cookieConsent)
          setPreferences(savedPreferences)
        } else {
          // Unknown legacy format; reset to necessary-only and overwrite storage
          const fallback = { necessary: true, analytics: false, marketing: false }
          setPreferences(fallback)
          localStorage.setItem('cookieConsent', JSON.stringify(fallback))
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
        const fallback = { necessary: true, analytics: false, marketing: false }
        setPreferences(fallback)
        localStorage.setItem('cookieConsent', JSON.stringify(fallback))
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
