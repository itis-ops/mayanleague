'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

interface FilterItem {
  label: string
  href: string
  count: number
}

interface NewsFiltersProps {
  categories: FilterItem[]
  dates: FilterItem[]
  compact?: boolean
  instanceId?: string
}

type ActivePanel = 'categories' | 'dates' | null

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 motion-control ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  )
}

export default function NewsFilters({ categories, dates, compact = false, instanceId = 'main' }: NewsFiltersProps) {
  const panelId = `news-filter-panel-${instanceId}`
  const { lang } = useLanguage()
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const copy = lang === 'es'
    ? {
        ariaLabel: 'Filtros de noticias',
        categories: 'Categorías',
        browseTopics: 'Explorar temas',
        dates: 'Mes / año',
        browseArchive: 'Explorar archivo',
        helper: 'Selecciona un filtro para ir al archivo.',
        close: 'Cerrar filtros de noticias',
      }
    : {
        ariaLabel: 'News filters',
        categories: 'Categories',
        browseTopics: 'Browse topics',
        dates: 'Month / year',
        browseArchive: 'Browse archive',
        helper: 'Select a filter to jump into the archive.',
        close: 'Close news filters',
      }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setActivePanel(null)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActivePanel(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const activeItems = activePanel === 'dates' ? dates : categories
  const activeLabel = activePanel === 'dates' ? copy.dates : copy.categories
  const panelAlignClass =
    activePanel === 'dates'
      ? 'left-auto right-0 origin-top-right'
      : 'left-0 right-auto origin-top-left'

  return (
    <nav ref={rootRef} className="relative z-[70]" aria-label={copy.ariaLabel}>
      <div className={`flex w-full items-center rounded-full border border-cream-dark bg-white p-1 transition-shadow duration-[360ms] ease-[var(--ease-emil)] ${compact ? 'shadow-[0_8px_22px_rgba(36,36,36,0.08)]' : 'shadow-[0_12px_32px_rgba(36,36,36,0.08)]'}`}>
        <button
          type="button"
          onClick={() => setActivePanel(activePanel === 'categories' ? null : 'categories')}
          aria-expanded={activePanel === 'categories'}
          aria-controls={panelId}
          className={`motion-control flex flex-1 items-center justify-between rounded-full text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
            compact ? 'min-h-10 px-4' : 'min-h-14 px-5'
          } ${
            activePanel === 'categories' ? 'bg-white text-ink shadow-[0_6px_18px_rgba(36,36,36,0.12)]' : 'text-ink/72 hover:bg-white/70'
          }`}
        >
          <span>
            <span className="block font-body text-xs font-black uppercase leading-none tracking-[0.12em] text-ink">{copy.categories}</span>
            <span className={`mt-1 font-body text-sm font-semibold leading-none text-ink/58 ${compact ? 'hidden' : 'block'}`}>{copy.browseTopics}</span>
          </span>
          <Chevron isOpen={activePanel === 'categories'} />
        </button>

        <div className={`${compact ? 'h-6' : 'h-8'} w-px bg-cream-dark`} aria-hidden="true" />

        <button
          type="button"
          onClick={() => setActivePanel(activePanel === 'dates' ? null : 'dates')}
          aria-expanded={activePanel === 'dates'}
          aria-controls={panelId}
          className={`motion-control flex flex-1 items-center justify-between rounded-full text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
            compact ? 'min-h-10 px-4' : 'min-h-14 px-5'
          } ${
            activePanel === 'dates' ? 'bg-white text-ink shadow-[0_6px_18px_rgba(36,36,36,0.12)]' : 'text-ink/72 hover:bg-white/70'
          }`}
        >
          <span>
            <span className="block font-body text-xs font-black uppercase leading-none tracking-[0.12em] text-ink">{copy.dates}</span>
            <span className={`mt-1 font-body text-sm font-semibold leading-none text-ink/58 ${compact ? 'hidden' : 'block'}`}>{copy.browseArchive}</span>
          </span>
          <Chevron isOpen={activePanel === 'dates'} />
        </button>
      </div>

      <div
        id={panelId}
        className={`absolute top-[calc(100%+0.25rem)] z-[80] w-full rounded-[2rem] border border-cream-dark bg-white p-5 shadow-[0_26px_70px_rgba(36,36,36,0.18)] transition-[opacity,transform,visibility] duration-[360ms] ease-[var(--ease-emil)] sm:w-[min(820px,calc(100vw-3rem))] ${panelAlignClass} ${
          activePanel ? 'visible translate-y-3 scale-100 opacity-100' : 'invisible translate-y-0 scale-[0.98] opacity-0 pointer-events-none'
        }`}
        aria-hidden={!activePanel}
      >
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-cream-dark pb-4">
          <div>
            <p className="type-kicker text-earth-red">{activeLabel}</p>
            <p className="mt-2 font-body text-sm font-semibold text-ink/58">{copy.helper}</p>
          </div>
          <button
            type="button"
            onClick={() => setActivePanel(null)}
            className="motion-control inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-dark bg-white font-body text-lg font-black leading-none text-ink hover:border-earth-red hover:bg-cream hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label={copy.close}
          >
            ×
          </button>
        </div>

        <div className="grid max-h-[52vh] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {activeItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActivePanel(null)}
              className="motion-control flex min-h-14 items-center justify-between rounded-2xl border border-cream-dark bg-mist px-4 py-3 text-ink hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <span className="font-body text-sm font-black uppercase leading-4 tracking-[0.08em]">{item.label}</span>
              <span className="font-display text-2xl font-bold leading-none tracking-[-0.06em] text-earth-red">{String(item.count).padStart(2, '0')}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
