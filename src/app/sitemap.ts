import type { MetadataRoute } from 'next'
import { PROJETOS } from '@/data/projetos'

const BASE = 'https://wizardsoffice.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ['', '/sobre', '/servicos', '/projetos', '/galeria', '/contato']

  const estaticas: MetadataRoute.Sitemap = rotas.map((rota) => ({
    url: `${BASE}${rota}`,
    changeFrequency: 'monthly',
    priority: rota === '' ? 1 : 0.8,
  }))

  const cases: MetadataRoute.Sitemap = PROJETOS.map((projeto) => ({
    url: `${BASE}/projetos/${projeto.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...estaticas, ...cases]
}
