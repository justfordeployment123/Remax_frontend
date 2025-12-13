import './globals.css'
import { Montserrat } from 'next/font/google'
import SEO from '../components/SEO'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  metadataBase: new URL('https://remax.com'),
  title: 'RE/MAX Dubai - Luxury Real Estate & Properties for Sale',
  description: 'Find luxury villas, modern apartments, and commercial properties in Dubai with RE/MAX. Expert agents, premium locations, and comprehensive real estate solutions.',
  keywords: 'real estate Dubai, luxury villas Dubai, apartments Dubai, property search, RE/MAX Dubai, property for sale, property investment',
  authors: [{ name: 'RE/MAX Dubai' }],
  creator: 'RE/MAX Dubai',
  publisher: 'RE/MAX Dubai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'RE/MAX Dubai - Luxury Real Estate & Properties for Sale',
    description: 'Find luxury villas, modern apartments, and commercial properties in Dubai with RE/MAX.',
    type: 'website',
    locale: 'en_US',
    url: 'https://remax.com',
    siteName: 'RE/MAX Dubai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RE/MAX Dubai - Luxury Real Estate & Properties for Sale',
    description: 'Find luxury villas, modern apartments, and commercial properties in Dubai.',
    creator: '@remax',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  verification: {
    google: 'your-google-verification-code',
  },
    icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <SEO />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
