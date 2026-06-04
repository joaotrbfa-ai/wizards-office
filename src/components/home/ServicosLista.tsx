import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export interface ServicosListaProps {
  /** Títulos dos serviços, na ordem de exibição. */
  servicos: string[]
}

export function ServicosLista({ servicos }: ServicosListaProps) {
  return (
    <Scene tone="ink" minHeight="screen">
      <Container className="flex flex-1 flex-col justify-center py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-sand">O que fazemos</p>
          <h2 className="mt-6 font-sans text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            Expertise
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 border-t border-sand/20">
          {servicos.map((servico, i) => (
            <Reveal key={servico}>
              <div className="group flex cursor-default items-baseline gap-6 border-b border-sand/20 py-6 md:py-8">
                <span className="text-sm uppercase tracking-widest text-sand transition-colors duration-300 group-hover:text-terracotta">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className="font-sans text-[clamp(1.5rem,3vw,2.75rem)] font-medium uppercase tracking-wide text-cream transition-[transform,color] duration-[400ms] ease-out group-hover:translate-x-2 group-hover:text-terracotta">
                  {servico}
                </span>
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <Button variant="outline" href="/servicos" size="md">
            Conheça todos os serviços
          </Button>
        </Reveal>
      </Container>
    </Scene>
  )
}
