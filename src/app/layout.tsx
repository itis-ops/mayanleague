import type { Metadata } from 'next'
import { Inter, Oswald, Source_Serif_4 } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import LanguageProvider from '@/components/ui/LanguageProvider'
import SkipLink from '@/components/ui/SkipLink'
import { getSiteSettings } from '@/lib/siteSettingsRepository'
import { SanityLive } from '@/sanity/lib/live'
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ isEnabled: isDraftMode }, siteSettings] = await Promise.all([
    draftMode(),
    getSiteSettings(),
  ])

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <LanguageProvider siteSettings={siteSettings}>
          <SkipLink />
          {children}
        </LanguageProvider>

        {/* Real-time content subscription — picks up Sanity mutations while
            Studio is open. Renders nothing visible; re-triggers RSC fetches. */}
        <SanityLive />

        {/* Click-to-edit overlays — only active when Draft Mode is on
            (i.e. inside the Presentation Tool iframe). */}
        {isDraftMode && (
          <>
            <VisualEditing />
            {/* Exit preview banner */}
            <a
              href={`/api/draft-mode/disable?redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '/')}`}
              style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                zIndex: 9999,
                background: '#b91c1c',
                color: '#fff',
                fontFamily: 'sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                textDecoration: 'none',
              }}
            >
              Exit preview
            </a>
          </>
        )}
      </body>
    </html>
  )
}
