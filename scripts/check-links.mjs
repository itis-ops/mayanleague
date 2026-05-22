#!/usr/bin/env node
/**
 * Extract hrefs from src and check internal routes + external HTTP status.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'src')

const INTERNAL_ROUTES = new Set([
  '/',
  '/about',
  '/programs',
  '/resources',
  '/news',
  '/contact',
  '/board-of-directors',
  '/our-path',
  '/our-core-values',
  '/team',
  '/job-opportunities',
  '/how-we-work',
  '/videos',
  '/maya-cosmovision',
  '/human-rights',
  '/environmental-protection',
  '/immigration',
  '/maya-women-delegation',
  '/gathering-of-ancestral-wisdom',
  '/lgbtqia2s',
  '/land-rights',
  '/sovereignty-and-self-determination',
  '/indigenous-language-resources',
  '/indigenous-forced-migration',
  '/indigenous-children',
  '/indigenous-human-rights',
  '/studio',
])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) files.push(full)
  }
  return files
}

function extractHrefs(content) {
  const hrefs = new Set()
  const patterns = [
    /href:\s*['"]([^'"]+)['"]/g,
    /href=\{?['"`]([^'"`}]+)['"`]\}?/g,
    /href=["']([^"']+)["']/g,
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(content))) {
      const h = m[1].trim()
      if (h && !h.startsWith('#') && !h.startsWith('tel:') && !h.startsWith('mailto:')) hrefs.add(h)
    }
  }
  return hrefs
}

function normalizeInternal(href) {
  if (href.startsWith('/')) {
    const u = new URL(href, 'http://local')
    const base = u.pathname.replace(/\/$/, '') || '/'
    if (base.startsWith('/news/')) return '/news/[slug]'
    if (base.startsWith('/studio')) return '/studio'
    return base
  }
  if (href.includes('mayanleague.org') || href.includes('mayanleague.vercel.app')) {
    try {
      const u = new URL(href)
      const base = u.pathname.replace(/\/$/, '') || '/'
      return { external: href, internalPath: base }
    } catch {
      return null
    }
  }
  return null
}

async function checkUrl(url, timeout = 12000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'MayanLeague-LinkChecker/1.0' },
    })
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        headers: { 'User-Agent': 'MayanLeague-LinkChecker/1.0' },
      })
    }
    clearTimeout(timer)
    return { status: res.status, ok: res.ok, finalUrl: res.url }
  } catch (e) {
    clearTimeout(timer)
    return { status: 0, ok: false, error: e.message }
  }
}

const allHrefs = new Map() // href -> [files]
for (const file of walk(srcDir)) {
  const content = fs.readFileSync(file, 'utf8')
  for (const h of extractHrefs(content)) {
    if (!allHrefs.has(h)) allHrefs.set(h, [])
    allHrefs.get(h).push(path.relative(root, file))
  }
}

const internalMissing = []
const mayanleagueOrgInternalizable = []
const externalToCheck = []

for (const [href, files] of allHrefs) {
  if (href.startsWith('/')) {
    const norm = normalizeInternal(href)
    if (typeof norm === 'string' && !INTERNAL_ROUTES.has(norm) && norm !== '/news/[slug]') {
      internalMissing.push({ href, files: [...new Set(files)].slice(0, 3) })
    }
  } else if (href.startsWith('http')) {
    const n = normalizeInternal(href)
    if (n?.internalPath && INTERNAL_ROUTES.has(n.internalPath)) {
      mayanleagueOrgInternalizable.push({ href, local: n.internalPath, files: [...new Set(files)].slice(0, 2) })
    } else {
      externalToCheck.push(href)
    }
  }
}

// Priority externals: nav, footer, social
const priority = [
  'https://mayanleague.org/donors',
  'https://mayanleague.org/partnerships',
  'https://mayanleague.org/campaigns',
  'https://facebook.com/mayanleague',
  'https://twitter.com/mayanleague',
  'https://instagram.com/mayanleague',
  'https://youtube.com/@mayanleague',
  'https://internationalmayanleague-bloom.kindful.com/embeds/94567c30-cca9-4853-a87f-43c38750420a',
]

const uniqueExternal = [...new Set([...priority, ...externalToCheck])].slice(0, 80)

console.log('=== INTERNAL ROUTES MISSING ===')
console.log(JSON.stringify(internalMissing, null, 2))

console.log('\n=== MAYANLEAGUE.ORG -> CAN USE LOCAL PATH ===')
console.log(JSON.stringify(mayanleagueOrgInternalizable.slice(0, 15), null, 2))

console.log('\n=== EXTERNAL CHECK (sample) ===')
const results = []
for (const url of uniqueExternal) {
  const r = await checkUrl(url)
  results.push({ url, ...r })
  await new Promise((r) => setTimeout(r, 200))
}
console.log(JSON.stringify(results, null, 2))
