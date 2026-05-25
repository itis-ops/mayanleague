import type { ReactNode } from 'react'
import MayaNumber from '@/components/ui/MayaNumber'
import LinkedMayaCosmovision from '@/components/ui/LinkedMayaCosmovision'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'

type SectionVariant = 'white' | 'mist'
type SectionLayout = 'editorial' | 'path' | 'lead'

interface AboutEditorialSectionProps {
  index?: number
  railLabel?: string
  title?: string
  image?: string
  imageVariant?: 'avatar' | 'feature'
  children?: ReactNode
  body?: string[]
  variant?: SectionVariant
  leadFirstBody?: boolean
  layout?: SectionLayout
  wideTitle?: boolean
  id?: string
  className?: string
}

const bodyParagraphClass =
  'type-body text-[1.0625rem] leading-[1.75] text-ink/72'

const leadParagraphClass =
  'max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90'

export default function AboutEditorialSection({
  index,
  railLabel,
  title,
  image,
  imageVariant = 'avatar',
  children,
  body,
  variant = 'white',
  leadFirstBody = false,
  layout = 'editorial',
  wideTitle = false,
  id,
  className = '',
}: AboutEditorialSectionProps) {
  const bgClass = variant === 'mist' ? 'bg-mist' : 'bg-white'
  const heading = title || railLabel

  if (layout === 'lead') {
    return (
      <section
        id={id}
        className={`relative scroll-mt-36 xl:scroll-mt-44 border-b border-cream-dark py-16 lg:py-20 ${collectionArticleSectionClass} bg-white ${className}`}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-1">
            {railLabel ? (
              <p className="type-kicker mb-5 text-ink/55">{railLabel}</p>
            ) : null}
            {title ? (
              <h2 className="type-display max-w-[20ch] text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[0.93] text-ink">
                {title}
              </h2>
            ) : null}
          </div>
        </div>

        {body && body.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-x-14 border-t border-cream-dark pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-1">
              <p className={leadParagraphClass}>{body[0]}</p>
            </div>
            {body.length > 1 ? (
              <div className="mt-8 space-y-7 lg:col-span-7 lg:col-start-1 lg:mt-8">
                {body.slice(1).map((paragraph) => (
                  <p key={paragraph} className={bodyParagraphClass}>
                    <LinkedMayaCosmovision text={paragraph} />
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {children}

        {index !== undefined ? (
          <MayaNumber
            value={index}
            className="pointer-events-none absolute bottom-5 left-7 origin-bottom-left scale-75 text-earth-red/60 sm:bottom-6 sm:left-10 lg:bottom-8 lg:left-14"
          />
        ) : null}
      </section>
    )
  }

  if (layout === 'path') {
    return (
      <article
        id={id}
        className={`relative scroll-mt-36 xl:scroll-mt-44 border-b border-cream-dark pb-14 pt-12 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16 ${collectionArticleSectionClass} ${bgClass} ${className}`}
      >
        {heading ? (
          <header className="mb-8">
            <h2
              className={`type-section text-left text-[clamp(2rem,4vw,3.1rem)] leading-[0.96] text-ink ${
                wideTitle ? 'max-w-[42ch]' : 'max-w-[16ch]'
              }`}
            >
              {heading}
            </h2>
          </header>
        ) : null}

        {image ? (
          <div className="mb-10 overflow-hidden bg-ink">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="aspect-[16/10] w-full object-cover grayscale"
            />
          </div>
        ) : null}

        {body && body.length > 0 ? (
          <div className="max-w-[72ch] space-y-7">
            {body.map((paragraph, paragraphIndex) => {
              const isLead = leadFirstBody && paragraphIndex === 0

              return (
                <p key={paragraph} className={isLead ? leadParagraphClass : bodyParagraphClass}>
                  <LinkedMayaCosmovision text={paragraph} />
                </p>
              )
            })}
          </div>
        ) : null}

        {children}

        {index !== undefined ? (
          <MayaNumber
            value={index}
            className="pointer-events-none absolute bottom-5 left-7 origin-bottom-left scale-75 text-earth-red/60 sm:bottom-6 sm:left-10 lg:bottom-8 lg:left-14"
          />
        ) : null}
      </article>
    )
  }

  return (
    <section
      id={id}
      className={`relative scroll-mt-36 xl:scroll-mt-44 border-b border-cream-dark py-16 lg:py-20 ${collectionArticleSectionClass} ${bgClass} ${className}`}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
        <div className="flex flex-col gap-6 lg:col-span-3">
          {railLabel ? (
            <p className="type-kicker text-ink/55 lg:max-w-[12ch]">{railLabel}</p>
          ) : null}
        </div>

        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {image && imageVariant === 'feature' ? (
            <div className="mb-10 overflow-hidden bg-ink">
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="aspect-[16/10] w-full object-cover grayscale"
              />
            </div>
          ) : null}

          {title ? (
            <h2 className="type-section mb-8 max-w-[42ch] text-[clamp(2rem,4.5vw,3.6rem)] text-ink">
              {title}
            </h2>
          ) : null}

          {image && imageVariant === 'avatar' ? (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="mb-8 aspect-square w-28 rounded-full bg-cream object-cover p-2 grayscale"
            />
          ) : null}

          {body && body.length > 0 ? (
            <div className={`max-w-[72ch] space-y-7 ${title || image ? 'mt-8 border-t border-cream-dark pt-8' : ''}`}>
              {body.map((paragraph, paragraphIndex) => {
                const isLead = leadFirstBody && paragraphIndex === 0

                return (
                  <p key={paragraph} className={isLead ? leadParagraphClass : bodyParagraphClass}>
                    <LinkedMayaCosmovision text={paragraph} />
                  </p>
                )
              })}
            </div>
          ) : null}

          {children}
        </div>
      </div>

      {index !== undefined ? (
        <MayaNumber
          value={index}
          className="pointer-events-none absolute bottom-5 left-7 origin-bottom-left scale-75 text-earth-red/60 sm:bottom-6 sm:left-10 lg:bottom-8 lg:left-14"
        />
      ) : null}
    </section>
  )
}
