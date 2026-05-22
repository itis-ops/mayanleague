/** Shared horizontal rail for About- and Program-family pages. */
export const editorialPageRailClass = 'mx-auto max-w-[1440px] px-4 sm:px-8'

export const editorialPageGridClass = 'grid grid-cols-1 xl:grid-cols-[0.26fr_1fr] xl:gap-14'

export const editorialSidebarClass = 'sticky top-[124px] z-10 hidden w-full self-start xl:block'

export const editorialMainClass = 'min-w-0'

/** Hub/index pages (News, Programs, Resources) share this wider rail. */
export const hubPageSectionClass = 'mx-auto max-w-[1728px] px-5 sm:px-8 lg:px-12'

export const hubPageMainClass = 'about-page bg-white pt-[72px] text-ink xl:pt-[124px]'

export const hubPageGridClass = 'mt-8 grid grid-cols-1 xl:grid-cols-[0.26fr_1fr] xl:gap-14'

/** Inner section padding inside collection article cards. */
export const collectionArticleSectionClass = 'px-7 sm:px-10 lg:px-14'

/** Meta row above collection heroes — aligns sidebar kicker with language bar. */
export const collectionMetaRowClass =
  'flex min-h-11 items-center border-b border-cream-dark'

/** Sticky language bar — pins below navbar for full-page scroll. */
export const collectionLanguageBarClass =
  'sticky top-[72px] z-20 flex min-h-11 items-center border-b border-cream-dark bg-white/96 backdrop-blur-sm xl:top-[124px]'

/** Language toggle: vertically centered, flush to the article column’s right edge. */
export const collectionLanguageBarInnerClass =
  'flex h-11 w-full items-center justify-end pl-7 pr-0 sm:pl-10 lg:pl-14'

/** Hub/news article language bar — matches hub page gutters, right-flush toggle. */
export const hubLanguageBarInnerClass =
  'flex h-11 w-full items-center justify-end pl-5 pr-0 sm:pl-8 lg:pl-12'

/** Hero copy below the meta divider — matches article gutters, extra top breathing room. */
export const collectionHeroContentClass =
  `${collectionArticleSectionClass} pt-8 pb-7 sm:pt-9 sm:pb-8 lg:pt-10 lg:pb-10`

/** Compact secondary nav: full rail-width border, content aligned to page gutter. */
export const editorialCompactNavClass =
  'sticky top-[72px] z-20 -mx-4 border-b border-cream-dark bg-white sm:-mx-8 xl:hidden'

export const editorialCompactNavInnerClass =
  'flex h-11 items-center justify-between gap-4 px-4 sm:px-8'

/** About collection pages: offset matches fixed Navbar (72px mobile, 124px desktop). */
export const aboutCollectionMainClass = 'about-page collection-page bg-white pt-[72px] text-ink xl:pt-[124px]'

export const aboutCollectionSectionClass =
  'mx-auto max-w-[1728px] px-5 sm:px-8 lg:px-12'

export const aboutCollectionGridClass =
  'grid grid-cols-1 border-t border-cream-dark lg:grid-cols-[0.23fr_1fr] lg:gap-14'

export const aboutCollectionSidebarClass =
  'sticky top-[72px] z-10 hidden w-full self-start lg:block xl:top-[124px]'
