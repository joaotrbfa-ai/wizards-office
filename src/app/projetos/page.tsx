import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { ProjetosAbertura } from '@/components/projetos/ProjetosAbertura'
import { ProjetoCena } from '@/components/projetos/ProjetoCena'
import { CtaFinal } from '@/components/shared/CtaFinal'
import { PROJETOS } from '@/data/projetos'

export const metadata: Metadata = {
  title: {
    absolute: 'Projetos — Wizards Office',
  },
  description:
    'Cases selecionados de visualização arquitetônica. Cada projeto traduz uma intenção em imagem, filme e narrativa.',
}

export default function ProjetosPage() {
  return (
    <>
      <ScrollProgress />
      <ProjetosAbertura />
      {PROJETOS.map((projeto, i) => (
        <ProjetoCena key={projeto.slug} projeto={projeto} index={i} total={PROJETOS.length} />
      ))}
      <CtaFinal
        image="/projects/wow-rv-001-wine-gourmet.jpg"
        alt="Ambiente Wizards Office"
        titulo={['Vamos criar', 'magia juntos?']}
        href="/contato"
        ctaLabel="Trazer minha visão"
      />
    </>
  )
}
