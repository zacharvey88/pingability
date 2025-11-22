'use client'

import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import TestimonialsMobile from './TestimonialsMobile'

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const testimonials = [
    {
      name: 'Nadia Jimenez',
      age: 'Adult Beginner',
      rating: 5,
      text: 'I highly recommend Alex as a professional table tennis coach. He has extensive experience, deep understanding of techniques, and a patient teaching style that makes learning both effective and enjoyable.',
      avatar: 'NJ'
    },
    {
      name: 'Markus',
      age: 'Adult Intermediate',
      rating: 5,
      text: 'Great coaching! Helps to identify areas to improve and builds exercises to help you work on them.',
      avatar: 'M'
    },
    {
      name: 'Anonymous',
      age: 'Adult Intermediate',
      rating: 5,
      text: 'Relaxing, friendly, supportive, understanding, simple instructions, fun. Makes you want more coaching.',
      avatar: 'A'
    },
    {
      name: 'Sarah Johnson',
      age: 'Adult Beginner',
      rating: 5,
      text: 'Alex is an amazing coach! I started as a complete beginner and within just a few lessons, I was playing confidently. His patience and teaching style made learning so enjoyable.',
      avatar: 'SJ'
    },
    {
      name: 'Mike Chen',
      age: 'Teenager',
      rating: 5,
      text: 'The group lessons are fantastic! Great atmosphere and Alex makes sure everyone gets individual attention. I\'ve improved so much and made some great friends too.',
      avatar: 'MC'
    },
    {
      name: 'Emma Williams',
      age: 'Adult Intermediate',
      rating: 5,
      text: 'I\'ve been playing for years but Alex helped me break through to the next level. His technical knowledge and ability to explain complex concepts simply is outstanding.',
      avatar: 'EW'
    }
  ]

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const { scrollLeft, scrollWidth, clientWidth } = container
    const threshold = 5 // Small threshold for floating point comparison
    
    const atStart = scrollLeft <= threshold
    const atEnd = scrollWidth - scrollLeft <= clientWidth + threshold
    
    setIsAtStart(atStart)
    setIsAtEnd(atEnd)
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      // Scroll by approximately one card width (400px card + 24px gap)
      const scrollAmount = 424
      const newScroll = Math.max(0, container.scrollLeft - scrollAmount)
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = 424
      const maxScroll = container.scrollWidth - container.clientWidth
      const newScroll = Math.min(maxScroll, container.scrollLeft + scrollAmount)
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  // Check scroll position on mount and scroll events
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Initial check
    checkScrollPosition()

    const handleScroll = () => {
      checkScrollPosition()
    }

    // Use both scroll and scrollend events for better tracking
    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('scrollend', handleScroll, { passive: true })
    
    // Also check on resize
    const handleResize = () => {
      checkScrollPosition()
    }
    window.addEventListener('resize', handleResize)
    
    // Check periodically to catch any missed updates
    const interval = setInterval(checkScrollPosition, 100)
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('scrollend', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [])


  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-12 sm:px-4">
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="bg-[#05325c] rounded-2xl p-12 text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                Ready to Start Your Table Tennis Journey?
              </h3>
              <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                Join all the other satisfied students who&apos;ve improved their game with Alex&apos;s expert coaching
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="booking-cursor bg-[#1ac2ab] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Pricing
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300"
                >
                  Book Your First Lesson
                </button>
              </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
            What Our Students Say
          </h2>
          <p className="text-xl text-[#05325c] max-w-5xl md:max-w-6xl mx-auto">
            Don&apos;t just take our word for it - hear from the players who&apos;ve transformed their game with Alex
          </p>
        </motion.div>

        {/* Mobile Testimonials Carousel */}
        <div className="lg:hidden">
          <TestimonialsMobile testimonials={testimonials} />
        </div>

        {/* Desktop Testimonials */}
        <div className="hidden lg:block relative px-16 lg:px-20">
          {/* Navigation Buttons */}
          <div>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-[#05325c]" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-[#05325c]" />
            </button>
          </div>

          <div className="relative">
            {/* Left fade gradient - show when not at start */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-20 pointer-events-none transition-opacity duration-300"
              style={{ opacity: isAtStart ? 0 : 1 }}
            />
            {/* Right fade gradient - show when not at end */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-20 pointer-events-none transition-opacity duration-300"
              style={{ opacity: isAtEnd ? 0 : 1 }}
            />
            
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide relative"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 pb-2" style={{ width: 'max-content' }}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 w-[350px] sm:w-[400px] flex-shrink-0"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#e6f7f5] rounded-full flex items-center justify-center mr-4">
                      <span className="text-[#1ac2ab] font-bold text-lg">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#05325c]">{testimonial.name}</h4>
                      <p className="text-sm text-[#05325c]">{testimonial.age}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <div>
                    <p className="text-[#05325c] italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
