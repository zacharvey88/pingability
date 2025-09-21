'use client'

import { motion } from 'framer-motion'
import { Award, Users, Clock, MapPin } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Award,
      title: 'Qualified Coach',
      description: 'Table Tennis England certified coach with university club experience'
    },
    {
      icon: Users,
      title: 'All Ages & Abilities',
      description: 'Welcoming environment for beginners to advanced players'
    },
    {
      icon: Clock,
      title: 'Flexible Sessions',
      description: 'Monday evenings 6-9pm at St Matthew\'s Community Centre'
    },
    {
      icon: MapPin,
      title: 'Convenient Location',
      description: 'Stretford, Manchester - easily accessible by public transport'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Coach Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden relative">
              <img
                src="/player.png"
                alt="Alex - Table Tennis Coach"
                className="w-full h-full object-contain"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
                }}
              />
            </div>
          </motion.div>

          {/* Coach Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
          <h2 className="text-4xl md:text-5xl font-bold text-[#05325c] mb-6 font-display">
            Meet Alex
          </h2>
            <p className="text-xl text-[#05325c] mb-6">
              Your dedicated table tennis coach with a passion for helping players of all levels improve their game
            </p>
            <div className="space-y-4 text-[#05325c]">
              <p>
                I discovered my love for table tennis during university, where I not only played competitively 
                but also took on the responsibility of running the table tennis club. This experience taught me 
                the importance of creating an inclusive and supportive environment for players of all skill levels.
              </p>
              <p>
                My passion for coaching led me to pursue formal qualifications with Table Tennis England, 
                ensuring I can provide the highest quality instruction to my students. I believe that table tennis 
                is more than just a sport - it&apos;s a way to build confidence, improve focus, and create lasting friendships.
              </p>
              <p>
                At St Matthew&apos;s Community Centre in Stretford, I&apos;m proud to offer professional coaching in a 
                welcoming environment. Whether you&apos;re picking up a paddle for the first time or looking to 
                refine advanced techniques, I&apos;m here to help you achieve your goals.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#e6f7f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-[#05325c] mb-2">
                {feature.title}
              </h4>
              <p className="text-[#05325c]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
