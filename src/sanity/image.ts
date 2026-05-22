import createImageUrlBuilder, {
  type SanityImageSource,
} from '@sanity/image-url'

import { dataset, projectId } from './env'

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

/**
 * Build a Sanity-hosted image URL for direct uploads. Unsplash hotlinks
 * coming from `unsplashImage` schema entries should be rendered using the
 * raw `url` property and never re-uploaded — see `.cursor/rules/unsplash-compliance.mdc`.
 */
export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source).auto('format').fit('max')
}
