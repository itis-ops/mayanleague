import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { getNewsArticleBySlug } from '@/lib/newsRepository'
import { NewsOpenGraphCard } from '@/lib/newsShareImageCards'
import { getMayanLeagueLogoDataUrl, getShareImageFonts } from '@/lib/shareImageRenderer'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface ImageProps {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)
  if (!article) notFound()

  const [logoSrc, fonts] = await Promise.all([getMayanLeagueLogoDataUrl(), getShareImageFonts()])

  return new ImageResponse(
    (
      <NewsOpenGraphCard
        logoSrc={logoSrc}
        category={article.category}
        title={article.title}
        description={article.dek || article.summary}
      />
    ),
    { ...size, fonts },
  )
}
