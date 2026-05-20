'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'

const sectionsEn = [
  {
    label: '01',
    title: 'Science and spirituality',
    body: [
      'The Maya civilization is one of the oldest civilizations of Abya Yala having made significant contributions to the world in mathematics, science, astronomy, medicine, architecture, agriculture, and other fields of study.',
      'Our scientific contributions are rooted in spiritual elements because to us spirituality is in science and science is in spirituality. Cosmovision and spirituality are a simultaneous experience, acting at the same time, myth and history, death and resurrection.',
      'It is a process that allows us to experience life and to be a part of the whole. Our connection to the world and the cosmos are the basis of our action, of our thoughts, and our sentiments in life and of life.',
      'These expressions of science and spirituality can be found in our astronomy, mathematics, architecture, agricultural systems, medicine, and understanding of the cycles of time, the life of nature and humans, and the relationships between the movements of the stars, the sun, and the moon.',
    ],
  },
  {
    label: '02',
    title: 'Our philosophy of work expressed as art',
    body: [
      'Just as we are committed to creating a permanent link between our contemporary world and ancestral traditions, our work and vision also embody these principles. Our logo, reflects our philosophy in how we work, rendered in a beautiful artistic creation by Guatemalan self-taught artist, Jose Flores, and philosophical guidance from Mayan League Board Members, Tata Arturo and Nana Teresa.',
      'In the Center lies the Temple of the Jaguar in Tikal surrounded by the tree of life - the Ceiba, and the great elders, JunAjpu e IxbalamKej. The Temple represents the confederations that arose in Uxmal.',
      'This League was the union of the great nations Mayapan, Yaxchilan, and Chichen Itza as they came together to defend our lands and territories against the Tolteca Nation, just as our peoples continue to come together to defend our lands and territories today.',
      'The Cieba, tree of life, is the symbol of the universe and all the dimensions in our world. The great elders JunAjpu e IxbalamKej represent our peoples, lineage and life.',
    ],
  },
  {
    label: '03',
    title: 'The four energies',
    body: [
      'The Four Energies represented in the outer circle are our programmatic areas of work. No’j is the Ancestral Knowledge and Cosmovision which is the basis for our actions.',
      'Tz’I’ is our work for justice and human rights not only for indigenous peoples, but also for Mother Earth. Kawoq expresses our collective work as a family, communities, and nations defending our peoples and mother earth.',
      'E is the path we are creating for justice and dignity with our peoples. I’x in the Center is our work to defend mother earth, the rights of women, nature and all that is sacred and grounded in a matriarchal culture.',
    ],
  },
  {
    label: '04',
    title: 'The colors of the circle',
    body: [
      'The Colors of the circle represent the four directions, Red for East, Black for West, White for North, and Yellow for South.',
      'The blue above in the ceiba is for the rain and sky, at the center it represents waterfalls, on the level of the earth, the rivers and blood of Mother Earth, and below, cenotes.',
      'The Four colors of the corn represents the four nations, the diversity of all people on the earth, and the white bones represent the ancestors, that they are grounding us and always with us.',
    ],
  },
  {
    label: '05',
    title: 'Today',
    body: [
      'The current generation is working hard to keep all these values alive through workshops, conferences, seminars, Maya summits, ceremonies, and philosophical and scientific studies of the Mayan calendar and epigraphy.',
      'The new generation is receiving teachings from the elders to keep this great knowledge alive in order to transmit it to future generations for the benefit of our people and all of humanity.',
      'The Mayan League has been especially committed to passing historical knowledge to children and young people so that they understand their traditions and cultural heritage and take pride in their identity.',
      'Since the beginning of the Maya civilization, the duality of men and women has been an integral part of the social, spiritual, and political fabric of the culture.',
      'The Mayan League, with its sister organization, the Maya League Guatemala, provides a platform to study the philosophic, scientific, and spiritual contribution of the Mayan civilization while creating awareness of the oppression that the Maya have endured since 1524.',
      'The Mayan League works to recover and preserve ancestral knowledge and values so that the Maya, particularly the Maya living outside of the traditional Maya territory, can be dynamic conservers of their own culture, history, and traditions.',
    ],
  },
]

const sectionsEs = [
  {
    label: '01',
    title: 'Ciencia y espiritualidad',
    body: [
      'La civilización Maya es una de las civilizaciones más antiguas de Abya Yala y ha hecho contribuciones significativas al mundo en matemáticas, ciencia, astronomía, medicina, arquitectura, agricultura y otros campos.',
      'Nuestras contribuciones científicas están arraigadas en elementos espirituales porque para nosotros la espiritualidad está en la ciencia y la ciencia está en la espiritualidad.',
      'Es un proceso que nos permite experimentar la vida y ser parte de un todo. Nuestra conexión con el mundo y el cosmos es la base de nuestras acciones, pensamientos y sentimientos en la vida y de la vida.',
      'Estas expresiones de ciencia y espiritualidad se encuentran en nuestra astronomía, matemáticas, arquitectura, sistemas agrícolas, medicina y comprensión de los ciclos del tiempo.',
    ],
  },
  {
    label: '02',
    title: 'Nuestra filosofía de trabajo expresada como arte',
    body: [
      'Así como estamos comprometidos a crear un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales, nuestro trabajo y visión también encarnan estos principios.',
      'En el centro se encuentra el Templo del Jaguar en Tikal rodeado por el árbol de la vida, la Ceiba, y por los grandes ancestros JunAjpu e IxbalamKej.',
      'Esta Liga fue la unión de las grandes naciones Mayapan, Yaxchilan y Chichen Itza, así como nuestros pueblos continúan uniéndose para defender nuestras tierras y territorios.',
      'La Ceiba, árbol de la vida, es símbolo del universo y de todas las dimensiones de nuestro mundo.',
    ],
  },
  {
    label: '03',
    title: 'Las cuatro energías',
    body: [
      'Las Cuatro Energías representadas en el círculo exterior son nuestras áreas programáticas de trabajo. No’j es el conocimiento ancestral y la cosmovisión que guía nuestras acciones.',
      'Tz’I’ representa nuestro trabajo por la justicia y los derechos humanos; Kawoq expresa el trabajo colectivo como familia, comunidades y naciones; E es el camino hacia la justicia y la dignidad.',
      'I’x en el centro es nuestro trabajo para defender a la Madre Tierra, los derechos de las mujeres, la naturaleza y todo lo sagrado.',
    ],
  },
  {
    label: '04',
    title: 'Los colores del círculo',
    body: [
      'Los colores del círculo representan las cuatro direcciones: rojo para el oriente, negro para el occidente, blanco para el norte y amarillo para el sur.',
      'El azul en la Ceiba representa la lluvia y el cielo; en el centro representa cascadas; sobre la tierra, los ríos y la sangre de la Madre Tierra; y abajo, los cenotes.',
      'Los cuatro colores del maíz representan las cuatro naciones, la diversidad de todos los pueblos de la tierra y los huesos blancos representan a los ancestros.',
    ],
  },
  {
    label: '05',
    title: 'Hoy',
    body: [
      'La generación actual trabaja arduamente para mantener vivos estos valores mediante talleres, conferencias, seminarios, encuentros Mayas, ceremonias y estudios filosóficos y científicos.',
      'La nueva generación recibe enseñanzas de las y los mayores para mantener vivo este gran conocimiento y transmitirlo a futuras generaciones.',
      'La Liga Maya trabaja para recuperar y preservar conocimientos y valores ancestrales para que el Pueblo Maya pueda conservar dinámicamente su cultura, historia y tradiciones.',
    ],
  },
]

const energies = ['No’j', 'Tz’I’', 'Kawoq', 'E', 'I’x']
const contributionsEn = ['Mathematics', 'Science', 'Astronomy', 'Medicine', 'Architecture', 'Agriculture']
const contributionsEs = ['Matemáticas', 'Ciencia', 'Astronomía', 'Medicina', 'Arquitectura', 'Agricultura']
const directionsEn = [
  { name: 'East', color: 'Red' },
  { name: 'West', color: 'Black' },
  { name: 'North', color: 'White' },
  { name: 'South', color: 'Yellow' },
]
const directionsEs = [
  { name: 'Oriente', color: 'Rojo' },
  { name: 'Occidente', color: 'Negro' },
  { name: 'Norte', color: 'Blanco' },
  { name: 'Sur', color: 'Amarillo' },
]

export default function MayaCosmovisionContent() {
  const { lang } = useLanguage()
  const sections = lang === 'es' ? sectionsEs : sectionsEn
  const contributions = lang === 'es' ? contributionsEs : contributionsEn
  const directions = lang === 'es' ? directionsEs : directionsEn
  const copy = lang === 'es'
    ? {
        program: 'Programa',
        title: 'Cosmovisión Maya',
        elder: 'Ancestro Maya',
        quote: '“Nuestra conexión con el mundo y el cosmos es la base de nuestras acciones, pensamientos y sentimientos en la vida y de la vida.”',
        readArtwork: 'Leer la obra',
        sectionsLabel: 'Secciones de la página de Cosmovisión Maya',
        artKicker: 'Nuestra filosofía de trabajo expresada como arte',
        artHeading: 'Un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales.',
        artBody: [
          'Nuestro trabajo y visión también encarnan estos principios. Nuestro logo refleja nuestra filosofía de trabajo, representada en una creación artística de Jose Flores.',
          'En el centro se encuentra el Templo del Jaguar en Tikal rodeado por el árbol de la vida, la Ceiba, y por los grandes ancestros JunAjpu e IxbalamKej.',
        ],
        index: 'Índice',
        artistLabel: 'Sobre el artista',
        artistBody: [
          'Jose Flores es un artista guatemalteco autodidacta radicado en Nueva York cuyo corazón y espíritu permanecen arraigados en su lugar de nacimiento, GuateMaya, el corazón del Pueblo Maya.',
          'Las tradiciones antiguas de su tierra natal son la fuente de inspiración de su obra. Rinde homenaje a su pueblo y ancestros capturando su carácter sagrado con retratos poderosos y oníricos.',
          'A través de su arte, Jose revive su herencia e identidad indígena dentro de una resistencia de más de 500 años.',
        ],
      }
    : {
        program: 'Program',
        title: 'Maya Cosmovision',
        elder: 'Maya Elder',
        quote: '“Our connection to the world and the cosmos are the basis of our action, of our thoughts, and our sentiments in life and of life.”',
        readArtwork: 'Read the artwork',
        sectionsLabel: 'Maya Cosmovision page sections',
        artKicker: 'Our philosophy of work expressed as art',
        artHeading: 'A permanent link between our contemporary world and ancestral traditions.',
        artBody: [
          'Our work and vision also embody these principles. Our logo, reflects our philosophy in how we work, rendered in a beautiful artistic creation by Guatemalan self-taught artist, Jose Flores, and philosophical guidance from Mayan League Board Members, Tata Arturo and Nana Teresa.',
          'In the Center lies the Temple of the Jaguar in Tikal surrounded by the tree of life - the Ceiba, and the great elders, JunAjpu e IxbalamKej.',
        ],
        index: 'Index',
        artistLabel: 'About the artist',
        artistBody: [
          'Jose Flores is a self-taught Guatemalan artist based out of New York whose heart and spirit remain rooted in his place of birth, GuateMaya, the heartland of the Maya.',
          'His homeland’s long and ancient traditions of the Maya is where he draws his inspiration for his work. He pays homage to his people and ancestors by capturing their sacredness with powerful, dream-like portraits.',
          'Rich and lively earth tone colors of blue and green splash behind colors of brown skin to capture the special relationship between indigenous peoples and Mother Earth. Through his art, Jose revives his indigenous heritage and identity that has long been in a 500-year battle of resistance.',
        ],
      }

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-ink pt-[72px] text-cream xl:pt-[124px]">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src="/site-images/maya-cosmovision-hero.jpg"
              alt=""
              className="h-full w-full scale-105 object-cover opacity-[0.45] grayscale"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(221,177,85,0.18),transparent_28%),linear-gradient(90deg,rgba(20,19,17,0.98)_0%,rgba(20,19,17,0.78)_48%,rgba(20,19,17,0.48)_100%)]" />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100vh-124px)] max-w-[1728px] grid-cols-1 px-5 py-8 sm:px-8 lg:grid-cols-[0.12fr_0.56fr_0.32fr] lg:px-12 lg:py-12">
            <aside className="hidden border-r border-white/14 pr-7 lg:flex lg:flex-col lg:justify-between">
              <p className="[writing-mode:vertical-rl] rotate-180 font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.26em] text-cream/48">
                {copy.title}
              </p>
              <MayaNumber value={1} className="scale-125 origin-bottom-left text-gold" />
            </aside>

            <div className="flex flex-col justify-between border-white/14 lg:border-r lg:px-12">
              <div className="flex items-center justify-between border-y border-white/16 py-3">
                <p className="font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-gold">
                  {copy.program}
                </p>
                <p className="font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-cream/52">
                  Abya Yala
                </p>
              </div>

              <div className="py-14 lg:py-20">
                <h1 className="max-w-6xl font-display text-[clamp(4.8rem,14vw,15.5rem)] font-bold uppercase leading-[0.72] tracking-[-0.095em] text-cream">
                  {copy.title}
                </h1>
                <figure className="mt-10 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[0.22fr_0.78fr]">
                  <figcaption className="font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-gold">
                    {copy.elder}
                  </figcaption>
                  <blockquote>
                    <p className="font-accent text-[clamp(1.65rem,3vw,3.2rem)] font-black leading-[1.04] tracking-[-0.04em] text-cream">
                      {copy.quote}
                    </p>
                  </blockquote>
                </figure>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-white/16 pt-6 sm:grid-cols-[auto_1fr] sm:items-center">
                <Button href="#cosmovision-art" variant="secondary" className="border-cream bg-cream text-ink hover:border-gold hover:bg-gold hover:text-ink">
                  {copy.readArtwork}
                </Button>
                <nav aria-label={copy.sectionsLabel} className="flex flex-wrap gap-x-5 gap-y-3 sm:justify-end">
                  {sections.map((section, index) => (
                    <a
                      key={section.title}
                      href={`#cosmovision-${index + 1}`}
                      className="motion-link min-h-11 rounded-sm font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-cream/68 underline-offset-4 hover:text-gold hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 border border-white/14 bg-ink/70 backdrop-blur-sm lg:ml-8 lg:mt-0 lg:self-end">
              {contributions.map((item) => (
                <div key={item} className="border-b border-r border-white/14 p-4 last:border-r-0 odd:last:border-b-0 sm:p-5">
                  <p className="font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.16em] text-cream/64">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cosmovision-art" className="bg-cream px-5 py-5 text-ink sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto grid max-w-[1728px] grid-cols-1 bg-white lg:grid-cols-[0.56fr_0.44fr]">
            <div className="group relative min-h-[620px] overflow-hidden bg-ink p-6 sm:p-10 lg:min-h-[880px] lg:p-14">
              <div className="absolute inset-6 border border-white/12 sm:inset-10 lg:inset-14" aria-hidden="true" />
              <img
                src="/site-images/maya-cosmovision-art.jpg"
                alt="Mayan League philosophy artwork by Jose Flores"
                className="relative h-full w-full object-contain transition duration-700 ease-out group-hover:scale-[1.018]"
              />
            </div>

            <div className="flex flex-col justify-between px-7 py-10 sm:px-10 lg:px-14 lg:py-14">
              <div>
                <div className="mb-10 flex items-center justify-between border-y border-cream-dark py-3">
                  <p className="font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-earth-red">
                    {copy.artKicker}
                  </p>
                  <MayaNumber value={2} className="scale-90 origin-right text-earth-red" />
                </div>

                <h2 className="font-display text-[clamp(3.6rem,8vw,8.8rem)] font-bold uppercase leading-[0.78] tracking-[-0.085em] text-ink">
                  {copy.artHeading}
                </h2>
              </div>

              <div className="mt-12 grid grid-cols-1 border-t border-cream-dark pt-8 lg:grid-cols-[0.42fr_0.58fr]">
                <div className="mb-8 grid grid-cols-5 gap-2 lg:mb-0 lg:grid-cols-1">
                  {energies.map((energy) => (
                    <a
                      key={energy}
                      href="#cosmovision-3"
                      className="motion-control flex aspect-square items-center justify-center bg-cream font-display text-2xl font-bold leading-none tracking-[-0.04em] text-ink hover:bg-ink hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold lg:aspect-auto lg:min-h-16"
                    >
                      {energy}
                    </a>
                  ))}
                </div>
                <div className="space-y-7 font-body text-lg leading-8 text-ink/74 lg:border-l lg:border-cream-dark lg:pl-10">
                  {copy.artBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cosmovision-sections" className="bg-mist px-5 py-5 text-ink sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto grid max-w-[1728px] grid-cols-1 gap-5 lg:grid-cols-[0.22fr_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-36 border-y border-cream-dark py-6">
                <p className="mb-6 font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-earth-red">
                  {copy.index}
                </p>
                <nav className="flex flex-col gap-1" aria-label={copy.sectionsLabel}>
                  {sections.map((section, index) => (
                    <a
                      key={section.title}
                      href={`#cosmovision-${index + 1}`}
                      className="motion-link grid min-h-10 grid-cols-[2.5rem_1fr] items-center border-b border-transparent py-2 font-body text-sm font-semibold leading-5 text-ink/58 hover:border-cream-dark hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <span>{section.label}</span>
                      <span>{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="bg-white">
              {sections.map((section, index) => {
                const isDark = index === 2

                return (
                  <article
                    id={`cosmovision-${index + 1}`}
                    key={section.title}
                    className={`grid grid-cols-1 border-b px-7 py-14 sm:px-10 lg:grid-cols-[0.28fr_0.72fr] lg:px-14 lg:py-20 ${
                      isDark ? 'border-ink bg-ink text-cream' : 'border-cream-dark bg-white text-ink'
                    }`}
                  >
                    <header className="flex min-h-72 flex-col pr-0 lg:pr-12">
                      <p className={`mb-8 font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] ${isDark ? 'text-gold' : 'text-earth-red'}`}>
                        {section.label}
                      </p>
                      <h2 className="font-display text-[clamp(3rem,6.4vw,7.4rem)] font-bold uppercase leading-[0.78] tracking-[-0.08em]">
                        {section.title}
                      </h2>
                      <div className="mt-auto hidden justify-end pt-12 lg:flex">
                        <MayaNumber
                          value={index + 1}
                          className={`shrink-0 scale-150 origin-bottom-right ${isDark ? 'text-gold' : 'text-earth-red/82'}`}
                        />
                      </div>
                    </header>

                    <div className={`mt-10 max-w-[82ch] border-t pt-8 font-body text-lg leading-9 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 ${
                      isDark ? 'border-white/18 text-cream/76' : 'border-cream-dark text-ink/74'
                    }`}>
                      <div className="space-y-8">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {index === 3 ? (
                        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {directions.map((direction) => (
                            <div key={direction.name} className="border border-cream-dark bg-cream p-4">
                              <p className="font-body text-[0.68rem] font-black uppercase leading-none tracking-[0.18em] text-earth-red">
                                {direction.name}
                              </p>
                              <p className="mt-4 font-display text-3xl font-bold uppercase leading-none tracking-[-0.05em] text-ink">
                                {direction.color}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-12 flex justify-end lg:hidden">
                        <MayaNumber
                          value={index + 1}
                          className={`shrink-0 scale-125 origin-bottom-right ${isDark ? 'text-gold' : 'text-earth-red/82'}`}
                        />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-earth-red px-5 py-5 text-white sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto grid max-w-[1728px] grid-cols-1 bg-earth-red lg:grid-cols-[0.34fr_0.66fr]">
            <div className="border-b border-white/18 px-7 py-12 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-16">
              <p className="mb-8 w-fit border-y border-white/18 py-3 font-body text-[0.72rem] font-black uppercase leading-none tracking-[0.18em] text-white">
                {copy.artistLabel}
              </p>
              <h2 className="font-display text-[clamp(3.6rem,8vw,8rem)] font-bold uppercase leading-[0.8] tracking-[-0.08em] text-white">
                Jose Flores
              </h2>
            </div>
            <div className="px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="max-w-[88ch] columns-1 gap-12 space-y-7 font-body text-lg leading-9 text-white md:columns-2">
                {copy.artistBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
