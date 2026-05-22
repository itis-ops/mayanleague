'use client'

import AboutPageHero from '@/components/about/AboutPageHero'
import { useLanguage } from '@/hooks/useLanguage'
import type { ProgramPageData } from '@/lib/siteContent'

function programHeroDetails(lang: 'en' | 'es', sectionCount: number) {
  if (lang === 'es') {
    return [`${sectionCount} secciones`, 'Programas', 'Liderazgo Maya']
  }

  return [`${sectionCount} sections`, 'Programs', 'Maya-led work']
}

export function programTitleClassName(title: string) {
  const words = title.trim().split(/\s+/).length
  if (words <= 2) {
    return 'type-display max-w-[12ch] text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] text-ink'
  }

  return 'type-display max-w-[14ch] text-[clamp(2.25rem,4vw,4.25rem)] leading-[0.94] text-ink'
}

interface ProgramPageHeroProps {
  page: ProgramPageData
  sectionCount?: number
}

export default function ProgramPageHero({ page, sectionCount }: ProgramPageHeroProps) {
  const { lang } = useLanguage()
  const introLabel = lang === 'es' ? 'Panorama' : 'Overview'
  const details = programHeroDetails(lang, sectionCount ?? page.sections.length)

  if (page.heroImage) {
    return (
      <AboutPageHero
        label={page.eyebrow}
        title={page.title}
        intro={page.intro}
        heroImage={page.heroImage}
        details={details}
        titleClassName={programTitleClassName(page.title)}
      />
    )
  }

  return (
    <AboutPageHero
      label={page.eyebrow}
      title={page.title}
      details={details}
      asideLabel={introLabel}
      asideBody={page.intro}
      titleClassName={programTitleClassName(page.title)}
    />
  )
}
