import type { Lang } from './i18n'
import { resourceCollections, resourceNav, uiCopy } from './siteContent'

export function localizedResourceNavLinks(lang: Lang) {
  return [
    { label: uiCopy[lang].resources, href: '/resources' },
    ...resourceNav.map((link) => {
      const slug = link.href.replace(/^\//, '')
      const label =
        slug === 'indigenous-language-resources'
          ? lang === 'es'
            ? 'Recursos de Idiomas Indígenas'
            : 'Indigenous Language Resources'
          : resourceCollections[lang][slug as keyof typeof resourceCollections.en]?.label || link.label

      return { ...link, label }
    }),
  ]
}

export const resourceCategories = [
  { label: 'LGBTQIA2S+', href: '/lgbtqia2s' },
  { label: 'Land Rights', href: '/land-rights' },
  { label: 'Sovereignty and Self-Determination', href: '/sovereignty-and-self-determination' },
  { label: 'Indigenous Language Resources', href: '/indigenous-language-resources' },
  { label: 'Indigenous Forced Migration', href: '/indigenous-forced-migration' },
  { label: 'Indigenous Children', href: '/indigenous-children' },
  { label: 'Indigenous Human Rights', href: '/indigenous-human-rights' },
]

export const indigenousLanguageResources = {
  title: 'Indigenous Language Resources',
  eyebrow: 'Resources',
  intro: [
    'The International Mayan League has created these linguistically and culturally tailored audiovisual Know Your Rights (KYR) resources to address the severe information gap facing Maya refugees, asylum seekers, migrants and established individuals and families in Turtle Island (North America). We have prepared these resources in Mayan languages because many people in our communities have low literacy levels in their native languages and Spanish due to structural racism and discrimination in the educational system in Iximulew (Guatemala). Just in Iximulew the Maya speak 22 distinct Mayan Languages and audiovisuals are the most effective method to share information. As the ongoing threats of raids, deportations and family separations continues to impact all our communities across the country, we hope that these resources can help inform our community of their rights and stay vigilant.',
    'La Liga Maya Internacional ha creado estos recursos audiovisuales de "Conozca sus Derechos" (KYR por sus siglas en inglés) adaptados a las necesidades lingüísticas y culturales de los Pueblos Mayas para abordar la grave falta de información que enfrentan los refugiados, solicitantes de asilo, migrantes e individuos y familias Maya establecidas en la Isla Tortuga (América del Norte). Hemos preparado estos recursos audiovisuales en idiomas Mayas debido a que muchas personas en nuestras comunidades tienen bajos niveles de alfabetización en sus idiomas maternos y en español debido al racismo estructural y la discriminación en el sistema educativo de Iximulew (Guatemala). Solo en Iximulew, los Mayas hablan 22 idiomas Mayas distintos, y los recursos audiovisuales son el método más eficaz para compartir información.',
  ],
  credit: 'Recording and Editing by International Mayan League/USA',
  download: {
    label: 'Download KYR Resources / Descargar Recursos KYR',
    href: 'https://drive.google.com/drive/folders/1Bg0wGVbeYs1IlWMO-JvKMz5eatHfe0OD?dmr=1&ec=wgc-drive-hero-goto',
  },
  groups: [
    {
      title: 'Maya Ixil, Nebaj, department of Quiché',
      links: [
        { label: '¡Conozca sus derechos durante una redada de casa! / Know your rights during an ICE raid', href: 'https://www.facebook.com/share/v/1YZYCJ6LKq/' },
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/1AkUTQi7k7/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/716632601340507/?rdid=h4SBERtMPqCDgOU6#' },
      ],
    },
    {
      title: 'Maya Kaqchikel, Patzún, Department of Chimaltenango',
      links: [
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/19adqjNPck/' },
      ],
    },
    {
      title: 'Maya Kaqchikel, San Antonio, Sololá',
      links: [
        { label: 'Cómo crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/share/v/14EMW3cS4pB/' },
      ],
    },
    {
      title: 'Maya K’iche’, El Quiché, department of Quiché',
      links: [
        { label: 'La Tarjeta Roja: Tienes Derechos, No importa tu Estatus Migratorio / Red Card: You have Rights, Regardless of your Immigration Status', href: 'https://www.facebook.com/mayanleague/videos/1678429543074537' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/1715958359282969/?rdid=Srd0D4XYOOYRA9Sf#' },
      ],
    },
    {
      title: 'Maya K’iche’, Santa Catarina Ixtahuacán, department of Sololá',
      links: [
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/16eZMJbHy7/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/1872784196901869/?rdid=8ioiPjh6KsT5IWsZ#' },
      ],
    },
    {
      title: 'Maya Mam, Concepción Chiquirichapa, department of Quetzaltenango',
      links: [
        { label: 'Conozca sus derechos en Maya Mam / Know your rights in Maya Mam', href: 'https://www.facebook.com/share/v/18jetNY9Em/' },
        { label: 'Si la migra (ICE) viene a su casa / If ICE comes to your house', href: 'https://www.facebook.com/share/v/1BforLXLfq/' },
        { label: 'Si la migra (ICE) le detiene en un lugar público / If you are detained by ICE in a public place', href: 'https://www.facebook.com/share/v/1C7mHqPSMn/' },
        { label: 'Si la migra (ICE) o la policía arresta o detiene a un ser querido / If ICE or the police arrest or detain a family member', href: 'https://www.facebook.com/share/v/1Br5HvPJyC/' },
        { label: '¡Antes de que pase algo, hay que prepararse! / Before something happens, prepare yourself', href: 'https://www.facebook.com/share/v/19C9heANb8/' },
        { label: 'La tarjeta “Conozca sus derechos” / Know your rights card', href: 'https://www.facebook.com/share/v/19KVBiq9BE/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/1525367481779038/?rdid=LTfz5fetR5qwKBaN#' },
      ],
    },
    {
      title: 'Maya Mam, San Sebastián, department of Huehuetenango',
      links: [
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/1AbHQSsPmV/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/1113081057350818/?rdid=uJ3rQRxxuHiDTxeW#' },
      ],
    },
    {
      title: 'Maya Mam, Santiago Chimaltenango, department of Huehuetenango',
      links: [
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/159DN6VWwo/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/738943138880390/?rdid=N4o7sxVfoVFFr8yq#' },
      ],
    },
    {
      title: "Maya Q'anjob'al, San Juan Ixcoy, department of Huehuetenango",
      links: [
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/19D4vFBXSR/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/9619049128194699/?rdid=WqCEbyuiqLlk98rx#' },
      ],
    },
    {
      title: 'Maya Q’eqchi’, Ixcán, department of Quiché',
      links: [
        { label: 'Conozca sus derechos con las tarjetas rojas / Know Your Rights with the Red Cards', href: 'https://www.facebook.com/share/v/18uPGNh88V/' },
        { label: 'Como crear un plan de preparación familiar / How to create a family preparedness plan', href: 'https://www.facebook.com/mayanleague/videos/579464388436936/?rdid=JCUGDjTVexm5j9HN#' },
      ],
    },
  ],
}
