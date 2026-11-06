import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import type { MetricaSobre } from '@/sanity/types'

export function NumerosCena({ numeros }: { numeros: MetricaSobre[] }) {
  // Métrica sem valor ou sem legenda não entra (evita um número vazio ou solto).
  const metricas = (numeros ?? []).filter((m) => m.valor?.trim() && m.label?.trim())
  // Empty state: não renderiza uma tela inteira quase vazia.
  if (!metricas.length) return null

  return (
    <Scene tone="cream" minHeight="screen">
      <Container className="flex flex-1 flex-col justify-center py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-label">Presença</p>
          <h2 className="mt-6 font-sans text-[clamp(1.6rem,3.2vw,2.85rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
            Números que nos definem
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-16">
          {metricas.map((metrica, i) => (
            <Reveal key={`${metrica.label}-${i}`} className="flex h-full flex-col">
              <span
                className={cn(
                  'font-sans font-bold leading-[0.85] text-heading',
                  // "Empreendimentos" (tipo frase / texto) é mais longo: fonte menor.
                  metrica.tipo === 'numero'
                    ? 'text-[clamp(2.25rem,5vw,4.25rem)]'
                    : 'text-[clamp(1.75rem,3.5vw,3rem)]',
                )}
              >
                {metrica.valor}
              </span>
              <div className="mt-auto border-t border-label/30 pt-4">
                <span className="text-sm uppercase tracking-[0.2em] text-label">
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
