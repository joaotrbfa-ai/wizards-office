import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { ServicosAccordion } from './ServicosAccordion'

export interface ServicosListaProps {
  /** Serviços (número + título + descrição), na ordem de exibição. */
  servicos: { numero: string; titulo: string; descricao: string }[]
}

export function ServicosLista({ servicos }: ServicosListaProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-24 md:py-32">
      <Container>
        <h2 className="font-sans text-[clamp(1.95rem,4.4vw,3.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
          <MaskReveal>O que fazemos</MaskReveal>
        </h2>

        <ServicosAccordion servicos={servicos} />
      </Container>
    </Scene>
  )
}
