'use client'

import { Children, type ReactNode } from 'react'
import AboutPageNav from '@/components/about/AboutPageNav'

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
      {/* Hero: full-bleed identity zone — outside the sidebar grid */}
      {hero}

      {/* Secondary nav: compact bar below xl, between hero and content — outside <article> */}
      <AboutPageNav activeHref={activeHref} variant="compact" />

      {/* Content grid: sidebar (xl+) + article body */}
      <section className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.26fr_1fr] xl:gap-14">
          <aside className="hidden xl:block">
            <AboutPageNav activeHref={activeHref} variant="desktop" />
          </aside>

          <article className="min-w-0 bg-white">
            {rest}
          </article>
        </div>
      </section>
    </main>
  )
}
