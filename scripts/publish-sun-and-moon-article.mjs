/**
 * Publishes the dummy "Sun and Moon" Internal article to Sanity.
 *
 * This is an Internal article — written by the International Mayan League and
 * hosted on this site (no external source link). It exercises the Internal
 * article path of the newsArticle schema:
 *   - type: 'internal'
 *   - body: bilingual portable text (EN + ES)
 *   - no sourceUrl
 *
 * Run with:
 *   npx tsx scripts/publish-sun-and-moon-article.mjs
 *
 * Idempotent — uses createOrReplace.
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
      const value = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // .env.local may be absent in CI — rely on shell env
  }
}

loadEnv(resolve(__dirname, '../.env.local'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? ''

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID not set or still placeholder.')
  process.exit(1)
}

if (!writeToken) {
  console.error(
    'SANITY_API_WRITE_TOKEN not set.\n' +
      '  Create an Editor token in Sanity Manage → API → Tokens\n' +
      '  and add SANITY_API_WRITE_TOKEN=sk... to .env.local',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION ?? '2026-05-21',
  token: writeToken,
  useCdn: false,
})

// ── Article copy ─────────────────────────────────────────────────────────────

const SLUG = 'sun-and-moon-sacred-kinship-maya-cosmovision'

const TITLE_EN = 'Where the Sun and Moon Meet: Notes on a Living Maya Cosmovision'
const TITLE_ES = 'Donde el Sol y la Luna se encuentran: notas sobre una cosmovisión Maya viva'

const DEK_EN =
  'Across Maya communities, the Sun and Moon are not abstract symbols — they are kin, calendar-keepers, and witnesses to daily life. We share what we have learned holding their story.'
const DEK_ES =
  'En las comunidades Mayas, el Sol y la Luna no son símbolos abstractos: son parientes, guardianes del calendario y testigos de la vida cotidiana. Compartimos lo que hemos aprendido al sostener su historia.'

const EXCERPT_EN =
  'An International Mayan League reflection on the relationship between the Sun and the Moon — kin, calendar, and continuing teachers of Maya life.'
const EXCERPT_ES =
  'Una reflexión de la Liga Maya Internacional sobre la relación entre el Sol y la Luna — parentesco, calendario y maestros vigentes de la vida Maya.'

const SOCIAL_TITLE_EN = 'Sun and Moon: kin, calendar, and Maya cosmovision'
const SOCIAL_TITLE_ES = 'Sol y Luna: parentesco, calendario y cosmovisión Maya'

const SOCIAL_DESCRIPTION_EN =
  'A reflection from the International Mayan League on how Maya communities understand the Sun and Moon — not as opposites, but as relatives that order time, ceremony, and daily life.'
const SOCIAL_DESCRIPTION_ES =
  'Una reflexión de la Liga Maya Internacional sobre cómo las comunidades Mayas entienden al Sol y la Luna — no como opuestos, sino como parientes que ordenan el tiempo, la ceremonia y la vida cotidiana.'

const BODY_EN_PARAGRAPHS = [
  "In Maya cosmovision, the Sun and the Moon walk together — not as opposites, but as relatives. The K'iche' Popol Vuh names them Hunahpu and Xbalanque, the Hero Twins, who descend into the Underworld and rise as the lights that order time. Their story is older than any one community, and it is still walking with us.",
  "For Maya farmers and ceremonial guides, the Sun marks the rhythm of planting and prayer, while the Moon — Awilix, Ixchel, Po — guides the harvest, the womb, and the medicines. Each community names them in its own language: Q'ij and Ik' in K'iche', K'inich and U in Yucatec, K'in and Wuj in others. The names change. The kinship does not.",
  "This kinship is the foundation of two sacred calendars the Maya have kept for thousands of years. The Cholq'ij — 260 days — moves with the rhythm of the womb, the planting cycle, and the body. The Hab' — 365 days — moves with the Sun. Together they form a longer cycle, a count of days that asks us to listen to both.",
  'What the Sun and Moon teach is balance — not symmetry. Day and night are not equal halves; they trade leadership across the year. The longest day yields to the longest night. The Sun warms the maize; the Moon waters its leaves. To be Maya in this moment, the Mayan League holds, is to live in that exchange — to refuse a world that asks us to choose one and erase the other.',
  'Our elders remind us that this is not a story about the past. The Sun still rises over the volcanoes of the highlands; the Moon still pulls the tide in the Yucatán and the rivers of Guatemala. The same sky holds Maya families on the move — at the border, in detention, in diaspora — and the same ceremonies are kept by Aj Q\u2019ijab\u2019 and grandmothers wherever they land.',
  'At the International Mayan League, we keep this teaching close because it shapes how we work. Climate, migration, language, sovereignty — none of these are separate fights. They are the daily life of a people who have always read the sky for guidance, and who continue to walk between two great lights.',
]

const BODY_ES_PARAGRAPHS = [
  "En la cosmovisión Maya, el Sol y la Luna caminan juntos — no como opuestos, sino como parientes. El Popol Vuh K'iche' los nombra Hunahpú y Xbalanqué, los Héroes Gemelos que descienden al inframundo y se levantan como las luces que ordenan el tiempo. Su historia es más antigua que cualquier comunidad, y todavía camina con nosotras y nosotros.",
  "Para campesinas, campesinos y guías ceremoniales Mayas, el Sol marca el ritmo de la siembra y la oración, mientras que la Luna — Awilix, Ixchel, Po — guía la cosecha, el vientre y las medicinas. Cada comunidad les da nombre en su propio idioma: Q'ij e Ik' en K'iche', K'inich y U en Yucateco, K'in y Wuj en otros. Los nombres cambian. El parentesco no.",
  "Ese parentesco es la base de dos calendarios sagrados que el pueblo Maya ha sostenido durante miles de años. El Cholq'ij — 260 días — se mueve con el ritmo del vientre, el ciclo de la siembra y el cuerpo. El Hab' — 365 días — se mueve con el Sol. Juntos forman un ciclo más largo, una cuenta de los días que nos pide escuchar a ambos.",
  'Lo que enseñan el Sol y la Luna es equilibrio — no simetría. El día y la noche no son mitades iguales; intercambian el liderazgo a lo largo del año. El día más largo cede a la noche más larga. El Sol calienta el maíz; la Luna riega sus hojas. Ser Maya en este tiempo, sostiene la Liga Maya, es vivir en ese intercambio — negarnos a un mundo que nos pide elegir uno y borrar al otro.',
  'Nuestras abuelas y abuelos nos recuerdan que esta no es una historia del pasado. El Sol todavía se levanta sobre los volcanes del altiplano; la Luna todavía mueve la marea en Yucatán y los ríos de Guatemala. El mismo cielo sostiene a las familias Mayas en movimiento — en la frontera, en la detención, en la diáspora — y las mismas ceremonias son guardadas por Aj Q\u2019ijab\u2019 y abuelas dondequiera que lleguen.',
  'En la Liga Maya Internacional sostenemos esta enseñanza cerca porque da forma a cómo trabajamos. Clima, migración, idioma, soberanía — ninguna de estas luchas es independiente. Son la vida cotidiana de un pueblo que siempre ha leído el cielo en busca de guía, y que sigue caminando entre dos grandes luces.',
]

// ── Build portable text blocks ───────────────────────────────────────────────

function paragraphsToPortableText(paragraphs, prefix) {
  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `${prefix}-p${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `${prefix}-p${index}-s0`,
        text,
        marks: [],
      },
    ],
  }))
}

const doc = {
  _id: `newsArticle-${SLUG}`,
  _type: 'newsArticle',
  type: 'internal',
  title: { en: TITLE_EN, es: TITLE_ES },
  slug: { _type: 'slug', current: SLUG },
  category: 'Culture & Identity',
  keywords: [
    'cosmovision',
    'Popol Vuh',
    'Maya calendar',
    'cultural preservation',
    'sun and moon',
    'Hero Twins',
  ],
  dek: { en: DEK_EN, es: DEK_ES },
  excerpt: { en: EXCERPT_EN, es: EXCERPT_ES },
  body: {
    en: paragraphsToPortableText(BODY_EN_PARAGRAPHS, 'en'),
    es: paragraphsToPortableText(BODY_ES_PARAGRAPHS, 'es'),
  },
  author: 'International Mayan League',
  // No sourceName — the article page falls back to "International Mayan League"
  // No sourceUrl — Internal articles do not link out
  featured: false,
  publishedAt: new Date().toISOString(),
  seo: {
    socialTitle: { en: SOCIAL_TITLE_EN, es: SOCIAL_TITLE_ES },
    socialDescription: { en: SOCIAL_DESCRIPTION_EN, es: SOCIAL_DESCRIPTION_ES },
    hashtags: ['MayanLeague', 'MayaCosmovision', 'PopolVuh', 'IndigenousWisdom'],
  },
}

console.log(`\nPublishing Internal article → Sanity (${projectId} / ${dataset})`)
console.log(`  slug:  ${SLUG}`)
console.log(`  type:  internal`)
console.log(`  body:  ${BODY_EN_PARAGRAPHS.length} EN paragraphs, ${BODY_ES_PARAGRAPHS.length} ES paragraphs\n`)

try {
  const existing = await client.getDocument(doc._id)
  await client.createOrReplace(doc)
  console.log(existing ? `  Updated: ${doc._id}` : `  Created: ${doc._id}`)
} catch (err) {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`  Failed: ${message}`)
  process.exit(1)
}

console.log('\nDone.')
console.log('Next:')
console.log(`  - Visit /studio → Newsroom → ${SLUG} to confirm.`)
console.log(`  - Visit /news/${SLUG} on the live site (or /news to see it in the list).`)
