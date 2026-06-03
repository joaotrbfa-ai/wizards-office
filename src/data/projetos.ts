export type GaleriaItem = {
  src: string
  alt: string
  /** Contexto curto opcional (exibido em layouts split/asymmetric). */
  caption?: string
}

export type Projeto = {
  slug: string
  nome: string
  categoria: string
  ano: number
  local: string
  /** Imagem de capa (full-bleed no índice e hero do case). Obrigatória. */
  coverImage: string
  /** 3-5 imagens grandes pro corpo do case. */
  galeria: GaleriaItem[]
  /** Frase curta editorial pro overlay/listing. */
  resumo: string
  /** Texto editorial longo do case (2-3 parágrafos, separados por \n\n). */
  descricao: string
  /** Quando true, aparece na vitrine da Home. */
  destaque?: boolean
}

/**
 * Catálogo completo de projetos.
 * Imagens hidratadas a partir dos assets em /public/projects/.
 * `descricao` é rascunho na voz da marca — editável.
 */
export const PROJETOS: Projeto[] = [
  {
    slug: 'marina-edge',
    nome: 'Marina Edge',
    categoria: 'Residencial multifamiliar',
    ano: 2025,
    local: 'Balneário Camboriú',
    coverImage: '/projects/cena-06.jpg',
    galeria: [
      {
        src: '/projects/wow-rv-001-hall-05.jpg',
        alt: 'Marina Edge — hall de entrada',
        caption: 'Hall — materialidade rica em luz controlada',
      },
      { src: '/projects/wow-rv-001-hall-03.jpg', alt: 'Marina Edge — circulação social' },
      {
        src: '/projects/wow-rv-001-wine-gourmet.jpg',
        alt: 'Marina Edge — espaço gourmet',
        caption: 'Espaço gourmet — cena editorial',
      },
    ],
    resumo: 'Torre frente-mar. Imagens still e film curto para lançamento de VGV alto.',
    descricao:
      'Torre residencial frente-mar em Balneário Camboriú. Direção criativa pra um lançamento de VGV alto: cenas internas em luz natural, hall com materialidade rica, e um filme curto que carrega a atmosfera do produto.\n\nNosso desafio foi traduzir o luxo do empreendimento em uma linguagem visual que conversasse com o público comprador antes mesmo da pedra fundamental — sem cair em clichês de mercado.\n\nO resultado: um conjunto de imagens e movimento que sustentou a campanha de pré-lançamento e definiu o tom do material comercial.',
    destaque: true,
  },
  {
    slug: 'casa-aurea',
    nome: 'Casa Áurea',
    categoria: 'Residencial unifamiliar',
    ano: 2024,
    local: 'Jurerê Internacional',
    coverImage: '/projects/wow-art-001-suite-garden.jpg',
    galeria: [
      {
        src: '/projects/wow-rv-001-fachada-angulada.jpg',
        alt: 'Casa Áurea — fachada ao entardecer',
        caption: 'Fachada — luz quente de fim de tarde',
      },
      { src: '/projects/wow-rv-003-fachada-diurna.jpg', alt: 'Casa Áurea — fachada diurna' },
    ],
    resumo: 'Casa de praia minimalista. Cenas internas em luz natural e tour interativo.',
    descricao:
      'Casa de praia em Jurerê Internacional. Projeto unifamiliar minimalista que exigiu cenas internas em luz natural quente, exteriores ao entardecer e um tour 360 interativo pra apresentação ao cliente final.\n\nA direção partiu da materialidade — pedra, madeira clara, vidro — e construiu uma narrativa visual de calma e sofisticação contida.',
    destaque: true,
  },
  {
    slug: 'pavilhao-norte',
    nome: 'Pavilhão Norte',
    categoria: 'Hospitalidade',
    ano: 2024,
    local: 'Praia do Rosa',
    coverImage: '/projects/wow-ppt-002-fachada-01.jpg',
    galeria: [
      {
        src: '/projects/wow-ppt-002-wineclub.jpg',
        alt: 'Pavilhão Norte — ambiente social',
        caption: 'Wine club — direção de arte cinematográfica',
      },
      { src: '/projects/wow-rv-001-hall-05.jpg', alt: 'Pavilhão Norte — hall' },
    ],
    resumo: 'Pousada-boutique de oito chaves. Direção de arte e diretor de fotografia virtual.',
    descricao:
      'Pousada-boutique de oito chaves na Praia do Rosa. Hospitalidade com direção de arte cinematográfica: cada ambiente foi pensado como cena editorial, com luz, paleta e detalhe controlados.\n\nO resultado serviu tanto material de marca quanto a estratégia de booking direto da pousada.',
    destaque: true,
  },
  {
    slug: 'horizonte-sul',
    nome: 'Horizonte Sul',
    categoria: 'Residencial multifamiliar',
    ano: 2025,
    local: 'Itapema',
    coverImage: '/projects/wow-rv-003-fachada-diurna.jpg',
    galeria: [
      {
        src: '/projects/blessed-fachada-03.jpg',
        alt: 'Horizonte Sul — torre ao entardecer',
        caption: 'Aérea ao entardecer',
      },
      { src: '/projects/cena-06.jpg', alt: 'Horizonte Sul — implantação no entorno' },
    ],
    resumo: 'Lançamento de duas torres. Masterplan, aéreas ao entardecer e plantas humanizadas.',
    descricao:
      'Lançamento de duas torres em Itapema. Trabalho de fôlego: masterplan, aéreas ao entardecer, plantas humanizadas e prévias de fachada.\n\nA direção priorizou a contextualização do empreendimento no entorno — o entorno é parte do produto, e a comunicação visual tinha que vender essa leitura.',
  },
  {
    slug: 'atelie-da-mata',
    nome: 'Ateliê da Mata',
    categoria: 'Corporativo',
    ano: 2023,
    local: 'Florianópolis',
    coverImage: '/projects/wow-rv-001-hall-03.jpg',
    galeria: [
      { src: '/projects/cena-06.jpg', alt: 'Ateliê da Mata — volumetria' },
      {
        src: '/projects/wow-art-001-suite-garden.jpg',
        alt: 'Ateliê da Mata — integração com a vegetação',
        caption: 'Vegetação nativa como matéria do projeto',
      },
    ],
    resumo: 'Sede de escritório imersa em vegetação nativa. Estudo de luz e materiais em CGI.',
    descricao:
      'Sede corporativa imersa em vegetação nativa em Florianópolis. Estudo de luz e materiais em CGI pra uma incorporadora que queria comunicar valores de marca além do imóvel.\n\nO escritório virou personagem — não cenário.',
  },
  {
    slug: 'duna-park',
    nome: 'Duna Park',
    categoria: 'Urbanismo',
    ano: 2025,
    local: 'Xangri-lá',
    coverImage: '/projects/blessed-fachada-03.jpg',
    galeria: [
      { src: '/projects/wow-rv-003-fachada-diurna.jpg', alt: 'Duna Park — paisagem à beira-mar' },
      {
        src: '/projects/wow-rv-001-fachada-angulada.jpg',
        alt: 'Duna Park — implantação',
        caption: 'Branding espacial — o lote como promessa',
      },
    ],
    resumo: 'Loteamento de alto padrão à beira-mar. Branding espacial e imagens de implantação.',
    descricao:
      'Loteamento de alto padrão à beira-mar em Xangri-lá. Branding espacial e imagens de implantação que precisavam carregar a aspiração do produto sem mostrar nenhum imóvel pronto.\n\nA solução foi vender estilo de vida através de paisagem, luz e detalhes ambientais — o lote como promessa de uma rotina.',
  },
]

/** Subconjunto exibido em destaque na Home — mantém a ordem do catálogo. */
export const PROJETOS_DESTAQUE: Projeto[] = PROJETOS.filter((p) => p.destaque)
