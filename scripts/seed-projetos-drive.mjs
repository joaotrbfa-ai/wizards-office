import { createClient } from '@sanity/client'
import { readFileSync, createReadStream } from 'node:fs'
import { join } from 'node:path'

/**
 * Importa as pastas de projeto do Drive (já otimizadas, com manifest.json do
 * seed-galeria-feed) para o Sanity:
 *  - cria os projetos novos (Graciosa, Areia) se ainda não existirem;
 *  - acrescenta as fotos de RV ao final da galeria do Fazenda Garden.
 *
 *   node scripts/seed-projetos-drive.mjs <pasta>            # simulação
 *   node scripts/seed-projetos-drive.mjs <pasta> --apply   # envia e grava
 *
 * Rode uma vez: os projetos novos usam createIfNotExists (não sobrescrevem edições
 * do Studio), mas a galeria do Fazenda Garden é acrescida a cada execução.
 */

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] ??= m[2].trim().replace(/^["']|["']$/g, '')
}

const dir = process.argv[2]
const apply = process.argv.includes('--apply')
if (!dir) {
  console.error('Uso: node scripts/seed-projetos-drive.mjs <pasta> [--apply]')
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
const doGrupo = (g) =>
  manifest
    .filter((i) => i.group === g)
    .sort((a, b) => a.orig.localeCompare(b.orig, 'pt', { numeric: true }))

// Local/ano/categoria são provisórios (iguais ao Fazenda Garden): ajustar no Studio.
const NOVOS = [
  {
    _id: 'projeto-graciosa',
    group: 'EVR',
    nome: 'Graciosa',
    slug: 'graciosa',
    cliente: 'EVR',
    capa: 'EVR-002-FACHADA (2).jpg',
    ordem: 5,
  },
  {
    _id: 'projeto-areia',
    group: 'FHB-AREIA',
    nome: 'Areia',
    slug: 'areia',
    cliente: 'Fhobus Incorporadora',
    capa: 'FHB-004-FACHADA (1).jpg',
    ordem: 6,
  },
]
const FAZENDA_GARDEN = { _id: 'projeto-atelie-da-mata', group: 'RV' }

const AMBIENTES = [
  ['FACHADA', 'Fachada'],
  ['HALL', 'Hall'],
  ['ROOFTOP', 'Rooftop'],
  ['PISCINA', 'Piscina'],
  ['GOURMET', 'Espaço gourmet'],
  ['ACADEMIA', 'Academia'],
  ['SALAO', 'Salão de festas'],
  ['LIVING', 'Living'],
  ['QUADRA', 'Quadra'],
  ['MASSAGEM', 'Sala de massagem'],
  ['JOGOS', 'Sala de jogos'],
  ['PUB', 'Pub'],
]
const altDe = (orig, nome) => {
  const hit = AMBIENTES.find(([k]) => orig.toUpperCase().includes(k))
  return `${hit ? hit[1] : 'Visualização'} — ${nome}`
}

console.log('Fazenda Garden: +', doGrupo(FAZENDA_GARDEN.group).length, 'imagens (acrescentadas)')
for (const p of NOVOS) {
  const imgs = doGrupo(p.group)
  console.log(`${p.nome} (${p.cliente}): capa ${p.capa} + ${imgs.length - 1} na galeria, ordem ${p.ordem}`)
  if (!imgs.some((i) => i.orig === p.capa)) throw new Error(`capa não encontrada: ${p.capa}`)
}
if (!apply) {
  console.log('\nSimulação: nada foi enviado. Rode com --apply para gravar.')
  process.exit(0)
}

const enviaComRetry = async (file) => {
  for (let t = 1; ; t++) {
    try {
      return await client.assets.upload('image', createReadStream(join(dir, file)), { filename: file })
    } catch (err) {
      if (t >= 5) throw err
      console.warn(`falhou (${err.message}), tentativa ${t + 1}/5 em ${t * 5}s: ${file}`)
      await new Promise((r) => setTimeout(r, t * 5000))
    }
  }
}

const imagemDe = async (it, nome) => {
  const asset = await enviaComRetry(it.file)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: altDe(it.orig, nome) }
}

// 1) Projetos novos
for (const p of NOVOS) {
  const imgs = doGrupo(p.group)
  const capa = imgs.find((i) => i.orig === p.capa)
  const galeria = []
  for (const [i, it] of imgs.filter((x) => x !== capa).entries()) {
    galeria.push({
      _type: 'galeriaItem',
      _key: `drv-${String(i).padStart(3, '0')}`,
      image: await imagemDe(it, p.nome),
    })
  }
  const frase = `Material realizado para ${p.cliente}`
  const doc = await client.createIfNotExists({
    _id: p._id,
    _type: 'projeto',
    nome: p.nome,
    slug: { _type: 'slug', current: p.slug },
    categoria: 'Residencial multifamiliar',
    ano: 2026,
    local: 'Itajaí, SC',
    cliente: p.cliente,
    coverImage: await imagemDe(capa, p.nome),
    galeria,
    resumo: frase,
    descricao: frase,
    destaque: false,
    ordem: p.ordem,
  })
  console.log(`OK projeto ${p.nome}: ${doc._id} (${galeria.length} fotos na galeria)`)
}

// 2) Fazenda Garden: acrescenta ao final da galeria existente
const rv = []
for (const [i, it] of doGrupo(FAZENDA_GARDEN.group).entries()) {
  rv.push({
    _type: 'galeriaItem',
    _key: `drv-${String(i).padStart(3, '0')}`,
    image: await imagemDe(it, 'Fazenda Garden'),
  })
}
await client
  .patch(FAZENDA_GARDEN._id)
  .setIfMissing({ galeria: [] })
  .append('galeria', rv)
  .commit()
console.log(`OK Fazenda Garden: +${rv.length} imagens na galeria`)
