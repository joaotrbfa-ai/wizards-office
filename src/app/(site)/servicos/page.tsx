import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Abertura } from '@/components/servicos/Abertura'
import { ServicoCena } from '@/components/servicos/ServicoCena'
import { CtaFinal } from '@/components/shared/CtaFinal'
import { SERVICOS } from '@/data/servicos'

export const metadata: Metadata = {
  title: {
    absolute: 'Serviços — Wizards Office',
  },
  description:
    'Fotografia, design de fachada, interiores, filmes, plantas humanizadas, tour 360 e design gráfico. Sete frentes para transformar arquitetura em desejo.',
}

export default function ServicosPage() {
  return (
    <>
      <ScrollProgress />
      <Abertura />
      {SERVICOS.map((servico) => (
        <ServicoCena key={servico.numero} {...servico} />
      ))}
      <CtaFinal
        image="/projects/cena-06.jpg"
        alt="Ambiente Wizards Office"
        titulo={['Pronto para', 'criar algo', 'extraordinário?']}
        subtitulo="Conte sobre seu projeto. Respondemos em até 48h úteis."
        href="/contato"
        ctaLabel="Pedir orçamento"
      />
    </>
  )
}
