'use client'

import { Children, type ReactNode } from 'react'
import AboutPageNav from '@/components/about/AboutPageNav'
import {
  editorialMainClass,
  editorialPageGridClass,
  editorialPageRailClass,
  editorialSidebarClass,
} from '@/lib/editorialLayout'

interface AboutPageShellProps {
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

export default function AboutPageShell({ activeHref, children }: AboutPageShellProps) {
  const { hero, rest } = splitHeroContent(children)

  return (
    <main id="main-content" className="bg-white pt-[72px] text-ink xl:pt-[124px]">
      <section className={`${editorialPageRailClass} pb-10 sm:pb-12 lg:pb-16`}>
        <div className={editorialPageGridClass}>
          <aside className={editorialSidebarClass}>
            <AboutPageNav activeHref={activeHref} variant="desktop" />
          </aside>

          <div className={editorialMainClass}>
            {hero}
            <AboutPageNav activeHref={activeHref} variant="compact" />
            <article className="bg-white">{rest}</article>
          </div>
        </div>
      </section>
    </main>
  )
}
