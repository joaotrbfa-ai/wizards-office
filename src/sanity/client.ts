import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

const baseConfig = {
  apiVersion,
  dataset,
  projectId,
  perspective: 'published' as const, // SSG sempre lê publicados, ignora drafts
}

/** Client server-side com token de leitura — usado por sanityFetch internamente. */
export const sanityServerClient = createClient({
  ...baseConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})
