import { ImageResponse } from 'next/og'
import { getNewsArticleBySlug } from '@/lib/newsRepository'
import { NewsInstagramStoryCard } from '@/lib/newsShareImageCards'
import { getMayanLeagueLogoDataUrl, getShareImageFonts } from '@/lib/shareImageRenderer'

export const runtime = 'nodejs'

interface RouteProps {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { slug } = await params
    const article = await getNewsArticleBySlug(slug)

    if (!article) {
      return new Response('Not found', { status: 404 })
    }

    const [logoSrc, fonts] = await Promise.all([getMayanLeagueLogoDataUrl(), getShareImageFonts()])

    return new ImageResponse(
      (
        <NewsInstagramStoryCard
          logoSrc={logoSrc}
          category={article.category}
          title={article.title}
          description={article.dek || article.summary}
        />
      ),
      { width: 1080, height: 1920, fonts },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown image error'
    console.error('[instagram-story-image]', error)
    return new Response(message, { status: 500 })
  }
}
