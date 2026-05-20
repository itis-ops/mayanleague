'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import LanguageToggle from '@/components/ui/LanguageToggle'

const DONATE_URL = 'https://internationalmayanleague-bloom.kindful.com/embeds/94567c30-cca9-4853-a87f-43c38750420a'

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstMenuLinkRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
      }

      if (event.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) {
        return
      }
      closeMenu()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      menuButtonRef.current?.focus()
    }
  }, [menuOpen, closeMenu])

  const navLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.programs, href: '/programs' },
    { label: t.nav.resources, href: '/resources' },
    { label: t.nav.media, href: '/news' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <header
      className={`motion-surface fixed top-0 left-0 right-0 z-50 bg-white ${
        scrolled ? 'shadow-[0_1px_0_rgba(36,36,36,0.1)]' : ''
      }`}
    >
      <div className="mx-auto max-w-[1728px] px-4 sm:px-8 xl:px-24">
        <div className="flex h-[72px] items-center justify-between xl:h-[124px]">
          <a
            href="/"
            className="group motion-control flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold xl:gap-6"
            aria-label={`${t.brand.full} home`}
          >
            <img
              src="/brand/mayan-league-logo.png"
              alt=""
              className="h-12 w-12 shrink-0 object-contain xl:h-20 xl:w-20"
            />
            <span className="min-w-0 max-w-[10rem] font-display text-base font-bold uppercase leading-[0.94] tracking-[-0.035em] text-ink motion-link group-hover:text-earth-red sm:max-w-none sm:text-xl xl:text-2xl">
              {t.brand.full}
            </span>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="motion-control inline-flex min-h-11 items-center rounded-full px-5 py-2.5 font-body text-sm font-bold uppercase leading-none tracking-[0.04em] text-ink hover:bg-cream hover:text-earth-red active:bg-cream-dark active:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-5">
            <LanguageToggle className="border-ink/20 text-ink" />
            <Button href={DONATE_URL} variant="primary">
              {t.nav.donate}
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageToggle className="border-ink/15 text-ink" />
            <button
              ref={menuButtonRef}
              className="motion-control min-h-11 min-w-11 rounded-md p-2 text-ink hover:bg-cream active:bg-cream-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t.ui.closeMenu : t.ui.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div
          ref={menuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={t.ui.openMenu}
          className="border-t border-cream-dark bg-white shadow-xl xl:hidden"
        >
          <div className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                ref={index === 0 ? firstMenuLinkRef : undefined}
                href={link.href}
                className="motion-link inline-flex min-h-11 items-center rounded-md text-sm font-bold uppercase leading-none tracking-[0.12em] text-ink hover:text-earth-red active:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between border-t border-cream-dark pt-4">
              <LanguageToggle className="border-ink/20 text-ink" />
              <Button href={DONATE_URL} variant="primary" className="px-5 py-2">
                {t.nav.donate}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
