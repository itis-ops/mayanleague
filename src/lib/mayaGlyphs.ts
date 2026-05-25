/**
 * Maya Count of Days — 20 nawal glyphs (Tzolk'in day signs).
 *
 * Simplified SVG interpretations inspired by classic day-sign forms in codices
 * and teaching charts. Authoritative context on reading calendar glyphs:
 * https://maya.nmai.si.edu/calendar/reading-calendar-glyphs
 * (Smithsonian National Museum of the American Indian — Living Maya Time)
 *
 * Order matches DAY_SIGNS in mayaCalendar.ts (0 = Imix … 19 = Ajaw).
 */

const K = '#1e1b18'
const W = '#faf9f7'

/** Rounded frame + three-lobed pedestal (shared nawal shell). */
function nawal(inner: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="44" viewBox="0 0 40 44">` +
    `<rect x="7" y="3" width="26" height="26" rx="5" fill="${W}" stroke="${K}" stroke-width="1.6"/>` +
    inner +
    `<path d="M9 30h3.2c0 3.2 2.4 3.6 2.8 0h3.2c0 3.2 2.4 3.6 2.8 0H24c0 3.2 2.4 3.6 2.8 0H30" fill="none" stroke="${K}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<ellipse cx="11.5" cy="33.5" rx="2.2" ry="2" fill="${K}"/>` +
    `<ellipse cx="20" cy="33.5" rx="2.2" ry="2" fill="${K}"/>` +
    `<ellipse cx="28.5" cy="33.5" rx="2.2" ry="2" fill="${K}"/>` +
    `</svg>`
  )
}

export const GLYPH_SVGS: string[] = [
  // 0 Imix — water-lily / crocodile: dome with vertical fringe, bead at top
  nawal(
    `<circle cx="20" cy="9" r="2.2" fill="${K}"/>` +
    `<circle cx="20" cy="9" r="0.9" fill="${W}"/>` +
    `<path d="M11 12a9 9 0 0 1 18 0v2H11z" fill="${K}"/>` +
    `<path d="M13 14v10M16 14v10M19 14v10M22 14v10M25 14v10" stroke="${W}" stroke-width="1.2" stroke-linecap="round"/>` +
    `<line x1="11" y1="14" x2="29" y2="14" stroke="${K}" stroke-width="1.2"/>`
  ),

  // 1 Ik' — wind: T with bead at stem base
  nawal(
    `<rect x="11" y="9" width="18" height="5" rx="2.5" fill="${K}"/>` +
    `<rect x="17.5" y="14" width="5" height="12" rx="2.5" fill="${K}"/>` +
    `<circle cx="20" cy="27.5" r="2" fill="none" stroke="${K}" stroke-width="1.4"/>`
  ),

  // 2 Ak'b'al — night: brow curves above, divider, three marks below
  nawal(
    `<path d="M11 12c2-1 4-1 5 1M24 12c2-1 4-1 5 1" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>` +
    `<line x1="10" y1="17" x2="30" y2="17" stroke="${K}" stroke-width="2"/>` +
    `<circle cx="14" cy="22" r="1.8" fill="${K}"/>` +
    `<circle cx="20" cy="22" r="1.8" fill="${K}"/>` +
    `<circle cx="26" cy="22" r="1.8" fill="${K}"/>`
  ),

  // 3 K'an — corn: nested circles, twin curves above
  nawal(
    `<circle cx="20" cy="18" r="7" fill="none" stroke="${K}" stroke-width="2"/>` +
    `<circle cx="20" cy="18" r="3.5" fill="${K}"/>` +
    `<path d="M13 11c2-2 5-2 7 0M20 11c2-2 5-2 7 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`
  ),

  // 4 Chikchan — serpent head profile (left)
  nawal(
    `<path d="M26 11c-6 0-10 4-10 9 0 2 1 3 3 3 1 0 2-1 2-2h2c1 0 2-1 2-2V11z" fill="${K}"/>` +
    `<circle cx="17" cy="14" r="1.8" fill="${W}"/>` +
    `<circle cx="17" cy="14" r="0.7" fill="${K}"/>` +
    `<path d="M26 17l3 1.5v2l-3 1" fill="none" stroke="${W}" stroke-width="1.2" stroke-linecap="round"/>` +
    `<line x1="27" y1="18.5" x2="29" y2="18.5" stroke="${W}" stroke-width="1"/>`
  ),

  // 5 Kimi — death: skull profile, closed eye, S jaw
  nawal(
    `<path d="M14 12c0-3 4-5 8-4 3 1 5 4 5 8s-2 7-5 8c-4 1-8-1-8-4z" fill="${K}"/>` +
    `<path d="M16 15.5h5" stroke="${W}" stroke-width="1.8" stroke-linecap="round"/>` +
    `<path d="M15 19c2 3 5 3 8 0" fill="none" stroke="${W}" stroke-width="1.6" stroke-linecap="round"/>`
  ),

  // 6 Manik' — hand profile (left), grasping
  nawal(
    `<path d="M26 12v14M22 12v16M18 13v14M14 15v11" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M26 18c3 1 4 4 2 6-2 2-6 0-8-3" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M13 26c4 3 9 2 13-2" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`
  ),

  // 7 Lamat — Venus: cross + four quadrant dots
  nawal(
    `<line x1="20" y1="9" x2="20" y2="27" stroke="${K}" stroke-width="2"/>` +
    `<line x1="11" y1="18" x2="29" y2="18" stroke="${K}" stroke-width="2"/>` +
    `<circle cx="20" cy="18" r="2.2" fill="${K}"/>` +
    `<circle cx="14" cy="12" r="2" fill="${K}"/>` +
    `<circle cx="26" cy="12" r="2" fill="${K}"/>` +
    `<circle cx="14" cy="24" r="2" fill="${K}"/>` +
    `<circle cx="26" cy="24" r="2" fill="${K}"/>`
  ),

  // 8 Muluk — jade/water beast profile, large eye
  nawal(
    `<path d="M27 12c-5-1-9 3-9 8 0 3 2 5 5 5 2 0 4-2 4-4h-1c0 2-2 3-4 2-5-2-7-6-6-11z" fill="${K}"/>` +
    `<ellipse cx="17" cy="16" rx="4" ry="3.5" fill="${W}"/>` +
    `<circle cx="17" cy="16" r="1.8" fill="${K}"/>` +
    `<circle cx="24" cy="20" r="1.2" fill="${W}"/>`
  ),

  // 9 Ok — dog profile (left)
  nawal(
    `<path d="M27 13c-4-2-8 1-9 6-1 4 2 8 6 6 1 0 2-1 2-2v-4z" fill="${K}"/>` +
    `<path d="M27 11c2-3 5-4 4-1" fill="${K}"/>` +
    `<circle cx="18" cy="17" r="2" fill="${W}"/>` +
    `<circle cx="18" cy="17" r="0.9" fill="${K}"/>`
  ),

  // 10 Chuwen — monkey / artisan profile
  nawal(
    `<path d="M26 12c-5 0-9 4-9 9s4 9 9 9 4-4 4-9-4-9-9-9z" fill="${K}"/>` +
    `<ellipse cx="28" cy="15" rx="2.5" ry="3" fill="${K}"/>` +
    `<circle cx="17" cy="16" r="2" fill="${W}"/>` +
    `<circle cx="17" cy="16" r="0.8" fill="${K}"/>` +
    `<path d="M15 21c3 2 7 2 10 0" fill="none" stroke="${W}" stroke-width="1.4" stroke-linecap="round"/>`
  ),

  // 11 Eb' — road / human jaw profile
  nawal(
    `<path d="M26 13c-6 0-10 5-10 10 0 2 4 4 6 7 1 1 3 1 4-1 1-2 0-3-1-2-4-1-7-4-10-10-1-5z" fill="${K}"/>` +
    `<path d="M17 16h6" stroke="${W}" stroke-width="1.6" stroke-linecap="round"/>`
  ),

  // 12 B'en — reed: center bar, two above, three below
  nawal(
    `<line x1="10" y1="18" x2="30" y2="18" stroke="${K}" stroke-width="2"/>` +
    `<line x1="15" y1="11" x2="15" y2="16" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<line x1="25" y1="11" x2="25" y2="16" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<line x1="13" y1="20" x2="13" y2="26" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<line x1="20" y1="20" x2="20" y2="26" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<line x1="27" y1="20" x2="27" y2="26" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>`
  ),

  // 13 Ix — jaguar: three dots + hatched brow
  nawal(
    `<path d="M11 12h18v3H11z" fill="${K}"/>` +
    `<line x1="13" y1="12" x2="13" y2="15" stroke="${W}" stroke-width="0.9"/>` +
    `<line x1="16" y1="12" x2="16" y2="15" stroke="${W}" stroke-width="0.9"/>` +
    `<line x1="19" y1="12" x2="19" y2="15" stroke="${W}" stroke-width="0.9"/>` +
    `<line x1="22" y1="12" x2="22" y2="15" stroke="${W}" stroke-width="0.9"/>` +
    `<line x1="25" y1="12" x2="25" y2="15" stroke="${W}" stroke-width="0.9"/>` +
    `<circle cx="15" cy="19" r="2" fill="${K}"/>` +
    `<circle cx="25" cy="19" r="2" fill="${K}"/>` +
    `<circle cx="20" cy="24" r="2" fill="${K}"/>`
  ),

  // 14 Men — eagle profile (left)
  nawal(
    `<path d="M27 12c-6-1-10 4-10 9 0 4 3 7 7 6 2 0 3-2 3-4 0-2-1-3-3-3-2-6 0-10-5-1-4z" fill="${K}"/>` +
    `<path d="M27 14c3-4 6-5 5-1" fill="${K}"/>` +
    `<ellipse cx="17" cy="16" rx="3.5" ry="3" fill="${W}"/>` +
    `<circle cx="17" cy="16" r="1.6" fill="${K}"/>`
  ),

  // 15 K'ib' — shell / vulture: split stem, cross-hatch crown
  nawal(
    `<path d="M17 11v16M23 11v16" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M14 11h12v5H14z" fill="${K}"/>` +
    `<path d="M15 12h2v3h-2zm4 0h2v3h-2zm4 0h2v3h-2z" fill="${W}"/>` +
    `<path d="M15 22c2 2 5 2 7 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>`
  ),

  // 16 Kab'an — earth: curl left, dotted circle right
  nawal(
    `<path d="M12 20c0-5 4-9 8-6 3 2 3 6 0 8" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<circle cx="26" cy="18" r="4" fill="none" stroke="${K}" stroke-width="1.8"/>` +
    `<circle cx="26" cy="18" r="1.2" fill="${K}"/>` +
    `<circle cx="24" cy="16" r="0.7" fill="${K}"/>` +
    `<circle cx="28" cy="20" r="0.7" fill="${K}"/>`
  ),

  // 17 Etz'nab' — flint: four curved lobes at center
  nawal(
    `<path d="M20 10q5 4 5 8t-5 8-5-8 5-8zm0-2q-6 5-6 10t6 10 6-10-6-10z" fill="${K}"/>` +
    `<path d="M20 12q3 2 3 6t-3 6-3-6 3-6z" fill="${W}"/>` +
    `<circle cx="20" cy="18" r="1.5" fill="${K}"/>`
  ),

  // 18 Kawak — storm: grape cluster (circles) on right
  nawal(
    `<circle cx="24" cy="12" r="2.2" fill="${K}"/>` +
    `<circle cx="27" cy="14" r="2.2" fill="${K}"/>` +
    `<circle cx="22" cy="15" r="2.2" fill="${K}"/>` +
    `<circle cx="26" cy="17" r="2.2" fill="${K}"/>` +
    `<circle cx="23" cy="19" r="2.2" fill="${K}"/>` +
    `<circle cx="27" cy="21" r="2.2" fill="${K}"/>` +
    `<circle cx="24" cy="23" r="2.2" fill="${K}"/>` +
    `<path d="M12 18c2-3 5-4 8-2" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`
  ),

  // 19 Ajaw — sun: face in circle (Ahau)
  nawal(
    `<circle cx="20" cy="17" r="9" fill="none" stroke="${K}" stroke-width="2"/>` +
    `<circle cx="16" cy="16" r="2" fill="${K}"/>` +
    `<circle cx="24" cy="16" r="2" fill="${K}"/>` +
    `<circle cx="20" cy="21" r="1.5" fill="${K}"/>` +
    `<path d="M18 19.5h4" stroke="${K}" stroke-width="1.2" stroke-linecap="round"/>`
  ),
]

/**
 * Returns a CSS-ready data URI for an SVG glyph string.
 */
export function getGlyphDataUri(svgString: string): string {
  const minified = svgString.replace(/\n\s*/g, ' ').trim()
  return `data:image/svg+xml,${encodeURIComponent(minified)}`
}
