/**
 * Smoke test do conteúdo no Sanity: conta documentos por tipo e checa uma
 * amostra com referência de imagem resolvida. Útil após rodar a migração ou
 * para conferir o estado do dataset a qualquer momento.
 *
 * Rodar:  npx tsx scripts/verify-sanity.ts
 * Requer: NEXT_PUBLIC_SANITY_* em .env.local (token opcional — só leitura).
 */
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

if (!projectId) {
  console.error('[verify] ✗ Falta NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN, // opcional; sem token lê só publicado
  useCdn: false,
})

const SINGLETON_IDS = [
  'config',
  'paginaHome',
  'paginaSobre',
  'paginaServicos',
  'paginaProjetos',
  'paginaGaleria',
  'paginaContato',
]

async function main() {
  const result = await client.fetch(
    `{
      "projeto": count(*[_type=="projeto"]),
      "pilar": count(*[_type=="pilar"]),
      "servico": count(*[_type=="servico"]),
      "etapaProcesso": count(*[_type=="etapaProcesso"]),
      "membro": count(*[_type=="membro"]),
      "parceiro": count(*[_type=="parceiro"]),
      "singletons": count(*[_id in $singletons]),
      "imageAssets": count(*[_type=="sanity.imageAsset"]),
      "amostra": *[_id=="projeto-marina-edge"][0]{
        nome,
        "cover": coverImage.asset->originalFilename,
        "galeriaN": count(galeria)
      }
    }`,
    { singletons: SINGLETON_IDS },
  )

  console.log(`[verify] projeto=${projectId} dataset=${dataset}\n`)
  console.log(JSON.stringify(result, null, 2))

  const ok =
    result.projeto > 0 && result.singletons === SINGLETON_IDS.length && result.imageAssets > 0
  console.log(ok ? '\n[verify] ✓ Conteúdo presente.' : '\n[verify] ⚠ Conteúdo incompleto.')
  process.exit(ok ? 0 : 1)
}

main().catch((err) => {
  console.error('[verify] ✗ Falhou:', err.message || err)
  process.exit(1)
})
