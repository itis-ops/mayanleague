'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

interface FilterItem {
  label: string
  href: string
  count: number
}

interface NewsFiltersSheetProps {
  categories: FilterItem[]
  dates: FilterItem[]
  compact?: boolean
}

type ActivePanel = 'categories' | 'dates'

export default function NewsFiltersSheet({ categories, dates, compact = false }: NewsFiltersSheetProps) {
  const sheetId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>('categories')

  const copy = lang === 'es'
    ? {
        trigger: 'Explorar archivo',
        triggerShort: 'Archivo',
        title: 'Explorar despachos',
        helper: 'Selecciona un filtro para ir al archivo.',
        categories: 'Categorías',
        dates: 'Mes / año',
        close: 'Cerrar',
      }
    : {
        trigger: 'Browse archive',
        triggerShort: 'Archive',
        title: 'Browse dispatches',
        helper: 'Select a filter to jump into the archive.',
        categories: 'Categories',
        dates: 'Month / year',
        close: 'Close',
      }

  const activeItems = activePanel === 'dates' ? dates : categories

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    sheetRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [open])

  function closeSheet() {
    setOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={sheetId}
        className={`motion-control inline-flex w-full items-center justify-center rounded-full border border-cream-dark bg-white font-body text-sm font-black uppercase leading-none tracking-[0.06em] text-ink shadow-[0_8px_22px_rgba(36,36,36,0.08)] hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
          compact ? 'min-h-10 px-4' : 'min-h-14 px-6'
        }`}
      >
        {compact ? copy.triggerShort : copy.trigger}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-ink/45"
            aria-label={copy.close}
            onClick={closeSheet}
          />

          <div
            ref={sheetRef}
            id={sheetId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${sheetId}-title`}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 max-h-[min(88vh,640px)] overflow-hidden rounded-t-[1.75rem] border border-cream-dark bg-white shadow-[0_-24px_60px_rgba(36,36,36,0.18)] outline-none"
          >
            <div className="flex max-h-[min(88vh,640px)] flex-col">
              <div className="flex items-center justify-center py-3" aria-hidden="true">
                <span className="h-1 w-10 rounded-full bg-cream-dark" />
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-cream-dark px-5 pb-4">
                <div>
                  <p id={`${sheetId}-title`} className="type-kicker text-earth-red">
                    {copy.title}
                  </p>
                  <p className="mt-2 font-body text-sm font-semibold text-ink/58">{copy.helper}</p>
                </div>
                <button
                  type="button"
                  onClick={closeSheet}
                  className="motion-control inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-dark bg-white font-body text-lg font-black leading-none text-ink hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  aria-label={copy.close}
                >
                  ×
                </button>
              </div>

              <div className="flex gap-2 border-b border-cream-dark px-5 py-3">
                {(['categories', 'dates'] as const).map((panel) => (
                  <button
                    key={panel}
                    type="button"
                    onClick={() => setActivePanel(panel)}
                    className={`motion-control flex-1 rounded-full px-4 py-2.5 font-body text-xs font-black uppercase tracking-[0.08em] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                      activePanel === panel
                        ? 'bg-earth-red text-white'
                        : 'bg-mist text-ink/72 hover:bg-cream'
                    }`}
                  >
                    {panel === 'categories' ? copy.categories : copy.dates}
                  </button>
                ))}
              </div>

              <div className="overflow-y-auto px-5 py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                <div className="grid grid-cols-1 gap-2">
                  {activeItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeSheet}
                      className="motion-control flex min-h-14 items-center justify-between rounded-2xl border border-cream-dark bg-mist px-4 py-3 text-ink hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <span className="font-body text-sm font-black uppercase leading-4 tracking-[0.08em]">{item.label}</span>
                      <span className="font-display text-2xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                        {String(item.count).padStart(2, '0')}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
