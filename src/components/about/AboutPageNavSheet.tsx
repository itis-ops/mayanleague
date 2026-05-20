'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

interface AboutPageNavSheetProps {
  activeHref: string
  links: ReadonlyArray<{ label: string; href: string }>
}

export default function AboutPageNavSheet({ activeHref, links }: AboutPageNavSheetProps) {
  const sheetId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const copy =
    lang === 'es'
      ? {
          trigger: 'Menú',
          title: t.aboutPage.label,
          close: 'Cerrar',
        }
      : {
          trigger: 'Menu',
          title: t.aboutPage.label,
          close: 'Close',
        }

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
        className="motion-control flex shrink-0 items-center gap-1.5 rounded-full border border-cream-dark px-3 py-1.5 font-body text-xs font-black uppercase tracking-[0.08em] text-ink/70 hover:border-earth-red hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {copy.trigger}
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80]" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-ink/35"
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
            className="absolute inset-x-0 bottom-0 max-h-[min(88vh,640px)] overflow-hidden rounded-t-2xl bg-white shadow-[0_-24px_60px_rgba(36,36,36,0.12)] outline-none"
          >
            <div className="flex max-h-[min(88vh,640px)] flex-col">
              <div className="flex items-center justify-between px-6 pb-2 pt-5">
                <p id={`${sheetId}-title`} className="type-kicker text-earth-red">
                  {copy.title}
                </p>
                <button
                  type="button"
                  onClick={closeSheet}
                  className="motion-control type-kicker text-ink/58 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
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
          </div>
        </div>
      ) : null}
    </>
  )
}
