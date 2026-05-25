/**
 * Maya Count of Days (Tzolk'in) engine.
 *
 * The Tzolk'in is the 260-day Count of Days (13 numbers × 20 day signs). This
 * module converts any Gregorian date to its place in that cycle using the GMT
 * correlation (JDN 584283 = Long Count 0.0.0.0.0 = 4 Ajaw 8 Kumk'u).
 *
 * Reference: Thompson (1950), GMT correlation; Aveni (2001).
 */

/** The 20 Maya day signs in canonical Tzolk'in order (Yucatec spellings). */
export const DAY_SIGNS = [
  'Imix',
  "Ik'",
  "Ak'b'al",
  "K'an",
  'Chikchan',
  'Kimi',
  "Manik'",
  'Lamat',
  'Muluk',
  'Ok',
  'Chuwen',
  "Eb'",
  "B'en",
  'Ix',
  'Men',
  "K'ib'",
  "Kab'an",
  "Etz'nab'",
  'Kawak',
  'Ajaw',
] as const

export type DaySign = (typeof DAY_SIGNS)[number]

/** English gloss for each day sign nawal. */
export const DAY_SIGN_MEANINGS: Record<DaySign, string> = {
  Imix: 'Crocodile',
  "Ik'": 'Wind',
  "Ak'b'al": 'Night',
  "K'an": 'Corn',
  Chikchan: 'Serpent',
  Kimi: 'Death',
  "Manik'": 'Hand',
  Lamat: 'Venus',
  Muluk: 'Water',
  Ok: 'Dog',
  Chuwen: 'Monkey',
  "Eb'": 'Road',
  "B'en": 'Reed',
  Ix: 'Jaguar',
  Men: 'Eagle',
  "K'ib'": 'Vulture',
  "Kab'an": 'Earth',
  "Etz'nab'": 'Flint',
  Kawak: 'Storm',
  Ajaw: 'Sun',
}

/** Spanish gloss for each day sign nawal. */
export const DAY_SIGN_MEANINGS_ES: Record<DaySign, string> = {
  Imix: 'Cocodrilo',
  "Ik'": 'Viento',
  "Ak'b'al": 'Noche',
  "K'an": 'Maíz',
  Chikchan: 'Serpiente',
  Kimi: 'Muerte',
  "Manik'": 'Mano',
  Lamat: 'Venus',
  Muluk: 'Agua',
  Ok: 'Perro',
  Chuwen: 'Mono',
  "Eb'": 'Camino',
  "B'en": 'Caña',
  Ix: 'Jaguar',
  Men: 'Águila',
  "K'ib'": 'Buitre',
  "Kab'an": 'Tierra',
  "Etz'nab'": 'Pedernal',
  Kawak: 'Tormenta',
  Ajaw: 'Sol',
}

/**
 * Converts a proleptic Gregorian calendar date to Julian Day Number.
 * Algorithm from Meeus, "Astronomical Algorithms" (1991).
 */
function gregorianToJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  )
}

export interface TzolkinDay {
  /** Day sign (nawal) name — Yucatec spelling. */
  sign: DaySign
  /** 0-based index into DAY_SIGNS (0 = Imix … 19 = Ajaw). */
  signIndex: number
  /** Trecena coefficient 1–13. */
  trecena: number
  /** English gloss. */
  meaning: string
  /** Spanish gloss. */
  meaningEs: string
  /** Human-readable label: "{trecena} {sign}". */
  label: string
}

/**
 * Returns the Maya Tzolk'in day for any proleptic Gregorian date.
 *
 * Derivation:
 *   JDN 584283 = Long Count 0.0.0.0.0 = Tzolk'in 4 Ajaw (GMT correlation).
 *   Ajaw is DAY_SIGNS[19], trecena 4 ≡ offset 3 (1-based).
 *   signIndex  = ((jdn − 584283) + 19) mod 20
 *   trecena    = ((jdn − 584283) + 3)  mod 13 + 1
 */
export function getTzolkinDay(year: number, month: number, day: number): TzolkinDay {
  const jdn = gregorianToJDN(year, month, day)
  const offset = jdn - 584283
  const signIndex = ((offset + 19) % 20 + 20) % 20
  const trecena = ((offset + 3) % 13 + 13) % 13 + 1
  const sign = DAY_SIGNS[signIndex]
  return {
    sign,
    signIndex,
    trecena,
    meaning: DAY_SIGN_MEANINGS[sign],
    meaningEs: DAY_SIGN_MEANINGS_ES[sign],
    label: `${trecena} ${sign}`,
  }
}

/** Returns the Tzolk'in day for today's local calendar date. */
export function getTodayTzolkin(): TzolkinDay {
  const now = new Date()
  return getTzolkinDay(now.getFullYear(), now.getMonth() + 1, now.getDate())
}
