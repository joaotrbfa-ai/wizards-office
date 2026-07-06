import Link from 'next/link'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import type { Projeto } from '@/sanity/types'

export interface CaseMetaProps {
  projeto: Projeto
  /** Próximo projeto — alvo da seta ao lado do rótulo "Projeto". */
  proximo?: { slug: string; nome: string }
}

/**
 * Cabeçalho da página do projeto: metadados em linha (Projeto · Cliente ·
 * Localização) sobre o fundo padrão (olive), logo acima da faixa de imagens. A
 * seta ao lado de "Projeto" leva ao próximo projeto. "Cliente" só aparece quando
 * preenchido.
 */
export function CaseMeta({ projeto, proximo }: CaseMetaProps) {
  return (
    <Scene tone="olive" minHeight="auto" clip={false} className="pt-28 md:pt-36">
      <Container width="wide">
        <RevealGroup className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          {/* Projeto — nome em destaque; seta → próximo projeto */}
          <Reveal className="md:max-w-[45%]">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.25em] text-label">Projeto</p>
              {proximo && (
                <Link
                  href={`/projetos/${proximo.slug}`}
                  aria-label={`Próximo projeto: ${proximo.nome}`}
                  className="text-label transition-colors hover:text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  <span aria-hidden className="text-base leading-none">
                    &rsaquo;
                  </span>
                </Link>
              )}
            </div>
            <h1 className="mt-2 font-sans text-[clamp(1.8rem,4vw,3.4rem)] font-bold uppercase leading-[0.95] tracking-wide text-heading">
              {projeto.nome}
            </h1>
          </Reveal>

          {/* Cliente + Localização: lado a lado no mobile; itens soltos da linha no desktop. */}
          <div className="flex gap-12 md:contents">
            {projeto.cliente && (
              <Reveal className="md:pt-1">
                <p className="text-xs uppercase tracking-[0.25em] text-label">Cliente</p>
                <p className="mt-2 font-sans text-sm uppercase tracking-[0.15em] text-heading md:text-base">
                  {projeto.cliente}
                </p>
              </Reveal>
            )}

            <Reveal className="md:pt-1 md:text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-label">Localização</p>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.15em] text-heading md:text-base">
                {projeto.local}
              </p>
            </Reveal>
          </div>
        </RevealGroup>
      </Container>
    </Scene>
  )
}
