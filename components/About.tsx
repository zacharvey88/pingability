'use client'

import { motion } from 'framer-motion'
import { Award, Users, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'

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
      <div className="container mx-auto px-12 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Coach Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 font-display">
            Meet Your Coach
          </h2>
            <p className="text-xl md:text-2xl text-[#111111] mb-6 italic font-medium border-l-4 border-[#A4041F] pl-6 py-1">
              &quot;Alex is a dedicated table tennis coach with a passion for helping players of all levels&quot;
            </p>
            <div className="space-y-4 text-[#111111]">
              <p>
                Alex&apos;s table tennis journey began here in Manchester, where he first fell in love with the sport. 
                He developed his skills over a few years before taking on the role of head coach at Keele University during his studies. 
                served as head coach at Keele University Table Tennis Club for 3 years, running the club and 
                gaining his coaching accreditation with Table Tennis England as a level 1 session coach and level 2 lead coach.
              </p>
              <p>
                Now he&apos;s back where it all started, returning to coach at the very club that introduced him to 
                table tennis. This full-circle journey has given him a deep understanding of both the technical 
                aspects of coaching and the importance of creating a welcoming community for players of all levels. 
                Alex is also DBS checked and CPD certified to work with children.
              </p>
              <p>
                At St Matthew&apos;s Community Centre in Stretford, you&apos;ll receive professional coaching in a
                friendly and supportive environment. Whether you&apos;re picking up a bat for the first time or 
                looking to refine advanced techniques, Alex will help you achieve your goals and share the 
                same passion for table tennis that started his own journey.
              </p>
            </div>
          </motion.div>

          {/* Coach Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden relative">
              <Image
                src="/alex-transparent.png"
                alt="Alex - Table Tennis Coach"
                fill
                className="object-contain"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
                }}
              />
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
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow max-w-sm mx-auto sm:max-w-none"
            >
              <div className="w-16 h-16 bg-[#FDF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-[#A4041F]" />
              </div>
              <h4 className="text-xl font-semibold text-[#111111] mb-2">
                {feature.title}
              </h4>
              <p className="text-[#111111]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
