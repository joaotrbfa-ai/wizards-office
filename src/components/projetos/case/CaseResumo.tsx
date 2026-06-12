import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import type { Projeto } from '@/sanity/types'

export function CaseResumo({ projeto }: { projeto: Projeto }) {
  const paragrafos = (projeto.descricao ?? '').split('\n\n')

  return (
    <Scene tone="olive" minHeight="auto" className="py-32 md:py-48">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <h2 className="font-sans text-[clamp(1.55rem,3vw,2.3rem)] font-bold uppercase leading-[0.95] tracking-wide text-heading">
              Sobre o projeto
            </h2>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <RevealGroup className="flex flex-col gap-6">
              {paragrafos.map((p, i) => (
                <Reveal key={i}>
                  <p className="max-w-prose text-base leading-relaxed text-label md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Scene>
  )
}
