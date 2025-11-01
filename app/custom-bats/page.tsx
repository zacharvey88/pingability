'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Target, Award, Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CustomBats() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consultationType: '',
    playingStyle: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check for preselected budget from pricing section
  useEffect(() => {
    const checkSelectedBudget = () => {
      const selectedBudget = sessionStorage.getItem('selectedBudget')
      if (selectedBudget && (selectedBudget === '80' || selectedBudget === '120' || selectedBudget === '160' || selectedBudget === 'flexible')) {
        setFormData(prev => ({
          ...prev,
          budget: selectedBudget
        }))
        // Clear the sessionStorage after use
        sessionStorage.removeItem('selectedBudget')
      }
    }

    // Check immediately on mount
    checkSelectedBudget()

    // Also check when the section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkSelectedBudget()
          }
        })
      },
      { threshold: 0.1 }
    )

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      observer.observe(contactSection)
    }

    // Listen for custom event when budget is selected
    const handleBudgetSelected = () => {
      checkSelectedBudget()
    }
    window.addEventListener('budgetSelected', handleBudgetSelected)

    // Also check periodically (fallback)
    const interval = setInterval(checkSelectedBudget, 500)

    return () => {
      observer.disconnect()
      window.removeEventListener('budgetSelected', handleBudgetSelected)
      clearInterval(interval)
    }
  }, [])

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    const phoneRegex = /^(\+44|0)[1-9]\d{9,10}$/
    return phoneRegex.test(cleaned) || cleaned.length >= 10
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear errors when user starts typing
    if (name === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
    if (name === 'phone' && errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
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

    setErrors(newErrors)
    if (!isValid) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/custom-bats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          consultationType: '',
          playingStyle: '',
          budget: ''
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const features = [
    {
      icon: Target,
      title: 'Personalised Design',
      description: 'Custom blade and rubber combination tailored to your playing style and preferences'
    },
    {
      icon: Zap,
      title: 'Performance Optimized',
      description: 'Engineered for maximum control, speed, and spin based on your technique'
    },
    {
      icon: Star,
      title: 'Unique to You',
      description: 'One-of-a-kind paddle that reflects your personality and playing characteristics'
    }
  ]

  const process = [
    {
      step: '1',
      title: 'Consultation',
      description: 'Discuss your playing style, preferences, and goals with Alex'
    },
    {
      step: '2',
      title: 'Design',
      description: 'Create a custom specification for your ideal blade and rubber combination'
    },
    {
      step: '3',
      title: 'Crafting',
      description: 'Hand-assemble your custom bat with precision and attention to detail'
    },
    {
      step: '4',
      title: 'Delivery',
      description: 'Receive your personalised table tennis bat ready for action'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Features Section */}
      <section id="features" className="pt-40 pb-20 bg-gradient-to-br from-[#05325c] to-[#1ac2ab] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-full dot-pattern"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
            aria-hidden="true"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Level Up Your Game With a Custom Bat
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Every player is unique. Your table tennis bat should be too.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {features.map((feature, index) => (
              <motion.div
                key={`feature-${index}`}
                initial={false}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: mounted ? index * 0.1 : 0 }}
                className="text-center p-6 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className="w-16 h-16 bg-[#e6f7f5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#1ac2ab]" />
                </div>
                <h3 className="text-xl font-semibold text-[#05325c] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#05325c]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: mounted ? 0.3 : 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
              How It Works
            </h2>
            <p className="text-xl text-[#05325c] max-w-5xl md:max-w-6xl mx-auto">
              From consultation to delivery, we ensure your custom bat is perfect for your game
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {process.map((step, index) => (
              <motion.div
                key={`process-${step.step}-${index}`}
                initial={false}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: mounted ? 0.4 + index * 0.1 : 0 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
              >
                <div className="w-16 h-16 bg-[#05325c] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#05325c] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#05325c]">
                  {step.description}
                </p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 w-8 h-0.5 bg-[#1ac2ab]" style={{ left: 'calc(100% + 1rem - 1rem)' }}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
            Pricing Tiers
          </h2>
            <p className="text-xl text-[#05325c] max-w-3xl mx-auto">
              Professional quality custom bats at competitive prices
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Enthusisat Package',
                  price: '£80',
                  budget: '80',
                  features: ['Quality standard blade', 'Entry-level rubbers', 'Basic customization'],
                  popular: false
                },
                {
                  name: 'Professional Package',
                  price: '£120',
                  budget: '120',
                  features: ['Premium blade', 'High-quality rubbers', 'Full customization'],
                  popular: true
                },
                {
                  name: 'Elite Package',
                  price: '£160',
                  budget: '160',
                  features: ['Tournament-grade blade', 'Professional rubbers', 'Complete personalization'],
                  popular: false
                }
              ].map((pkg, index) => (
                <motion.div
                  key={`pricing-${pkg.name}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative ${
                    pkg.popular ? 'ring-2 ring-[#1ac2ab] scale-105' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#1ac2ab] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#e6f7f5] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏓</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#05325c] mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-[#05325c]">{pkg.price}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-[#1ac2ab] mr-3 flex-shrink-0" />
                        <span className="text-[#05325c]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => {
                      sessionStorage.setItem('selectedBudget', pkg.budget)
                      window.dispatchEvent(new Event('budgetSelected'))
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-[#05325c] text-white hover:bg-[#1ac2ab]'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } booking-cursor`}
                  >
                    Select
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 text-[#05325c]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Ready to Order Your Custom Bat?
            </h2>
            <p className="text-xl text-[#05325c] max-w-3xl mx-auto mb-8">
              Book a free consultation discuss your playing style and create the perfect bat for your game
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-[#1ac2ab] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#05325c]">Thank You!</h3>
                <p className="text-[#05325c] mb-6">
                  We&apos;ve received your inquiry and will get back to you soon via your preferred consultation method.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#1ac2ab] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#05325c] transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={false}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="space-y-6">
                  {/* Consultation Type Selection */}
                  <div>
                    <label htmlFor="consultationType" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Preferred Consultation Method *
                    </label>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      <label className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                        formData.consultationType === 'email' 
                          ? 'border-[#1ac2ab] bg-[#e6f7f5]' 
                          : 'border-gray-300 hover:border-[#1ac2ab]'
                      }`}>
                        <input
                          type="radio"
                          name="consultationType"
                          value="email"
                          checked={formData.consultationType === 'email'}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <div className="flex flex-col items-center">
                          <Mail className={`w-6 h-6 mb-2 ${formData.consultationType === 'email' ? 'text-[#1ac2ab]' : 'text-[#05325c]'}`} />
                          <span className={`text-sm font-medium ${formData.consultationType === 'email' ? 'text-[#05325c]' : 'text-[#05325c]'}`}>Email</span>
                        </div>
                      </label>
                      <label className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                        formData.consultationType === 'phone' 
                          ? 'border-[#1ac2ab] bg-[#e6f7f5]' 
                          : 'border-gray-300 hover:border-[#1ac2ab]'
                      }`}>
                        <input
                          type="radio"
                          name="consultationType"
                          value="phone"
                          checked={formData.consultationType === 'phone'}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <div className="flex flex-col items-center">
                          <Phone className={`w-6 h-6 mb-2 ${formData.consultationType === 'phone' ? 'text-[#1ac2ab]' : 'text-[#05325c]'}`} />
                          <span className={`text-sm font-medium ${formData.consultationType === 'phone' ? 'text-[#05325c]' : 'text-[#05325c]'}`}>Phone</span>
                        </div>
                      </label>
                      <label className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                        formData.consultationType === 'in-person' 
                          ? 'border-[#1ac2ab] bg-[#e6f7f5]' 
                          : 'border-gray-300 hover:border-[#1ac2ab]'
                      }`}>
                        <input
                          type="radio"
                          name="consultationType"
                          value="in-person"
                          checked={formData.consultationType === 'in-person'}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <div className="flex flex-col items-center">
                          <MapPin className={`w-6 h-6 mb-2 ${formData.consultationType === 'in-person' ? 'text-[#1ac2ab]' : 'text-[#05325c]'}`} />
                          <span className={`text-sm font-medium ${formData.consultationType === 'in-person' ? 'text-[#05325c]' : 'text-[#05325c]'}`}>In-Person</span>
                        </div>
                      </label>
                    </div>
                    {formData.consultationType === 'in-person' && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Location:</strong> St Matthew&apos;s Community Centre, Chapel Lane, Stretford, Manchester<br />
                        <strong>Time:</strong> Monday evenings 6-9pm
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-[#05325c] placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-[#05325c] placeholder-gray-400 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-[#05325c] placeholder-gray-400 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="07432 628 588"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Playing Style */}
                  <div className="relative">
                    <label htmlFor="playingStyle" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Playing Style / Preferences
                    </label>
                    <select
                      id="playingStyle"
                      name="playingStyle"
                      value={formData.playingStyle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-[#05325c] appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white">Select your playing style</option>
                      <option value="offensive" className="bg-white">Offensive / Attacking</option>
                      <option value="defensive" className="bg-white">Defensive</option>
                      <option value="all-around" className="bg-white">All-Around</option>
                      <option value="not-sure" className="bg-white">Not Sure / Need Advice</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-[#05325c] absolute right-4 bottom-3 pointer-events-none" />
                  </div>

                  {/* Budget */}
                  <div className="relative">
                    <label htmlFor="budget" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-[#05325c] appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white">Select budget range</option>
                      <option value="80" className="bg-white">£80 - Enthusiast Package</option>
                      <option value="120" className="bg-white">£120 - Professional Package</option>
                      <option value="160" className="bg-white">£160 - Elite Package</option>
                      <option value="flexible" className="bg-white">Flexible / Need Advice</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-[#05325c] absolute right-4 bottom-3 pointer-events-none" />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[#05325c]">
                      Tell Us About Your Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2ab] focus:border-transparent bg-white text-[#05325c] placeholder-gray-400 resize-none"
                      placeholder="Tell us about your playing style, preferences, goals, or any questions you have..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1ac2ab] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed booking-cursor flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
