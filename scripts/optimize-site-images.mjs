#!/usr/bin/env node
/**
 * Optimize all public/site-images assets for web delivery.
 * Converts photos and illustrations to WebP at display-appropriate dimensions.
 *
 * Usage: node scripts/optimize-site-images.mjs [--apply]
 * Without --apply, writes previews to tmp/site-images-optimization/ only.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const sourceRoot = path.join(projectRoot, 'public/site-images')
const previewRoot = path.join(projectRoot, 'tmp/site-images-optimization')
const apply = process.argv.includes('--apply')

/** @type {Record<string, { maxWidth: number; quality?: number }>} */
const RULES = {
  'atitlan-ulew.jpg': { maxWidth: 1728 },
  'team-hero.png': { maxWidth: 1728 },
  'page-our-path-1.png': { maxWidth: 1500 },
  'page-our-path-2.png': { maxWidth: 1500 },
  'maya-cosmovision-hero.jpg': { maxWidth: 1728 },
  'maya-cosmovision-art.jpg': { maxWidth: 1200 },
  'maya-delegation.jpg': { maxWidth: 1728 },
  'page-board-of-directors.jpg': { maxWidth: 1200 },
  'community-action.jpg': { maxWidth: 1728 },
  'environmental.jpg': { maxWidth: 1728 },
  'home-hero.jpg': { maxWidth: 1728 },
  'logo-full.jpg': { maxWidth: 960 },
  'board.jpg': { maxWidth: 1200 },
  'board-group.jpg': { maxWidth: 1200 },
  'board-group-source.jpg': { maxWidth: 1200 },
  'page-how-we-work.jpg': { maxWidth: 1200 },
  'page-job-opportunities.jpg': { maxWidth: 1200 },
  'un-flag.webp': { maxWidth: 512, quality: 85 },
}

const PORTRAIT_MAX = 512
const ICON_MAX = 256
const WEBP_QUALITY = 82

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function pct(before, after) {
  return `${(((before - after) / before) * 100).toFixed(1)}%`
}

function walkImages(dir, base = '') {
  /** @type {string[]} */
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkImages(full, rel))
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) files.push(rel)
  }
  return files.sort()
}

function ruleFor(relativePath) {
  if (RULES[relativePath]) return RULES[relativePath]
  if (/^team-[^/]+\.jpg$/i.test(relativePath)) return { maxWidth: PORTRAIT_MAX }
  if (/^core-values\/value-/.test(relativePath)) return { maxWidth: ICON_MAX, quality: 85 }
  return { maxWidth: 1200 }
}

function webpPath(relativePath) {
  return relativePath.replace(/\.(jpe?g|png|webp|avif)$/i, '.webp')
}

function publicPath(relativePath) {
  return `/site-images/${relativePath}`
}

async function optimizeOne(relativePath) {
  const inputPath = path.join(sourceRoot, relativePath)
  const { maxWidth, quality = WEBP_QUALITY } = ruleFor(relativePath)
  const outputRelative = webpPath(relativePath)
  const outputPath = apply
    ? path.join(sourceRoot, outputRelative)
    : path.join(previewRoot, outputRelative)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  const beforeBytes = fs.statSync(inputPath).size
  const meta = await sharp(inputPath).metadata()

  let pipeline = sharp(inputPath).rotate()
  const width = meta.width ?? maxWidth
  if (width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  const writePath =
    apply && path.resolve(inputPath) === path.resolve(outputPath)
      ? `${outputPath}.tmp`
      : outputPath

  await pipeline.webp({ quality, effort: 6 }).toFile(writePath)

  if (writePath !== outputPath) {
    fs.renameSync(writePath, outputPath)
  }

  const afterBytes = fs.statSync(outputPath).size

  return {
    relativePath,
    outputRelative,
    from: publicPath(relativePath),
    to: publicPath(outputRelative),
    dimensions: `${meta.width}x${meta.height}`,
    beforeBytes,
    afterBytes,
    maxWidth,
  }
}

function replacePathsInProject(replacements) {
  const roots = [path.join(projectRoot, 'src'), path.join(projectRoot, 'scripts')]
  /** @type {string[]} */
  const changed = []

  for (const root of roots) {
    if (!fs.existsSync(root)) continue
  }

  function walkDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walkDir(full)
      else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) {
        let content = fs.readFileSync(full, 'utf8')
        let updated = content
        for (const { from, to } of replacements) {
          if (from !== to) updated = updated.split(from).join(to)
        }
        if (updated !== content) {
          fs.writeFileSync(full, updated, 'utf8')
          changed.push(path.relative(projectRoot, full))
        }
      }
    }
  }

  for (const root of roots) {
    if (fs.existsSync(root)) walkDir(root)
  }

  return changed
}

function removeDuplicatesAndSources(results) {
  /** @type {string[]} */
  const removed = []

  // Unused duplicates of core-values icons.
  for (let i = 1; i <= 7; i += 1) {
    const dup = path.join(sourceRoot, `page-core-value-${i}.png`)
    if (fs.existsSync(dup)) {
      fs.unlinkSync(dup)
      removed.push(`site-images/page-core-value-${i}.png`)
    }
  }

  for (const result of results) {
    if (result.relativePath === result.outputRelative) continue
    const sourcePath = path.join(sourceRoot, result.relativePath)
    if (fs.existsSync(sourcePath)) {
      fs.unlinkSync(sourcePath)
      removed.push(`site-images/${result.relativePath}`)
    }
  }

  return removed
}

async function main() {
  const images = walkImages(sourceRoot).filter((file) => !file.startsWith('page-core-value-'))
  const results = []

  for (const relativePath of images) {
    results.push(await optimizeOne(relativePath))
  }

  let totalBefore = 0
  let totalAfter = 0

  console.log(`\n=== Site image optimization ${apply ? '(apply)' : '(preview)'} ===\n`)

  for (const r of results) {
    totalBefore += r.beforeBytes
    totalAfter += r.afterBytes
  }

  for (const r of results) {
    const saved = r.beforeBytes - r.afterBytes
    console.log(`${r.relativePath} (${r.dimensions}, max ${r.maxWidth}px)`)
    console.log(`  ${fmt(r.beforeBytes)} → ${fmt(r.afterBytes)} (${saved > 0 ? `save ${pct(r.beforeBytes, r.afterBytes)}` : 'no gain'})`)
    if (r.relativePath !== r.outputRelative.replace(/^/, '')) {
      console.log(`  → ${r.outputRelative}`)
    }
  }

  console.log('\n=== Totals ===')
  console.log(`Original: ${fmt(totalBefore)}`)
  console.log(`Optimized: ${fmt(totalAfter)}`)
  console.log(`Saved: ${fmt(totalBefore - totalAfter)} (${pct(totalBefore, totalAfter)})`)

  if (!apply) {
    console.log(`\nPreview files: ${previewRoot}`)
    console.log('Re-run with --apply to write into public/site-images and update references.')
    return
  }

  const replacements = results
    .filter((r) => r.from !== r.to)
    .map(({ from, to }) => ({ from, to }))

  const changedFiles = replacePathsInProject(replacements)
  const removed = removeDuplicatesAndSources(results)

  console.log(`\nUpdated ${changedFiles.length} source file(s):`)
  for (const file of changedFiles) console.log(`  - ${file}`)

  if (removed.length) {
    console.log(`\nRemoved ${removed.length} superseded file(s):`)
    for (const file of removed) console.log(`  - ${file}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
