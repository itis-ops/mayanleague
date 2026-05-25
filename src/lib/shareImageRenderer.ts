import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const shareBrand = {
  cream: '#f8f2f2',
  ink: '#242424',
  earthRed: '#df0712',
  mist: '#4f4945',
  line: '#d9c7c0',
} as const

const fontCache = new Map<string, ArrayBuffer>()

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const key = `${family}-${weight}`
  const cached = fontCache.get(key)
  if (cached) return cached

  const familyParam = family.replace(/ /g, '+')
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
      },
    },
  ).then((response) => response.text())

  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/)
  if (!match?.[1]) {
    throw new Error(`Unable to load font: ${family} ${weight}`)
  }

  const data = await fetch(match[1]).then((response) => response.arrayBuffer())
  fontCache.set(key, data)
  return data
}

let shareFontsPromise: Promise<
  Array<{ name: string; data: ArrayBuffer; weight: 700 | 800 | 900; style: 'normal' }>
> | null = null

export function getShareImageFonts() {
  if (!shareFontsPromise) {
    shareFontsPromise = Promise.all([
      loadGoogleFont('Oswald', 700),
      loadGoogleFont('Inter', 900),
      loadGoogleFont('Source Serif 4', 800),
    ]).then(([oswald, inter, serif]) => [
      { name: 'Oswald', data: oswald, weight: 700, style: 'normal' },
      { name: 'Inter', data: inter, weight: 900, style: 'normal' },
      { name: 'Source Serif 4', data: serif, weight: 800, style: 'normal' },
    ])
  }

  return shareFontsPromise
}

let logoDataUrlPromise: Promise<string> | null = null

export function getMayanLeagueLogoDataUrl() {
  if (!logoDataUrlPromise) {
    logoDataUrlPromise = readFile(
      path.join(process.cwd(), 'public/brand/mayan-league-logo.png'),
    ).then((buffer) => `data:image/png;base64,${buffer.toString('base64')}`)
  }

  return logoDataUrlPromise
}

export function fitShareText(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 3)}...` : value
}
