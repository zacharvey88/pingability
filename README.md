# Pingability - Table Tennis Coaching Website

A modern, responsive website for table tennis coaching in Manchester. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🏓 **Modern Design**: Sleek, mobile-first responsive design with parallax effects
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ♿ **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- ⚡ **Performance**: Fast loading with Next.js 15 and optimised images
- 🎨 **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## Features Overview

### Homepage Sections

1. **Hero Section**: Interactive hero with parallax scroll effect and call-to-action
2. **About Section**: Alex's background, qualifications, and coaching philosophy
3. **Pricing Section**: Individual and group lesson packages
4. **Testimonials**: Customer reviews and success stories
5. **Contact Section**: Contact form for inquiries and bookings
6. **Footer**: Additional information and links

### Key Functionality

- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Smooth Scrolling**: Anchor links with smooth scroll behavior
- **Form Validation**: Client and server-side validation

## Customization

### Styling
- Modify `globals.css` for global styles
- Update Tailwind classes in components for design changes
- Colors and branding can be updated in the component files

### Content
- Update coach information in `About.tsx`
- Modify pricing in `lib/pricing.ts`
- Add/remove testimonials in `Testimonials.tsx`
- Update contact information in `Contact.tsx` and `Footer.tsx`

### Functionality
- Add new lesson types in `lib/pricing.ts`
- Modify booking flow in `Pricing.tsx`

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

## License

This project is private and proprietary to Zac Harvey

---

Built with ❤️ for the table tennis community in Manchester.