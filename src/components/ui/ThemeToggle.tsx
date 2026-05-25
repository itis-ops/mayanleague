'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import type { ThemePreference } from '@/lib/theme'

interface ThemeToggleProps {
  className?: string
}

const THEME_OPTIONS: ThemePreference[] = ['system', 'light', 'dark']

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()

  const labels: Record<ThemePreference, string> = {
    system: t.ui.themeAuto,
    light: t.ui.themeLight,
    dark: t.ui.themeDark,
  }

  const ariaLabels: Record<ThemePreference, string> = {
    system: t.ui.switchToAutoTheme,
    light: t.ui.switchToLightTheme,
    dark: t.ui.switchToDarkTheme,
  }

  const buttonClass = (isActive: boolean) =>
    `motion-control min-h-11 px-3 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold ${
      isActive
        ? 'bg-white text-earth-red'
        : 'text-white hover:bg-white/10 active:bg-white/15'
    }`

  return (
    <div
      className={`inline-grid grid-cols-3 items-center overflow-hidden rounded-full border border-white/20 text-xs font-bold ${className}`}
      role="group"
      aria-label={t.ui.selectTheme}
    >
      {THEME_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setTheme(option)}
          className={buttonClass(theme === option)}
          aria-pressed={theme === option}
          aria-label={ariaLabels[option]}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  )
}
