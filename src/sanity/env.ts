/**
 * Sanity environment configuration.
 *
 * Values are read from `process.env` on access (not at module load time) so that
 * `next build` succeeds even when the variables are still placeholders, and so
 * that the embedded Studio fails with a clear error message at runtime instead
 * of a cryptic build-time crash.
 *
 * See {@link file://./../../SANITY_SETUP.md} for the values to populate.
 */

export const apiVersion =
  process.env.SANITY_API_VERSION || '2026-05-21'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'placeholder-project-id',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const readToken = process.env.SANITY_API_READ_TOKEN

export const useCdn = process.env.NODE_ENV === 'production'

/**
 * Returns `value` when present, otherwise falls back to `fallback` so the
 * Next.js build can succeed even with placeholder env vars. Logs a warning
 * when the placeholder is in use, so a missed `.env.local` update is visible
 * in dev logs without crashing the build.
 */
function assertValue<T extends string>(
  value: T | undefined,
  fallback: T,
  errorMessage: string,
): T {
  if (value && value.length > 0) {
    return value
  }
  if (typeof window === 'undefined') {
    console.warn(
      `[sanity/env] ${errorMessage} — falling back to "${fallback}". ` +
        `Update mayanleague/.env.local before going to production.`,
    )
  }
  return fallback
}
