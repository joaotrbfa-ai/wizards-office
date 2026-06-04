/**
 * Migração inicial: popula o Sanity com o conteúdo atual de src/data/*.ts
 * e as imagens de /public. Idempotente — usa _id determinístico +
 * createOrReplace, então pode rodar quantas vezes precisar.
 *
 * Rodar:  npx tsx scripts/migrate-to-sanity.ts
 * Requer: SANITY_API_WRITE_TOKEN em .env.local (token Editor).
 *
 * Por que .ts (e não .mjs): assim importamos os arrays reais de src/data/*.ts
 * sem duplicá-los. O esbuild (via tsx) apaga os `import type`, então o alias
 * "@/..." desses arquivos não é resolvido em runtime.
 */
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })

import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@sanity/client'

import { PROJETOS } from '../src/data/projetos'
import { MEMBROS } from '../src/data/equipe'
import { ETAPAS } from '../src/data/processo'
import { SERVICOS } from '../src/data/servicos'
import { GALERIA_ROWS } from '../src/data/galeria'
import { PILARES_DATA } from '../src/data/pilares'
import { PARCEIROS_DATA } from '../src/data/parceiros'

// ---- Env / client -----------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error(`
[migrate] ✗ Falta SANITY_API_WRITE_TOKEN.

Crie um token de escrita:
  1. sanity.io/manage → projeto → API → Tokens → "Add API token"
  2. Name: "Migration script" · Permissions: Editor
  3. Copie e adicione em .env.local:
       SANITY_API_WRITE_TOKEN=sk_xxx
  4. Rode de novo: npx tsx scripts/migrate-to-sanity.ts
`)
  process.exit(1)
}
if (!projectId) {
  console.error('[migrate] ✗ Falta NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

// ---- Helpers ----------------------------------------------------------------

const PUBLIC_DIR = join(process.cwd(), 'public')

/** Cache em memória: path de imagem → assetId (deduplica uploads). */
const assetCache = new Map<string, string>()

/** Sobe uma imagem de /public e devolve o assetId (ou null se o arquivo não existe). */
async function uploadImage(relPath: string): Promise<string | null> {
  if (assetCache.has(relPath)) return assetCache.get(relPath)!

  const clean = relPath.replace(/^\//, '')
  const abs = join(PUBLIC_DIR, clean)
  if (!existsSync(abs)) {
    console.warn(`[migrate] ⚠ imagem ausente, pulando: ${relPath}`)
    return null
  }

  const filename = clean.split('/').pop() || 'image'
  const asset = await client.assets.upload('image', createReadStream(abs), { filename })
  assetCache.set(relPath, asset._id)
  console.log(`[migrate] upload image: ${relPath} → asset ${asset._id}`)
  return asset._id
}

type ImageValue = { _type: 'image'; asset: { _type: 'reference'; _ref: string }; alt?: string }

/** Monta o valor de um campo image (com alt). Retorna undefined se a imagem não existe. */
async function imageField(relPath: string, alt?: string): Promise<ImageValue | undefined> {
  const assetId = await uploadImage(relPath)
  if (!assetId) return undefined
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId }, ...(alt ? { alt } : {}) }
}

/** Item de array galeriaItem (image + caption). */
async function galeriaItem(relPath: string, alt: string, caption: string | undefined, key: string) {
  const image = await imageField(relPath, alt)
  return { _type: 'galeriaItem', _key: key, ...(image ? { image } : {}), ...(caption ? { caption } : {}) }
}

const counts: Record<string, number> = {}
async function put(doc: { _id: string; _type: string; [k: string]: unknown }) {
  await client.createOrReplace(doc)
  counts[doc._type] = (counts[doc._type] || 0) + 1
  console.log(`[migrate] createOrReplace ${doc._id} ✓`)
}

// ---- Documentos -------------------------------------------------------------

async function migrateProjetos() {
  for (const p of PROJETOS) {
    const coverImage = await imageField(p.coverImage, `${p.nome} — capa`)
    const galeria = await Promise.all(
      p.galeria.map((g, i) => galeriaItem(g.src, g.alt, g.caption, `gal-${i}`)),
    )
    await put({
      _id: `projeto-${p.slug}`,
      _type: 'projeto',
      nome: p.nome,
      slug: { _type: 'slug', current: p.slug },
      categoria: p.categoria,
      ano: p.ano,
      local: p.local,
      ...(coverImage ? { coverImage } : {}),
      galeria,
      resumo: p.resumo,
      descricao: p.descricao,
      destaque: Boolean(p.destaque),
    })
  }
}

async function migratePilares() {
  for (const p of PILARES_DATA) {
    const image = await imageField(p.image, p.alt)
    await put({
      _id: `pilar-${p.numero}`,
      _type: 'pilar',
      numero: p.numero,
      titulo: p.titulo,
      descricao: p.descricao,
      ...(image ? { image } : {}),
      position: p.position ?? 'bottom-left',
      overlay: p.overlay ?? 'strong',
    })
  }
}

async function migrateServicos() {
  for (const s of SERVICOS) {
    const image = await imageField(s.image, s.alt)
    await put({
      _id: `servico-${s.numero}`,
      _type: 'servico',
      numero: s.numero,
      titulo: s.titulo,
      subitems: s.subitems,
      descricao: s.descricao,
      ...(image ? { image } : {}),
      position: s.position ?? 'bottom-left',
      overlay: s.overlay ?? 'strong',
      featured: Boolean(s.featured),
    })
  }
}

async function migrateEtapas() {
  for (const e of ETAPAS) {
    const image = await imageField(e.image, e.alt)
    await put({
      _id: `etapa-${e.numero}`,
      _type: 'etapaProcesso',
      numero: e.numero,
      titulo: e.titulo,
      descricao: e.descricao,
      ...(image ? { image } : {}),
      position: e.position ?? 'bottom-left',
      overlay: e.overlay ?? 'strong',
    })
  }
}

async function migrateMembros() {
  for (const m of MEMBROS) {
    await put({
      _id: `membro-${m.slug}`,
      _type: 'membro',
      numero: m.numero,
      nome: m.nome,
      slug: { _type: 'slug', current: m.slug },
      cargo: m.cargo,
      ...(m.extra ? { extra: m.extra } : {}),
    })
  }
}

async function migrateParceiros() {
  let ordem = 1
  for (const p of PARCEIROS_DATA) {
    const logo = await imageField(p.src, p.nome)
    await put({
      _id: `parceiro-${ordem}`,
      _type: 'parceiro',
      nome: p.nome,
      ...(logo ? { logo } : {}),
      ordem,
    })
    ordem++
  }
}

// ---- Singletons (conteúdo de páginas) ---------------------------------------

/** Monta um ctaBlock a partir de valores literais. */
async function ctaBlock(opts: {
  image: string
  alt: string
  tituloLinhas: string[]
  subtitulo?: string
  ctaLabel: string
  href: string
  mostrarScriptMagic?: boolean
}) {
  const image = await imageField(opts.image, opts.alt)
  return {
    _type: 'ctaBlock',
    ...(image ? { image } : {}),
    tituloLinhas: opts.tituloLinhas,
    ...(opts.subtitulo ? { subtitulo: opts.subtitulo } : {}),
    ctaLabel: opts.ctaLabel,
    href: opts.href,
    mostrarScriptMagic: opts.mostrarScriptMagic ?? true,
  }
}

/** Monta o objeto de abertura padrão (label, título em linhas, subtítulo, imagem). */
async function abertura(opts: {
  label: string
  tituloLinhas: string[]
  subtitulo?: string
  image: string
  alt: string
}) {
  const image = await imageField(opts.image, opts.alt)
  return {
    label: opts.label,
    tituloLinhas: opts.tituloLinhas,
    ...(opts.subtitulo ? { subtitulo: opts.subtitulo } : {}),
    ...(image ? { image } : {}),
  }
}

async function migrateConfig() {
  await put({
    _id: 'config',
    _type: 'config',
    siteName: 'Wizards Office',
    tagline: 'Crafting spaces that feel like magic.',
    brandDescription: 'Estúdio de visualização arquitetônica. Balneário Camboriú, Santa Catarina.',
    contact: {
      email: 'contato@wizardsoffice.com',
      instagramUrl: 'https://www.instagram.com/wizards.office/',
      instagramHandle: '@wizards.office',
      address: 'Balneário Camboriú · SC',
    },
    seo: {
      defaultTitle: 'Wizards Office · Visualização arquitetônica de alto padrão',
      titleTemplate: '%s · wzds.',
      defaultDescription:
        'Estúdio de visualização arquitetônica em Balneário Camboriú. Imagens, vídeos e experiências que carregam o peso do design.',
    },
  })
}

async function migratePaginaHome() {
  await put({
    _id: 'paginaHome',
    _type: 'paginaHome',
    hero: {
      videoUrl:
        'https://cloud-1de12d.becdn.net/customfile/41ab2e01656c41024eb5efaa834b070e5811799c36524bd61f90a3990c300918/Virentis-Site-Compress-2.mp4',
      fraseHead: 'Crafting spaces that feel like',
      fraseScript: 'magic.',
    },
    manifestoTextoParagrafos: [
      'A Wizards Office é um estúdio criativo de visualização arquitetônica fundado para transformar arquitetura em experiência visual, emoção e desejo.',
      'Criamos imagens, filmes e narrativas visuais que dão forma ao que ainda não existe. Nosso trabalho nasce da união entre arquitetura, direção artística e tecnologia para traduzir a essência de cada projeto com precisão, atmosfera e identidade própria.',
      'Acreditamos que uma grande visualização vai além da representação técnica. Ela antecipa sensações, desperta conexão emocional e amplia a percepção de valor de um empreendimento antes mesmo de sua construção.',
      'Cada imagem é construída com intenção. Cada detalhe — da luz à materialidade, da composição ao ritmo visual — existe para ser sentido.',
      'Movidos por storytelling, estética e inovação, desenvolvemos experiências visuais capazes de transformar espaços em objetos de desejo.',
      'A Wizards Office cria o que as pessoas sentem antes mesmo de um espaço existir.',
    ],
    pausaScript: { texto: 'magic.', caption: 'o que se sente antes de existir' },
    ctaFinal: await ctaBlock({
      image: '/projects/wow-rv-001-wine-gourmet.jpg',
      alt: 'Ambiente Wizards Office',
      tituloLinhas: ['Vamos criar', 'magia', 'juntos?'],
      subtitulo: 'Conte sobre seu projeto. Respondemos em até 48h úteis.',
      ctaLabel: 'Iniciar brief',
      href: '/contato',
    }),
  })
}

async function migratePaginaSobre() {
  await put({
    _id: 'paginaSobre',
    _type: 'paginaSobre',
    abertura: await abertura({
      label: 'Sobre',
      tituloLinhas: ['Estúdio de', 'Visualização', 'Arquitetônica.'],
      subtitulo:
        'Fundada em 2019. Cinco wizards. Uma estética que antecipa o que ainda não foi construído.',
      image: '/projects/wow-rv-001-hall-05.jpg',
      alt: 'Estúdio Wizards Office',
    }),
    manifesto: {
      label: 'Manifesto',
      titulo: 'Quem somos.',
      texto:
        'Fundada em 2019 em Balneário Camboriú, a Wizards Office é um estúdio criativo dedicado a transformar arquitetura em imagem, filme e narrativa visual. Trabalhamos ao lado de construtoras e incorporadoras que entendem que uma grande visualização não representa um espaço — ela o antecipa.',
    },
    numeros: [
      { _type: 'metricaSobre', _key: 'm0', tipo: 'numero', valor: '+10', label: 'Anos de mercado' },
      { _type: 'metricaSobre', _key: 'm1', tipo: 'frase', valor: 'Empreendimentos', label: 'em três estados' },
      { _type: 'metricaSobre', _key: 'm2', tipo: 'numero', valor: '∞', label: 'Cenas dirigidas' },
      { _type: 'metricaSobre', _key: 'm3', tipo: 'frase', valor: 'Cinco wizards', label: 'uma estética' },
    ],
  })
}

async function migratePaginaServicos() {
  await put({
    _id: 'paginaServicos',
    _type: 'paginaServicos',
    abertura: await abertura({
      label: 'Serviços',
      tituloLinhas: ['Tudo o que', 'imaginamos.'],
      subtitulo:
        'Sete frentes de trabalho que se conectam para transformar arquitetura em experiência visual. Cada serviço é executado com a mesma direção criativa, o mesmo cuidado técnico e a mesma obsessão por atmosfera.',
      image: '/projects/wow-art-001-suite-garden.jpg',
      alt: 'Espaço Wizards Office',
    }),
    ctaFinal: await ctaBlock({
      image: '/projects/cena-06.jpg',
      alt: 'Ambiente Wizards Office',
      tituloLinhas: ['Pronto para', 'criar algo', 'extraordinário?'],
      subtitulo: 'Conte sobre seu projeto. Respondemos em até 48h úteis.',
      ctaLabel: 'Pedir orçamento',
      href: '/contato',
    }),
  })
}

async function migratePaginaProjetos() {
  await put({
    _id: 'paginaProjetos',
    _type: 'paginaProjetos',
    abertura: await abertura({
      label: 'Projetos',
      tituloLinhas: ['Trabalhos que', 'falam por si.'],
      subtitulo: 'Seis cases. Cada um, uma direção.',
      image: '/projects/wow-rv-001-fachada-angulada.jpg',
      alt: 'Trabalhos Wizards Office',
    }),
    ctaFinal: await ctaBlock({
      image: '/projects/wow-rv-001-wine-gourmet.jpg',
      alt: 'Ambiente Wizards Office',
      tituloLinhas: ['Vamos criar', 'magia juntos?'],
      ctaLabel: 'Trazer minha visão',
      href: '/contato',
    }),
  })
}

async function migratePaginaGaleria() {
  const rows = await Promise.all(
    GALERIA_ROWS.map(async (row, ri) => {
      const images = await Promise.all(
        row.images.map((img, ii) => galeriaItem(img.src, img.alt, undefined, `g-${ri}-${ii}`)),
      )
      return { _type: 'galeriaRow', _key: `row-${ri}`, layout: row.layout, images }
    }),
  )
  await put({
    _id: 'paginaGaleria',
    _type: 'paginaGaleria',
    abertura: await abertura({
      label: 'Galeria',
      tituloLinhas: ['Uma seleção', 'de trabalhos.'],
      subtitulo:
        'Imagens selecionadas, sem ordem cronológica. O que conecta cada cena é a intenção.',
      image: '/projects/wow-art-001-suite-garden.jpg',
      alt: 'Galeria Wizards Office',
    }),
    rows,
    ctaFinal: await ctaBlock({
      image: '/projects/wow-ppt-002-wineclub.jpg',
      alt: 'Ambiente Wizards Office',
      tituloLinhas: ['Vamos conversar', 'sobre o seu?'],
      subtitulo: 'Conte sobre seu projeto. Respondemos em até 48h úteis.',
      ctaLabel: 'Reconhece seu projeto?',
      href: '/contato',
    }),
  })
}

async function migratePaginaContato() {
  await put({
    _id: 'paginaContato',
    _type: 'paginaContato',
    abertura: await abertura({
      label: 'Contato',
      tituloLinhas: ['Vamos', 'conversar.'],
      subtitulo:
        'Toda grande imagem começa por uma conversa. Conte sobre o empreendimento — respondemos em até 48h úteis.',
      image: '/projects/wow-ppt-002-wineclub.jpg',
      alt: 'Ambiente Wizards Office',
    }),
    brief: { eyebrow: 'Como começamos', titulo: 'Comece pela ambição.', submitLabel: 'Enviar brief' },
    direto: {
      eyebrow: 'Canais diretos',
      titulo: 'Ou fale direto.',
      emailLabel: 'E-mail',
      instagramLabel: 'Instagram',
    },
    fecho: {
      textoScript: 'magic.',
      captionLinhas: ['O que as pessoas', 'sentem antes', 'de existir.'],
    },
  })
}

// ---- Run --------------------------------------------------------------------

async function main() {
  console.log(`[migrate] projeto=${projectId} dataset=${dataset}\n`)

  await migrateProjetos()
  await migratePilares()
  await migrateServicos()
  await migrateEtapas()
  await migrateMembros()
  await migrateParceiros()

  await migrateConfig()
  await migratePaginaHome()
  await migratePaginaSobre()
  await migratePaginaServicos()
  await migratePaginaProjetos()
  await migratePaginaGaleria()
  await migratePaginaContato()

  console.log('\n[migrate] Resumo:')
  for (const [type, n] of Object.entries(counts).sort()) {
    console.log(`  ${type}: ${n}`)
  }
  console.log(`  imagens enviadas: ${assetCache.size}`)
  console.log('\n[migrate] ✓ Concluído. Abra /admin para conferir.')
}

main().catch((err) => {
  console.error('\n[migrate] ✗ Falhou:', err.message || err)
  process.exit(1)
})
