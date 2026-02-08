import { NextRequest, NextResponse } from 'next/server'
import { sendCoachingEmail } from '@/lib/mailersend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, contactMethod, hearAbout, packageType, startDate, skillLevel } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendCoachingEmail({
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
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact API error:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      response: error?.response
    })
    return NextResponse.json(
      { error: 'Failed to send. Please try again.' },
      { status: 500 }
    )
  }
}
