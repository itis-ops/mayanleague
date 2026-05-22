import type { ReactNode } from 'react'
import {
  aboutCollectionGridClass,
  aboutCollectionMainClass,
  aboutCollectionSectionClass,
  aboutCollectionSidebarClass,
} from '@/lib/editorialLayout'

interface CollectionPageLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export default function CollectionPageLayout({ sidebar, children }: CollectionPageLayoutProps) {
  return (
    <main id="main-content" className={aboutCollectionMainClass}>
      <section className={aboutCollectionSectionClass}>
        <div className={aboutCollectionGridClass}>
          <aside className={aboutCollectionSidebarClass}>{sidebar}</aside>
          <article className="bg-white">{children}</article>
        </div>
      </section>
    </main>
  )
}
