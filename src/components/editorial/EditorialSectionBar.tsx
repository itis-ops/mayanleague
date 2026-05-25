'use client'

import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
  { line: string; label: string; detail: string }
> = {
  light: {
    line: 'bg-cream-dark',
    label: 'text-ink/55',
    detail: 'text-ink/52',
  },
  'on-ink': {
    line: 'bg-cream/14',
    label: 'text-earth-red',
    detail: 'text-cream/52',
  },
  'on-red': {
    line: 'bg-white/20',
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
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const styles = variantStyles[variant]

  useLayoutEffect(() => {
    if (reduceMotion) {
      setVisible(true)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.55, rootMargin: '0px 0px -4% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <div
      ref={ref}
      className={[
        'editorial-section-bar relative mb-6 py-3',
        visible ? 'editorial-section-bar--visible' : '',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={`editorial-section-bar__line editorial-section-bar__line--top ${styles.line}`}
      />
      <span
        aria-hidden="true"
        className={`editorial-section-bar__line editorial-section-bar__line--bottom ${styles.line}`}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className={`editorial-section-bar__label type-kicker ${styles.label}`}>{label}</p>
        {detail ? (
          <div
            className={`editorial-section-bar__detail type-kicker sm:text-right ${styles.detail} ${
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
