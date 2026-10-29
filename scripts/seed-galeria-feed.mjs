import { createClient } from '@sanity/client'
import { readFileSync, createReadStream } from 'node:fs'
import { join } from 'node:path'

/**
 * Popula `paginaGaleria.imagens` (feed infinito) a partir de uma pasta de JPEGs
 * já otimizados + manifest.json ({ file, orig, group }[]).
 *
 *   node scripts/seed-galeria-feed.mjs <pasta>            # simulação (não grava)
 *   node scripts/seed-galeria-feed.mjs <pasta> --apply   # envia e grava
 *
 * Idempotente: reaproveita assets já enviados (Sanity deduplica por hash) e
 * substitui só o campo `imagens` — `rows` e o resto da página ficam intactos.
 */

// Carrega .env.local manualmente (script fora do runtime do Next).
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] ??= m[2].trim().replace(/^["']|["']$/g, '')
}

const dir = process.argv[2]
const apply = process.argv.includes('--apply')
if (!dir) {
  console.error('Uso: node scripts/seed-galeria-feed.mjs <pasta> [--apply]')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'))

// Alt a partir do nome do arquivo (ambiente mostrado); o resto fica genérico.
const AMBIENTES = [
  ['FACHADA', 'Fachada'],
  ['HALL', 'Hall'],
  ['ROOFTOP', 'Rooftop'],
  ['PISCINA', 'Piscina'],
  ['GOURMET', 'Espaço gourmet'],
  ['ACADEMIA', 'Academia'],
  ['SALAO', 'Salão de festas'],
  ['LIVING', 'Living'],
  ['SAUNA', 'Sauna'],
  ['QUADRA', 'Quadra'],
  ['WINE', 'Wine club'],
  ['BEACH', 'Beach tennis'],
  ['MASSAGEM', 'Sala de massagem'],
  ['JOGOS', 'Sala de jogos'],
  ['PUB', 'Pub'],
  ['TATAME', 'Sala de tatame'],
  ['COWORKING', 'Coworking'],
]
const altDe = (orig) => {
  const nome = orig.toUpperCase()
  const hit = AMBIENTES.find(([k]) => nome.includes(k))
  return hit ? `${hit[1]} — visualização arquitetônica` : 'Visualização arquitetônica'
}

// Ordem da primeira volta: intercala os projetos (maiores grupos primeiro) para a
// primeira tela já misturar ambientes, em vez de mostrar um projeto inteiro seguido.
const grupos = new Map()
for (const it of manifest) {
  if (!grupos.has(it.group)) grupos.set(it.group, [])
  grupos.get(it.group).push(it)
}
const filas = [...grupos.values()].sort((a, b) => b.length - a.length)
const ordem = []
while (filas.some((f) => f.length)) for (const f of filas) if (f.length) ordem.push(f.shift())

console.log(`${ordem.length} imagens, ${grupos.size} grupos. Ordem do feed:`)
ordem.forEach((it, i) => console.log(`${String(i + 1).padStart(2)}  [${it.group}] ${it.orig}  →  ${altDe(it.orig)}`))

if (!apply) {
  console.log('\nSimulação: nada foi enviado. Rode com --apply para gravar.')
  process.exit(0)
}

// Erros 5xx e de rede são transitórios no Sanity: tenta de novo com espera crescente.
const enviaComRetry = async (file) => {
  for (let t = 1; ; t++) {
    try {
      return await client.assets.upload('image', createReadStream(join(dir, file)), {
        filename: file,
      })
    } catch (err) {
      if (t >= 5) throw err
      console.warn(`falhou (${err.message}), tentativa ${t + 1}/5 em ${t * 5}s: ${file}`)
      await new Promise((r) => setTimeout(r, t * 5000))
    }
  }
}

const itens = []
for (const [i, it] of ordem.entries()) {
  const asset = await enviaComRetry(it.file)
  itens.push({
    _type: 'galeriaItem',
    _key: `feed-${String(i).padStart(3, '0')}`,
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: altDe(it.orig) },
  })
  console.log(`enviada ${i + 1}/${ordem.length}: ${it.file}`)
}

const res = await client.patch('paginaGaleria').set({ imagens: itens }).commit()
console.log(`OK — paginaGaleria.imagens com ${itens.length} itens. revision: ${res._rev}`)
