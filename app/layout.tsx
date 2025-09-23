import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pingability - Professional Table Tennis Coaching in Manchester",
  description: "Transform your table tennis game with Alex's expert coaching at St Matthew's Community Centre, Stretford. Individual and group lessons for all ages and abilities.",
  keywords: "table tennis, coaching, Manchester, Stretford, lessons, Alex, ping pong, training",
  authors: [{ name: "Alex - Table Tennis Coach" }],
  openGraph: {
    title: "Pingability - Professional Table Tennis Coaching",
    description: "Expert table tennis coaching in Manchester. All ages and abilities welcome.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pingability - Professional Table Tennis Coaching",
    description: "Expert table tennis coaching in Manchester. All ages and abilities welcome.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  );
}
