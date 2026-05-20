import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { getNewsArticle, getNewsSocial } from '@/lib/news'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

interface ImageProps {
  params: Promise<{ slug: string }>
}

function fitTitle(title: string) {
  return title.length > 92 ? `${title.slice(0, 89)}...` : title
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) notFound()

  const social = getNewsSocial(article)
  const title = fitTitle(article.title)
  const description = social.description.length > 132 ? `${social.description.slice(0, 129)}...` : social.description

  if (article.mainImage) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            background: '#242424',
            color: '#f8f2f2',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          <div style={{ width: 690, height: '100%', display: 'flex' }}>
            <img
              src={article.mainImage.url}
              alt={article.mainImage.alt}
              width={690}
              height={630}
              style={{ width: 690, height: 630, objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '50px 48px 42px',
              background: '#242424',
            }}
          >
            <div>
              <div
                style={{
                  marginBottom: 34,
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#f2a51f',
                }}
              >
                {article.category}
              </div>
              <div
                style={{
                  fontSize: title.length > 68 ? 42 : 50,
                  lineHeight: 0.96,
                  letterSpacing: '-0.045em',
                  textTransform: 'uppercase',
                  fontWeight: 900,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: 24,
                  fontSize: 23,
                  lineHeight: 1.16,
                  fontWeight: 700,
                  color: '#d9c7c0',
                }}
              >
                {description}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderTop: '2px solid rgba(248,242,242,0.22)',
                paddingTop: 20,
              }}
            >
              <div style={{ fontSize: 19, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                International Mayan League
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#d9c7c0' }}>
                Photo: {article.mainImage.photographerName}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f8f2f2',
          color: '#242424',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            width: 92,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, background: '#242424' }} />
          <div style={{ height: 42, background: '#9d5a4e' }} />
          <div style={{ height: 58, background: '#f2a51f' }} />
          <div style={{ height: 118, background: '#df0712' }} />
          <div style={{ flex: 1, background: '#f8f2f2' }} />
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '58px 64px 50px 60px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#df0712',
              }}
            >
              {article.category}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#4f4945',
              }}
            >
              International Mayan League
            </div>
          </div>

          <div>
            <div
              style={{
                maxWidth: 880,
                fontSize: title.length > 58 ? 58 : 68,
                lineHeight: 0.92,
                letterSpacing: '-0.055em',
                textTransform: 'uppercase',
                fontWeight: 900,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 28,
                maxWidth: 820,
                fontSize: 28,
                lineHeight: 1.18,
                fontWeight: 700,
                color: '#4f4945',
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '2px solid #d9c7c0',
              paddingTop: 22,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Newsroom dispatch
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {social.hashtags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    border: '2px solid #d9c7c0',
                    borderRadius: 999,
                    padding: '8px 14px',
                    fontSize: 16,
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
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
