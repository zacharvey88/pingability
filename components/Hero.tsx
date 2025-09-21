'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin, Clock, Users } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true)
      }
      const handleError = (e: Event) => {
        console.error('Video failed to load:', e)
        setVideoError(true)
      }
      const handleCanPlay = () => {
        setVideoLoaded(true)
      }
      
      // Only add listeners once
      video.addEventListener('loadeddata', handleLoadedData, { once: true })
      video.addEventListener('error', handleError, { once: true })
      video.addEventListener('canplay', handleCanPlay, { once: true })
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        {/* Fallback background for loading/error states */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
        
        {/* Static image placeholder */}
        <div 
          className="w-full h-full"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0,
            backgroundImage: 'url(/hero-video-poster.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Video element */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="/hero-video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-display"
        >
          Table Tennis Coaching
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-100"
        >
          Professional coaching with Alex at St Matthew&apos;s Community Centre
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <MapPin className="w-5 h-5" />
            <span>Stretford, Manchester</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="w-5 h-5" />
            <span>Mon 18:00-21:00</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Users className="w-5 h-5" />
            <span>All Ages & Abilities</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#05325c] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e6f7f5] hover:text-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Pricing
          </button>
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="booking-cursor border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300"
          >
            Book a Lesson
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
