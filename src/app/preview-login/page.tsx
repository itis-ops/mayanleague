import { Suspense } from 'react'
import PreviewLoginForm from './PreviewLoginForm'

export const metadata = {
  title: 'Preview access | International Mayan League',
  robots: { index: false, follow: false },
}

export default function PreviewLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-mist" />}>
      <PreviewLoginForm />
    </Suspense>
  )
}
