/** GROQ projection for the `siteSettings` singleton. */

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  brand { short, full },
  nav { about, programs, resources, media, contact, donate },
  footer {
    tagline,
    quickLinks,
    contact,
    whoWeAre,
    whatWeDo,
    getInvolved,
    whoLinks[],
    involvedLinks[],
    socialLabel,
    copyright
  },
  contact {
    email,
    phone,
    addressLines
  },
  social {
    facebook,
    instagram,
    youtube,
    twitter
  },
  donateUrl,
  defaultSocialTitle,
  defaultSocialDescription
}`
