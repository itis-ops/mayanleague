interface AboutQuoteFigureProps {
  label: string
  quote: string
  source: string
}

export default function AboutQuoteFigure({ label, quote, source }: AboutQuoteFigureProps) {
  return (
    <figure className="-mx-4 bg-ink px-4 py-14 text-cream sm:-mx-8 sm:px-8 lg:py-18">
      <p className="type-kicker mb-8 text-earth-red">{label}</p>
      <blockquote>
        <p className="max-w-[48ch] font-accent text-[clamp(1.5rem,2.8vw,2.75rem)] leading-[1.35] text-cream">
          {quote}
        </p>
      </blockquote>
      <figcaption className="type-kicker mt-8 max-w-[40ch] text-cream/55">{source}</figcaption>
    </figure>
  )
}
