'use client'

import { useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CollectionLanguageBar from '@/components/collection/CollectionLanguageBar'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import AboutPageHero from '@/components/about/AboutPageHero'
import { countOfDaysContent } from '@/lib/countOfDaysContent'
import { DAY_SIGNS, getTodayTzolkin } from '@/lib/mayaCalendar'
import { GLYPH_SVGS, getGlyphDataUri } from '@/lib/mayaGlyphs'
import { useLanguage } from '@/hooks/useLanguage'
import {
  aboutCollectionMainClass,
  aboutCollectionSectionClass,
  collectionArticleSectionClass,
  hubPageSectionClass,
} from '@/lib/editorialLayout'

export default function CountOfDaysContent() {
  const { lang } = useLanguage()
  const copy = countOfDaysContent[lang]
  const today = useMemo(() => getTodayTzolkin(), [])

  const signByName = useMemo(() => {
    const map = new Map(copy.signs.map((s) => [s.sign, s]))
    return map
  }, [copy.signs])

  return (
    <>
      <Navbar />
      <main id="main-content" className={aboutCollectionMainClass}>
        <section className={aboutCollectionSectionClass}>
          <article className="min-w-0 bg-white">
            <CollectionLanguageBar />

            <div className={`${collectionArticleSectionClass} pb-10 pt-8 lg:pb-14 lg:pt-12`}>
              <div className="mb-6 flex min-h-11 items-center justify-end lg:hidden">
                <HeroLanguageToggle />
              </div>

              <AboutPageHero
                title={copy.title}
                asideLabel={copy.kicker}
                asideBody={copy.intro[0]}
              />

              <div className="mt-10 space-y-6 border-t border-cream-dark pt-10">
                {copy.intro.slice(1).map((paragraph) => (
                  <p key={paragraph} className="type-body max-w-[78ch] text-ink/74">
                    {paragraph}
                  </p>
                ))}
                <p className="type-body max-w-[78ch] border-l-2 border-earth-red pl-5 text-ink/68">
                  {copy.longCountNote}
                </p>
              </div>
            </div>

            {/* Today */}
            <section
              className={`border-y border-cream-dark bg-mist py-12 lg:py-16 ${collectionArticleSectionClass}`}
            >
              <p className="type-kicker mb-3 text-earth-red">{copy.todayLabel}</p>
              <p className="type-body mb-8 max-w-[68ch] text-ink/70">{copy.todayBody}</p>

              <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getGlyphDataUri(GLYPH_SVGS[today.signIndex])}
                  alt={today.sign}
                  width={80}
                  height={88}
                  className="shrink-0"
                />
                <div>
                  <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.04em] text-ink">
                    {today.trecena}&thinsp;{today.sign}
                  </p>
                  <p className="mt-2 font-body text-lg font-semibold text-earth-red">
                    {lang === 'es' ? today.meaningEs : today.meaning}
                  </p>
                  <p className="type-body mt-4 max-w-[56ch] text-ink/72">
                    {signByName.get(today.sign)?.note}
                  </p>
                </div>
              </div>
            </section>

            {/* All 20 glyphs */}
            <section className={`py-12 lg:py-20 ${hubPageSectionClass}`}>
              <p className="type-kicker mb-3 text-earth-red">{copy.allSignsHeading}</p>
              <p className="type-body mb-6 max-w-[72ch] text-ink/70">{copy.allSignsIntro}</p>
              <p className="type-body mb-10 max-w-[72ch] border-l-2 border-cream-dark pl-5 text-sm leading-6 text-ink/62">
                {copy.glyphFormsNote}
              </p>

              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {DAY_SIGNS.map((sign, index) => {
                  const signCopy = signByName.get(sign) ?? copy.signs[index]
                  const isToday = sign === today.sign
                  const glyphSrc = getGlyphDataUri(GLYPH_SVGS[index])

                  return (
                    <li
                      key={sign}
                      className={[
                        'flex flex-col border bg-white p-5 transition-colors',
                        isToday
                          ? 'border-earth-red ring-2 ring-earth-red/20'
                          : 'border-cream-dark hover:border-ink/20',
                      ].join(' ')}
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={glyphSrc} alt={sign} width={48} height={53} />
                        <span className="type-kicker text-ink/40">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p className="font-display text-lg font-bold uppercase leading-none tracking-[-0.02em] text-ink">
                        {sign}
                      </p>
                      <p className="mt-1 font-body text-sm font-semibold text-earth-red">
                        {signCopy.meaning}
                      </p>
                      {signCopy.altSpellings && signCopy.altSpellings !== sign ? (
                        <p className="mt-1 font-body text-xs text-ink/48">
                          {lang === 'es' ? 'También:' : 'Also:'} {signCopy.altSpellings}
                        </p>
                      ) : null}
                      <p className="type-body mt-3 flex-1 text-sm leading-6 text-ink/68">
                        {signCopy.note}
                      </p>

                      {isToday ? (
                        <p className="type-kicker mt-4 text-earth-red">{copy.badgeToday}</p>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Sources */}
            <section
              className={`border-t border-cream-dark bg-cream py-12 lg:py-16 ${collectionArticleSectionClass}`}
            >
              <p className="type-kicker mb-4 text-earth-red">{copy.sourcesHeading}</p>
              <p className="type-body mb-6 max-w-[72ch] text-ink/74">{copy.sourcesBody}</p>
              <a
                href="https://maya.nmai.si.edu/calendar/reading-calendar-glyphs"
                target="_blank"
                rel="noreferrer"
                className="motion-link type-kicker inline-flex text-ink underline decoration-earth-red decoration-2 underline-offset-4 hover:text-earth-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-earth-red"
              >
                {copy.sourcesLinkLabel}
              </a>
              <blockquote className="type-body mt-10 max-w-[68ch] border-l-2 border-earth-red pl-5 text-ink/72">
                <p className="italic">&ldquo;{copy.sourcesQuote}&rdquo;</p>
                <footer className="mt-4 font-body text-sm font-semibold not-italic text-ink/55">
                  — {copy.sourcesQuoteAttribution}
                </footer>
              </blockquote>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
