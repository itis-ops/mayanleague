'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import MissionStat from '@/components/sections/MissionStat'
import type { MissionSlice } from '@/sanity/lib/mapHomepage'

interface MissionSectionProps {
  content?: { en: MissionSlice; es: MissionSlice }
}

export default function MissionSection({ content }: MissionSectionProps) {
  const { lang, t } = useLanguage()
  const m = content?.[lang] ?? t.mission

  return (
    <section id="about" className="overflow-hidden bg-cream px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={m.sectionLabel}
          detail={m.sectionKicker}
        />

        <div className="motion-reveal flex flex-col gap-5">
          {/* Image — first on mobile for immediate visual impact */}
          <div className="border border-cream-dark bg-white p-1.5">
            <div className="relative min-h-[52vw] max-h-[380px] overflow-hidden bg-ink sm:min-h-[380px] sm:max-h-none lg:min-h-[520px]">
              <img
                src={t.mission.imageSrc}
                alt={t.mission.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-[50%_32%] grayscale contrast-[1.04]"
                sizes="(min-width: 1280px) 1680px, (min-width: 768px) 90vw, 100vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Text + stats row */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(260px,0.38fr)] lg:items-stretch">
            {/* Mission statement */}
            <div className="border border-cream-dark bg-white p-1.5">
              <div className="bg-white px-5 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <p className="type-kicker mb-5 text-earth-red sm:mb-8">{m.eyebrow}</p>
                <h2 className="type-section mb-8 max-w-4xl text-[clamp(2.55rem,10vw,5.6rem)] text-ink sm:mb-10">
                  {m.heading}
                </h2>

                <figure className="border-t border-cream-dark pt-8 sm:pt-10">
                  <div className="space-y-8 sm:space-y-10">
                    <p className="max-w-[48ch] font-accent text-[clamp(1.25rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90">
                      {m.boardStatement[0]}
                    </p>
                    {/* Second paragraph hidden on mobile — reduces length without losing meaning */}
                    <p className="hidden max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72 sm:block">
                      {m.boardStatement[1]}
                    </p>
                    <figcaption className="type-kicker max-w-[40ch] pt-2 text-ink/45">
                      — {m.boardStatementAttribution}
                    </figcaption>
                  </div>
                </figure>

                <Button href="/our-path" variant="secondary" className="mt-10">
                  {m.learnMore}
                </Button>
              </div>
            </div>

            {/* Stats — horizontal row on mobile, vertical column on desktop */}
            <div className="border border-cream-dark bg-white p-1.5">
              <div className="grid h-full grid-cols-3 divide-x divide-cream-dark lg:grid-cols-1 lg:grid-rows-3 lg:divide-x-0 lg:divide-y">
                {t.mission.stats.map((stat) => (
                  <MissionStat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
