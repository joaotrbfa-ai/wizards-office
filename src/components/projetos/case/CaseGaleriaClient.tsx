'use client'

import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { imageProps } from '@/sanity/image'
import { LightboxMount } from '@/components/lightbox/LightboxMount'
import { useLightboxOpen } from '@/components/lightbox/useLightbox'
import type { LightboxItem } from '@/components/lightbox/types'
import type { GaleriaItem } from '@/sanity/types'

/**
 * Galeria do case em faixa horizontal (scroll-driven). Cada imagem preserva o
 * aspect ratio natural (largura proporcional à altura fixa) sobre fundo bege
 * claro, com respiro entre elas e nas bordas — espaço negativo, referência
 * smtn.cc. No mobile vira coluna (fallback do HorizontalScroll). Cada imagem
 * abre no lightbox.
 */
export function CaseGaleriaClient({ galeria }: { galeria: GaleriaItem[] }) {
  const flatItems: LightboxItem[] = galeria.map((g) => ({ image: g.image, caption: g.caption }))
  const open = useLightboxOpen()

  return (
    <Scene tone="cream" minHeight="auto" clip={false}>
      <HorizontalScroll pinHeight="100vh" gap="4vw">
        {/* Respiro inicial (espaço negativo na borda esquerda). */}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[8vw]" />

        {galeria.map((item, i) => {
          const img = imageProps(item.image, 2400)
          const ar = img.aspectRatio ?? 1.5
          return (
            <figure
              key={i}
              className="relative w-full shrink-0 self-center overflow-hidden md:h-[64vh] md:w-auto"
              style={{ aspectRatio: String(ar) }}
            >
              <Image
                src={img.src}
                alt={img.alt || item.caption || 'Imagem do projeto'}
                fill
                sizes="(max-width: 767px) 100vw, 60vw"
                className="object-cover"
                {...(img.blurDataURL
                  ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL }
                  : {})}
              />
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Abrir imagem ${i + 1} em tela cheia`}
                className="absolute inset-0 h-full w-full cursor-zoom-in"
              />
              {item.caption && (
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-xs uppercase tracking-[0.2em] text-cream md:p-8">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          )
        })}

        {/* Respiro final (espaço negativo na borda direita). */}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[8vw]" />
      </HorizontalScroll>

      <LightboxMount items={flatItems} />
    </Scene>
  )
}
