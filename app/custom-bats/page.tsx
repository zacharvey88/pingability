'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Target, Award, Mail, Phone, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CustomBats() {
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
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#05325c] to-[#1ac2ab] text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
              Level Up With a Custom Bat
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Personalised paddles engineered for your unique playing style and training goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="booking-cursor bg-[#1ac2ab] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Order Your Custom Bat
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
              Why Choose a Custom Bat?
            </h2>
            <p className="text-xl text-[#05325c] max-w-3xl mx-auto">
              Every player is unique. Your table tennis bat should be too.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
              How It Works
            </h2>
            <p className="text-xl text-[#05325c] max-w-3xl mx-auto">
              From consultation to delivery, we ensure your custom bat is perfect for your game
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
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
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-[#1ac2ab]"></div>
                  </div>
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
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
              Custom Bat Pricing
            </h2>
            <p className="text-xl text-[#05325c] max-w-3xl mx-auto">
              Professional quality custom bats at competitive prices
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Basic Package',
                  price: '£80',
                  features: ['Standard blade', 'Entry-level rubbers', 'Basic customization'],
                  popular: false
                },
                {
                  name: 'Professional Package',
                  price: '£120',
                  features: ['Premium blade', 'High-quality rubbers', 'Full customization'],
                  popular: true
                },
                {
                  name: 'Elite Package',
                  price: '£160',
                  features: ['Tournament-grade blade', 'Professional rubbers', 'Complete personalization'],
                  popular: false
                }
              ].map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-[#05325c] text-white hover:bg-[#1ac2ab]'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } booking-cursor`}
                  >
                    Get Quote
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#05325c] to-[#1ac2ab] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Ready to Order Your Custom Bat?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Let&apos;s discuss your playing style and create the perfect bat for your game
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-4 bg-[#1ac2ab]/20 rounded-lg text-center">
              <p className="text-sm text-gray-200">
                <strong>Free consultation:</strong> No obligation to purchase. We&apos;re here to help you find the perfect bat for your game.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 bg-[#1ac2ab] rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Consultation</h3>
                    <p className="text-gray-200 text-sm mb-4">Get a detailed quote via email</p>
                  </div>
                </div>
                <a 
                  href="mailto:info@pingability.co.uk" 
                  className="text-white text-lg hover:text-[#1ac2ab] transition-colors font-medium text-center block"
                >
                  info@pingability.co.uk
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 bg-[#1ac2ab] rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone Consultation</h3>
                    <p className="text-gray-200 text-sm mb-4">Discuss your requirements directly</p>
                  </div>
                </div>
                <a 
                  href="tel:07432628588" 
                  className="text-white text-lg hover:text-[#1ac2ab] transition-colors font-medium text-center block"
                >
                  07432 628 588
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 bg-[#1ac2ab] rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">In-Person Meeting</h3>
                    <p className="text-gray-200 text-sm mb-4">Visit us for a hands-on consultation</p>
                  </div>
                </div>
                <div className="text-white text-center">
                  <p className="font-medium">St Matthew&apos;s Community Centre</p>
                  <p className="text-gray-200 text-sm">Chapel Lane, Stretford, Manchester</p>
                  <p className="text-gray-200 text-sm mt-1">Monday evenings 6-9pm</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
