import Link from 'next/link'
import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { imageProps } from '@/sanity/image'
import type { GaleriaHomeProjeto, SanityImage } from '@/sanity/types'

export interface MiniGaleriaProps {
  projetos: GaleriaHomeProjeto[]
  eyebrow?: string
  titulo?: string
  descricao?: string
  /** Quantidade-alvo de imagens no trilho. */
  max?: number
}

type GaleriaImagem = { image: SanityImage; slug: string; nome: string }

/**
 * Monta a lista de imagens da galeria: primeiro a capa de cada projeto (na ordem
 * de exibição), depois completa com as fotos internas em round-robin até atingir
 * `max`. Assim a galeria começa variada (um projeto diferente por vez) e só
 * repete projeto quando precisa de mais imagens.
 */
function montarImagens(projetos: GaleriaHomeProjeto[], max: number): GaleriaImagem[] {
  const itens: GaleriaImagem[] = []

  for (const p of projetos) {
    if (itens.length >= max) break
    itens.push({ image: p.coverImage, slug: p.slug, nome: p.nome })
  }

  let g = 0
  let progrediu = true
  while (itens.length < max && progrediu) {
    progrediu = false
    for (const p of projetos) {
      if (itens.length >= max) break
      const foto = p.galeria?.[g]?.image
      if (foto) {
        itens.push({ image: foto, slug: p.slug, nome: p.nome })
        progrediu = true
      }
    }
    g++
  }

  return itens
}

/**
 * Galeria da landing em scroll horizontal: o scroll vertical "trava" a seção e
 * empurra as imagens para o lado (via `HorizontalScroll`). Cada imagem abre o
 * projeto vinculado; o título "Galeria" leva à página completa.
 */
export function MiniGaleria({ projetos, eyebrow, titulo, descricao, max = 7 }: MiniGaleriaProps) {
  const itens = montarImagens(projetos ?? [], max)
  if (!itens.length) return null

  const eyebrowText = eyebrow ?? 'Portfólio'
  const tituloText = titulo ?? 'Galeria'

  return (
    // clip={false}: o `sticky` interno do HorizontalScroll quebra se um ancestral
    // tiver overflow-hidden.
    <Scene tone="olive" minHeight="auto" clip={false}>
      <Container width="wide" className="py-16 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-label">{eyebrowText}</p>
            <h2 className="mt-4 font-sans text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
              <Link
                href="/galeria"
                className="underline-offset-8 transition-colors hover:text-accent hover:underline"
              >
                {tituloText}
              </Link>
            </h2>
          </Reveal>
          <Reveal>
            {descricao ? (
              <p className="max-w-sm text-sm leading-relaxed text-body md:text-base">{descricao}</p>
            ) : (
              <p className="hidden text-xs uppercase tracking-[0.25em] text-label/50 md:block">
                Role para o lado →
              </p>
            )}
          </Reveal>
        </div>
      </Container>

      {/* Trilho horizontal — imagens de altura fixa (62vh) passam para o lado. */}
      <HorizontalScroll pinHeight="100vh" gap="clamp(1rem,2.5vw,3rem)" className="pb-8">
        {itens.map((item, i) => {
          const img = imageProps(item.image, 1400)
          const card = (
            <div className="relative aspect-[3/4] h-[62vh] overflow-hidden bg-ink">
              {img.src && (
                <Image
                  src={img.src}
                  alt={img.alt || item.nome || 'Imagem da galeria'}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  {...(img.blurDataURL
                    ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL }
                    : {})}
                />
              )}
              {/* Afordância de clique. */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-[0.7rem] uppercase tracking-[0.15em] text-olive opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                Ver
              </span>
            </div>
          )

          return (
            <div key={`${item.slug}-${i}`} className="flex h-full shrink-0 items-center">
              <Link
                href={`/projetos/${item.slug}`}
                aria-label={`Ver projeto: ${item.nome}`}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cream"
              >
                {card}
              </Link>
            </div>
          )
        })}
      </HorizontalScroll>
    </Scene>
  )
}
