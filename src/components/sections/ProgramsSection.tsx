'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import ProgramCard from '@/components/ui/ProgramCard'

export default function ProgramsSection() {
  const { t } = useLanguage()
  const programNavLabels = t.programs.items.slice(0, 4).map((program) => program.name)
  const programHrefs = [
    '/maya-cosmovision',
    '/human-rights',
    '/environmental-protection',
    '/immigration',
    '/maya-women-delegation',
    '/gathering-of-ancestral-wisdom',
  ]

  return (
    <section id="programs" className="bg-cream px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={t.programs.sectionLabel}
          detail={
            <>
              <a
                href="/maya-cosmovision"
                className="motion-link rounded-sm underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {programNavLabels[0]}
              </a>{' '}
              / {programNavLabels.slice(1).join(' / ')}
            </>
          }
        />
        {/* Header */}
        <div className="motion-reveal mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <p className="type-kicker mb-4 text-earth-red">
              <a
                href="/maya-cosmovision"
                className="motion-link rounded-sm underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {t.programs.eyebrow}
              </a>
            </p>
            <h2 className="type-section max-w-5xl text-[clamp(2.95rem,5.9vw,5.8rem)] text-ink">
              {t.programs.heading}
            </h2>
          </div>
          <div>
            <p className="max-w-[62ch] border-t border-cream-dark pt-7 type-body text-[1.0625rem] leading-[1.75] text-ink/72">
              {t.programs.intro}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-stretch lg:grid-cols-3">
          {t.programs.items.map((program, i) => (
            <ProgramCard
              key={program.name}
              name={program.name}
              description={program.description}
              learnMore={t.programs.learnMore}
              index={i}
              href={programHrefs[i] || '/programs'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
