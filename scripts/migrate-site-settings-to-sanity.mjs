/**
 * Pre-fills the Sanity Site Settings singleton from static i18n + contact data.
 *
 * Run: node scripts/migrate-site-settings-to-sanity.mjs
 * Safe to re-run (createOrReplace).
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
    /* no .env.local */
  }
}

loadEnv(resolve(__dirname, '../.env.local'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}
if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN is not set')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
})

const ls = (en, es) => ({ en, es })
const lt = (en, es) => ({ en, es })

const DONATE_URL =
  'https://internationalmayanleague-bloom.kindful.com/embeds/94567c30-cca9-4853-a87f-43c38750420a'

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',

  brand: {
    short: ls('Mayan League', 'Liga Maya'),
    full: ls('International Mayan League', 'Liga Maya Internacional'),
  },

  nav: {
    about: ls('About', 'Quiénes Somos'),
    programs: ls('Programs', 'Programas'),
    resources: ls('Resources', 'Recursos'),
    media: ls('News', 'Noticias'),
    contact: ls('Contact', 'Contacto'),
    donate: ls('Donate', 'Donar'),
  },

  footer: {
    tagline: lt(
      "Let's walk together in defense of Mother Earth and future generations",
      'Caminemos juntos en defensa de la Madre Tierra y las generaciones futuras',
    ),
    quickLinks: ls('Quick Links', 'Enlaces Rápidos'),
    contact: ls('Contact', 'Contacto'),
    whoWeAre: ls('Who we are', 'Quiénes somos'),
    whatWeDo: ls('What we do', 'Qué hacemos'),
    getInvolved: ls('Get Involved', 'Participa'),
    whoLinks: [
      ls('Board of Directors', 'Junta Directiva'),
      ls('Team', 'Equipo'),
      ls('Donors', 'Donantes'),
      ls('Join the team', 'Únete al equipo'),
    ],
    involvedLinks: [
      ls('Donate', 'Donar'),
      ls('Partnerships', 'Alianzas'),
      ls('Campaigns', 'Campañas'),
    ],
    socialLabel: ls('Visit Mayan League on', 'Visita a la Liga Maya en'),
    copyright: ls(
      '© 2026 International Mayan League. All Rights Reserved.',
      '© 2026 Liga Maya Internacional. Todos los Derechos Reservados.',
    ),
  },

  contact: {
    email: 'info@mayanleague.org',
    phone: '(202) 827-6673',
    addressLines: ['1201 K ST NW', 'Washington, D.C. 20005'],
  },

  social: {
    facebook: 'https://facebook.com/mayanleague',
    twitter: 'https://twitter.com/mayanleague',
    instagram: 'https://instagram.com/mayanleague',
    youtube: 'https://youtube.com/@mayanleague',
  },

  donateUrl: DONATE_URL,

  defaultSocialTitle: ls(
    'International Mayan League',
    'Liga Maya Internacional',
  ),
  defaultSocialDescription: lt(
    "Let's walk together in defense of Mother Earth and future generations",
    'Caminemos juntos en defensa de la Madre Tierra y las generaciones futuras',
  ),
}

async function run() {
  console.log('⚙️  Migrating site settings to Sanity…\n')
  try {
    const result = await client.createOrReplace(siteSettings)
    console.log(`✅  Site settings written: ${result._id} (rev ${result._rev})`)
    console.log('\nOpen Studio → Site settings to verify.')
  } catch (err) {
    console.error('❌  Failed:', err.message || err)
    process.exit(1)
  }
}

run()
