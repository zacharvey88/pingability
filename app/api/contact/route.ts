import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/mailersend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, contactMethod, hearAbout, packageType, startDate, skillLevel } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification
    await sendContactEmail({
      name,
      email,
      phone: phone,
      message,
      contactMethod: contactMethod || undefined,
      hearAbout: hearAbout || undefined,
      packageType: packageType || undefined,
      startDate: startDate || undefined,
      skillLevel: skillLevel || undefined
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
