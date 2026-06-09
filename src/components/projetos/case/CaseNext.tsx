import Link from 'next/link'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { ProjetoCard } from '@/sanity/types'

export function CaseNext({ proximo }: { proximo: ProjetoCard }) {
  const cover = imageProps(proximo.coverImage, 2400)
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={cover.src}
        alt={cover.alt || proximo.nome}
        blurDataURL={cover.blurDataURL}
        overlay="strong"
        parallax
      >
        {/* Cena inteira clicável */}
        <Link
          href={`/projetos/${proximo.slug}`}
          aria-label={`Próximo projeto: ${proximo.nome}`}
          className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
        />

        <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">Próximo projeto</p>
          <h2 className="mt-5 font-sans text-[clamp(1.95rem,4.4vw,4.1rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            {proximo.nome}
          </h2>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">Ver projeto →</p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
