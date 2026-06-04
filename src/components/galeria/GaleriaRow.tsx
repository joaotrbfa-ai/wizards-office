import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import { imageProps } from '@/sanity/image'
import type { GaleriaItem, GaleriaRow as GaleriaRowType } from '@/sanity/types'

/**
 * Tile de imagem para os grids editoriais (não full-bleed).
 * O aspect-ratio é fixado por slot/layout (não vem do dado) — preserva o
 * comportamento anterior, em que cada posição tinha um aspect default.
 */
function Tile({
  item,
  aspectClassName,
  sizes,
  width,
}: {
  item: GaleriaItem
  aspectClassName: string
  sizes: string
  width: number
}) {
  const img = imageProps(item.image, width)
  return (
    <div className={cn('group relative overflow-hidden bg-ink', aspectClassName)}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        {...(img.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL } : {})}
      />
    </div>
  )
}

export function GaleriaRow({ row }: { row: GaleriaRowType }) {
  // FULL — imagem 100vh com parallax leve.
  if (row.layout === 'full') {
    const [img] = row.images
    if (!img) return null
    const { src, alt, blurDataURL } = imageProps(img.image, 2400)
    return (
      <Scene minHeight="screen">
        <FullBleedMedia src={src} alt={alt} blurDataURL={blurDataURL} overlay="none" parallax />
      </Scene>
    )
  }

  // SPLIT — 50/50.
  if (row.layout === 'split') {
    const [a, b] = row.images
    return (
      <Scene tone="olive" minHeight="auto" className="py-12 md:py-20">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {a && (
              <Reveal>
                <Tile
                  item={a}
                  aspectClassName="aspect-[4/5]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  width={1200}
                />
              </Reveal>
            )}
            {b && (
              <Reveal>
                <Tile
                  item={b}
                  aspectClassName="aspect-[4/5]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  width={1200}
                />
              </Reveal>
            )}
          </RevealGroup>
        </Container>
      </Scene>
    )
  }

  // TRIO — 3 iguais.
  if (row.layout === 'trio') {
    return (
      <Scene tone="olive" minHeight="auto" className="py-12 md:py-20">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {row.images.map((item, i) => (
              <Reveal key={i}>
                <Tile
                  item={item}
                  aspectClassName="aspect-[3/4]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  width={900}
                />
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Scene>
    )
  }

  // ASYMMETRIC — 1 grande + 2 stacked (lado depende do layout).
  const [grande, stack1, stack2] = row.images
  const grandeNaEsquerda = row.layout === 'asymmetric-left'

  const grandeBloco = grande ? (
    <Reveal className="md:col-span-7">
      <Tile
        item={grande}
        aspectClassName="aspect-[4/5]"
        sizes="(min-width: 768px) 58vw, 100vw"
        width={1400}
      />
    </Reveal>
  ) : null

  const stackBloco = (
    <div className="flex flex-col gap-4 md:col-span-5 md:gap-6">
      {stack1 && (
        <Reveal>
          <Tile
            item={stack1}
            aspectClassName="aspect-[4/3]"
            sizes="(min-width: 768px) 42vw, 100vw"
            width={1000}
          />
        </Reveal>
      )}
      {stack2 && (
        <Reveal>
          <Tile
            item={stack2}
            aspectClassName="aspect-[4/3]"
            sizes="(min-width: 768px) 42vw, 100vw"
            width={1000}
          />
        </Reveal>
      )}
    </div>
  )

  return (
    <Scene tone="olive" minHeight="auto" className="py-12 md:py-20">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
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
      </Container>
    </Scene>
  )
}
