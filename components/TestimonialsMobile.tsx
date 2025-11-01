'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  age: string
  rating: number
  text: string
  avatar: string
}

interface TestimonialsMobileProps {
  testimonials: Testimonial[]
}

export default function TestimonialsMobile({ testimonials }: TestimonialsMobileProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll every 2 seconds
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      }, 2000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, testimonials.length])

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Pause auto-play temporarily when user interacts
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume after 5 seconds

    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      // Swipe right - go to previous
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left - go to next
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }
  }

  const goToIndex = (index: number) => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume after 5 seconds
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-white rounded-2xl p-6 max-w-md mx-auto h-[300px] flex flex-col">
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

                <div className="flex-1 flex items-start">
                  <p className="text-[#05325c] italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#1ac2ab] w-8'
                : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

