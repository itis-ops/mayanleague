'use client'

import type { FormEvent } from 'react'
import AboutMotionArticle from '@/components/about/AboutMotionArticle'
import AboutPageHero from '@/components/about/AboutPageHero'
import CollectionLanguageBar from '@/components/collection/CollectionLanguageBar'
import HeroLanguageToggle from '@/components/editorial/HeroLanguageToggle'
import { useLanguage } from '@/hooks/useLanguage'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import {
  aboutCollectionMainClass,
  aboutCollectionSectionClass,
  collectionArticleSectionClass,
} from '@/lib/editorialLayout'

import { CONTACT_EMAIL } from '@/lib/contact'

const CONTACT_PHONE = '(202) 827-6673'
const CONTACT_PHONE_HREF = 'tel:+12028276673'
const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=1201%20K%20ST%20NW%20Washington%2C%20D.C.%2020005'
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=1201%20K%20ST%20NW%20Washington%2C%20D.C.%2020005&output=embed'
const NEWSLETTER_IMAGE =
  'https://images.squarespace-cdn.com/content/v1/54ba9731e4b077c9026fbea0/1556915788615-JZ3CF571BHDL2U517DVC/Nojbelmayab%2Bcropped.jpg?format=2500w'

const leadClass =
  'max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90'
const bodyClass = 'type-body text-[1.0625rem] leading-[1.75] text-ink/72'
const formLabelClass = 'type-kicker text-ink/55'
const inputClass =
  'mt-2 min-h-12 w-full border border-cream-dark bg-white px-4 type-body text-[1rem] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth-red'

export default function ContactContent() {
  const { t } = useLanguage()
  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const contactMethods = [
    { label: t.contactPage.writeUs, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { label: t.contactPage.callUs, value: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
  ]

  return (
    <>
      <Navbar />
      <main id="main-content" className={aboutCollectionMainClass}>
        <section className={aboutCollectionSectionClass}>
          <article className="min-w-0 bg-white">
            <CollectionLanguageBar />
            <AboutMotionArticle
              hero={
                <>
                  <div
                    className={`mb-6 flex min-h-11 items-center justify-end lg:hidden ${collectionArticleSectionClass}`}
                  >
                    <HeroLanguageToggle />
                  </div>

                  <AboutPageHero
                    title={t.contactPage.heroHeading}
                    asideLabel={t.contactPage.heroEyebrow}
                    asideBody={t.contactPage.heroBody}
                  />
                </>
              }
            >
              <section
                id="call-or-visit"
                className={`scroll-mt-36 border-b border-cream-dark py-16 lg:py-24 ${collectionArticleSectionClass}`}
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
                  <p className="type-kicker text-ink/55 lg:col-span-3 lg:pt-1">
                    {t.contactPage.callLabel}
                  </p>

                  <div className="space-y-12 lg:col-span-8 lg:col-start-5">
                    <h2 className="type-section max-w-[42ch] text-[clamp(2rem,4.5vw,3.6rem)] text-ink">
                      {t.contactPage.callHeading}
                    </h2>

                    <p className={leadClass}>{t.contactPage.callBody}</p>

                    <address className="max-w-[56ch] not-italic">
                      <p className="type-kicker mb-3 text-ink/45">{t.contactPage.addressName}</p>
                      <p className={`${bodyClass} text-ink/82`}>1201 K ST NW</p>
                      <p className={bodyClass}>Washington, D.C. 20005</p>
                    </address>

                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                      {contactMethods.map((method) => (
                        <div key={method.label}>
                          <dt className="type-kicker text-ink/55">{method.label}</dt>
                          <dd className="mt-2">
                            <a
                              href={method.href}
                              className={`${bodyClass} text-ink underline decoration-cream-dark underline-offset-4 transition-colors hover:text-earth-red hover:decoration-earth-red`}
                            >
                              {method.value}
                            </a>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div
                      className="border-t border-cream-dark pt-10"
                      aria-label={t.contactPage.mapLabel}
                    >
                      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="type-kicker text-ink/55">{t.contactPage.mapLabel}</p>
                        <Button href={MAP_URL} variant="tertiary">
                          {t.contactPage.mapButton}
                        </Button>
                      </div>
                      <iframe
                        title={t.contactPage.mapTitle}
                        src={MAP_EMBED_URL}
                        className="h-[280px] w-full border-0 grayscale sm:h-[320px]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="newsletter"
                className={`scroll-mt-36 bg-mist py-16 lg:py-24 ${collectionArticleSectionClass}`}
              >
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-14">
                  <p className="type-kicker text-earth-red lg:col-span-3 lg:pt-1">
                    {t.contactPage.newsletterLabel}
                  </p>

                  <div className="grid grid-cols-1 gap-12 lg:col-span-8 lg:col-start-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
                    <div className="space-y-10">
                      <img
                        src={NEWSLETTER_IMAGE}
                        alt={t.contactPage.newsletterAlt}
                        className="aspect-square w-full max-w-[220px] object-contain"
                      />
                      <div className="space-y-8">
                        <h2 className="type-section max-w-[42ch] text-[clamp(2rem,4.5vw,3.6rem)] text-ink">
                          {t.contactPage.newsletterHeading}
                        </h2>
                        <p className={`max-w-[56ch] ${bodyClass}`}>{t.contactPage.newsletterBody}</p>
                      </div>
                    </div>

                    <form
                      className="grid grid-cols-1 gap-5 self-start lg:pt-1"
                      aria-label={t.contactPage.newsletterHeading}
                      onSubmit={handleNewsletterSubmit}
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <label className={formLabelClass}>
                          {t.contactPage.firstName}
                          <input
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            className={inputClass}
                          />
                        </label>
                        <label className={formLabelClass}>
                          {t.contactPage.lastName}
                          <input
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            className={inputClass}
                          />
                        </label>
                      </div>
                      <label className={formLabelClass}>
                        {t.contactPage.emailAddress}
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          className={inputClass}
                        />
                      </label>
                      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                        <Button type="submit">{t.contactPage.signUp}</Button>
                        <p className="type-kicker max-w-[40ch] text-ink/45">{t.contactPage.privacy}</p>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </AboutMotionArticle>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
