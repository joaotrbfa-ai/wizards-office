'use client'

import Image from 'next/image'
import { imageProps } from '@/sanity/image'
import type { LightboxItem } from './types'

export function LightboxImage({ item }: { item: LightboxItem }) {
  const { src, blurDataURL } = imageProps(item.image, 2400)
  const dims = item.image.asset?.metadata?.dimensions

  return (
    <Image
      src={src}
      alt={item.image.alt ?? ''}
      width={dims?.width ?? 2400}
      height={dims?.height ?? 1600}
      sizes="100vw"
      priority
      className="max-h-[88vh] max-w-[92vw] object-contain"
      {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
    />
  )
}
