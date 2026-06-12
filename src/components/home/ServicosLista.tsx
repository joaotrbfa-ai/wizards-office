import Link from 'next/link'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export interface ServicosListaProps {
  /** Serviços (número + título), na ordem de exibição. */
  servicos: { numero: string; titulo: string }[]
}

export function ServicosLista({ servicos }: ServicosListaProps) {
  return (
    <Scene tone="olive" minHeight="screen">
      <Container className="flex flex-1 flex-col justify-center py-24">
        <Reveal>
          <h2 className="font-sans text-[clamp(1.95rem,4.4vw,3.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
            O que fazemos
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 border-t border-label/20">
          {servicos.map((servico) => (
            <Reveal key={servico.numero}>
              <Link
                href={`/servicos#servico-${servico.numero}`}
                className="group flex items-baseline gap-6 border-b border-label/20 py-6 md:py-8"
              >
                <span className="text-sm uppercase tracking-widest text-label transition-colors duration-300 group-hover:text-accent">
                  {servico.numero}.
                </span>
                <span className="font-sans text-[clamp(1.35rem,2.6vw,2.2rem)] font-medium uppercase tracking-wide text-heading transition-[transform,color] duration-[400ms] ease-out group-hover:translate-x-2 group-hover:text-accent">
                  {servico.titulo}
                </span>
              </Link>
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
