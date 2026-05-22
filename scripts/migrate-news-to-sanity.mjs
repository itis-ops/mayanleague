/**
 * Migrates all news articles from src/lib/news.ts into Sanity.
 *
 * Run with:
 *   npx tsx scripts/migrate-news-to-sanity.mjs
 *
 * Prerequisites:
 *   1. Create an Editor token in Sanity Manage → API → Tokens (role: Editor).
 *   2. Add to .env.local:  SANITY_API_WRITE_TOKEN=sk...
 *
 * Safe to run multiple times — uses createOrReplace (idempotent).
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Load .env.local ───────────────────────────────────────────────────────────

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
    // .env.local absent in CI — rely on actual env vars
  }
}

loadEnv(resolve(__dirname, '../.env.local'))

// ── Validate env ──────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? ''

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID not set or still placeholder.')
  process.exit(1)
}

if (!writeToken) {
  console.error(
    '❌  SANITY_API_WRITE_TOKEN not set.\n' +
    '    Create an Editor token in Sanity Manage → API → Tokens\n' +
    '    and add SANITY_API_WRITE_TOKEN=sk... to .env.local',
  )
  process.exit(1)
}

// ── Sanity client ─────────────────────────────────────────────────────────────

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION ?? '2026-05-21',
  token: writeToken,
  useCdn: false,
})

// ── Load source articles (tsx strips TS syntax from the import) ───────────────

const { newsArticles, newsArticleTranslationsEs } = await import('../src/lib/news.ts')

// ── Date parsing ──────────────────────────────────────────────────────────────

const MONTH_MAP = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
}

function parseLegacyDate(dateStr) {
  const cleaned = dateStr.replace(',', '').trim()
  const parts = cleaned.split(' ').filter(Boolean)
  if (parts.length === 3) {
    const [month, day, year] = parts
    const mm = MONTH_MAP[month]
    if (mm) return `${year}-${mm}-${day.padStart(2, '0')}T00:00:00Z`
  }
  if (parts.length === 2) {
    const [month, year] = parts
    const mm = MONTH_MAP[month]
    if (mm) return `${year}-${mm}-01T00:00:00Z`
  }
  return undefined
}

// ── ES alt-text overrides for articles with known Spanish alt in static data ──

const esAltOverrides = {
  'protesters-demand-protection-indigenous-migrant-children':
    'Manifestantes protestan por derechos al debido proceso.',
  'mayan-elders-standing-rock-solidarity':
    'Cinco tipis en un campo abierto bajo la luz del día.',
}

// ── Build Sanity document from legacy NewsArticle ─────────────────────────────

function buildDoc(article) {
  const es = newsArticleTranslationsEs[article.slug] ?? {}
  const publishedAt = parseLegacyDate(article.date) ?? new Date().toISOString()

  const mainImage = article.mainImage
    ? {
        source: 'unsplash',
        unsplash: {
          url: article.mainImage.url,
          alt: {
            en: article.mainImage.alt,
            es: esAltOverrides[article.slug] ?? article.mainImage.alt,
          },
          ...(article.mainImage.caption
            ? { caption: { en: article.mainImage.caption, es: article.mainImage.caption } }
            : {}),
          photographerName: article.mainImage.photographerName,
          photographerUrl: article.mainImage.photographerUrl,
          sourceName: article.mainImage.sourceName,
          sourceUrl: article.mainImage.sourceUrl,
          ...(article.mainImage.unsplashPhotoId
            ? { unsplashPhotoId: article.mainImage.unsplashPhotoId }
            : {}),
          ...(article.mainImage.unsplashDownloadLocation
            ? { unsplashDownloadLocation: article.mainImage.unsplashDownloadLocation }
            : {}),
          ...(article.mainImage.paletteNotes?.length
            ? { paletteNotes: article.mainImage.paletteNotes }
            : {}),
        },
      }
    : undefined

  const hasSeo = article.socialTitle || article.socialDescription || article.hashtags?.length

  return {
    _id: `newsArticle-${article.slug}`,
    _type: 'newsArticle',
    title: { en: article.title, es: es.title ?? article.title },
    slug: { _type: 'slug', current: article.slug },
    category: article.category,
    keywords: article.keywords,
    dek: { en: article.dek, es: es.dek ?? article.dek },
    summary: { en: article.summary, es: es.summary ?? article.summary },
    whyItMatters: { en: article.whyItMatters, es: es.whyItMatters ?? article.whyItMatters },
    excerpt: { en: article.excerpt, es: es.excerpt ?? article.excerpt },
    type: article.type,
    ...(article.author ? { author: article.author } : {}),
    ...(article.sourceName ? { sourceName: article.sourceName } : {}),
    ...(article.sourceUrl ? { sourceUrl: article.sourceUrl } : {}),
    featured: article.featured ?? false,
    publishStatus: 'published',
    publishedAt,
    ...(mainImage ? { mainImage } : {}),
    ...(hasSeo
      ? {
          seo: {
            ...(article.socialTitle
              ? { socialTitle: { en: article.socialTitle, es: es.socialTitle ?? article.socialTitle } }
              : {}),
            ...(article.socialDescription
              ? { socialDescription: { en: article.socialDescription, es: es.socialDescription ?? article.socialDescription } }
              : {}),
            ...(article.hashtags?.length ? { hashtags: article.hashtags } : {}),
          },
        }
      : {}),
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────

console.log(`\n🚀  Migrating ${newsArticles.length} articles → Sanity (${projectId} / ${dataset})\n`)

let created = 0
let updated = 0
let failed = 0

for (const article of newsArticles) {
  const doc = buildDoc(article)
  try {
    const existing = await client.getDocument(doc._id)
    await client.createOrReplace(doc)
    if (existing) {
      console.log(`  ↻  Updated : ${article.slug}`)
      updated++
    } else {
      console.log(`  ✓  Created : ${article.slug}`)
      created++
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`  ✗  Failed  : ${article.slug} — ${message}`)
    failed++
  }
}

console.log(`\n${failed === 0 ? '✅' : '⚠️ '}  Done.  Created: ${created}  Updated: ${updated}  Failed: ${failed}\n`)

if (failed > 0) {
  console.error('Some articles failed — see messages above.')
  process.exit(1)
}

console.log('Next steps:')
console.log('  1. Open /studio → Newsroom → confirm all articles show as Published')
console.log('  2. Check EN + ES copy — edit any that fell back to English')
console.log('  3. Homepage → News rail → Featured → pick up to 4 articles')
console.log('  4. Redeploy Vercel (or wait ≤60s for ISR) to see live Sanity content\n')
