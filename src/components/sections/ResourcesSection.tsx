'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import LanguageResourceVideoCard from '@/components/resources/LanguageResourceVideoCard'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/hooks/useLanguage'
import translations from '@/lib/i18n'
import { getFeaturedLanguageVideos, splitBilingual } from '@/lib/languageResources'
import { indigenousLanguageResources } from '@/lib/resourcePages'
import type { ResourcesSlice } from '@/sanity/lib/mapHomepage'

interface ResourcesSectionProps {
  content?: { en: ResourcesSlice; es: ResourcesSlice }
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0 translate-x-px">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  )
}

function ArrowIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`shrink-0 ${className}`}
    >
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ResourcesSection({ content }: ResourcesSectionProps) {
  const { lang, t } = useLanguage()
  const r = { ...t.resources, ...(content?.[lang] ?? {}) }
  const featuredVideos = getFeaturedLanguageVideos()

  const browseAllLabel = lang === 'es' ? 'Explorar todos los recursos' : 'Explore all language resources'

  return (
    <section id="resources" className="bg-cream px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar hideDetailOnMobile label={r.sectionLabel} detail={r.sectionKicker} />

        <div className="motion-reveal border border-cream-dark bg-white p-1.5">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:divide-x lg:divide-cream-dark">
            {/* Spotlight */}
            <div className="border-b border-cream-dark px-6 py-9 sm:px-10 sm:py-12 lg:border-b-0 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
              <p className="type-kicker mb-3 text-earth-red">{r.spotlightEyebrow}</p>
              <h2 className="type-section mb-5 max-w-[18ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[0.95] text-ink">
                {r.spotlightHeading}
              </h2>

              {lang === 'en' ? (
                <div className="max-w-[42ch] space-y-2">
                  <p className="font-accent text-[1.05rem] leading-[1.5] tracking-[-0.005em] text-ink/85 sm:text-[1.0625rem]">
                    {translations.es.resources.spotlightIntro}
                  </p>
                  <p className="type-body text-[0.9375rem] leading-[1.55] text-ink/55">
                    {r.spotlightIntro}
                  </p>
                </div>
              ) : (
                <p className="max-w-[42ch] type-body text-[1.0625rem] leading-[1.7] text-ink/72">{r.spotlightIntro}</p>
              )}

              <p className="type-kicker mt-5 max-w-[36ch] text-ink/45">{r.spotlightCredit}</p>

              <div className="mt-7 flex flex-col items-start gap-4">
                <Button
                  href={indigenousLanguageResources.download.href}
                  variant="primary"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full whitespace-nowrap sm:w-fit"
                >
                  {r.downloadKyr}
                </Button>

                <a
                  href="/indigenous-language-resources"
                  className="motion-link group/link inline-flex items-center gap-2 font-body text-sm font-black uppercase tracking-[0.06em] text-ink/72 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <span className="border-b-2 border-current pb-0.5">{browseAllLabel}</span>
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Featured videos */}
            <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
              <div className="mb-6 border-b border-cream-dark pb-5 sm:mb-7 sm:pb-6">
                <p className="type-kicker mb-2 text-earth-red">{r.featuredLabel}</p>
                <h3 className="type-section max-w-[18ch] text-[clamp(1.6rem,2.8vw,2.35rem)] leading-[1.02] text-ink">
                  {r.featuredHeading}
                </h3>
              </div>

              {/* Mobile: compact vertical list (3 items). Tablet+: card grid (4 items). */}
              <ul className="flex flex-col divide-y divide-cream-dark sm:hidden">
                {featuredVideos.slice(0, 3).map((video) => {
                  const bilingual = splitBilingual(video.label)
                  return (
                    <li key={video.href}>
                      <a
                        href={video.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-earth-red/30 bg-earth-red/8 text-earth-red transition-colors group-hover:bg-earth-red group-hover:text-white">
                          <PlayIcon />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 type-kicker text-ink/45">
                            {video.family ? <span className="text-earth-red">Maya {video.family}</span> : null}
                            {video.family && video.community ? (
                              <span className="h-px w-2 bg-cream-dark" aria-hidden="true" />
                            ) : null}
                            {video.community ? <span>{video.community}</span> : null}
                          </div>
                          <p className="line-clamp-2 font-body text-[0.9375rem] font-semibold leading-[1.35] text-ink transition-colors group-hover:text-earth-red">
                            {bilingual ? bilingual.es : video.label}
                          </p>
                          {bilingual && lang === 'en' ? (
                            <p className="mt-1 line-clamp-2 font-body text-[0.8125rem] leading-[1.4] text-ink/50">
                              {bilingual.en}
                            </p>
                          ) : null}
                        </div>

                        <ArrowIcon className="mt-2 h-3.5 w-3.5 text-ink/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-earth-red" />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="hidden grid-cols-2 gap-4 sm:grid">
                {featuredVideos.map((video, index) => (
                  <LanguageResourceVideoCard
                    key={video.href}
                    link={video}
                    lang={lang}
                    index={index}
                    family={video.family}
                    community={video.community}
                    compact
                  />
                ))}
              </div>

              <a
                href="/indigenous-language-resources"
                className="motion-link group/link mt-6 inline-flex items-center gap-2 font-body text-sm font-black uppercase tracking-[0.06em] text-ink/72 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold sm:mt-7"
              >
                <span className="border-b-2 border-current pb-0.5">{browseAllLabel}</span>
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
