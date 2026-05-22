import MayaNumber from '@/components/ui/MayaNumber'

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
      className="group flex min-h-72 flex-col border border-cream-dark bg-white p-7 transition-colors hover:border-earth-red/40 hover:bg-earth-red/4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="type-kicker rounded-full border border-cream-dark px-2.5 py-1 text-ink/45">{detail}</p>
      </div>
      <h2 className="type-section mb-6 text-[clamp(1.8rem,2.8vw,2.45rem)] text-ink">{title}</h2>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-cream-dark pt-5">
        <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
          <span className="font-body text-xs font-semibold uppercase tracking-wider">{cta}</span>
          <ArrowIcon />
        </div>
        <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-bottom-right text-earth-red" />
      </div>
    </a>
  )
}
