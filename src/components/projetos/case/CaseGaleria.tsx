import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import { imageProps } from '@/sanity/image'
import type { GaleriaItem, Projeto } from '@/sanity/types'

type RowLayout = 'full' | 'split' | 'asymmetric-left'
type Row = { layout: RowLayout; images: GaleriaItem[] }

/** Distribui as imagens do case numa cadência editorial. */
function buildRows(items: GaleriaItem[]): Row[] {
  const n = items.length
  if (n <= 2) return items.map((it) => ({ layout: 'full', images: [it] }))
  if (n === 3) return [{ layout: 'full', images: [items[0]] }, { layout: 'split', images: items.slice(1, 3) }]

  const cycle = ['full', 'split', 'full', 'asymmetric-left'] as const
  const need = { full: 1, split: 2, 'asymmetric-left': 3 } as const
  const rows: Row[] = []
  let i = 0
  let c = 0
  while (i < n) {
    const layout = cycle[c % cycle.length]
    const slice = items.slice(i, i + need[layout])
    if (slice.length < need[layout]) {
      slice.forEach((it) => rows.push({ layout: 'full', images: [it] }))
      break
    }
    rows.push({ layout, images: slice })
    i += need[layout]
    c++
  }
  return rows
}

function Tile({
  item,
  aspect,
  sizes,
}: {
  item: GaleriaItem
  aspect: string
  sizes: string
}) {
  const img = imageProps(item.image, 2000)
  return (
    <div>
      <div className={cn('group relative overflow-hidden bg-ink', aspect)}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        />
      </div>
      {item.caption && (
        <p className="mt-4 max-w-md text-xs uppercase tracking-[0.2em] text-sand">
          {item.caption}
        </p>
      )}
    </div>
  )
}

export function CaseGaleria({ projeto }: { projeto: Projeto }) {
  const rows = buildRows(projeto.galeria ?? [])

  if (rows.length === 0) return null

  return (
    <>
      {rows.map((row, i) => {
        if (row.layout === 'full') {
          const [item] = row.images
          const img = imageProps(item.image, 2400)
          return (
            <Scene key={`full-${i}`} minHeight="screen">
              <FullBleedMedia
                src={img.src}
                alt={img.alt}
                blurDataURL={img.blurDataURL}
                overlay="bottom"
                parallax
              />
            </Scene>
          )
        }

        if (row.layout === 'split') {
          return (
            <Scene key={`split-${i}`} tone="olive" minHeight="auto" className="py-12 md:py-20">
              <Container>
                <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  {row.images.map((item, j) => (
                    <Reveal key={`split-${i}-${j}`}>
                      <Tile item={item} aspect="aspect-[4/5]" sizes="(min-width: 768px) 50vw, 100vw" />
                    </Reveal>
                  ))}
                </RevealGroup>
              </Container>
            </Scene>
          )
        }

        // asymmetric-left
        const [grande, s1, s2] = row.images
        return (
          <Scene key={`asym-${i}`} tone="olive" minHeight="auto" className="py-12 md:py-20">
            <Container>
              <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
                <Reveal className="md:col-span-7">
                  <Tile item={grande} aspect="aspect-[4/5]" sizes="(min-width: 768px) 58vw, 100vw" />
                </Reveal>
                <div className="flex flex-col gap-4 md:col-span-5 md:gap-6">
                  <Reveal>
                    <Tile item={s1} aspect="aspect-[4/3]" sizes="(min-width: 768px) 42vw, 100vw" />
                  </Reveal>
                  <Reveal>
                    <Tile item={s2} aspect="aspect-[4/3]" sizes="(min-width: 768px) 42vw, 100vw" />
                  </Reveal>
                </div>
              </RevealGroup>
            </Container>
          </Scene>
        )
      })}
    </>
  )
}
