import type { Lang } from './i18n'

export type Localized<T> = Record<Lang, T>

export interface ContentLink {
  label: string
  href: string
}

export interface NarrativeSection {
  eyebrow?: string
  title: string
  body: string[]
  links?: ContentLink[]
}

export interface ProgramPageData {
  slug: string
  label: string
  eyebrow: string
  title: string
  intro: string
  heroImage?: string
  sections: NarrativeSection[]
  cta?: ContentLink
}

export interface MediaItem {
  title: string
  meta?: string
  excerpt?: string
  href?: string
}

export interface MediaPageData {
  slug: string
  label: string
  eyebrow: string
  title: string
  intro: string
  items: MediaItem[]
}

export interface ResourceCollectionData {
  slug: string
  label: string
  eyebrow: string
  title: string
  heroDek?: string
  intro: string[]
  links: ContentLink[]
}

export interface ResourceLanguageGroup {
  title: string
  links: ContentLink[]
}

export interface IndigenousLanguageResourceData {
  slug: string
  label: string
  eyebrow: string
  title: string
  intro: string[]
  credit: string
  download: ContentLink
  groups: ResourceLanguageGroup[]
}

export const programNav = [
  { label: 'Maya Cosmovision', href: '/maya-cosmovision' },
  { label: 'Human Rights and Advocacy', href: '/human-rights' },
  { label: 'Environmental Protection', href: '/environmental-protection' },
  { label: 'Immigration', href: '/immigration' },
  { label: 'Maya Women Delegation', href: '/maya-women-delegation' },
  { label: 'Gathering of Ancestral Wisdom', href: '/gathering-of-ancestral-wisdom' },
]

export const mediaNav = [
  { label: 'News', href: '/news' },
  { label: 'Videos', href: '/videos' },
]

export const resourceNav = [
  { label: 'LGBTQIA2S+', href: '/lgbtqia2s' },
  { label: 'Land Rights', href: '/land-rights' },
  { label: 'Sovereignty and Self-Determination', href: '/sovereignty-and-self-determination' },
  { label: 'Indigenous Language Resources', href: '/indigenous-language-resources' },
  { label: 'Indigenous Forced Migration', href: '/indigenous-forced-migration' },
  { label: 'Indigenous Children', href: '/indigenous-children' },
  { label: 'Indigenous Human Rights', href: '/indigenous-human-rights' },
]

export const uiCopy: Localized<{
  programs: string
  media: string
  resources: string
  viewPage: string
  openResource: string
  openStatement: string
  visitSource: string
  downloadResources: string
  resourceAreas: string
  resourceArchive: string
  statements: string
  bilingualStatements: string
  pdfDocuments: string
  pdfDocument: string
  webResource: string
  statementsIndexed: string
  viewStatements: string
  index: string
}> = {
  en: {
    programs: 'Programs',
    media: 'Media',
    resources: 'Resources',
    viewPage: 'View page',
    openResource: 'Open resource',
    openStatement: 'Open statement',
    visitSource: 'Visit source',
    downloadResources: 'Download resources',
    resourceAreas: 'Resource areas',
    resourceArchive: 'Statement archive',
    statements: 'statements',
    bilingualStatements: 'bilingual statements',
    pdfDocuments: 'PDF documents',
    pdfDocument: 'PDF document',
    webResource: 'Resource',
    statementsIndexed: 'statements indexed',
    viewStatements: 'View our statements below to learn more.',
    index: 'Index',
  },
  es: {
    programs: 'Programas',
    media: 'Medios',
    resources: 'Recursos',
    viewPage: 'Ver página',
    openResource: 'Abrir recurso',
    openStatement: 'Abrir declaración',
    visitSource: 'Visitar fuente',
    downloadResources: 'Descargar recursos',
    resourceAreas: 'Áreas de recursos',
    resourceArchive: 'Archivo de declaraciones',
    statements: 'declaraciones',
    bilingualStatements: 'declaraciones bilingües',
    pdfDocuments: 'documentos PDF',
    pdfDocument: 'documento PDF',
    webResource: 'Recurso',
    statementsIndexed: 'declaraciones indexadas',
    viewStatements: 'Vea nuestras declaraciones a continuación para conocer más.',
    index: 'Índice',
  },
}

export const programPages: Localized<Record<string, ProgramPageData>> = {
  en: {
    'maya-cosmovision': {
      slug: 'maya-cosmovision',
      label: 'Maya Cosmovision',
      eyebrow: 'Maya Cosmovision',
      title: 'Maya Cosmovision',
      intro:
        'Our connection to the world and the cosmos are the basis of our action, of our thoughts, and our sentiments in life and of life.',
      heroImage: '/site-images/maya-cosmovision-hero.webp',
      sections: [
        {
          title: 'Science and spirituality',
          body: [
            'The Maya civilization is one of the oldest civilizations of Abya Yala having made significant contributions to the world in mathematics, science, astronomy, medicine, architecture, agriculture, and other fields of study.',
            'Our scientific contributions are rooted in spiritual elements because to us spirituality is in science and science is in spirituality. Cosmovision and spirituality are a simultaneous experience, acting at the same time, myth and history, death and resurrection.',
            'These expressions of science and spirituality can be found in our astronomy, mathematics, architecture, agricultural systems, medicine, and understanding of the cycles of time, the life of nature and humans, and the relationships between the movements of the stars, the sun, and the moon.',
          ],
        },
        {
          title: 'Our philosophy of work expressed as art',
          body: [
            'Just as we are committed to creating a permanent link between our contemporary world and ancestral traditions, our work and vision also embody these principles.',
            'In the Center lies the Temple of the Jaguar in Tikal surrounded by the tree of life - the Ceiba, and the great elders, JunAjpu e IxbalamKej.',
            'The Four Energies represented in the outer circle are our programmatic areas of work. No’j is the Ancestral Knowledge and Cosmovision which is the basis for our actions.',
          ],
        },
        {
          title: 'Today',
          body: [
            'The current generation is working hard to keep all these values alive through workshops, conferences, seminars, Maya summits, ceremonies, and philosophical and scientific studies of the Mayan calendar and epigraphy.',
            'The Mayan League works to recover and preserve ancestral knowledge and values so that the Maya, particularly the Maya living outside of the traditional Maya territory, can be dynamic conservers of their own culture, history, and traditions.',
          ],
        },
      ],
    },
    'human-rights': {
      slug: 'human-rights',
      label: 'Human Rights and Advocacy',
      eyebrow: 'Programs',
      title: 'Human Rights and Advocacy',
      intro:
        'The Mayan League seeks to assist Maya leaders to fully engage in human rights fora and use existing human rights mechanisms to safeguard their rights.',
      sections: [
        {
          title: 'Indigenous Peoples',
          body: [
            'The historical roots of the innumerable human rights violations that have oppressed the Maya stem from structural economic, political, and judicial inequalities toward the Maya since the arrival of the Spanish in 1524.',
            'At the height of contemporary violations, more than 200,000 people were either killed or disappeared through State-sponsored policies over 36 years; the Maya were victims of a genocide that has yet to be recognized.',
            'Faced with this history of violence and dispossession, and aware of the strength and resilience of the Maya, the Mayan League works to ensure that the historical roots of the many centuries of conflict are addressed jointly with the Maya directly impacted by the genocide, forced displacement, and state-sponsored violations.',
            'The Maya have survived despite centuries of oppression and discrimination and gross human rights violations. The Maya have defended their lands, territories, and goods of the earth, and conserved their spiritual and traditional practices, languages and ways of life and have much to contribute to humanity for a balanced and sustainable life.',
          ],
        },
        {
          title: "Indigenous Women's rights",
          body: [
            'Maya women historically held important societal positions and enjoyed high level political status in Maya society.',
            'Women have experienced diverse forms of violations including physical, mental, sexual, and spiritual violence. The violations experienced by Maya women has had severe consequences to their individual and collective rights, hindered their full participation in society, and prevented the full realization of their rights.',
            'The Mayan League works with Maya women to jointly create proposals and mechanisms that will allow Maya women to regain the social position they possessed historically.',
          ],
        },
      ],
    },
    'environmental-protection': {
      slug: 'environmental-protection',
      label: 'Environmental Protection',
      eyebrow: 'Programs',
      title: 'Environmental Protection',
      intro: 'Living in harmony with Mother Earth',
      sections: [
        {
          title: 'Living in harmony with Mother Earth',
          body: [
            'The Maya have a special relationship with Mother Earth and Mother Nature. We defend her because she is our mother, and it is because of her that the dream of the Maya is to remain connected to the land and to our origins and life.',
            'Our connection with Mother Nature and the traditional knowledge, history, and ceremonies that are born from this relationship allow us to conserve and protect our lands, territories, and natural sacred elements.',
            'Our stewardship of the earth has placed us at great risk against multinational and domestic companies encroaching on our ancestral lands as they look to implement large-scale extraction and infrastructure development projects.',
          ],
        },
        {
          title: 'Shareholder Advocacy Leadership Training Center',
          body: [
            'The Mayan League as a grantee of First Peoples Worldwide, is working to create a space with the Maya and other indigenous peoples to come together and discuss the threats affecting our lands, territories and goods of the earth.',
            'Through the Shareholder Advocacy Leadership Training Center, our goal is to facilitate the development of a Regional Hub to exchange information and experiences, provide technical assistance, and strengthen existing networks.',
            'This advocacy aims to support traditional authorities, elders, and spiritual leaders from Mexico and Guatemala who are defending the rights of our peoples and the rights of the earth while facing intimidation, criminalization, and assassination for their leadership.',
          ],
        },
      ],
    },
    immigration: {
      slug: 'immigration',
      label: 'Immigration',
      eyebrow: 'Programs',
      title: 'Immigration',
      intro: 'The past and present are connected by forced displacement.',
      sections: [
        {
          title: 'The past and present are connected by forced displacement',
          body: [
            'The defense of our lands and territories is fundamental but we also understand that there have been various consequences from these long-standing conflicts, in particular the forced displacement of indigenous peoples.',
            'Many people from Mexico and Central America were forced to flee between the 1970s - 1990s due to civil wars, dictatorships and genocide in the region. Indigenous peoples in Guatemala were some of the most affected as we were specifically targeted under the state sponsored genocide and scorched earth policy.',
            'In the United States, a framework of extreme rhetoric, racism, discrimination, and fear against "immigrants" has made it even more important to advocate with our communities.',
            'We as indigenous peoples are invisible because we are classified as Hispanics or Latinos and not recognized as being part of an indigenous Nation. In turn, our communities are often forgotten, lost and isolated within a complex and frightening immigration system.',
          ],
        },
        {
          title: 'Invisible in plain sight',
          body: [
            'The escalating human rights violations at the border have caught media attention and created broader awareness of immigrants’ rights but have shed very little light on our indigenous relatives.',
            'There is a deep misconception and confusion about our people amounting to a lack of awareness that we are part of the wave of forced migration, resulting in a critical void in specific resources and tailored assistance.',
            'Faced by this situation, the International Mayan League is organizing with allied indigenous leaders to address the situation confronting our people.',
            'We know this situation is long-term, just like forced migration has been occurring for decades, if not centuries, for indigenous peoples.',
          ],
        },
      ],
    },
    'maya-women-delegation': {
      slug: 'maya-women-delegation',
      label: 'Maya Women Delegation',
      eyebrow: 'Programs',
      title: 'Maya Women Delegation',
      intro: 'Maya Women Provided Indigenous Language Services at U.S./Mexico Border',
      sections: [
        {
          title: 'Indigenous language services at the border',
          body: [
            'The Maya Women Interpreter Delegation traveled to Tucson Arizona with allies on April 24th- 28th to provide Indigenous Language Services at Casa Alitas, at the U.S./Mexico border.',
            'We express our deep respect and gratitude to Alida, Maria, and Nana Teresa - the Maya women interpreters of this delegation who are elders, healers, mothers, and aunties.',
            'The delegation was the first step for future actions – this is just the beginning of broader strategic work.',
          ],
        },
        {
          title: 'Invisible in plain sight',
          body: [
            'The International Mayan League has been working with our community, the Maya diaspora, for many years.',
            'The media when reporting the deaths of Maya children and youth has often failed to shed light on the indigenous identity of the victims.',
            'Our people have remained invisible in plain sight despite the high profile deaths that have occurred, simply because the dominant narrative has mislabeled us as Latino or Hispanic.',
          ],
        },
        {
          title: 'Roadmap of needed work',
          body: [
            'One of the key outcomes of the consultation was the identified urgent need for the creation of indigenous language resources that could be used even without the presence of an indigenous language interpreter.',
            'The meeting generated a rich first point of contact and information that helped create a draft roadmap of needed work including development of indigenous language materials and resources, increased trained indigenous language interpreters, a policy strategy from an indigenous human rights perspective, and the use of international human rights mechanisms for advocacy and action.',
          ],
        },
      ],
    },
    'gathering-of-ancestral-wisdom': {
      slug: 'gathering-of-ancestral-wisdom',
      label: 'Gathering of Ancestral Wisdom',
      eyebrow: 'Programs',
      title: 'Ancestral Wisdom for the Defense of Life, Mother Earth and her Natural Elements',
      intro:
        'Maya Ancestral Authorities from diverse Maya nations of Mexico and Guatemala convened a three-day meeting in Chiapas, Mexico.',
      sections: [
        {
          title: 'February 12-14, 2016',
          body: [
            'Maya Ancestral Authorities from diverse Maya nations of Mexico and Guatemala convened a three-day meeting titled, Ancestral Wisdom for the Defense of Life, Mother Earth, and her Natural Elements on February 12, 13, 14 of 2016 in Chiapas, Mexico.',
            'This gathering was held in response to the urgent threats in the region due to hundreds of development projects causing environmental destrcution and violating the rights of the Maya people and Mother Earth.',
            'We joined together in dialogue to address the root causes affecting our communities and jointly declared our unity to continue addressing these threats.',
          ],
        },
        {
          title: 'Maya Nations call for the protection and defense of Mother Earth',
          body: [
            'The gathering is in response to the threats in the region due to the hundreds of development projects cuasing environmental destrucion and violating the rights of the Maya peoples and Mother Earth.',
            'In his Encyclical, the Pope called for indigenous peoples to be the "principle dialogue partners especially when large projects on their lands are proposed."',
          ],
        },
      ],
    },
  },
  es: {
    'maya-cosmovision': {
      slug: 'maya-cosmovision',
      label: 'Cosmovisión Maya',
      eyebrow: 'Cosmovisión Maya',
      title: 'Cosmovisión Maya',
      intro:
        'Nuestra conexión con el mundo y el cosmos es la base de nuestra acción, de nuestros pensamientos y de nuestros sentimientos en la vida y de la vida.',
      heroImage: '/site-images/maya-cosmovision-hero.webp',
      sections: [
        {
          title: 'Ciencia y espiritualidad',
          body: [
            'La civilización Maya es una de las civilizaciones más antiguas de Abya Yala y ha hecho contribuciones significativas al mundo en matemáticas, ciencia, astronomía, medicina, arquitectura, agricultura y otros campos.',
            'Nuestras contribuciones científicas están arraigadas en elementos espirituales porque para nosotros la espiritualidad está en la ciencia y la ciencia está en la espiritualidad.',
            'Estas expresiones de ciencia y espiritualidad se encuentran en nuestra astronomía, matemáticas, arquitectura, sistemas agrícolas, medicina y comprensión de los ciclos del tiempo.',
          ],
        },
        {
          title: 'Nuestra filosofía de trabajo expresada como arte',
          body: [
            'Así como estamos comprometidos a crear un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales, nuestro trabajo y visión también encarnan estos principios.',
            'En el centro se encuentra el Templo del Jaguar en Tikal rodeado por el árbol de la vida, la Ceiba, y por los grandes ancestros JunAjpu e IxbalamKej.',
            'Las Cuatro Energías representadas en el círculo exterior son nuestras áreas programáticas de trabajo. No’j es el conocimiento ancestral y la cosmovisión que guía nuestras acciones.',
          ],
        },
        {
          title: 'Hoy',
          body: [
            'La generación actual trabaja arduamente para mantener vivos estos valores mediante talleres, conferencias, seminarios, encuentros mayas, ceremonias y estudios filosóficos y científicos del calendario Maya y la epigrafía.',
            'La Liga Maya trabaja para recuperar y preservar el conocimiento y los valores ancestrales para que el Pueblo Maya, especialmente quienes viven fuera del territorio tradicional Maya, puedan conservar dinámicamente su cultura, historia y tradiciones.',
          ],
        },
      ],
    },
    'human-rights': {
      slug: 'human-rights',
      label: 'Derechos Humanos e Incidencia',
      eyebrow: 'Programas',
      title: 'Derechos Humanos e Incidencia',
      intro:
        'La Liga Maya busca apoyar a líderes Mayas para participar plenamente en foros de derechos humanos y utilizar mecanismos existentes para proteger sus derechos.',
      sections: [
        {
          title: 'Pueblos Indígenas',
          body: [
            'Las raíces históricas de las innumerables violaciones de derechos humanos que han oprimido al Pueblo Maya surgen de desigualdades económicas, políticas y judiciales estructurales desde la llegada de los españoles en 1524.',
            'En el punto más alto de las violaciones contemporáneas, más de 200,000 personas fueron asesinadas o desaparecidas durante 36 años de políticas patrocinadas por el Estado; el Pueblo Maya fue víctima de un genocidio que aún no ha sido reconocido.',
            'Ante esta historia de violencia y despojo, y conscientes de la fuerza y resiliencia del Pueblo Maya, la Liga Maya trabaja para abordar estas raíces históricas junto a las comunidades directamente afectadas.',
            'El Pueblo Maya ha sobrevivido siglos de opresión, discriminación y graves violaciones de derechos humanos, y tiene mucho que aportar a la humanidad para una vida equilibrada y sostenible.',
          ],
        },
        {
          title: 'Derechos de las mujeres indígenas',
          body: [
            'Históricamente, las mujeres Mayas ocuparon posiciones sociales importantes y gozaron de un alto estatus político dentro de la sociedad Maya.',
            'Las mujeres han experimentado diversas formas de violaciones físicas, mentales, sexuales y espirituales que han afectado sus derechos individuales y colectivos.',
            'La Liga Maya trabaja con mujeres Mayas para crear propuestas y mecanismos que les permitan recuperar la posición social que históricamente tuvieron.',
          ],
        },
      ],
    },
    'environmental-protection': {
      slug: 'environmental-protection',
      label: 'Protección Ambiental',
      eyebrow: 'Programas',
      title: 'Protección Ambiental',
      intro: 'Vivir en armonía con la Madre Tierra',
      sections: [
        {
          title: 'Vivir en armonía con la Madre Tierra',
          body: [
            'El Pueblo Maya tiene una relación especial con la Madre Tierra y la Madre Naturaleza. La defendemos porque es nuestra madre, y por ella el sueño Maya es permanecer conectado con la tierra, nuestros orígenes y la vida.',
            'Nuestra conexión con la Madre Naturaleza y los conocimientos, historia y ceremonias que nacen de esta relación nos permiten conservar y proteger nuestras tierras, territorios y elementos sagrados naturales.',
            'Nuestra custodia de la tierra nos ha puesto en gran riesgo frente a empresas multinacionales y nacionales que invaden nuestras tierras ancestrales para implementar proyectos de extracción e infraestructura a gran escala.',
          ],
        },
        {
          title: 'Centro de Capacitación en Liderazgo de Incidencia de Accionistas',
          body: [
            'La Liga Maya, como beneficiaria de First Peoples Worldwide, trabaja para crear un espacio donde el Pueblo Maya y otros pueblos indígenas puedan reunirse y discutir las amenazas que afectan nuestras tierras, territorios y bienes de la tierra.',
            'Nuestro objetivo es facilitar el desarrollo de un centro regional para intercambiar información y experiencias, brindar asistencia técnica y fortalecer redes existentes.',
            'Esta incidencia apoya a autoridades tradicionales, mayores y líderes espirituales de México y Guatemala que defienden los derechos de nuestros pueblos y de la tierra.',
          ],
        },
      ],
    },
    immigration: {
      slug: 'immigration',
      label: 'Migración',
      eyebrow: 'Programas',
      title: 'Migración',
      intro: 'El pasado y el presente están conectados por el desplazamiento forzado.',
      sections: [
        {
          title: 'El pasado y el presente están conectados por el desplazamiento forzado',
          body: [
            'La defensa de nuestras tierras y territorios es fundamental, pero también entendemos que estos conflictos de larga duración han tenido diversas consecuencias, en particular el desplazamiento forzado de pueblos indígenas.',
            'Muchas personas de México y Centroamérica fueron obligadas a huir entre las décadas de 1970 y 1990 debido a guerras civiles, dictaduras y genocidio en la región.',
            'En los Estados Unidos, un marco de retórica extrema, racismo, discriminación y miedo contra las personas inmigrantes hace aún más importante la defensa junto a nuestras comunidades.',
            'Como pueblos indígenas seguimos siendo invisibles porque se nos clasifica como hispanos o latinos y no se reconoce que somos parte de una Nación indígena.',
          ],
        },
        {
          title: 'Invisibles a plena vista',
          body: [
            'Las crecientes violaciones de derechos humanos en la frontera han captado atención mediática y han creado conciencia sobre los derechos de las personas inmigrantes, pero han arrojado muy poca luz sobre nuestros familiares indígenas.',
            'Existe una profunda confusión sobre nuestros pueblos, lo que genera una falta crítica de recursos específicos y asistencia adecuada.',
            'Ante esta situación, la Liga Maya Internacional se organiza con líderes indígenas aliados para responder a la realidad que enfrentan nuestros pueblos.',
            'Sabemos que esta situación es de largo plazo, así como el desplazamiento forzado ha ocurrido durante décadas, si no siglos, para los pueblos indígenas.',
          ],
        },
      ],
    },
    'maya-women-delegation': {
      slug: 'maya-women-delegation',
      label: 'Delegación de Mujeres Mayas',
      eyebrow: 'Programas',
      title: 'Delegación de Mujeres Mayas',
      intro: 'Mujeres Mayas brindaron servicios de idiomas indígenas en la frontera entre Estados Unidos y México',
      sections: [
        {
          title: 'Servicios de idiomas indígenas en la frontera',
          body: [
            'La Delegación de Mujeres Intérpretes Mayas viajó a Tucson, Arizona, con aliadas y aliados del 24 al 28 de abril para brindar servicios de idiomas indígenas en Casa Alitas, en la frontera entre Estados Unidos y México.',
            'Expresamos profundo respeto y gratitud a Alida, María y Nana Teresa, las intérpretes Mayas de esta delegación, quienes son mayores, sanadoras, madres y tías.',
            'La delegación fue el primer paso para acciones futuras; este es solo el comienzo de un trabajo estratégico más amplio.',
          ],
        },
        {
          title: 'Invisibles a plena vista',
          body: [
            'La Liga Maya Internacional ha trabajado con nuestra comunidad, la diáspora Maya, durante muchos años.',
            'Cuando los medios informan sobre la muerte de niñas, niños y jóvenes Mayas, con frecuencia no visibilizan su identidad indígena.',
            'Nuestros pueblos han permanecido invisibles a plena vista porque la narrativa dominante nos etiqueta erróneamente como latinos o hispanos.',
          ],
        },
        {
          title: 'Hoja de ruta del trabajo necesario',
          body: [
            'Uno de los resultados clave de la consulta fue identificar la necesidad urgente de crear recursos en idiomas indígenas que puedan usarse incluso sin la presencia de una persona intérprete indígena.',
            'La reunión ayudó a crear una hoja de ruta que incluye materiales y recursos en idiomas indígenas, más intérpretes capacitados, una estrategia de política desde una perspectiva de derechos humanos indígenas y el uso de mecanismos internacionales de derechos humanos.',
          ],
        },
      ],
    },
    'gathering-of-ancestral-wisdom': {
      slug: 'gathering-of-ancestral-wisdom',
      label: 'Encuentro de Sabiduría Ancestral',
      eyebrow: 'Programas',
      title: 'Sabiduría Ancestral para la Defensa de la Vida, la Madre Tierra y sus Elementos Naturales',
      intro:
        'Autoridades Ancestrales Mayas de diversas naciones Mayas de México y Guatemala convocaron un encuentro de tres días en Chiapas, México.',
      sections: [
        {
          title: '12 al 14 de febrero de 2016',
          body: [
            'Autoridades Ancestrales Mayas de diversas naciones Mayas de México y Guatemala convocaron un encuentro de tres días titulado Sabiduría Ancestral para la Defensa de la Vida, la Madre Tierra y sus Elementos Naturales.',
            'Este encuentro se realizó en respuesta a amenazas urgentes en la región por cientos de proyectos de desarrollo que causan destrucción ambiental y violan los derechos del Pueblo Maya y de la Madre Tierra.',
            'Nos reunimos en diálogo para abordar las causas raíz que afectan a nuestras comunidades y declaramos conjuntamente nuestra unidad para continuar enfrentando estas amenazas.',
          ],
        },
        {
          title: 'Las Naciones Mayas llaman a proteger y defender a la Madre Tierra',
          body: [
            'El encuentro respondió a amenazas regionales causadas por cientos de proyectos que destruyen el ambiente y violan los derechos de los pueblos Mayas y de la Madre Tierra.',
            'En su Encíclica, el Papa llamó a los pueblos indígenas a ser los principales interlocutores, especialmente cuando se proponen grandes proyectos en sus tierras.',
          ],
        },
      ],
    },
  },
}

export const programsIndex: Localized<ProgramPageData> = {
  en: {
    slug: 'programs',
    label: 'Programs',
    eyebrow: 'Programs',
    title: 'The current generation is working hard to keep all these values alive.',
    intro:
      'The new generation is receiving teachings from the elders to keep this great knowledge alive in order to transmit it to future generations for the benefit of our people and all of humanity.',
    sections: programNav.map((item) => {
      const slug = item.href.replace(/^\//, '')
      const program = programPages.en[slug]

      return {
        title: program.label,
        body: [program.intro],
        links: [item],
      }
    }),
  },
  es: {
    slug: 'programs',
    label: 'Programas',
    eyebrow: 'Programas',
    title: 'La generación actual trabaja arduamente para mantener vivos estos valores.',
    intro:
      'La nueva generación recibe enseñanzas de las y los mayores para mantener vivo este gran conocimiento y transmitirlo a futuras generaciones para beneficio de nuestros pueblos y de toda la humanidad.',
    sections: programNav.map((item) => {
      const slug = item.href.replace(/^\//, '')
      const program = programPages.es[slug]

      return {
        title: program.label,
        body: [program.intro],
        links: [item],
      }
    }),
  },
}

const newsItemsEn: MediaItem[] = [
  {
    title: 'Protesters demand protection for indigenous migrant children',
    meta: 'By Josephine Chu and Thomas Ilalaole | Jul 9, 2019 | Immigration',
    excerpt:
      'Nearly 150 people protested outside the U.S. Customs and Border Protection building Tuesday, chanting “down with deportation” and demanding better monitoring of border detention centers and access to indigenous language translators.',
    href: 'https://dc.medill.northwestern.edu/blog/2019/07/09/protesters-demand-protection-for-indigenous-migrant-children/#sthash.K96fgxkO.dpbs',
  },
  {
    title: 'Amazonia Synod 7: Laudato Si and the Synod on the Amazon',
    meta: 'By Scott Wright, Jun 2nd, 2019',
    excerpt:
      'Each indigenous child whose life was stolen was forced to migrate, because they are the most affected by centuries of structural inequality and discrimination in Guatemala.',
    href: 'https://www.indcatholicnews.com/news/37214',
  },
  {
    title: 'Who Killed Claudia Gomez?',
    meta: 'By Lauren Bohn, May 1, 2019',
    excerpt:
      'A year ago this month, a 20-year-old Guatemalan woman seeking opportunity in the U.S. was shot dead by a Border Patrol agent in Texas.',
    href: 'https://www.marieclaire.com/politics/a27319518/claudia-gomez-killed-mexico-us-border-by-border-patrol-agent/',
  },
  {
    title: 'Report: Department of Homeland Security is ill-equipped to protect the lives indigenous immigrants',
    meta: 'By Rebekah Entralgo, Feb 21, 2019',
    excerpt:
      'The language barriers between officials from the Department of Homeland Security and indigenous immigrant and asylum seekers have life-or-death consequences.',
    href: 'https://archive.thinkprogress.org/homeland-security-language-barriers-immigrants-38a0b4b0d071/',
  },
  {
    title: 'Art Can Transform the World',
    meta: 'Wednesday, September 13, 2017',
    excerpt:
      'The Grupo Sotz’il performed “Uk’u’x Ulew: Heart of the Earth” in Centreville’s Historic District.',
    href: 'https://www.connectionnewspapers.com/news/2017/sep/13/art-can-transform-world/',
  },
  {
    title: 'In Defense of Land and Water, From Standing Rock to Guatemala',
    meta: 'By Jeff Abbott, 9 August 2017',
    excerpt:
      'The defense of water knows no borders, according to the Mayan Ancestral Authorities.',
    href: 'https://remezcla.com/culture/mayan-elders-guatemala-standing-rock-solidarity-nodapl/',
  },
]

export const mediaPages: Localized<Record<string, MediaPageData>> = {
  en: {
    news: {
      slug: 'news',
      label: 'News',
      eyebrow: 'Media',
      title: 'Perspectives and Analysis from our Nation',
      intro: 'News and analysis featuring the International Mayan League and issues affecting our peoples.',
      items: newsItemsEn,
    },
    videos: {
      slug: 'videos',
      label: 'Videos',
      eyebrow: 'Media',
      title: 'Videos from Our YouTube Channel',
      intro: 'Videos from Our YouTube Channel.',
      items: [
        { title: "VIDEO DE SEGUIMIENTO COVID-19 EN MAYA K'ICHE'" },
        { title: 'Información de Seguimiento COVID-19 - Maya Ixil' },
        { title: 'Mensaje de agradecimiento - Volcán de Fuego THANK YOU MESSAGE VOLCAN DE FUEGO' },
        { title: 'Restoring our Ancestral Knowledge - Subtitled Video - please click on the (CC) subtitle option.' },
        { title: 'Conozca sus derechos - Anuncio en idioma Maya Mam' },
        { title: 'Conozca sus derechos - Anuncio en idioma Maya Ixil' },
        { title: 'Grandfather Phil Little Thunder' },
        { title: 'Mayan League Interview' },
        { title: 'Intervención de Nana Ana Laynez Herrera' },
      ],
    },
  },
  es: {
    news: {
      slug: 'news',
      label: 'Noticias',
      eyebrow: 'Medios',
      title: 'Perspectivas y análisis desde nuestra Nación',
      intro: 'Noticias y análisis sobre la Liga Maya Internacional y los temas que afectan a nuestros pueblos.',
      items: newsItemsEn.map((item) => ({
        ...item,
        meta: item.meta,
        excerpt:
          item.title === 'Who Killed Claudia Gomez?'
            ? 'Hace un año, una mujer guatemalteca de 20 años que buscaba oportunidades en Estados Unidos fue asesinada por un agente de la Patrulla Fronteriza en Texas.'
            : item.excerpt,
      })),
    },
    videos: {
      slug: 'videos',
      label: 'Videos',
      eyebrow: 'Medios',
      title: 'Videos de nuestro canal de YouTube',
      intro: 'Videos de nuestro canal de YouTube.',
      items: [
        { title: "VIDEO DE SEGUIMIENTO COVID-19 EN MAYA K'ICHE'" },
        { title: 'Información de Seguimiento COVID-19 - Maya Ixil' },
        { title: 'Mensaje de agradecimiento - Volcán de Fuego THANK YOU MESSAGE VOLCAN DE FUEGO' },
        { title: 'Restaurando nuestro conocimiento ancestral - video subtitulado; active la opción (CC).' },
        { title: 'Conozca sus derechos - Anuncio en idioma Maya Mam' },
        { title: 'Conozca sus derechos - Anuncio en idioma Maya Ixil' },
        { title: 'Grandfather Phil Little Thunder' },
        { title: 'Entrevista con la Liga Maya' },
        { title: 'Intervención de Nana Ana Laynez Herrera' },
      ],
    },
  },
}

export const resourceCollections: Localized<Record<string, ResourceCollectionData>> = {
  en: {
    lgbtqia2s: {
      slug: 'lgbtqia2s',
      label: 'LGBTQIA2S+',
      eyebrow: 'Resources',
      title: 'LGBTQIA2S+',
      heroDek:
        'Support for Indigenous LGBTQIA2S+ migrants through cultural accompaniment, interpretation, and community workshops in Abiayala.',
      intro: [
        'Since 2020, with the COVID-19 pandemic, Indigenous migrants from the LGTBS2+ community have been increasing, settling in states such as Virginia.',
        'The Mayan League has been aware of the situation of LGBTQ2s+ migrant relatives. To address their trauma, the International Mayan League has been providing support through cultural accompaniment, interpretation, as well as developing workshops on sexual diversity in Abiayala (October 22, 2022) to generate awareness and alliances among community members.',
      ],
      links: [
        { label: 'IML Indigenous Sexual Diversity (ENGLISH)', href: 'https://www.mayanleague.org/s/English-Declaration_FINAL.pdf' },
        { label: 'Liga maya la diversidad sexual INDÍGENA (ESPAÑOL)', href: 'https://www.mayanleague.org/s/Declaracion-_Espanol_FINAL.pdf' },
      ],
    },
    'land-rights': {
      slug: 'land-rights',
      label: 'Land Rights',
      eyebrow: 'Resources',
      title: 'Land Rights',
      heroDek: 'Statements on territory, extractivism, and the defense of Maya Q’eqchi’ land and life.',
      intro: ['View our statements below to learn more:'],
      links: [
        { label: "illegal evictions of buena vista maya q'eqchi' community", href: '/land-rights' },
        { label: 'WE CONDEMN STATE SPONSORED REPRESSION AGAINST THE MAYA Q’EQCHI’ NATION IN CHAPÍN ABAJO, EL ESTOR, IZABAL, GUATEMALA', href: 'https://www.mayanleague.org/s/We-condemn-State-Sponsored-Repression_FINAL1272022-2.pdf' },
        { label: 'WE CONDEMN THE EVICTION OF THE Q’EQCHI’ MAYA COMMUNITY OF BUENA VISTA (EspaÑol)', href: 'https://www.mayanleague.org/s/CONDENAMOS-EL-DESALOJO-DE-LA-COMUNIDAD-BUENA-VISTA.pdf' },
        { label: 'EXTRACTIVISM AND CLIMATE INJUSTICE: Indigenous Migration in Abiayala', href: 'https://www.mayanleague.org/s/EXTRACTIVISM-AND-CLIMATE-INJUSTICE-Indigenous-Migration-in-Abiayala-1.pdf' },
      ],
    },
    'sovereignty-and-self-determination': {
      slug: 'sovereignty-and-self-determination',
      label: 'Sovereignty and Self-Determination',
      eyebrow: 'Resources',
      title: 'Sovereignty and Self-Determination',
      heroDek: 'Solidarity statements on sovereignty, self-determination, and Indigenous resistance across Abiayala.',
      intro: ['View our statements below to learn more:'],
      links: [
        { label: 'Statement of Solidarity Regarding the Dakota Access Pipeline Project (espaÑol)', href: 'https://www.mayanleague.org/s/Declaracion-de-Solidaridad-con-Firma.pdf' },
        { label: 'Statement of Solidarity Regarding the Dakota Access Pipeline Project (english)', href: '/sovereignty-and-self-determination' },
        { label: 'END GENOCIDE OF THE PALESTINIAN PEOPLE', href: 'https://www.mayanleague.org/s/INDIGENOUS-SOLIDARITY_-END-GENOCIDE-AGAINST-THE-PALESTINIAN-PEOPLE-d6xd.pdf' },
      ],
    },
    'indigenous-forced-migration': {
      slug: 'indigenous-forced-migration',
      label: 'Indigenous Forced Migration',
      eyebrow: 'Resources',
      title: 'Indigenous Forced Migration',
      heroDek:
        'Research, testimonies, and lived experiences on the root drivers of Indigenous forced migration across Turtle Island.',
      intro: [
        'What causes Indigenous Peoples to migrate? The resources on this page offer insight on this invisibilized crisis through research, testimonies and lived experiences.',
        'Learn about the root drivers of forced migration and the policies that dispossess Indigenous Peoples across Abiayala.',
      ],
      links: [
        { label: 'ACNUR Letter regarding displaced indigenous peoples (espaÑol)', href: 'https://www.mayanleague.org/s/FINAL-CARTA-ONU_FIRMAS_2017.pdf' },
        { label: 'UN Submission: colonial states are killing our indigenous identities', href: 'https://www.mayanleague.org/s/ColonialStatesKillOurIdentitiesAndOurPeoples_UNPFII-2023-intervencion_MayanLeague.pdf' },
        { label: 'scotus ruling on migrant protection protocols', href: 'https://www.mayanleague.org/s/THE-INTERNATIONAL-MAYAN-LEAGUE-WELCOMES-THE-SCOTUS-RULING-ON-MPP.pdf' },
        { label: 'indigenous peoples demand justice (espaÑol)', href: 'https://www.mayanleague.org/s/Los-pueblos-indigenas-exigen-justicia-en-el-Dia-Internacional-del-Migrante-12_18_21.pdf' },
        { label: 'indigenous peoples living in urban areas', href: 'https://www.mayanleague.org/s/HR_Urban-Areas_Submission_FINAL.pdf' },
        { label: 'colonial states and inhumane policies kill (English)', href: 'https://www.mayanleague.org/s/COLONIAL-STATES-AND-INHUMANE-IMMIGRATION-POLICIES-KILL-THIS-IS-PROOF.pdf' },
        { label: 'colonial states and inhumane policies kill (espaÑol)', href: 'https://www.mayanleague.org/s/Comunicado-de-Solidaridad_PLM_LigaMaya_2023.pdf' },
        { label: 'indigenous migration fact sheet', href: 'https://www.mayanleague.org/s/FACT-SHEET_INDIGENOUS-MIGRATION-AND-THE-US-IMMIGRATION-SYSTEM_22224.pdf' },
        { label: 'we denounce the raids terrorizing our communities', href: 'https://www.mayanleague.org/s/Comunidad-Sol-x-Mayan-League-Aug-9-Statement.pdf' },
        { label: 'Forced Migration and Maya Resistance From Turtle Island', href: 'https://www.mayanleague.org/s/Guatemalan-Colonial-State-Forced-Migration-and-Maya-Resistance-From-Turtle-Island.pdf' },
        { label: "un submission: indigenous peoples' rights to exist", href: 'https://www.mayanleague.org/s/Indigenous-Peoples-Rights-to-Exist-Self-Determination-Language-and-Due-Process-in-Migration_AISF_May.pdf' },
        { label: "in response to trump's second administration", href: 'https://www.mayanleague.org/s/For-immediate-Release_Mayan-League-Statement_2024_FINALdocx.pdf' },
        { label: 'Tribunal of Conscience Against Racism', href: 'https://www.mayanleague.org/s/Tribunal-of-Conscience-Against-Racism-2025-Statement.pdf' },
        { label: 'The United States Creates the Refugees it Hates', href: 'https://www.mayanleague.org/s/The-United-States-Creates-the-Refugees-it-Hates-9sfe.pdf' },
      ],
    },
    'indigenous-children': {
      slug: 'indigenous-children',
      label: 'Indigenous Children',
      eyebrow: 'Resources',
      title: 'Indigenous Children',
      heroDek:
        'Statements and advocacy on the human rights violations Indigenous children face in forced migration.',
      intro: [
        'Our children are sacred. The following resources delve into the human rights violations that Indigenous children face in forced migration.',
      ],
      links: [
        { label: 'we demand justice for Jakelin Amei Rosmery Caal Maquin (espaÑol)', href: 'https://www.mayanleague.org/s/Denuncia-de-muerte-de-Jakelin-Caal.pdf' },
        { label: 'we demand justice for jakelin amei rosmery caal maquin (english)', href: 'https://www.mayanleague.org/s/We-denounce-the-death-of-Jakeline-Caal.pdf' },
        { label: 'We Demand Justice for Claudia Patricia Gómez González', href: 'https://www.mayanleague.org/s/Claudia-Patricia-Gomez-Gonzalez_Letter-to-DHS.pdf' },
        { label: 'Faith Vigil for Children Dying at the Border', href: 'https://www.mayanleague.org/s/MayanLeague_Statement-_Faith-Vigil-for-Children-Dying-at-the-Border.pdf' },
        { label: 'exploited indigenous migrant children invisible in plain sight', href: 'https://www.mayanleague.org/s/IML-Statement_Exploitation-of-Indigenous-Children-3-6-2023docx.pdf' },
        { label: 'Indigenous Children are Dying at the Boarder', href: 'https://www.mayanleague.org/s/INDIGENOUS-CHILDREN-DYING-AT-THE-BORDER.pdf' },
        { label: 'we Demand the Halt of Illegal Deportations of Indigenous Children from Guatemala (english)', href: 'https://www.mayanleague.org/s/MayanLeague_Statement-_Faith-Vigil-for-Children-Dying-at-the-Border-zwx6.pdf' },
        { label: 'we Demand the Halt of Illegal Deportations of Indigenous Children from Guatemala (espaÑol)', href: 'https://www.mayanleague.org/s/Declaracion_LIGAMAYA_EXIGIMOS-EL-CESE-DE-LAS-DEPORTACIONES-ILEGALES-DE-NIOS-Y-NIAS-DE-PUEBLOS-ORIGIN.pdf' },
        { label: 'Comment on the Proposed rule by dept of HHS', href: 'https://www.mayanleague.org/s/Comment-on-the-Proposed-Rule-by-the-Department-of-Health-and-Human-Services-Administration-for-Child.pdf' },
      ],
    },
    'indigenous-human-rights': {
      slug: 'indigenous-human-rights',
      label: 'Indigenous Human Rights',
      eyebrow: 'Resources',
      title: 'Indigenous Human Rights',
      heroDek:
        'Statements, submissions, and advocacy on asylum, raids, detention, and Indigenous migrants’ human rights.',
      intro: ['View our statements below to learn more:'],
      links: [
        { label: "'This is about Power' article with High Country News", href: 'https://www.mayanleague.org/s/This-is-about-power_-Indigenous-immigrants-face-a-second-Trump-administration-High-Country-News.pdf' },
        { label: 'we denounce the violent ice raids in the DMV', href: 'https://www.mayanleague.org/s/DMV-RAIDS_MAYAN-LEAGUE-statement_March.pdf' },
        { label: 'Biden’s Proclamation is a Betrayal to Indigenous Peoples Seeking Refuge', href: 'https://www.mayanleague.org/s/IML-Statement-Executive-Order-June-4-2024docx.pdf' },
        { label: 'Refugees, Immigrants & Asylum Seekers are Under Attack, #SaveAsylum Now!', href: 'https://www.mayanleague.org/s/Refugees-Immigrants-Asylum-Seekers-are-Under-Attack-SaveAsylum-Now_IML-statement.pdf' },
        { label: 'THE MAYAN LEAGUE DENOUNCES THE BIDEN ADMINISTRATION’S PROPOSED ASYLUM BAN AND FAMILY DETENTION CENTERS', href: 'https://www.mayanleague.org/s/WE-DENOUNCE-THE-BIDEN-ADMINISTRATIONS-PROPOSED-ASYLUM-BAN-AND-FAMILY-DETENTION-CENTERS.pdf' },
        { label: 'THE U.S. GOVERNMENT’S PLANS TO MANAGE REGIONAL MIGRATION LACK ADEQUATE SAFEGUARDS FOR INDIGENOUS PEOPLES SEEKING REFUGE', href: 'https://www.mayanleague.org/s/MayanLeagueStatement_DHS-and-DOS-announcement-4_27_2023.pdf' },
        { label: 'ifr comments: procedures for credible fear screening', href: 'https://www.mayanleague.org/s/MayanLeague_IFR_comments-FINAL_2022.pdf' },
        { label: 'iml comments on proposed asylum ban', href: 'https://www.mayanleague.org/s/MayanLeague_Comment-on-the-Proposed-Asylum-Ban_2023.pdf' },
        { label: 'WE DEMAND THE RELEASE OF OUR SISTER, JUANA ALONZO SANTIZO', href: 'https://www.mayanleague.org/s/ON-THIS-INTERNATIONAL-WOMENS-DAY_LibertadParaJuanita.pdf' },
        { label: 'The Illegal Asylum Ban Violates Indigenous Peoples’ Human Rights', href: 'https://www.mayanleague.org/s/The-Illegal-Asylum-Ban-Violates-Indigenous-Peoples-Human-Rights-1.pdf' },
      ],
    },
  },
  es: {
    lgbtqia2s: {
      slug: 'lgbtqia2s',
      label: 'LGBTQIA2S+',
      eyebrow: 'Recursos',
      title: 'LGBTQIA2S+',
      heroDek:
        'Apoyo a migrantes indígenas LGBTQIA2S+ mediante acompañamiento cultural, interpretación y talleres comunitarios en Abiayala.',
      intro: [
        'Desde 2020, con la pandemia de COVID-19, ha aumentado la presencia de migrantes indígenas de la comunidad LGBTQIA2S+ que se establecen en estados como Virginia.',
        'La Liga Maya ha estado atenta a la situación de nuestrxs parientes migrantes LGBTQIA2S+. Para abordar su trauma, la Liga Maya Internacional ha brindado apoyo mediante acompañamiento cultural, interpretación y talleres sobre diversidad sexual en Abiayala (22 de octubre de 2022) para generar conciencia y alianzas comunitarias.',
      ],
      links: [
        { label: 'IML Indigenous Sexual Diversity (ENGLISH)', href: 'https://www.mayanleague.org/s/English-Declaration_FINAL.pdf' },
        { label: 'Liga maya la diversidad sexual INDÍGENA (ESPAÑOL)', href: 'https://www.mayanleague.org/s/Declaracion-_Espanol_FINAL.pdf' },
      ],
    },
    'land-rights': {
      slug: 'land-rights',
      label: 'Derechos sobre la Tierra',
      eyebrow: 'Recursos',
      title: 'Derechos sobre la Tierra',
      heroDek: 'Declaraciones sobre territorio, extractivismo y la defensa de la tierra y la vida Maya Q’eqchi’.',
      intro: ['Vea nuestras declaraciones a continuación para conocer más:'],
      links: [
        { label: "illegal evictions of buena vista maya q'eqchi' community", href: '/land-rights' },
        { label: 'WE CONDEMN STATE SPONSORED REPRESSION AGAINST THE MAYA Q’EQCHI’ NATION IN CHAPÍN ABAJO, EL ESTOR, IZABAL, GUATEMALA', href: 'https://www.mayanleague.org/s/We-condemn-State-Sponsored-Repression_FINAL1272022-2.pdf' },
        { label: 'WE CONDEMN THE EVICTION OF THE Q’EQCHI’ MAYA COMMUNITY OF BUENA VISTA (EspaÑol)', href: 'https://www.mayanleague.org/s/CONDENAMOS-EL-DESALOJO-DE-LA-COMUNIDAD-BUENA-VISTA.pdf' },
        { label: 'EXTRACTIVISM AND CLIMATE INJUSTICE: Indigenous Migration in Abiayala', href: 'https://www.mayanleague.org/s/EXTRACTIVISM-AND-CLIMATE-INJUSTICE-Indigenous-Migration-in-Abiayala-1.pdf' },
      ],
    },
    'sovereignty-and-self-determination': {
      slug: 'sovereignty-and-self-determination',
      label: 'Soberanía y Libre Determinación',
      eyebrow: 'Recursos',
      title: 'Soberanía y Libre Determinación',
      heroDek: 'Declaraciones de solidaridad sobre soberanía, autodeterminación y resistencia indígena en Abiayala.',
      intro: ['Vea nuestras declaraciones a continuación para conocer más:'],
      links: [
        { label: 'Statement of Solidarity Regarding the Dakota Access Pipeline Project (espaÑol)', href: 'https://www.mayanleague.org/s/Declaracion-de-Solidaridad-con-Firma.pdf' },
        { label: 'Statement of Solidarity Regarding the Dakota Access Pipeline Project (english)', href: '/sovereignty-and-self-determination' },
        { label: 'END GENOCIDE OF THE PALESTINIAN PEOPLE', href: 'https://www.mayanleague.org/s/INDIGENOUS-SOLIDARITY_-END-GENOCIDE-AGAINST-THE-PALESTINIAN-PEOPLE-d6xd.pdf' },
      ],
    },
    'indigenous-forced-migration': {
      slug: 'indigenous-forced-migration',
      label: 'Migración Forzada Indígena',
      eyebrow: 'Recursos',
      title: 'Migración Forzada Indígena',
      heroDek:
        'Investigación, testimonios y experiencias vividas sobre las causas de la migración forzada indígena en Isla Tortuga.',
      intro: [
        '¿Qué causa que los Pueblos Indígenas migren? Los recursos de esta página ofrecen información sobre esta crisis invisibilizada mediante investigación, testimonios y experiencias vividas.',
        'Conozca las causas estructurales de la migración forzada y las políticas que despojan a los Pueblos Indígenas en Abiayala.',
      ],
      links: [
        { label: 'ACNUR Letter regarding displaced indigenous peoples (espaÑol)', href: 'https://www.mayanleague.org/s/FINAL-CARTA-ONU_FIRMAS_2017.pdf' },
        { label: 'UN Submission: colonial states are killing our indigenous identities', href: 'https://www.mayanleague.org/s/ColonialStatesKillOurIdentitiesAndOurPeoples_UNPFII-2023-intervencion_MayanLeague.pdf' },
        { label: 'scotus ruling on migrant protection protocols', href: 'https://www.mayanleague.org/s/THE-INTERNATIONAL-MAYAN-LEAGUE-WELCOMES-THE-SCOTUS-RULING-ON-MPP.pdf' },
        { label: 'indigenous peoples demand justice (espaÑol)', href: 'https://www.mayanleague.org/s/Los-pueblos-indigenas-exigen-justicia-en-el-Dia-Internacional-del-Migrante-12_18_21.pdf' },
        { label: 'indigenous peoples living in urban areas', href: 'https://www.mayanleague.org/s/HR_Urban-Areas_Submission_FINAL.pdf' },
        { label: 'colonial states and inhumane policies kill (English)', href: 'https://www.mayanleague.org/s/COLONIAL-STATES-AND-INHUMANE-IMMIGRATION-POLICIES-KILL-THIS-IS-PROOF.pdf' },
        { label: 'colonial states and inhumane policies kill (espaÑol)', href: 'https://www.mayanleague.org/s/Comunicado-de-Solidaridad_PLM_LigaMaya_2023.pdf' },
        { label: 'indigenous migration fact sheet', href: 'https://www.mayanleague.org/s/FACT-SHEET_INDIGENOUS-MIGRATION-AND-THE-US-IMMIGRATION-SYSTEM_22224.pdf' },
        { label: 'we denounce the raids terrorizing our communities', href: 'https://www.mayanleague.org/s/Comunidad-Sol-x-Mayan-League-Aug-9-Statement.pdf' },
        { label: 'Forced Migration and Maya Resistance From Turtle Island', href: 'https://www.mayanleague.org/s/Guatemalan-Colonial-State-Forced-Migration-and-Maya-Resistance-From-Turtle-Island.pdf' },
        { label: "un submission: indigenous peoples' rights to exist", href: 'https://www.mayanleague.org/s/Indigenous-Peoples-Rights-to-Exist-Self-Determination-Language-and-Due-Process-in-Migration_AISF_May.pdf' },
        { label: "in response to trump's second administration", href: 'https://www.mayanleague.org/s/For-immediate-Release_Mayan-League-Statement_2024_FINALdocx.pdf' },
        { label: 'Tribunal of Conscience Against Racism', href: 'https://www.mayanleague.org/s/Tribunal-of-Conscience-Against-Racism-2025-Statement.pdf' },
        { label: 'The United States Creates the Refugees it Hates', href: 'https://www.mayanleague.org/s/The-United-States-Creates-the-Refugees-it-Hates-9sfe.pdf' },
      ],
    },
    'indigenous-children': {
      slug: 'indigenous-children',
      label: 'Niñez Indígena',
      eyebrow: 'Recursos',
      title: 'Niñez Indígena',
      heroDek:
        'Declaraciones y advocacy sobre las violaciones de derechos humanos que enfrenta la niñez indígena en la migración forzada.',
      intro: [
        'Nuestra niñez es sagrada. Los siguientes recursos abordan las violaciones de derechos humanos que enfrenta la niñez indígena en la migración forzada.',
      ],
      links: [
        { label: 'we demand justice for Jakelin Amei Rosmery Caal Maquin (espaÑol)', href: 'https://www.mayanleague.org/s/Denuncia-de-muerte-de-Jakelin-Caal.pdf' },
        { label: 'we demand justice for jakelin amei rosmery caal maquin (english)', href: 'https://www.mayanleague.org/s/We-denounce-the-death-of-Jakeline-Caal.pdf' },
        { label: 'We Demand Justice for Claudia Patricia Gómez González', href: 'https://www.mayanleague.org/s/Claudia-Patricia-Gomez-Gonzalez_Letter-to-DHS.pdf' },
        { label: 'Faith Vigil for Children Dying at the Border', href: 'https://www.mayanleague.org/s/MayanLeague_Statement-_Faith-Vigil-for-Children-Dying-at-the-Border.pdf' },
        { label: 'exploited indigenous migrant children invisible in plain sight', href: 'https://www.mayanleague.org/s/IML-Statement_Exploitation-of-Indigenous-Children-3-6-2023docx.pdf' },
        { label: 'Indigenous Children are Dying at the Boarder', href: 'https://www.mayanleague.org/s/INDIGENOUS-CHILDREN-DYING-AT-THE-BORDER.pdf' },
        { label: 'we Demand the Halt of Illegal Deportations of Indigenous Children from Guatemala (english)', href: 'https://www.mayanleague.org/s/MayanLeague_Statement-_Faith-Vigil-for-Children-Dying-at-the-Border-zwx6.pdf' },
        { label: 'we Demand the Halt of Illegal Deportations of Indigenous Children from Guatemala (espaÑol)', href: 'https://www.mayanleague.org/s/Declaracion_LIGAMAYA_EXIGIMOS-EL-CESE-DE-LAS-DEPORTACIONES-ILEGALES-DE-NIOS-Y-NIAS-DE-PUEBLOS-ORIGIN.pdf' },
        { label: 'Comment on the Proposed rule by dept of HHS', href: 'https://www.mayanleague.org/s/Comment-on-the-Proposed-Rule-by-the-Department-of-Health-and-Human-Services-Administration-for-Child.pdf' },
      ],
    },
    'indigenous-human-rights': {
      slug: 'indigenous-human-rights',
      label: 'Derechos Humanos Indígenas',
      eyebrow: 'Recursos',
      title: 'Derechos Humanos Indígenas',
      heroDek:
        'Declaraciones, presentaciones y advocacy sobre asilo, redadas, detención y los derechos humanos de migrantes indígenas.',
      intro: ['Vea nuestras declaraciones a continuación para conocer más:'],
      links: [
        { label: "'This is about Power' article with High Country News", href: 'https://www.mayanleague.org/s/This-is-about-power_-Indigenous-immigrants-face-a-second-Trump-administration-High-Country-News.pdf' },
        { label: 'we denounce the violent ice raids in the DMV', href: 'https://www.mayanleague.org/s/DMV-RAIDS_MAYAN-LEAGUE-statement_March.pdf' },
        { label: 'Biden’s Proclamation is a Betrayal to Indigenous Peoples Seeking Refuge', href: 'https://www.mayanleague.org/s/IML-Statement-Executive-Order-June-4-2024docx.pdf' },
        { label: 'Refugees, Immigrants & Asylum Seekers are Under Attack, #SaveAsylum Now!', href: 'https://www.mayanleague.org/s/Refugees-Immigrants-Asylum-Seekers-are-Under-Attack-SaveAsylum-Now_IML-statement.pdf' },
        { label: 'THE MAYAN LEAGUE DENOUNCES THE BIDEN ADMINISTRATION’S PROPOSED ASYLUM BAN AND FAMILY DETENTION CENTERS', href: 'https://www.mayanleague.org/s/WE-DENOUNCE-THE-BIDEN-ADMINISTRATIONS-PROPOSED-ASYLUM-BAN-AND-FAMILY-DETENTION-CENTERS.pdf' },
        { label: 'THE U.S. GOVERNMENT’S PLANS TO MANAGE REGIONAL MIGRATION LACK ADEQUATE SAFEGUARDS FOR INDIGENOUS PEOPLES SEEKING REFUGE', href: 'https://www.mayanleague.org/s/MayanLeagueStatement_DHS-and-DOS-announcement-4_27_2023.pdf' },
        { label: 'ifr comments: procedures for credible fear screening', href: 'https://www.mayanleague.org/s/MayanLeague_IFR_comments-FINAL_2022.pdf' },
        { label: 'iml comments on proposed asylum ban', href: 'https://www.mayanleague.org/s/MayanLeague_Comment-on-the-Proposed-Asylum-Ban_2023.pdf' },
        { label: 'WE DEMAND THE RELEASE OF OUR SISTER, JUANA ALONZO SANTIZO', href: 'https://www.mayanleague.org/s/ON-THIS-INTERNATIONAL-WOMENS-DAY_LibertadParaJuanita.pdf' },
        { label: 'The Illegal Asylum Ban Violates Indigenous Peoples’ Human Rights', href: 'https://www.mayanleague.org/s/The-Illegal-Asylum-Ban-Violates-Indigenous-Peoples-Human-Rights-1.pdf' },
      ],
    },
  },
}

