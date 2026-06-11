import { groq } from 'next-sanity'

// ===== Fragmentos reutilizáveis =====

/** Projeção de image: mantém hotspot/crop/alt e materializa o asset (url + lqip). */
const imageFields = groq`
  ...,
  alt,
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  }
`

/** Abertura padrão das páginas (título em linhas). */
const aberturaFields = groq`
  label,
  tituloLinhas,
  subtitulo,
  image { ${imageFields} }
`

const ctaBlockFields = groq`
  image { ${imageFields} },
  tituloLinhas,
  subtitulo,
  ctaLabel,
  href,
  mostrarScriptMagic
`

// ===== Document queries =====

export const projetosListQuery = groq`
  *[_type == "projeto"] | order(coalesce(ordem, 999), nome) {
    _id,
    "slug": slug.current,
    nome,
    categoria,
    ano,
    local,
    coverImage { ${imageFields} },
    resumo,
    destaque,
    ordem
  }
`

export const projetosDestaqueQuery = groq`
  *[_type == "projeto" && destaque == true] | order(coalesce(ordem, 999), nome) {
    _id,
    "slug": slug.current,
    nome,
    categoria,
    ano,
    local,
    coverImage { ${imageFields} }
  }
`

export const projetoBySlugQuery = groq`
  *[_type == "projeto" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    nome,
    categoria,
    ano,
    local,
    coverImage { ${imageFields} },
    galeria[] { image { ${imageFields} }, caption },
    resumo,
    descricao,
    destaque,
    ordem
  }
`

export const projetoSlugsQuery = groq`
  *[_type == "projeto" && defined(slug.current)].slug.current
`

export const pilaresQuery = groq`
  *[_type == "pilar"] | order(numero) {
    _id,
    numero,
    titulo,
    descricao,
    image { ${imageFields} },
    position,
    overlay
  }
`

export const servicosQuery = groq`
  *[_type == "servico"] | order(numero) {
    _id,
    numero,
    titulo,
    subitems,
    descricao,
    image { ${imageFields} },
    position,
    overlay,
    featured
  }
`

export const etapasQuery = groq`
  *[_type == "etapaProcesso"] | order(numero) {
    _id,
    numero,
    titulo,
    descricao,
    image { ${imageFields} },
    position,
    overlay
  }
`

export const membrosQuery = groq`
  *[_type == "membro"] | order(numero) {
    _id,
    numero,
    "slug": slug.current,
    nome,
    cargo,
    extra,
    foto { ${imageFields} }
  }
`

export const parceirosQuery = groq`
  *[_type == "parceiro"] | order(coalesce(ordem, 999), nome) {
    _id,
    nome,
    logo { ${imageFields} },
    ordem
  }
`

// ===== Singleton queries =====

/** Projeção dos overrides de papel (todos opcionais → null quando ausentes). */
const temaPapeisFields = groq`
  "surface": surface.hex,
  "heading": heading.hex,
  "body": body.hex,
  "label": label.hex,
  "accent": accent.hex
`

export const configQuery = groq`
  *[_id == "config"][0] {
    siteName,
    tagline,
    brandDescription,
    contact,
    seo { ..., ogImage { ${imageFields} } },
    theme {
      preset,
      custom {
        "cream": cream.hex,
        "sand": sand.hex,
        "olive": olive.hex,
        "terracotta": terracotta.hex,
        "ink": ink.hex,
        "muted": muted.hex
      },
      roles { ${temaPapeisFields} }
    }
  }
`

export const paginaHomeQuery = groq`
  *[_id == "paginaHome"][0] {
    hero { videoUrl, fraseHead, fraseScript, poster { ${imageFields} } },
    manifestoTextoParagrafos,
    pausaScript { texto, caption },
    ctaFinal { ${ctaBlockFields} },
    aparencia { ${temaPapeisFields} }
  }
`

export const paginaSobreQuery = groq`
  *[_id == "paginaSobre"][0] {
    abertura { ${aberturaFields} },
    manifesto { label, titulo, texto },
    numeros[] { tipo, valor, label },
    aparencia { ${temaPapeisFields} }
  }
`

export const paginaServicosQuery = groq`
  *[_id == "paginaServicos"][0] {
    abertura { ${aberturaFields} },
    ctaFinal { ${ctaBlockFields} },
    aparencia { ${temaPapeisFields} }
  }
`

export const paginaProjetosQuery = groq`
  *[_id == "paginaProjetos"][0] {
    abertura { ${aberturaFields} },
    ctaFinal { ${ctaBlockFields} },
    aparencia { ${temaPapeisFields} }
  }
`

export const paginaGaleriaQuery = groq`
  *[_id == "paginaGaleria"][0] {
    abertura { ${aberturaFields} },
    rows[] { layout, images[] { image { ${imageFields} }, caption } },
    ctaFinal { ${ctaBlockFields} },
    aparencia { ${temaPapeisFields} }
  }
`

export const paginaContatoQuery = groq`
  *[_id == "paginaContato"][0] {
    abertura { ${aberturaFields} },
    brief,
    direto,
    fecho { textoScript, captionLinhas },
    aparencia { ${temaPapeisFields} }
  }
`
