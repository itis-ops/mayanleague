'use client'

import { Children, type ReactNode } from 'react'
import ProgramPageNav from '@/components/programs/ProgramPageNav'
import {
  editorialMainClass,
  editorialPageGridClass,
  editorialPageRailClass,
  editorialSidebarClass,
  hubPageGridClass,
  hubPageSectionClass,
} from '@/lib/editorialLayout'

interface ProgramPageShellProps {
  activeHref: string
  children: ReactNode
  hubHero?: ReactNode
}

function splitHeroContent(children: ReactNode) {
  const items = Children.toArray(children)

  if (items.length === 0) {
    return { hero: null, rest: items }
  }

  return { hero: items[0], rest: items.slice(1) }
}

export default function ProgramPageShell({ activeHref, children, hubHero }: ProgramPageShellProps) {
  if (hubHero) {
    return (
      <main id="main-content" className="bg-mist pt-[72px] text-ink xl:pt-[124px]">
        <section className={hubPageSectionClass}>
          {hubHero}
          <div className={hubPageGridClass}>
            <aside className={editorialSidebarClass}>
              <ProgramPageNav activeHref={activeHref} variant="desktop" />
            </aside>

            <div className={editorialMainClass}>
              <ProgramPageNav activeHref={activeHref} variant="compact" layout="hub" />
              <article>{children}</article>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const { hero, rest } = splitHeroContent(children)

  return (
    <main id="main-content" className="bg-white pt-[72px] text-ink xl:pt-[124px]">
      <section className={`${editorialPageRailClass} pb-10 sm:pb-12 lg:pb-16`}>
        <div className={editorialPageGridClass}>
          <aside className={editorialSidebarClass}>
            <ProgramPageNav activeHref={activeHref} variant="desktop" />
          </aside>

          <div className={editorialMainClass}>
            {hero}
            <ProgramPageNav activeHref={activeHref} variant="compact" />
            <article className="bg-white">{rest}</article>
          </div>
        </div>
      </section>
    </main>
  )
}
