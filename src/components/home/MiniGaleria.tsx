import Link from 'next/link'
import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { imageProps } from '@/sanity/image'
import { cn } from '@/lib/utils'
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

/** Uma imagem clicável da galeria. `dimClass` controla a dimensão do container
 *  (varia entre o trilho do desktop e o carrossel do mobile). */
function Slide({ item, dimClass }: { item: GaleriaImagem; dimClass: string }) {
  const img = imageProps(item.image, 1400)
  return (
    <Link
      href={`/projetos/${item.slug}`}
      aria-label={`Ver projeto: ${item.nome}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cream"
    >
      <div className={cn('relative overflow-hidden bg-ink', dimClass)}>
        {img.src && (
          <Image
            src={img.src}
            alt={img.alt || item.nome || 'Imagem da galeria'}
            fill
            sizes="(min-width: 768px) 50vw, 80vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
            {...(img.blurDataURL
              ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL }
              : {})}
          />
        )}
        {/* Nome do projeto sobre degradê preto — só no hover (padrão da equipe). */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="block font-sans text-sm uppercase tracking-wide text-cream">
            {item.nome}
          </span>
        </div>
      </div>
    </Link>
  )
}

/**
 * Galeria da landing. No desktop: scroll horizontal com pin — o scroll vertical
 * "trava" a seção e empurra as imagens para o lado (via `HorizontalScroll`). No
 * mobile: um carrossel com swipe (scroll-snap nativo), imagens menores. Cada
 * imagem abre o projeto vinculado; o título "Galeria" leva à página completa.
 */
export function MiniGaleria({ projetos, titulo, descricao, max = 7 }: MiniGaleriaProps) {
  const itens = montarImagens(projetos ?? [], max)
  if (!itens.length) return null

  const tituloText = titulo ?? 'Galeria'

  return (
    // clip={false}: o `sticky` interno do HorizontalScroll quebra se um ancestral
    // tiver overflow-hidden.
    <Scene tone="olive" minHeight="auto" clip={false}>
      <Container width="wide" className="pt-16 pb-1 md:pt-20 md:pb-2">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-sans text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
            <MaskReveal>
              <Link href="/galeria" className="transition-colors hover:text-accent">
                {tituloText}
              </Link>
            </MaskReveal>
          </h2>
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

      {/* Desktop: trilho horizontal com pin — imagens de altura fixa (62vh). */}
      <div className="hidden md:block">
        <HorizontalScroll pinHeight="72vh" gap="0.5rem" center className="pb-1">
          {itens.map((item, i) => (
            <div key={`d-${item.slug}-${i}`} className="flex h-full shrink-0 items-center">
              <Slide item={item} dimClass="aspect-[3/4] h-[62vh]" />
            </div>
          ))}
        </HorizontalScroll>
      </div>

      {/* Mobile: carrossel com swipe (scroll-snap), uma imagem por vez com prévia. */}
      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {itens.map((item, i) => (
            <div key={`m-${item.slug}-${i}`} className="w-[78%] shrink-0 snap-center">
              <Slide item={item} dimClass="aspect-[3/4] w-full" />
            </div>
          ))}
        </div>
      </div>

      <Container width="wide" className="flex justify-end pt-1">
        <Reveal>
          <Button variant="outline" href="/galeria" size="md">
            Ver galeria completa
          </Button>
        </Reveal>
      </Container>
    </Scene>
  )
}
