import type { Lang } from './i18n'
import { programNav, programPages, programsIndex, uiCopy } from './siteContent'

export function slugFromHref(href: string) {
  return href.replace(/^\//, '')
}

export function localizedProgramNavLinks(lang: Lang) {
  return [
    { label: uiCopy[lang].programs, href: '/programs' },
    ...programNav.map((link) => {
      const slug = slugFromHref(link.href)
      return { ...link, label: programPages[lang][slug]?.label || link.label }
    }),
  ]
}

export function getProgramPage(lang: Lang, slug: string) {
  return programPages[lang][slug]
}

export function getProgramsIndex(lang: Lang) {
  return programsIndex[lang]
}
