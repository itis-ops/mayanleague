'use client'

import HeroLanguageAnchor from '@/components/editorial/HeroLanguageAnchor'

interface PageLanguageCornerProps {
  className?: string
}

export default function PageLanguageCorner({ className = 'mb-6' }: PageLanguageCornerProps) {
  return (
    <div className={`relative ${className}`}>
      <HeroLanguageAnchor />
    </div>
  )
}
