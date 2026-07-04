import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

// Carrega .env.local manualmente (script fora do runtime do Next).
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] ??= m[2].trim().replace(/^["']|["']$/g, '')
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Pega projetos com capa, na ordem de exibição, deduplicando por slug e
// mantendo apenas os 3 primeiros distintos.
const todos = await client.fetch(`
  *[_type == "projeto" && defined(coverImage.asset)] | order(coalesce(ordem, 999), nome) {
    _id, nome, categoria,
    "slug": slug.current,
    "alt": coverImage.alt,
    "assetRef": coverImage.asset._ref,
    "hotspot": coverImage.hotspot,
    "crop": coverImage.crop
  }
`)

const vistos = new Set()
const projetos = todos.filter((p) => (vistos.has(p.slug) ? false : vistos.add(p.slug))).slice(0, 3)

if (!projetos.length) {
  console.error('Nenhum projeto com capa encontrado. Abortando.')
  process.exit(1)
}

const itens = projetos.map((p, i) => ({
  _type: 'galeriaItem',
  _key: `mg-${i}`,
  image: {
    _type: 'image',
    asset: { _type: 'reference', _ref: p.assetRef },
    alt: p.alt || p.nome,
    ...(p.hotspot ? { hotspot: p.hotspot } : {}),
    ...(p.crop ? { crop: p.crop } : {}),
  },
  caption: p.categoria,
  projeto: { _type: 'reference', _ref: p._id },
}))

// Preserva eyebrow/titulo/descricao existentes; só (re)define os itens.
const existing = await client.fetch(`*[_id == "paginaHome"][0].miniGaleria`)

const res = await client
  .patch('paginaHome')
  .set({
    miniGaleria: {
      eyebrow: existing?.eyebrow ?? 'Portfólio',
      titulo: existing?.titulo ?? 'Galeria',
      descricao:
        existing?.descricao ??
        'Uma seleção de projetos. Clique em uma imagem para abrir o case completo.',
      itens,
    },
  })
  .commit()

console.log(`OK — mini-galeria populada com ${itens.length} itens:`)
for (const p of projetos) console.log(`  • ${p.nome} (${p.categoria}) → /projetos`)
console.log('revision:', res._rev)
