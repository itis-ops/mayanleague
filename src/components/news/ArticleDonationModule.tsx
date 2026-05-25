import { hubArticleBleedClass, hubArticleBleedInnerClass } from '@/lib/editorialLayout'
import { DONATE_MONTHLY_URL, DONATE_URL } from '@/lib/siteLinks'
import Button from '@/components/ui/Button'
import { LocalizedText } from '@/components/news/LocalizedNewsText'

export default function ArticleDonationModule() {
  return (
    <section className={`${hubArticleBleedClass} bg-cream`} aria-label="Support our work">
      <div className={`${hubArticleBleedInnerClass} py-10 sm:py-12 lg:py-14`}>
        <div className="max-w-[680px]">
          <p className="type-kicker mb-5 text-earth-red">
            <LocalizedText en="Support the work" es="Apoya el trabajo" />
          </p>

          <h2 className="type-section text-[clamp(1.65rem,3.2vw,2.85rem)] leading-[0.96] text-ink">
            <LocalizedText
              en="Stories like this are why the International Mayan League exists."
              es="Historias como esta son la razón de ser de la Liga Maya Internacional."
            />
          </h2>

          <p className="type-body mt-5 max-w-[62ch] text-ink/74 sm:mt-6">
            <LocalizedText
              en="Your support helps Maya women, youth, Elders, and families defend Indigenous rights, language access, culture, and Mother Earth."
              es="Tu apoyo ayuda a mujeres, jóvenes, Ancianos y familias mayas a defender los derechos indígenas, el acceso al idioma, la cultura y la Madre Tierra."
            />
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Button href={DONATE_MONTHLY_URL} variant="primary" className="shrink-0">
              <LocalizedText en="Become a monthly donor" es="Dona mensualmente" />
            </Button>
            <Button href={DONATE_URL} variant="secondary" className="shrink-0">
              <LocalizedText en="Give once" es="Dona una vez" />
            </Button>
          </div>

          <p className="mt-5 font-body text-xs font-black uppercase tracking-[0.08em] text-ink/52 sm:mt-6">
            <LocalizedText
              en="Donations support the Indigenous Solidarity Fund."
              es="Las donaciones apoyan el Fondo de Solidaridad Indígena."
            />
          </p>
        </div>
      </div>
    </section>
  )
}
