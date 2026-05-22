'use client'

import CollectionShell from '@/components/collection/CollectionShell'
import ProgramPageHero from '@/components/programs/ProgramPageHero'
import ProgramSectionsContent from '@/components/programs/ProgramSectionsContent'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { getProgramPage, localizedProgramNavLinks } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

interface ProgramDetailContentProps {
  slug: string
}

export default function ProgramDetailContent({ slug }: ProgramDetailContentProps) {
  const { lang } = useLanguage()
  const page = getProgramPage(lang, slug)
  const copy = uiCopy[lang]
  const navLinks = localizedProgramNavLinks(lang)
  const sectionsNavLabel =
    lang === 'es' ? `Secciones de ${page.label}` : `${page.label} page sections`

  return (
    <>
      <Navbar />
      <CollectionShell
        activeHref={`/${slug}`}
        navLabel={copy.programs}
        navLinks={navLinks}
        sheetTitle={copy.programs}
        heroTitle={page.title}
        heroIntro={page.intro}
        hero={<ProgramPageHero page={page} />}
      >
        <ProgramSectionsContent
          slug={slug}
          sections={page.sections}
          sectionsNavLabel={sectionsNavLabel}
          viewPageLabel={copy.viewPage}
        />
      </CollectionShell>
      <Footer />
    </>
  )
}
