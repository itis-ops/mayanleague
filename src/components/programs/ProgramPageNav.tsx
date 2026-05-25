'use client'

import ProgramPageNavSheet from '@/components/programs/ProgramPageNavSheet'
import { useLanguage } from '@/hooks/useLanguage'
import {
  editorialCompactNavClass,
  editorialCompactNavInnerClass,
  hubCompactNavClass,
  hubCompactNavInnerClass,
} from '@/lib/editorialLayout'
import { localizedProgramNavLinks } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

interface ProgramPageNavProps {
  activeHref: string
  variant?: 'mobile' | 'tablet' | 'compact' | 'desktop'
  /** Hub pages use wider gutters (px-5); editorial pages use px-4. */
  layout?: 'hub' | 'editorial'
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
    <div className="w-full">
      <p className="type-kicker mb-8 text-earth-red">{label}</p>
      <nav className="flex w-full flex-col gap-4" aria-label={label}>
        {links.map((link) => (
          <ProgramNavLink key={link.href} link={link} isActive={link.href === activeHref} />
        ))}
      </nav>
    </div>
  )
}

function ProgramPageNavCompact({
  activeHref,
  layout = 'editorial',
}: {
  activeHref: string
  layout?: 'hub' | 'editorial'
}) {
  const { label, links, activeLink } = useProgramNavLinks(activeHref)
  const navClass = layout === 'hub' ? hubCompactNavClass : editorialCompactNavClass
  const innerClass = layout === 'hub' ? hubCompactNavInnerClass : editorialCompactNavInnerClass

  return (
    <div className={navClass}>
      <div className={innerClass}>
        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
          <span className="type-kicker shrink-0 text-earth-red">{label}</span>
          <span className="shrink-0 font-body text-xs font-black text-ink/25" aria-hidden="true">/</span>
          <span className="truncate font-body text-xs font-black uppercase tracking-[0.08em] text-ink">
            {activeLink.label}
          </span>
        </div>
        <ProgramPageNavSheet activeHref={activeHref} links={links} />
      </div>
    </div>
  )
}

/** @deprecated Use variant="compact" */
function ProgramPageNavTablet({ activeHref }: { activeHref: string }) {
  return <ProgramPageNavCompact activeHref={activeHref} />
}

/** @deprecated Use variant="compact" */
function ProgramPageNavMobile({ activeHref }: { activeHref: string }) {
  return <ProgramPageNavCompact activeHref={activeHref} />
}

export default function ProgramPageNav({ activeHref, variant, layout = 'editorial' }: ProgramPageNavProps) {
  if (variant === 'compact' || variant === 'mobile' || variant === 'tablet') {
    return <ProgramPageNavCompact activeHref={activeHref} layout={layout} />
  }

  if (variant === 'desktop') {
    return <ProgramPageNavDesktop activeHref={activeHref} />
  }

  return (
    <>
      <ProgramPageNavCompact activeHref={activeHref} layout={layout} />
      <div className="hidden xl:block">
        <ProgramPageNavDesktop activeHref={activeHref} />
      </div>
    </>
  )
}
