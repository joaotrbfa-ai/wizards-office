import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import type { MetricaSobre } from '@/sanity/types'

export function NumerosCena({ numeros }: { numeros: MetricaSobre[] }) {
  return (
    <Scene tone="ink" minHeight="screen">
      <Container className="flex flex-1 flex-col justify-center py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-sand">Presença</p>
          <h2 className="mt-6 font-sans text-[clamp(2rem,4vw,4rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            Números que nos definem
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-12 md:mt-24 md:grid-cols-4 md:gap-16">
          {numeros.map((metrica) => (
            <Reveal key={metrica.label} className="flex flex-col">
              {metrica.tipo === 'numero' ? (
                <span className="font-sans text-[clamp(3.25rem,7vw,6.5rem)] font-bold leading-[0.85] text-cream">
                  {metrica.valor}
                </span>
              ) : (
                <span className="font-script text-[clamp(2.5rem,5vw,4rem)] leading-none text-terracotta">
                  {metrica.valor}
                </span>
              )}
              <div className="mt-6 border-t border-sand/30 pt-4">
                <span className="text-sm uppercase tracking-[0.2em] text-sand">
                  {metrica.label}
                </span>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
