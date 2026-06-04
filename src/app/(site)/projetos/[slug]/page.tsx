import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { CaseHero } from '@/components/projetos/case/CaseHero'
import { CaseResumo } from '@/components/projetos/case/CaseResumo'
import { CaseGaleria } from '@/components/projetos/case/CaseGaleria'
import { CaseNext } from '@/components/projetos/case/CaseNext'
import { PROJETOS } from '@/data/projetos'

type Params = { slug: string }

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const projeto = PROJETOS.find((p) => p.slug === params.slug)
  if (!projeto) return { title: { absolute: 'Projeto — Wizards Office' } }
  return {
    title: { absolute: `${projeto.nome} — Wizards Office` },
    description: projeto.resumo,
  }
}

export default function CasePage({ params }: { params: Params }) {
  const projeto = PROJETOS.find((p) => p.slug === params.slug)
  if (!projeto) notFound()

  const idx = PROJETOS.findIndex((p) => p.slug === projeto.slug)
  const proximo = PROJETOS[(idx + 1) % PROJETOS.length]

  return (
    <>
      <ScrollProgress />
      <CaseHero projeto={projeto} />
      <CaseResumo projeto={projeto} />
      <CaseGaleria projeto={projeto} />
      <CaseNext proximo={proximo} />
    </>
  )
}
