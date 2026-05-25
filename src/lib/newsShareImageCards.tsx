import { shareBrand, fitShareText } from '@/lib/shareImageRenderer'

interface StoryCardProps {
  logoSrc: string
  category: string
  title: string
  description: string
}

interface OpenGraphCardProps {
  logoSrc: string
  category: string
  title: string
  description: string
}

export function NewsInstagramStoryCard({ logoSrc, category, title, description }: StoryCardProps) {
  const displayTitle = fitShareText(title, 110)
  const displayDescription = fitShareText(description, 170)
  const titleSize = displayTitle.length > 70 ? 72 : 84

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: shareBrand.cream,
        color: shareBrand.ink,
        padding: '88px 64px 72px',
        fontFamily: 'Inter',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <img
          src={logoSrc}
          alt=""
          width={112}
          height={112}
          style={{ display: 'flex', objectFit: 'contain' }}
        />
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '0.14em',
            lineHeight: 1.2,
            textAlign: 'right',
            textTransform: 'uppercase',
            color: shareBrand.earthRed,
            maxWidth: 420,
          }}
        >
          {category}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Oswald',
            fontSize: titleSize,
            lineHeight: 0.9,
            letterSpacing: '-0.058em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {displayTitle}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontFamily: 'Source Serif 4',
            fontSize: 34,
            lineHeight: 1.16,
            fontWeight: 800,
            letterSpacing: '-0.028em',
            color: shareBrand.mist,
          }}
        >
          {displayDescription}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `3px solid ${shareBrand.line}`,
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            International Mayan League
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: shareBrand.earthRed,
            }}
          >
            Newsroom
          </div>
        </div>
      </div>
    </div>
  )
}

export function NewsOpenGraphCard({ logoSrc, category, title, description }: OpenGraphCardProps) {
  const displayTitle = fitShareText(title, 90)
  const displayDescription = fitShareText(description, 130)
  const titleSize = displayTitle.length > 58 ? 54 : 64

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: shareBrand.cream,
        color: shareBrand.ink,
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          width: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: `3px solid ${shareBrand.line}`,
          padding: '0 36px',
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={128}
          height={128}
          style={{ display: 'flex', objectFit: 'contain' }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 58px 46px 52px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: shareBrand.earthRed,
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: shareBrand.mist,
            }}
          >
            International Mayan League
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Oswald',
              fontSize: titleSize,
              lineHeight: 0.92,
              letterSpacing: '-0.058em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontFamily: 'Source Serif 4',
              fontSize: 26,
              lineHeight: 1.18,
              fontWeight: 800,
              letterSpacing: '-0.028em',
              color: shareBrand.mist,
            }}
          >
            {displayDescription}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            borderTop: `2px solid ${shareBrand.line}`,
            paddingTop: 20,
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Newsroom dispatch
        </div>
      </div>
    </div>
  )
}
