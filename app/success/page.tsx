'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [bookingDetails, setBookingDetails] = useState<{
    name: string
    email: string
    lessonType: string
    sessionCount: number
    totalAmount: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you would fetch booking details from your API
      // For now, we'll simulate the booking details
      setTimeout(() => {
        setBookingDetails({
          name: 'John Doe',
          email: 'john@example.com',
          lessonType: 'Individual',
          sessionCount: 5,
          totalAmount: 115
        })
        setLoading(false)
      }, 2000)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your booking...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for booking your table tennis lessons with Alex. You&apos;ll receive a confirmation email shortly.
          </p>

          {bookingDetails && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {bookingDetails.name}</p>
                <p><span className="font-medium">Email:</span> {bookingDetails.email}</p>
                <p><span className="font-medium">Lesson Type:</span> {bookingDetails.lessonType}</p>
                <p><span className="font-medium">Sessions:</span> {bookingDetails.sessionCount}</p>
                <p><span className="font-medium">Total Paid:</span> £{bookingDetails.totalAmount}</p>
              </div>
            </div>
          )}

          <div className="bg-orange-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">You&apos;ll receive a confirmation email with session details</p>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Alex will contact you to schedule your first session</p>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Sessions take place at St Matthew&apos;s Community Centre, Stretford</p>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Monday evenings between 18:00-21:00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/#contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Contact Alex
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
