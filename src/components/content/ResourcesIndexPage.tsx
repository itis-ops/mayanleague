'use client'

import { AboutMotionStagger } from '@/components/about/AboutReveal'
import CollectionShell from '@/components/collection/CollectionShell'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'
import { indigenousLanguageResources, localizedResourceNavLinks } from '@/lib/resourcePages'
import { resourceCollections, uiCopy } from '@/lib/siteContent'

function slugFromHref(href: string) {
  return href.replace(/^\//, '')
}

function resourceCount(href: string) {
  const slug = slugFromHref(href)
  if (slug === 'indigenous-language-resources') {
    return indigenousLanguageResources.groups.reduce((sum, group) => sum + group.links.length, 0)
  }
  return resourceCollections.en[slug as keyof typeof resourceCollections.en]?.links.length ?? 0
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ResourcesIndexPage() {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const navLinks = localizedResourceNavLinks(lang)
  const title = lang === 'es' ? 'Recursos' : 'Resources'
  const intro =
    lang === 'es'
      ? 'Recursos organizados de la Liga Maya Internacional: derechos humanos indígenas, migración forzada, niñez indígena, derechos territoriales, soberanía y recursos de idiomas indígenas.'
      : 'Organized resources from the International Mayan League — Indigenous human rights, forced migration, Indigenous children, land rights, sovereignty, and Indigenous language resources.'

  return (
    <>
      <Navbar />
      <CollectionShell
        activeHref="/resources"
        navLabel={copy.resources}
        navLinks={navLinks}
        sheetTitle={copy.resources}
        heroTitle={title}
        heroIntro={intro}
      >
        <AboutMotionStagger baseDelay={120}>
          <section className={`py-10 lg:py-14 ${collectionArticleSectionClass}`}>
            <p className="type-kicker mb-8 text-earth-red">
              {lang === 'es' ? 'Áreas de recursos' : 'Resource areas'}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {navLinks
                .filter((item) => item.href !== '/resources')
                .map((item, index) => {
                  const count = resourceCount(item.href)
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="group flex min-h-72 flex-col border border-cream-dark bg-white p-7 transition-colors hover:border-earth-red/40 hover:bg-earth-red/4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <div className="mb-8 flex items-start justify-between gap-4">
                        <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="type-kicker rounded-full border border-cream-dark px-2.5 py-1 text-ink/45">
                          {count} {copy.statements}
                        </p>
                      </div>
                      <h2 className="type-section mb-6 text-[clamp(1.8rem,2.8vw,2.45rem)] text-ink">{item.label}</h2>
                      <div className="mt-auto flex items-end justify-between gap-4 border-t border-cream-dark pt-5">
                        <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
                          <span className="font-body text-xs font-semibold uppercase tracking-wider">{copy.viewPage}</span>
                          <ArrowIcon />
                        </div>
                        <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-bottom-right text-earth-red" />
                      </div>
                    </a>
                  )
                })}
            </div>
          </section>
        </AboutMotionStagger>
      </CollectionShell>
      <Footer />
    </>
  )
}
