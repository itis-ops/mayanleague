'use client'

import { useId } from 'react'

interface Props {
  opacity?: number
  className?: string
}

export default function MayaPatternOverlay({ opacity = 0.12, className = '' }: Props) {
  const id = useId()
  const patternId = `maya-diamond-${id.replace(/:/g, '')}`

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <svg
        className="absolute inset-0 w-[calc(100%+120px)] h-[calc(100%+120px)] -top-[60px] -left-[60px]"
        style={{ animation: 'drift 60s linear infinite' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={patternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            {/* Diagonal diamond grid */}
            <rect x="20" y="0" width="8" height="8" transform="rotate(45 24 4)" fill="none" stroke="#00a878" strokeWidth="0.8" />
            {/* Small dot at intersections */}
            <circle cx="0" cy="0" r="1.5" fill="#00a878" />
            <circle cx="40" cy="0" r="1.5" fill="#00a878" />
            <circle cx="0" cy="40" r="1.5" fill="#00a878" />
            <circle cx="40" cy="40" r="1.5" fill="#00a878" />
            <circle cx="20" cy="20" r="1.5" fill="#00a878" />
            {/* Cross lines */}
            <line x1="0" y1="0" x2="40" y2="40" stroke="#00a878" strokeWidth="0.4" />
            <line x1="40" y1="0" x2="0" y2="40" stroke="#00a878" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity={opacity} />
      </svg>
    </div>
  )
}
