'use client'

import AboutCollectionShell from '@/components/about/AboutCollectionShell'
import AboutQuoteFigure from '@/components/about/AboutQuoteFigure'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'

export default function AboutContent() {
  const { t } = useLanguage()
  const { aboutPage, mission } = t

  return (
    <>
      <Navbar />
      <AboutCollectionShell
        activeHref="/about"
        heroTitle={aboutPage.heroHeading}
        heroIntro={aboutPage.methodStatement}
      >
        <section
          id="who-we-are"
          className={`scroll-mt-36 xl:scroll-mt-44 border-b border-cream-dark py-8 lg:py-10 ${collectionArticleSectionClass}`}
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
            <div>
              <p className="type-kicker mb-4 text-earth-red">{aboutPage.label}</p>
              <p className="font-display text-5xl font-bold leading-none tracking-[-0.05em] text-earth-red">
                {aboutPage.whoWeAreLabel}
              </p>
            </div>

            <div className="space-y-12">
              <p className="max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90">
                {mission.boardStatement[0]}
              </p>
              <p className="max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                {mission.boardStatement[1]}
              </p>
              <p className="max-w-[72ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                {aboutPage.paragraphs[0]}
              </p>
              <p className="type-kicker max-w-[40ch] text-ink/45">{mission.boardStatementAttribution}</p>
            </div>
          </div>
        </section>

        <section id="how-we-work" className={`scroll-mt-36 xl:scroll-mt-44 border-b border-cream-dark py-12 lg:py-16 ${collectionArticleSectionClass}`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
            <p className="type-kicker text-earth-red">{aboutPage.howWeWorkLabel}</p>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-16">
              <div className="max-w-[72ch] space-y-7">
                {aboutPage.paragraphs.slice(1).map((paragraph) => (
                  <p key={paragraph} className="type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                    {paragraph}
                  </p>
                ))}
              </div>
              <ol className="space-y-6 lg:pt-1">
                {aboutPage.principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="flex gap-5 border-t border-cream-dark pt-6 first:border-t-0 first:pt-0"
                  >
                    <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-top-left text-earth-red" />
                    <p className="type-body text-sm leading-7 text-ink/72">{principle}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <AboutQuoteFigure
          label={aboutPage.quoteLabel}
          quote={aboutPage.quote}
          source={aboutPage.quoteSource}
        />
      </AboutCollectionShell>
      <Footer />
    </>
  )
}
