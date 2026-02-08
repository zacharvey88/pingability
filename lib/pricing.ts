const single = Number(process.env.NEXT_PUBLIC_PRICE_SINGLE) || 29
const package_3 = Number(process.env.NEXT_PUBLIC_PRICE_PACKAGE_3) || 82
const package_5 = Number(process.env.NEXT_PUBLIC_PRICE_PACKAGE_5) || 130

export const PRICING = { single, package_3, package_5 } as const

export type PackageType = 'single' | 'package_3' | 'package_5'

