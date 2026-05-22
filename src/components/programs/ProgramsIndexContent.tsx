'use client'

import { AboutMotionStagger } from '@/components/about/AboutReveal'
import CollectionShell from '@/components/collection/CollectionShell'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'
import { getProgramsIndex, localizedProgramNavLinks } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

export default function ProgramsIndexContent() {
  const { lang } = useLanguage()
  const page = getProgramsIndex(lang)
  const copy = uiCopy[lang]
  const navLinks = localizedProgramNavLinks(lang)
  const overviewLabel = lang === 'es' ? 'Panorama' : 'Overview'
  const missionLabel = lang === 'es' ? 'Misión' : 'Mission'

  return (
    <>
      <Navbar />
      <CollectionShell
        activeHref="/programs"
        navLabel={copy.programs}
        navLinks={navLinks}
        sheetTitle={copy.programs}
        heroTitle={page.label}
        heroIntro=""
        intro={{
          kicker: overviewLabel,
          heading: missionLabel,
          children: (
            <>
              <p className="max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90">
                {page.title}
              </p>
              <p className="type-body max-w-[56ch] text-[1.0625rem] leading-[1.75] text-ink/72">{page.intro}</p>
            </>
          ),
        }}
      >
        <AboutMotionStagger baseDelay={120}>
          <section className={`py-10 lg:py-14 ${collectionArticleSectionClass}`}>
            <p className="type-kicker mb-8 text-earth-red">{lang === 'es' ? 'Áreas de trabajo' : 'Focus areas'}</p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {page.sections.map((section, index) => (
                <article key={`${section.title}-${index}`} className="border border-cream-dark p-6 sm:p-8">
                  <p className="type-kicker mb-3 text-ink/45">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="type-section mb-4 text-[clamp(1.5rem,2.4vw,2rem)] text-ink">{section.title}</h2>
                  <div className="type-body space-y-5 text-ink/76">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.links?.[0] ? (
                    <a
                      href={section.links[0].href}
                      className="motion-link mt-6 inline-flex min-h-10 items-center font-body text-sm font-semibold text-earth-red underline decoration-current decoration-1 underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      {copy.viewPage}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </AboutMotionStagger>
      </CollectionShell>
      <Footer />
    </>
  )
}
