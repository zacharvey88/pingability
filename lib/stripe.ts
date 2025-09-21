import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default stripePromise

// Pricing configuration
export const PRICING = {
  single: 25,
  package_5: 115, // 5 lessons for £115 (save £10)
  package_10: 220, // 10 lessons for £220 (save £30)
} as const

export type PackageType = 'single' | 'package_5' | 'package_10'
