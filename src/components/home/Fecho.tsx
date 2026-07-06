import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export interface FechoProps {
  textoScript?: string
  captionLinhas?: string[]
}

/**
 * Fecho da landing: um sign-off poético que encerra o site antes do rodapé —
 * bookend do hero ("Crafting spaces that feel like magic."). Wordmark gigante
 * ao fundo dá profundidade; a frase em script fecha a narrativa.
 */
export function Fecho({ textoScript = 'magic.', captionLinhas }: FechoProps) {
  const linhas = captionLinhas?.length ? captionLinhas : ['Crafting spaces', 'that feel like']

  return (
    <Scene tone="olive" minHeight="auto" className="relative overflow-hidden py-32 md:py-48">
      {/* Wordmark gigante ao fundo — profundidade sutil, sem competir com o texto. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-sans text-[23vw] font-bold uppercase leading-none tracking-tighter text-cream opacity-[0.035]"
      >
        wizards
      </span>

      <Container className="relative flex flex-col items-center text-center">
        <RevealGroup className="flex flex-col items-center gap-1">
          {linhas.map((linha, i) => (
            <Reveal key={i}>
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-label md:text-base">
                {linha}
              </p>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mt-8 font-script text-[clamp(3.5rem,11vw,9rem)] leading-[0.8] text-cream">
            {textoScript}
          </p>
        </Reveal>

        <Reveal>
          <span aria-hidden className="mt-12 block h-px w-16 bg-cream/25" />
        </Reveal>
      </Container>
    </Scene>
  )
}
