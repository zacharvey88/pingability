'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-[#05325c] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src="/pingability-logo.png" 
                alt="Pingability Logo" 
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold">Pingability</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional table tennis coaching in Manchester. Transform your game with Alex&apos;s 
              expert guidance and personalised training approach.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#1ac2ab] rounded-full flex items-center justify-center hover:bg-[#05325c] transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1ac2ab] rounded-full flex items-center justify-center hover:bg-[#05325c] transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1ac2ab] rounded-full flex items-center justify-center hover:bg-[#05325c] transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-[#1ac2ab] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-[#1ac2ab] transition-colors"
                >
                  About Alex
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-[#1ac2ab] transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-[#1ac2ab] transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-[#1ac2ab] transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="/custom-bats"
                  className="text-gray-300 hover:text-[#1ac2ab] transition-colors"
                >
                  Custom Bats
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#1ac2ab] mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>St Matthew&apos;s Community Centre</p>
                  <p>Chapel Lane, Stretford</p>
                  <p>Manchester M32 9AJ</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#1ac2ab] mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">Mon 18:00-21:00</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#1ac2ab] mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">info@pingability.co.uk</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#1ac2ab] mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">+44 7432 628588</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-400 text-sm">
                © 2024 Pingability. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Website created by{' '}
                <a 
                  href="https://www.zacharvey.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1ac2ab] hover:text-blue-400 transition-colors"
                >
                  Zac Harvey
                </a>
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-[#1ac2ab] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-[#1ac2ab] text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
