'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { scrollDocumentToSection } from '@/lib/scrollSections'
function useIsDesktopLg() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isDesktop
}

const NAV_LINK_CLASS =
  'block rounded-lg px-3 py-3 text-left text-[#111111] transition-colors duration-200 ease-out hover:bg-black/[0.06] hover:text-[#A4041F]'

const MENU_TOGGLE_CLASS =
  'flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition-colors hover:bg-white hover:ring-black/10'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isDesktop = useIsDesktopLg()
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleCloseDesktop = useCallback(() => {
    if (!isDesktop) return
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setIsMenuOpen(false)
      closeTimerRef.current = null
    }, 180)
  }, [isDesktop, clearCloseTimer])

  const openDesktopMenu = useCallback(() => {
    if (!isDesktop) return
    clearCloseTimer()
    setIsMenuOpen(true)
  }, [isDesktop, clearCloseTimer])

  // Lock scroll without overflow:hidden alone — that often jumps the page (e.g. to top / "home").
  useEffect(() => {
    if (!(isMenuOpen && !isDesktop)) {
      return
    }
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [isMenuOpen, isDesktop])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [clearCloseTimer])

  // Handle scroll to section after navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash && pathname === '/') {
      setTimeout(() => {
        scrollDocumentToSection(hash, 'smooth')
      }, 100)
    }
  }, [pathname])

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      e.preventDefault()
      const hash = href.includes('#') ? href.split('#')[1] : ''

      if (pathname === '/') {
        scrollDocumentToSection(hash, 'smooth')
      } else {
        router.push(`/#${hash}`)
      }
      setIsMenuOpen(false)
    }
  }

  const closeMenu = () => setIsMenuOpen(false)

  const toggleMenu = () => setIsMenuOpen((open) => !open)

  const menuToggleIcon = (
    <span className="relative grid h-6 w-6 shrink-0 place-items-center motion-reduce:[&>svg]:transition-none [&>svg]:pointer-events-none [&>svg]:col-start-1 [&>svg]:row-start-1">
      <Menu
        aria-hidden
        className={`h-6 w-6 transition-all duration-300 ease-out ${
          isMenuOpen ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <X
        aria-hidden
        className={`h-6 w-6 transition-all duration-300 ease-out ${
          isMenuOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
        }`}
      />
    </span>
  )

  const menuToggleButton = (opts: { variant: 'shell' | 'drawer' }) => (
    <button
      type="button"
      onClick={toggleMenu}
      onMouseEnter={openDesktopMenu}
      onMouseLeave={!isMenuOpen ? scheduleCloseDesktop : undefined}
      tabIndex={opts.variant === 'shell' && isMenuOpen ? -1 : opts.variant === 'drawer' && !isMenuOpen ? -1 : 0}
      className={MENU_TOGGLE_CLASS}
      aria-expanded={isMenuOpen}
      aria-label={
        opts.variant === 'drawer' && isMenuOpen
          ? 'Close menu'
          : isDesktop
            ? 'Menu'
            : 'Open menu'
      }
    >
      {menuToggleIcon}
    </button>
  )

  const menuBody = (
    <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4 pt-2">
        <Link
          href="/"
          onClick={closeMenu}
          className={NAV_LINK_CLASS}
        >
          Home
        </Link>
        <Link
          href="/#about"
          onClick={(e) => {
            handleHashClick(e, '/#about')
          }}
          className={NAV_LINK_CLASS}
        >
          About
        </Link>
        <Link
          href="/#pricing"
          onClick={(e) => {
            handleHashClick(e, '/#pricing')
          }}
          className={NAV_LINK_CLASS}
        >
          Pricing
        </Link>
        <Link
          href="/#testimonials"
          onClick={(e) => {
            handleHashClick(e, '/#testimonials')
          }}
          className={NAV_LINK_CLASS}
        >
          Testimonials
        </Link>
        <Link
          href="/#contact"
          onClick={(e) => {
            handleHashClick(e, '/#contact')
          }}
          className={NAV_LINK_CLASS}
        >
          Contact
        </Link>
        <Link
          href="/custom-bats"
          onClick={closeMenu}
          className={NAV_LINK_CLASS}
        >
          Custom Bats
        </Link>
        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
            Follow
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/pingability"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A4041F] text-white transition-colors hover:bg-[#111111] hover:text-white"
              aria-label="Pingability on Instagram"
            >
              <Instagram className="h-5 w-5 transition-colors" />
            </a>
            <a
              href="https://www.youtube.com/@pingability"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A4041F] text-white transition-colors hover:bg-[#111111] hover:text-white"
              aria-label="Pingability on YouTube"
            >
              <Youtube className="h-5 w-5 transition-colors" />
            </a>
          </div>
        </div>
    </div>
  )

  return (
    <>
      {/* Trigger — hidden while menu is open */}
      <div
        className={`fixed left-0 top-0 z-[100] p-4 transition-opacity duration-200 ${
          isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        aria-hidden={isMenuOpen}
      >
        {menuToggleButton({ variant: 'shell' })}
      </div>

      {/* Backdrop: dims page when menu is open (click/tap outside to close) */}
      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <nav
        aria-label="Site navigation"
        className={`fixed left-0 top-0 z-[95] flex h-full w-[min(100%,20rem)] max-w-[85vw] flex-col border-r border-white/50 bg-white/82 shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
        onMouseEnter={() => {
          if (isDesktop) clearCloseTimer()
        }}
        onMouseLeave={scheduleCloseDesktop}
      >
        <div className="shrink-0 border-b border-gray-100 px-4 pb-3 pt-4">
          {menuToggleButton({ variant: 'drawer' })}
        </div>
        {menuBody}
      </nav>
    </>
  )
}
