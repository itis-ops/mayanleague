'use client'

import CardIndexMark, { CardWesternIndex } from '@/components/ui/CardIndexMark'
import { splitBilingual } from '@/lib/languageResources'
import type { ContentLink } from '@/lib/siteContent'

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 translate-x-px">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface LanguageResourceVideoCardProps {
  link: ContentLink
  lang: 'en' | 'es'
  index: number
  family?: string
  community?: string
  compact?: boolean
}

export default function LanguageResourceVideoCard({
  link,
  lang,
  index,
  family,
  community,
  compact = false,
}: LanguageResourceVideoCardProps) {
  const bilingual = splitBilingual(link.label)

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={[
        'group motion-card flex min-w-0 flex-col overflow-hidden border border-cream-dark bg-white transition-colors',
        'hover:border-earth-red/40 hover:bg-white hover:shadow-[0_14px_36px_rgba(36,36,36,0.09)]',
        'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold',
        compact ? 'gap-3 p-5 sm:p-6' : 'gap-4 p-5 sm:p-7 lg:p-8',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-earth-red">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-earth-red/30 bg-earth-red/8 text-earth-red transition-colors group-hover:bg-earth-red group-hover:text-white">
            <PlayIcon />
          </span>
          <span className="type-kicker text-earth-red/70">{lang === 'es' ? 'Ver video' : 'Watch video'}</span>
        </div>
        <CardIndexMark value={index + 1} />
      </div>

      {(family || community) && (
        <div className="flex flex-wrap items-center gap-2">
          {family && (
            <span className="type-kicker rounded-full border border-earth-red/20 bg-earth-red/8 px-2.5 py-1 text-earth-red">
              Maya {family}
            </span>
          )}
          {community && <span className="type-kicker text-ink/45">{community}</span>}
        </div>
      )}

      {bilingual ? (
        <div className="flex-1 space-y-1.5">
          <p className={['font-body font-semibold leading-snug text-ink', compact ? 'text-sm' : 'text-[0.975rem]'].join(' ')}>
            {bilingual.es}
          </p>
          {lang === 'en' && (
            <p className={['font-body leading-snug text-ink/50', compact ? 'text-sm' : 'text-[0.9375rem]'].join(' ')}>
              {bilingual.en}
            </p>
          )}
        </div>
      ) : (
        <p className={['flex-1 font-body font-semibold leading-snug text-ink', compact ? 'text-sm' : 'text-[0.975rem]'].join(' ')}>
          {link.label}
        </p>
      )}

      <div className="flex items-end justify-between gap-4 border-t border-cream-dark pt-4">
        <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
          <span className="font-body text-xs font-semibold uppercase tracking-wider">
            {lang === 'es' ? 'Abrir en Facebook' : 'Open on Facebook'}
          </span>
          <ArrowIcon />
        </div>
        <CardWesternIndex value={index + 1} />
      </div>
    </a>
  )
}
