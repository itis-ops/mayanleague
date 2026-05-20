'use client'

import AboutPageNavSheet from '@/components/about/AboutPageNavSheet'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedAboutPageLinks } from '@/lib/aboutPages'

interface AboutPageNavProps {
  activeHref: string
  variant?: 'mobile' | 'tablet' | 'compact' | 'desktop'
}

interface NavLinkItem {
  label: string
  href: string
}

function useAboutNavLinks(activeHref: string) {
  const { lang, t } = useLanguage()
  const links = localizedAboutPageLinks[lang]

  return {
    label: t.aboutPage.label,
    links,
    activeLink: links.find((link) => link.href === activeHref) ?? links[0],
  }
}

function AboutNavLink({ link, isActive }: { link: NavLinkItem; isActive: boolean }) {
  return (
    <a
      href={link.href}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'motion-nav-link block w-fit max-w-full',
        'font-body text-sm font-semibold leading-5 tracking-[-0.01em]',
        'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold',
        isActive ? 'text-earth-red' : 'text-ink/58 hover:text-earth-red',
      ].join(' ')}
    >
      {link.label}
    </a>
  )
}

function AboutPageNavDesktop({ activeHref }: { activeHref: string }) {
  const { label, links } = useAboutNavLinks(activeHref)

  return (
    <div className="sticky top-[72px] w-full xl:top-[124px]">
      <p className="type-kicker mb-8 text-earth-red">{label}</p>
      <nav className="flex w-full flex-col gap-4" aria-label={label}>
        {links.map((link) => (
          <AboutNavLink key={link.href} link={link} isActive={link.href === activeHref} />
        ))}
      </nav>
    </div>
  )
}

function AboutPageNavCompact({ activeHref }: { activeHref: string }) {
  const { label, links, activeLink } = useAboutNavLinks(activeHref)

  return (
    <div className="sticky top-[72px] z-20 -mx-4 border-b border-cream-dark bg-white sm:-mx-8 xl:hidden">
      <div className="flex h-11 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
          <span className="type-kicker shrink-0 text-earth-red">{label}</span>
          <span className="shrink-0 font-body text-xs font-black text-ink/25" aria-hidden="true">/</span>
          <span className="truncate font-body text-xs font-black uppercase tracking-[0.08em] text-ink">
            {activeLink.label}
          </span>
        </div>
        <AboutPageNavSheet activeHref={activeHref} links={links} />
      </div>
    </div>
  )
}

/** @deprecated Use variant="compact" — kept for backward compat */
function AboutPageNavTablet({ activeHref }: { activeHref: string }) {
  return <AboutPageNavCompact activeHref={activeHref} />
}

/** @deprecated Use variant="compact" — kept for backward compat */
function AboutPageNavMobile({ activeHref }: { activeHref: string }) {
  return <AboutPageNavCompact activeHref={activeHref} />
}

export default function AboutPageNav({ activeHref, variant }: AboutPageNavProps) {
  if (variant === 'compact' || variant === 'mobile' || variant === 'tablet') {
    return <AboutPageNavCompact activeHref={activeHref} />
  }

  if (variant === 'desktop') {
    return <AboutPageNavDesktop activeHref={activeHref} />
  }

  return (
    <>
      <AboutPageNavCompact activeHref={activeHref} />
      <div className="hidden xl:block">
        <AboutPageNavDesktop activeHref={activeHref} />
      </div>
    </>
  )
}
