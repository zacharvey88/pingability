import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  customer_id: string
  stripe_payment_intent_id?: string
  stripe_session_id?: string
  lesson_type: 'individual' | 'group'
  session_count: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface BookingDetails {
  booking_id: string
  stripe_payment_intent_id?: string
  stripe_session_id?: string
  lesson_type: string
  session_count: number
  total_amount: number
  status: string
  payment_status: string
  booking_created_at: string
  booking_updated_at: string
  completed_at?: string
  customer_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  customer_created_at: string
}
