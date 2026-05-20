interface Props {
  color?: string
  size?: number
  className?: string
}

export default function KinSeparator({ color = '#c9a84c', size = 32, className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 max-w-16" style={{ backgroundColor: color, opacity: 0.4 }} />
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 4-petal Kin / solar cross glyph */}
        <circle cx="16" cy="16" r="3" fill={color} />
        {/* Top petal */}
        <ellipse cx="16" cy="8" rx="3" ry="5" fill={color} opacity="0.8" />
        {/* Bottom petal */}
        <ellipse cx="16" cy="24" rx="3" ry="5" fill={color} opacity="0.8" />
        {/* Left petal */}
        <ellipse cx="8" cy="16" rx="5" ry="3" fill={color} opacity="0.8" />
        {/* Right petal */}
        <ellipse cx="24" cy="16" rx="5" ry="3" fill={color} opacity="0.8" />
        {/* Corner dots */}
        <circle cx="9" cy="9" r="1.5" fill={color} opacity="0.4" />
        <circle cx="23" cy="9" r="1.5" fill={color} opacity="0.4" />
        <circle cx="9" cy="23" r="1.5" fill={color} opacity="0.4" />
        <circle cx="23" cy="23" r="1.5" fill={color} opacity="0.4" />
      </svg>
      <div className="h-px flex-1 max-w-16" style={{ backgroundColor: color, opacity: 0.4 }} />
    </div>
  )
}
