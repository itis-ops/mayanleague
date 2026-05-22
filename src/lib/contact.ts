import type { Lang } from './i18n'

export const CONTACT_EMAIL = 'info@mayanleague.org'

export function buildJobApplicationMailto(jobTitle: string, lang: Lang) {
  const subject =
    lang === 'es' ? `Solicitud: ${jobTitle}` : `Application: ${jobTitle}`

  const body =
    lang === 'es'
      ? `Hola,\n\nMe gustaría presentar mi solicitud para el puesto de ${jobTitle}.\n\n[Nombre completo]\n[Correo electrónico]\n[Teléfono]\n\nSaludos cordiales,`
      : `Hello,\n\nI would like to apply for the ${jobTitle} position.\n\n[Full name]\n[Email address]\n[Phone number]\n\nBest regards,`

  const params = new URLSearchParams({
    subject,
    body,
  })

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`
}
