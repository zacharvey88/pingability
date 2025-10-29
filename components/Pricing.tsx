'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, User, Target, Gamepad2, Calendar, BarChart3, Trophy } from 'lucide-react'
import { PRICING, PackageType } from '@/lib/stripe'

export default function Pricing() {
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)

  const packages = [
    {
      type: 'single' as PackageType,
      name: 'Single Lesson',
      description: 'Perfect for trying out or occasional practice',
      features: ['1-hour session', 'Personalized coaching', 'Equipment provided', 'Flexible scheduling'],
      popular: false
    },
    {
      type: 'package_3' as PackageType,
      name: '3-Lesson Package',
      description: 'Great for getting started',
      features: ['3 one-hour sessions', 'Progress tracking', 'Equipment provided', 'Flexible scheduling'],
      popular: true
    },
    {
      type: 'package_5' as PackageType,
      name: '5-Lesson Package',
      description: 'Best value for committed players',
      features: ['5 one-hour sessions', 'Progress tracking', 'Equipment provided', 'Flexible scheduling'],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
            Lesson Packages
          </h2>
          <p className="text-xl text-[#05325c] max-w-3xl mx-auto mb-8">
            Choose the perfect package for your table tennis journey
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const price = PRICING[pkg.type]
            const originalPrice = 29
            const savings = pkg.type === 'single' ? 0 : 
              pkg.type === 'package_3' ? originalPrice * 3 - price :
              originalPrice * 5 - price

            return (
              <motion.div
                key={pkg.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#05325c] text-white px-4 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-semibold">Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#05325c] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-[#05325c] mb-6">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-[#05325c]">£{price}</span>
                      {pkg.type !== 'single' && (
                        <span className="text-lg text-[#05325c] ml-2">
                          (was £{originalPrice * (pkg.type === 'package_3' ? 3 : 5)})
                        </span>
                      )}
                    </div>
                    {savings > 0 && (
                      <p className="text-green-600 font-semibold mt-1">
                        Save £{savings}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-[#05325c]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPackage(pkg.type)}
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all booking-cursor ${
                      pkg.popular
                        ? 'bg-[#05325c] text-white hover:bg-[#1ac2ab]'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Request to Book (Bank Transfer)
                  </button>

                  {selectedPackage === pkg.type && (
                    <div className="mt-4 p-4 rounded-lg bg-blue-50 text-[#05325c] text-sm">
                      <p className="font-semibold mb-2">How to pay by bank transfer</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Send the fee (£{price}) via bank transfer</li>
                        <li>Reference: Your name + package (e.g. "Alex package 3")</li>
                        <li>Email confirmation to <a className="underline" href="mailto:info@pingability.co.uk">info@pingability.co.uk</a></li>
                      </ul>
                      <div className="mt-3 bg-white rounded-md p-3 border border-blue-100">
                        <p><strong>Account name:</strong> Pingability</p>
                        <p><strong>Sort code:</strong> 12-34-56</p>
                        <p><strong>Account number:</strong> 12345678</p>
                      </div>
                      <div className="mt-3 flex gap-3">
                        <a href="mailto:info@pingability.co.uk?subject=Booking%20Request&body=Hi%20Alex%2C%0A%0AI%20would%20like%20to%20book%20the%20${encodeURIComponent(pkg.name)}%20package.%20I%20will%20pay%20by%20bank%20transfer.%0A%0AName%3A%0APhone%3A%0APreferred%20times%3A%0A" className="px-4 py-2 rounded-full bg-[#1ac2ab] text-white hover:opacity-90">Email Booking</a>
                        <button onClick={() => setSelectedPackage(null)} className="px-4 py-2 rounded-full border border-[#05325c] text-[#05325c] hover:bg-[#05325c] hover:text-white">Close</button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#05325c] mb-4 font-display">
              What&apos;s Included in Every Lesson
            </h3>
            <p className="text-lg text-[#05325c] max-w-2xl mx-auto">
              Everything you need for an exceptional table tennis learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: User,
                title: "Personalized Coaching",
                description: "One-on-one attention tailored to your skill level and goals"
              },
              {
                icon: Target,
                title: "Technique Analysis",
                description: "Detailed analysis and improvement of your playing technique"
              },
              {
                icon: Gamepad2,
                title: "Tactical Development",
                description: "Strategic game planning and tactical awareness training"
              },
              {
                icon: Trophy,
                title: "Equipment Provided",
                description: "High-quality paddles and balls included in every session"
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Book sessions that fit perfectly with your schedule"
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description: "Monitor your improvement with detailed progress reports"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-12 h-12 bg-[#e6f7f5] rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#1ac2ab]" />
                </div>
                <h4 className="text-lg font-semibold text-[#05325c] mb-2">
                  {item.title}
                </h4>
                <p className="text-[#05325c] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
