import type { ContentLink } from '@/lib/siteContent'
import { indigenousLanguageResources } from '@/lib/resourcePages'

export const FAMILY_META: Record<string, { color: string; glyph: string }> = {
  Ixil: { color: 'bg-earth-red/8 border-earth-red/20', glyph: '01' },
  Kaqchikel: { color: 'bg-gold/8 border-gold/30', glyph: '02' },
  "K'iche'": { color: 'bg-earth-red/8 border-earth-red/20', glyph: '03' },
  Mam: { color: 'bg-gold/8 border-gold/30', glyph: '04' },
  "Q'anjob'al": { color: 'bg-earth-red/8 border-earth-red/20', glyph: '05' },
  "Q'eqchi'": { color: 'bg-gold/8 border-gold/30', glyph: '06' },
}

export function detectFamily(title: string): string {
  if (/ixil/i.test(title)) return 'Ixil'
  if (/kaqchikel/i.test(title)) return 'Kaqchikel'
  if (/k'iche'/i.test(title)) return "K'iche'"
  if (/\bmam\b/i.test(title)) return 'Mam'
  if (/q'anjob'al/i.test(title)) return "Q'anjob'al"
  if (/q'eqchi'/i.test(title)) return "Q'eqchi'"
  return 'Other'
}

export function parseCommunity(title: string): { language: string; community: string } {
  const match = title.match(/^Maya\s+([^,]+),\s*(.+)$/i)
  if (match) {
    return { language: `Maya ${match[1].trim()}`, community: match[2].trim() }
  }
  return { language: title, community: '' }
}

export function splitBilingual(label: string): { es: string; en: string } | null {
  const idx = label.indexOf(' / ')
  if (idx === -1) return null
  return { es: label.slice(0, idx).trim(), en: label.slice(idx + 3).trim() }
}

export function getLanguageFamilyOrder(): string[] {
  const order: string[] = []
  for (const group of indigenousLanguageResources.groups) {
    const family = detectFamily(group.title)
    if (!order.includes(family)) order.push(family)
  }
  return order
}

export function getLanguageFamilyMap() {
  const map = new Map<string, typeof indigenousLanguageResources.groups>()
  for (const group of indigenousLanguageResources.groups) {
    const family = detectFamily(group.title)
    const arr = map.get(family) ?? []
    arr.push(group)
    map.set(family, arr)
  }
  return map
}

export function getLanguageResourceStats() {
  const familyMap = getLanguageFamilyMap()
  const videoCount = indigenousLanguageResources.groups.reduce((sum, group) => sum + group.links.length, 0)
  return {
    familyCount: familyMap.size,
    videoCount,
    communityCount: indigenousLanguageResources.groups.length,
  }
}

export function getFamilyVideoCount(family: string) {
  const groups = getLanguageFamilyMap().get(family) ?? []
  return groups.reduce((sum, group) => sum + group.links.length, 0)
}

const FEATURED_VIDEO_HREFS = [
  'https://www.facebook.com/share/v/18jetNY9Em/',
  'https://www.facebook.com/share/v/1BforLXLfq/',
  'https://www.facebook.com/share/v/1YZYCJ6LKq/',
  'https://www.facebook.com/share/v/1C7mHqPSMn/',
]

export interface FeaturedLanguageVideo extends ContentLink {
  family: string
  community: string
}

export function getFeaturedLanguageVideos(): FeaturedLanguageVideo[] {
  const featured: FeaturedLanguageVideo[] = []

  for (const href of FEATURED_VIDEO_HREFS) {
    for (const group of indigenousLanguageResources.groups) {
      const link = group.links.find((item) => item.href === href)
      if (!link) continue
      const { community } = parseCommunity(group.title)
      featured.push({
        ...link,
        family: detectFamily(group.title),
        community,
      })
      break
    }
  }

  return featured
}

export function familyAnchorId(family: string) {
  return `family-${family.replace(/[^a-z]/gi, '')}`
}
