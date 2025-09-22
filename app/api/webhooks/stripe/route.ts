import { NextRequest, NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import { supabase } from '@/lib/supabase'
// import { sendBookingConfirmationEmail, sendCoachNotificationEmail } from '@/lib/resend'

// TODO: Uncomment when Stripe keys are available
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-08-27.basil',
// })

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  // TODO: Uncomment when Stripe is configured
  console.log('Stripe webhook would be processed (Stripe disabled)')
  return NextResponse.json({ received: true })
  
  /* 
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

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
          console.error('No bookingId in session metadata for completed session:', session.id);
          return NextResponse.json({ error: 'No bookingId found' }, { status: 400 });
        }

        try {
          // Fetch booking and customer details
          const { data: booking, error: fetchError } = await supabase
            .from('bookings')
            .select(`
              *,
              customers (
                name,
                email,
                phone
              )
            `)
            .eq('id', bookingId)
            .single();

          if (fetchError || !booking) {
            console.error('Failed to fetch booking or customer:', fetchError);
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
          }

          // Update booking status
          const { error: updateError } = await supabase
            .from('bookings')
            .update({ status: 'confirmed', payment_status: 'paid', stripe_payment_intent_id: session.payment_intent as string })
            .eq('id', bookingId);

          if (updateError) {
            console.error('Failed to update booking:', updateError);
            return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
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
              });
            } catch (emailError) {
              console.error('Failed to send confirmation email:', emailError);
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
              });
            } catch (emailError) {
              console.error('Failed to send coach notification email:', emailError);
              // Don't fail the webhook if email fails
            }
          }

          console.log('Booking confirmed:', booking?.id);
        } catch (error) {
          console.error('Error processing checkout.session.completed:', error);
          return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
  */
}