'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import type { ResourcesSlice } from '@/sanity/lib/mapHomepage'

const RESOURCE_HREFS = ['/indigenous-language-resources', '/resources', '/resources']

interface ResourcesSectionProps {
  content?: { en: ResourcesSlice; es: ResourcesSlice }
}

export default function ResourcesSection({ content }: ResourcesSectionProps) {
  const { lang, t } = useLanguage()
  const r = content?.[lang] ?? t.resources

  return (
    <section id="resources" className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={r.sectionLabel}
          detail={r.sectionKicker}
        />

        {/* Editorial image — heading anchored to bottom over gradient */}
        <div className="motion-reveal mb-5 border border-cream-dark bg-cream p-1.5 sm:mb-6 lg:mb-8">
          <div className="relative min-h-[64vw] overflow-hidden bg-ink sm:min-h-[360px] lg:min-h-[460px]">
            <img
              src="/site-images/maya-delegation.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            {/* Deep gradient for heading legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"
              aria-hidden="true"
            />
            {/* Heading at image bottom — always visible, no frosted box */}
            <div className="absolute inset-x-0 bottom-0 px-7 pb-8 sm:px-10 sm:pb-10 lg:px-14 lg:pb-12">
              <p className="type-kicker mb-3 text-earth-red">{r.eyebrow}</p>
              <h2 className="type-section max-w-4xl text-[clamp(1.9rem,4.8vw,4.9rem)] text-cream">
                {r.heading}
              </h2>
            </div>
          </div>
        </div>

        {/*
          Cards — flat grid, no overlap.
          Mobile (<sm): horizontal scroll, aligned to content margin
          Tablet (sm): 3-col grid
          Desktop (lg): 3-col grid with more padding
        */}
        <div className="relative">
          {/* Scroll affordance — mobile only */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-16 items-center justify-end sm:hidden" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-r from-transparent to-white" />
            <svg className="relative mr-1 h-5 w-5 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 sm:snap-none sm:gap-5">
          {r.items.slice(0, 3).map((item, index) => (
            <div
              key={item.title}
              className={[
                'w-[min(82vw,360px)] shrink-0 snap-start sm:w-auto',
                `motion-delay-${index + 1}`,
              ].join(' ')}
            >
              <article className="motion-card group h-full border border-cream-dark bg-white p-1.5 hover:bg-cream">
                <div className="flex h-full min-h-[280px] flex-col bg-white p-7 group-hover:bg-cream sm:min-h-[300px] sm:p-8 lg:min-h-[320px] lg:p-10">
                  <p className="mb-6 font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="type-section mb-4 text-[clamp(1.45rem,2.4vw,2.1rem)] text-ink group-hover:text-earth-red">
                    {item.title}
                  </h3>
                  <p className="mb-7 border-t border-cream-dark pt-5 type-body text-[1rem] leading-[1.75] text-ink/72">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <Button
                      href={RESOURCE_HREFS[index] ?? '/resources'}
                      variant="tertiary"
                      ariaLabel={`${r.explore}: ${item.title}`}
                    >
                      {r.explore}
                    </Button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
