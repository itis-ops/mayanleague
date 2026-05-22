interface EditorialBrandBarProps {
  brand: string
  details: readonly string[]
  className?: string
  border?: 'top' | 'y'
}

export default function EditorialBrandBar({
  brand,
  details,
  className = '',
  border = 'top',
}: EditorialBrandBarProps) {
  const borderClass = border === 'y' ? 'border-y border-cream-dark' : 'border-t border-cream-dark'

  return (
    <div className={`${borderClass} py-3 ${className}`} aria-label={brand}>
      <div className="flex items-center justify-between gap-6 overflow-hidden">
        <p className="type-kicker shrink-0 text-earth-red">{brand}</p>
        <ul className="flex items-center gap-5 overflow-hidden" aria-label="Organization highlights">
          {details.map((point, index) => (
            <li
              key={point}
              className={[
                'flex shrink-0 items-center gap-5',
                index === 0 ? 'hidden sm:flex' : index === 1 ? 'hidden md:flex' : 'hidden lg:flex',
              ].join(' ')}
            >
              <span className="h-3 w-px shrink-0 bg-ink/20" aria-hidden="true" />
              <span className="type-kicker whitespace-nowrap text-ink/52">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
