interface AboutQuoteFigureProps {
  label: string
  quote: string
  source: string
}

export default function AboutQuoteFigure({ label, quote, source }: AboutQuoteFigureProps) {
  return (
    <figure className="bg-ink px-6 py-14 text-cream sm:px-10 lg:px-14 lg:py-18">
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
