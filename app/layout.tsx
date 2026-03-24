import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sloty - Premium Service Marketplace',
  description: 'Discover exceptional service professionals. Book appointments, explore portfolios, and connect with verified masters.',
  generator: 'Sloty App',
  keywords: ['services', 'booking', 'masters', 'manicure', 'barber', 'massage', 'premium', 'marketplace'],
  authors: [{ name: 'Sloty' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fafaf9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="light">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
        <Analytics />
        <Script
          src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
