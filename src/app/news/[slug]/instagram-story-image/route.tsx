import { ImageResponse } from 'next/og'
import { getNewsSocial } from '@/lib/news'
import { getNewsArticleBySlug } from '@/lib/newsRepository'

interface RouteProps {
  params: Promise<{ slug: string }>
}

function fitTitle(title: string) {
  return title.length > 118 ? `${title.slice(0, 115)}...` : title
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) {
    return new Response('Not found', { status: 404 })
  }

  const social = getNewsSocial(article)
  const title = fitTitle(social.title)
  const description = social.description.length > 180 ? `${social.description.slice(0, 177)}...` : social.description

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f8f2f2',
          color: '#242424',
          padding: '96px 76px 82px',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 116,
              height: 116,
              display: 'flex',
              flexDirection: 'column',
              border: '3px solid #242424',
            }}
          >
            <div style={{ flex: 1, background: '#242424' }} />
            <div style={{ flex: 1, background: '#9d5a4e' }} />
            <div style={{ flex: 1, background: '#f2a51f' }} />
            <div style={{ flex: 1, background: '#df0712' }} />
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '0.16em',
              lineHeight: 1.1,
              textAlign: 'right',
              textTransform: 'uppercase',
              color: '#df0712',
            }}
          >
            {article.category}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: title.length > 76 ? 78 : 92,
              lineHeight: 0.9,
              letterSpacing: '-0.065em',
              textTransform: 'uppercase',
              fontWeight: 900,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 42,
              fontSize: 38,
              lineHeight: 1.14,
              fontWeight: 700,
              color: '#4f4945',
            }}
          >
            {description}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
            {social.hashtags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  border: '2px solid #d9c7c0',
                  borderRadius: 999,
                  padding: '10px 18px',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#4f4945',
                }}
              >
                #{tag.replace(/^#/, '')}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: '3px solid #d9c7c0',
              paddingTop: 28,
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            International Mayan League
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  )
}
