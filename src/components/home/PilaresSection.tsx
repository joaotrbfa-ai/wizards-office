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
    <Scene tone="ink" minHeight="auto" className="py-24 md:py-36">
      <Container width="wide">
        <Reveal className="flex flex-col items-center">
          <Image
            src="/brand/logo-light.png"
            alt="Wizards Office"
            width={1250}
            height={404}
            className="h-9 w-auto md:h-11"
          />
          <span aria-hidden className="mt-8 block h-px w-12 bg-label/40" />
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-3 md:gap-12">
          {pilares.map((pilar) => (
            <Reveal key={pilar._id} className="text-center">
              <h3 className="font-sans text-[clamp(1.3rem,2vw,1.75rem)] font-bold uppercase tracking-[0.22em] text-heading">
                {pilar.titulo}
              </h3>
              <span aria-hidden className="mx-auto mt-6 block h-px w-10 bg-label/40" />
              <p className="mx-auto mt-7 max-w-xs text-sm leading-relaxed text-label md:text-base">
                {pilar.descricao}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
