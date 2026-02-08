import { NextRequest, NextResponse } from 'next/server'
import { sendCustomBatEmail } from '@/lib/mailersend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, consultationType, playingStyle } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendCustomBatEmail({
      name,
      email,
      phone,
      message,
      consultationType: consultationType || undefined,
      playingStyle: playingStyle || undefined
    })

    return NextResponse.json(
      { status: 200 }
    )
  } catch (error) {
    console.error('Custom bat API error:', error)
    return NextResponse.json(
      { error: 'Failed to send. Please try again.' },
      { status: 500 }
    )
  }
}

