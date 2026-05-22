'use client'

import type { ReactNode } from 'react'
import CollectionShell from '@/components/collection/CollectionShell'
import { localizedAboutPageLinks } from '@/lib/aboutPages'
import { useLanguage } from '@/hooks/useLanguage'

interface AboutCollectionShellProps {
  activeHref: string
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

export default function AboutCollectionShell({
  activeHref,
  heroTitle,
  heroIntro,
  intro,
  hero,
  children,
  animateContent,
}: AboutCollectionShellProps) {
  const { lang, t } = useLanguage()

  return (
    <CollectionShell
      activeHref={activeHref}
      navLabel={t.aboutPage.label}
      navLinks={localizedAboutPageLinks[lang]}
      sheetTitle={t.aboutPage.label}
      heroTitle={heroTitle}
      heroIntro={heroIntro}
      intro={intro}
      hero={hero}
      animateContent={animateContent}
    >
      {children}
    </CollectionShell>
  )
}
