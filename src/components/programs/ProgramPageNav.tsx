'use client'

import ProgramPageNavSheet from '@/components/programs/ProgramPageNavSheet'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedProgramNavLinks } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

interface ProgramPageNavProps {
  activeHref: string
  variant?: 'mobile' | 'tablet' | 'desktop'
}

interface NavLinkItem {
  label: string
  href: string
}

function useProgramNavLinks(activeHref: string) {
  const { lang } = useLanguage()
  const links = localizedProgramNavLinks(lang)

  return {
    label: uiCopy[lang].programs,
    links,
    activeLink: links.find((link) => link.href === activeHref) ?? links[0],
  }
}

function ProgramNavLink({ link, isActive }: { link: NavLinkItem; isActive: boolean }) {
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

function ProgramPageNavDesktop({ activeHref }: { activeHref: string }) {
  const { label, links } = useProgramNavLinks(activeHref)

  return (
    <div className="sticky top-36 w-full">
      <p className="type-kicker mb-8 text-earth-red">{label}</p>
      <nav className="flex w-full flex-col gap-4" aria-label={label}>
        {links.map((link) => (
          <ProgramNavLink key={link.href} link={link} isActive={link.href === activeHref} />
        ))}
      </nav>
    </div>
  )
}

function ProgramPageNavTablet({ activeHref }: { activeHref: string }) {
  const { label, links, activeLink } = useProgramNavLinks(activeHref)

  return (
    <div className="sticky top-[72px] z-20 hidden border-b border-cream-dark bg-white px-6 py-5 sm:px-10 md:block lg:hidden">
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="type-kicker text-earth-red">{label}</p>
          <p className="mt-2 truncate font-body text-sm font-semibold leading-5 text-earth-red">
            {activeLink.label}
          </p>
        </div>
        <ProgramPageNavSheet activeHref={activeHref} links={links} />
      </div>
    </div>
  )
}

function ProgramPageNavMobile({ activeHref }: { activeHref: string }) {
  const { label, links, activeLink } = useProgramNavLinks(activeHref)

  return (
    <div className="sticky top-[72px] z-20 border-b border-cream-dark bg-white px-6 py-5 sm:px-10 md:hidden">
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="type-kicker text-earth-red">{label}</p>
          <p className="mt-2 truncate font-body text-sm font-semibold leading-5 text-earth-red">
            {activeLink.label}
          </p>
        </div>
        <ProgramPageNavSheet activeHref={activeHref} links={links} />
      </div>
    </div>
  )
}

export default function ProgramPageNav({ activeHref, variant }: ProgramPageNavProps) {
  if (variant === 'mobile') {
    return <ProgramPageNavMobile activeHref={activeHref} />
  }

  if (variant === 'tablet') {
    return <ProgramPageNavTablet activeHref={activeHref} />
  }

  if (variant === 'desktop') {
    return <ProgramPageNavDesktop activeHref={activeHref} />
  }

  return (
    <>
      <ProgramPageNavMobile activeHref={activeHref} />
      <ProgramPageNavTablet activeHref={activeHref} />
      <div className="hidden lg:block">
        <ProgramPageNavDesktop activeHref={activeHref} />
      </div>
    </>
  )
}
