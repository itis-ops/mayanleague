import MayaNumber from '@/components/ui/MayaNumber'

interface SectionNumberMarkProps {
  label: string
  value: number
  className?: string
  tone?: 'default' | 'inverse'
}

export default function SectionNumberMark({
  label,
  value,
  className = '',
  tone = 'default',
}: SectionNumberMarkProps) {
  const labelClass = tone === 'inverse' ? 'text-white/70' : 'text-ink/55'
  const glyphClass = tone === 'inverse' ? 'text-white/75' : 'text-earth-red/75'

  return (
    <div className={`inline-flex items-end gap-3 ${className}`} aria-hidden="true">
      <span className={`type-kicker tabular-nums leading-none ${labelClass}`}>{label}</span>
      <MayaNumber value={value} className={`shrink-0 origin-bottom-left scale-75 ${glyphClass}`} />
    </div>
  )
}
