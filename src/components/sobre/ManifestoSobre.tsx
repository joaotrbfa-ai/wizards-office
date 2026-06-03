import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export function ManifestoSobre() {
  return (
    <Scene tone="olive" minHeight="auto" className="py-32 md:py-48">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.2em] text-sand">Manifesto</p>
            <h2 className="mt-6 font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
              Quem somos.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-prose text-lg leading-relaxed text-sand md:text-xl">
              Fundada em 2019 em Balneário Camboriú, a Wizards Office é um estúdio
              criativo dedicado a transformar arquitetura em imagem, filme e
              narrativa visual. Trabalhamos ao lado de construtoras e
              incorporadoras que entendem que uma grande visualização não
              representa um espaço — ela o antecipa.
            </p>
          </Reveal>
        </RevealGroup>
      </Container>
    </Scene>
  )
}
