import CardIndexMark, { CardWesternIndex } from '@/components/ui/CardIndexMark'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface CollectionIndexCardProps {
  href: string
  title: string
  detail: string
  cta: string
  index: number
}

export default function CollectionIndexCard({ href, title, detail, cta, index }: CollectionIndexCardProps) {
  return (
    <a
      href={href}
      className="group flex min-h-72 min-w-0 flex-col overflow-hidden border border-cream-dark bg-white p-5 transition-colors hover:border-earth-red/40 hover:bg-earth-red/4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-7"
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <CardIndexMark value={index + 1} variant="lg" />
        <p className="type-kicker shrink-0 rounded-full border border-cream-dark px-2.5 py-1 text-ink/45">{detail}</p>
      </div>
      <h2 className="type-section mb-6 text-[clamp(1.8rem,2.8vw,2.45rem)] text-ink">{title}</h2>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-cream-dark pt-5">
        <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
          <span className="font-body text-xs font-semibold uppercase tracking-wider">{cta}</span>
          <ArrowIcon />
        </div>
        <CardWesternIndex value={index + 1} />
      </div>
    </a>
  )
}
