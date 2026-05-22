'use client'

import CollectionNavSheet, { type CollectionNavLink } from '@/components/collection/CollectionNavSheet'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import { useLanguage } from '@/hooks/useLanguage'

interface CollectionNavHeroProps {
  activeHref: string
  heroTitle: string
  links: ReadonlyArray<CollectionNavLink>
  sheetTitle: string
}

export default function CollectionNavHero({
  activeHref,
  heroTitle,
  links,
  sheetTitle,
}: CollectionNavHeroProps) {
  const { lang } = useLanguage()
  const sectionMenuLabel = lang === 'es' ? 'Menú de sección' : 'Section menu'

  return (
    <>
      <div className="mb-6 min-h-[56px] lg:hidden" aria-hidden="true" />

      <div className="fixed inset-x-0 top-[72px] z-50 border-y border-cream-dark bg-white lg:hidden">
        <div className="mx-auto flex min-h-[56px] max-w-[1728px] items-center gap-3 px-5 sm:px-8">
          <p className="type-display min-w-0 flex-1 truncate text-[clamp(1rem,4vw,1.35rem)] leading-[0.95] tracking-[-0.04em] text-ink">
            {heroTitle}
          </p>
          <HeroLanguageToggle className="shrink-0" />
          <div className="w-[7.5rem] shrink-0">
            <CollectionNavSheet
              activeHref={activeHref}
              links={links}
              sheetTitle={sheetTitle}
              triggerLabel={sectionMenuLabel}
              compact
            />
          </div>
        </div>
      </div>
    </>
  )
}
