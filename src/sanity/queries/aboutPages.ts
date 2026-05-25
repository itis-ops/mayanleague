/**
 * GROQ projections for the About-family singletons + the team member type.
 *
 * sanityImage objects are projected with their alt/caption/credit subfields
 * and the asset reference expanded to include a public URL.
 */

const imageProjection = `{
  alt,
  caption,
  credit,
  asset->{_id, url}
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  heroHeading,
  methodStatement,
  whoWeAreLabel,
  howWeWorkLabel,
  paragraphs[],
  principles[],
  quoteLabel,
  quote,
  quoteSource,
  seo
}`

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc, _createdAt asc) {
  _id,
  name,
  role,
  bio[],
  order,
  image ${imageProjection}
}`

export const boardOfDirectorsPageQuery = `*[_type == "boardOfDirectorsPage"][0] {
  title,
  eyebrow,
  introLabel,
  intro,
  membersSectionLabel,
  heroImage ${imageProjection},
  members[] {
    name,
    boardRole,
    heritage,
    bio[]
  },
  seo
}`

export const ourPathPageQuery = `*[_type == "ourPathPage"][0] {
  title,
  eyebrow,
  intro,
  sections[] {
    kicker,
    body[],
    image ${imageProjection}
  },
  seo
}`

export const coreValuesPageQuery = `*[_type == "coreValuesPage"][0] {
  title,
  eyebrow,
  intro,
  heroImage ${imageProjection},
  values[] {
    title,
    body[],
    icon ${imageProjection}
  },
  seo
}`

export const jobOpportunitiesPageQuery = `*[_type == "jobOpportunitiesPage"][0] {
  title,
  eyebrow,
  intro,
  listings[] {
    kicker,
    title,
    body[]
  },
  seo
}`
