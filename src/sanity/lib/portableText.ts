import type { PortableTextBlock } from './sanityNewsTypes'

/** Convert Sanity Portable Text blocks to legacy `string[]` paragraphs. */
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
