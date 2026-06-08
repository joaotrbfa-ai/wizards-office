'use client'

import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import { imageProps } from '@/sanity/image'
import type { GaleriaItem, GaleriaRow as GaleriaRowType } from '@/sanity/types'

/**
 * Tile clicável para os grids edge-to-edge (não full-bleed).
 * O aspect-ratio é fixado por slot/layout (não vem do dado).
 */
function Tile({
  item,
  index,
  onOpen,
  aspectClassName,
  sizes,
  width,
}: {
  item: GaleriaItem
  index: number
  onOpen: (index: number) => void
  aspectClassName: string
  sizes: string
  width: number
}) {
  const img = imageProps(item.image, width)
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Abrir imagem ${index + 1} em tela cheia`}
      className={cn(
        'group relative block w-full cursor-zoom-in overflow-hidden bg-ink p-0',
        aspectClassName,
      )}
    >
      <Image
        src={img.src}
        alt={img.alt || 'Imagem da galeria'}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        {...(img.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL } : {})}
      />
    </button>
  )
}

// Grid edge-to-edge: sem Container, sem padding lateral, gaps curtos.
const GRID_GAP = 'gap-3 md:gap-4'

export function GaleriaRow({
  row,
  startIndex,
  onOpen,
}: {
  row: GaleriaRowType
  startIndex: number
  onOpen: (index: number) => void
}) {
  // FULL — imagem 100vh com parallax leve; clique abre o lightbox.
  if (row.layout === 'full') {
    const [img] = row.images
    if (!img) return null
    const { src, alt, blurDataURL } = imageProps(img.image, 2400)
    return (
      <Scene minHeight="screen">
        <FullBleedMedia src={src} alt={alt || 'Imagem da galeria'} blurDataURL={blurDataURL} overlay="none" parallax>
          <button
            type="button"
            onClick={() => onOpen(startIndex)}
            aria-label={`Abrir imagem ${startIndex + 1} em tela cheia`}
            className="absolute inset-0 h-full w-full cursor-zoom-in"
          />
        </FullBleedMedia>
      </Scene>
    )
  }

  // SPLIT — 50/50, edge-to-edge.
  if (row.layout === 'split') {
    const [a, b] = row.images
    return (
      <Scene tone="olive" minHeight="auto" className="py-3 md:py-4">
        <RevealGroup className={cn('grid grid-cols-1 md:grid-cols-2', GRID_GAP)}>
          {a && (
            <Reveal>
              <Tile
                item={a}
                index={startIndex}
                onOpen={onOpen}
                aspectClassName="aspect-[4/5]"
                sizes="(min-width: 768px) 50vw, 100vw"
                width={1400}
              />
            </Reveal>
          )}
          {b && (
            <Reveal>
              <Tile
                item={b}
                index={startIndex + 1}
                onOpen={onOpen}
                aspectClassName="aspect-[4/5]"
                sizes="(min-width: 768px) 50vw, 100vw"
                width={1400}
              />
            </Reveal>
          )}
        </RevealGroup>
      </Scene>
    )
  }

  // QUARTET — 4 imagens numa linha (2 col no mobile, 4 no desktop), edge-to-edge.
  if (row.layout === 'quartet') {
    return (
      <Scene tone="olive" minHeight="auto" className="py-3 md:py-4">
        <RevealGroup className={cn('grid grid-cols-2 md:grid-cols-4', GRID_GAP)}>
          {row.images.map((item, i) => (
            <Reveal key={i}>
              <Tile
                item={item}
                index={startIndex + i}
                onOpen={onOpen}
                aspectClassName="aspect-[4/5]"
                sizes="(min-width: 768px) 25vw, 50vw"
                width={800}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Scene>
    )
  }

  // TRIO — 3 iguais, edge-to-edge.
  if (row.layout === 'trio') {
    return (
      <Scene tone="olive" minHeight="auto" className="py-3 md:py-4">
        <RevealGroup className={cn('grid grid-cols-1 md:grid-cols-3', GRID_GAP)}>
          {row.images.map((item, i) => (
            <Reveal key={i}>
              <Tile
                item={item}
                index={startIndex + i}
                onOpen={onOpen}
                aspectClassName="aspect-[3/4]"
                sizes="(min-width: 768px) 33vw, 100vw"
                width={1000}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Scene>
    )
  }

  // ASYMMETRIC — 1 grande + 2 stacked (lado depende do layout), edge-to-edge.
  const [grande, stack1, stack2] = row.images
  const grandeNaEsquerda = row.layout === 'asymmetric-left'

  const grandeBloco = grande ? (
    <Reveal className="md:col-span-7">
      <Tile
        item={grande}
        index={startIndex}
        onOpen={onOpen}
        aspectClassName="aspect-[4/5]"
        sizes="(min-width: 768px) 58vw, 100vw"
        width={1600}
      />
    </Reveal>
  ) : null

  const stackBloco = (
    <div className={cn('flex flex-col md:col-span-5', GRID_GAP)}>
      {stack1 && (
        <Reveal>
          <Tile
            item={stack1}
            index={startIndex + 1}
            onOpen={onOpen}
            aspectClassName="aspect-[4/3]"
            sizes="(min-width: 768px) 42vw, 100vw"
            width={1100}
          />
        </Reveal>
      )}
      {stack2 && (
        <Reveal>
          <Tile
            item={stack2}
            index={startIndex + 2}
            onOpen={onOpen}
            aspectClassName="aspect-[4/3]"
            sizes="(min-width: 768px) 42vw, 100vw"
            width={1100}
          />
        </Reveal>
      )}
    </div>
  )

  return (
    <Scene tone="olive" minHeight="auto" className="py-3 md:py-4">
      <RevealGroup className={cn('grid grid-cols-1 md:grid-cols-12', GRID_GAP)}>
        {grandeNaEsquerda ? (
          <>
            {grandeBloco}
            {stackBloco}
          </>
        ) : (
          <>
            {stackBloco}
            {grandeBloco}
          </>
        )}
      </RevealGroup>
    </Scene>
  )
}
