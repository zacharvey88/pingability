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

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        console.log('Video loaded successfully')
      }
      const handleError = (e: Event) => {
        console.error('Video failed to load:', e)
        setVideoError(true)
      }
      const handleCanPlay = () => {
        console.log('Video can start playing')
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
      style={{ margin: 0, padding: 0 }}
    >
      {/* Background Video with Parallax */}
      <motion.div
        style={{ y, top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', minHeight: '100vh' }}
        className="absolute z-0"
      >
        {/* Fallback background for loading/error states */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        
        {/* Static image placeholder */}
        <div 
          className="w-full h-full"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            backgroundImage: 'url(/hero-video-poster.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Video element - only on desktop */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="hidden md:block w-full h-full object-cover"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', minHeight: '100vh' }}
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
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-display px-4"
        >
          Pingability Manchester
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-100 px-4"
        >
          Professional table tennis coaching for all ages and abilities
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden sm:flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#05325c] px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#e6f7f5] hover:text-[#05325c] transition-all duration-300 shadow-lg hover:shadow-xl w-[180px] sm:w-auto"
          >
            View Pricing
          </button>
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="booking-cursor border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-[#05325c] transition-all duration-300 w-[180px] sm:w-auto"
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
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center text-white hover:text-gray-200 transition-colors cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  )
}
