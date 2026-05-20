'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'

export default function MissionSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="overflow-hidden bg-cream px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={t.mission.sectionLabel}
          detail={t.mission.sectionKicker}
        />

        <div className="motion-reveal flex flex-col gap-5">
          <div className="order-2 border border-cream-dark bg-white p-1.5 lg:order-1">
            <div className="relative min-h-[min(52vw,320px)] overflow-hidden bg-ink sm:min-h-[400px] lg:min-h-[520px]">
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

          <div className="order-1 grid grid-cols-1 gap-5 lg:order-2 lg:grid-cols-[1fr_minmax(260px,0.38fr)] lg:items-stretch">
            <div className="border border-cream-dark bg-white p-1.5">
              <div className="bg-white px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <p className="type-kicker mb-5 text-earth-red sm:mb-8">{t.mission.eyebrow}</p>
                <h2 className="type-section mb-8 max-w-4xl text-[clamp(2.55rem,10vw,5.6rem)] text-ink sm:mb-10">
                  {t.mission.heading}
                </h2>

                <figure className="border-t border-cream-dark pt-8 sm:pt-10">
                  <div className="space-y-10 sm:space-y-12">
                    <p className="max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90">
                      {t.mission.boardStatement[0]}
                    </p>
                    <p className="max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                      {t.mission.boardStatement[1]}
                    </p>
                    <figcaption className="type-kicker max-w-[40ch] pt-2 text-ink/45">
                      — {t.mission.boardStatementAttribution}
                    </figcaption>
                  </div>
                </figure>

                <Button href="/our-path" variant="secondary" className="mt-10">
                  {t.mission.learnMore}
                </Button>
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col border border-cream-dark bg-white p-1.5">
              <div className="grid h-full min-h-0 grid-cols-1 grid-rows-3 divide-y divide-cream-dark [grid-auto-rows:1fr] lg:min-h-full">
                {t.mission.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex h-full min-h-0 flex-col items-center justify-center gap-2.5 px-5 py-6 text-center sm:py-7 lg:px-6"
                  >
                    <p
                      className="font-display text-[clamp(3.25rem,9vw,5.75rem)] font-black leading-none tracking-[-0.065em] text-earth-red tabular-nums"
                      aria-hidden="true"
                    >
                      {stat.value}
                    </p>
                    <p className="type-kicker max-w-[15ch] text-ink/72">
                      {stat.label}
                    </p>
                    <span className="sr-only">
                      {stat.value} {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
