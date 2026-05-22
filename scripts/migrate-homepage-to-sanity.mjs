/**
 * Pre-fills the Sanity Homepage singleton with all existing static content
 * from src/lib/i18n.ts so editors can see what each field controls and
 * edit from a real starting point instead of a blank document.
 *
 * Run with:
 *   node scripts/migrate-homepage-to-sanity.mjs
 *
 * Prerequisites:
 *   SANITY_API_WRITE_TOKEN must be set in .env.local (Editor role).
 *
 * Safe to re-run — uses createOrReplace (idempotent).
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    // no .env.local — rely on real env
  }
}

loadEnv(resolve(__dirname, '../.env.local'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function ls(en, es) {
  return { en, es }
}

function lt(en, es) {
  return { en, es }
}

// ── Homepage document built from i18n.ts content ─────────────────────────────

const homepage = {
  _id: 'homepage',
  _type: 'homepage',

  hero: {
    eyebrow: ls(
      'International Mayan League',
      'Liga Maya Internacional',
    ),
    tagline: lt(
      "Let's walk together in defense of Mother Earth and future generations",
      'Caminemos juntos en defensa de la Madre Tierra y las generaciones futuras',
    ),
    mission: ls('International Mayan League', 'Liga Maya Internacional'),
    clarityLine: lt(
      'A Maya women & youth-led organization defending Indigenous rights, culture, and Mother Earth — for 23+ years.',
      'Una organización liderada por mujeres y juventud Maya que defiende los derechos indígenas, la cultura y la Madre Tierra — por más de 23 años.',
    ),
    ctaDonate: ls('Donate now', 'Donar ahora'),
    ctaConnect: ls('Contact us', 'Contáctenos'),
    proofPoints: [
      ls('Maya women & youth led', 'Liderado por mujeres y juventud Maya'),
      ls('Defenders of Mother Earth', 'Defensores de la Madre Tierra'),
      ls('Across Abya Yala', 'A través de Abya Yala'),
    ],
  },

  impactMoment: {
    label: ls('In the community', 'En la comunidad'),
    kicker: ls('March 26, 2026 · United Nations', '26 de marzo de 2026 · Naciones Unidas'),
    heading: lt(
      'Our voice at the United Nations.',
      'Nuestra voz en las Naciones Unidas.',
    ),
    body: lt(
      "Our Executive Director Juanita Cabrera López participated in a roundtable with UN High Commissioner for Human Rights Volker Türk, presenting the International Mayan League's statement on Indigenous Peoples' Rights in the context of inhumane immigration policies. Her participation brought urgent attention to how immigration systems impact Indigenous migrant communities and affirmed the need for centering Indigenous-led solutions.",
      'Nuestra Directora Ejecutiva Juanita Cabrera López participó en una mesa redonda con el Alto Comisionado de la ONU para los Derechos Humanos, Volker Türk, presentando la declaración de la Liga Maya Internacional sobre los Derechos de los Pueblos Indígenas en el contexto de políticas migratorias inhumanas.',
    ),
    readStatement: ls('Read the full statement', 'Leer la declaración completa'),
    statementUrl:
      'https://www.mayanleague.org/s/Roundtable-on-the-human-rights-situation-in-the-United-States_Final.pdf',
  },

  mission: {
    sectionLabel: ls('Who we are.', 'Quiénes somos.'),
    sectionKicker: ls(
      'International Mayan League Board of Directors',
      'Junta Directiva de la Liga Maya Internacional',
    ),
    heading: ls('International Mayan League', 'LIGA MAYA INTERNACIONAL'),
    boardStatement: [
      lt(
        'The International Mayan League is a Maya organization whose purpose is to promote, preserve, and transmit the cosmovision and worldview, culture, history, and contributions of our ancestors and the values of our traditional knowledge and stewardship of the earth into solutions and actions against current threats and violations affecting our peoples, the earth, and humanity.',
        'La Liga Maya Internacional es una organización Maya cuyo propósito es promover, preservar y transmitir la cosmovisión, cultura, historia y contribuciones de nuestros ancestros y los valores de nuestro conocimiento tradicional y la administración de la tierra en soluciones y acciones contra las amenazas y violaciones actuales que afectan a nuestros pueblos, la tierra y la humanidad.',
      ),
      lt(
        'We are committed to creating a permanent link between our contemporary world and ancestral traditions, respecting the diversity of our Nation while building a shared vision with our peoples, and working closely with other indigenous peoples, organizations, and allies who support our beliefs and values.',
        'Estamos comprometidos a crear un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales, respetando la diversidad de nuestra Nación y construyendo una visión compartida con nuestros pueblos, y trabajando de cerca con otros pueblos indígenas, organizaciones y aliados que apoyan nuestras creencias y valores.',
      ),
    ],
    boardStatementAttribution: ls(
      'International Mayan League Board of Directors',
      'Junta Directiva de la Liga Maya Internacional',
    ),
    learnMore: ls('Learn more', 'Leer más'),
  },

  programsSpotlight: {
    kicker: ls('Maya Cosmovision', 'Cosmovisión Maya'),
    heading: lt(
      'The current generation is working hard to keep all these values alive.',
      'La generación actual trabaja para mantener vivos estos valores.',
    ),
    intro: lt(
      'The new generation is receiving teachings from the elders to keep this great knowledge alive in order to transmit it to future generations for the benefit of our people and all of humanity.',
      'La nueva generación recibe enseñanzas de las y los mayores para mantener vivo este gran conocimiento y transmitirlo a las futuras generaciones para beneficio de nuestro pueblo y de toda la humanidad.',
    ),
    learnMore: ls('Follow this work', 'Seguir este trabajo'),
    items: [
      {
        name: ls('Maya Cosmovision', 'Cosmovisión Maya'),
        description: lt(
          'Our connection to the world and the cosmos are the basis of our action, of our thoughts, and our sentiments in life and of life.',
          'Nuestra conexión con el mundo y el cosmos es la base de nuestra acción, pensamiento y sentimiento en la vida y por la vida.',
        ),
        href: '/maya-cosmovision',
      },
      {
        name: ls('Human Rights & Advocacy', 'Derechos Humanos y Abogacía'),
        description: lt(
          'The Mayan League seeks to assist Maya leaders to fully engage in human rights fora and use existing human rights mechanisms to safeguard their rights.',
          'La Liga Maya acompaña a liderazgos Mayas para participar plenamente en espacios de derechos humanos y usar mecanismos existentes para proteger sus derechos.',
        ),
        href: '/human-rights',
      },
      {
        name: ls('Environmental Protection', 'Protección Ambiental'),
        description: lt(
          'The Maya have a special relationship with Mother Earth and Mother Nature. We defend her because she is our mother.',
          'El pueblo Maya tiene una relación especial con la Madre Tierra y la Madre Naturaleza. La defendemos porque es nuestra madre.',
        ),
        href: '/environmental-protection',
      },
      {
        name: ls('Immigration', 'Inmigración'),
        description: lt(
          'The defense of our lands and territories is fundamental but we also understand that there have been various consequences from these long-standing conflicts, in particular the forced displacement of indigenous peoples.',
          'La defensa de nuestras tierras y territorios es fundamental, y también entendemos las consecuencias de conflictos históricos, en particular el desplazamiento forzado de los pueblos Indígenas.',
        ),
        href: '/immigration',
      },
      {
        name: ls('Maya Women Delegation', 'Delegación de Mujeres Mayas'),
        description: lt(
          'The Maya Women Interpreter Delegation traveled to Tucson Arizona with allies on April 24th- 28th to provide Indigenous Language Services at Casa Alitas, at the U.S./Mexico border.',
          'La Delegación de Mujeres Intérpretes Mayas viajó a Tucson, Arizona, con aliadas para brindar servicios en idiomas Indígenas en Casa Alitas, en la frontera entre Estados Unidos y México.',
        ),
        href: '/maya-women-delegation',
      },
      {
        name: ls('Gathering of Ancestral Wisdom', 'Encuentro de Sabiduría Ancestral'),
        description: lt(
          'Maya Ancestral Authorities from diverse Maya nations of Mexico and Guatemala convened a three-day meeting titled, Ancestral Wisdom for the Defense of Life, Mother Earth, and her Natural Elements.',
          'Autoridades Ancestrales Mayas de diversas naciones Mayas de México y Guatemala convocaron un encuentro de tres días: Sabiduría ancestral para la defensa de la vida, la Madre Tierra y sus elementos naturales.',
        ),
        href: '/gathering-of-ancestral-wisdom',
      },
    ],
  },

  callToAction: {
    eyebrow: ls('Donate now', 'Donar ahora'),
    heading: ls('Stand with Maya communities.', 'Apoya a las comunidades Mayas.'),
    body: lt(
      'When you give to The International Mayan League, you join Maya women, youth, and Elders at the frontlines of justice as we defend our Peoples and Mother Earth, and nurture hope for future generations. Your financial commitment ensures that Maya communities facing displacement, detention, and violence are not alone.',
      'Cuando das a la Liga Maya Internacional, te unes a mujeres, jóvenes y ancianos Maya en la primera línea de la justicia mientras defendemos a nuestros Pueblos y a la Madre Tierra, y nutrimos esperanza para las generaciones futuras.',
    ),
    donate: ls('Become a monthly donor', 'Hazte donante mensual'),
    donateOnce: ls('Give once', 'Donar una vez'),
    connect: ls('Contact us', 'Contáctenos'),
  },

  resourcesSpotlight: {
    sectionLabel: ls('Resources', 'Recursos'),
    sectionKicker: ls('Indigenous Language Resources', 'Recursos en idiomas Indígenas'),
    eyebrow: ls('Indigenous Language Resources', 'Recursos en idiomas Indígenas'),
    heading: ls(
      'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
      'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
    ),
    intro: lt(
      'Know your rights in Maya Mam. If you have any contact with la Migra (ICE) or the police on the street, at home, in jail, at work or while driving.',
      'Si tiene cualquier contacto con la Migra (ICE) o la policía en la calle, en su casa, en la cárcel, en el trabajo o mientras maneja.',
    ),
    explore: ls('Explore', 'Explorar'),
    items: [
      {
        title: ls(
          'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
          'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
        ),
        description: lt(
          'Original translation and interpretation in Maya Mam by the International Maya League. Content provided by the National Day Laborer Organizing Network - NDLON.',
          'Traducción e interpretación original en Maya Mam por la Liga Maya Internacional. Contenido por NDLON.',
        ),
      },
      {
        title: ls(
          'SI LA MIGRA (ICE) VIENE A SU CASA en Maya Mam.',
          'SI LA MIGRA (ICE) VIENE A SU CASA en Maya Mam.',
        ),
        description: lt(
          'If ICE Comes to your house, Maya Mam.',
          'Si ICE llega a su casa, en Maya Mam.',
        ),
      },
      {
        title: ls(
          'SI LA MIGRA (ICE) LE DETIENE EN UN LUGAR PUBLICO en Maya Mam.',
          'SI LA MIGRA (ICE) LE DETIENE EN UN LUGAR PUBLICO en Maya Mam.',
        ),
        description: lt(
          'If you are detained by ICE in a public place, Maya Mam.',
          'Si ICE le detiene en un lugar público, en Maya Mam.',
        ),
      },
      {
        title: ls(
          'SI LA MIGRA (ICE) O LA POLICIA ARRESTA O DETIENE A UN SER QUERIDO en Maya Mam.',
          'SI LA MIGRA (ICE) O LA POLICIA ARRESTA O DETIENE A UN SER QUERIDO en Maya Mam.',
        ),
        description: lt(
          'If ICE or the police arrest or detain a family member, Maya Mam.',
          'Si ICE o la policía arresta o detiene a un ser querido, en Maya Mam.',
        ),
      },
    ],
  },

  newsRail: {
    kicker: ls('Public witness', 'Testimonio público'),
    headline: ls(
      'Perspectives and Analysis from our Nation',
      'Perspectivas y análisis de nuestra Nación',
    ),
    viewAll: ls('Visit the newsroom', 'Visitar noticias'),
  },
}

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  console.log('🌿  Migrating homepage content to Sanity…\n')

  try {
    const result = await client.createOrReplace(homepage)
    console.log(`✅  Homepage document written: ${result._id} (rev ${result._rev})`)
    console.log('\nOpen Studio → Homepage to verify all fields are populated.')
  } catch (err) {
    console.error('❌  Failed to write homepage document:')
    console.error(err.message || err)
    process.exit(1)
  }
}

run()
