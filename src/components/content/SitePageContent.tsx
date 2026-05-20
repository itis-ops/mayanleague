'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'
import {
  mediaNav,
  mediaPages,
  resourceCollections,
  resourceNav,
  uiCopy,
  type ContentLink,
  type MediaPageData,
  type ResourceCollectionData,
} from '@/lib/siteContent'
import { indigenousLanguageResources } from '@/lib/resourcePages'

function isLocalHref(href: string) {
  return href.startsWith('/')
}

function slugFromHref(href: string) {
  return href.replace(/^\//, '')
}

function localizedMediaLinks(lang: 'en' | 'es') {
  return mediaNav.map((link) => {
    const slug = slugFromHref(link.href)
    return { ...link, label: mediaPages[lang][slug]?.label || link.label }
  })
}

function localizedResourceLinks(lang: 'en' | 'es') {
  return resourceNav.map((link) => {
    const slug = slugFromHref(link.href)
    const label =
      slug === 'indigenous-language-resources'
        ? lang === 'es'
          ? 'Recursos de Idiomas Indígenas'
          : 'Indigenous Language Resources'
        : resourceCollections[lang][slug]?.label

    return { ...link, label: label || link.label }
  })
}

function TextLink({ link, label }: { link: ContentLink; label?: string }) {
  return (
    <a
      href={link.href}
      target={isLocalHref(link.href) ? undefined : '_blank'}
      rel={isLocalHref(link.href) ? undefined : 'noreferrer'}
      className="motion-link type-kicker inline-flex min-h-10 items-center text-ink underline decoration-current decoration-2 underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      {label || link.label}
    </a>
  )
}

function Sidebar({ label, activeHref, links }: { label: string; activeHref: string; links: ContentLink[] }) {
  return (
    <aside className="lg:pt-2">
      <div className="sticky top-36 border-y border-cream-dark py-6">
        <p className="type-kicker mb-6 text-earth-red">
          {label}
        </p>
        <nav className="flex flex-col gap-1" aria-label={label}>
          {links.map((link) => {
            const active = link.href === activeHref

            return (
              <a
                key={link.href}
                href={link.href}
                target={isLocalHref(link.href) ? undefined : '_blank'}
                rel={isLocalHref(link.href) ? undefined : 'noreferrer'}
                className={`motion-link inline-flex min-h-10 items-center border-b py-1 font-body text-sm font-semibold leading-5 active:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                  active
                    ? 'border-cream-dark text-earth-red'
                    : 'border-transparent text-ink/58 hover:border-cream-dark hover:text-earth-red'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

function PageHero({
  eyebrow,
  title,
  intro,
  count,
  image,
}: {
  eyebrow: string
  title: string
  intro: string
  count: number
  image?: string
}) {
  return (
    <section className="grid grid-cols-1 border-b border-cream-dark bg-cream lg:grid-cols-[0.66fr_0.34fr]">
      <div className="flex min-h-[360px] flex-col justify-between p-7 sm:p-10 lg:min-h-[560px] lg:p-14">
        <div className="flex items-center justify-between border-y border-cream-dark py-3">
            <p className="type-kicker text-earth-red">
            {eyebrow}
          </p>
          <p className="type-kicker text-ink/50">
            {String(count).padStart(2, '0')}
          </p>
        </div>
        <div>
          <h1 className="type-display max-w-5xl text-[clamp(3.4rem,8vw,8rem)] text-ink">
            {title}
          </h1>
          <p className="type-intro mt-8 max-w-[62ch] text-[clamp(1.45rem,2.3vw,2.25rem)] text-ink/82">
            {intro}
          </p>
        </div>
      </div>
      <div className="relative min-h-[320px] overflow-hidden border-t border-cream-dark bg-ink lg:min-h-[560px] lg:border-l lg:border-t-0">
        {image ? (
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover grayscale" />
        ) : (
          <div className="absolute inset-0 bg-ink" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/42 via-transparent to-transparent" />
      </div>
    </section>
  )
}

export function MediaIndexContent({ slug }: { slug: keyof typeof mediaPages.en }) {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const page = mediaPages[lang][slug] as MediaPageData

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-mist pt-[72px] text-ink lg:pt-[124px]">
        <section className="mx-auto max-w-[1728px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.23fr_1fr] lg:gap-14">
            <Sidebar label={copy.media} activeHref={`/${slug}`} links={localizedMediaLinks(lang)} />
            <article className="bg-white">
              <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} count={page.items.length} />
              <section className="grid grid-cols-1 border-t border-cream-dark md:grid-cols-2">
                {page.items.map((item, index) => (
                  <article key={`${item.title}-${index}`} className="flex min-h-80 flex-col border-b border-cream-dark p-7 hover:bg-mist sm:p-10 md:border-r md:last:border-r-0">
                    <div className="mb-8 flex items-start justify-between gap-6">
                      <p className="type-kicker text-earth-red">
                        {item.meta || page.label}
                      </p>
                      <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                    <h2 className="type-section mb-6 text-[clamp(2rem,3.5vw,3.6rem)] text-ink">
                      {item.title}
                    </h2>
                    {item.excerpt ? (
                      <p className="type-body mb-8 border-t border-cream-dark pt-5 text-ink/72">{item.excerpt}</p>
                    ) : null}
                    {item.href ? (
                      <div className="mt-auto">
                        <TextLink link={{ label: copy.visitSource, href: item.href }} />
                      </div>
                    ) : null}
                  </article>
                ))}
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function ResourceCollectionContent({ slug }: { slug: keyof typeof resourceCollections.en }) {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const page = resourceCollections[lang][slug] as ResourceCollectionData

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-mist pt-[72px] text-ink lg:pt-[124px]">
        <section className="mx-auto max-w-[1728px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.23fr_1fr] lg:gap-14">
            <Sidebar label={copy.resources} activeHref={`/${slug}`} links={localizedResourceLinks(lang)} />
            <article className="bg-white">
              <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro[0] || page.title} count={page.links.length} />
              <section className="grid grid-cols-1 gap-10 border-b border-cream-dark px-7 py-12 sm:px-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16 lg:px-14 lg:py-16">
                <div>
                  <p className="type-kicker mb-6 text-earth-red">
                    {copy.resources}
                  </p>
                  <MayaNumber value={page.links.length} className="scale-125 origin-left text-earth-red" />
                </div>
                <div className="type-body max-w-[86ch] space-y-7 text-ink/76">
                  {page.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
              <section className="bg-white">
                {page.links.map((link, index) => (
                  <article key={`${link.label}-${index}`} className="grid grid-cols-1 gap-8 border-b border-cream-dark px-7 py-8 hover:bg-mist sm:px-10 lg:grid-cols-[0.14fr_1fr_0.18fr] lg:items-center lg:gap-12 lg:px-14">
                    <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="type-section text-[clamp(1.8rem,3vw,3.2rem)] text-ink">
                      {link.label}
                    </h2>
                    <TextLink link={{ label: copy.openResource, href: link.href }} />
                  </article>
                ))}
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function ResourcesIndexContent() {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const title = lang === 'es' ? 'Recursos' : 'Resources'
  const intro =
    lang === 'es'
      ? 'Recursos organizados de la Liga Maya Internacional, incluyendo derechos humanos indígenas, migración forzada, niñez indígena, derechos territoriales y recursos de idiomas indígenas.'
      : 'Organized resources from the International Mayan League, including Indigenous human rights, forced migration, Indigenous children, land rights, and Indigenous language resources.'

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white pt-[72px] text-ink lg:pt-[124px]">
        <section className="mx-auto max-w-[1728px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <PageHero eyebrow={copy.resources} title={title} intro={intro} count={resourceNav.length} />
          <div className="grid grid-cols-1 gap-4 bg-cream py-4 md:grid-cols-2 xl:grid-cols-4">
            {localizedResourceLinks(lang).map((item, index) => (
              <article key={item.href} className="motion-card flex min-h-72 flex-col border border-cream-dark bg-white p-7 hover:bg-cream">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-top-right text-earth-red" />
                </div>
                <h2 className="type-section mb-6 text-[clamp(1.8rem,2.8vw,2.45rem)] text-ink">
                  {item.label}
                </h2>
                <div className="mt-auto border-t border-cream-dark pt-5">
                  <TextLink link={item} label={copy.viewPage} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function IndigenousLanguageResourcesContent() {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const intro =
    lang === 'es'
      ? [
          indigenousLanguageResources.intro[1],
          'Estos recursos audiovisuales de Conozca sus Derechos están adaptados lingüística y culturalmente para comunidades Mayas en Isla Tortuga.',
        ]
      : indigenousLanguageResources.intro
  const title = lang === 'es' ? 'Recursos de Idiomas Indígenas' : indigenousLanguageResources.title
  const credit =
    lang === 'es' ? 'Grabación y edición por la Liga Maya Internacional/USA' : indigenousLanguageResources.credit

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-mist pt-[72px] text-ink lg:pt-[124px]">
        <section className="mx-auto max-w-[1728px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.23fr_1fr] lg:gap-14">
            <Sidebar label={copy.resources} activeHref="/indigenous-language-resources" links={localizedResourceLinks(lang)} />
            <article className="bg-white">
              <PageHero eyebrow={copy.resources} title={title} intro={intro[0]} count={indigenousLanguageResources.groups.length} />
              <section className="grid grid-cols-1 gap-10 border-b border-cream-dark px-7 py-12 sm:px-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16 lg:px-14 lg:py-16">
                <div>
                  <p className="type-kicker mb-6 text-earth-red">
                    KYR
                  </p>
                  <Button href={indigenousLanguageResources.download.href} variant="primary">
                    {copy.downloadResources}
                  </Button>
                </div>
                <div className="type-body max-w-[86ch] space-y-7 text-ink/76">
                  {intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="type-kicker leading-6 text-earth-red">{credit}</p>
                </div>
              </section>
              <section>
                {indigenousLanguageResources.groups.map((group, index) => (
                  <article key={group.title} className="grid grid-cols-1 gap-8 border-b border-cream-dark px-7 py-10 hover:bg-mist sm:px-10 lg:grid-cols-[0.14fr_0.34fr_1fr] lg:gap-12 lg:px-14 lg:py-14">
                    <div className="flex justify-end lg:min-h-full lg:items-end">
                      <MayaNumber value={index + 1} className="shrink-0 scale-110 origin-bottom-right text-earth-red/82 lg:scale-125" />
                    </div>
                    <header>
                      <p className="mb-5 font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h2 className="type-section text-[clamp(2rem,3.8vw,3.8rem)] text-ink">
                        {group.title}
                      </h2>
                    </header>
                    <ul className="type-body space-y-3 border-cream-dark lg:border-l lg:pl-12">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="motion-link inline-flex min-h-10 items-center text-ink/76 underline decoration-current decoration-1 underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
