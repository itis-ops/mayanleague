'use client'

import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import {
  collectionLanguageBarClass,
  collectionLanguageBarInnerClass,
} from '@/lib/editorialLayout'

export default function CollectionLanguageBar() {
  return (
    <div className={`hidden lg:block ${collectionLanguageBarClass}`}>
      <div className={collectionLanguageBarInnerClass}>
        <HeroLanguageToggle className="flex h-11 items-center" />
      </div>
    </div>
  )
}
