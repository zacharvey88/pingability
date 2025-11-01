import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen -mt-0">
      <Header />
      <Hero />
      <About />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}