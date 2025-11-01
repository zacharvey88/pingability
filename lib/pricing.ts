// Pricing configuration
export const PRICING = {
  single: 29,
  package_3: 82, // 3 lessons for £82 (5% discount)
  package_5: 130, // 5 lessons for £130 (10% discount)
} as const

export type PackageType = 'single' | 'package_3' | 'package_5'

