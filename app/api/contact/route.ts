import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, contactMethod, hearAbout } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification
    await sendContactEmail({
      name,
      email,
      phone: phone || undefined,
      message,
      contactMethod: contactMethod || undefined,
      hearAbout: hearAbout || undefined
    })

    return NextResponse.json(
      { message: 'Contact request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to send contact request. Please try again.' },
      { status: 500 }
    )
  }
}
