'use client'

import type { FormEvent } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

const CONTACT_EMAIL = 'info@mayanleague.org'
const CONTACT_PHONE = '(202) 827-6673'
const CONTACT_PHONE_HREF = 'tel:+12028276673'
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=1201%20K%20ST%20NW%20Washington%2C%20D.C.%2020005'
const MAP_EMBED_URL = 'https://www.google.com/maps?q=1201%20K%20ST%20NW%20Washington%2C%20D.C.%2020005&output=embed'
const NEWSLETTER_IMAGE =
  'https://images.squarespace-cdn.com/content/v1/54ba9731e4b077c9026fbea0/1556915788615-JZ3CF571BHDL2U517DVC/Nojbelmayab%2Bcropped.jpg?format=2500w'

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
      <main id="main-content" className="bg-white pt-[72px] text-ink xl:pt-[124px]">
        <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:py-20">
          <div className="mb-8 flex items-center justify-between border-y border-cream-dark py-3">
            <p className="type-kicker text-earth-red">
              {t.contactPage.label}
            </p>
            <p className="type-kicker hidden text-ink/60 sm:block">
              {t.contactPage.sectionKicker}
            </p>
          </div>

          <div className="motion-reveal grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <section className="bg-ink p-8 text-white sm:p-10 lg:min-h-[560px] lg:p-12">
              <p className="type-kicker mb-8 text-cream">
                {t.contactPage.heroEyebrow}
              </p>
              <h1 className="type-display max-w-3xl text-[clamp(3.5rem,9vw,7.6rem)]">
                {t.contactPage.heroHeading}
              </h1>
              <p className="type-intro mt-10 max-w-xl text-2xl text-cream sm:text-3xl">
                {t.contactPage.heroBody}
              </p>
            </section>

            <section className="bg-cream p-8 sm:p-10 lg:p-12">
              <p className="type-kicker mb-5 text-earth-red">
                {t.contactPage.callLabel}
              </p>
              <h2 className="type-section mb-6 text-[clamp(2.5rem,5vw,4.4rem)]">
                {t.contactPage.callHeading}
              </h2>
              <p className="type-body mb-8 max-w-[60ch] text-ink/78">
                {t.contactPage.callBody}
              </p>

              <address className="mb-10 not-italic font-body text-base leading-7 text-ink">
                <p className="font-black">{t.contactPage.addressName}</p>
                <p>1201 K ST NW</p>
                <p>Washington, D.C. 20005</p>
              </address>

              <div className="flex flex-col gap-4 sm:flex-row">
                {contactMethods.map((method) => (
                  <Button key={method.label} href={method.href} variant="secondary" ariaLabel={`${method.label}: ${method.value}`}>
                    {method.value}
                  </Button>
                ))}
              </div>

              <div className="mt-10 border-t border-cream-dark pt-8" aria-label={t.contactPage.mapLabel}>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="type-kicker text-ink/60">
                    {t.contactPage.mapLabel}
                  </p>
                  <Button href={MAP_URL} variant="tertiary">
                    {t.contactPage.mapButton}
                  </Button>
                </div>
                <iframe
                  title={t.contactPage.mapTitle}
                  src={MAP_EMBED_URL}
                  className="h-[300px] w-full border-0 grayscale sm:h-[340px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          <section className="mt-8 grid grid-cols-1 gap-8 bg-cream p-8 sm:p-10 lg:grid-cols-[0.75fr_1fr] lg:p-12">
            <div>
              <img
                src={NEWSLETTER_IMAGE}
                alt={t.contactPage.newsletterAlt}
                className="mb-8 aspect-square w-full max-w-[260px] object-contain"
              />
              <p className="type-kicker mb-5 text-earth-red">
                {t.contactPage.newsletterLabel}
              </p>
              <h2 className="type-section mb-6 text-[clamp(2.6rem,5vw,4.8rem)]">
                {t.contactPage.newsletterHeading}
              </h2>
              <p className="type-body max-w-xl text-ink/78">
                {t.contactPage.newsletterBody}
              </p>
            </div>

            <form className="grid grid-cols-1 gap-4 self-start" aria-label={t.contactPage.newsletterHeading} onSubmit={handleNewsletterSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="font-body text-sm font-black uppercase tracking-[0.08em] text-ink">
                  {t.contactPage.firstName}
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    className="mt-2 min-h-12 w-full border-2 border-ink bg-white px-4 font-body text-base font-medium normal-case tracking-normal text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  />
                </label>
                <label className="font-body text-sm font-black uppercase tracking-[0.08em] text-ink">
                  {t.contactPage.lastName}
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    className="mt-2 min-h-12 w-full border-2 border-ink bg-white px-4 font-body text-base font-medium normal-case tracking-normal text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  />
                </label>
              </div>
              <label className="font-body text-sm font-black uppercase tracking-[0.08em] text-ink">
                {t.contactPage.emailAddress}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="mt-2 min-h-12 w-full border-2 border-ink bg-white px-4 font-body text-base font-medium normal-case tracking-normal text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                />
              </label>
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit">{t.contactPage.signUp}</Button>
                <p className="font-body text-sm font-semibold leading-6 text-ink/70">{t.contactPage.privacy}</p>
              </div>
            </form>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}
