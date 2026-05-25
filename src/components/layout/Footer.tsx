'use client'

import React from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'
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

const footerLinkClass =
  'motion-link inline-flex py-1.5 font-body text-sm font-semibold leading-5 text-white underline-offset-4 hover:underline active:text-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold'

function SocialLinks({
  platforms,
  socialUrls,
  socialLabel,
  className = '',
}: {
  platforms: string[]
  socialUrls: Record<string, string>
  socialLabel: string
  className?: string
}) {
  if (!platforms.length) return null

  return (
    <div className={`flex flex-wrap gap-3 ${className}`.trim()}>
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

function FooterLinkGroup({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="type-kicker mb-3 text-white/70 md:mb-4 md:text-white">{title}</h4>
      <ul className="flex flex-col gap-0.5">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={footerLinkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterContact({
  addressLines,
  addressFallback,
  phone,
  phoneHref,
  email,
}: {
  addressLines: string[]
  addressFallback: string
  phone?: string
  phoneHref?: string
  email: string
}) {
  return (
    <address className="not-italic font-body text-sm leading-6 text-white/90">
      {addressLines.length > 0 ? (
        addressLines.map((line) => <p key={line}>{line}</p>)
      ) : (
        <p>{addressFallback}</p>
      )}
      {phone ? (
        <p className="mt-3">
          <a href={phoneHref} className={footerLinkClass}>
            {phone}
          </a>
        </p>
      ) : null}
      <p className="mt-2">
        <a href={`mailto:${email}`} className={footerLinkClass}>
          {email}
        </a>
      </p>
    </address>
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

  return (
    <footer id="contact" className="relative overflow-hidden bg-earth-red text-white">
      <div className="relative mx-auto max-w-[1728px] px-5 pb-8 pt-12 sm:px-8 md:py-16 lg:px-12">
        {/* Mobile footer */}
        <div className="flex flex-col md:hidden">
          <div className="flex items-center gap-4 border-b border-white/15 pb-8">
            <img src="/brand/mayan-league-logo.png" alt="" className="h-16 w-16 shrink-0 object-contain" />
            <div className="min-w-0">
              <span className="block font-display text-[1.75rem] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-white">
                {t.brand.full}
              </span>
            </div>
          </div>

          <p className="type-intro mt-8 max-w-[28ch] text-[1.125rem] leading-[1.2] text-white">
            {t.footer.tagline}
          </p>

          <SocialLinks
            platforms={socialPlatforms}
            socialUrls={site.social}
            socialLabel={t.footer.socialLabel}
            className="mt-8"
          />

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-white/15 pt-8">
            <FooterLinkGroup title={t.footer.whoWeAre} links={whoLinks} />
            <FooterLinkGroup title={t.footer.whatWeDo} links={quickLinks.slice(1, 5)} />
            <div className="col-span-2">
              <FooterLinkGroup title={t.footer.getInvolved} links={involvedLinks} />
            </div>
          </div>

          <div className="mt-10 border-t border-white/15 pt-8">
            <h4 className="type-kicker mb-4 text-white/70">{t.footer.contact}</h4>
            <FooterContact
              addressLines={site.addressLines}
              addressFallback={t.footer.address}
              phone={site.phone}
              phoneHref={site.phoneHref}
              email={site.email}
            />
          </div>

          <div className="mt-10 border-t border-white/15 pt-8">
            <h4 className="type-kicker mb-4 text-white/70">{t.footer.appearance}</h4>
            <ThemeToggle className="grid w-full max-w-[20rem]" />
          </div>

          <p className="mt-10 border-t border-white/20 pt-6 font-body text-[0.6875rem] font-semibold uppercase leading-[1.55] tracking-[0.06em] text-white/55">
            {t.footer.copyright}
          </p>
        </div>

        {/* Desktop footer */}
        <div className="hidden grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr] items-start gap-9 md:grid lg:gap-10">
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
            <div className="mt-6">
              <FooterContact
                addressLines={site.addressLines}
                addressFallback={t.footer.address}
                phone={site.phone}
                phoneHref={site.phoneHref}
                email={site.email}
              />
            </div>
            <div className="mt-8">
              <p className="type-kicker mb-3 text-white">{t.footer.appearance}</p>
              <ThemeToggle />
            </div>
            <p className="mt-8 max-w-xs font-body text-xs font-semibold leading-5 text-white">
              {t.footer.copyright}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-3 md:col-span-3 md:col-start-2 md:row-start-2 lg:gap-10">
            <FooterLinkGroup title={t.footer.whoWeAre} links={whoLinks} />
            <FooterLinkGroup title={t.footer.whatWeDo} links={quickLinks.slice(1, 5)} />
            <FooterLinkGroup title={t.footer.getInvolved} links={involvedLinks} />
          </div>
        </div>
      </div>
    </footer>
  )
}
