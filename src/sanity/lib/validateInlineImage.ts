/** Shared validation for optional `inlineImage` fields (main image, etc.). */

type InlineImageValue = {
  source?: 'unsplash' | 'upload' | string
  unsplash?: { url?: string; alt?: { en?: string } }
  upload?: { asset?: { _ref?: string }; alt?: { en?: string } }
}

function hasUploadAsset(upload?: InlineImageValue['upload']): boolean {
  const asset = upload?.asset
  if (!asset) return false
  if (typeof asset === 'object' && '_ref' in asset && asset._ref) return true
  return false
}

export function validateInlineImage(value: InlineImageValue | undefined): true | string {
  if (!value?.source) return true

  if (value.source === 'upload') {
    if (!hasUploadAsset(value.upload)) {
      return (
        'Image upload did not finish. Open the Image tab → either wait for the preview to appear, ' +
        're-upload the file, or clear "Image source" (leave no option selected) to publish without an image.'
      )
    }
    const altEn = value.upload?.alt?.en?.trim()
    if (!altEn) {
      return 'Add English alt text for the uploaded image (Image tab), or clear "Image source" to skip the image.'
    }
    return true
  }

  if (value.source === 'unsplash') {
    const url = value.unsplash?.url
    if (!url || typeof url !== 'string') {
      return 'Add an Unsplash image URL (Image tab), or clear "Image source" to skip the image.'
    }
    if (!url.startsWith('https://images.unsplash.com/')) {
      return 'Unsplash URL must start with https://images.unsplash.com/ (use Copy image address on Unsplash).'
    }
    if (!value.unsplash?.alt?.en?.trim()) {
      return 'Add English alt text for the Unsplash image (Image tab), or clear "Image source" to skip the image.'
    }
    return true
  }

  return true
}
