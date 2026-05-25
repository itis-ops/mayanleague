import type { PortableTextBlock } from './sanityNewsTypes'

/**
 * Convert Sanity Portable Text blocks to plain `string[]` paragraphs.
 *
 * The article body component renders these as <p>…</p>. Block styles like
 * h2, h3, and blockquote are flattened to their plain text content (we
 * don't expose rich block styling in the legacy paragraph renderer yet).
 */
export function portableTextToParagraphs(
  blocks?: PortableTextBlock[],
): string[] | undefined {
  if (!blocks?.length) return undefined

  const paragraphs = blocks
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? '')
        .join('')
        .trim(),
    )
    .filter(Boolean)

  return paragraphs.length ? paragraphs : undefined
}
