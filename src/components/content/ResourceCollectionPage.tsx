'use client'

import AboutReveal, { AboutMotionStagger } from '@/components/about/AboutReveal'
import CollectionShell from '@/components/collection/CollectionShell'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'
import { localizedResourceNavLinks } from '@/lib/resourcePages'
import {
  resourceCollections,
  uiCopy,
  type ContentLink,
  type ResourceCollectionData,
} from '@/lib/siteContent'

type ResourceSlug = keyof typeof resourceCollections.en

function slugFromHref(href: string) {
  return href.replace(/^\//, '')
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0">
      <path d="M8 3h8l4 4v14H8V3z" strokeLinejoin="round" />
      <path d="M16 3v4h4" strokeLinejoin="round" />
      <path d="M10 12h8M10 16h8" strokeLinecap="round" />
    </svg>
  )
}

function detectStatementLanguage(label: string): 'en' | 'es' | null {
  if (/\(espa[nñ]ol\)|\(espaÑol\)/i.test(label)) return 'es'
  if (/\(english\)/i.test(label)) return 'en'
  if (/\bespa[nñ]ol\b/i.test(label) && !/\benglish\b/i.test(label)) return 'es'
  if (/\benglish\b/i.test(label) && !/\bespa[nñ]ol\b/i.test(label)) return 'en'
  return null
}

function cleanStatementLabel(label: string) {
  return label
    .replace(/\s*\((english|espa[nñ]ol|espaÑol)\)\s*$/i, '')
    .replace(/\s*\((english|espa[nñ]ol|espaÑol)\)\s*/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function isLocalHref(href: string) {
  return href.startsWith('/')
}

function isPdfLink(href: string) {
  return /\.pdf($|\?)/i.test(href)
}

function StatementCard({
  link,
  lang,
  copy,
  index,
}: {
  link: ContentLink
  lang: 'en' | 'es'
  copy: (typeof uiCopy)['en']
  index: number
}) {
  const statementLang = detectStatementLanguage(link.label)
  const title = cleanStatementLabel(link.label)
  const langLabel =
    statementLang === 'es' ? 'ES' : statementLang === 'en' ? 'EN' : lang === 'es' ? 'PDF' : 'PDF'

  return (
    <a
      href={link.href}
      target={isLocalHref(link.href) ? undefined : '_blank'}
      rel={isLocalHref(link.href) ? undefined : 'noreferrer'}
      className="group flex h-full flex-col gap-4 border border-cream-dark bg-white p-5 transition-colors hover:border-earth-red/40 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-6"
    >
      <div className="flex items-center gap-2 text-earth-red">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-earth-red/30 bg-earth-red/8 text-earth-red transition-colors group-hover:bg-earth-red group-hover:text-white">
          <DocumentIcon />
        </span>
        <span className="type-kicker text-earth-red/70">
          {isPdfLink(link.href) ? copy.pdfDocument : copy.webResource}
        </span>
        {statementLang ? (
          <span className="type-kicker rounded-full border border-cream-dark px-2 py-0.5 text-ink/45">
            {langLabel}
          </span>
        ) : null}
      </div>

      <h3 className="flex-1 font-body text-sm font-semibold leading-snug text-ink">{title}</h3>

      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
          <span className="font-body text-xs font-semibold uppercase tracking-wider">{copy.openStatement}</span>
          <ArrowIcon />
        </div>
        <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-bottom-right text-earth-red" />
      </div>
    </a>
  )
}

function filterIntroParagraphs(intro: string[]) {
  return intro.filter(
    (paragraph) =>
      !/^view our statements below/i.test(paragraph) &&
      !/^vea nuestras declaraciones/i.test(paragraph),
  )
}

export default function ResourceCollectionPage({ slug }: { slug: ResourceSlug }) {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const page = resourceCollections[lang][slug] as ResourceCollectionData
  const navLinks = localizedResourceNavLinks(lang)
  const introParagraphs = filterIntroParagraphs(page.intro)
  const heroDek = page.heroDek ?? introParagraphs[0] ?? page.title
  const bodyParagraphs = page.heroDek ? introParagraphs : introParagraphs.slice(1)

  return (
    <>
      <Navbar />
      <CollectionShell
        activeHref={`/${slug}`}
        navLabel={copy.resources}
        navLinks={navLinks}
        sheetTitle={copy.resources}
        heroTitle={page.title}
        heroIntro={heroDek}
        intro={
          bodyParagraphs.length > 0
            ? {
                kicker: copy.resourceArchive,
                heading: page.label,
                children: bodyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
              }
            : undefined
        }
      >
        <AboutReveal>
          <section className={`border-b border-cream-dark py-8 ${collectionArticleSectionClass}`}>
            <p className="type-kicker text-earth-red">{copy.viewStatements}</p>
          </section>
        </AboutReveal>

        <AboutMotionStagger baseDelay={120}>
          <section className={`py-10 lg:py-14 ${collectionArticleSectionClass}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {page.links.map((link, index) => (
                <StatementCard key={`${link.href}-${link.label}`} link={link} lang={lang} copy={copy} index={index} />
              ))}
            </div>
          </section>
        </AboutMotionStagger>
      </CollectionShell>
      <Footer />
    </>
  )
}
