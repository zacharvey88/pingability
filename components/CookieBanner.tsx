'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Settings } from 'lucide-react'
import { useCookieConsent, CookiePreferences } from '@/lib/useCookieConsent'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { preferences, updatePreferences, isLoaded } = useCookieConsent()

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent && isLoaded) {
      setIsVisible(true)
    }
  }, [isLoaded])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    updatePreferences(allAccepted)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    updatePreferences(onlyNecessary)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    updatePreferences(preferences)
    setIsVisible(false)
    setShowSettings(false)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't change necessary cookies
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    }
    updatePreferences(newPreferences)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {!showSettings ? (
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <Cookie className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    We use cookies
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalised content, 
                    and analyse our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                    You can manage your preferences at any time.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                >
                  <Settings className="w-4 h-4" />
                  Customise
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Essential for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      preferences.analytics ? 'translate-x-4' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Used to deliver personalised advertisements and track campaign performance.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.marketing ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      preferences.marketing ? 'translate-x-4' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
