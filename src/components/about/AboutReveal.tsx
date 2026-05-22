'use client'

import { Children, type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react'

interface AboutRevealProps {
  children: ReactNode
  /** Stagger offset in ms (capped internally). */
  delay?: number
  className?: string
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function AboutReveal({ children, delay = 0, className = '' }: AboutRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`about-reveal ${visible ? 'about-reveal--visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${Math.min(delay, 280)}ms` }}
    >
      {children}
    </div>
  )
}

interface AboutMotionStaggerProps {
  children: ReactNode
  /** Base delay before the first child animates in. */
  baseDelay?: number
  /** Delay added per child. */
  step?: number
}

export function AboutMotionStagger({ children, baseDelay = 0, step = 64 }: AboutMotionStaggerProps) {
  const items = Children.toArray(children).filter(Boolean)

  return (
    <>
      {items.map((child, index) => (
        <AboutReveal
          key={(child as ReactElement).key ?? `about-reveal-${index}`}
          delay={baseDelay + index * step}
        >
          {child}
        </AboutReveal>
      ))}
    </>
  )
}
