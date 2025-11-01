'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle scroll to section after navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash && pathname === '/') {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const headerHeight = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [pathname])

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle hash links - navigate to home page if needed, then scroll to section
    if (href.startsWith('/#') || href.startsWith('#')) {
      e.preventDefault()
      const hash = href.includes('#') ? href.split('#')[1] : ''
      
      // Always navigate to home page for hash links (to ensure we get the correct section)
      // This ensures Contact link always goes to main page contact form
      if (pathname === '/') {
        // Already on home page, just scroll to section
        const element = document.getElementById(hash)
        if (element) {
          const headerHeight = 80 // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      } else {
        // Not on home page, navigate to home page with hash
        router.push(`/#${hash}`)
      }
      setIsMenuOpen(false) // Close mobile menu if open
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? 'shadow-lg'
          : ''
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
            <span className="text-xl font-bold transition-colors text-[#05325c]">
              Pingability
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="transition-colors text-[#05325c] hover:text-[#1ac2ab]"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={(e) => handleHashClick(e, '/#about')}
              className="transition-colors text-[#05325c] hover:text-[#1ac2ab]"
            >
              About
            </Link>
            <Link
              href="/#pricing"
              onClick={(e) => handleHashClick(e, '/#pricing')}
              className="transition-colors text-[#05325c] hover:text-[#1ac2ab]"
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              onClick={(e) => handleHashClick(e, '/#testimonials')}
              className="transition-colors text-[#05325c] hover:text-[#1ac2ab]"
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              onClick={(e) => handleHashClick(e, '/#contact')}
              className="transition-colors text-[#05325c] hover:text-[#1ac2ab]"
            >
              Contact
            </Link>
            <Link
              href="/custom-bats"
              className="transition-colors text-[#05325c] hover:text-[#1ac2ab]"
            >
              Custom Bats
            </Link>
            <Link
              href="/#pricing"
              onClick={(e) => handleHashClick(e, '/#pricing')}
              className="booking-cursor bg-[#1ac2ab] text-white px-6 py-2 rounded-full hover:bg-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
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
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200 bg-white -mx-4 px-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors text-left text-[#05325c] hover:text-[#1ac2ab]"
              >
                Home
              </Link>
              <Link
                href="/#about"
                onClick={(e) => {
                  handleHashClick(e, '/#about')
                  setIsMenuOpen(false)
                }}
                className="transition-colors text-left text-[#05325c] hover:text-[#1ac2ab]"
              >
                About
              </Link>
              <Link
                href="/#pricing"
                onClick={(e) => {
                  handleHashClick(e, '/#pricing')
                  setIsMenuOpen(false)
                }}
                className="transition-colors text-left text-[#05325c] hover:text-[#1ac2ab]"
              >
                Pricing
              </Link>
              <Link
                href="/#testimonials"
                onClick={(e) => {
                  handleHashClick(e, '/#testimonials')
                  setIsMenuOpen(false)
                }}
                className="transition-colors text-left text-[#05325c] hover:text-[#1ac2ab]"
              >
                Testimonials
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => {
                  handleHashClick(e, '/#contact')
                  setIsMenuOpen(false)
                }}
                className="transition-colors text-left text-[#05325c] hover:text-[#1ac2ab]"
              >
                Contact
              </Link>
              <Link
                href="/custom-bats"
                className="transition-colors text-left text-[#05325c] hover:text-[#1ac2ab]"
              >
                Custom Bats
              </Link>
              <Link
                href="/#pricing"
                onClick={(e) => {
                  handleHashClick(e, '/#pricing')
                  setIsMenuOpen(false)
                }}
                className="booking-cursor bg-gradient-to-r from-[#05325c] to-[#1ac2ab] text-white px-3 py-1.5 rounded-full hover:from-[#05325c] hover:to-[#1ac2ab] transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm w-fit"
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
