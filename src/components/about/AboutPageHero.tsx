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
  placement = 'top',
}: {
  brand: string
  details: readonly string[]
  placement?: 'top' | 'bottom'
}) {
  return (
    <div
      className={`px-6 py-3 sm:px-10 lg:px-14 ${
        placement === 'top' ? 'border-y border-cream-dark' : 'border-t border-cream-dark'
      }`}
      aria-label={brand}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="type-kicker text-earth-red">{brand}</p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
          {details.map((point, index) => (
            <li key={point} className="flex items-center gap-4">
              {index > 0 ? (
                <span className="hidden h-3 w-px shrink-0 bg-ink/20 sm:block" aria-hidden="true" />
              ) : null}
              <span className="type-kicker text-ink/52">{point}</span>
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
          'type-display max-w-3xl text-[clamp(3.2rem,9vw,7.5rem)] text-ink'
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
      <EditorialBar brand={brand} details={editorialDetails} placement="top" />

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
                    'type-display max-w-[8ch] text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.92] text-ink'
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
    </section>
  )
}
