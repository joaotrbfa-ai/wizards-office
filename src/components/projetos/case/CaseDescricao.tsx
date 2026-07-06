import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import type { Projeto } from '@/sanity/types'

/**
 * Breve descrição do projeto (campo Resumo) no rodapé da página, sobre o fundo
 * padrão (olive). Oculta quando o resumo está vazio.
 */
export function CaseDescricao({ projeto }: { projeto: Projeto }) {
  if (!projeto.resumo) return null

  return (
    <Scene tone="olive" minHeight="auto" clip={false} className="pb-28 pt-10 md:pb-36 md:pt-14">
      <Container width="wide">
        <Reveal>
          <p className="max-w-2xl text-base leading-relaxed text-label md:text-lg">
            {projeto.resumo}
          </p>
        </Reveal>
      </Container>
    </Scene>
  )
}
