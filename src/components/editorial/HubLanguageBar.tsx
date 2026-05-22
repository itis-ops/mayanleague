'use client'

import type { ReactNode } from 'react'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import {
  collectionLanguageBarClass,
  hubLanguageBarInnerClass,
} from '@/lib/editorialLayout'

interface HubLanguageBarProps {
  leading?: ReactNode
  /** When true, hidden on smaller breakpoints (a separate mobile bar may exist). */
  desktopOnly?: boolean
  /** Breakpoint at which the bar appears when desktopOnly is true. */
  showFrom?: 'lg' | 'xl'
}

export default function HubLanguageBar({
  leading,
  desktopOnly = true,
  showFrom = 'lg',
}: HubLanguageBarProps) {
  const visibility = desktopOnly ? (showFrom === 'xl' ? 'hidden xl:block' : 'hidden lg:block') : ''

  return (
    <div className={`${visibility} ${collectionLanguageBarClass}`}>
      <div
        className={[
          hubLanguageBarInnerClass,
          leading ? 'justify-between' : 'justify-end',
        ].join(' ')}
      >
        {leading ? <div className="flex min-w-0 flex-1 items-center">{leading}</div> : null}
        <HeroLanguageToggle className="flex h-11 shrink-0 items-center" />
      </div>
    </div>
  )
}
