import type { MetadataRoute } from 'next'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { projetoSlugsQuery } from '@/sanity/queries'

const BASE = 'https://wizardsoffice.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<string[]>({
    query: projetoSlugsQuery,
    tags: [TAGS.projeto],
  })

  const rotas = ['', '/sobre', '/servicos', '/projetos', '/galeria', '/contato']

  const estaticas: MetadataRoute.Sitemap = rotas.map((rota) => ({
    url: `${BASE}${rota}`,
    changeFrequency: 'monthly',
    priority: rota === '' ? 1 : 0.8,
  }))

  const cases: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/projetos/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...estaticas, ...cases]
}
