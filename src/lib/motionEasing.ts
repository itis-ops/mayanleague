export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

export function easeOutQuart(value: number) {
  return 1 - (1 - clamp01(value)) ** 4
}

export function easeOutExpo(value: number) {
  const t = clamp01(value)
  return t === 1 ? 1 : 1 - 2 ** (-10 * t)
}
