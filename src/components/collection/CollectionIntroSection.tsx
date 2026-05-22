import type { ReactNode } from 'react'

interface CollectionIntroSectionProps {
  kicker: string
  heading: string
  children: ReactNode
  action?: ReactNode
  layout?: 'default' | 'compact'
}

export default function CollectionIntroSection({
  kicker,
  heading,
  children,
  action,
  layout = 'default',
}: CollectionIntroSectionProps) {
  const compact = layout === 'compact'

  return (
    <section
      className={`grid grid-cols-1 gap-10 border-b border-cream-dark px-7 sm:px-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16 lg:px-14 ${
        compact ? 'py-8 lg:py-10' : 'py-12 lg:py-16'
      }`}
    >
      <div className="flex flex-col gap-8">
        <div>
          <p className="type-kicker mb-4 text-earth-red">{kicker}</p>
          <h2
            className={`type-section text-ink ${
              compact
                ? 'max-w-[16ch] text-[clamp(1.35rem,2.2vw,2.05rem)]'
                : 'max-w-[14ch] text-[clamp(1.5rem,2.4vw,2.25rem)]'
            }`}
          >
            {heading}
          </h2>
        </div>
        {action}
      </div>

      <div className="type-body max-w-[72ch] space-y-7 text-ink/72">{children}</div>
    </section>
  )
}
