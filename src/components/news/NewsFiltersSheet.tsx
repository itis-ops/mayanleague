'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '@/hooks/useLanguage'

interface FilterItem {
  label: string
  href: string
  count: number
}

interface NewsFiltersSheetProps {
  categories: FilterItem[]
  dates: FilterItem[]
  /**
   * 'full'    – Hero context: wide pill spanning content width, tall touch target.
   * 'compact' – Toolbar context: auto-width pill that fits a 56px bar.
   */
  size?: 'full' | 'compact'
}

type ActivePanel = 'categories' | 'dates'

export default function NewsFiltersSheet({ categories, dates, size = 'full' }: NewsFiltersSheetProps) {
  const sheetId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>('categories')

  const copy =
    lang === 'es'
      ? {
          trigger: 'Explorar archivo',
          triggerCompact: 'Archivo',
          sheetTitle: 'Explorar despachos',
          helper: 'Selecciona un filtro para ir al archivo.',
          tabCategories: 'Categorías',
          tabDates: 'Mes / año',
          close: 'Cerrar',
        }
      : {
          trigger: 'Browse archive',
          triggerCompact: 'Archive',
          sheetTitle: 'Browse dispatches',
          helper: 'Select a filter to jump into the archive.',
          tabCategories: 'Categories',
          tabDates: 'Month / year',
          close: 'Close',
        }

  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    sheetRef.current?.focus()

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [open])

  const activeItems = activePanel === 'dates' ? dates : categories

  return (
    <>
      {/* ── Trigger ── */}
      {size === 'full' ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={sheetId}
          className="motion-control flex w-full min-h-[3.75rem] items-center justify-between gap-3 rounded-full border border-ink/14 bg-white px-6 font-body text-[0.9rem] font-semibold text-ink shadow-[0_8px_28px_rgba(36,36,36,0.07)] hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <span className="flex items-center gap-2.5 text-ink/80">
            {/* funnel icon */}
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
            {copy.trigger}
          </span>
          {/* chevron */}
          <svg className="h-4 w-4 shrink-0 text-ink/35" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={sheetId}
          className="motion-control inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3.5 py-2 font-body text-[0.72rem] font-black uppercase tracking-[0.07em] text-ink hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <svg className="h-3.5 w-3.5 shrink-0 text-ink/55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          {copy.triggerCompact}
        </button>
      )}

      {/* ── Bottom sheet — portalled to <body> to escape any CSS transform ancestors ── */}
      {open
        ? createPortal(
            <div className="fixed inset-0 z-[90] xl:hidden" role="presentation">
              {/* Backdrop */}
              <button
                type="button"
                className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
                aria-label={copy.close}
                tabIndex={-1}
                onClick={() => setOpen(false)}
              />

              {/* Sheet panel — slides up from viewport bottom */}
              <div
                ref={sheetRef}
                id={sheetId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${sheetId}-title`}
                tabIndex={-1}
                className="absolute inset-x-0 bottom-0 flex max-h-[min(90vh,660px)] flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-[0_-20px_60px_rgba(36,36,36,0.16)] outline-none animate-[slide-up-sheet_320ms_cubic-bezier(0.22,1,0.36,1)_both]"
              >
                {/* Handle */}
                <div className="flex items-center justify-center pt-3 pb-1" aria-hidden="true">
                  <span className="h-[5px] w-10 rounded-full bg-cream-dark" />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-cream-dark px-6 pb-4 pt-2">
                  <div className="min-w-0">
                    <p id={`${sheetId}-title`} className="type-kicker text-earth-red">
                      {copy.sheetTitle}
                    </p>
                    <p className="mt-1.5 font-body text-sm font-medium leading-relaxed text-ink/52">
                      {copy.helper}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="motion-control shrink-0 font-body text-sm font-bold leading-none text-ink/50 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    aria-label={copy.close}
                  >
                    {copy.close}
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-cream-dark px-6 py-3">
                  {(['categories', 'dates'] as const).map((panel) => (
                    <button
                      key={panel}
                      type="button"
                      onClick={() => setActivePanel(panel)}
                      aria-pressed={activePanel === panel}
                      className={[
                        'motion-control flex-1 rounded-full px-4 py-2.5 font-body text-xs font-black uppercase tracking-[0.08em] transition-colors',
                        'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold',
                        activePanel === panel
                          ? 'bg-earth-red text-white'
                          : 'bg-mist text-ink/60 hover:bg-cream hover:text-ink',
                      ].join(' ')}
                    >
                      {panel === 'categories' ? copy.tabCategories : copy.tabDates}
                    </button>
                  ))}
                </div>

                {/* Filter list */}
                <div className="flex-1 overflow-y-auto px-5 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                  <div className="grid grid-cols-1 gap-2">
                    {activeItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="motion-control flex min-h-[3.5rem] items-center justify-between rounded-2xl border border-cream-dark bg-mist px-4 py-3 text-ink hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <span className="font-body text-sm font-black uppercase leading-snug tracking-[0.08em]">
                          {item.label}
                        </span>
                        <span className="font-display text-2xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                          {String(item.count).padStart(2, '0')}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
