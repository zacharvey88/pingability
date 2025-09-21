# Pingability - Table Tennis Coaching Website

A modern, responsive website for Alex's table tennis coaching business in Manchester. Built with Next.js 15, TypeScript, Tailwind CSS, and integrated with Stripe for payments and Supabase for data storage.

## Features

- 🏓 **Modern Design**: Sleek, mobile-first responsive design with parallax effects
- 💳 **Stripe Integration**: Secure payment processing for lesson bookings
- 🗄️ **Supabase Database**: Contact requests and booking management
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ♿ **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- ⚡ **Performance**: Fast loading with Next.js 15 and optimised images
- 🎨 **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Payments**: Stripe
- **Database**: Supabase
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pingability
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Copy your project URL and anon key to the environment variables

5. **Set up Stripe**
   - Create a Stripe account
   - Get your publishable and secret keys from the Stripe dashboard
   - Add them to your environment variables

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
pingability/
├── app/
│   ├── api/
│   │   ├── contact/route.ts          # Contact form API
│   │   └── create-checkout-session/route.ts  # Stripe checkout API
│   ├── success/
│   │   └── page.tsx                  # Payment success page
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Homepage
├── components/
│   ├── Header.tsx                    # Navigation header
│   ├── Hero.tsx                      # Hero section with parallax
│   ├── About.tsx                     # About Alex section
│   ├── Pricing.tsx                   # Pricing and booking
│   ├── Testimonials.tsx              # Customer testimonials
│   ├── Contact.tsx                   # Contact form
│   └── Footer.tsx                    # Footer
├── lib/
│   ├── supabase.ts                   # Supabase client and types
│   └── stripe.ts                     # Stripe configuration and pricing
├── supabase-schema.sql               # Database schema
└── README.md
```

## Features Overview

### Homepage Sections

1. **Hero Section**: Interactive hero with parallax scroll effect and call-to-action
2. **About Section**: Alex's background, qualifications, and coaching philosophy
3. **Pricing Section**: Individual and group lesson packages with Stripe integration
4. **Testimonials**: Customer reviews and success stories
5. **Contact Section**: Contact form with Supabase integration
6. **Footer**: Additional information and links

### Key Functionality

- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Smooth Scrolling**: Anchor links with smooth scroll behavior
- **Form Validation**: Client and server-side validation
- **Payment Processing**: Secure Stripe checkout integration
- **Database Storage**: Contact requests and booking management
- **Success Page**: Confirmation page after successful payment

## Customization

### Styling
- Modify `globals.css` for global styles
- Update Tailwind classes in components for design changes
- Colors and branding can be updated in the component files

### Content
- Update coach information in `About.tsx`
- Modify pricing in `lib/stripe.ts`
- Add/remove testimonials in `Testimonials.tsx`
- Update contact information in `Contact.tsx` and `Footer.tsx`

### Functionality
- Add new lesson types in `lib/stripe.ts`
- Modify booking flow in `Pricing.tsx`
- Update database schema in `supabase-schema.sql`

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `NEXT_PUBLIC_APP_URL` | App URL for redirects | Yes |

## Support

For questions or support, please contact:
- Email: alex@pingability.co.uk
- Phone: +44 7700 900123

## License

This project is private and proprietary to Pingability Table Tennis Coaching.

---

Built with ❤️ for the table tennis community in Manchester.