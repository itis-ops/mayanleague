import type { Metadata } from 'next'
import { Inter, Oswald, Source_Serif_4 } from 'next/font/google'
import LanguageProvider from '@/components/ui/LanguageProvider'
import SkipLink from '@/components/ui/SkipLink'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
  weight: ['500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['500', '600', '700', '900'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mayanleague.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'International Mayan League',
  description:
    "Promoting, preserving, and transmitting the cosmovision and culture of our ancestors into actions against threats affecting our peoples, the earth, and humanity.",
  openGraph: {
    title: 'International Mayan League',
    description:
      "Let's walk together in defense of Mother Earth and future generations.",
    url: siteUrl,
    siteName: 'International Mayan League',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <LanguageProvider>
          <SkipLink />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
