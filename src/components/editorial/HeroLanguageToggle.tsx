'use client'

import { useLanguage } from '@/hooks/useLanguage'

interface HeroLanguageToggleProps {
  className?: string
  tone?: 'default' | 'inverse'
}

export default function HeroLanguageToggle({
  className = '',
  tone = 'default',
}: HeroLanguageToggleProps) {
  const { lang, setLang, t } = useLanguage()
  const inverse = tone === 'inverse'

  function buttonClass(isActive: boolean) {
    return [
      'min-h-11 rounded-sm px-1.5 font-body text-[11px] font-bold uppercase tracking-[0.1em]',
      'transition-colors duration-[var(--motion-base)] ease-[var(--ease-emil)]',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
      isActive
        ? inverse
          ? 'text-gold'
          : 'text-earth-red'
        : inverse
          ? 'text-cream/35 hover:text-cream/70'
          : 'text-ink/35 hover:text-ink/65',
    ].join(' ')
  }

  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      role="group"
      aria-label={t.ui.selectLanguage}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={buttonClass(lang === 'en')}
        aria-pressed={lang === 'en'}
        aria-label={t.ui.switchToEnglish}
      >
        En
      </button>
      <span
        className={`font-body text-[10px] ${inverse ? 'text-cream/18' : 'text-ink/18'}`}
        aria-hidden="true"
      >
        /
      </span>
      <button
        type="button"
        onClick={() => setLang('es')}
        className={buttonClass(lang === 'es')}
        aria-pressed={lang === 'es'}
        aria-label={t.ui.switchToSpanish}
      >
        Es
      </button>
    </div>
  )
}
