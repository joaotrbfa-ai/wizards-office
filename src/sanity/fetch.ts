import 'server-only'
import { sanityServerClient } from './client'

/** Tags por tipo de documento — usadas na revalidação on-demand via webhook. */
export const TAGS = {
  projeto: 'sanity:projeto',
  pilar: 'sanity:pilar',
  servico: 'sanity:servico',
  etapaProcesso: 'sanity:etapaProcesso',
  membro: 'sanity:membro',
  parceiro: 'sanity:parceiro',
  paginaHome: 'sanity:paginaHome',
  paginaSobre: 'sanity:paginaSobre',
  paginaServicos: 'sanity:paginaServicos',
  paginaProjetos: 'sanity:paginaProjetos',
  paginaGaleria: 'sanity:paginaGaleria',
  paginaContato: 'sanity:paginaContato',
  config: 'sanity:config',
} as const

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: readonly string[]
  revalidate?: number | false
}): Promise<T> {
  return sanityServerClient.fetch<T>(query, params, {
    next: {
      tags: tags as string[],
      revalidate: revalidate === false ? undefined : revalidate,
    },
  })
}
