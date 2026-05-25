'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '@/hooks/useLanguage'

interface AboutPageNavSheetProps {
  activeHref: string
  links: ReadonlyArray<{ label: string; href: string }>
  triggerLabel?: string
  variant?: 'pill' | 'control'
  fullWidth?: boolean
  compact?: boolean
}

export default function AboutPageNavSheet({
  activeHref,
  links,
  triggerLabel,
  variant = 'pill',
  fullWidth = false,
  compact = false,
}: AboutPageNavSheetProps) {
  const sheetId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const copy =
    lang === 'es'
      ? {
          trigger: triggerLabel ?? 'Menú',
          triggerShort: 'Menú',
          title: t.aboutPage.label,
          close: 'Cerrar',
        }
      : {
          trigger: triggerLabel ?? 'Menu',
          triggerShort: 'Menu',
          title: t.aboutPage.label,
          close: 'Close',
        }

  const triggerClass = compact
    ? 'motion-control inline-flex w-full items-center justify-center rounded-full border border-ink/15 bg-white font-body text-sm font-black uppercase leading-none tracking-[0.06em] text-ink hover:border-earth-red hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold min-h-10 px-4'
    : variant === 'control'
      ? [
          'motion-control inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-4 font-body text-xs font-bold uppercase tracking-[0.04em] text-ink hover:bg-cream hover:text-earth-red active:bg-cream-dark active:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold',
          fullWidth ? 'w-full justify-between' : 'shrink-0',
        ].join(' ')
      : 'motion-control flex shrink-0 items-center gap-1.5 rounded-full border border-cream-dark px-3 py-1.5 font-body text-xs font-black uppercase tracking-[0.08em] text-ink/70 hover:border-earth-red hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold'

  useEffect(() => {
    setMounted(true)
  }, [])

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
        className={triggerClass}
      >
        {variant === 'control' && !compact ? (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        ) : null}
        <span className={fullWidth && variant === 'control' && !compact ? 'min-w-0 flex-1 text-left' : undefined}>
          {compact ? copy.triggerShort : copy.trigger}
        </span>
        {(variant === 'pill' || variant === 'control') && !compact ? (
          <svg className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="m5 8 5 5 5-5" />
          </svg>
        ) : null}
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[90]" role="presentation">
              <button
                type="button"
                className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
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
                className="absolute inset-x-0 bottom-0 flex max-h-[min(90vh,660px)] flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-[0_-20px_60px_rgba(36,36,36,0.16)] outline-none animate-[slide-up-sheet_320ms_cubic-bezier(0.22,1,0.36,1)_both]"
              >
                <div className="flex items-center justify-center pt-3 pb-1" aria-hidden="true">
                  <span className="h-[5px] w-10 rounded-full bg-cream-dark" />
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-cream-dark px-6 pb-4 pt-2">
                  <p id={`${sheetId}-title`} className="type-kicker text-earth-red">
                    {copy.title}
                  </p>
                  <button
                    type="button"
                    onClick={closeSheet}
                    className="motion-control shrink-0 font-body text-sm font-bold leading-none text-ink/50 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    aria-label={copy.close}
                  >
                    {copy.close}
                  </button>
                </div>

                <nav
                  className="flex flex-col gap-5 overflow-y-auto px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
                  aria-label={copy.title}
                >
                  {links.map((link) => {
                    const isActive = link.href === activeHref

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={closeSheet}
                        aria-current={isActive ? 'page' : undefined}
                        className={[
                          'motion-nav-link block font-body text-sm font-semibold leading-5 tracking-[-0.01em]',
                          'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold',
                          isActive ? 'text-earth-red' : 'text-ink/58 hover:text-earth-red',
                        ].join(' ')}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
