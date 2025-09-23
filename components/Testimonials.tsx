'use client'

import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const testimonials = [
    {
      name: 'Nadia Jimenez',
      age: 'Adult Intermediate',
      rating: 5,
      text: 'I highly recommend Alex as a professional table tennis coach. He has extensive experience, deep understanding of techniques, and a patient teaching style that makes learning both effective and enjoyable.',
      avatar: 'NJ'
    },
    {
      name: 'Markus',
      age: 'Adult Beginner',
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

          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / testimonials.length)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-white rounded-2xl p-6 min-w-[350px] max-w-[400px] flex-shrink-0"
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
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}
