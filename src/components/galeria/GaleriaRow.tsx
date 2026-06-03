import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import type { GaleriaAspect, GaleriaImage, GaleriaRow as GaleriaRowType } from '@/data/galeria'

const aspectClass: Record<GaleriaAspect, string> = {
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
}

/** Tile de imagem para os grids editoriais (não full-bleed). */
function Tile({
  image,
  aspect,
  sizes,
}: {
  image: GaleriaImage
  aspect: GaleriaAspect
  sizes: string
}) {
  return (
    <div className={cn('group relative overflow-hidden bg-ink', aspectClass[aspect])}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
      />
    </div>
  )
}

export function GaleriaRow({ row }: { row: GaleriaRowType }) {
  // FULL — imagem 100vh com parallax leve.
  if (row.layout === 'full') {
    const [img] = row.images
    return (
      <Scene minHeight="screen">
        <FullBleedMedia src={img.src} alt={img.alt} overlay="none" parallax />
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
            <Reveal>
              <Tile image={a} aspect={a.aspect ?? '4/5'} sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
            <Reveal>
              <Tile image={b} aspect={b.aspect ?? '4/5'} sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
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
            {row.images.map((img) => (
              <Reveal key={img.src}>
                <Tile image={img} aspect="3/4" sizes="(min-width: 768px) 33vw, 100vw" />
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

  const grandeBloco = (
    <Reveal className="md:col-span-7">
      <Tile image={grande} aspect="4/5" sizes="(min-width: 768px) 58vw, 100vw" />
    </Reveal>
  )

  const stackBloco = (
    <div className="flex flex-col gap-4 md:col-span-5 md:gap-6">
      <Reveal>
        <Tile image={stack1} aspect="4/3" sizes="(min-width: 768px) 42vw, 100vw" />
      </Reveal>
      <Reveal>
        <Tile image={stack2} aspect="4/3" sizes="(min-width: 768px) 42vw, 100vw" />
      </Reveal>
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
