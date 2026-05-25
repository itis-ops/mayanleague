import { collectionHeroContentClass } from '@/lib/editorialLayout'

interface CollectionStat {
  value: number | string
  label: string
}

interface CollectionHeroProps {
  title: string
  intro: string
  stats?: CollectionStat[]
  layout?: 'default' | 'compact'
  reveal?: boolean
  toolbar?: import('react').ReactNode
}

export default function CollectionHero({
  title,
  intro,
  stats = [],
  layout = 'default',
  reveal = false,
  toolbar,
}: CollectionHeroProps) {
  const hasStats = stats.length > 0
  const compact = layout === 'compact'
  const surfaceClass = compact ? 'bg-white' : 'bg-cream'
  const contentClass = reveal && compact ? 'about-hero-reveal' : undefined

  return (
    <section
      className={`grid grid-cols-1 border-b border-cream-dark ${surfaceClass} ${
        hasStats ? 'lg:grid-cols-[0.66fr_0.34fr]' : ''
      }`}
    >
      {compact ? (
        /* Compact: toolbar sits flush at the top (no padding above it),
           content area has its own padding below */
        <div className="flex flex-col">
          {toolbar}
          <div
            className={[collectionHeroContentClass, contentClass].filter(Boolean).join(' ')}
          >
            <h1 className="type-display max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] text-ink">
              {title}
            </h1>
            {intro ? (
              <p className="type-intro mt-4 max-w-[58ch] text-[clamp(1.2rem,2vw,1.7rem)] text-ink/72">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[320px] flex-col justify-end p-5 sm:p-10 lg:min-h-[480px] lg:p-14">
          {toolbar}
          <div className={contentClass}>
            <h1 className="type-display max-w-4xl text-[clamp(3rem,7vw,7rem)] text-ink">
              {title}
            </h1>
            {intro ? (
              <p className="type-intro mt-6 max-w-[58ch] text-[clamp(1.2rem,2vw,1.7rem)] text-ink/72">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      )}

      {hasStats ? (
        <div className="flex flex-row border-t border-cream-dark lg:flex-col lg:border-l lg:border-t-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col items-center justify-center gap-1 border-b border-cream-dark p-6 last:border-b-0 lg:items-start lg:p-10"
            >
              <p className="font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-none tracking-[-0.06em] text-earth-red">
                {stat.value}
              </p>
              <p className="type-kicker text-ink/50">{stat.label}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
