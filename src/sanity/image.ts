import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId } from './env'
import type { SanityImage } from './types'

const builder = createImageUrlBuilder({ projectId, dataset })

/** Construtor de URL de imagem do Sanity (auto-format + fit max por padrão). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}

/** Props prontas para `next/image`/FullBleedMedia a partir de uma SanityImage. */
export function imageProps(
  image: SanityImage | undefined,
  width = 2000,
): { src: string; alt: string; blurDataURL?: string; aspectRatio?: number } {
  if (!image?.asset) return { src: '', alt: '' }
  const dims = image.asset.metadata?.dimensions
  return {
    src: urlFor(image).width(width).url(),
    alt: image.alt ?? '',
    blurDataURL: image.asset.metadata?.lqip,
    aspectRatio: dims ? dims.width / dims.height : undefined,
  }
}
