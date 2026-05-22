'use client'

import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'

interface HeroLanguageAnchorProps {
  className?: string
}

export default function HeroLanguageAnchor({ className = '' }: HeroLanguageAnchorProps) {
  return (
    <div className={`pointer-events-none absolute right-0 top-0 z-10 ${className}`}>
      <div className="pointer-events-auto">
        <HeroLanguageToggle />
      </div>
    </div>
  )
}
