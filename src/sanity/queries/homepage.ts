/**
 * GROQ projection for the `homepage` singleton.
 *
 * All localizedString / localizedText fields have the shape { en, es } from the
 * schema — we select the whole sub-object so the mapper can extract each locale.
 */

export const homepageQuery = `*[_type == "homepage"][0] {
  hero {
    eyebrow,
    tagline,
    clarityLine,
    ctaDonate,
    ctaConnect,
    proofPoints[]
  },
  impactMoment {
    label,
    kicker,
    heading,
    body,
    readStatement,
    statementUrl
  },
  mission {
    sectionLabel,
    sectionKicker,
    heading,
    boardStatement[],
    boardStatementAttribution,
    learnMore
  },
  programsSpotlight {
    heading,
    intro,
    learnMore,
    items[] {
      name,
      description,
      href
    }
  },
  callToAction {
    eyebrow,
    heading,
    body,
    donate,
    donateOnce,
    connect
  },
  resourcesSpotlight {
    sectionLabel,
    sectionKicker,
    eyebrow,
    heading,
    explore,
    items[] {
      title,
      description
    }
  },
  newsRail {
    kicker,
    headline,
    viewAll
  }
}`
