'use client'

import { useEffect, useRef, useState } from 'react'
import { easeOutQuart } from '@/lib/motionEasing'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MissionStatProps {
  value: string
  label: string
}

function parseStatValue(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/)
  if (!match) {
    return { numeric: null as number | null, suffix: raw }
  }

  return {
    numeric: Number.parseInt(match[1], 10),
    suffix: match[2] ?? '',
  }
}

export default function MissionStat({ value, label }: MissionStatProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { numeric, suffix } = parseStatValue(value)
  const [displayValue, setDisplayValue] = useState<number | string>(numeric !== null ? 0 : value)

  useEffect(() => {
    if (numeric === null) {
      setDisplayValue(value)
      return
    }

    if (reduceMotion) {
      setDisplayValue(numeric)
      return
    }

    const node = ref.current
    if (!node) return

    let frame = 0
    let startTime = 0
    const duration = 1200
    const target = numeric

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        observer.disconnect()
        startTime = performance.now()

        function tick(now: number) {
          const elapsed = now - startTime
          const raw = easeOutQuart(Math.min(1, elapsed / duration))
          const next = Math.round(target * raw)
          setDisplayValue(next)

          if (elapsed < duration) {
            frame = window.requestAnimationFrame(tick)
            return
          }

          setDisplayValue(target)
        }

        frame = window.requestAnimationFrame(tick)
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [numeric, reduceMotion, value])

  const display = numeric !== null ? `${displayValue}${suffix}` : value

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center gap-2 px-3 py-7 text-center sm:py-8 lg:px-6 lg:py-8"
    >
      <p
        className="font-display text-[clamp(2rem,6vw,5.75rem)] font-black leading-none tracking-[-0.065em] text-earth-red tabular-nums"
        aria-hidden="true"
      >
        {display}
      </p>
      <p className="type-kicker max-w-[12ch] text-ink/72 lg:max-w-[15ch]">{label}</p>
      <span className="sr-only">
        {display} {label}
      </span>
    </div>
  )
}
