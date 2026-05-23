#!/usr/bin/env node
/**
 * Optimize brand SVG/PNG assets for web delivery.
 * Usage: node scripts/optimize-brand-assets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { optimize } from 'svgo'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const brandDir = path.join(projectRoot, 'public/brand')
const svgoConfig = (await import(pathToFileURL(path.join(__dirname, 'svgo.config.mjs')).href)).default

const UNUSED_PUBLIC_SVGS = [
  'public/file.svg',
  'public/globe.svg',
  'public/next.svg',
  'public/window.svg',
  'public/vercel.svg',
]

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function pct(before, after) {
  return `${(((before - after) / before) * 100).toFixed(1)}%`
}

async function optimizeSvg(relativePath) {
  const filePath = path.join(projectRoot, relativePath)
  const before = fs.readFileSync(filePath, 'utf8')
  const beforeBytes = Buffer.byteLength(before, 'utf8')
  const { data } = optimize(before, { ...svgoConfig, path: filePath })
  const afterBytes = Buffer.byteLength(data, 'utf8')

  if (afterBytes <= beforeBytes) {
    fs.writeFileSync(filePath, data, 'utf8')
  }

  return {
    file: relativePath,
    beforeBytes,
    afterBytes: afterBytes <= beforeBytes ? afterBytes : beforeBytes,
    keptOriginal: afterBytes > beforeBytes,
  }
}

async function optimizeLogo() {
  const logoPath = path.join(brandDir, 'mayan-league-logo.png')
  const beforeBytes = fs.statSync(logoPath).size

  // Max UI size is 80px (xl); 256px covers 3x retina with headroom.
  const optimized = await sharp(logoPath)
    .resize(256, 256, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 })
    .toBuffer()

  fs.writeFileSync(logoPath, optimized)
  const afterBytes = optimized.length

  return { file: 'public/brand/mayan-league-logo.png', beforeBytes, afterBytes }
}

async function removeUnusedBoilerplate() {
  const removed = []
  for (const file of UNUSED_PUBLIC_SVGS) {
    const filePath = path.join(projectRoot, file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      removed.push(file)
    }
  }
  return removed
}

async function main() {
  console.log('\n=== Brand asset optimization ===\n')

  const svgResults = []
  for (const file of ['public/brand/un-emblem.svg']) {
    svgResults.push(await optimizeSvg(file))
  }

  const logoResult = await optimizeLogo()
  const removed = await removeUnusedBoilerplate()

  for (const r of svgResults) {
    const saved = r.beforeBytes - r.afterBytes
    console.log(`${r.file}`)
    console.log(`  ${fmt(r.beforeBytes)} → ${fmt(r.afterBytes)} (${saved > 0 ? `save ${pct(r.beforeBytes, r.afterBytes)}` : 'already optimal'})`)
    if (r.keptOriginal) console.log('  (skipped write — SVGO would increase size)')
  }

  console.log(`\n${logoResult.file}`)
  console.log(`  ${fmt(logoResult.beforeBytes)} → ${fmt(logoResult.afterBytes)} (save ${pct(logoResult.beforeBytes, logoResult.afterBytes)})`)

  if (removed.length) {
    console.log('\nRemoved unused boilerplate SVGs:')
    for (const file of removed) console.log(`  - ${file}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
