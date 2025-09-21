import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { sendBookingConfirmationEmail, sendCoachNotificationEmail } from '@/lib/resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      try {
        // Update booking status to confirmed
        const { data: booking, error: updateError } = await supabase
          .from('bookings')
          .update({
            status: 'confirmed',
            payment_status: 'paid',
            stripe_payment_intent_id: session.payment_intent as string,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id)
          .select(`
            *,
            customers (
              name,
              email
            )
          `)
          .single()

        if (updateError) {
          console.error('Failed to update booking:', updateError)
          return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
        }

        // Send confirmation email to customer
        if (booking?.customers) {
          try {
            await sendBookingConfirmationEmail({
              customerName: booking.customers.name,
              customerEmail: booking.customers.email,
              sessionCount: booking.session_count,
              totalAmount: booking.total_amount,
              lessonType: booking.lesson_type
            })
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError)
            // Don't fail the webhook if email fails
          }

          // Send notification email to coach
          try {
            await sendCoachNotificationEmail({
              customerName: booking.customers.name,
              customerEmail: booking.customers.email,
              customerPhone: booking.customers.phone,
              sessionCount: booking.session_count,
              totalAmount: booking.total_amount,
              lessonType: booking.lesson_type,
              bookingId: booking.id
            })
          } catch (emailError) {
            console.error('Failed to send coach notification email:', emailError)
            // Don't fail the webhook if email fails
          }
        }

        console.log('Booking confirmed:', booking?.id)
      } catch (error) {
        console.error('Error processing checkout.session.completed:', error)
        return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 })
      }
    }

    // Handle payment failures
    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session
      
      try {
        await supabase
          .from('bookings')
          .update({
            status: 'cancelled',
            payment_status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id)

        console.log('Booking cancelled due to expired session:', session.id)
      } catch (error) {
        console.error('Error processing checkout.session.expired:', error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
