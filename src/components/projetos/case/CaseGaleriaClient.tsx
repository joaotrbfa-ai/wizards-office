'use client'

import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { imageProps } from '@/sanity/image'
import { cn } from '@/lib/utils'
import { LightboxMount } from '@/components/lightbox/LightboxMount'
import { useLightboxOpen } from '@/components/lightbox/useLightbox'
import type { LightboxItem } from '@/components/lightbox/types'
import type { GaleriaItem } from '@/sanity/types'

/**
 * Galeria do case em faixa horizontal. No desktop: scroll-driven com pin
 * (HorizontalScroll), imagens de altura fixa e respiro nas bordas — espaço
 * negativo, referência smtn.cc. No mobile: carrossel com swipe (scroll-snap
 * nativo). Cada imagem preserva o aspect ratio e abre no lightbox.
 */
export function CaseGaleriaClient({ galeria }: { galeria: GaleriaItem[] }) {
  const flatItems: LightboxItem[] = galeria.map((g) => ({ image: g.image, caption: g.caption }))
  const open = useLightboxOpen()

  /** Uma figura da galeria; `sizeClass` define a dimensão (varia desktop/mobile). */
  const figura = (item: GaleriaItem, i: number, sizeClass: string) => {
    const img = imageProps(item.image, 2400)
    const ar = img.aspectRatio ?? 1.5
    return (
      <figure
        key={i}
        className={cn('relative shrink-0 self-center overflow-hidden', sizeClass)}
        style={{ aspectRatio: String(ar) }}
      >
        <Image
          src={img.src}
          alt={img.alt || item.caption || 'Imagem do projeto'}
          fill
          sizes="(max-width: 767px) 82vw, 60vw"
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
  }

  return (
    <Scene tone="olive" minHeight="auto" clip={false}>
      {/* Desktop: faixa horizontal com pin (altura fixa, largura por aspect). */}
      <div className="hidden md:block">
        <HorizontalScroll pinHeight="100vh" gap="2vw">
          <div aria-hidden className="shrink-0 md:w-[8vw]" />
          {galeria.map((item, i) => figura(item, i, 'h-[64vh] w-auto'))}
          <div aria-hidden className="shrink-0 md:w-[8vw]" />
        </HorizontalScroll>
      </div>

      {/* Mobile: carrossel com swipe (largura fixa, altura por aspect). */}
      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {galeria.map((item, i) => figura(item, i, 'w-[82vw] snap-center'))}
        </div>
      </div>

      <LightboxMount items={flatItems} />
    </Scene>
  )
}
