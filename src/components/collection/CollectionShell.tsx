import type { ReactNode } from 'react'
import { CollectionNavDesktop } from '@/components/collection/CollectionNav'
import CollectionLanguageBar from '@/components/collection/CollectionLanguageBar'
import CollectionNavHero from '@/components/collection/CollectionNavHero'
import type { CollectionNavLink } from '@/components/collection/CollectionNavSheet'
import AboutMotionArticle from '@/components/about/AboutMotionArticle'
import CollectionHero from '@/components/collection/CollectionHero'
import CollectionIntroSection from '@/components/collection/CollectionIntroSection'
import {
  aboutCollectionGridClass,
  aboutCollectionMainClass,
  aboutCollectionSectionClass,
  aboutCollectionSidebarClass,
} from '@/lib/editorialLayout'

interface CollectionShellProps {
  activeHref: string
  navLabel: string
  navLinks: ReadonlyArray<CollectionNavLink>
  sheetTitle: string
  heroTitle: string
  heroIntro: string
  intro?: {
    kicker: string
    heading: string
    children: ReactNode
  }
  hero?: ReactNode
  children: ReactNode
  animateContent?: boolean
}

export default function CollectionShell({
  activeHref,
  navLabel,
  navLinks,
  sheetTitle,
  heroTitle,
  heroIntro,
  intro,
  hero,
  children,
  animateContent = true,
}: CollectionShellProps) {
  const heroContent = hero ?? (
    <CollectionHero
      title={heroTitle}
      intro={heroIntro}
      layout="compact"
      reveal
      toolbar={
        <CollectionNavHero
          activeHref={activeHref}
          heroTitle={heroTitle}
          links={navLinks}
          sheetTitle={sheetTitle}
        />
      }
    />
  )

  return (
    <main id="main-content" className={aboutCollectionMainClass}>
      <section className={aboutCollectionSectionClass}>
        <div className={aboutCollectionGridClass}>
          <aside className={aboutCollectionSidebarClass}>
            <CollectionNavDesktop label={navLabel} links={navLinks} activeHref={activeHref} />
          </aside>

          <article className="min-w-0 bg-white">
            <CollectionLanguageBar />
            <AboutMotionArticle
              animateContent={animateContent}
              hero={
                hero ? (
                  <>
                    <CollectionNavHero
                      activeHref={activeHref}
                      heroTitle={heroTitle}
                      links={navLinks}
                      sheetTitle={sheetTitle}
                    />
                    {hero}
                  </>
                ) : (
                  heroContent
                )
              }
              intro={
                intro ? (
                  <CollectionIntroSection kicker={intro.kicker} heading={intro.heading} layout="compact">
                    {intro.children}
                  </CollectionIntroSection>
                ) : undefined
              }
            >
              {children}
            </AboutMotionArticle>
          </article>
        </div>
      </section>
    </main>
  )
}
