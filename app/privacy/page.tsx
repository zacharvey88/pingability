import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Pingability',
  description: 'Privacy Policy for Pingability Table Tennis Coaching',
}

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
            </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Pingability (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                our website or use our table tennis coaching services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Payment confirmation details related to bank transfers (e.g., references)</li>
                <li>Lesson preferences and booking details</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                We may automatically collect certain information about your device and usage, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP address and browser information</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website information</li>
                <li>Device and operating system information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legal Basis for Processing (GDPR)</h2>
              <p className="text-gray-700 mb-4">
                Under the General Data Protection Regulation (GDPR), we process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Contract Performance:</strong> Processing necessary to fulfill our coaching services contract with you</li>
                <li><strong>Legitimate Interest:</strong> Improving our services, website analytics, and business operations</li>
                <li><strong>Consent:</strong> Marketing communications (where you have opted in)</li>
                <li><strong>Legal Obligation:</strong> Compliance with applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide and improve our table tennis coaching services</li>
                <li>Process bookings and payments</li>
                <li>Communicate with you about lessons and services</li>
                <li>Send you important updates and notifications</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist us in operating our website and conducting our business (e.g., Supabase for data storage)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for the following periods:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Customer Data:</strong> Retained for 7 years after last booking for accounting and legal purposes</li>
                <li><strong>Booking Records:</strong> Retained for 7 years for business and tax purposes</li>
                <li><strong>Contact Inquiries:</strong> Retained for 3 years for customer service purposes</li>
                <li><strong>Marketing Data:</strong> Retained until consent is withdrawn</li>
              </ul>
              <p className="text-gray-700 mb-4">
                When we no longer need your information, we will securely delete or anonymize it in accordance with GDPR requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights (GDPR)</h2>
              <p className="text-gray-700 mb-4">
                Under applicable data protection laws, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us using the information provided in the Contact section below. 
                We will respond to your request within 30 days as required by GDPR.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Controller Information</h2>
              <p className="text-gray-700 mb-4">
                The data controller for your personal information is:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-2"><strong>Pingability</strong></p>
                <p className="text-gray-700 mb-2">St Matthew&apos;s Community Centre</p>
                <p className="text-gray-700 mb-2">Chapel Lane, Stretford</p>
                <p className="text-gray-700 mb-2">Manchester M32 9AJ</p>
                <p className="text-gray-700 mb-2">United Kingdom</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@pingability.co.uk</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We may use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences, though disabling cookies may 
                affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices or content of these external sites. We encourage you to review the privacy policies 
                of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued 
                use of our services after any modifications constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@pingability.co.uk</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +44 7432 628588</p>
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

