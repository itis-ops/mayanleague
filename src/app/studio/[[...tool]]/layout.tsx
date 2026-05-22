/**
 * Studio layout — overrides the root site metadata and excludes the route from
 * search indexing. The `<html>` and `<body>` come from `src/app/layout.tsx`
 * (which is fine for the Studio — it adds no visual chrome, just font
 * variables and the `LanguageProvider` context which the Studio ignores).
 */
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Mayan League Studio',
  description: 'Content management for the Mayan League website.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
