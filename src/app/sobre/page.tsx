import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Abertura } from '@/components/sobre/Abertura'
import { ManifestoSobre } from '@/components/sobre/ManifestoSobre'
import { ProcessoEtapa } from '@/components/sobre/ProcessoEtapa'
import { NumerosCena } from '@/components/sobre/NumerosCena'
import { EquipeHorizontal } from '@/components/sobre/EquipeHorizontal'
import { ETAPAS } from '@/data/processo'

export const metadata: Metadata = {
  title: {
    absolute: 'Sobre — Wizards Office',
  },
  description:
    'Estúdio criativo de visualização arquitetônica fundado em 2019 em Balneário Camboriú. Conheça o time e o processo por trás de cada projeto.',
}

export default function SobrePage() {
  return (
    <>
      <ScrollProgress />
      <Abertura />
      <ManifestoSobre />
      {ETAPAS.map((etapa) => (
        <ProcessoEtapa key={etapa.numero} {...etapa} />
      ))}
      <NumerosCena />
      <EquipeHorizontal />
    </>
  )
}
