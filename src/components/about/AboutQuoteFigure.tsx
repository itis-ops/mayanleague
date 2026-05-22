import { collectionArticleSectionClass } from '@/lib/editorialLayout'

interface AboutQuoteFigureProps {
  label: string
  quote: string
  source: string
}

export default function AboutQuoteFigure({ label, quote, source }: AboutQuoteFigureProps) {
  return (
    <figure className="border-t border-cream-dark bg-white py-14 lg:py-16">
      <div
        className={`grid grid-cols-1 gap-8 lg:grid-cols-[0.32fr_1fr] lg:gap-16 ${collectionArticleSectionClass}`}
      >
        <p className="type-kicker text-earth-red">{label}</p>
        <div>
          <blockquote>
            <p className="max-w-[48ch] font-accent text-[clamp(1.5rem,2.8vw,2.75rem)] leading-[1.35] text-ink">
              {quote}
            </p>
          </blockquote>
          <figcaption className="type-kicker mt-8 max-w-[40ch] text-ink/45">{source}</figcaption>
        </div>
      </div>
    </figure>
  )
}
