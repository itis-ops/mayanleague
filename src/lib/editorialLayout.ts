/** Shared horizontal rail for About- and Program-family pages. */
export const editorialPageRailClass = 'mx-auto max-w-[1440px] px-4 sm:px-8'

export const editorialPageGridClass = 'grid grid-cols-1 xl:grid-cols-[0.26fr_1fr] xl:gap-14'

export const editorialSidebarClass = 'sticky top-[124px] z-10 hidden w-full self-start xl:block'

export const editorialMainClass = 'min-w-0'

/** Hub/index pages (News, Programs, Resources) share this wider rail. */
export const hubPageSectionClass = 'mx-auto max-w-[1728px] px-5 sm:px-8 lg:px-12'

export const hubPageMainClass = 'about-page bg-white pt-[72px] text-ink xl:pt-[124px]'

/** Fixed mobile subnav below navbar — gutters match hub content rail. */
export const hubMobileSubnavClass =
  'fixed inset-x-0 top-[72px] z-40 border-b border-cream-dark bg-white/96 backdrop-blur-sm xl:hidden'

export const hubMobileSubnavInnerClass =
  'mx-auto flex min-h-[56px] w-full max-w-[1728px] items-center gap-3 px-5 sm:px-8 lg:px-12'

/** Anchor offsets that clear sticky chrome (navbar + one sub-bar). */
export const scrollAnchorSectionClass = 'scroll-mt-32 xl:scroll-mt-44'

/** Program pages with inline section nav — taller sticky stack at lg+. */
export const scrollAnchorProgramSectionClass =
  'scroll-mt-48 lg:scroll-mt-44 xl:scroll-mt-[13.5rem]'

export const hubPageGridClass = 'mt-8 grid grid-cols-1 xl:grid-cols-[0.26fr_1fr] xl:gap-14'

/** Inner section padding inside collection article cards. */
export const collectionArticleSectionClass = 'px-4 sm:px-10 lg:px-14'

/** Meta row above collection heroes — aligns sidebar kicker with language bar. */
export const collectionMetaRowClass =
  'flex min-h-11 items-center border-b border-cream-dark'

/** Sidebar nav below kicker — top aligns with collection hero title (matches hero pt-8). */
export const collectionSidebarNavClass = 'flex flex-col gap-3 pt-8'

/** Sticky language bar — pins below navbar for full-page scroll. */
export const collectionLanguageBarClass =
  'sticky top-[72px] z-20 flex min-h-11 items-center border-b border-cream-dark bg-white/96 backdrop-blur-sm xl:top-[124px]'

/** Language toggle: vertically centered, flush to the article column’s right edge. */
export const collectionLanguageBarInnerClass =
  'flex h-11 w-full items-center justify-end pl-4 pr-0 sm:pl-10 lg:pl-14'

/** Hub/news article language bar — matches hub page gutters, right-flush toggle. */
export const hubLanguageBarInnerClass =
  'flex h-11 w-full items-center justify-end pl-5 pr-0 sm:pl-8 lg:pl-12'

/** News article inner gutter — matches hub section padding (no extra indent). */
export const hubArticleInnerClass = 'px-5 sm:px-8 lg:px-12'

/** Full-bleed rows inside hub article — cancels hub section horizontal padding. */
export const hubArticleBleedClass = '-mx-5 sm:-mx-8 lg:-mx-12'

/** Content inside bleed rows — restores hub gutters only. */
export const hubArticleBleedInnerClass = hubArticleInnerClass

/** Hero copy below the meta divider — matches article gutters, extra top breathing room. */
export const collectionHeroContentClass =
  `${collectionArticleSectionClass} pt-8 pb-7 sm:pt-9 sm:pb-8 lg:pt-10 lg:pb-10`

/** Compact secondary nav inside hub pages (Programs index, etc.). */
export const hubCompactNavClass =
  'sticky top-[72px] z-20 -mx-5 border-b border-cream-dark bg-white sm:-mx-8 lg:-mx-12 xl:hidden'

export const hubCompactNavInnerClass =
  'flex h-11 items-center justify-between gap-4 px-5 sm:px-8 lg:px-12'

/** Compact secondary nav: full rail-width border, content aligned to page gutter. */
export const editorialCompactNavClass =
  'sticky top-[72px] z-20 -mx-4 border-b border-cream-dark bg-white sm:-mx-8 xl:hidden'

export const editorialCompactNavInnerClass =
  'flex h-11 items-center justify-between gap-4 px-4 sm:px-8'

/** About collection pages: offset matches fixed Navbar (72px mobile, 124px desktop). */
export const aboutCollectionMainClass = 'about-page collection-page bg-white pt-[72px] text-ink xl:pt-[124px]'

export const aboutCollectionSectionClass =
  'mx-auto max-w-[1728px] px-4 sm:px-8 lg:px-12'

export const aboutCollectionGridClass =
  'grid grid-cols-1 border-t border-cream-dark lg:grid-cols-[0.23fr_1fr] lg:gap-14'

export const aboutCollectionSidebarClass =
  'sticky top-[72px] z-10 hidden w-full self-start lg:block xl:top-[124px]'
