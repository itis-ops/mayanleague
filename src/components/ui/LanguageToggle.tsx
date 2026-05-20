'use client'

import { useLanguage } from '@/hooks/useLanguage'

interface LanguageToggleProps {
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

export default function LanguageToggle({
  className = '',
  activeClassName = 'bg-ink text-white',
  inactiveClassName = 'hover:bg-cream hover:text-ink active:bg-cream-dark active:text-ink',
}: LanguageToggleProps) {
  const { lang, setLang, t } = useLanguage()
  const buttonClass = (isActive: boolean) =>
    `motion-control min-h-11 px-3 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
      isActive ? activeClassName : inactiveClassName
    }`

  return (
    <div
      className={`inline-grid grid-cols-2 items-center overflow-hidden rounded-full border border-current text-xs font-bold ${className}`}
      role="group"
      aria-label={t.ui.selectLanguage}
    >
      <button
        onClick={() => setLang('en')}
        className={buttonClass(lang === 'en')}
        aria-pressed={lang === 'en'}
        aria-label={t.ui.switchToEnglish}
      >
        EN
      </button>
      <button
        onClick={() => setLang('es')}
        className={buttonClass(lang === 'es')}
        aria-pressed={lang === 'es'}
        aria-label={t.ui.switchToSpanish}
      >
        ES
      </button>
    </div>
  )
}
