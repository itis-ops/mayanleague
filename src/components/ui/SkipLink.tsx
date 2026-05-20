'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function SkipLink() {
  const { t } = useLanguage()

  return (
    <a href="#main-content" className="skip-link">
      {t.ui.skipToMain}
    </a>
  )
}
