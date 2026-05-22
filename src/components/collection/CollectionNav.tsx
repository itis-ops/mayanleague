'use client'

import type { CollectionNavLink } from '@/components/collection/CollectionNavSheet'
import { collectionMetaRowClass } from '@/lib/editorialLayout'

interface CollectionNavDesktopProps {
  label: string
  links: ReadonlyArray<CollectionNavLink>
  activeHref: string
}

function NavLink({
  link,
  isActive,
}: {
  link: CollectionNavLink
  isActive: boolean
}) {
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

export function CollectionNavDesktop({ label, links, activeHref }: CollectionNavDesktopProps) {
  return (
    <>
      <div className={collectionMetaRowClass}>
        <p className="type-kicker text-earth-red">{label}</p>
      </div>
      <nav className="flex flex-col gap-3 pt-4" aria-label={label}>
        {links.map((link) => (
          <NavLink key={link.href} link={link} isActive={link.href === activeHref} />
        ))}
      </nav>
    </>
  )
}
