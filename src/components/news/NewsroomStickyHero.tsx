'use client'

import { useEffect, useRef, useState } from 'react'
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
  const copy = lang === 'es'
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
      const nextProgress = Math.min(1, distance / 220)
      setProgress(nextProgress)
      frameRef.current = null
    }

    function requestProgressUpdate() {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', requestProgressUpdate, { passive: true })
    window.addEventListener('resize', requestProgressUpdate)

    return () => {
      window.removeEventListener('scroll', requestProgressUpdate)
      window.removeEventListener('resize', requestProgressUpdate)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const barVisible = progress > 0.58
  const barOpacity = Math.max(0, Math.min(1, (progress - 0.58) / 0.32))
  const heroOpacity = Math.max(0.62, 1 - progress * 0.38)

  return (
    <section className="relative z-30 overflow-visible">
      <div
        ref={heroRef}
        className="pb-7 transition-[opacity,transform] duration-[220ms] ease-[var(--ease-emil)] sm:pb-8 lg:pb-10"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${-10 * progress}px)`,
        }}
      >
        <div className="mb-4 flex items-center justify-between border-y border-cream-dark py-3">
          <p className="type-kicker text-earth-red">{copy.eyebrow}</p>
          <p className="type-kicker hidden text-ink/55 sm:block">{copy.countLabel}</p>
        </div>

        <h1 className="type-display max-w-5xl text-[clamp(2.6rem,8.4vw,7.4rem)] text-ink sm:text-[clamp(3.4rem,8.4vw,7.4rem)]">
          {copy.title}
        </h1>

        <p className="type-intro mt-6 max-w-[58ch] text-[clamp(1.2rem,2vw,1.95rem)] text-ink/82">
          {copy.intro}
        </p>

        <div
          className={`relative z-30 mt-8 transition-[opacity,visibility] duration-[220ms] ease-[var(--ease-emil)] lg:hidden ${
            barVisible ? 'invisible pointer-events-none opacity-0' : 'visible opacity-100'
          }`}
          aria-hidden={barVisible}
        >
          <NewsFiltersSheet categories={categories} dates={dates} />
        </div>

        <div
          className={`relative z-30 mt-8 hidden transition-[opacity,visibility] duration-[220ms] ease-[var(--ease-emil)] lg:block ${
            barVisible ? 'invisible pointer-events-none opacity-0' : 'visible opacity-100'
          }`}
          aria-hidden={barVisible}
        >
          <NewsFilters categories={categories} dates={dates} instanceId="hero" />
        </div>
      </div>

      {/* Mobile: compact sticky bar with browse trigger only */}
      <div
        className={`fixed left-0 right-0 top-[72px] z-50 flex min-h-[56px] items-center border-b border-cream-dark bg-white/95 px-5 backdrop-blur-sm transition-[opacity,transform,visibility,box-shadow] duration-[360ms] ease-[var(--ease-emil)] xl:hidden ${
          barVisible ? 'visible pointer-events-auto shadow-[0_12px_32px_rgba(36,36,36,0.08)]' : 'invisible pointer-events-none'
        }`}
        style={{
          opacity: barOpacity,
          transform: `translateY(${(1 - barOpacity) * -12}px)`,
        }}
      >
        <div className="mx-auto flex w-full max-w-[1728px] items-center gap-4">
          <h2 className="type-display min-w-0 flex-1 truncate text-[clamp(1rem,4vw,1.35rem)] leading-[0.95] tracking-[-0.04em] text-ink">
            {copy.title}
          </h2>
          <div className="w-[7.5rem] shrink-0">
            <NewsFiltersSheet categories={categories} dates={dates} compact />
          </div>
        </div>
      </div>

      {/* Desktop: full sticky filter bar */}
      <div
        className={`fixed left-0 right-0 top-[124px] z-50 hidden min-h-[66px] items-center overflow-visible border-b border-cream-dark bg-white/95 backdrop-blur-sm transition-[opacity,transform,visibility,box-shadow] duration-[360ms] ease-[var(--ease-emil)] xl:flex ${
          barVisible ? 'visible pointer-events-auto shadow-[0_18px_44px_rgba(36,36,36,0.08)]' : 'invisible pointer-events-none'
        }`}
        style={{
          opacity: barOpacity,
          transform: `translateY(${(1 - barOpacity) * -12}px)`,
        }}
      >
        <div className="mx-auto grid w-full max-w-[1728px] grid-cols-1 gap-3 px-5 sm:grid-cols-[minmax(0,0.34fr)_minmax(320px,0.66fr)] sm:items-center sm:px-8 lg:gap-6 lg:px-12">
          <h2 className="type-display hidden truncate text-[clamp(1.2rem,2.2vw,1.85rem)] leading-[0.9] tracking-[-0.045em] text-ink sm:block">
            {copy.title}
          </h2>
          <div className="relative z-[60] overflow-visible">
            <NewsFilters categories={categories} dates={dates} compact instanceId="sticky" />
          </div>
        </div>
      </div>
    </section>
  )
}
