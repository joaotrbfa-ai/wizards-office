import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

type Metrica = { tipo: 'numero' | 'frase'; valor: string; label: string }

/** Mix de número real + frases editoriais (evita placeholders até definirmos os reais). */
const METRICAS: Metrica[] = [
  { tipo: 'numero', valor: '+10', label: 'Anos de mercado' },
  { tipo: 'frase', valor: 'Empreendimentos', label: 'em três estados' },
  { tipo: 'numero', valor: '∞', label: 'Cenas dirigidas' },
  { tipo: 'frase', valor: 'Cinco wizards', label: 'uma estética' },
]

export function NumerosCena() {
  return (
    <Scene tone="ink" minHeight="screen">
      <Container className="flex flex-1 flex-col justify-center py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-sand">Presença</p>
          <h2 className="mt-6 font-sans text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            Números que nos definem
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-12 md:mt-24 md:grid-cols-4 md:gap-16">
          {METRICAS.map((metrica) => (
            <Reveal key={metrica.label} className="flex flex-col">
              {metrica.tipo === 'numero' ? (
                <span className="font-sans text-[clamp(4rem,9vw,8rem)] font-bold leading-[0.85] text-cream">
                  {metrica.valor}
                </span>
              ) : (
                <span className="font-script text-[clamp(3rem,6vw,5rem)] leading-none text-terracotta">
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
