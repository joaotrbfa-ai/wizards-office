/**
 * Tipos das queries do Sanity (manuais — espelham src/sanity/queries.ts).
 * Mantidos à mão por enquanto; migrar para codegen (sanity typegen) se crescer.
 */

import type { ThemeConfig, RoleOverrides } from '@/lib/themes'

export type SanityImage = {
  _type?: 'image'
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  asset: {
    _id: string
    url: string
    metadata: {
      lqip?: string
      dimensions: { width: number; height: number }
    }
  }
}

export type Position = 'bottom-left' | 'center' | 'bottom-right'
export type Overlay = 'none' | 'soft' | 'strong' | 'bottom'

// ===== Documentos =====

export type Projeto = {
  _id: string
  slug: string
  nome: string
  categoria: string
  ano: number
  local: string
  cliente?: string
  coverImage: SanityImage
  galeria?: { image: SanityImage; caption?: string }[]
  resumo?: string
  descricao: string
  destaque?: boolean
  ordem?: number
}

/** Versão enxuta usada em listagens/cards (sem galeria/descrição). */
export type ProjetoCard = Pick<
  Projeto,
  '_id' | 'slug' | 'nome' | 'categoria' | 'ano' | 'local' | 'coverImage' | 'resumo' | 'destaque' | 'ordem'
>

export type Pilar = {
  _id: string
  numero: string
  titulo: string
  descricao: string
  image?: SanityImage
  position?: Position
  overlay?: Overlay
  aparencia?: RoleOverrides
}

export type Servico = {
  _id: string
  numero: string
  titulo: string
  subitems?: string[]
  descricao: string
  image?: SanityImage
  position?: Position
  overlay?: Overlay
  featured?: boolean
  aparencia?: RoleOverrides
}

export type EtapaProcesso = {
  _id: string
  numero: string
  titulo: string
  descricao: string
  image?: SanityImage
  position?: Position
  overlay?: Overlay
  aparencia?: RoleOverrides
}

export type Membro = {
  _id: string
  numero: string
  slug: string
  nome: string
  cargo: string
  extra?: string
  foto?: SanityImage
}

export type Parceiro = {
  _id: string
  nome: string
  logo?: SanityImage
  ordem?: number
}

// ===== Objects reutilizáveis =====

export type CtaBlock = {
  image?: SanityImage
  tituloLinhas: string[]
  subtitulo?: string
  ctaLabel: string
  href: string
  mostrarScriptMagic?: boolean
  aparencia?: RoleOverrides
}

export type Abertura = {
  label?: string
  tituloLinhas?: string[]
  subtitulo?: string
  image?: SanityImage
}

export type GaleriaItem = {
  image: SanityImage
  caption?: string
}

export type GaleriaRowLayout =
  | 'full'
  | 'split'
  | 'asymmetric-left'
  | 'asymmetric-right'
  | 'trio'
  | 'quartet'

export type GaleriaRow = {
  layout: GaleriaRowLayout
  images: GaleriaItem[]
}

export type MetricaSobre = {
  tipo: 'numero' | 'frase'
  valor: string
  label: string
}

/** Item da mini-galeria da Home: imagem + projeto vinculado (opcional). */
export type MiniGaleriaItem = {
  image: SanityImage
  caption?: string
  projeto?: { slug: string; nome: string; categoria?: string }
}

export type MiniGaleria = {
  eyebrow?: string
  titulo?: string
  descricao?: string
  itens?: MiniGaleriaItem[]
}

/** Projeto como fonte de imagens da galeria horizontal da Home (capa + galeria interna). */
export type GaleriaHomeProjeto = {
  slug: string
  nome: string
  categoria?: string
  coverImage: SanityImage
  galeria?: { image: SanityImage }[]
}

// ===== Singletons =====

export type Config = {
  siteName?: string
  tagline?: string
  brandDescription?: string
  contact?: {
    email?: string
    telefone?: string
    instagramUrl?: string
    instagramHandle?: string
    address?: string
  }
  seo?: {
    defaultTitle?: string
    titleTemplate?: string
    defaultDescription?: string
    ogImage?: SanityImage
  }
  theme?: ThemeConfig
}

export type PaginaHome = {
  hero?: {
    videoUrl?: string
    fraseHead?: string
    fraseScript?: string
    poster?: SanityImage
  }
  manifestoTextoParagrafos?: string[]
  pausaScript?: { texto?: string; caption?: string }
  miniGaleria?: MiniGaleria
  ctaFinal?: CtaBlock
  aparencia?: RoleOverrides
}

export type PaginaSobre = {
  abertura?: Abertura
  manifesto?: { label?: string; titulo?: string; texto?: string }
  numeros?: MetricaSobre[]
  aparencia?: RoleOverrides
}

export type PaginaServicos = {
  abertura?: Abertura
  ctaFinal?: CtaBlock
  aparencia?: RoleOverrides
}

export type PaginaProjetos = {
  abertura?: Abertura
  ctaFinal?: CtaBlock
  aparencia?: RoleOverrides
}

export type PaginaGaleria = {
  abertura?: Abertura
  rows?: GaleriaRow[]
  ctaFinal?: CtaBlock
  aparencia?: RoleOverrides
}

export type PaginaContato = {
  abertura?: Abertura
  brief?: { eyebrow?: string; titulo?: string; submitLabel?: string }
  direto?: { eyebrow?: string; titulo?: string; emailLabel?: string; instagramLabel?: string }
  fecho?: { textoScript?: string; captionLinhas?: string[] }
  aparencia?: RoleOverrides
}
