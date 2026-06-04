import { CaseGaleriaClient } from './CaseGaleriaClient'
import type { Projeto } from '@/sanity/types'

export function CaseGaleria({ projeto }: { projeto: Projeto }) {
  const galeria = projeto.galeria ?? []
  if (galeria.length === 0) return null

  return <CaseGaleriaClient galeria={galeria} />
}
