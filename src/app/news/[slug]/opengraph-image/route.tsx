import { ImageResponse } from 'next/og'
import { getNewsArticleBySlug } from '@/lib/newsRepository'
import { getLocalizedNewsArticle } from '@/lib/news'
import { NewsOpenGraphCard } from '@/lib/newsShareImageCards'
import { getMayanLeagueLogoDataUrl, getShareImageFonts } from '@/lib/shareImageRenderer'

export const runtime = 'nodejs'

const SIZE = { width: 1200, height: 630 } as const

interface RouteProps {
  params: Promise<{ slug: string }>
}

/**
 * OG image route — accepts ?lang=es to render the Spanish version of the card.
 * Default (no lang or any value other than "es") renders English.
 *
 * The page-level Open Graph metadata in `page.tsx` points scrapers at this URL
 * with the appropriate `?lang=` so Facebook/X show the correct language card
 * when a Spanish reader shares the article.
 */
export async function GET(request: Request, { params }: RouteProps) {
  try {
    const { slug } = await params
    const article = await getNewsArticleBySlug(slug)

    if (!article) {
      return new Response('Not found', { status: 404 })
    }

    const url = new URL(request.url)
    const lang = url.searchParams.get('lang') === 'es' ? 'es' : 'en'
    const view = lang === 'es' ? getLocalizedNewsArticle(article, 'es') : article

    const [logoSrc, fonts] = await Promise.all([
      getMayanLeagueLogoDataUrl(),
      getShareImageFonts(),
    ])

    return new ImageResponse(
      (
        <NewsOpenGraphCard
          logoSrc={logoSrc}
          category={view.category}
          title={view.title}
          description={view.dek || view.summary || ''}
          locale={lang}
        />
      ),
      { ...SIZE, fonts },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown image error'
    console.error('[news/opengraph-image]', error)
    return new Response(message, { status: 500 })
  }
}
