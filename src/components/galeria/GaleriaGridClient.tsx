'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Scene } from '@/components/scroll/Scene'
import { LightboxMount } from '@/components/lightbox/LightboxMount'
import { useLightboxOpen } from '@/components/lightbox/useLightbox'
import { imageProps } from '@/sanity/image'
import { WHATSAPP_LABEL, WHATSAPP_URL } from '@/lib/contato'
import { cn } from '@/lib/utils'
import type { LightboxItem } from '@/components/lightbox/types'
import type { GaleriaFeedItem } from '@/sanity/types'

type Forma = 'l' | 'p' | 'f'
type Tile = { key: number; index: number; forma: Forma }

const LOTE = 16
/** A cada N paisagens, uma vira destaque 2×2 — cadência fixa, não sorte. */
const CADENCIA_DESTAQUE = 7

const FORMA_CLASS: Record<Forma, string> = {
  l: '',
  p: 'row-span-2',
  f: 'col-span-2 row-span-2',
}

function embaralha(ids: number[], projetos: (string | undefined)[]) {
  const a = ids.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  // Dois tiles seguidos do mesmo projeto parecem erro, não sorteio.
  for (let i = 1; i < a.length; i++) {
    const anterior = projetos[a[i - 1]]
    if (!anterior || projetos[a[i]] !== anterior) continue
    const j = a.findIndex((x, k) => k > i && projetos[x] !== anterior)
    if (j > 0) [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type EstadoFeed = { fila: number[]; key: number; paisagens: number }
const ESTADO_INICIAL: EstadoFeed = { fila: [], key: 0, paisagens: 0 }

/** Próximo lote de tiles, sem mutar o estado recebido (seguro em StrictMode/SSR). */
function gerarLote(imagens: GaleriaFeedItem[], atual: EstadoFeed, primeiraVolta: boolean) {
  if (!imagens.length) return { lote: [], estado: atual }
  let { fila, key, paisagens } = atual
  fila = fila.slice()
  const lote: Tile[] = []
  for (let n = 0; n < LOTE; n++) {
    if (!fila.length) {
      const ids = imagens.map((_, i) => i)
      fila = primeiraVolta
        ? ids
        : embaralha(
            ids,
            imagens.map((img) => img.projeto),
          )
    }
    const index = fila.shift()!
    const dims = imagens[index].image.asset?.metadata?.dimensions
    const retrato = dims ? dims.height > dims.width * 1.05 : false
    const forma: Forma = retrato ? 'p' : paisagens++ % CADENCIA_DESTAQUE === 3 ? 'f' : 'l'
    lote.push({ key: key++, index, forma })
  }
  return { lote, estado: { fila, key, paisagens } }
}

/**
 * Feed infinito da galeria: mosaico denso (retratos ocupam 2 linhas, um destaque
 * 2×2 a cada 7 paisagens). A primeira volta segue a ordem curada; depois o acervo
 * recomeça embaralhado, então o feed nunca acaba. Os lotes entram quando o fim do
 * mosaico se aproxima. O índice de cada tile é o do acervo — o lightbox navega
 * pela ordem curada, independente de onde o tile apareceu no feed.
 */
export function GaleriaGridClient({ imagens }: { imagens: GaleriaFeedItem[] }) {
  const flatItems: LightboxItem[] = imagens.map((img) => ({
    image: img.image,
    caption: img.caption ?? img.projeto,
  }))

  const open = useLightboxOpen()

  const feedRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Os dois primeiros lotes entram já, na ordem curada e calculados sem efeito:
  // o servidor renderiza as imagens e quem chega pela rota cai direto nelas.
  const [inicial] = useState(() => {
    const um = gerarLote(imagens, ESTADO_INICIAL, true)
    const dois = gerarLote(imagens, um.estado, true)
    return { tiles: [...um.lote, ...dois.lote], estado: dois.estado }
  })
  const estado = useRef(inicial.estado)
  const [tiles, setTiles] = useState<Tile[]>(inicial.tiles)
  const [barraVisivel, setBarraVisivel] = useState(false)

  // Lote seguinte quando o sentinela se aproxima da tela.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !tiles.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((en) => en.isIntersecting)) return
        const proximo = gerarLote(imagens, estado.current, false)
        estado.current = proximo.estado
        setTiles((prev) => [...prev, ...proximo.lote])
      },
      { rootMargin: '0px 0px 1600px 0px' },
    )
    io.observe(sentinel)
    return () => io.disconnect()
    // Reobserva a cada lote: o observer só avisa mudança de estado, então se o lote
    // não tirar o sentinela da margem o feed travaria.
  }, [tiles.length, imagens])

  // A barra de contato faz o papel do rodapé, que um feed sem fim nunca alcança.
  useEffect(() => {
    const feed = feedRef.current
    if (!feed || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([en]) => setBarraVisivel(en.isIntersecting))
    io.observe(feed)
    return () => io.disconnect()
  }, [])

  return (
    <Scene tone="olive" minHeight="auto" className="pt-6 pb-24 md:pt-10">
      <div className="mx-auto w-full max-w-[1600px] px-2 [container-type:inline-size] md:px-3">
        <div
          ref={feedRef}
          className="grid grid-cols-2 gap-2 [--cols:2] [--gap:0.5rem] [grid-auto-flow:row_dense] md:grid-cols-4 md:[--cols:4]"
          // Linha = largura de 1 coluna × 0.62 (~16:10, formato dos renders), em qualquer tela.
          style={{ gridAutoRows: 'calc((100cqi - (var(--cols) - 1) * var(--gap)) / var(--cols) * 0.62)' }}
        >
          {tiles.map((tile) => {
            const item = imagens[tile.index]
            const img = imageProps(item.image, 960)
            return (
              <button
                key={tile.key}
                type="button"
                onClick={() => open(tile.index)}
                aria-label={`Abrir imagem${item.projeto ? ` — ${item.projeto}` : ''} em tela cheia`}
                className={cn(
                  'group relative block cursor-zoom-in overflow-hidden bg-ink p-0',
                  FORMA_CLASS[tile.forma],
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt || item.projeto || 'Imagem da galeria'}
                  fill
                  sizes={
                    tile.forma === 'f'
                      ? '(min-width: 768px) 50vw, 100vw'
                      : '(min-width: 768px) 25vw, 50vw'
                  }
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  {...(img.blurDataURL
                    ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL }
                    : {})}
                />
                {item.projeto && (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-3 pt-10 text-left text-[0.7rem] uppercase tracking-widest text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {item.projeto}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      </div>

      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-olive/95 backdrop-blur transition-transform duration-500',
          barraVisivel ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!barraVisivel}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 text-[0.72rem] uppercase tracking-widest text-muted md:px-6">
          <span className="hidden sm:inline">Wizards Office</span>
          <div className="flex w-full justify-between gap-6 sm:w-auto sm:justify-end sm:gap-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={barraVisivel ? 0 : -1}
              className="transition-colors hover:text-cream"
            >
              {WHATSAPP_LABEL}
            </a>
            <a
              href="/contato"
              tabIndex={barraVisivel ? 0 : -1}
              className="text-cream transition-colors hover:text-terracotta"
            >
              Fale com o estúdio
            </a>
          </div>
        </div>
      </div>

      <LightboxMount items={flatItems} />
    </Scene>
  )
}
