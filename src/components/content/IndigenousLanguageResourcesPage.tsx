'use client'

import CollectionShell from '@/components/collection/CollectionShell'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import CardIndexMark, { CardWesternIndex } from '@/components/ui/CardIndexMark'
import { useLanguage } from '@/hooks/useLanguage'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'
import { uiCopy, type ContentLink } from '@/lib/siteContent'
import {
  FAMILY_META,
  familyAnchorId,
  getLanguageFamilyMap,
  getLanguageFamilyOrder,
  parseCommunity,
  splitBilingual,
} from '@/lib/languageResources'
import { indigenousLanguageResources, localizedResourceNavLinks } from '@/lib/resourcePages'

// ─── Sub-components ───────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0 translate-x-px"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  )
}

// Arrow icon
function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Resource card — each video link
function ResourceCard({ link, lang, index }: { link: ContentLink; lang: 'en' | 'es'; index: number }) {
  const bilingual = splitBilingual(link.label)

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-w-0 flex-col gap-3 overflow-hidden rounded-none border border-cream-dark bg-white p-5 transition-colors hover:border-earth-red/40 hover:bg-earth-red/4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-earth-red">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-earth-red/30 bg-earth-red/8 text-earth-red transition-colors group-hover:bg-earth-red group-hover:text-white">
            <PlayIcon />
          </span>
          <span className="type-kicker text-earth-red/70">
            {lang === 'es' ? 'Ver video' : 'Watch video'}
          </span>
        </div>
        <CardIndexMark value={index + 1} />
      </div>

      {/* Title */}
      {bilingual ? (
        <div className="flex-1 space-y-1">
          <p className="font-body text-sm font-semibold leading-snug text-ink">
            {lang === 'es' ? bilingual.es : bilingual.en}
          </p>
          <p className="font-body text-sm leading-snug text-ink/50">
            {lang === 'es' ? bilingual.en : bilingual.es}
          </p>
        </div>
      ) : (
        <p className="flex-1 font-body text-sm font-semibold leading-snug text-ink">
          {link.label}
        </p>
      )}

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
          <span className="font-body text-xs font-semibold uppercase tracking-wider">
            {lang === 'es' ? 'Abrir en Facebook' : 'Open on Facebook'}
          </span>
          <ArrowIcon />
        </div>
        <CardWesternIndex value={index + 1} />
      </div>
    </a>
  )
}

// Community section — one sub-group within a language family
function CommunitySection({
  group,
  index,
  lang,
}: {
  group: (typeof indigenousLanguageResources.groups)[number]
  index: number
  lang: 'en' | 'es'
}) {
  const { language, community } = parseCommunity(group.title)

  return (
    <div className="border-b border-cream-dark py-10 sm:py-12 lg:py-14">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
        <p className="font-display text-3xl font-bold leading-none tracking-[-0.05em] text-earth-red/30 sm:text-4xl">
          {String(index + 1).padStart(2, '0')}
        </p>
        <div>
          <h3 className="type-section text-[clamp(1.5rem,2.6vw,2.2rem)] text-ink">
            {language}
          </h3>
          {community && (
            <p className="type-kicker mt-1 text-ink/50">{community}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {group.links.map((link, linkIndex) => (
          <ResourceCard key={link.href} link={link} lang={lang} index={linkIndex} />
        ))}
      </div>
    </div>
  )
}

// Language family block — groups multiple communities
function FamilySection({
  family,
  groups,
  startIndex,
  lang,
}: {
  family: string
  groups: (typeof indigenousLanguageResources.groups)
  startIndex: number
  lang: 'en' | 'es'
}) {
  const meta = FAMILY_META[family] ?? { color: 'bg-mist border-cream-dark', glyph: '–' }
  const totalLinks = groups.reduce((sum, g) => sum + g.links.length, 0)

  return (
    <section aria-labelledby={`family-${family.replace(/[^a-z]/gi, '')}`}>
      {/* Family header */}
      <div className={`flex items-center justify-between border-b border-t px-5 py-5 sm:px-10 lg:px-14 ${meta.color}`}>
        <div className="flex items-center gap-4">
          <h2
            id={`family-${family.replace(/[^a-z]/gi, '')}`}
            className="font-display text-[clamp(1.8rem,3.8vw,3.5rem)] font-bold leading-none tracking-[-0.05em] text-ink"
          >
            {family}
          </h2>
          <span className="type-kicker rounded-full border border-current px-2.5 py-1 text-earth-red">
            Maya {family}
          </span>
        </div>
        <div className="hidden flex-col items-end sm:flex">
          <p className="font-display text-2xl font-bold leading-none tracking-[-0.05em] text-earth-red">
            {totalLinks}
          </p>
          <p className="type-kicker mt-1 text-ink/42">
            {lang === 'es' ? 'recursos' : 'resources'}
          </p>
        </div>
      </div>

      {/* Communities within family */}
      <div className="px-5 sm:px-10 lg:px-14">
        {groups.map((group, i) => (
          <CommunitySection
            key={group.title}
            group={group}
            index={startIndex + i}
            lang={lang}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function IndigenousLanguageResourcesPage() {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]

  const title = lang === 'es' ? 'Recursos de Idiomas Indígenas' : indigenousLanguageResources.title
  const credit = lang === 'es'
    ? 'Grabación y edición por la Liga Maya Internacional/USA'
    : indigenousLanguageResources.credit

  const familyOrder = getLanguageFamilyOrder()
  const familyMap = getLanguageFamilyMap()

  // Running index for community numbering
  let communityIndex = 0
  const familySections: { family: string; groups: typeof indigenousLanguageResources.groups; startIndex: number }[] = []
  for (const family of familyOrder) {
    const groups = familyMap.get(family) ?? []
    familySections.push({ family, groups, startIndex: communityIndex })
    communityIndex += groups.length
  }

  return (
    <>
      <Navbar />
      <CollectionShell
        activeHref="/indigenous-language-resources"
        navLabel={copy.resources}
        navLinks={localizedResourceNavLinks(lang)}
        sheetTitle={copy.resources}
        heroTitle={title}
        heroIntro={
          lang === 'es'
            ? 'Recursos audiovisuales de Conozca sus Derechos en 6 idiomas Mayas para comunidades en Isla Tortuga.'
            : 'Audiovisual Know Your Rights resources in 6 Mayan languages for communities in Turtle Island.'
        }
        intro={{
          kicker: 'KYR',
          heading: lang === 'es' ? 'Conozca sus Derechos' : 'Know Your Rights',
          children: (
            <>
              <div className="space-y-6">
                {indigenousLanguageResources.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <p className="type-kicker text-earth-red">{credit}</p>
              <Button href={indigenousLanguageResources.download.href} variant="primary">
                {lang === 'es' ? 'Descargar recursos KYR' : 'Download KYR Resources'}
              </Button>
            </>
          ),
        }}
      >
        <section className={`border-b border-cream-dark py-8 ${collectionArticleSectionClass}`}>
          <p className="type-kicker mb-4 text-earth-red">
            {lang === 'es' ? 'Familias lingüísticas' : 'Language families'}
          </p>
          <div className="flex flex-wrap gap-2">
            {familyOrder.map((family) => (
              <a
                key={family}
                href={`#${familyAnchorId(family)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-cream-dark bg-white px-4 py-2 font-body text-sm font-semibold text-ink/70 transition-colors hover:border-earth-red/40 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-gold"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-earth-red/50" />
                Maya {family}
                <span className="ml-1 text-ink/40">
                  ({(familyMap.get(family) ?? []).reduce((s, g) => s + g.links.length, 0)})
                </span>
              </a>
            ))}
          </div>
        </section>

        {familySections.map(({ family, groups, startIndex }) => (
          <FamilySection
            key={family}
            family={family}
            groups={groups}
            startIndex={startIndex}
            lang={lang}
          />
        ))}
      </CollectionShell>
      <Footer />
    </>
  )
}
