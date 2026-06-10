'use client'

import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { LightboxMount } from '@/components/lightbox/LightboxMount'
import { useLightboxOpen } from '@/components/lightbox/useLightbox'
import { imageProps } from '@/sanity/image'
import type { LightboxItem } from '@/components/lightbox/types'
import type { GaleriaRow as GaleriaRowType } from '@/sanity/types'

/**
 * Masonry editorial da galeria: cada imagem mantém a proporção natural
 * (umas mais altas, outras mais baixas) distribuída em colunas — variação
 * de tamanhos fluida, sem corte. Denso o bastante para ~4-5 imagens por
 * tela na rolagem. O índice global é preservado para o lightbox.
 */
export function GaleriaGridClient({ rows }: { rows: GaleriaRowType[] }) {
  const items = rows.flatMap((row) => row.images)
  const flatItems: LightboxItem[] = items.map((img) => ({ image: img.image, caption: img.caption }))

  const open = useLightboxOpen()

  return (
    <Scene tone="olive" minHeight="auto" className="py-6 md:py-10">
      <div className="px-2 md:px-3">
        <RevealGroup className="columns-2 [column-gap:0.5rem] md:columns-3 2xl:columns-4">
          {items.map((item, index) => {
            const img = imageProps(item.image, 1200)
            const aspectRatio = img.aspectRatio ?? 0.8
            return (
              <Reveal key={index} className="mb-2 block break-inside-avoid">
                <button
                  type="button"
                  onClick={() => open(index)}
                  aria-label={`Abrir imagem ${index + 1} em tela cheia`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-ink p-0"
                  style={{ aspectRatio }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || 'Imagem da galeria'}
                    fill
                    sizes="(min-width: 1536px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    {...(img.blurDataURL
                      ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL }
                      : {})}
                  />
                </button>
              </Reveal>
            )
          })}
        </RevealGroup>
      </div>

      <LightboxMount items={flatItems} />
    </Scene>
  )
}
