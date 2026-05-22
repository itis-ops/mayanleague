'use client'

import type { ReactNode } from 'react'
import AboutReveal, { AboutMotionStagger } from '@/components/about/AboutReveal'

interface AboutMotionArticleProps {
  hero: ReactNode
  intro?: ReactNode
  children: ReactNode
  /** When false, body content renders immediately (better for long people lists on mobile). */
  animateContent?: boolean
}

export default function AboutMotionArticle({
  hero,
  intro,
  children,
  animateContent = true,
}: AboutMotionArticleProps) {
  return (
    <>
      {hero}
      {intro ? (
        animateContent ? (
          <AboutReveal delay={100}>{intro}</AboutReveal>
        ) : (
          intro
        )
      ) : null}
      {animateContent ? (
        <AboutMotionStagger baseDelay={intro ? 160 : 120}>{children}</AboutMotionStagger>
      ) : (
        children
      )}
    </>
  )
}
