import AboutMemberPortrait from '@/components/about/AboutMemberPortrait'
import MayaNumber from '@/components/ui/MayaNumber'

interface AboutPersonRowProps {
  index: number
  name: string
  role: string
  image?: string
  body: readonly string[]
  layout?: 'default' | 'sticky'
  isLast?: boolean
  compact?: boolean
}

export default function AboutPersonRow({
  index,
  name,
  role,
  image,
  body,
  layout = 'default',
  isLast = false,
  compact = false,
}: AboutPersonRowProps) {
  const isSticky = layout === 'sticky'
  const sectionPadding = compact
    ? 'pb-9 pt-8 sm:pb-10 sm:pt-9 lg:pb-11 lg:pt-10'
    : 'pb-14 pt-12 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16'

  const article = (
    <article
      className={
        isSticky
          ? `relative sticky top-[72px] border-b border-cream-dark bg-white xl:top-[124px] ${sectionPadding}`
          : `relative scroll-mt-36 border-b border-cream-dark bg-white ${sectionPadding}`
      }
    >
      <div
        className={
          compact
            ? 'flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-10'
            : 'flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 lg:gap-12'
        }
      >
        <div
          className={
            compact
              ? 'w-full max-w-[10rem] shrink-0 sm:max-w-[11rem]'
              : 'w-full max-w-[11.5rem] shrink-0 sm:max-w-[12.5rem]'
          }
        >
          <AboutMemberPortrait name={name} role={role} image={image} />
        </div>

        <div className="min-w-0 flex-1 lg:max-w-[72ch]">
          <header className={compact ? 'mb-3' : 'mb-5'}>
            <h2
              className={
                compact
                  ? 'type-section max-w-[16ch] text-left text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[0.98] text-ink'
                  : 'type-section max-w-[16ch] text-left text-[clamp(2rem,4vw,3.1rem)] leading-[0.96] text-ink'
              }
            >
              {name}
            </h2>
            {role ? <p className={`type-kicker text-earth-red ${compact ? 'mt-2' : 'mt-3'}`}>{role}</p> : null}
          </header>

          <div className={compact ? 'space-y-4' : 'space-y-5'}>
            {body.map((paragraph) => (
              <p
                key={paragraph}
                className={
                  compact
                    ? 'type-body text-[1rem] leading-[1.68] text-ink/72'
                    : 'type-body text-[1.0625rem] leading-[1.72] text-ink/72'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <MayaNumber
        value={index + 1}
        className={
          compact
            ? 'pointer-events-none absolute bottom-4 right-4 origin-bottom-right scale-[0.68] text-earth-red/75 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6'
            : 'pointer-events-none absolute bottom-5 right-5 origin-bottom-right scale-75 text-earth-red/75 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8'
        }
      />
    </article>
  )

  if (!isSticky) {
    return article
  }

  return (
    <div className={isLast ? 'relative' : compact ? 'relative pb-[min(18vh,5rem)]' : 'relative pb-[min(28vh,10rem)]'}>
      {article}
    </div>
  )
}
