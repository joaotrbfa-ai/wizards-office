import type { SanityImage } from '@/sanity/types'

export interface LightboxItem {
  /** Imagem do Sanity (contém asset.url, asset.metadata.lqip, alt). */
  image: SanityImage
  caption?: string
}
