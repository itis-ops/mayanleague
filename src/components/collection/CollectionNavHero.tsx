'use client'

import CollectionNavSheet, { type CollectionNavLink } from '@/components/collection/CollectionNavSheet'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import { hubMobileSubnavClass, hubMobileSubnavInnerClass } from '@/lib/editorialLayout'
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

      <div className={`${hubMobileSubnavClass} border-y`}>
        <div className={hubMobileSubnavInnerClass}>
          <p className="type-display min-w-0 flex-1 truncate text-[clamp(1rem,4vw,1.35rem)] leading-[0.95] tracking-[-0.04em] text-ink">
            {heroTitle}
          </p>
          <HeroLanguageToggle className="flex h-11 shrink-0 items-center" />
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
