'use client'

import { useState } from 'react'
import { ServicoItem } from './ServicoItem'

export interface ServicosAccordionProps {
  servicos: { numero: string; titulo: string; descricao: string }[]
}

/**
 * Grade de serviços em duas colunas com accordion de abertura exclusiva:
 * abrir um item fecha o que estava aberto.
 */
export function ServicosAccordion({ servicos }: ServicosAccordionProps) {
  const [abertoKey, setAbertoKey] = useState<string | null>(null)

  // Divide em duas colunas (primeira metade à esquerda, resto à direita).
  const meio = Math.ceil(servicos.length / 2)
  const colunas = [servicos.slice(0, meio), servicos.slice(meio)]

  return (
    <div className="mt-10 grid grid-cols-1 gap-x-12 md:mt-12 md:grid-cols-2">
      {colunas.map((coluna, ci) => (
        <div key={ci} className="border-t border-label/20">
          {coluna.map((servico) => (
            <ServicoItem
              key={servico.numero}
              numero={servico.numero}
              titulo={servico.titulo}
              descricao={servico.descricao}
              open={abertoKey === servico.numero}
              onToggle={() =>
                setAbertoKey((k) => (k === servico.numero ? null : servico.numero))
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}
