import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { Projeto } from '@/sanity/types'

export function CaseHero({ projeto }: { projeto: Projeto }) {
  const cover = imageProps(projeto.coverImage, 2400)
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={cover.src}
        alt={cover.alt || projeto.nome}
        blurDataURL={cover.blurDataURL}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-label">{projeto.categoria}</p>
          <h1 className="mt-5 font-sans text-[clamp(2.1rem,4.8vw,4.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
            {projeto.nome}
          </h1>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-label">
            {projeto.local}
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
