import CardIndexMark, { CardWesternIndex } from '@/components/ui/CardIndexMark'
import Button from '@/components/ui/Button'

interface Props {
  date: string
  title: string
  excerpt: string
  cta: string
  index: number
  href?: string
}

export default function NewsCard({ date, title, excerpt, cta, index, href = '/news' }: Props) {
  return (
    <article className="group motion-card h-full w-full min-w-0 overflow-hidden border border-cream-dark bg-white p-1.5 text-ink hover:bg-cream">
      <div className="flex h-full min-h-[330px] flex-col bg-white p-6 group-hover:bg-cream">
        <div className="flex-1">
          <div className="mb-5 flex items-start justify-between gap-3">
            <p className="min-w-0 type-kicker text-ink/55">{date}</p>
            <CardIndexMark value={index + 1} />
          </div>
          <h3 className="type-section mb-4 text-[clamp(1.32rem,1.65vw,1.6rem)] text-ink motion-link group-hover:text-earth-red lg:max-w-xl">
            {title}
          </h3>
          <p className="type-body border-t border-cream-dark pt-4 text-[1.05rem] leading-8 text-ink/74 line-clamp-4">
            {excerpt}
          </p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <Button
            href={href}
            variant="secondary"
            ariaLabel={`${cta}: ${title}`}
            className="w-fit max-w-full shrink-0 whitespace-nowrap"
          >
            {cta}
          </Button>
          <CardWesternIndex value={index + 1} />
        </div>
      </div>
    </article>
  )
}
