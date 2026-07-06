import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { CaseMeta } from '@/components/projetos/case/CaseMeta'
import { CaseGaleria } from '@/components/projetos/case/CaseGaleria'
import { CaseDescricao } from '@/components/projetos/case/CaseDescricao'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { projetoBySlugQuery, projetoSlugsQuery, projetosListQuery } from '@/sanity/queries'
import type { Projeto, ProjetoCard } from '@/sanity/types'

type Params = { slug: string }

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: projetoSlugsQuery,
    tags: [TAGS.projeto],
  })
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const projeto = await sanityFetch<Projeto | null>({
    query: projetoBySlugQuery,
    params: { slug: params.slug },
    tags: [TAGS.projeto],
  })
  if (!projeto) return { title: { absolute: 'Projeto — Wizards Office' } }
  return {
    title: { absolute: `${projeto.nome} — Wizards Office` },
    description: projeto.resumo,
  }
}

export default async function CasePage({ params }: { params: Params }) {
  const [projeto, lista] = await Promise.all([
    sanityFetch<Projeto | null>({
      query: projetoBySlugQuery,
      params: { slug: params.slug },
      tags: [TAGS.projeto],
    }),
    sanityFetch<ProjetoCard[]>({ query: projetosListQuery, tags: [TAGS.projeto] }),
  ])

  if (!projeto) notFound()

  // Próximo projeto (índice circular na lista ordenada) — alvo da seta no cabeçalho.
  const idx = lista.findIndex((p) => p.slug === projeto.slug)
  const proximo = lista.length > 1 ? lista[(Math.max(idx, 0) + 1) % lista.length] : undefined

  return (
    <>
      <ScrollProgress />
      <CaseMeta projeto={projeto} proximo={proximo && { slug: proximo.slug, nome: proximo.nome }} />
      <CaseGaleria projeto={projeto} />
      <CaseDescricao projeto={projeto} />
    </>
  )
}
