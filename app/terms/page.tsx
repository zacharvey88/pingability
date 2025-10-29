import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - Pingability',
  description: 'Terms of Service for Pingability Table Tennis Coaching',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
            </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Pingability website and services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Pingability provides professional table tennis coaching services at St Matthew&apos;s Community Centre 
                in Stretford, Manchester. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Individual table tennis lessons</li>
                <li>Technique analysis and improvement</li>
                <li>Tactical game development</li>
                <li>Equipment provision during lessons</li>
                <li>Progress tracking and feedback</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking and Payment Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Lesson Bookings</h3>
              <p className="text-gray-700 mb-4">
                All lesson bookings must be made through our website or by contacting us directly. Bookings are 
                subject to availability and must be confirmed by us.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Payment</h3>
              <p className="text-gray-700 mb-4">
                Payment for lessons must be made in advance via bank transfer. All prices are in British Pounds (GBP).
                Please include your name and package as the payment reference. Bank details will be provided during booking
                or upon request via email at <a className="text-blue-600 underline" href="mailto:info@pingability.co.uk">info@pingability.co.uk</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Refund Policy</h3>
              <p className="text-gray-700 mb-4">
                Refunds will be considered on a case-by-case basis. Generally:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Full refunds may be available if cancellation is made at least 24 hours before the scheduled lesson</li>
                <li>Partial refunds may be available for package deals if some lessons have been completed</li>
                <li>No refunds will be given for &quot;no-shows&quot; without prior notice</li>
                <li>Refunds for medical emergencies or other exceptional circumstances will be considered at our discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Lesson Policies</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Attendance</h3>
              <p className="text-gray-700 mb-4">
                Students are expected to arrive on time for their lessons. Late arrivals may result in reduced 
                lesson time. If you need to reschedule, please provide at least 24 hours notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Safety and Conduct</h3>
              <p className="text-gray-700 mb-4">
                All students must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Follow all safety instructions and guidelines</li>
                <li>Treat the coach and other participants with respect</li>
                <li>Use equipment responsibly and as instructed</li>
                <li>Inform the coach of any medical conditions or injuries that may affect participation</li>
                <li>Wear appropriate clothing and footwear for table tennis</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Equipment</h3>
              <p className="text-gray-700 mb-4">
                We provide all necessary equipment during lessons. Students are welcome to bring their own 
                paddles if preferred. We are not responsible for any damage to personal equipment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Health and Safety</h2>
              <p className="text-gray-700 mb-4">
                Participation in table tennis activities involves physical exertion and carries inherent risks. 
                By booking lessons, you acknowledge and accept these risks. We recommend consulting with a 
                healthcare professional before starting any new physical activity.
              </p>
              <p className="text-gray-700 mb-4">
                Students participate at their own risk, and Pingability shall not be liable for any injuries 
                sustained during lessons, except where caused by our negligence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on our website, including text, graphics, logos, and images, is the property of 
                Pingability and is protected by copyright laws. You may not reproduce, distribute, or use any 
                content without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, 
                use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Pingability shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to loss of 
                profits, data, or use, arising out of or relating to your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your access to our services at any time, with or 
                without notice, for any reason, including breach of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of England and Wales. 
                Any disputes arising from these terms or our services shall be subject to the exclusive 
                jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material 
                changes by posting the new terms on our website. Your continued use of our services after 
                such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@pingability.co.uk</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +44 7432 628588</p>
                <p className="text-gray-700 mb-2"><strong>Session Times:</strong> Monday evenings, 18:00-21:00</p>
              </div>
            </section>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
