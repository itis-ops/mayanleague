import { DONATE_URL } from '@/lib/siteLinks'
import { LocalizedText } from '@/components/news/LocalizedNewsText'

export default function NewsroomDonationInterstitial() {
  return (
    <div className="border-y border-earth-red bg-earth-red px-7 py-12 text-white sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
      <div>
        <p className="type-kicker mb-4 text-white/85">
          <LocalizedText en="Independent journalism" es="Periodismo independiente" />
        </p>
        <h2 className="type-section max-w-[24ch] text-[clamp(1.75rem,2.8vw,2.65rem)] leading-[0.98] text-white">
          <LocalizedText
            en="Public witness needs public support."
            es="El testimonio público necesita apoyo público."
          />
        </h2>
        <p className="type-body mt-5 max-w-[58ch] text-white/85">
          <LocalizedText
            en="Help sustain Indigenous-led advocacy, language access, and community defense."
            es="Ayuda a sostener la defensa liderada por indígenas, el acceso al idioma y la protección comunitaria."
          />
        </p>
      </div>

      <div className="mt-8 lg:mt-0">
        <a
          href={DONATE_URL}
          className="motion-control inline-flex min-h-11 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-white px-6 py-3 font-body text-sm font-black uppercase leading-none tracking-[0.06em] text-earth-red shadow-[0_1px_0_rgba(36,36,36,0.12)] hover:border-cream hover:bg-cream hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <LocalizedText en="Give to hope" es="Da esperanza" />
        </a>
      </div>
    </div>
  )
}
