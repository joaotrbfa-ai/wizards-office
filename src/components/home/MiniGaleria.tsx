import Link from 'next/link'
import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { imageProps } from '@/sanity/image'
import type { MiniGaleria as MiniGaleriaData } from '@/sanity/types'

/**
 * Mini-galeria da landing: grade de até 3 imagens sobre fundo claro. Cada imagem
 * abre o projeto vinculado (`/projetos/[slug]`); o título "Galeria" leva para a
 * página completa da galeria.
 */
export function MiniGaleria({ data }: { data?: MiniGaleriaData }) {
  const itens = (data?.itens ?? []).slice(0, 3)
  if (!itens.length) return null

  const eyebrow = data?.eyebrow ?? 'Portfólio'
  const titulo = data?.titulo ?? 'Galeria'
  const count = String(itens.length).padStart(2, '0')

  return (
    <Scene tone="olive" minHeight="auto" className="py-24 md:py-32">
      <Container>
        {/* Cabeçalho: título (link → /galeria) + contador à esquerda, texto à direita. */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-label">{eyebrow}</p>
            <h2 className="mt-4 flex items-start gap-3 font-sans text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
              <Link
                href="/galeria"
                className="underline-offset-8 transition-colors hover:text-accent hover:underline"
              >
                {titulo}
              </Link>
              <span className="mt-1 font-sans text-base font-normal tracking-normal text-label md:text-lg">
                ({count})
              </span>
            </h2>
          </Reveal>
          {data?.descricao && (
            <Reveal>
              <p className="max-w-sm text-sm leading-relaxed text-body md:text-base">
                {data.descricao}
              </p>
            </Reveal>
          )}
        </div>

        {/* Grade de 3 imagens — cada uma abre o projeto vinculado. */}
        <RevealGroup className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {itens.map((item, i) => {
            const img = imageProps(item.image, 1400)
            const aspect = img.aspectRatio ?? 0.8
            const slug = item.projeto?.slug
            const nome = item.projeto?.nome

            const media = (
              <div
                className="relative w-full overflow-hidden bg-ink"
                style={{ aspectRatio: aspect }}
              >
                {img.src && (
                  <Image
                    src={img.src}
                    alt={img.alt || nome || 'Imagem da galeria'}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    {...(img.blurDataURL
                      ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL }
                      : {})}
                  />
                )}
                {/* Afordância de clique: círculo "Ver" no hover. */}
                {slug && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-[0.7rem] uppercase tracking-[0.15em] text-olive opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    Ver
                  </span>
                )}
              </div>
            )

            return (
              <Reveal key={i}>
                {slug ? (
                  <Link
                    href={`/projetos/${slug}`}
                    aria-label={nome ? `Ver projeto: ${nome}` : 'Ver projeto'}
                    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-olive"
                  >
                    {media}
                  </Link>
                ) : (
                  <div className="group block">{media}</div>
                )}
              </Reveal>
            )
          })}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
