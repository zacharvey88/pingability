'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/pingability-logo.png" 
              alt="Pingability Logo" 
              className="h-8 w-auto"
            />
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-[#05325c]' : 'text-white'
            }`}>
              Pingability
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              About
            </Link>
            <Link
              href="/#pricing"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Contact
            </Link>
            <Link
              href="/custom-bats"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Custom Bats
            </Link>
            <Link
              href="/#pricing"
              className="booking-cursor bg-[#1ac2ab] text-white px-6 py-2 rounded-full hover:bg-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#05325c]" />
            ) : (
              <Menu className="w-6 h-6 text-[#05325c]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Home
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                About
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/#testimonials"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Testimonials
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Contact
              </Link>
              <Link
                href="/custom-bats"
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Custom Bats
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setIsMenuOpen(false)}
                className="booking-cursor bg-gradient-to-r from-[#05325c] to-[#1ac2ab] text-white px-6 py-2 rounded-full hover:from-[#05325c] hover:to-[#1ac2ab] transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
