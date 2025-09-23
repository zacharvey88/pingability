'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

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
          <div className="flex items-center space-x-3">
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Contact
            </button>
            <a
              href="/custom-bats"
              className={`transition-colors ${
                isScrolled 
                  ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                  : 'text-white hover:text-[#1ac2ab]'
              }`}
            >
              Custom Bats
            </a>
            <button
              onClick={() => scrollToSection('pricing')}
              className="booking-cursor bg-[#1ac2ab] text-white px-6 py-2 rounded-full hover:bg-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
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
              <button
                onClick={() => scrollToSection('home')}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Contact
              </button>
              <a
                href="/custom-bats"
                className={`transition-colors text-left ${
                  isScrolled 
                    ? 'text-[#05325c] hover:text-[#1ac2ab]' 
                    : 'text-white hover:text-[#1ac2ab]'
                }`}
              >
                Custom Bats
              </a>
              <button
                onClick={() => scrollToSection('pricing')}
                className="booking-cursor bg-gradient-to-r from-[#05325c] to-[#1ac2ab] text-white px-6 py-2 rounded-full hover:from-[#05325c] hover:to-[#1ac2ab] transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
