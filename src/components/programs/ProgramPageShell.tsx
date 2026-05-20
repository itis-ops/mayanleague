'use client'

import { Children, type ReactNode } from 'react'
import ProgramPageNav from '@/components/programs/ProgramPageNav'

interface ProgramPageShellProps {
  activeHref: string
  children: ReactNode
}

function splitHeroContent(children: ReactNode) {
  const items = Children.toArray(children)

  if (items.length === 0) {
    return { hero: null, rest: items }
  }

  return { hero: items[0], rest: items.slice(1) }
}

export default function ProgramPageShell({ activeHref, children }: ProgramPageShellProps) {
  const { hero, rest } = splitHeroContent(children)

  return (
    <main id="main-content" className="bg-white pt-[72px] text-ink lg:pt-[124px]">
      <section className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.26fr_1fr] lg:gap-14">
          <aside className="hidden lg:block">
            <ProgramPageNav activeHref={activeHref} variant="desktop" />
          </aside>

          <article className="min-w-0 bg-white">
            {hero}
            <ProgramPageNav activeHref={activeHref} variant="mobile" />
            <ProgramPageNav activeHref={activeHref} variant="tablet" />
            {rest}
          </article>
        </div>
      </section>
    </main>
  )
}
