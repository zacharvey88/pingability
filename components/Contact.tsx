'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, ChevronDown } from 'lucide-react'
import { PRICING } from '@/lib/pricing'

const ORIGINAL_PRICE = 29

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    contactMethod: '',
    hearAbout: '',
    packageType: '',
    startDate: '',
    skillLevel: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  })

  // Check for preselected package from pricing section
  useEffect(() => {
    const checkSelectedPackage = () => {
      const selectedPackage = sessionStorage.getItem('selectedPackage')
      if (selectedPackage && (selectedPackage === 'single' || selectedPackage === 'package_3' || selectedPackage === 'package_5')) {
        setFormData(prev => ({
          ...prev,
          packageType: selectedPackage
        }))
        // Clear the sessionStorage after use
        sessionStorage.removeItem('selectedPackage')
      }
    }

    // Check immediately on mount
    checkSelectedPackage()

    // Also check when the section comes into view (for cases where user navigates directly)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkSelectedPackage()
          }
        })
      },
      { threshold: 0.1 }
    )

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      observer.observe(contactSection)
    }

    // Listen for custom event when package is selected
    const handlePackageSelected = () => {
      checkSelectedPackage()
    }
    window.addEventListener('packageSelected', handlePackageSelected)

    // Also check periodically (fallback)
    const interval = setInterval(checkSelectedPackage, 500)

    return () => {
      observer.disconnect()
      window.removeEventListener('packageSelected', handlePackageSelected)
      clearInterval(interval)
    }
  }, [])

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Remove spaces, dashes, and parentheses for validation
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    // UK phone number patterns:
    // +44... or 0... (UK numbers)
    // International format with +country code
    // Matches: 07123456789, +447123456789, 01234567890, etc.
    const phoneRegex = /^(\+44|0)[1-9]\d{9,10}$/
    return phoneRegex.test(cleaned) || cleaned.length >= 10
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      } else {
        setErrors(prev => ({ ...prev, email: '' }))
      }
    }
    
    if (name === 'phone' && value) {
      if (!validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }))
      } else {
        setErrors(prev => ({ ...prev, phone: '' }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email, phone, and packageType before submission
    let isValid = true
    const newErrors = { email: '', phone: '' }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
      isValid = false
    }

    if (!formData.packageType) {
      isValid = false
      // Browser will show native validation message, but we could add custom error display here
    }

    setErrors(newErrors)

    if (!isValid) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const { error } = await response.json()

      if (error) {
        console.error('Error submitting form:', error)
        alert('Failed to send message. Please try again.')
        return
      }
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        contactMethod: '',
        hearAbout: '',
        packageType: '',
        startDate: '',
        skillLevel: ''
      })
      setErrors({ email: '', phone: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (name === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
    if (name === 'phone' && errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-12 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-4xl font-bold text-[#05325c] mb-4">
              Thank You!
            </h2>
            <p className="text-xl text-[#05325c] mb-8">
              Your message has been sent successfully. Alex will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#05325c] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1ac2ab] transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-12 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
            Get In Touch
          </h2>
          <p className="text-xl text-[#05325c] max-w-3xl mx-auto">
            Ready to book? Got question? Get in touch below and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                src="/contact-image.jpg"
                alt="Table tennis coaching session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4" key={isSubmitted ? 'reset' : 'normal'}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#05325c] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#05325c] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#05325c] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="packageType" className="block text-sm font-medium text-[#05325c]">
                    Interested In *
                  </label>
                  <button
                    type="button"
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs text-[#05325c] hover:text-[#1ac2ab] hover:underline transition-colors"
                  >
                    Not sure? Check packages.
                  </button>
                </div>
                <div className="relative">
                  <select
                    id="packageType"
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    required
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent appearance-none bg-white"
                  >
                    <option value="" disabled className="text-[#05325c]">Select an option...</option>
                    <option value="general">General Inquiry</option>
                    <option value="single">Single Lesson (£{PRICING.single})</option>
                    <option value="package_3">3-Lesson Package (£{PRICING.package_3} *Save £{ORIGINAL_PRICE * 3 - PRICING.package_3}*)</option>
                    <option value="package_5">5-Lesson Package (£{PRICING.package_5} *Save £{ORIGINAL_PRICE * 5 - PRICING.package_5}*)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className={`grid gap-4 ${formData.packageType && formData.packageType !== 'general' ? 'md:grid-cols-2' : ''}`}>
                <div>
                  <label htmlFor="skillLevel" className="block text-sm font-medium text-[#05325c] mb-2">
                    Current Skill Level
                  </label>
                  <div className="relative">
                    <select
                      id="skillLevel"
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="" disabled className="text-[#05325c]">Select an option...</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="professional">Professional</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {formData.packageType && formData.packageType !== 'general' && (
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-[#05325c] mb-2">
                      {formData.packageType === 'single' ? 'Preferred Date' : 'Preferred Start Date'}
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-gray-700"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#05325c] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent placeholder-gray-500 bg-white"
                  placeholder="Tell us about your table tennis experience, goals, or any questions you have..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactMethod" className="block text-sm font-medium text-[#05325c] mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="relative">
                    <select
                      id="contactMethod"
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="" disabled className="text-[#05325c]">Select an option...</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                      <option value="any">Any method is fine</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="hearAbout" className="block text-sm font-medium text-[#05325c] mb-2">
                    How did you hear about us?
                  </label>
                  <div className="relative">
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="" disabled className="text-[#05325c]">Select an option...</option>
                      <option value="google">Google Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Friend/Family Referral</option>
                      <option value="website">Website/Online</option>
                      <option value="community">Community Centre</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#05325c] hover:bg-[#1ac2ab] text-white'
                }`}
              >
                {isSubmitting 
                  ? 'Sending...' 
                  : formData.packageType && formData.packageType !== 'general' 
                    ? 'Submit booking request' 
                    : 'Send Message'
                }
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
