'use client'

import AboutCollectionShell from '@/components/about/AboutCollectionShell'
import LinkedMayaCosmovision from '@/components/ui/LinkedMayaCosmovision'
import MayaNumber from '@/components/ui/MayaNumber'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedAboutPages, type AboutPageSection } from '@/lib/aboutPages'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'

function CoreValueIcon({ section, index }: { section: AboutPageSection; index: number }) {
  if (!section.image) return null

  return (
    <img
      src={section.image}
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
      loading={index < 2 ? 'eager' : 'lazy'}
    />
  )
}

export default function CoreValuesContent() {
  const { lang } = useLanguage()
  const page = localizedAboutPages[lang]['our-core-values']
  const jumpLabel = lang === 'es' ? 'Saltar a un valor' : 'Jump to a value'

  return (
    <>
      <Navbar />
      <AboutCollectionShell
        activeHref="/our-core-values"
        heroTitle={page.title}
        heroIntro={page.intro ?? ''}
      >
        <section className={`border-b border-cream-dark py-8 ${collectionArticleSectionClass}`}>
          <p className="type-kicker mb-4 text-earth-red">{jumpLabel}</p>
          <ul className="flex flex-wrap gap-3">
            {page.sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#value-${index + 1}`}
                  className="motion-control flex h-14 w-14 items-center justify-center rounded-full border border-cream-dark bg-white p-2.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-16 sm:w-16"
                  aria-label={section.title}
                >
                  <CoreValueIcon section={section} index={index} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label={page.title}>
          {page.sections.map((section, index) => (
            <article
              id={`value-${index + 1}`}
              key={section.title}
              className={`scroll-mt-36 border-b border-cream-dark bg-white py-14 text-ink lg:grid lg:grid-cols-[minmax(11rem,14rem)_1fr] lg:gap-x-14 lg:py-20 ${collectionArticleSectionClass}`}
            >
              <header className="mb-10 flex flex-col items-center lg:mb-0 lg:items-start">
                <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-full border border-cream-dark bg-white p-5 sm:h-40 sm:w-40">
                  <CoreValueIcon section={section} index={index} />
                </div>
                <div className="flex w-full items-end justify-between lg:mt-auto">
                  <p className="type-kicker max-w-[12ch] text-earth-red">
                    {lang === 'es' ? 'Valor' : 'Value'} {String(index + 1).padStart(2, '0')}
                  </p>
                  <MayaNumber
                    value={index + 1}
                    className="shrink-0 origin-bottom-right scale-90 text-earth-red/85"
                  />
                </div>
              </header>

              <div className="min-w-0">
                <h2 className="type-section max-w-4xl text-[clamp(2rem,4.8vw,4.4rem)] leading-[0.95] text-ink">
                  {section.title}
                </h2>
                <div className="type-body mt-8 max-w-[72ch] space-y-6 border-t border-cream-dark pt-8 text-[1.05rem] leading-8 text-ink/74">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>
                      <LinkedMayaCosmovision text={paragraph} />
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      </AboutCollectionShell>
      <Footer />
    </>
  )
}
