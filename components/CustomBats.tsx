'use client'

import { motion } from 'framer-motion'
import { Target, Zap, Star } from 'lucide-react'
import Link from 'next/link'

export default function CustomBats() {
  const features = [
    {
      icon: Target,
      title: 'Personalised Design',
      description: 'Custom blade and rubber combination tailored to your playing style'
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

  return (
    <section id="custom-bats" className="py-20 bg-gradient-to-br from-[#05325c] to-[#1ac2ab] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Level Up Your Game With a Custom Bat
          </h2>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">
            Every player is unique. Your table tennis bat should be too.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-5 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              <div className="w-14 h-14 bg-[#e6f7f5] rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-7 h-7 text-[#1ac2ab]" />
              </div>
              <h3 className="text-lg font-semibold text-[#05325c] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#05325c]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/custom-bats"
            className="inline-block booking-cursor bg-white text-[#05325c] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#1ac2ab] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Learn More About Custom Bats
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

