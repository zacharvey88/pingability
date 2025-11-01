import { NextRequest, NextResponse } from 'next/server'
import { sendCustomBatEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, consultationType, playingStyle, budget } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification
    await sendCustomBatEmail({
      name,
      email,
      phone,
      message,
      consultationType: consultationType || undefined,
      playingStyle: playingStyle || undefined,
      budget: budget || undefined
    })

    return NextResponse.json(
      { message: 'Custom bat inquiry submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Custom bat API error:', error)
    return NextResponse.json(
      { error: 'Failed to send inquiry. Please try again.' },
      { status: 500 }
    )
  }
}

