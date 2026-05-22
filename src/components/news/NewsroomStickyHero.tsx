'use client'

import { useEffect, useRef, useState } from 'react'
import HubLanguageBar from '@/components/editorial/HubLanguageBar'
import SectionIndexHero from '@/components/editorial/SectionIndexHero'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import NewsFilters from '@/components/news/NewsFilters'
import NewsFiltersSheet from '@/components/news/NewsFiltersSheet'
import { useLanguage } from '@/hooks/useLanguage'

interface FilterItem {
  label: string
  href: string
  count: number
}

interface NewsroomStickyHeroProps {
  categories: FilterItem[]
  dates: FilterItem[]
  dispatchCount: number
}

export default function NewsroomStickyHero({ categories, dates, dispatchCount }: NewsroomStickyHeroProps) {
  const { lang } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)

  const copy =
    lang === 'es'
      ? {
          eyebrow: 'Sala de prensa',
          countLabel: `${dispatchCount} despachos`,
          title: 'Noticias de nuestra Nación',
          intro:
            'Una sala de prensa curada con artículos, análisis, testimonio público y futuras actualizaciones originales de la Liga Maya Internacional.',
        }
      : {
          eyebrow: 'Newsroom',
          countLabel: `${dispatchCount} dispatches`,
          title: 'News from our Nation',
          intro:
            'A curated newsroom for articles, analysis, public witness, and future original updates from the International Mayan League.',
        }

  useEffect(() => {
    function updateProgress() {
      const top = heroRef.current?.offsetTop ?? 0
      const distance = Math.max(0, window.scrollY - top)
      const next = Math.min(1, distance / 220)
      setProgress(next)
      frameRef.current = null
    }

    function schedule() {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const barVisible = progress > 0.58
  const barOpacity = Math.max(0, Math.min(1, (progress - 0.58) / 0.32))
  const heroOpacity = Math.max(0.62, 1 - progress * 0.38)

  return (
    <section className="relative z-30 overflow-visible">

      {/* ── Desktop lg+: sticky language band (matches collection pages) ── */}
      <HubLanguageBar
        showFrom="xl"
        leading={<p className="type-kicker text-ink/48">{copy.countLabel}</p>}
      />

      {/* ── Mobile + tablet: fixed top bar below navbar ── */}
      {/* Always visible; shows eyebrow at rest, title + archive button when scrolled */}
      <div className="fixed inset-x-0 top-[72px] z-50 border-b border-cream-dark bg-white/96 backdrop-blur-sm xl:hidden">
        <div className="mx-auto flex min-h-[56px] w-full max-w-[1728px] items-center gap-3 pl-5 pr-0 sm:pl-8">
          {barVisible ? (
            <p className="type-display min-w-0 flex-1 truncate text-[clamp(1rem,4vw,1.35rem)] leading-[0.95] tracking-[-0.04em] text-ink">
              {copy.title}
            </p>
          ) : (
            <p className="type-kicker min-w-0 flex-1 text-earth-red">{copy.eyebrow}</p>
          )}
          <HeroLanguageToggle className="flex h-11 shrink-0 items-center" />
          {/* Compact archive trigger fades in only after hero scrolls away */}
          <div
            className={`shrink-0 transition-[opacity,visibility] duration-200 ease-[var(--ease-emil)] ${
              barVisible ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
            }`}
          >
            <NewsFiltersSheet categories={categories} dates={dates} size="compact" />
          </div>
        </div>
      </div>

      {/* Spacer so fixed bar doesn't overlap hero */}
      <div className="min-h-[56px] xl:hidden" aria-hidden="true" />

      {/* ── Hero body (fades + slides as user scrolls) ── */}
      <div
        ref={heroRef}
        className="pt-5 pb-7 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-10"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${-10 * progress}px)`,
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}
      >
        <SectionIndexHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          detail={copy.countLabel}
          detailClassName="xl:hidden"
          showLanguageToggle={false}
        >
          {/* Mobile + tablet: full-width archive trigger in hero */}
          <div
            className={`relative z-30 mt-8 transition-[opacity,visibility] duration-200 ease-[var(--ease-emil)] xl:hidden ${
              barVisible ? 'pointer-events-none invisible opacity-0' : 'visible opacity-100'
            }`}
            aria-hidden={barVisible}
          >
            <NewsFiltersSheet categories={categories} dates={dates} size="full" />
          </div>

          {/* Desktop xl+: dropdown filters inline in hero */}
          <div
            className={`relative z-30 mt-8 hidden transition-[opacity,visibility] duration-200 ease-[var(--ease-emil)] xl:block ${
              barVisible ? 'pointer-events-none invisible opacity-0' : 'visible opacity-100'
            }`}
            aria-hidden={barVisible}
          >
            <NewsFilters categories={categories} dates={dates} instanceId="hero" />
          </div>
        </SectionIndexHero>
      </div>

      {/* ── Desktop xl+: sticky filter bar (slides in on scroll) ── */}
      <div
        className={[
          'fixed left-0 right-0 top-[124px] z-50 hidden min-h-[66px] items-center overflow-visible',
          'border-b border-cream-dark bg-white/96 backdrop-blur-sm xl:flex',
          'transition-[opacity,transform,visibility,box-shadow] duration-[360ms] ease-[var(--ease-emil)]',
          barVisible
            ? 'visible pointer-events-auto shadow-[0_18px_44px_rgba(36,36,36,0.08)]'
            : 'invisible pointer-events-none',
        ].join(' ')}
        style={{
          opacity: barOpacity,
          transform: `translateY(${(1 - barOpacity) * -12}px)`,
        }}
      >
        <div className="mx-auto grid w-full max-w-[1728px] grid-cols-1 gap-3 px-5 sm:grid-cols-[minmax(0,0.34fr)_minmax(320px,0.66fr)] sm:items-center sm:px-8 lg:gap-6 lg:px-12">
          <h2 className="type-display hidden truncate text-[clamp(1.2rem,2.2vw,1.85rem)] leading-[0.9] tracking-[-0.045em] text-ink sm:block">
            {copy.title}
          </h2>
          <div className="relative z-[60] flex items-center justify-end gap-3 overflow-visible pr-0">
            <div className="min-w-0 flex-1">
              <NewsFilters categories={categories} dates={dates} compact instanceId="sticky" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
