interface Props {
  color?: string
  opacity?: number
  className?: string
  flip?: boolean
}

export default function SteppedFretDivider({
  color = '#c9a84c',
  opacity = 0.3,
  className = '',
  flip = false,
}: Props) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      aria-hidden="true"
      style={{ opacity, transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg viewBox="0 0 400 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stepped fret / grecas pattern */}
        <path
          d="M0 10 L10 10 L10 0 L20 0 L20 10 L30 10 L30 0 L40 0 L40 10
             L50 10 L50 0 L60 0 L60 10 L70 10 L70 0 L80 0 L80 10
             L90 10 L90 0 L100 0 L100 10 L110 10 L110 0 L120 0 L120 10
             L130 10 L130 0 L140 0 L140 10 L150 10 L150 0 L160 0 L160 10
             L170 10 L170 0 L180 0 L180 10 L190 10 L190 0 L200 0 L200 10
             L210 10 L210 0 L220 0 L220 10 L230 10 L230 0 L240 0 L240 10
             L250 10 L250 0 L260 0 L260 10 L270 10 L270 0 L280 0 L280 10
             L290 10 L290 0 L300 0 L300 10 L310 10 L310 0 L320 0 L320 10
             L330 10 L330 0 L340 0 L340 10 L350 10 L350 0 L360 0 L360 10
             L370 10 L370 0 L380 0 L380 10 L390 10 L390 0 L400 0 L400 10 L400 20 L0 20 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
