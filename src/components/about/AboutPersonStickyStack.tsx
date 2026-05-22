import type { ReactNode } from 'react'
import AboutPeopleIntro from '@/components/about/AboutPeopleIntro'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'

interface AboutPersonStickyStackProps {
  label: string
  intro?: string
  introLabel?: string
  children: ReactNode
}

export default function AboutPersonStickyStack({
  label,
  intro,
  introLabel,
  children,
}: AboutPersonStickyStackProps) {
  return (
    <section aria-label={label}>
      <div className={`border-b border-cream-dark py-8 ${collectionArticleSectionClass}`}>
        <p className="type-kicker text-earth-red">{label}</p>
      </div>
      {intro ? <AboutPeopleIntro label={introLabel} body={intro} /> : null}
      {children}
    </section>
  )
}
