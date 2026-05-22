'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactElement> = {
    facebook: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  }
  return icons[platform] || null
}

function SocialLinks({
  platforms,
  socialUrls,
  socialLabel,
}: {
  platforms: string[]
  socialUrls: Record<string, string>
  socialLabel: string
}) {
  if (!platforms.length) return null

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((platform) => (
        <a
          key={platform}
          href={socialUrls[platform]}
          aria-label={`${socialLabel} ${platform === 'twitter' ? 'X' : platform}`}
          className="motion-control flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#9a040f] text-white hover:border-white/25 hover:bg-[#b80611] hover:text-white active:border-white/20 active:bg-[#85040d] active:text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <SocialIcon platform={platform} />
        </a>
      ))}
    </div>
  )
}

const WHO_LINK_PATHS = ['/board-of-directors', '/team', null, '/job-opportunities'] as const
const INVOLVED_LINK_PATHS = [null, '/contact', '/news'] as const

export default function Footer() {
  const { t, site } = useLanguage()

  const socialPlatforms = (['facebook', 'twitter', 'instagram', 'youtube'] as const).filter(
    (key) => site.social[key],
  )

  const quickLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.programs, href: '/programs' },
    { label: t.nav.resources, href: '/resources' },
    { label: t.nav.media, href: '/news' },
    { label: t.nav.contact, href: '/contact' },
  ]

  const whoLinks = t.footer.whoLinks.map((label, i) => ({
    label,
    href: WHO_LINK_PATHS[i] === null ? site.donateUrl : WHO_LINK_PATHS[i]!,
  }))

  const involvedLinks = t.footer.involvedLinks.map((label, i) => ({
    label,
    href: INVOLVED_LINK_PATHS[i] === null ? site.donateUrl : INVOLVED_LINK_PATHS[i]!,
  }))

  const footerGridClass =
    'grid grid-cols-1 gap-9 md:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr] md:items-start lg:gap-10'

  return (
    <footer id="contact" className="relative overflow-hidden bg-earth-red text-white">
      <div className="relative mx-auto max-w-[1728px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className={footerGridClass}>
          <div className="flex items-start gap-4 md:row-start-1">
            <img src="/brand/mayan-league-logo.png" alt="" className="h-14 w-14 object-contain" />
            <span className="max-w-[12rem] font-display text-[1.65rem] font-bold uppercase leading-[0.94] tracking-[-0.035em] text-white">
              {t.brand.full}
            </span>
          </div>

          <div className="md:col-start-4 md:row-start-1">
            <SocialLinks
              platforms={socialPlatforms}
              socialUrls={site.social}
              socialLabel={t.footer.socialLabel}
            />
          </div>

          <div className="md:row-start-2">
            <p className="type-intro max-w-xs text-lg text-white">{t.footer.tagline}</p>
            <address className="mt-6 not-italic font-body text-sm leading-6 text-white">
              {site.addressLines.length > 0 ? (
                site.addressLines.map((line) => <p key={line}>{line}</p>)
              ) : (
                <p>{t.footer.address}</p>
              )}
              {site.phone ? (
                <p className="mt-3">
                  <a
                    href={site.phoneHref}
                    className="motion-link underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    {site.phone}
                  </a>
                </p>
              ) : null}
              <p className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="motion-link underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {site.email}
                </a>
              </p>
            </address>
            <p className="mt-6 max-w-xs font-body text-xs font-semibold leading-5 text-white">
              {t.footer.copyright}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-3 md:col-span-3 md:col-start-2 md:row-start-2 lg:gap-10">
            <div>
              <h4 className="type-kicker mb-4 text-white">{t.footer.whoWeAre}</h4>
              <ul className="flex flex-col gap-1">
                {whoLinks.map((link) => (
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
              <h4 className="type-kicker mb-4 text-white">{t.footer.whatWeDo}</h4>
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
              <h4 className="type-kicker mb-4 text-white">{t.footer.getInvolved}</h4>
              <ul className="flex flex-col gap-1">
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
