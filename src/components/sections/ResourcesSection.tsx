'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import LanguageResourceVideoCard from '@/components/resources/LanguageResourceVideoCard'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/hooks/useLanguage'
import translations from '@/lib/i18n'
import { getFeaturedLanguageVideos } from '@/lib/languageResources'
import { indigenousLanguageResources } from '@/lib/resourcePages'
import type { ResourcesSlice } from '@/sanity/lib/mapHomepage'

interface ResourcesSectionProps {
  content?: { en: ResourcesSlice; es: ResourcesSlice }
}

export default function ResourcesSection({ content }: ResourcesSectionProps) {
  const { lang, t } = useLanguage()
  const r = { ...t.resources, ...(content?.[lang] ?? {}) }
  const featuredVideos = getFeaturedLanguageVideos()

  return (
    <section id="resources" className="bg-cream px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar hideDetailOnMobile label={r.sectionLabel} detail={r.sectionKicker} />

        <div className="motion-reveal border border-cream-dark bg-white p-1.5">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:divide-x lg:divide-cream-dark">
            {/* Hero copy */}
            <div className="border-b border-cream-dark px-7 py-10 sm:px-10 sm:py-12 lg:border-b-0 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
              <p className="type-kicker mb-4 text-earth-red">{r.spotlightEyebrow}</p>
              <h2 className="type-section mb-5 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[0.95] text-ink">
                {r.spotlightHeading}
              </h2>
              {lang === 'en' ? (
                <div className="max-w-[42ch] space-y-3">
                  <p className="type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                    {translations.es.resources.spotlightIntro}
                  </p>
                  <p className="type-body text-[1.0625rem] leading-[1.75] text-ink/45">
                    {r.spotlightIntro}
                  </p>
                </div>
              ) : (
                <p className="max-w-[42ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72">{r.spotlightIntro}</p>
              )}
              <p className="type-kicker mt-6 max-w-[36ch] text-ink/45">{r.spotlightCredit}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/indigenous-language-resources" variant="primary">
                  {r.viewAllLanguage}
                </Button>
                <Button
                  href={indigenousLanguageResources.download.href}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.downloadKyr}
                </Button>
              </div>
            </div>

            {/* Featured videos */}
            <div className="px-7 py-10 sm:px-10 sm:py-12 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
              <div className="mb-6 flex flex-col gap-3 border-b border-cream-dark pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="type-kicker mb-2 text-earth-red">{r.featuredLabel}</p>
                  <h3 className="type-section max-w-[16ch] text-[clamp(1.65rem,2.8vw,2.35rem)] leading-[1.02] text-ink">
                    {r.featuredHeading}
                  </h3>
                </div>
                <Button href="/indigenous-language-resources" variant="tertiary" className="shrink-0 self-start sm:self-auto">
                  {r.viewAllLanguage}
                </Button>
              </div>

              <div className="relative">
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-end lg:hidden"
                  aria-hidden="true"
                >
                  <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-r from-transparent to-white" />
                  <svg className="relative mr-0.5 h-5 w-5 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
                <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:snap-none sm:gap-4 [&::-webkit-scrollbar]:hidden">
                  {featuredVideos.map((video, index) => (
                    <div
                      key={video.href}
                      className={[
                        'w-[min(78vw,320px)] shrink-0 snap-start sm:w-auto',
                        `motion-delay-${Math.min(index + 1, 3)}`,
                      ].join(' ')}
                    >
                      <LanguageResourceVideoCard
                        link={video}
                        lang={lang}
                        index={index}
                        family={video.family}
                        community={video.community}
                        compact
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
