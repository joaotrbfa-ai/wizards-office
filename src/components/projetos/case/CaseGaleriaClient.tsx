'use client'

import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import { LightboxMount } from '@/components/lightbox/LightboxMount'
import { useLightboxOpen } from '@/components/lightbox/useLightbox'
import type { LightboxItem } from '@/components/lightbox/types'
import type { GaleriaItem } from '@/sanity/types'

/**
 * Galeria do case em faixa horizontal (scroll-driven), 2 imagens por tela no
 * desktop — mesmo padrão da equipe em /sobre. Cada imagem abre no lightbox.
 */
export function CaseGaleriaClient({ galeria }: { galeria: GaleriaItem[] }) {
  const flatItems: LightboxItem[] = galeria.map((g) => ({ image: g.image, caption: g.caption }))
  const open = useLightboxOpen()

  return (
    <Scene tone="ink" minHeight="auto" clip={false}>
      <Container className="py-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-muted">
          Galeria.
        </h2>
      </Container>

      <HorizontalScroll pinHeight="100vh">
        {galeria.map((item, i) => {
          const img = imageProps(item.image, 2000)
          return (
            <div key={i} className="relative h-full w-screen shrink-0 md:w-[50vw]">
              <FullBleedMedia
                src={img.src}
                type="image"
                alt={img.alt || item.caption || 'Imagem do projeto'}
                blurDataURL={img.blurDataURL}
                overlay={item.caption ? 'bottom' : 'none'}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Abrir imagem ${i + 1} em tela cheia`}
                  className="absolute inset-0 h-full w-full cursor-zoom-in"
                />
                {item.caption && (
                  <p className="pointer-events-none absolute inset-x-0 bottom-0 p-8 text-xs uppercase tracking-[0.2em] text-cream/90 md:p-12">
                    {item.caption}
                  </p>
                )}
              </FullBleedMedia>
            </div>
          )
        })}
      </HorizontalScroll>

      <LightboxMount items={flatItems} />
    </Scene>
  )
}
