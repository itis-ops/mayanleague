'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import HubLanguageBar from '@/components/editorial/HubLanguageBar'
import SectionIndexHero from '@/components/editorial/SectionIndexHero'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import NewsFilters from '@/components/news/NewsFilters'
import NewsFiltersSheet from '@/components/news/NewsFiltersSheet'
import { hubMobileSubnavClass, hubMobileSubnavInnerClass } from '@/lib/editorialLayout'
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

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

/** Emil-style ease-out — quick start, soft landing. */
function easeOutQuart(value: number) {
  return 1 - (1 - value) ** 4
}

/** Extra snap on the final dock into the sticky bar. */
function easeOutExpo(value: number) {
  return value === 1 ? 1 : 1 - 2 ** (-10 * value)
}

function blendMorph(raw: number) {
  const eased = easeOutQuart(clamp01(raw))
  return clamp01(eased * 0.72 + easeOutExpo(clamp01(raw)) * 0.28)
}

export default function NewsroomStickyHero({ categories, dates, dispatchCount }: NewsroomStickyHeroProps) {
  const { lang } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const heroArchiveRef = useRef<HTMLDivElement>(null)
  const stickyBarRef = useRef<HTMLDivElement>(null)
  const compactMeasureRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [morph, setMorph] = useState(0)
  const [compactWidth, setCompactWidth] = useState(104)
  const [reduceMotion, setReduceMotion] = useState(false)

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
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(media.matches)

    function onMotionPreferenceChange(event: MediaQueryListEvent) {
      setReduceMotion(event.matches)
    }

    media.addEventListener('change', onMotionPreferenceChange)
    return () => media.removeEventListener('change', onMotionPreferenceChange)
  }, [])

  useLayoutEffect(() => {
    const button = compactMeasureRef.current?.querySelector('button')
    if (button && button.offsetWidth > 0) {
      setCompactWidth(button.offsetWidth)
    }
  }, [lang])

  useEffect(() => {
    function updateScrollState() {
      const top = heroRef.current?.offsetTop ?? 0
      const distance = Math.max(0, window.scrollY - top)
      const nextProgress = Math.min(1, distance / 220)
      setProgress(nextProgress)

      const heroArchive = heroArchiveRef.current
      const stickyBar = stickyBarRef.current

      if (!heroArchive || !stickyBar) {
        setMorph(0)
        frameRef.current = null
        return
      }

      const archiveTop = heroArchive.getBoundingClientRect().top
      const stickyRect = stickyBar.getBoundingClientRect()
      const travelStart = stickyRect.bottom + 56
      const travelEnd = stickyRect.top + stickyRect.height * 0.42
      const rawMorph = 1 - (archiveTop - travelEnd) / (travelStart - travelEnd)

      if (reduceMotion) {
        setMorph(rawMorph >= 0.72 ? 1 : 0)
      } else {
        setMorph(blendMorph(rawMorph))
      }

      frameRef.current = null
    }

    function schedule() {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateScrollState)
      }
    }

    updateScrollState()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [reduceMotion])

  const barVisible = !reduceMotion && progress > 0.58
  const barOpacity = reduceMotion ? 0 : Math.max(0, Math.min(1, (progress - 0.58) / 0.32))
  const heroOpacity = reduceMotion ? 1 : Math.max(0.62, 1 - progress * 0.38)

  const archiveDock = easeOutExpo(morph)
  const archiveRise = easeOutQuart(morph)
  const heroArchiveOpacity = 1 - archiveRise
  const stickyArchiveWidth = compactWidth * archiveDock
  const stickyArchiveGap = 8 * archiveDock
  const heroArchiveLift = -42 * archiveRise
  const heroArchiveScale = 1 - archiveRise * 0.045
  const stickyArchiveLift = (1 - archiveDock) * 22
  const stickyArchiveScale = 0.9 + archiveDock * 0.1

  return (
    <section className="relative z-30 overflow-visible">
      <HubLanguageBar
        showFrom="xl"
        leading={<p className="type-kicker text-ink/48">{copy.countLabel}</p>}
      />

      <div ref={stickyBarRef} className={hubMobileSubnavClass}>
        <div className={hubMobileSubnavInnerClass}>
          <p className="type-display min-w-0 flex-1 truncate text-[clamp(1rem,4vw,1.35rem)] leading-[0.95] tracking-[-0.04em] text-ink">
            {copy.title}
          </p>

          <div className="flex shrink-0 items-center">
            <div
              aria-hidden={archiveDock < 0.08}
              className="origin-right overflow-hidden will-change-[width,opacity,transform]"
              style={{
                width: `${stickyArchiveWidth}px`,
                opacity: archiveDock,
                marginRight: `${stickyArchiveGap}px`,
                transform: `translateY(${stickyArchiveLift}px) scale(${stickyArchiveScale})`,
                pointerEvents: archiveDock > 0.55 ? 'auto' : 'none',
              }}
            >
              <div style={{ width: `${compactWidth}px` }}>
                <NewsFiltersSheet categories={categories} dates={dates} size="compact" />
              </div>
            </div>

            <HeroLanguageToggle className="flex h-11 shrink-0 items-center will-change-transform" />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-0 overflow-hidden opacity-0"
      >
        <div ref={compactMeasureRef}>
          <NewsFiltersSheet categories={categories} dates={dates} size="compact" />
        </div>
      </div>

      <div className="min-h-[56px] xl:hidden" aria-hidden="true" />

      <div
        ref={heroRef}
        className="pt-5 pb-7 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-10"
        style={
          reduceMotion
            ? undefined
            : {
                opacity: heroOpacity,
                transform: `translateY(${-10 * progress}px)`,
                transition: 'opacity 220ms ease, transform 220ms ease',
              }
        }
      >
        <SectionIndexHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          detail={copy.countLabel}
          detailClassName="xl:hidden"
          showLanguageToggle={false}
        >
          <div
            ref={heroArchiveRef}
            className="relative z-30 mt-8 origin-top will-change-[opacity,transform] xl:hidden"
            style={{
              opacity: heroArchiveOpacity,
              transform: `translateY(${heroArchiveLift}px) scale(${heroArchiveScale})`,
              pointerEvents: archiveDock < 0.45 ? 'auto' : 'none',
            }}
            aria-hidden={archiveDock > 0.92}
          >
            <NewsFiltersSheet categories={categories} dates={dates} size="full" />
          </div>

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

      <div
        className={[
          'fixed left-0 right-0 top-[124px] z-40 hidden min-h-[66px] items-center overflow-visible',
          'border-b border-cream-dark bg-white/96 backdrop-blur-sm xl:flex',
          'transition-[opacity,transform,visibility,box-shadow] duration-[360ms] ease-[var(--ease-emil)]',
          barVisible
            ? 'visible pointer-events-auto shadow-[0_18px_44px_rgba(36,36,36,0.08)]'
            : 'invisible pointer-events-none',
        ].join(' ')}
        style={
          reduceMotion
            ? undefined
            : {
                opacity: barOpacity,
                transform: `translateY(${(1 - barOpacity) * -12}px)`,
              }
        }
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
