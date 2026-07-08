import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import type { Pilar } from '@/sanity/types'

/**
 * Logo da Wizards no topo (como o wordmark da referência Kern) e, abaixo,
 * Direção / Narrativa / Confiança em três colunas de texto centralizado —
 * só tipografia, sem imagens, na paleta da casa. Título espaçado + traço fino
 * + parágrafo, com bastante respiro.
 */
export function PilaresSection({ pilares }: { pilares: Pilar[] }) {
  if (!pilares.length) return null

  return (
    <Scene tone="ink" minHeight="auto" className="pt-12 pb-16 md:pt-28 md:pb-36">
      <Container width="wide">
        <Reveal className="flex flex-col items-center">
          <Image
            src="/brand/logo-extensa-bege.png"
            alt="Wizards Office"
            width={1266}
            height={252}
            className="h-auto w-72 md:w-96"
          />
          <span aria-hidden className="mt-6 block h-px w-12 bg-label/40 md:mt-8" />
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-12">
          {pilares.map((pilar) => (
            <Reveal key={pilar._id} className="text-center">
              <h3 className="font-sans text-[clamp(1.15rem,2vw,1.75rem)] font-bold uppercase tracking-[0.22em] text-heading">
                {pilar.titulo}
              </h3>
              <span aria-hidden className="mx-auto mt-5 block h-px w-10 bg-label/40 md:mt-6" />
              <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-label md:mt-7 md:text-base">
                {pilar.descricao}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
