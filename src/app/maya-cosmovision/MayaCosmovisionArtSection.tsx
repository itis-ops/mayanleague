import MayaNumber from '@/components/ui/MayaNumber'
import LinkedMayaCosmovision from '@/components/ui/LinkedMayaCosmovision'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'

interface MayaCosmovisionArtSectionProps {
  id: string
  sectionLabel: string
  title: string
  deck: string
  philosophyBody: string[]
  artistLabel: string
  artistBody: string[]
}

const bodyClass = 'type-body text-[1.0625rem] leading-[1.75] text-ink/72'
const leadClass =
  'max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90'

export default function MayaCosmovisionArtSection({
  id,
  sectionLabel,
  title,
  deck,
  philosophyBody,
  artistLabel,
  artistBody,
}: MayaCosmovisionArtSectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-48 border-b border-cream-dark bg-white py-16 lg:scroll-mt-36 lg:py-20 xl:scroll-mt-44 ${collectionArticleSectionClass}`}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
        {/* Left rail — label only, matching all other sections */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <p className="type-kicker text-ink/55 lg:max-w-[12ch]">{sectionLabel}</p>
        </div>

        {/* Right content column */}
        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          <h2 className="type-section mb-8 max-w-[42ch] text-[clamp(2rem,4.5vw,3.6rem)] text-ink">
            {title}
          </h2>

          {/* Artwork — full-width feature image */}
          <div className="mb-10 overflow-hidden border border-cream-dark bg-cream">
            <div className="relative aspect-[16/10]">
              <img
                src="/site-images/maya-cosmovision-art.jpg"
                alt="Mayan League philosophy artwork by Jose Flores"
                className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8 lg:p-10"
              />
            </div>
          </div>

          {/* Lead deck + body */}
          <div className="max-w-[72ch] space-y-7 border-t border-cream-dark pt-8">
            <p className={leadClass}>{deck}</p>
            {philosophyBody.map((paragraph) => (
              <p key={paragraph} className={bodyClass}>
                <LinkedMayaCosmovision text={paragraph} />
              </p>
            ))}
          </div>

          {/* Artist bio — inset ruled block */}
          <div className="mt-12 border-t border-cream-dark pt-10">
            <p className="type-kicker mb-2 text-earth-red">{artistLabel}</p>
            <h3 className="type-section mb-8 max-w-[16ch] text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
              Jose Flores
            </h3>
            <div className="max-w-[72ch] space-y-7">
              {artistBody.map((paragraph) => (
                <p key={paragraph} className={bodyClass}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MayaNumber
        value={2}
        className="pointer-events-none absolute bottom-5 left-7 origin-bottom-left scale-75 text-earth-red/60 sm:bottom-6 sm:left-10 lg:bottom-8 lg:left-14"
      />
    </section>
  )
}
