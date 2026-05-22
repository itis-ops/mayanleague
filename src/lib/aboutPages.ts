import type { Lang } from './i18n'

export type AboutPageSlug =
  | 'board-of-directors'
  | 'our-path'
  | 'our-core-values'
  | 'job-opportunities'

export interface AboutPageSection {
  title?: string
  kicker?: string
  body: string[]
  image?: string
}

export interface AboutPageData {
  slug: AboutPageSlug
  label: string
  title: string
  eyebrow: string
  intro?: string
  introLabel?: string
  membersSectionLabel?: string
  heroImage?: string
  sections: AboutPageSection[]
  quote?: {
    body: string
    source: string
  }
}

export const ABOUT_PAGE_LINKS: Array<{ label: string; href: string }> = [
  { label: 'About', href: '/about' },
  { label: 'Board Of Directors', href: '/board-of-directors' },
  { label: 'Our Path', href: '/our-path' },
  { label: 'Our Core Values', href: '/our-core-values' },
  { label: 'Team', href: '/team' },
  { label: 'Job Opportunities', href: '/job-opportunities' },
]

export const aboutPages: Record<AboutPageSlug, AboutPageData> = {
  'board-of-directors': {
    slug: 'board-of-directors',
    label: 'Board Of Directors',
    title: 'Board Of Directors',
    eyebrow: 'About',
    intro:
      'The Board of Directors of the Mayan League is composed of women and men who are all accomplished individuals including traditional spiritual leaders, elders, philosophers, authors, and advocates.',
    introLabel: 'Who we are',
    membersSectionLabel: 'Board members',
    heroImage: '/site-images/page-board-of-directors.jpg',
    sections: [
      {
        title: 'Felipe, President | Maya Mam',
        body: [
          'International Mayan League/USA founding member and member of the Maya Mam Council. He has more than 30 years of advocacy history for the Maya people and the environment.',
        ],
      },
      {
        title: 'Benito, Vice President | Maya Mam',
        body: ['International Mayan League/USA founding member'],
      },
      {
        title: 'Elena, Treasurer | Maya Mam',
        body: [
          'Ajq’ij, Kamalbe traditional spiritual elder of the Regional Council of Ancestral Maya Authorities of her home country; member of the Advisory Council to the Grand National Council of Ancestral Authorities of the Maya, Garifuna and Xinka of Ixim Ulew; member of the leadership council of the Maya Mam Council of her Department; member of Aj Q´ij, Oxlajuj B´e of 8 municipalities of the Mam people in her Department; member of the Consultative Group of the Maya Program of the United Nations, Guatemala.',
        ],
      },
      {
        title: 'Genaro, Director | Maya Q’anjob’al',
        body: [
          'Ajq’ij, traditional spiritual elder, human rights advocate, and advocate for the immigrant community.',
        ],
      },
      {
        title: 'Dr. Daniel, Director | Maya K’iche’',
        body: ['Dr. of Philosophy in Maya Cosmovision; Attorney at law in his home country'],
      },
    ],
  },
  'our-path': {
    slug: 'our-path',
    label: 'Our Path',
    title: 'Our mission & vision',
    eyebrow: 'Our Path',
    sections: [
      {
        kicker: 'Mission',
        body: [
          'The International Maya League promotes the defense of Maya Peoples’ human rights and their dignity in Iximulew and across colonial borders. The worldview of the Original Peoples of Abiayala and the care for Mother Earth guide our cultivation of intergenerational spaces. Through leadership development and healing, we strengthen the power of our Peoples, Nations, Indigenous women and youth, and the LGTBQ2S+ community. With diverse allies, we build solutions and advocacy strategies to realize our dreams of justice, equity, and a respectful future for all of humanity and Mother Earth - to achieve the fullness of life.',
        ],
        image: '/site-images/page-our-path-1.png',
      },
      {
        kicker: 'Vision',
        body: [
          'The International Maya League is a Maya organization whose purpose is to promote, preserve, and transmit the cosmovision and worldview, culture, history, and contributions of our ancestors and the values of our traditional knowledge and stewardship of the earth into solutions and actions against current threats and violations affecting our peoples, the earth, and humanity.',
          'We are committed to creating a permanent link between our contemporary world and ancestral traditions, respecting the diversity of our Nation while building a shared vision with our peoples, and working closely with other Indigenous peoples, organizations, and allies who support our beliefs and values.',
        ],
        image: '/site-images/page-our-path-2.png',
      },
    ],
  },
  'our-core-values': {
    slug: 'our-core-values',
    label: 'Our Core Values',
    title: 'Our Core Values',
    eyebrow: 'About',
    intro:
      'Seven principles rooted in Maya cosmovision guide how we defend our peoples, care for Mother Earth, and build a future of dignity, accountability, and liberation.',
    heroImage: '/site-images/core-values/value-01-earth.png',
    sections: [
      {
        title: 'We respect and care for Mother Earth and Mother Nature.',
        image: '/site-images/core-values/value-01-earth.png',
        body: [
          'The Maya have a deep and special relationship with Mother Earth and Mother Nature. We defend her because she is our mother, and it is through her that the Maya dream of remaining connected to the land, our origins, and our way of life. Our connection with Mother Nature, along with the traditional knowledge, history, and ceremonies that arise from this bond, allows us to conserve and protect our lands, territories, and sacred natural elements. Guided by our Vision, we aim to share our message with all of humanity and raise awareness about the harmful ways we have treated the Earth and the cosmos.',
        ],
      },
      {
        title: 'We Honor our Ancestral Wisdom and Traditions.',
        image: '/site-images/core-values/value-02-ancestral.png',
        body: [
          'We are committed to sharing historical knowledge with children and youth to help them understand their traditions and cultural heritage in order to take pride in their identities. Our ancestral philosophy—rooted in cosmovision, spirituality, and science—allows us to fully experience life and be part of the larger whole. Our connection to the world and the cosmos is the basis of our actions, thoughts, and sentiments in life and of life. We honor and preserve ancestral knowledge and values so that the Maya, especially those living outside traditional Maya territories, can be dynamic conservers of their own culture, history, and traditions.',
        ],
      },
      {
        title: 'We believe in the fundamental human rights of Self-Determination, Liberty, and Dignity.',
        image: '/site-images/core-values/value-03-dignity.png',
        body: [
          'Our work and priorities are guided by the vision and practices of our spiritual and traditional leaders, elders, and authorities. We aim to address the root causes of discrimination, inequality, and oppression, the diaspora of the Maya, and the destruction of our communities and environment. We acknowledge the right to exist as distinct peoples, the right to self-determination and self-government, and the right to be free and equal to all other peoples, without discrimination. (See United Nations Declaration on the Rights of Indigenous Peoples, art. 1, 2,3,4, and 5. Sept. 13, 2007).',
        ],
      },
      {
        title: 'We have a responsibility to Care for Each Other.',
        image: '/site-images/core-values/value-04-care.png',
        body: [
          'We recognize that all of humanity is interconnected; therefore, we have a duty to care for one another. The greatest expression of our humanity is loving and supporting one another. This act of caring is evident not only within our communities, families, and internal teams but also in how we take care of ourselves.',
        ],
      },
      {
        title: 'We place Humility at the core of our work.',
        image: '/site-images/core-values/value-05-humility.png',
        body: [
          'Humility is grounded in the values of the Culture of the Corn, which serves as the foundation for mental clarity and spiritual strength in all our actions. This culture is shaped by lived experiences that guide us in approaching life and reflecting on humility, prompting us to "look in the mirror" and examine ourselves. Through our humility, we cultivate curiosity, enabling us to grow continuously through self-examination, experimentation, and adaptation.',
        ],
      },
      {
        title: 'We embrace Accountability and Transparency to guide our actions.',
        image: '/site-images/core-values/value-06-accountability.png',
        body: [
          'We believe in fostering a positive culture of accountability and transparency that builds trust and encourages open communication within our organization. These values create an environment where members can respectfully hold one another accountable for their actions and commitments, both in our work and in the communities we serve. By clearly defining and articulating our expectations and objectives, we position ourselves to work effectively toward our shared goals.',
        ],
      },
      {
        title: 'We Envision a Future that realizes and celebrates all life and liberation.',
        image: '/site-images/core-values/value-07-future.png',
        body: [
          'Inspired by our ancestors, we dream of a world where humanity collaborates to shape a culture that drives life to flourish. As we imagine this future, we draw upon the traditional teachings and values of Maya Cosmovision that advocate for freedom, fraternity, solidarity, love, kindness, and compassion. We anchor ourselves in our visions for a world, encompassing ecology, politics, economy, and society, ensuring the celebration of life by listening to and expressing diverse perspectives and promoting the reconciliation of humanity with the cosmos.',
        ],
      },
    ],
  },
  'job-opportunities': {
    slug: 'job-opportunities',
    label: 'Job Opportunities',
    title: 'Current position(s)',
    eyebrow: 'Job Opportunities',
    intro:
      'Join our mission-driven team. Review the open role below and reach out if you are interested in supporting Maya-led organizing and operations.',
    sections: [
      {
        kicker: 'Part-time · Administrative',
        title: 'Part-time Administrative Coordinator',
        body: [
          "The Mayan League is seeking a highly organized, proactive, and adaptable Administrative Coordinator to provide part-time support to staff, Board of Directors, and volunteers. The Coordinator will play a key role in keeping the organization's operations by providing general administrative support, including document management and maintaining organizational records. This position will be responsible for coordinating day-to-day office operations, maintaining administrative systems related to accounting and information technology, and ensuring that organizational processes run effectively.",
          'Key objectives include supporting the leadership team and Board, as well as facilitating cross-functional collaboration with internal teams and external partners as necessary. The ideal candidate will be bilingual or multilingual, possess strong organizational skills, attention to detail, and the ability to manage multiple responsibilities in a dynamic, collaborative, and culturally diverse environment. This is an excellent opportunity for someone who thrives in a fast-paced, mission-driven setting and is eager to contribute to meaningful work. Experience working with Native American and Indigenous communities is preferred but not required.',
        ],
      },
    ],
  },
}

export const aboutPageSlugs = Object.keys(aboutPages) as AboutPageSlug[]

export const localizedAboutPageLinks: Record<Lang, Array<{ label: string; href: string }>> = {
  en: ABOUT_PAGE_LINKS,
  es: [
    { label: 'Acerca de nosotros', href: '/about' },
    { label: 'Junta Directiva', href: '/board-of-directors' },
    { label: 'Nuestro camino', href: '/our-path' },
    { label: 'Nuestros valores', href: '/our-core-values' },
    { label: 'Equipo', href: '/team' },
    { label: 'Oportunidades de empleo', href: '/job-opportunities' },
  ],
}

export function isAboutCollectionRoute(pathname: string) {
  return ABOUT_PAGE_LINKS.some((link) => link.href === pathname)
}

export const localizedAboutPages: Record<Lang, Record<AboutPageSlug, AboutPageData>> = {
  en: aboutPages,
  es: {
    'board-of-directors': {
      ...aboutPages['board-of-directors'],
      label: 'Junta Directiva',
      title: 'Junta Directiva',
      eyebrow: 'Acerca de nosotros',
      intro:
        'La Junta Directiva de la Liga Maya está compuesta por mujeres y hombres con trayectorias destacadas, incluyendo líderes espirituales tradicionales, ancianos, filósofos, autores y defensores.',
      introLabel: 'Quiénes somos',
      membersSectionLabel: 'Miembros de la junta',
      sections: [
        {
          title: 'Felipe, Presidente | Maya Mam',
          body: [
            'Miembro fundador de la Liga Maya Internacional/USA y miembro del Consejo Maya Mam. Cuenta con más de 30 años de historia de incidencia por el Pueblo Maya y el medio ambiente.',
          ],
        },
        {
          title: 'Benito, Vicepresidente | Maya Mam',
          body: ['Miembro fundador de la Liga Maya Internacional/USA.'],
        },
        {
          title: 'Elena, Tesorera | Maya Mam',
          body: [
            'Ajq’ij y anciana espiritual tradicional del Consejo Regional de Autoridades Ancestrales Mayas; integrante de espacios de liderazgo y consulta de autoridades Mayas en Ixim Ulew.',
          ],
        },
        {
          title: 'Genaro, Director | Maya Q’anjob’al',
          body: [
            'Ajq’ij, anciano espiritual tradicional, defensor de derechos humanos y defensor de la comunidad inmigrante.',
          ],
        },
        {
          title: 'Dr. Daniel, Director | Maya K’iche’',
          body: ['Doctor en Filosofía en Cosmovisión Maya y abogado en su país de origen.'],
        },
      ],
    },
    'our-path': {
      ...aboutPages['our-path'],
      label: 'Nuestro camino',
      title: 'Nuestra misión y visión',
      eyebrow: 'Nuestro camino',
      sections: [
        {
          kicker: 'Misión',
          body: [
            'La Liga Maya Internacional promueve la defensa de los derechos humanos y la dignidad de los Pueblos Mayas en Iximulew y a través de fronteras coloniales.',
            'La cosmovisión de los Pueblos Originarios de Abiayala y el cuidado de la Madre Tierra guían nuestros espacios intergeneracionales. A través del desarrollo de liderazgo y la sanación, fortalecemos el poder de nuestros Pueblos, Naciones, mujeres y juventudes Indígenas, y de la comunidad LGBTQ2S+.',
          ],
          image: '/site-images/page-our-path-1.png',
        },
        {
          kicker: 'Visión',
          body: [
            'La Liga Maya Internacional es una organización Maya cuyo propósito es promover, preservar y transmitir la cosmovisión, cultura, historia y contribuciones de nuestros ancestros.',
            'Estamos comprometidos a crear un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales, respetando la diversidad de nuestra Nación y construyendo una visión compartida con nuestros pueblos.',
          ],
          image: '/site-images/page-our-path-2.png',
        },
      ],
    },
    'our-core-values': {
      ...aboutPages['our-core-values'],
      label: 'Nuestros valores',
      title: 'Nuestros valores',
      eyebrow: 'Acerca de nosotros',
      intro:
        'Siete principios arraigados en la cosmovisión Maya guían cómo defendemos a nuestros pueblos, cuidamos a la Madre Tierra y construimos un futuro de dignidad, rendición de cuentas y liberación.',
      sections: [
        {
          title: 'Respetamos y cuidamos a la Madre Tierra y la Madre Naturaleza.',
          image: '/site-images/core-values/value-01-earth.png',
          body: [
            'El Pueblo Maya tiene una relación profunda y especial con la Madre Tierra y la Madre Naturaleza. La defendemos porque es nuestra madre, y por ella soñamos con permanecer conectados con la tierra, nuestros orígenes y nuestra forma de vida. Nuestra conexión con la Madre Naturaleza, junto con el conocimiento tradicional, la historia y las ceremonias que surgen de este vínculo, nos permite conservar y proteger nuestras tierras, territorios y elementos naturales sagrados. Guiados por nuestra visión, queremos compartir nuestro mensaje con toda la humanidad y crear conciencia sobre el trato dañino que le hemos dado a la tierra y al cosmos.',
          ],
        },
        {
          title: 'Honramos nuestra sabiduría y tradiciones ancestrales.',
          image: '/site-images/core-values/value-02-ancestral.png',
          body: [
            'Estamos comprometidos a compartir conocimientos históricos con niñas, niños y jóvenes para que comprendan sus tradiciones y herencia cultural y se sientan orgullosos de sus identidades. Nuestra filosofía ancestral —arraigada en la cosmovisión, la espiritualidad y la ciencia— nos permite vivir plenamente y ser parte de un todo mayor. Honramos y preservamos el conocimiento y los valores ancestrales para que el Pueblo Maya, especialmente quienes viven fuera de los territorios mayas tradicionales, pueda ser conservador dinámico de su propia cultura, historia y tradiciones.',
          ],
        },
        {
          title: 'Creemos en los derechos humanos fundamentales de autodeterminación, libertad y dignidad.',
          image: '/site-images/core-values/value-03-dignity.png',
          body: [
            'Nuestro trabajo y nuestras prioridades están guiados por la visión y las prácticas de nuestros líderes espirituales y tradicionales, ancianos y autoridades. Buscamos abordar las causas profundas de la discriminación, la desigualdad y la opresión, la diáspora del Pueblo Maya y la destrucción de nuestras comunidades y nuestro medio ambiente. Reconocemos el derecho a existir como pueblos distintos, el derecho a la autodeterminación y al autogobierno, y el derecho a ser libres e iguales a todos los demás pueblos, sin discriminación. (Véase la Declaración de las Naciones Unidas sobre los Derechos de los Pueblos Indígenas, arts. 1, 2, 3, 4 y 5. 13 de septiembre de 2007).',
          ],
        },
        {
          title: 'Tenemos la responsabilidad de cuidarnos mutuamente.',
          image: '/site-images/core-values/value-04-care.png',
          body: [
            'Reconocemos que toda la humanidad está interconectada; por lo tanto, tenemos el deber de cuidarnos unas a otras y unos a otros. La mayor expresión de nuestra humanidad es amarnos y apoyarnos mutuamente. Este acto de cuidado se manifiesta no solo en nuestras comunidades, familias y equipos internos, sino también en cómo nos cuidamos a nosotras y nosotros mismos.',
          ],
        },
        {
          title: 'Ponemos la humildad en el centro de nuestro trabajo.',
          image: '/site-images/core-values/value-05-humility.png',
          body: [
            'La humildad está arraigada en los valores de la Cultura del Maíz, que sirve de base para la claridad mental y la fuerza espiritual en todas nuestras acciones. Esta cultura se forma por experiencias vividas que nos guían al acercarnos a la vida y reflexionar sobre la humildad, invitándonos a “mirarnos al espejo” y examinarnos. A través de la humildad cultivamos la curiosidad, lo que nos permite crecer continuamente mediante la autoexploración, la experimentación y la adaptación.',
          ],
        },
        {
          title: 'Abrazamos la rendición de cuentas y la transparencia para guiar nuestras acciones.',
          image: '/site-images/core-values/value-06-accountability.png',
          body: [
            'Creemos en fomentar una cultura positiva de rendición de cuentas y transparencia que construya confianza y fomente la comunicación abierta dentro de nuestra organización. Estos valores crean un entorno donde las integrantes y los integrantes pueden responsabilizarse mutuamente con respeto por sus acciones y compromisos, tanto en nuestro trabajo como en las comunidades a las que servimos. Al definir y articular claramente nuestras expectativas y objetivos, nos posicionamos para trabajar de manera efectiva hacia metas compartidas.',
          ],
        },
        {
          title: 'Imaginamos un futuro que realiza y celebra toda vida y liberación.',
          image: '/site-images/core-values/value-07-future.png',
          body: [
            'Inspirados por nuestros ancestros, soñamos con un mundo donde la humanidad colabore para crear una cultura que impulse la vida a florecer. Al imaginar este futuro, nos apoyamos en las enseñanzas y valores tradicionales de la Cosmovisión Maya que abogan por la libertad, la fraternidad, la solidaridad, el amor, la bondad y la compasión. Nos anclamos en nuestras visiones de un mundo —ecología, política, economía y sociedad— asegurando la celebración de la vida al escuchar y expresar perspectivas diversas y promover la reconciliación de la humanidad con el cosmos.',
          ],
        },
      ],
    },
    'job-opportunities': {
      ...aboutPages['job-opportunities'],
      label: 'Oportunidades de empleo',
      title: 'Puesto(s) actual(es)',
      eyebrow: 'Oportunidades de empleo',
      intro:
        'Únase a nuestro equipo con propósito. Revise el puesto abierto a continuación y contáctenos si desea apoyar la organización y operaciones lideradas por Maya.',
      sections: [
        {
          kicker: 'Medio tiempo · Administrativo',
          title: 'Coordinador/a Administrativo/a de medio tiempo',
          body: [
            'La Liga Maya busca una persona altamente organizada, proactiva y adaptable para brindar apoyo administrativo de medio tiempo al personal, la Junta Directiva y voluntariado.',
            'La persona coordinadora tendrá un papel clave en las operaciones de la organización, incluyendo apoyo administrativo general, gestión de documentos, mantenimiento de registros y coordinación de sistemas administrativos.',
          ],
        },
      ],
    },
  },
}
