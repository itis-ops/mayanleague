'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import LanguageToggle from '@/components/ui/LanguageToggle'

const DONATE_URL = 'https://internationalmayanleague-bloom.kindful.com/embeds/94567c30-cca9-4853-a87f-43c38750420a'

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactElement> = {
    facebook: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4l16 16M4 20 20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    instagram: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    youtube: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a4a2e" />
      </svg>
    ),
  }
  return icons[platform] || null
}

export default function Footer() {
  const { t } = useLanguage()

  const socials = ['facebook', 'twitter', 'instagram', 'youtube']
  const socialUrls: Record<string, string> = {
    facebook: 'https://facebook.com/mayanleague',
    twitter: 'https://twitter.com/mayanleague',
    instagram: 'https://instagram.com/mayanleague',
    youtube: 'https://youtube.com/@mayanleague',
  }

  const quickLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.programs, href: '/programs' },
    { label: t.nav.resources, href: '/resources' },
    { label: t.nav.media, href: '/news' },
    { label: t.nav.contact, href: '/contact' },
  ]

  const whoLinks = [
    { label: t.footer.whoLinks[0], href: '/board-of-directors' },
    { label: t.footer.whoLinks[1], href: '/team' },
    { label: t.footer.whoLinks[2], href: 'https://mayanleague.org/donors' },
    { label: t.footer.whoLinks[3], href: '/job-opportunities' },
  ]

  const involvedLinks = [
    { label: t.footer.involvedLinks[0], href: DONATE_URL },
    { label: t.footer.involvedLinks[1], href: 'https://mayanleague.org/partnerships' },
    { label: t.footer.involvedLinks[2], href: 'https://mayanleague.org/campaigns' },
  ]

  return (
    <footer id="contact" className="relative overflow-hidden bg-earth-red text-white">
      <div className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-0 lg:py-16">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr] lg:gap-10">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img src="/brand/mayan-league-logo.png" alt="" className="h-14 w-14 object-contain" />
              <span className="max-w-[12rem] font-display text-[1.65rem] font-bold uppercase leading-[0.94] tracking-[-0.035em] text-white">{t.brand.full}</span>
            </div>
            <p className="type-intro mb-6 max-w-xs text-lg text-white">
              {t.footer.tagline}
            </p>
            <address className="not-italic font-body text-sm leading-6 text-white">
              <p>{t.footer.address}</p>
              <p className="mt-3">
                <a href="tel:+12028276673" className="motion-link underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold">(202) 827-6673</a>
              </p>
              <p className="mt-2">
                <a href="mailto:info@mayanleague.org" className="motion-link underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  info@mayanleague.org
                </a>
              </p>
            </address>
            <p className="mt-6 max-w-xs font-body text-xs font-semibold leading-5 text-white">{t.footer.copyright}</p>
          </div>

          <div>
            <h4 className="type-kicker mb-4 text-white">
              {t.footer.whoWeAre}
            </h4>
            <ul className="flex flex-col gap-1">
              {whoLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="motion-link inline-flex py-1.5 font-body text-sm font-semibold leading-5 text-white underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="type-kicker mb-4 text-white">
              {t.footer.whatWeDo}
            </h4>
            <ul className="flex flex-col gap-1">
              {quickLinks.slice(1, 5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="motion-link inline-flex py-1.5 font-body text-sm font-semibold leading-5 text-white underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="type-kicker mb-4 text-white">
              {t.footer.getInvolved}
            </h4>
            <ul className="mb-6 flex flex-col gap-1">
              {involvedLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="motion-link inline-flex py-1.5 font-body text-sm font-semibold leading-5 text-white underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href={socialUrls[s]}
                  aria-label={`${t.footer.socialLabel} ${s}`}
                  className="motion-control flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white hover:text-earth-red active:bg-cream-dark active:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <SocialIcon platform={s} />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <LanguageToggle
                className="border-white text-white"
                activeClassName="bg-white text-earth-red"
                inactiveClassName="text-white hover:bg-white/10 hover:text-white active:bg-white/15 active:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
