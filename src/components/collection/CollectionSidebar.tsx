import { collectionMetaRowClass } from '@/lib/editorialLayout'

export interface CollectionNavLink {
  label: string
  href: string
}

interface CollectionSidebarProps {
  label: string
  links: CollectionNavLink[]
  activeHref: string
}

function isLocalHref(href: string) {
  return href.startsWith('/')
}

export default function CollectionSidebar({ label, links, activeHref }: CollectionSidebarProps) {
  return (
    <>
      <div className={collectionMetaRowClass}>
        <p className="type-kicker text-earth-red">{label}</p>
      </div>
      <nav className="flex flex-col gap-3 pt-4" aria-label={label}>
        {links.map((link) => {
          const active = link.href === activeHref

          return (
            <a
              key={link.href}
              href={link.href}
              target={isLocalHref(link.href) ? undefined : '_blank'}
              rel={isLocalHref(link.href) ? undefined : 'noreferrer'}
              aria-current={active ? 'page' : undefined}
              className={[
                'motion-nav-link block w-fit max-w-full',
                'font-body text-sm font-semibold leading-5 tracking-[-0.01em]',
                'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold',
                active ? 'text-earth-red' : 'text-ink/58 hover:text-earth-red',
              ].join(' ')}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </>
  )
}
