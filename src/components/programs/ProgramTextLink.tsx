import type { ContentLink } from '@/lib/siteContent'

function isLocalHref(href: string) {
  return href.startsWith('/')
}

export default function ProgramTextLink({
  link,
  label,
}: {
  link: ContentLink
  label?: string
}) {
  return (
    <a
      href={link.href}
      target={isLocalHref(link.href) ? undefined : '_blank'}
      rel={isLocalHref(link.href) ? undefined : 'noreferrer'}
      className="motion-link type-kicker inline-flex min-h-10 items-center text-ink underline decoration-current decoration-2 underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      {label || link.label}
    </a>
  )
}
