import Link from 'next/link'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia, type MediaOverlay } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { ProjetoCard } from '@/sanity/types'

export interface ProjetoCenaProps {
  projeto: ProjetoCard
  overlay?: MediaOverlay
}

export function ProjetoCena({ projeto, overlay = 'bottom' }: ProjetoCenaProps) {
  const cover = imageProps(projeto.coverImage, 2400)

  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={cover.src}
        alt={cover.alt || projeto.nome}
        blurDataURL={cover.blurDataURL}
        overlay={overlay}
        parallax
      >
        <div className="group relative flex h-full w-full items-end justify-between gap-8 p-8 pb-16 md:p-16 md:pb-24">
          {/* Cena inteira clicável */}
          <Link
            href={`/projetos/${projeto.slug}`}
            aria-label={`Ver projeto: ${projeto.nome}`}
            className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
          />

          {/* Esquerda — metadados */}
          <div className="relative z-0 flex flex-col gap-3">
            <h2 className="font-sans text-[clamp(1.6rem,3.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-wide text-heading transition-transform duration-500 ease-soft group-hover:translate-x-2">
              {projeto.nome}
            </h2>
            <span className="text-sm uppercase tracking-[0.2em] text-label">
              {projeto.local}
            </span>
          </div>

          {/* Direita — affordance visual de "ver case" */}
          <span
            aria-hidden
            className="relative z-0 inline-flex shrink-0 items-center gap-2 self-end pb-2 text-xs uppercase tracking-[0.2em] text-body sm:text-sm"
          >
            <span className="border-b border-body/40 pb-1 transition-colors group-hover:border-body">
              Ver projeto
            </span>
            <span className="transition-transform duration-500 ease-soft group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
