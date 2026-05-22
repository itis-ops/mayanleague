interface MayaNumberProps {
  value: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: {
    digitGap: 'gap-1',
    glyphGap: 'gap-0.5',
    dot: 'h-1.5 w-1.5',
    bar: 'h-1 w-7',
    shell: 'h-2.5 w-4',
  },
  md: {
    digitGap: 'gap-1.5',
    glyphGap: 'gap-1',
    dot: 'h-2 w-2',
    bar: 'h-1.5 w-9',
    shell: 'h-3 w-5',
  },
  lg: {
    digitGap: 'gap-2',
    glyphGap: 'gap-1.5',
    dot: 'h-2.5 w-2.5',
    bar: 'h-2 w-11',
    shell: 'h-3.5 w-6',
  },
} as const

function toMayaDigits(value: number) {
  if (value <= 0) return [0]

  const digits: number[] = []
  let current = value

  while (current > 0) {
    digits.unshift(current % 20)
    current = Math.floor(current / 20)
  }

  return digits
}

function MayaDigit({ value, size }: { value: number; size: keyof typeof sizeStyles }) {
  const styles = sizeStyles[size]
  const bars = Math.floor(value / 5)
  const dots = value % 5

  if (value === 0) {
    return <span className={`block rounded-full border border-current opacity-80 ${styles.shell} mx-auto`} />
  }

  return (
    <span className={`inline-flex min-w-[2.25rem] flex-col-reverse items-center ${styles.glyphGap}`}>
      {Array.from({ length: bars }).map((_, index) => (
        <span key={`bar-${index}`} className={`block rounded-full bg-current ${styles.bar}`} />
      ))}
      {dots > 0 ? (
        <span className="flex items-center justify-center gap-1">
          {Array.from({ length: dots }).map((_, index) => (
            <span key={`dot-${index}`} className={`block rounded-full bg-current ${styles.dot}`} />
          ))}
        </span>
      ) : null}
    </span>
  )
}

export default function MayaNumber({ value, className = '', size = 'md' }: MayaNumberProps) {
  const styles = sizeStyles[size]

  return (
    <span
      className={`inline-flex flex-col items-center justify-end ${styles.digitGap} text-current ${className}`}
      aria-hidden="true"
    >
      {toMayaDigits(value).map((digit, index) => (
        <MayaDigit key={`${digit}-${index}`} value={digit} size={size} />
      ))}
    </span>
  )
}
