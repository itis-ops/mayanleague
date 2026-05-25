import type { Lang } from '@/lib/i18n'
import { DAY_SIGNS, type DaySign } from '@/lib/mayaCalendar'

/** Primary reference for calendar glyph forms and context. */
export const NMAI_GLYPHS_URL = 'https://maya.nmai.si.edu/calendar/reading-calendar-glyphs'

export interface CountOfDaysSignCopy {
  sign: DaySign
  /** Short gloss for the day sign. */
  meaning: string
  /** Alternate spellings found in codices, epigraphy, or teaching charts. */
  altSpellings?: string
  note: string
}

export interface CountOfDaysPageCopy {
  metaTitle: string
  metaDescription: string
  kicker: string
  title: string
  intro: string[]
  longCountNote: string
  todayLabel: string
  todayBody: string
  allSignsHeading: string
  allSignsIntro: string
  glyphFormsNote: string
  badgeToday: string
  sourcesHeading: string
  sourcesBody: string
  sourcesLinkLabel: string
  sourcesQuote: string
  sourcesQuoteAttribution: string
  signs: CountOfDaysSignCopy[]
}

const enSigns: CountOfDaysSignCopy[] = [
  {
    sign: 'Imix',
    meaning: 'Crocodile / water-lily',
    altSpellings: 'Imix',
    note: 'First of the twenty day signs. In codex forms, a fringed dome often marks the opening of the 20-day round.',
  },
  {
    sign: "Ik'",
    meaning: 'Wind / breath',
    altSpellings: 'Ik',
    note: 'Breath and word moving between households — air shared among relatives on the path.',
  },
  {
    sign: "Ak'b'al",
    meaning: 'Night',
    altSpellings: 'Akbal',
    note: 'The dark half of the day; time when elders gather and stories pass from one generation to the next.',
  },
  {
    sign: "K'an",
    meaning: 'Corn / seed',
    altSpellings: 'Kan',
    note: 'Tied to maize and sustenance. Contemporary Maya farmers still read sky cycles to plan planting alongside community calendars.',
  },
  {
    sign: 'Chikchan',
    meaning: 'Serpent',
    altSpellings: 'Chicchan',
    note: 'Movement along a path; knowledge carried by those who travel between communities.',
  },
  {
    sign: 'Kimi',
    meaning: 'Death / ancestors',
    altSpellings: 'Cimi',
    note: 'Memory of those who came before; continuity of the family line rather than an ending.',
  },
  {
    sign: "Manik'",
    meaning: 'Hand / deer',
    altSpellings: 'Manik',
    note: 'The grasping hand in classic day-sign charts — skilled work, care, and what the hands make for the household.',
  },
  {
    sign: 'Lamat',
    meaning: 'Venus / star',
    altSpellings: 'Lamat',
    note: 'A bright sky marker; rhythm of planting, harvest, and community planning through the seasons.',
  },
  {
    sign: 'Muluk',
    meaning: 'Water / jade',
    altSpellings: 'Muluc',
    note: 'Rain, rivers, and the bead-like forms associated with water and exchange.',
  },
  {
    sign: 'Ok',
    meaning: 'Dog',
    altSpellings: 'Oc',
    note: 'Companion on the road; loyalty between travelers and those who wait at home.',
  },
  {
    sign: 'Chuwen',
    meaning: 'Monkey / artisan',
    altSpellings: 'Chuen',
    note: 'Artistry and learning among siblings and young relatives; craft passed hand to hand.',
  },
  {
    sign: "Eb'",
    meaning: 'Road / stairway',
    altSpellings: 'Eb',
    note: 'Paths between villages; each step on a journey shared with kin.',
  },
  {
    sign: "B'en",
    meaning: 'Reed / staff',
    altSpellings: 'Ben',
    note: 'Upright growth; counsel spoken in council among the people.',
  },
  {
    sign: 'Ix',
    meaning: 'Jaguar',
    altSpellings: 'Ix',
    note: 'Strength of the forest; protection of territory held by the community.',
  },
  {
    sign: 'Men',
    meaning: 'Eagle',
    altSpellings: 'Men',
    note: 'Far sight over the land; a sign associated with messengers and wide horizons.',
  },
  {
    sign: "K'ib'",
    meaning: 'Vulture / wax / shell',
    altSpellings: 'Cib',
    note: 'Cycles of renewal; respect for what has been completed and returned to the community.',
  },
  {
    sign: "Kab'an",
    meaning: 'Earth / movement',
    altSpellings: 'Caban',
    note: 'Land held by the people; the shifting ground beneath fields and homes.',
  },
  {
    sign: "Etz'nab'",
    meaning: 'Flint / knife',
    altSpellings: 'Etznab',
    note: 'The knapped edge — clarity in decision, tool-making, and collective action.',
  },
  {
    sign: 'Kawak',
    meaning: 'Storm / rain',
    altSpellings: 'Cauac',
    note: 'Clouds and thunder; rain that feeds the milpa and the work of the season.',
  },
  {
    sign: 'Ajaw',
    meaning: 'Sun',
    altSpellings: 'Ahau',
    note: 'Daylight and the twentieth sign that completes the wheel — the same sign recorded at Long Count 0.0.0.0.0 as 4 Ajaw.',
  },
]

const esSigns: CountOfDaysSignCopy[] = [
  {
    sign: 'Imix',
    meaning: 'Cocodrilo / lirio de agua',
    altSpellings: 'Imix',
    note: 'Primero de los veinte signos del día. En formas de códice, una cúpula con flecos marca la apertura del ciclo de 20 días.',
  },
  {
    sign: "Ik'",
    meaning: 'Viento / aliento',
    altSpellings: 'Ik',
    note: 'Aliento y palabra que se mueven entre hogares — aire compartido entre parientes en el camino.',
  },
  {
    sign: "Ak'b'al",
    meaning: 'Noche',
    altSpellings: 'Akbal',
    note: 'La mitad oscura del día; tiempo en que los mayores se reúnen y las historias pasan de generación en generación.',
  },
  {
    sign: "K'an",
    meaning: 'Maíz / semilla',
    altSpellings: 'Kan',
    note: 'Ligado al maíz y al sustento. Campesinas y campesinos mayas contemporáneos aún leen ciclos del cielo para planear la siembra.',
  },
  {
    sign: 'Chikchan',
    meaning: 'Serpiente',
    altSpellings: 'Chicchan',
    note: 'Movimiento en un camino; conocimiento de quienes viajan entre comunidades.',
  },
  {
    sign: 'Kimi',
    meaning: 'Muerte / antepasados',
    altSpellings: 'Cimi',
    note: 'Memoria de quienes vinieron antes; continuidad de la línea familiar más que un final.',
  },
  {
    sign: "Manik'",
    meaning: 'Mano / venado',
    altSpellings: 'Manik',
    note: 'La mano que toma en cartas clásicas de signos del día — trabajo hábil, cuidado y lo que las manos hacen para el hogar.',
  },
  {
    sign: 'Lamat',
    meaning: 'Venus / estrella',
    altSpellings: 'Lamat',
    note: 'Marca brillante en el cielo; ritmo de siembra, cosecha y planificación comunitaria con las estaciones.',
  },
  {
    sign: 'Muluk',
    meaning: 'Agua / jade',
    altSpellings: 'Muluc',
    note: 'Lluvia, ríos y formas asociadas al agua y al intercambio.',
  },
  {
    sign: 'Ok',
    meaning: 'Perro',
    altSpellings: 'Oc',
    note: 'Compañía en el camino; lealtad entre quienes viajan y quienes esperan en casa.',
  },
  {
    sign: 'Chuwen',
    meaning: 'Mono / artesano',
    altSpellings: 'Chuen',
    note: 'Arte y aprendizaje entre hermanas, hermanos y parientes jóvenes; oficio que pasa de mano en mano.',
  },
  {
    sign: "Eb'",
    meaning: 'Camino / escalera',
    altSpellings: 'Eb',
    note: 'Senderos entre pueblos; cada paso en un viaje compartido con la parentela.',
  },
  {
    sign: "B'en",
    meaning: 'Caña / bastón',
    altSpellings: 'Ben',
    note: 'Crecimiento erguido; palabra hablada en consejo entre el pueblo.',
  },
  {
    sign: 'Ix',
    meaning: 'Jaguar',
    altSpellings: 'Ix',
    note: 'Fuerza del bosque; protección del territorio sostenido por la comunidad.',
  },
  {
    sign: 'Men',
    meaning: 'Águila',
    altSpellings: 'Men',
    note: 'Vista lejana sobre la tierra; signo asociado a mensajeros y horizontes amplios.',
  },
  {
    sign: "K'ib'",
    meaning: 'Buitre / cera / concha',
    altSpellings: 'Cib',
    note: 'Ciclos de renovación; respeto por lo que ya se cumplió y regresa a la comunidad.',
  },
  {
    sign: "Kab'an",
    meaning: 'Tierra / movimiento',
    altSpellings: 'Caban',
    note: 'Tierra sostenida por el pueblo; suelo que se mueve bajo campos y hogares.',
  },
  {
    sign: "Etz'nab'",
    meaning: 'Pedernal / cuchillo',
    altSpellings: 'Etznab',
    note: 'El filo tallado — claridad en la decisión, la herramienta y la acción colectiva.',
  },
  {
    sign: 'Kawak',
    meaning: 'Tormenta / lluvia',
    altSpellings: 'Cauac',
    note: 'Nubes y trueno; lluvia que alimenta la milpa y el trabajo de la temporada.',
  },
  {
    sign: 'Ajaw',
    meaning: 'Sol',
    altSpellings: 'Ahau',
    note: 'Luz del día y vigésimo signo que cierra la rueda — el mismo signo registrado en Long Count 0.0.0.0.0 como 4 Ajaw.',
  },
]

export const countOfDaysContent: Record<Lang, CountOfDaysPageCopy> = {
  en: {
    metaTitle: 'Count of Days | International Mayan League',
    metaDescription:
      'The 260-day Count of Days (Tzolk\'in): twenty day signs, thirteen numbers, and today\'s place in the Long Count — community timekeeping among Maya peoples.',
    kicker: 'Tzolk\'in · 260-day Count of Days',
    title: 'Count of Days',
    intro: [
      'Maya communities keep time through interlocking systems. The Long Count names long spans of years. The Count of Days — the 260-day Tzolk\'in — pairs thirteen numbers with twenty day signs so each day has a name like 4 Ajaw or 11 Chuwen.',
      'Maya writing uses hundreds of hieroglyphic signs rooted in spoken languages such as Yucatec, Ch\'olan, and Ch\'orti\'. Calendar signs appear on stone monuments, ceramics, and folded books called codices. Epigraphers read paired columns from left to right, top to bottom — the same order used on monuments such as Stela C at Quiriguá, Guatemala.',
      'Each day sign marks shared life: planting, travel, council, remembrance of ancestors, and work among siblings and relatives. This knowledge is carried by respected elders and learned within families — not imported labels from outside.',
    ],
    longCountNote:
      'The GMT correlation used here links Long Count 0.0.0.0.0 to 4 Ajaw 8 Kumk\'u — the same anchor date discussed in public education resources on reading calendar glyphs, including the Smithsonian National Museum of the American Indian\'s Living Maya Time project.',
    todayLabel: 'Today in the Count of Days',
    todayBody:
      'The coefficient and sign below are calculated from your local date when this page loads, using the standard 584283 correlation constant.',
    allSignsHeading: 'Twenty day signs',
    allSignsIntro:
      'Each sign repeats every twenty days while coefficients cycle one through thirteen, producing 260 unique day names before the pattern returns.',
    glyphFormsNote:
      'The glyph drawings on this page are simplified SVG interpretations inspired by classic day-sign forms in codices and teaching charts. They are not reproductions of individual monument carvings. For authoritative context on reading calendar glyphs, see the source link below.',
    badgeToday: 'Today\'s sign',
    sourcesHeading: 'Sources & credit',
    sourcesBody:
      'Calendar glyph education, Long Count context, and the relationship between hieroglyphic writing and living Maya communities are presented with depth in the Smithsonian National Museum of the American Indian\'s Living Maya Time resource:',
    sourcesLinkLabel: 'Reading the Calendar Glyphs — Living Maya Time (NMAI)',
    sourcesQuote:
      'Our spoken language and our glyphs are our identity. More and more, Maya people are interested in understanding our history that is recorded in the glyphs. Understanding implies engagement, respect, and appreciation of the legacy of our ancestors.',
    sourcesQuoteAttribution: 'Antonio Cuxil, Kaqchikel, cultural guide and epigrapher — via NMAI Living Maya Time',
    signs: enSigns,
  },
  es: {
    metaTitle: 'Cuenta de días | Liga Maya Internacional',
    metaDescription:
      'La Cuenta de días (Tzolk\'in) de 260 días: veinte signos, trece números y el lugar de hoy en el Long Count — tiempo comunitario entre pueblos mayas.',
    kicker: 'Tzolk\'in · Cuenta de días de 260 días',
    title: 'Cuenta de días',
    intro: [
      'Las comunidades mayas llevan el tiempo mediante sistemas entrelazados. El Long Count nombra tramos largos de años. La Cuenta de días — el Tzolk\'in de 260 días — combina trece números con veinte signos para que cada día tenga un nombre como 4 Ajaw u 11 Chuwen.',
      'La escritura maya usa cientos de signos jeroglíficos enraizados en lenguas habladas como el yucateco, el ch\'ol y el ch\'orti\'. Los signos del calendario aparecen en monumentos de piedra, cerámica y libros plegables llamados códices. Los epigrafistas leen columnas emparejadas de izquierda a derecha y de arriba abajo — el mismo orden usado en monumentos como la Estela C de Quiriguá, Guatemala.',
      'Cada signo del día marca la vida compartida: la siembra, el camino, el consejo, la memoria de los antepasados y el trabajo entre hermanas, hermanos y parientes. Este conocimiento lo portan personas mayores respetadas y se aprende en familia — no son etiquetas impuestas desde afuera.',
    ],
    longCountNote:
      'La correlación GMT usada aquí une Long Count 0.0.0.0.0 con 4 Ajaw 8 Kumk\'u — la misma fecha ancla que se discute en recursos públicos sobre lectura de glifos calendáricos, incluido el proyecto Living Maya Time del Smithsonian National Museum of the American Indian.',
    todayLabel: 'Hoy en la Cuenta de días',
    todayBody:
      'El coeficiente y el signo siguientes se calculan a partir de la fecha local al cargar esta página, usando la constante de correlación 584283.',
    allSignsHeading: 'Veinte signos del día',
    allSignsIntro:
      'Cada signo se repite cada veinte días mientras los coeficientes avanzan del uno al trece, produciendo 260 nombres únicos antes de que el patrón vuelva a empezar.',
    glyphFormsNote:
      'Los dibujos de glifos en esta página son interpretaciones SVG simplificadas inspiradas en formas clásicas de signos del día en códices y cartas didácticas. No son reproducciones de tallados monumentales individuales. Para contexto autorizado sobre lectura de glifos calendáricos, consulte el enlace de abajo.',
    badgeToday: 'Signo de hoy',
    sourcesHeading: 'Fuentes y crédito',
    sourcesBody:
      'La educación sobre glifos calendáricos, el contexto del Long Count y la relación entre escritura jeroglífica y comunidades mayas vivas se presenta con profundidad en el recurso Living Maya Time del Smithsonian National Museum of the American Indian:',
    sourcesLinkLabel: 'Reading the Calendar Glyphs — Living Maya Time (NMAI)',
    sourcesQuote:
      'Nuestro idioma hablado y nuestros glifos son nuestra identidad. Cada vez más, las personas mayas están interesadas en comprender nuestra historia registrada en los glifos. Comprender implica compromiso, respeto y aprecio por el legado de nuestros antepasados.',
    sourcesQuoteAttribution: 'Antonio Cuxil, kaqchikel, guía cultural y epigrafista — vía NMAI Living Maya Time',
    signs: esSigns,
  },
}

/** Canonical order matches DAY_SIGNS. */
export function getSignCopy(lang: Lang, sign: DaySign): CountOfDaysSignCopy {
  const copy = countOfDaysContent[lang].signs.find((s) => s.sign === sign)
  if (!copy) {
    const index = DAY_SIGNS.indexOf(sign)
    return countOfDaysContent[lang].signs[index]
  }
  return copy
}
