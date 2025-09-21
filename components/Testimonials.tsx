'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useEffect } from 'react'

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 400 // Approximate width of each card including gap
      const currentScroll = container.scrollLeft
      
      if (currentScroll <= cardWidth) {
        // If near the beginning, jump to the end (duplicated content)
        container.scrollTo({ left: container.scrollWidth / 2, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' })
      }
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 400 // Approximate width of each card including gap
      const maxScroll = container.scrollWidth / 2
      const currentScroll = container.scrollLeft
      
      if (currentScroll >= maxScroll - cardWidth) {
        // If near the end, jump to the beginning
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }
  }

  const testimonials = [
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
      text: 'The group lessons are fantastic! Great atmosphere and Alex makes sure everyone gets individual attention. I&apos;ve improved so much and made some great friends too.',
      avatar: 'MC'
    },
    {
      name: 'Emma Williams',
      age: 'Adult Intermediate',
      rating: 5,
      text: 'I&apos;ve been playing for years but Alex helped me break through to the next level. His technical knowledge and ability to explain complex concepts simply is outstanding.',
      avatar: 'EW'
    },
    {
      name: 'David Thompson',
      age: 'Senior Player',
      rating: 5,
      text: 'At 65, I thought I was too old to improve, but Alex proved me wrong! His coaching is adapted perfectly for all ages and abilities. Highly recommended!',
      avatar: 'DT'
    },
    {
      name: 'Lisa Park',
      age: 'Parent',
      rating: 5,
      text: 'My 12-year-old daughter loves her lessons with Alex. He&apos;s patient, encouraging, and makes learning fun. The progress she&apos;s made is incredible!',
      avatar: 'LP'
    },
    {
      name: 'James Wilson',
      age: 'Adult Advanced',
      rating: 5,
      text: 'Alex&apos;s coaching helped me win my first local tournament! His tactical advice and technical corrections were spot on. Worth every penny.',
      avatar: 'JW'
    }
  ]

  // Duplicate testimonials for infinite scroll
  const infiniteTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Start at the beginning of the first set of testimonials
    container.scrollLeft = 0

    const handleScroll = () => {
      const maxScroll = container.scrollWidth / 2
      const currentScroll = container.scrollLeft

      // If scrolled past the first set, reset to beginning
      if (currentScroll >= maxScroll) {
        container.scrollLeft = currentScroll - maxScroll
      }
      // If scrolled before the beginning, jump to end of first set
      else if (currentScroll < 0) {
        container.scrollLeft = maxScroll + currentScroll
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
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
                Join hundreds of satisfied students who&apos;ve improved their game with Alex&apos;s expert coaching
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
          <p className="text-xl text-[#05325c] max-w-3xl mx-auto">
            Don&apos;t just take our word for it - hear from the players who&apos;ve transformed their game with Alex
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden lg:block">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-[#05325c]" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-[#05325c]" />
            </button>
          </div>

          <div ref={scrollContainerRef} className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max">
              {infiniteTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow min-w-[350px] max-w-[400px] flex-shrink-0"
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

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-200" />
                    <p className="text-[#05325c] italic pl-6">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
