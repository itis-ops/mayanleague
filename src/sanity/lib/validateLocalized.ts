/** Require English text on a localizedString / localizedText object. */

export function requireEnglish(
  value: { en?: string; es?: string } | undefined,
  label: string,
): true | string {
  if (!value?.en?.trim()) {
    return `${label} (English) is required.`
  }
  return true
}
