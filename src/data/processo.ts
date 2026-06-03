import type { MediaOverlay } from '@/components/scroll/FullBleedMedia'

export type ProcessoPosition = 'bottom-left' | 'center' | 'bottom-right'

export type ProcessoEtapaData = {
  numero: string
  titulo: string
  descricao: string
  image: string
  alt: string
  position?: ProcessoPosition
  overlay?: MediaOverlay
}

export const ETAPAS: ProcessoEtapaData[] = [
  {
    numero: '01',
    titulo: 'Briefing',
    descricao:
      'Toda obra começa por uma escuta. Mergulhamos na intenção do projeto, no público que ele quer alcançar e na atmosfera que ele precisa carregar. É aqui que arquitetura, marca e desejo começam a se alinhar.',
    image: '/projects/wow-rv-001-wine-gourmet.jpg',
    alt: 'RV Wineclub — espaço gourmet',
    position: 'bottom-left',
  },
  {
    numero: '02',
    titulo: 'Direção',
    descricao:
      'A direção criativa traduz o briefing em linguagem visual. Definimos luz, ângulo, materialidade, ritmo, paleta e narrativa. Cada imagem nasce com intenção — antes de qualquer render.',
    image: '/projects/wow-ppt-002-fachada-01.jpg',
    alt: 'Procave 002 — fachada',
    position: 'center',
    overlay: 'bottom',
  },
  {
    numero: '03',
    titulo: 'Produção',
    descricao:
      'Modelagem, iluminação e composição executadas com precisão técnica e olhar autoral. Trabalhamos em diálogo constante com o cliente para que cada entrega evolua com clareza.',
    image: '/projects/cena-06.jpg',
    alt: 'Cena arquitetônica — Wizards Office',
    position: 'bottom-right',
  },
  {
    numero: '04',
    titulo: 'Entrega',
    descricao:
      'Imagens, filmes e narrativas finalizadas, prontos para campanha, stand de vendas, materiais comerciais e lançamento. Acompanhamos o material até onde ele precisa chegar.',
    image: '/projects/wow-rv-003-fachada-diurna.jpg',
    alt: 'RV — fachada diurna',
    position: 'bottom-left',
    overlay: 'bottom',
  },
]
