#!/usr/bin/env node
/**
 * Targeted pass on the 5 largest public/site-images assets.
 * Writes variants to tmp/top5-optimization/ and prints a savings report.
 *
 * Usage: node scripts/optimize-top5-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(projectRoot, 'public/site-images')
const outDir = path.join(projectRoot, 'tmp/top5-optimization')

const TARGETS = [
  {
    file: 'team-hero.png',
    maxDisplayPx: 1728,
    note: 'Homepage mission section; sizes hint max ~1680px',
  },
  {
    file: 'page-our-path-2.png',
    maxDisplayPx: 1500,
    note: 'Our Path vision section; already 1500px wide',
  },
  {
    file: 'page-our-path-1.png',
    maxDisplayPx: 1500,
    note: 'Our Path mission section; already 1500px wide',
  },
  {
    file: 'atitlan-ulew.jpg',
    maxDisplayPx: 1728,
    note: 'Homepage hero; container max ~1728px',
  },
  {
    file: 'maya-cosmovision-hero.jpg',
    maxDisplayPx: 1728,
    note: 'Maya cosmovision page hero',
  },
]

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function pct(before, after) {
  return `${(((before - after) / before) * 100).toFixed(1)}%`
}

async function writeVariant(input, outputPath, pipeline) {
  await pipeline.toFile(outputPath)
  return fs.statSync(outputPath).size
}

async function processTarget(target) {
  const inputPath = path.join(sourceDir, target.file)
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing source file: ${inputPath}`)
  }

  const originalBytes = fs.statSync(inputPath).size
  const meta = await sharp(inputPath).metadata()
  const base = path.parse(target.file).name
  const targetDir = path.join(outDir, base)
  fs.mkdirSync(targetDir, { recursive: true })

  const variants = []

  // WebP at original dimensions
  variants.push({
    label: 'webp-original-q82',
    recommended: false,
    bytes: await writeVariant(
      inputPath,
      path.join(targetDir, `${base}.webp`),
      sharp(inputPath).webp({ quality: 82, effort: 6 }),
    ),
  })

  // AVIF at original dimensions
  variants.push({
    label: 'avif-original-q50',
    recommended: false,
    bytes: await writeVariant(
      inputPath,
      path.join(targetDir, `${base}.avif`),
      sharp(inputPath).avif({ quality: 50, effort: 6 }),
    ),
  })

  const shouldResize = (meta.width ?? 0) > target.maxDisplayPx
  if (shouldResize) {
    variants.push({
      label: `webp-${target.maxDisplayPx}px-q82`,
      recommended: true,
      bytes: await writeVariant(
        inputPath,
        path.join(targetDir, `${base}-${target.maxDisplayPx}.webp`),
        sharp(inputPath)
          .resize({ width: target.maxDisplayPx, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 }),
      ),
    })

    variants.push({
      label: `avif-${target.maxDisplayPx}px-q50`,
      recommended: false,
      bytes: await writeVariant(
        inputPath,
        path.join(targetDir, `${base}-${target.maxDisplayPx}.avif`),
        sharp(inputPath)
          .resize({ width: target.maxDisplayPx, withoutEnlargement: true })
          .avif({ quality: 50, effort: 6 }),
      ),
    })
  } else {
    // Smaller sources: mark webp-original as recommended
    variants[0].recommended = true
  }

  const best = variants.reduce((a, b) => (a.bytes < b.bytes ? a : b))
  best.recommended = true

  return {
    file: target.file,
    note: target.note,
    dimensions: `${meta.width}x${meta.height}`,
    originalBytes,
    variants,
    best,
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const results = []
  for (const target of TARGETS) {
    results.push(await processTarget(target))
  }

  let totalOriginal = 0
  let totalBest = 0

  console.log('\n=== Top 5 image optimization pass ===\n')

  for (const r of results) {
    totalOriginal += r.originalBytes
    totalBest += r.best.bytes

    console.log(`${r.file} (${r.dimensions}) — ${fmt(r.originalBytes)}`)
    console.log(`  ${r.note}`)
    for (const v of r.variants) {
      const mark = v.label === r.best.label ? ' ← best' : ''
      console.log(
        `  ${v.label}: ${fmt(v.bytes)} (save ${pct(r.originalBytes, v.bytes)})${mark}`,
      )
    }
    console.log('')
  }

  console.log('=== Totals (top 5 only) ===')
  console.log(`Original: ${fmt(totalOriginal)}`)
  console.log(`Best per image: ${fmt(totalBest)}`)
  console.log(`Estimated savings: ${fmt(totalOriginal - totalBest)} (${pct(totalOriginal, totalBest)})`)
  console.log(`\nPreview files: ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
