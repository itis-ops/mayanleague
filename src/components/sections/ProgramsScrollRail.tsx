'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ProgramCard from '@/components/ui/ProgramCard'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { clamp01 } from '@/lib/motionEasing'

interface ProgramItem {
  name: string
  description: string
}

interface ProgramsScrollRailProps {
  items: ReadonlyArray<ProgramItem>
  learnMore: string
  hrefs: ReadonlyArray<string>
  heading: string
  intro: string
}

export default function ProgramsScrollRail({
  items,
  learnMore,
  hrefs,
  heading,
  intro,
}: ProgramsScrollRailProps) {
  const reduceMotion = useReducedMotion()
  const shellRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const [travel, setTravel] = useState(0)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    function measure() {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container) return
      setTravel(Math.max(0, track.scrollWidth - container.clientWidth))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [items])

  useEffect(() => {
    if (reduceMotion) {
      setProgress(0)
      return
    }

    function update() {
      const shell = shellRef.current
      if (!shell) return

      const start = shell.offsetTop
      const end = start + shell.offsetHeight - window.innerHeight
      const next = end <= start ? 0 : clamp01((window.scrollY - start) / (end - start))
      setProgress(next)
      frameRef.current = null
    }

    function schedule() {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [reduceMotion, travel])

  const activeIndex =
    items.length <= 1 ? 0 : Math.min(items.length - 1, Math.round(progress * (items.length - 1)))
  const shift = progress * travel

  if (reduceMotion) {
    return (
      <>
        <div className="mb-5 grid grid-cols-1 items-end gap-5 border-b border-cream-dark pb-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <h2 className="type-section max-w-5xl text-[clamp(2.2rem,4.8vw,4.5rem)] text-ink">{heading}</h2>
          <p className="max-w-[62ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72">{intro}</p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {items.map((program, index) => (
            <ProgramCard
              key={program.name}
              name={program.name}
              description={program.description}
              learnMore={learnMore}
              index={index}
              href={hrefs[index] || '/programs'}
              layout="rail"
              surface="cream"
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <div
      ref={shellRef}
      className="relative"
      style={{ height: travel > 0 ? `calc(52svh + ${Math.round(travel * 0.82)}px)` : undefined }}
    >
      <div
        ref={containerRef}
        className="sticky top-[72px] flex max-h-[calc(100svh-72px)] flex-col gap-4 overflow-hidden pb-2 xl:top-[124px] xl:max-h-[calc(100svh-124px)]"
      >
        <div className="shrink-0 grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-end gap-8 border-b border-cream-dark pb-4">
          <h2 className="type-section max-w-4xl text-[clamp(2rem,3.8vw,4rem)] leading-[0.95] text-ink">
            {heading}
          </h2>
          <p className="max-w-[52ch] type-body text-[1rem] leading-[1.65] text-ink/72">{intro}</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform"
            style={{ transform: `translate3d(${-shift}px, 0, 0)` }}
          >
            {items.map((program, index) => (
              <div
                key={program.name}
                className={[
                  'w-[clamp(280px,26vw,340px)] shrink-0 transition-[opacity,transform] duration-[420ms] ease-[var(--ease-emil)]',
                  index === activeIndex ? 'opacity-100' : 'opacity-[0.86]',
                ].join(' ')}
              >
                <ProgramCard
                  name={program.name}
                  description={program.description}
                  learnMore={learnMore}
                  index={index}
                  href={hrefs[index] || '/programs'}
                  isActive={index === activeIndex}
                  layout="rail"
                  surface="cream"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
