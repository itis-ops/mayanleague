/**
 * Pre-fills the Sanity About-family documents with all existing static content
 * from src/lib/aboutPages.ts and src/lib/i18n.ts, including uploading the
 * 16 image files referenced by those pages. Editors then see a populated
 * Studio instead of a blank slate and can edit copy directly.
 *
 * Documents created/replaced:
 *   - aboutPage (singleton, doc id: aboutPage)
 *   - boardOfDirectorsPage (singleton, doc id: boardOfDirectorsPage)
 *   - ourPathPage (singleton, doc id: ourPathPage)
 *   - coreValuesPage (singleton, doc id: coreValuesPage)
 *   - jobOpportunitiesPage (singleton, doc id: jobOpportunitiesPage)
 *   - teamMember (6 documents, doc ids: teamMember-<name>)
 *
 * Run with:
 *   node scripts/migrate-about-pages-to-sanity.mjs
 *
 * Prerequisites:
 *   SANITY_API_WRITE_TOKEN must be set in .env.local (Editor role).
 *
 * Safe to re-run — uses createOrReplace + idempotent image asset uploads.
 */

import { createClient } from '@sanity/client'
import { createReadStream, readFileSync, statSync } from 'node:fs'
import { basename, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    // no .env.local — rely on real env
  }
}

loadEnv(resolve(__dirname, '../.env.local'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
})

// ── Helpers ──────────────────────────────────────────────────────────────────

const ls = (en, es) => ({ en, es })
const lt = (en, es) => ({ en, es })

const publicDir = resolve(__dirname, '../public')

/**
 * Uploads a file from /public to Sanity assets. Returns the asset reference
 * object that can be embedded inside a sanityImage object.
 *
 * Uses `client.assets.upload` which deduplicates by content hash — re-running
 * the script does not create duplicate assets.
 */
async function uploadImage(publicPath) {
  const filePath = resolve(publicDir, publicPath.replace(/^\//, ''))
  const stat = statSync(filePath)
  if (!stat.isFile()) throw new Error(`Missing image: ${filePath}`)

  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
  })
  return { _type: 'reference', _ref: asset._id }
}

function sanityImageObj(assetRef, altEn, altEs, credit) {
  return {
    _type: 'sanityImage',
    asset: assetRef,
    ...(altEn || altEs ? { alt: { en: altEn ?? '', es: altEs ?? altEn ?? '' } } : {}),
    ...(credit ? { credit } : {}),
  }
}

// ── About page singleton ─────────────────────────────────────────────────────

const aboutPageDoc = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroHeading: ls('Guided by elders and ancestors.', 'Guiados por ancianos y ancestros.'),
  methodStatement: lt(
    'The work of the Mayan League is guided by the knowledge and teachings of our elders and ancestors to respect and care for Mother Earth and Mother Nature.',
    'El trabajo de la Liga Maya está guiado por el conocimiento y las enseñanzas de nuestros ancianos y ancestros para respetar y cuidar a la Madre Tierra y la Madre Naturaleza.',
  ),
  whoWeAreLabel: ls('Who we are', 'Quiénes somos'),
  howWeWorkLabel: ls('How we work', 'Cómo trabajamos'),
  paragraphs: [
    lt(
      'Guided by this vision we want to share these values with all of humanity and help raise awareness of the detrimental treatment we have given to the earth and the cosmos.',
      'Guiados por esta visión queremos compartir estos valores con toda la humanidad y ayudar a crear conciencia sobre el trato dañino que le hemos dado a la tierra y al cosmos.',
    ),
    lt(
      'Our work and priorities are guided by the vision and practices of our spiritual and traditional leaders, elders, and authorities in order to address the root causes contributing to discrimination, inequality, and oppression of the Maya and the destruction of our communities and environment.',
      'Nuestro trabajo y prioridades están guiados por la visión y las prácticas de nuestros líderes espirituales y tradicionales, ancianos y autoridades para abordar las causas profundas de la discriminación, la desigualdad y la opresión de los Maya y la destrucción de nuestras comunidades y medio ambiente.',
    ),
    lt(
      'We work closely with our Nation and support the process of our unity for the good of our peoples and our earth.',
      'Trabajamos estrechamente con nuestra Nación y apoyamos el proceso de nuestra unidad por el bien de nuestros pueblos y nuestra tierra.',
    ),
    lt(
      'We join in partnerships with allies from other indigenous nations, human rights organizations, academics, scholars, scientists, and faith based communities to stand in solidarity with the struggle of our peoples protecting the earth. Jointly we address the many critical issues affecting not just the Maya but all of humanity and Mother Earth.',
      'Nos unimos en alianzas con aliados de otras naciones indígenas, organizaciones de derechos humanos, académicos, científicos y comunidades de fe para estar en solidaridad con la lucha de nuestros pueblos protegiendo la tierra. Juntos abordamos los muchos problemas críticos que afectan no solo a los Maya sino a toda la humanidad y a la Madre Tierra.',
    ),
  ],
  principles: [
    ls(
      'Guided by spiritual and traditional leaders, elders, and authorities.',
      'Guiados por líderes espirituales y tradicionales, ancianos y autoridades.',
    ),
    ls(
      'Addressing the root causes of discrimination, inequality, and oppression of the Maya.',
      'Abordando las causas profundas de la discriminación, la desigualdad y la opresión de los Maya.',
    ),
    ls(
      'Working in unity with our Nation for the good of our peoples and our earth.',
      'Trabajando en unidad con nuestra Nación por el bien de nuestros pueblos y nuestra tierra.',
    ),
    ls(
      'Joining allies from Indigenous nations, human rights organizations, academia, science, and faith communities.',
      'Uniéndonos con aliados de naciones Indígenas, organizaciones de derechos humanos, academia, ciencia y comunidades de fe.',
    ),
  ],
  quoteLabel: ls('Ancestral reference', 'Referencia ancestral'),
  quote: lt(
    '"They came together and held council in the darkness and in the night, then they searched and discussed, and here they reflected and thought. In this way their decisions came out in clear light."',
    '"Se juntaron y celebraron consejo en la oscuridad y en la noche, luego buscaron y discutieron, y aquí reflexionaron y pensaron. De esta manera sus decisiones salieron a la luz clara."',
  ),
  quoteSource: ls('Pop Wuj', 'Pop Wuj'),
}

// ── Team members ─────────────────────────────────────────────────────────────

/**
 * NOTE on bilingual bios: The existing static content stores English-only
 * bios in both EN and ES slots. We mirror that here as a known TODO — the
 * Studio shows a yellow "Spanish translation recommended" warning so the
 * client can replace them when translations are ready.
 */
const teamMembers = [
  {
    slug: 'juanita',
    name: 'Juanita',
    role: ls('Executive Director', 'Directora Ejecutiva'),
    imagePath: '/site-images/team-juanita.webp',
    bio: [
      'Juanita is Maya Mam and is a survivor of the internal armed conflict in her home country a former political refugee. She now works with Maya leaders and elders through their traditional institutions for environmental protection, recognition of land rights, human rights, cultural preservation and education. Juanita\u2019s work with indigenous peoples has focused on the full and effective use and implementation of the United Nations Declaration on the Rights of Indigenous Peoples. Her emphasis is focused on the right of self-determination and collective rights to lands, territories, natural resources and the environment. She holds a Master of International Public Policy from Johns Hopkins School of Advanced International Studies.',
    ],
    order: 10,
  },
  {
    slug: 'lorena',
    name: 'Lorena',
    role: ls('Policy and Program Manager', 'Gerente de Política y Programas'),
    imagePath: '/site-images/team-lorena.webp',
    bio: [
      'Lorena has worked alongside indigenous leaders, elders, attorneys, and human rights defenders for the past decade. Her work has focused on supporting indigenous peoples from the United States, Mexico, Central and South America in both local and international human rights advocacy.',
      'Her primary areas of work have been policy, communications and fundraising efforts that assist indigenous peoples\u2019 fight for the recognition of their right of self-determination and securing rights to lands, territories and natural resources. Lorena has worked with prominent indigenous led organizations throughout her entire career in support of the indigenous human rights movement. She studied Government and International Politics with a minor in Conflict Analysis and Resolution from George Mason University in the DC area.',
    ],
    order: 20,
  },
  {
    slug: 'ramon',
    name: 'Ramon',
    role: ls('Director of Operations', 'Director de Operaciones'),
    imagePath: '/site-images/team-ramon.webp',
    bio: [
      'Ramon is an organizational development leader committed to amplifying the impact of people and organizations who drive social justice and impact in our communities. His dedication is deeply rooted in his personal experiences, coming from a proud immigrant family that faced social challenges living in low socioeconomic communities. As a youth, he was fortunate to access social resources and community programs that played an instrumental role in helping him overcome social disparities. This lived experience galvanized Ramon to invest in his community through his work, just as his community invested in him. He has dedicated his career to serving missions that aim to rebuild, nourish, and provide equal access to underserved communities. Ramon\u2019s work ensures that the social resources and programs that supported his development as a youth continue to be present and profound for today\u2019s current and future generations. Ramon\u2019s leadership journey began in human resources, where he implemented organizational development strategies to create mission-driven work environments. He intentionally transitioned into operation roles with the goal of aligning human resources, operations, finances, and information technology frameworks to support building cohesion and strategy within organizations. Ramon holds a BAAS degree in Organizational Development and has recently earned a Master\u2019s in Public Leadership from the University of North Texas at Dallas, with a focus on nonprofit and community leadership.',
    ],
    order: 30,
  },
  {
    slug: 'ernesto',
    name: 'Ernesto',
    role: ls(
      'Indigenous Language Rights Program Coordinator',
      'Coordinador del Programa de Derechos Lingüísticos Indígenas',
    ),
    imagePath: '/site-images/team-ernesto.webp',
    bio: [
      "Ernesto is a Maya K\u2019iche\u2019 youth leader. His parents are survivors of the internal armed conflict in his home country and due to war and genocide, his family was internally displaced. He is fluent in Maya K'iche', Ixil, and Spanish because of his upbringing, and is conversational in English. Ernesto's natural leadership formation stems from his parents' resistance, teachings, and survival. Throughout his childhood, he learned about the importance of languages as a tool to fight for the rights of the Maya People. He continues his work as a community leader where he leads and supports the Maya community's access to resources and better understanding of their rights.",
    ],
    order: 40,
  },
  {
    slug: 'manuela',
    name: 'Manuela',
    role: ls('Development Associate', 'Asociada de Desarrollo'),
    imagePath: '/site-images/team-manuela.webp',
    bio: [
      'Manuela is an experienced fundraiser whose work has focused on supporting those most affected by the oppressive systems under which we live. Driven by community-centered practices, she enjoys collaborating with communities to create sustainable fundraising practices to meet ongoing needs and decrease reliance on corporate nonprofits and governmental agencies. Through her work in fundraising, she has been able to collaborate with exceptional movement leaders to produce documentaries exploring the white pathological foundations of Latinidad, provide financial and material support to undocumented communities through wealth redistribution, and support currently and formerly incarcerated folks.',
      'Prior to focusing on fundraising, Manuela worked as a bilingual gender-based violence educator hosting workshops on language access services for survivors, the criminalization of survival, identifying patterns of abuse, and more. Manuela is passionate about food, family, and service, so in her spare time, you can find her baking, laughing with loved ones, and narrating audiobooks for kiddos with learning disabilities.',
    ],
    order: 50,
  },
  {
    slug: 'andrea',
    name: 'Andrea',
    role: ls('Administrative Coordinator', 'Coordinadora Administrativa'),
    imagePath: '/site-images/team-andrea.webp',
    bio: [
      'Andrea is a proud ascendent of the Maya Q\u2019eqchi\u2019 nation. She witnessed firsthand the unfiltered and disproportionate effects that poverty, policing, and racism had on minority communities. This experience has shaped her worldview and given her a deep understanding that just as all collective struggles are intrinsically linked, so is their collective liberation.',
      'Andrea has continued to channel her advocacy through her work at the International Mayan League and particularly through her art as the lead communications assistant for the League. She is intentional about always rooting her activism in truth-telling and allowing the words and stories of her relatives to be told through her graphics, with the hope of sparking real and permanent change.',
    ],
    order: 60,
  },
]

function buildTeamMemberDoc(member, assetRef) {
  return {
    _id: `teamMember-${member.slug}`,
    _type: 'teamMember',
    name: member.name,
    role: member.role,
    image: sanityImageObj(
      assetRef,
      `${member.name} \u2014 International Mayan League`,
      `${member.name} \u2014 Liga Maya Internacional`,
    ),
    bio: member.bio.map((paragraph) => lt(paragraph, paragraph)),
    order: member.order,
  }
}

// ── Board of Directors page ──────────────────────────────────────────────────

const boardMembers = [
  {
    name: 'Felipe',
    boardRole: ls('President', 'Presidente'),
    heritage: 'Maya Mam',
    bio: [
      lt(
        'International Mayan League/USA founding member and member of the Maya Mam Council. He has more than 30 years of advocacy history for the Maya people and the environment.',
        'Miembro fundador de la Liga Maya Internacional/USA y miembro del Consejo Maya Mam. Cuenta con más de 30 años de historia de incidencia por el Pueblo Maya y el medio ambiente.',
      ),
    ],
  },
  {
    name: 'Benito',
    boardRole: ls('Vice President', 'Vicepresidente'),
    heritage: 'Maya Mam',
    bio: [
      lt(
        'International Mayan League/USA founding member',
        'Miembro fundador de la Liga Maya Internacional/USA.',
      ),
    ],
  },
  {
    name: 'Elena',
    boardRole: ls('Treasurer', 'Tesorera'),
    heritage: 'Maya Mam',
    bio: [
      lt(
        'Ajq\u2019ij, Kamalbe traditional spiritual elder of the Regional Council of Ancestral Maya Authorities of her home country; member of the Advisory Council to the Grand National Council of Ancestral Authorities of the Maya, Garifuna and Xinka of Ixim Ulew; member of the leadership council of the Maya Mam Council of her Department; member of Aj Q\u00b4ij, Oxlajuj B\u00b4e of 8 municipalities of the Mam people in her Department; member of the Consultative Group of the Maya Program of the United Nations, Guatemala.',
        'Ajq\u2019ij y anciana espiritual tradicional del Consejo Regional de Autoridades Ancestrales Mayas; integrante de espacios de liderazgo y consulta de autoridades Mayas en Ixim Ulew.',
      ),
    ],
  },
  {
    name: 'Genaro',
    boardRole: ls('Director', 'Director'),
    heritage: 'Maya Q\u2019anjob\u2019al',
    bio: [
      lt(
        'Ajq\u2019ij, traditional spiritual elder, human rights advocate, and advocate for the immigrant community.',
        'Ajq\u2019ij, anciano espiritual tradicional, defensor de derechos humanos y defensor de la comunidad inmigrante.',
      ),
    ],
  },
  {
    name: 'Dr. Daniel',
    boardRole: ls('Director', 'Director'),
    heritage: 'Maya K\u2019iche\u2019',
    bio: [
      lt(
        'Dr. of Philosophy in Maya Cosmovision; Attorney at law in his home country',
        'Doctor en Filosofía en Cosmovisión Maya y abogado en su país de origen.',
      ),
    ],
  },
]

function buildBoardOfDirectorsDoc(heroAssetRef) {
  return {
    _id: 'boardOfDirectorsPage',
    _type: 'boardOfDirectorsPage',
    title: ls('Board Of Directors', 'Junta Directiva'),
    eyebrow: ls('About', 'Acerca de nosotros'),
    introLabel: ls('Who we are', 'Quiénes somos'),
    intro: lt(
      'The Board of Directors of the Mayan League is composed of women and men who are all accomplished individuals including traditional spiritual leaders, elders, philosophers, authors, and advocates.',
      'La Junta Directiva de la Liga Maya está compuesta por mujeres y hombres con trayectorias destacadas, incluyendo líderes espirituales tradicionales, ancianos, filósofos, autores y defensores.',
    ),
    membersSectionLabel: ls('Board members', 'Miembros de la junta'),
    heroImage: sanityImageObj(
      heroAssetRef,
      'International Mayan League board of directors',
      'Junta directiva de la Liga Maya Internacional',
    ),
    members: boardMembers,
  }
}

// ── Our Path page ────────────────────────────────────────────────────────────

function buildOurPathDoc(missionImg, visionImg) {
  return {
    _id: 'ourPathPage',
    _type: 'ourPathPage',
    title: ls('Our mission & vision', 'Nuestra misión y visión'),
    eyebrow: ls('Our Path', 'Nuestro camino'),
    intro: lt(
      'Mission, vision, and shared future for our peoples and Mother Earth.',
      'Misión, visión y futuro compartido para nuestros pueblos y la Madre Tierra.',
    ),
    sections: [
      {
        kicker: ls('Mission', 'Misión'),
        body: [
          lt(
            'The International Maya League promotes the defense of Maya Peoples\u2019 human rights and their dignity in Iximulew and across colonial borders. The worldview of the Original Peoples of Abiayala and the care for Mother Earth guide our cultivation of intergenerational spaces. Through leadership development and healing, we strengthen the power of our Peoples, Nations, Indigenous women and youth, and the LGTBQ2S+ community. With diverse allies, we build solutions and advocacy strategies to realize our dreams of justice, equity, and a respectful future for all of humanity and Mother Earth - to achieve the fullness of life.',
            'La Liga Maya Internacional promueve la defensa de los derechos humanos y la dignidad de los Pueblos Mayas en Iximulew y a través de fronteras coloniales. La cosmovisión de los Pueblos Originarios de Abiayala y el cuidado de la Madre Tierra guían nuestros espacios intergeneracionales. A través del desarrollo de liderazgo y la sanación, fortalecemos el poder de nuestros Pueblos, Naciones, mujeres y juventudes Indígenas, y de la comunidad LGBTQ2S+.',
          ),
        ],
        image: sanityImageObj(
          missionImg,
          'Maya elders walking together on the path of mission',
          'Ancianas y ancianos Mayas caminando juntos en el camino de la misión',
        ),
      },
      {
        kicker: ls('Vision', 'Visión'),
        body: [
          lt(
            'The International Maya League is a Maya organization whose purpose is to promote, preserve, and transmit the cosmovision and worldview, culture, history, and contributions of our ancestors and the values of our traditional knowledge and stewardship of the earth into solutions and actions against current threats and violations affecting our peoples, the earth, and humanity.',
            'La Liga Maya Internacional es una organización Maya cuyo propósito es promover, preservar y transmitir la cosmovisión, cultura, historia y contribuciones de nuestros ancestros.',
          ),
          lt(
            'We are committed to creating a permanent link between our contemporary world and ancestral traditions, respecting the diversity of our Nation while building a shared vision with our peoples, and working closely with other Indigenous peoples, organizations, and allies who support our beliefs and values.',
            'Estamos comprometidos a crear un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales, respetando la diversidad de nuestra Nación y construyendo una visión compartida con nuestros pueblos.',
          ),
        ],
        image: sanityImageObj(
          visionImg,
          'Maya community gathering — vision for the future',
          'Encuentro comunitario Maya \u2014 visión para el futuro',
        ),
      },
    ],
  }
}

// ── Core Values page ─────────────────────────────────────────────────────────

const coreValues = [
  {
    title: ls(
      'We respect and care for Mother Earth and Mother Nature.',
      'Respetamos y cuidamos a la Madre Tierra y la Madre Naturaleza.',
    ),
    iconPath: '/site-images/core-values/value-01-earth.webp',
    body: [
      lt(
        'The Maya have a deep and special relationship with Mother Earth and Mother Nature. We defend her because she is our mother, and it is through her that the Maya dream of remaining connected to the land, our origins, and our way of life. Our connection with Mother Nature, along with the traditional knowledge, history, and ceremonies that arise from this bond, allows us to conserve and protect our lands, territories, and sacred natural elements. Guided by our Vision, we aim to share our message with all of humanity and raise awareness about the harmful ways we have treated the Earth and the cosmos.',
        'El Pueblo Maya tiene una relación profunda y especial con la Madre Tierra y la Madre Naturaleza. La defendemos porque es nuestra madre, y por ella soñamos con permanecer conectados con la tierra, nuestros orígenes y nuestra forma de vida. Nuestra conexión con la Madre Naturaleza, junto con el conocimiento tradicional, la historia y las ceremonias que surgen de este vínculo, nos permite conservar y proteger nuestras tierras, territorios y elementos naturales sagrados. Guiados por nuestra visión, queremos compartir nuestro mensaje con toda la humanidad y crear conciencia sobre el trato dañino que le hemos dado a la tierra y al cosmos.',
      ),
    ],
  },
  {
    title: ls(
      'We Honor our Ancestral Wisdom and Traditions.',
      'Honramos nuestra sabiduría y tradiciones ancestrales.',
    ),
    iconPath: '/site-images/core-values/value-02-ancestral.webp',
    body: [
      lt(
        'We are committed to sharing historical knowledge with children and youth to help them understand their traditions and cultural heritage in order to take pride in their identities. Our ancestral philosophy—rooted in cosmovision, spirituality, and science—allows us to fully experience life and be part of the larger whole. Our connection to the world and the cosmos is the basis of our actions, thoughts, and sentiments in life and of life. We honor and preserve ancestral knowledge and values so that the Maya, especially those living outside traditional Maya territories, can be dynamic conservers of their own culture, history, and traditions.',
        'Estamos comprometidos a compartir conocimientos históricos con niñas, niños y jóvenes para que comprendan sus tradiciones y herencia cultural y se sientan orgullosos de sus identidades. Nuestra filosofía ancestral —arraigada en la cosmovisión, la espiritualidad y la ciencia— nos permite vivir plenamente y ser parte de un todo mayor. Honramos y preservamos el conocimiento y los valores ancestrales para que el Pueblo Maya, especialmente quienes viven fuera de los territorios mayas tradicionales, pueda ser conservador dinámico de su propia cultura, historia y tradiciones.',
      ),
    ],
  },
  {
    title: ls(
      'We believe in the fundamental human rights of Self-Determination, Liberty, and Dignity.',
      'Creemos en los derechos humanos fundamentales de autodeterminación, libertad y dignidad.',
    ),
    iconPath: '/site-images/core-values/value-03-dignity.webp',
    body: [
      lt(
        'Our work and priorities are guided by the vision and practices of our spiritual and traditional leaders, elders, and authorities. We aim to address the root causes of discrimination, inequality, and oppression, the diaspora of the Maya, and the destruction of our communities and environment. We acknowledge the right to exist as distinct peoples, the right to self-determination and self-government, and the right to be free and equal to all other peoples, without discrimination. (See United Nations Declaration on the Rights of Indigenous Peoples, art. 1, 2,3,4, and 5. Sept. 13, 2007).',
        'Nuestro trabajo y nuestras prioridades están guiados por la visión y las prácticas de nuestros líderes espirituales y tradicionales, ancianos y autoridades. Buscamos abordar las causas profundas de la discriminación, la desigualdad y la opresión, la diáspora del Pueblo Maya y la destrucción de nuestras comunidades y nuestro medio ambiente. Reconocemos el derecho a existir como pueblos distintos, el derecho a la autodeterminación y al autogobierno, y el derecho a ser libres e iguales a todos los demás pueblos, sin discriminación. (Véase la Declaración de las Naciones Unidas sobre los Derechos de los Pueblos Indígenas, arts. 1, 2, 3, 4 y 5. 13 de septiembre de 2007).',
      ),
    ],
  },
  {
    title: ls(
      'We have a responsibility to Care for Each Other.',
      'Tenemos la responsabilidad de cuidarnos mutuamente.',
    ),
    iconPath: '/site-images/core-values/value-04-care.webp',
    body: [
      lt(
        'We recognize that all of humanity is interconnected; therefore, we have a duty to care for one another. The greatest expression of our humanity is loving and supporting one another. This act of caring is evident not only within our communities, families, and internal teams but also in how we take care of ourselves.',
        'Reconocemos que toda la humanidad está interconectada; por lo tanto, tenemos el deber de cuidarnos unas a otras y unos a otros. La mayor expresión de nuestra humanidad es amarnos y apoyarnos mutuamente. Este acto de cuidado se manifiesta no solo en nuestras comunidades, familias y equipos internos, sino también en cómo nos cuidamos a nosotras y nosotros mismos.',
      ),
    ],
  },
  {
    title: ls(
      'We place Humility at the core of our work.',
      'Ponemos la humildad en el centro de nuestro trabajo.',
    ),
    iconPath: '/site-images/core-values/value-05-humility.webp',
    body: [
      lt(
        'Humility is grounded in the values of the Culture of the Corn, which serves as the foundation for mental clarity and spiritual strength in all our actions. This culture is shaped by lived experiences that guide us in approaching life and reflecting on humility, prompting us to "look in the mirror" and examine ourselves. Through our humility, we cultivate curiosity, enabling us to grow continuously through self-examination, experimentation, and adaptation.',
        'La humildad está arraigada en los valores de la Cultura del Maíz, que sirve de base para la claridad mental y la fuerza espiritual en todas nuestras acciones. Esta cultura se forma por experiencias vividas que nos guían al acercarnos a la vida y reflexionar sobre la humildad, invitándonos a "mirarnos al espejo" y examinarnos. A través de la humildad cultivamos la curiosidad, lo que nos permite crecer continuamente mediante la autoexploración, la experimentación y la adaptación.',
      ),
    ],
  },
  {
    title: ls(
      'We embrace Accountability and Transparency to guide our actions.',
      'Abrazamos la rendición de cuentas y la transparencia para guiar nuestras acciones.',
    ),
    iconPath: '/site-images/core-values/value-06-accountability.webp',
    body: [
      lt(
        'We believe in fostering a positive culture of accountability and transparency that builds trust and encourages open communication within our organization. These values create an environment where members can respectfully hold one another accountable for their actions and commitments, both in our work and in the communities we serve. By clearly defining and articulating our expectations and objectives, we position ourselves to work effectively toward our shared goals.',
        'Creemos en fomentar una cultura positiva de rendición de cuentas y transparencia que construya confianza y fomente la comunicación abierta dentro de nuestra organización. Estos valores crean un entorno donde las integrantes y los integrantes pueden responsabilizarse mutuamente con respeto por sus acciones y compromisos, tanto en nuestro trabajo como en las comunidades a las que servimos. Al definir y articular claramente nuestras expectativas y objetivos, nos posicionamos para trabajar de manera efectiva hacia metas compartidas.',
      ),
    ],
  },
  {
    title: ls(
      'We Envision a Future that realizes and celebrates all life and liberation.',
      'Imaginamos un futuro que realiza y celebra toda vida y liberación.',
    ),
    iconPath: '/site-images/core-values/value-07-future.webp',
    body: [
      lt(
        'Inspired by our ancestors, we dream of a world where humanity collaborates to shape a culture that drives life to flourish. As we imagine this future, we draw upon the traditional teachings and values of Maya Cosmovision that advocate for freedom, fraternity, solidarity, love, kindness, and compassion. We anchor ourselves in our visions for a world, encompassing ecology, politics, economy, and society, ensuring the celebration of life by listening to and expressing diverse perspectives and promoting the reconciliation of humanity with the cosmos.',
        'Inspirados por nuestros ancestros, soñamos con un mundo donde la humanidad colabore para crear una cultura que impulse la vida a florecer. Al imaginar este futuro, nos apoyamos en las enseñanzas y valores tradicionales de la Cosmovisión Maya que abogan por la libertad, la fraternidad, la solidaridad, el amor, la bondad y la compasión. Nos anclamos en nuestras visiones de un mundo —ecología, política, economía y sociedad— asegurando la celebración de la vida al escuchar y expresar perspectivas diversas y promover la reconciliación de la humanidad con el cosmos.',
      ),
    ],
  },
]

function buildCoreValuesDoc(valueAssetMap, heroAssetRef) {
  return {
    _id: 'coreValuesPage',
    _type: 'coreValuesPage',
    title: ls('Our Core Values', 'Nuestros valores'),
    eyebrow: ls('About', 'Acerca de nosotros'),
    intro: lt(
      'Seven principles rooted in Maya cosmovision guide how we defend our peoples, care for Mother Earth, and build a future of dignity, accountability, and liberation.',
      'Siete principios arraigados en la cosmovisión Maya guían cómo defendemos a nuestros pueblos, cuidamos a la Madre Tierra y construimos un futuro de dignidad, rendición de cuentas y liberación.',
    ),
    heroImage: sanityImageObj(
      heroAssetRef,
      'Maya symbol of Mother Earth',
      'Símbolo Maya de la Madre Tierra',
    ),
    values: coreValues.map((value) => ({
      title: value.title,
      icon: sanityImageObj(valueAssetMap[value.iconPath], '', ''),
      body: value.body,
    })),
  }
}

// ── Job Opportunities page ───────────────────────────────────────────────────

const jobOpportunitiesDoc = {
  _id: 'jobOpportunitiesPage',
  _type: 'jobOpportunitiesPage',
  title: ls('Current position(s)', 'Puesto(s) actual(es)'),
  eyebrow: ls('Job Opportunities', 'Oportunidades de empleo'),
  intro: lt(
    'Join our mission-driven team. Review the open role below and reach out if you are interested in supporting Maya-led organizing and operations.',
    'Únase a nuestro equipo con propósito. Revise el puesto abierto a continuación y contáctenos si desea apoyar la organización y operaciones lideradas por Maya.',
  ),
  listings: [
    {
      kicker: ls('Part-time \u00b7 Administrative', 'Medio tiempo \u00b7 Administrativo'),
      title: ls(
        'Part-time Administrative Coordinator',
        'Coordinador/a Administrativo/a de medio tiempo',
      ),
      body: [
        lt(
          "The Mayan League is seeking a highly organized, proactive, and adaptable Administrative Coordinator to provide part-time support to staff, Board of Directors, and volunteers. The Coordinator will play a key role in keeping the organization's operations by providing general administrative support, including document management and maintaining organizational records. This position will be responsible for coordinating day-to-day office operations, maintaining administrative systems related to accounting and information technology, and ensuring that organizational processes run effectively.",
          'La Liga Maya busca una persona altamente organizada, proactiva y adaptable para brindar apoyo administrativo de medio tiempo al personal, la Junta Directiva y voluntariado.',
        ),
        lt(
          'Key objectives include supporting the leadership team and Board, as well as facilitating cross-functional collaboration with internal teams and external partners as necessary. The ideal candidate will be bilingual or multilingual, possess strong organizational skills, attention to detail, and the ability to manage multiple responsibilities in a dynamic, collaborative, and culturally diverse environment. This is an excellent opportunity for someone who thrives in a fast-paced, mission-driven setting and is eager to contribute to meaningful work. Experience working with Native American and Indigenous communities is preferred but not required.',
          'La persona coordinadora tendrá un papel clave en las operaciones de la organización, incluyendo apoyo administrativo general, gestión de documentos, mantenimiento de registros y coordinación de sistemas administrativos.',
        ),
      ],
    },
  ],
}

// ── Run ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n🌿  Migrating About-family content to Sanity (${projectId} / ${dataset})\n`)

  // Step 1: upload all 16 image assets in parallel (deduplicated server-side).
  const imagePaths = Array.from(
    new Set([
      ...teamMembers.map((m) => m.imagePath),
      '/site-images/page-board-of-directors.webp',
      '/site-images/page-our-path-1.webp',
      '/site-images/page-our-path-2.webp',
      ...coreValues.map((v) => v.iconPath),
    ]),
  )

  console.log(`📷  Uploading ${imagePaths.length} image assets…`)
  const assetMap = {}
  for (const path of imagePaths) {
    try {
      assetMap[path] = await uploadImage(path)
      console.log(`   ✓  ${path}`)
    } catch (err) {
      console.error(`   ❌  ${path}: ${err.message || err}`)
      process.exit(1)
    }
  }

  // Step 2: build all 11 documents (5 singletons + 6 team members).
  const docs = [
    aboutPageDoc,
    buildBoardOfDirectorsDoc(assetMap['/site-images/page-board-of-directors.webp']),
    buildOurPathDoc(
      assetMap['/site-images/page-our-path-1.webp'],
      assetMap['/site-images/page-our-path-2.webp'],
    ),
    buildCoreValuesDoc(
      Object.fromEntries(coreValues.map((v) => [v.iconPath, assetMap[v.iconPath]])),
      assetMap['/site-images/core-values/value-01-earth.webp'],
    ),
    jobOpportunitiesDoc,
    ...teamMembers.map((member) => buildTeamMemberDoc(member, assetMap[member.imagePath])),
  ]

  console.log(`\n📝  Writing ${docs.length} documents…`)
  let created = 0
  let updated = 0
  for (const doc of docs) {
    try {
      const existing = await client.getDocument(doc._id)
      await client.createOrReplace(doc)
      if (existing) {
        console.log(`   ↻  Updated : ${doc._id}`)
        updated++
      } else {
        console.log(`   ✓  Created : ${doc._id}`)
        created++
      }
    } catch (err) {
      console.error(`   ❌  ${doc._id}: ${err.message || err}`)
      process.exit(1)
    }
  }

  console.log(`\n✅  Done — ${created} created, ${updated} updated.`)
  console.log('Open Studio → About pages / Team members to verify the content.\n')
}

run()
