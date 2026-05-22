'use client'

import Button from '@/components/ui/Button'
import { useLanguage } from '@/hooks/useLanguage'
import { buildJobApplicationMailto } from '@/lib/contact'

interface JobApplyButtonProps {
  jobTitle: string
}

export default function JobApplyButton({ jobTitle }: JobApplyButtonProps) {
  const { lang } = useLanguage()
  const label = lang === 'es' ? 'Solicitar' : 'Apply'
  const href = buildJobApplicationMailto(jobTitle, lang)
  const ariaLabel =
    lang === 'es'
      ? `Solicitar el puesto de ${jobTitle} por correo electrónico`
      : `Apply for ${jobTitle} by email`

  return (
    <div className="mt-10 border-t border-cream-dark pt-8">
      <Button href={href} variant="primary" ariaLabel={ariaLabel}>
        {label}
      </Button>
    </div>
  )
}
