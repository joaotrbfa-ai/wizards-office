/**
 * @deprecated Source-of-truth migrado para o Sanity em 2026-06-04 (Fase D).
 * O site lê via src/sanity/queries.ts. Mantido como referência histórica /
 * rollback e para o script scripts/migrate-to-sanity.ts.
 */
import type { MediaOverlay } from '@/components/scroll/FullBleedMedia'

export type ServicoPosition = 'bottom-left' | 'center' | 'bottom-right'

export type ServicoData = {
  numero: string
  titulo: string
  subitems: string[]
  descricao: string
  image: string
  alt: string
  position?: ServicoPosition
  featured?: boolean
  overlay?: MediaOverlay
}

export const SERVICOS: ServicoData[] = [
  {
    numero: '01',
    titulo: 'Fotografia',
    subitems: ['Interiores', 'Exteriores', 'Fachadas', 'Inserções de drone'],
    descricao:
      'Produzimos imagens que traduzem atmosfera, escala e intenção arquitetônica com precisão estética. De interiores a fachadas e inserções em drone, cada fotografia é construída para valorizar o empreendimento e fortalecer sua percepção de marca.',
    image: '/projects/wow-rv-001-wine-gourmet.jpg',
    alt: 'RV Wineclub — espaço gourmet',
    position: 'bottom-left',
  },
  {
    numero: '02',
    titulo: 'Design de fachada',
    subitems: ['Designed by Berth Arq.'],
    descricao:
      'Desenvolvemos fachadas autorais que unem identidade, materialidade e presença urbana. Nosso processo combina direção estética e visão estratégica para criar projetos marcantes, contemporâneos e comercialmente relevantes.',
    image: '/projects/wow-rv-001-fachada-angulada.jpg',
    alt: 'RV — fachada angulada',
    position: 'bottom-left',
    featured: true,
  },
  {
    numero: '03',
    titulo: 'Design de interiores',
    subitems: ['Projetos', 'Consultorias'],
    descricao:
      'Criamos interiores pensados para gerar experiência, conexão e desejo. Cada projeto equilibra funcionalidade, sofisticação e narrativa visual para transformar espaços em ambientes memoráveis e alinhados ao posicionamento do empreendimento.',
    image: '/projects/wow-rv-001-hall-03.jpg',
    alt: 'RV Marina — hall',
    position: 'bottom-right',
  },
  {
    numero: '04',
    titulo: 'Filmes',
    subitems: ['Animações CGI', 'Campanhas de marketing', 'Reels'],
    descricao:
      'Criamos filmes que vão além da apresentação técnica. Através de narrativa, ritmo, luz e direção cinematográfica, transformamos projetos em experiências visuais capazes de gerar impacto, emoção e engajamento.',
    image: '/projects/wow-ppt-002-wineclub.jpg',
    alt: 'Procave 002 — wineclub',
    position: 'bottom-left',
    overlay: 'bottom',
  },
  {
    numero: '05',
    titulo: 'Plantas humanizadas',
    subitems: [],
    descricao:
      'Desenvolvemos plantas humanizadas claras, sofisticadas e estrategicamente pensadas para facilitar a leitura do projeto. Unimos precisão técnica e apelo visual para tornar cada espaço mais compreensível, desejável e comercialmente eficiente.',
    image: '/projects/wow-ppt-002-fachada-01.jpg',
    alt: 'Procave 002 — fachada',
    position: 'center',
  },
  {
    numero: '06',
    titulo: 'Tour 360',
    subitems: ['Tour de cidade', 'Tour de empreendimento'],
    descricao:
      'Criamos experiências imersivas que permitem explorar empreendimentos de forma intuitiva e envolvente. Os tours 360 ampliam a percepção espacial do projeto e aproximam o cliente da experiência real antes mesmo da construção. O Tour de Cidade apresenta o entorno como parte do produto — localização deixa de ser promessa e vira experiência.',
    image: '/projects/wow-rv-003-fachada-diurna.jpg',
    alt: 'RV — fachada diurna',
    position: 'bottom-right',
    overlay: 'bottom',
  },
  {
    numero: '07',
    titulo: 'Design',
    subitems: ['Folders', 'Identidade visual de empreendimentos'],
    descricao:
      'Desenvolvemos materiais gráficos e identidades visuais que fortalecem o posicionamento do empreendimento. Do conceito ao folder de vendas, criamos peças que conectam arquitetura, branding e estratégia comercial em uma comunicação consistente e sofisticada.',
    image: '/projects/blessed-fachada-03.jpg',
    alt: 'Blessed — fachada',
    position: 'bottom-left',
  },
]
