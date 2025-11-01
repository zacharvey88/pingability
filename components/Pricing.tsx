'use client'
import { motion } from 'framer-motion'
import { Check, Star, User, Target, Gamepad2, Calendar, BarChart3, Trophy } from 'lucide-react'
import { PRICING, PackageType } from '@/lib/pricing'

export default function Pricing() {
  

  const packages = [
    {
      type: 'single' as PackageType,
      name: 'Single Lesson',
      description: 'Perfect for trying out or occasional practice',
      features: ['1-hour session', 'Personalised coaching', 'Equipment provided', 'Flexible scheduling'],
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display max-w-sm mx-auto sm:max-w-none">
            Lesson Packages
          </h2>
          <p className="text-xl text-[#05325c] max-w-sm mx-auto mb-8 sm:max-w-3xl">
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
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm mx-auto sm:max-w-none ${
                  pkg.popular ? 'ring-2 ring-blue-600' : ''
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

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-[#05325c]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      // Store the package type in sessionStorage
                      sessionStorage.setItem('selectedPackage', pkg.type)
                      // Dispatch custom event to notify Contact component
                      window.dispatchEvent(new Event('packageSelected'))
                      // Scroll to contact form
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#05325c] text-white hover:bg-[#1ac2ab]'
                        : 'bg-[#05325c] text-white hover:bg-[#1ac2ab]'
                    }`}
                  >
                    Select this package
                  </button>
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
            <h3 className="text-3xl md:text-4xl font-bold text-[#05325c] mb-4 font-display max-w-sm mx-auto sm:max-w-none">
              What&apos;s Included in Every Lesson
            </h3>
            <p className="text-lg text-[#05325c] max-w-sm mx-auto sm:max-w-2xl">
              Everything you need for an exceptional table tennis learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: User,
                title: "Personalised Coaching",
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
                description: "Book your sessions as and when you're ready, no fixed schedule"
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description: "Monitor your improvement with progress reports and feedback"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 max-w-sm mx-auto sm:max-w-none"
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
