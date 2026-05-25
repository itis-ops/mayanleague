import MayaNumber from '@/components/ui/MayaNumber'

interface CardIndexMarkProps {
  value: number
  variant?: 'sm' | 'lg'
  className?: string
}

interface CardWesternIndexProps {
  value: number
  className?: string
}

export function CardWesternIndex({ value, className = '' }: CardWesternIndexProps) {
  return (
    <p
      className={`type-kicker shrink-0 tabular-nums leading-none text-earth-red/48 ${className}`.trim()}
      aria-hidden="true"
    >
      {String(value).padStart(2, '0')}
    </p>
  )
}

export default function CardIndexMark({ value, variant = 'sm', className = '' }: CardIndexMarkProps) {
  const mayaSize = variant === 'lg' ? 'lg' : 'md'
  const mayaScale = variant === 'lg' ? 'scale-95' : 'scale-90'

  return (
    <div className={`shrink-0 text-earth-red ${className}`.trim()} aria-hidden="true">
      <MayaNumber value={value} size={mayaSize} className={`origin-top-right ${mayaScale}`} />
    </div>
  )
}
