import type { ReactNode } from 'react'
import HeroLanguageAnchor from '@/components/editorial/HeroLanguageAnchor'

interface SectionIndexHeroProps {
  eyebrow: string
  title: string
  intro: string
  detail?: string
  detailClassName?: string
  children?: ReactNode
  className?: string
  showLanguageToggle?: boolean
}

export default function SectionIndexHero({
  eyebrow,
  title,
  intro,
  detail,
  detailClassName = 'hidden sm:block',
  children,
  className = '',
  showLanguageToggle = true,
}: SectionIndexHeroProps) {
  return (
    <div className={className}>
      <div className="relative mb-4">
        {showLanguageToggle ? <HeroLanguageAnchor /> : null}
        <div className={`flex items-center justify-between gap-4 ${showLanguageToggle ? 'pr-12 sm:pr-14' : ''}`}>
          <p className="type-kicker text-earth-red">{eyebrow}</p>
          {detail ? <p className={`type-kicker text-ink/55 ${detailClassName}`}>{detail}</p> : null}
        </div>
      </div>

      <h1 className="type-display max-w-5xl text-[clamp(2.6rem,8.4vw,7.4rem)] text-ink sm:text-[clamp(3.4rem,8.4vw,7.4rem)]">
        {title}
      </h1>

      <p className="type-intro mt-6 max-w-[58ch] text-[clamp(1.2rem,2vw,1.95rem)] text-ink/82">
        {intro}
      </p>

      {children}
    </div>
  )
}
