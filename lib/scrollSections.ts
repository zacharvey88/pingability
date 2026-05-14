const HEADER_SCROLL_GAP = 80
/** Added to scroll `top` for contact (accreditations); scrolls viewport slightly farther down. */
const CONTACT_EXTRA_SCROLL_DOWN = 100
/** Added to scroll `top` for testimonials (journey CTA). */
const TESTIMONIALS_EXTRA_SCROLL_DOWN = 28
/** Added to scroll `top` for pricing. */
const PRICING_EXTRA_SCROLL_DOWN = 100

/** Pixels to scroll past hero bottom when jumping to about (reduces white gap above content). */
const ABOUT_EXTRA_BELOW_HERO = 56

/** 'nav' (default): menu/footer contact jump (accreditations). 'form': booking / GET IN TOUCH section. */
export type ScrollToSectionOptions = {
  contactMode?: 'nav' | 'form'
}

function resolveScrollTarget(sectionId: string, options?: ScrollToSectionOptions): HTMLElement | null {
  if (sectionId === 'testimonials') {
    return document.getElementById('testimonials-journey') ?? document.getElementById('testimonials')
  }
  if (sectionId === 'contact') {
    if (options?.contactMode === 'form') {
      return document.getElementById('contact')
    }
    return document.getElementById('accreditations') ?? document.getElementById('contact')
  }
  return document.getElementById(sectionId)
}

export function scrollDocumentToSection(
  sectionId: string,
  behavior: ScrollBehavior = 'smooth',
  options?: ScrollToSectionOptions
) {
  if (sectionId === 'about') {
    const home = document.getElementById('home')
    if (home) {
      const heroBottom = home.getBoundingClientRect().bottom + window.scrollY
      window.scrollTo({ top: Math.max(0, heroBottom + ABOUT_EXTRA_BELOW_HERO), behavior })
      return
    }
    const about = document.getElementById('about')
    if (about) {
      const elementY = about.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: Math.max(0, elementY - HEADER_SCROLL_GAP), behavior })
    }
    return
  }

  const element = resolveScrollTarget(sectionId, options)
  if (!element) return
  const elementY = element.getBoundingClientRect().top + window.scrollY
  const useContactNavExtra = sectionId === 'contact' && options?.contactMode !== 'form'
  const extra = useContactNavExtra
    ? CONTACT_EXTRA_SCROLL_DOWN
    : sectionId === 'testimonials'
      ? TESTIMONIALS_EXTRA_SCROLL_DOWN
      : sectionId === 'pricing'
        ? PRICING_EXTRA_SCROLL_DOWN
        : 0
  const top = Math.max(0, elementY - HEADER_SCROLL_GAP + extra)
  window.scrollTo({ top, behavior })
}
