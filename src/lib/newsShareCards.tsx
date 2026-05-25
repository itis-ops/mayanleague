import type { NewsArticle } from '@/lib/news'
import { getNewsSocial } from '@/lib/news'

export const shareBrand = {
  cream: '#f8f2f2',
  ink: '#242424',
  earthRed: '#df0712',
  gold: '#f2a51f',
  clay: '#9d5a4e',
  mist: '#4f4945',
  line: '#d9c7c0',
} as const

export function fitShareText(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 3)}...` : value
}

function ColorBand({ vertical = false }: { vertical?: boolean }) {
  const colors = [shareBrand.ink, shareBrand.clay, shareBrand.gold, shareBrand.earthRed]

  if (vertical) {
    return (
      <div style={{ width: 88, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: shareBrand.ink }} />
        <div style={{ height: 36, background: shareBrand.clay }} />
        <div style={{ height: 52, background: shareBrand.gold }} />
        <div style={{ height: 96, background: shareBrand.earthRed }} />
        <div style={{ flex: 1, background: shareBrand.cream }} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', width: 112, height: 112, flexDirection: 'column', border: `3px solid ${shareBrand.ink}` }}>
      {colors.map((color) => (
        <div key={color} style={{ flex: 1, background: color }} />
      ))}
    </div>
  )
}

interface ShareCardContent {
  category: string
  title: string
  description: string
  hashtags: string[]
  imageUrl?: string
  photographerName?: string
}

export function InstagramStoryShareCard({
  category,
  title,
  description,
  hashtags,
  imageUrl,
}: ShareCardContent) {
  const displayTitle = fitShareText(title, 110)
  const displayDescription = fitShareText(description, 170)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: shareBrand.cream,
        color: shareBrand.ink,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      {imageUrl ? (
        <div style={{ position: 'relative', height: 920, width: '100%', display: 'flex' }}>
          <img
            src={imageUrl}
            alt=""
            width={1080}
            height={920}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(36,36,36,0.08) 0%, rgba(36,36,36,0.72) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 64,
              right: 64,
              bottom: 56,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: shareBrand.gold,
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontSize: displayTitle.length > 70 ? 68 : 78,
                lineHeight: 0.92,
                letterSpacing: '-0.06em',
                textTransform: 'uppercase',
                fontWeight: 900,
                color: '#fff',
              }}
            >
              {displayTitle}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '88px 64px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <ColorBand />
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.16em',
              lineHeight: 1.1,
              textAlign: 'right',
              textTransform: 'uppercase',
              color: shareBrand.earthRed,
              maxWidth: 420,
            }}
          >
            {category}
          </div>
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: imageUrl ? '48px 64px 72px' : '56px 64px 72px',
        }}
      >
        {!imageUrl ? (
          <div
            style={{
              fontSize: displayTitle.length > 70 ? 72 : 84,
              lineHeight: 0.9,
              letterSpacing: '-0.065em',
              textTransform: 'uppercase',
              fontWeight: 900,
            }}
          >
            {displayTitle}
          </div>
        ) : null}

        <div
          style={{
            fontSize: 34,
            lineHeight: 1.16,
            fontWeight: 700,
            color: shareBrand.mist,
            marginTop: imageUrl ? 0 : 36,
          }}
        >
          {displayDescription}
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            {hashtags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  border: `2px solid ${shareBrand.line}`,
                  borderRadius: 999,
                  padding: '10px 18px',
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: shareBrand.mist,
                }}
              >
                #{tag.replace(/^#/, '')}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: `3px solid ${shareBrand.line}`,
              paddingTop: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: shareBrand.ink,
              }}
            >
              International Mayan League
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: shareBrand.earthRed,
              }}
            >
              Newsroom
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeedShareCard({
  category,
  title,
  description,
  hashtags,
  imageUrl,
  photographerName,
}: ShareCardContent) {
  const displayTitle = fitShareText(title, 90)
  const displayDescription = fitShareText(description, 130)

  if (imageUrl) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: shareBrand.ink,
          color: shareBrand.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ width: 690, height: '100%', display: 'flex' }}>
          <img
            src={imageUrl}
            alt=""
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
            padding: '48px 44px 40px',
          }}
        >
          <div>
            <div
              style={{
                marginBottom: 28,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: shareBrand.gold,
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontSize: displayTitle.length > 60 ? 38 : 46,
                lineHeight: 0.96,
                letterSpacing: '-0.045em',
                textTransform: 'uppercase',
                fontWeight: 900,
              }}
            >
              {displayTitle}
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 22,
                lineHeight: 1.16,
                fontWeight: 700,
                color: shareBrand.line,
              }}
            >
              {displayDescription}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              borderTop: '2px solid rgba(248,242,242,0.22)',
              paddingTop: 18,
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              International Mayan League
            </div>
            {photographerName ? (
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: shareBrand.line,
                }}
              >
                Photo: {photographerName}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: shareBrand.cream,
        color: shareBrand.ink,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <ColorBand vertical />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 58px 46px 52px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: shareBrand.earthRed,
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: shareBrand.mist,
            }}
          >
            International Mayan League
          </div>
        </div>

        <div>
          <div
            style={{
              maxWidth: 880,
              fontSize: displayTitle.length > 58 ? 54 : 64,
              lineHeight: 0.92,
              letterSpacing: '-0.055em',
              textTransform: 'uppercase',
              fontWeight: 900,
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              marginTop: 24,
              maxWidth: 820,
              fontSize: 26,
              lineHeight: 1.18,
              fontWeight: 700,
              color: shareBrand.mist,
            }}
          >
            {displayDescription}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `2px solid ${shareBrand.line}`,
            paddingTop: 20,
            gap: 16,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Newsroom dispatch
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {hashtags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  border: `2px solid ${shareBrand.line}`,
                  borderRadius: 999,
                  padding: '7px 12px',
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: shareBrand.mist,
                }}
              >
                #{tag.replace(/^#/, '')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function getShareCardContent(article: NewsArticle) {
  const social = getNewsSocial(article)

  return {
    category: article.category,
    title: social.title,
    description: social.description,
    hashtags: social.hashtags,
    imageUrl: article.mainImage?.url,
    photographerName: article.mainImage?.photographerName,
  }
}
