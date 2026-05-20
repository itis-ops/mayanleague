import type { ReactNode } from 'react'

type EditorialSectionBarVariant = 'light' | 'on-ink' | 'on-red'

interface EditorialSectionBarProps {
  label: string
  detail?: ReactNode
  variant?: EditorialSectionBarVariant
  className?: string
  hideDetailOnMobile?: boolean
}

const variantStyles: Record<
  EditorialSectionBarVariant,
  { bar: string; label: string; detail: string }
> = {
  light: {
    bar: 'border-cream-dark',
    label: 'text-ink/55',
    detail: 'text-ink/52',
  },
  'on-ink': {
    bar: 'border-cream/14',
    label: 'text-earth-red',
    detail: 'text-cream/52',
  },
  'on-red': {
    bar: 'border-white/20',
    label: 'text-white/70',
    detail: 'text-white/45',
  },
}

export default function EditorialSectionBar({
  label,
  detail,
  variant = 'light',
  className = '',
  hideDetailOnMobile = false,
}: EditorialSectionBarProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`mb-6 border-y py-3 ${styles.bar} ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className={`type-kicker ${styles.label}`}>{label}</p>
        {detail ? (
          <div
            className={`type-kicker sm:text-right ${styles.detail} ${
              hideDetailOnMobile ? 'hidden sm:block' : ''
            }`}
          >
            {detail}
          </div>
        ) : null}
      </div>
    </div>
  )
}
