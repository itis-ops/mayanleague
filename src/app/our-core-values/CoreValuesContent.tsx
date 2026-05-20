'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutPageHero from '@/components/about/AboutPageHero'
import AboutPageShell from '@/components/about/AboutPageShell'
import LinkedMayaCosmovision from '@/components/ui/LinkedMayaCosmovision'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedAboutPages, type AboutPageSection } from '@/lib/aboutPages'

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
  const { lang, t } = useLanguage()
  const page = localizedAboutPages[lang]['our-core-values']

  return (
    <>
      <Navbar />
      <AboutPageShell activeHref="/our-core-values">
        <AboutPageHero
          label={page.label}
          title={page.title}
          details={
            lang === 'es'
              ? ['7 principios rectores', 'Cosmovisión Maya', 'Compromisos compartidos']
              : ['7 guiding principles', 'Maya cosmovision', 'Shared commitments']
          }
          aside={
            <>
              {page.intro ? (
                <p className="type-intro mb-10 max-w-[42ch] text-[clamp(1.2rem,1.8vw,1.65rem)] leading-[1.35] text-ink/82">
                  {page.intro}
                </p>
              ) : null}
              <p className="type-kicker mb-5 text-ink/55">
                {lang === 'es' ? 'Saltar a un valor' : 'Jump to a value'}
              </p>
              <ul className="flex flex-wrap gap-3">
                {page.sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#value-${index + 1}`}
                      className="motion-control flex h-14 w-14 items-center justify-center rounded-full bg-white p-2.5 shadow-[0_1px_0_rgba(36,36,36,0.08)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-16 sm:w-16"
                      aria-label={section.title}
                    >
                      <CoreValueIcon section={section} index={index} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          }
        />

        <section className="bg-white" aria-label={page.title}>
          {page.sections.map((section, index) => (
              <article
                id={`value-${index + 1}`}
                key={section.title}
                className="scroll-mt-36 border-b border-cream-dark bg-white px-6 py-14 text-ink sm:px-10 lg:grid lg:grid-cols-[minmax(11rem,14rem)_1fr] lg:gap-x-14 lg:px-14 lg:py-20"
              >
                <header className="mb-10 flex flex-col items-center lg:mb-0 lg:items-start">
                  <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-white p-5 shadow-[0_8px_32px_rgba(36,36,36,0.06)] sm:h-40 sm:w-40">
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
      </AboutPageShell>
      <Footer />
    </>
  )
}
