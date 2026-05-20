'use client'

import type { ReactNode } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

interface AboutPageHeroProps {
  title: string
  intro?: string
  heroImage?: string
  aside?: ReactNode
  asideLabel?: string
  asideBody?: string
  label?: string
  details?: string[]
  titleClassName?: string
}

function EditorialBar({
  brand,
  details,
}: {
  brand: string
  details: readonly string[]
}) {
  return (
    <div
      className="border-t border-cream-dark px-6 py-3 sm:px-10 lg:px-14"
      aria-label={brand}
    >
      <div className="flex items-center justify-between gap-6 overflow-hidden">
        <p className="type-kicker shrink-0 text-earth-red">{brand}</p>
        <ul className="flex items-center gap-5 overflow-hidden" aria-label="Page context">
          {details.map((point, index) => (
            <li
              key={point}
              className={[
                'flex shrink-0 items-center gap-5',
                index === 0 ? 'hidden sm:flex' : index === 1 ? 'hidden md:flex' : 'hidden lg:flex',
              ].join(' ')}
            >
              <span className="h-3 w-px shrink-0 bg-ink/20" aria-hidden="true" />
              <span className="type-kicker whitespace-nowrap text-ink/52">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function HeroTitleBlock({
  label,
  title,
  intro,
  titleClassName,
}: {
  label?: string
  title: string
  intro?: string
  titleClassName?: string
}) {
  return (
    <div>
      {label ? <p className="type-kicker mb-5 text-ink/55">{label}</p> : null}
      <h1
        className={
          titleClassName ??
          'type-display max-w-[20ch] text-[clamp(3rem,5.8vw,5.75rem)] text-ink'
        }
      >
        {title}
      </h1>
      {intro ? (
        <p className="type-intro mt-8 max-w-[54ch] text-[clamp(1.45rem,2.4vw,2.15rem)] leading-[1.28] text-ink/82">
          {intro}
        </p>
      ) : null}
    </div>
  )
}

function HeroImagePanel({ src }: { src: string }) {
  return (
    <div className="relative min-h-[320px] overflow-hidden lg:min-h-[560px]">
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}

export default function AboutPageHero({
  title,
  intro,
  heroImage,
  aside,
  asideLabel,
  asideBody,
  label,
  details,
  titleClassName,
}: AboutPageHeroProps) {
  const { t } = useLanguage()
  const brand = t.hero.eyebrow
  const editorialDetails = details ?? t.hero.proofPoints
  const hasStructuredAside = Boolean(asideLabel && asideBody)
  const hasRightColumn = Boolean(heroImage || aside || hasStructuredAside)
  const isTextAside = Boolean(!heroImage && (hasStructuredAside || aside))

  return (
    <section className="overflow-hidden bg-white">
      {hasRightColumn ? (
        <div className="grid grid-cols-1 bg-white lg:grid-cols-[0.52fr_1fr] lg:items-start">
          {isTextAside && hasStructuredAside ? (
            <>
              <div className="px-6 pb-8 pt-8 sm:px-10 lg:px-14 lg:pb-10 lg:pt-8">
                <HeroTitleBlock
                  label={label}
                  title={title}
                  intro={intro}
                  titleClassName={
                    titleClassName ??
                    'type-display text-[clamp(3rem,5.2vw,5.25rem)] text-ink'
                  }
                />
              </div>

              <div className="border-t border-cream-dark px-6 pb-8 pt-8 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:pb-10 lg:pt-8">
                <p className="type-kicker mb-4 text-earth-red">{asideLabel}</p>
                <p className="max-w-[48ch] font-accent text-[clamp(1.2rem,1.8vw,1.65rem)] leading-[1.38] tracking-[-0.02em] text-ink/88">
                  {asideBody}
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className={
                  isTextAside
                    ? 'px-6 pb-8 pt-8 sm:px-10 sm:pb-10 lg:px-14 lg:pb-10'
                    : 'flex min-h-[320px] flex-col justify-end px-6 pb-12 pt-6 sm:px-10 sm:pb-14 sm:pt-8 lg:min-h-[560px] lg:px-14 lg:pb-16 lg:pt-10'
                }
              >
                <HeroTitleBlock
                  label={label}
                  title={title}
                  intro={intro}
                  titleClassName={titleClassName}
                />
              </div>

              {heroImage ? (
                <HeroImagePanel src={heroImage} />
              ) : (
                <div className="border-t border-cream-dark px-6 pb-8 pt-8 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:pb-10">
                  {aside}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="bg-white px-6 pb-12 pt-6 sm:px-10 sm:pb-14 sm:pt-8 lg:px-14 lg:pb-16 lg:pt-10">
          <HeroTitleBlock label={label} title={title} intro={intro} titleClassName={titleClassName} />
        </div>
      )}

      <EditorialBar brand={brand} details={editorialDetails} />
    </section>
  )
}
