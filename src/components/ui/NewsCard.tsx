import MayaNumber from '@/components/ui/MayaNumber'
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
    <article className="group motion-card w-full min-w-0 border border-cream-dark bg-white p-1.5 text-ink hover:bg-cream">
      <div className="flex h-full min-h-[330px] flex-col bg-white p-6 group-hover:bg-cream">
        <div className="flex-1">
          <div className="mb-5 flex items-center justify-between gap-6">
            <p className="type-kicker text-ink/55">{date}</p>
            <div className="text-right text-earth-red">
              <p className="font-display text-4xl font-bold leading-none tracking-[-0.06em]">
                {String(index + 1).padStart(2, '0')}
              </p>
            </div>
          </div>
          <h3 className="type-section mb-4 text-[clamp(1.32rem,1.65vw,1.6rem)] text-ink motion-link group-hover:text-earth-red lg:max-w-xl">
            {title}
          </h3>
          <p className="type-body border-t border-cream-dark pt-4 text-[1.05rem] leading-8 text-ink/74 line-clamp-4">
            {excerpt}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-6 pt-8">
          <Button
            href={href}
            variant="secondary"
            ariaLabel={`${cta}: ${title}`}
            className="w-fit shrink-0 whitespace-nowrap"
          >
            {cta}
          </Button>
          <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-bottom-right text-earth-red" />
        </div>
      </div>
    </article>
  )
}
