import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'

export interface PausaScriptProps {
  texto?: string
  caption?: string
}

/** Cena de respiro entre os Pilares e os Projetos — assinatura "magic." */
export function PausaScript({
  texto = 'magic.',
  caption = 'o que se sente antes de existir',
}: PausaScriptProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-32 md:py-48">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-script text-[clamp(4rem,12vw,12rem)] leading-none text-terracotta">
            {texto}
          </p>
          <p className="mt-8 max-w-md text-sm uppercase tracking-[0.25em] text-sand">{caption}</p>
        </Reveal>
      </Container>
    </Scene>
  )
}
