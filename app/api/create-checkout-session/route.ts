import { NextRequest, NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import { supabase } from '@/lib/supabase'
import { PRICING, PackageType } from '@/lib/stripe'

// TODO: Uncomment when Stripe keys are available
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-08-27.basil',
// })

export async function POST(request: NextRequest) {
  // TODO: Uncomment when Stripe and Supabase are configured
  console.log('Checkout session would be created (Stripe disabled)')
  return NextResponse.json({ 
    error: 'Payment processing temporarily disabled. Please contact us directly to book lessons.',
    sessionId: null 
  }, { status: 503 })
  
  /* 
  try {
    const body = await request.json()
    const { name, email, phone, lessonType, packageType } = body

    // Validate required fields
    if (!name || !email || !packageType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const price = PRICING[packageType as PackageType]
    const sessionCount = packageType === 'single' ? 1 : packageType === 'package_5' ? 5 : 10

    // Create or get customer
    let customerId: string
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert([
          {
            name,
            email,
            phone: phone || null
          }
        ])
        .select()
        .single()

      if (customerError) {
        console.error('Customer creation error:', customerError)
        return NextResponse.json(
          { error: 'Failed to create customer record' },
          { status: 500 }
        )
      }
      customerId = newCustomer.id
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${lessonType === 'individual' ? 'Individual' : 'Group'} Table Tennis Lessons`,
              description: `${sessionCount} ${sessionCount === 1 ? 'lesson' : 'lessons'} with Alex at St Matthew's Community Centre`,
            },
            unit_amount: price * 100, // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: email,
      metadata: {
        customerId,
        lessonType: 'individual',
        packageType,
        sessionCount: sessionCount.toString(),
      },
    })

    // Store booking in Supabase (pending status)
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_id: customerId,
          stripe_session_id: session.id,
          lesson_type: 'individual',
          session_count: sessionCount,
          total_amount: price,
          status: 'pending',
          payment_status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create booking record' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { sessionId: session.id, bookingId: booking?.[0]?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
  */
}