import type { ReactNode } from 'react'
import AboutPeopleIntro from '@/components/about/AboutPeopleIntro'

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
    <section aria-label={label} className="relative bg-white">
      {intro ? <AboutPeopleIntro label={introLabel} body={intro} /> : null}
      {children}
    </section>
  )
}
