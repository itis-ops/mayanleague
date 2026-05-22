'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import ProgramCard from '@/components/ui/ProgramCard'
import type { ProgramsSlice } from '@/sanity/lib/mapHomepage'

const PROGRAM_HREFS = [
  '/maya-cosmovision',
  '/human-rights',
  '/environmental-protection',
  '/immigration',
  '/maya-women-delegation',
  '/gathering-of-ancestral-wisdom',
]

interface ProgramsSectionProps {
  content?: { en: ProgramsSlice; es: ProgramsSlice }
}

export default function ProgramsSection({ content }: ProgramsSectionProps) {
  const { lang, t } = useLanguage()
  const p = content?.[lang] ?? t.programs

  return (
    <section id="programs" className="bg-cream px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={t.programs.sectionLabel}
          detail={t.programs.sectionKicker}
        />

        {/* Section header */}
        <div className="motion-reveal mb-8 grid grid-cols-1 items-end gap-6 sm:mb-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <h2 className="type-section max-w-5xl text-[clamp(2.6rem,5.9vw,5.8rem)] text-ink">
            {p.heading}
          </h2>
          <div>
            <p className="max-w-[62ch] border-t border-cream-dark pt-7 type-body text-[1.0625rem] leading-[1.75] text-ink/72">
              {p.intro}
            </p>
          </div>
        </div>

        {/*
          Mobile (<sm): full-bleed horizontal scroll, 1.3 cards visible at a time
          Tablet (sm): 2-col grid
          Desktop (lg): 3-col grid
        */}
        <div className="relative">
          {/* Scroll affordance — mobile only */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-16 items-center justify-end sm:hidden" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-r from-transparent to-cream" />
            <svg className="relative mr-1 h-5 w-5 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:snap-none sm:gap-5 lg:grid-cols-3">
          {p.items.map((program, i) => (
            <div
              key={program.name}
              className={[
                'w-[min(82vw,360px)] shrink-0 snap-start sm:w-auto',
                `motion-delay-${Math.min(i % 3 + 1, 3)}`,
              ].join(' ')}
            >
              <ProgramCard
                name={program.name}
                description={program.description}
                learnMore={p.learnMore}
                index={i}
                href={PROGRAM_HREFS[i] || '/programs'}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
