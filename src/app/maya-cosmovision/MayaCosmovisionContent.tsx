'use client'

import AboutEditorialSection from '@/components/about/AboutEditorialSection'
import CollectionShell from '@/components/collection/CollectionShell'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProgramPageHero from '@/components/programs/ProgramPageHero'
import ProgramSectionNav from '@/components/programs/ProgramSectionNav'
import MayaCosmovisionArtSection from '@/app/maya-cosmovision/MayaCosmovisionArtSection'
import MayaDirectionGrid from '@/app/maya-cosmovision/MayaDirectionGrid'
import { useLanguage } from '@/hooks/useLanguage'
import { collectionArticleSectionClass } from '@/lib/editorialLayout'
import { getProgramPage, localizedProgramNavLinks } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

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
    title: 'The colors of the circle',
    body: [
      'The Colors of the circle represent the four directions, Red for East, Black for West, White for North, and Yellow for South.',
      'The blue above in the ceiba is for the rain and sky, at the center it represents waterfalls, on the level of the earth, the rivers and blood of Mother Earth, and below, cenotes.',
      'The Four colors of the corn represents the four nations, the diversity of all people on the earth, and the white bones represent the ancestors, that they are grounding us and always with us.',
    ],
  },
  {
    label: '04',
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
    title: 'Los colores del círculo',
    body: [
      'Los colores del círculo representan las cuatro direcciones: rojo para el oriente, negro para el occidente, blanco para el norte y amarillo para el sur.',
      'El azul en la Ceiba representa la lluvia y el cielo; en el centro representa cascadas; sobre la tierra, los ríos y la sangre de la Madre Tierra; y abajo, los cenotes.',
      'Los cuatro colores del maíz representan las cuatro naciones, la diversidad de todos los pueblos de la tierra y los huesos blancos representan a los ancestros.',
    ],
  },
  {
    label: '04',
    title: 'Hoy',
    body: [
      'La generación actual trabaja arduamente para mantener vivos estos valores mediante talleres, conferencias, seminarios, encuentros Mayas, ceremonias y estudios filosóficos y científicos.',
      'La nueva generación recibe enseñanzas de las y los mayores para mantener vivo este gran conocimiento y transmitirlo a futuras generaciones.',
      'La Liga Maya trabaja para recuperar y preservar conocimientos y valores ancestrales para que el Pueblo Maya pueda conservar dinámicamente su cultura, historia y tradiciones.',
    ],
  },
]


const directionsEn = [
  { name: 'East', color: 'Red', swatchClass: 'bg-earth-red' },
  { name: 'West', color: 'Black', swatchClass: 'bg-ink' },
  { name: 'North', color: 'White', swatchClass: 'border border-cream-dark bg-white' },
  { name: 'South', color: 'Yellow', swatchClass: 'bg-gold' },
]

const directionsEs = [
  { name: 'Oriente', color: 'Rojo', swatchClass: 'bg-earth-red' },
  { name: 'Occidente', color: 'Negro', swatchClass: 'bg-ink' },
  { name: 'Norte', color: 'Blanco', swatchClass: 'border border-cream-dark bg-white' },
  { name: 'Sur', color: 'Amarillo', swatchClass: 'bg-gold' },
]

interface CosmovisionCopy {
  sectionsLabel: string
  artHeading: string
  artistLabel: string
  artistBody: string[]
}

export default function MayaCosmovisionContent() {
  const { lang } = useLanguage()
  const copy = uiCopy[lang]
  const page = getProgramPage(lang, 'maya-cosmovision')
  const sections = lang === 'es' ? sectionsEs : sectionsEn
  const directions = lang === 'es' ? directionsEs : directionsEn
  const navLinks = localizedProgramNavLinks(lang)

  const pageCopy: CosmovisionCopy =
    lang === 'es'
      ? {
          sectionsLabel: 'Secciones de la página de Cosmovisión Maya',
          artHeading:
            'Un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales.',
          artistLabel: 'Sobre el artista',
          artistBody: [
            'Jose Flores es un artista guatemalteco autodidacta radicado en Nueva York cuyo corazón y espíritu permanecen arraigados en su lugar de nacimiento, GuateMaya, el corazón del Pueblo Maya.',
            'Las tradiciones antiguas de su tierra natal son la fuente de inspiración de su obra. Rinde homenaje a su pueblo y ancestros capturando su carácter sagrado con retratos poderosos y oníricos.',
            'A través de su arte, Jose revive su herencia e identidad indígena dentro de una resistencia de más de 500 años.',
          ],
        }
      : {
          sectionsLabel: 'Maya Cosmovision page sections',
          artHeading:
            'A permanent link between our contemporary world and ancestral traditions.',
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
      <CollectionShell
        activeHref="/maya-cosmovision"
        navLabel={copy.programs}
        navLinks={navLinks}
        sheetTitle={copy.programs}
        heroTitle={page.title}
        heroIntro={page.intro}
        hero={<ProgramPageHero page={page} sectionCount={sections.length} />}
      >
        <div className={collectionArticleSectionClass}>
          <ProgramSectionNav
            sections={sections.map((section, index) => ({
              label: section.label,
              title: section.title,
            }))}
            ariaLabel={pageCopy.sectionsLabel}
            getSectionId={(index) => `cosmovision-${index + 1}`}
          />
        </div>

        {sections.map((section, index) => {
          if (index === 1) {
            return (
              <MayaCosmovisionArtSection
                key={section.title}
                id={`cosmovision-${index + 1}`}
                sectionLabel={section.label}
                title={section.title}
                deck={pageCopy.artHeading}
                philosophyBody={section.body}
                artistLabel={pageCopy.artistLabel}
                artistBody={pageCopy.artistBody}
              />
            )
          }

          return (
            <AboutEditorialSection
              key={section.title}
              id={`cosmovision-${index + 1}`}
              index={index + 1}
              railLabel={section.label}
              title={section.title}
              body={section.body}
              variant="white"
              layout="editorial"
              leadFirstBody={index === 0}
              wideTitle={section.title.trim().split(/\s+/).length > 5}
              className="scroll-mt-48 lg:scroll-mt-36 xl:scroll-mt-44"
            >
              {index === 2 ? <MayaDirectionGrid directions={directions} /> : null}
            </AboutEditorialSection>
          )
        })}
      </CollectionShell>
      <Footer />
    </>
  )
}
