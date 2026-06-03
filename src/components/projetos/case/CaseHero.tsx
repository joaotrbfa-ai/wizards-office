import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import type { Projeto } from '@/data/projetos'

export function CaseHero({ projeto }: { projeto: Projeto }) {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={projeto.coverImage}
        alt={projeto.nome}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">{projeto.categoria}</p>
          <h1 className="mt-5 font-sans text-[clamp(3rem,8vw,9rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            {projeto.nome}
          </h1>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-sand">
            {projeto.local} · {projeto.ano}
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
