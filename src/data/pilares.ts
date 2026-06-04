export type PilarPosition = 'bottom-left' | 'center' | 'bottom-right'
export type PilarOverlay = 'strong' | 'bottom' | 'soft' | 'none'

export type PilarData = {
  numero: string
  titulo: string
  descricao: string
  image: string
  alt: string
  position?: PilarPosition
  overlay?: PilarOverlay
}

/** Os três pilares da Home. Extraídos de page.tsx para migração ao Sanity. */
export const PILARES_DATA: PilarData[] = [
  {
    numero: '01',
    titulo: 'Direção',
    descricao:
      'Cada projeto exige uma linguagem própria. Nossa direção criativa constrói atmosferas, emoções e percepção de valor através de luz, composição, materialidade e ritmo visual. Não criamos apenas imagens — criamos presença.',
    image: '/projects/wow-rv-001-hall-05.jpg',
    alt: 'Hall interno — projeto RV',
    position: 'bottom-left',
    overlay: 'bottom',
  },
  {
    numero: '02',
    titulo: 'Narrativa',
    descricao:
      'Acreditamos que arquitetura deve ser sentida antes de ser construída. Por isso, transformamos conceitos em narrativas visuais capazes de comunicar identidade, despertar desejo e conectar pessoas ao futuro de um espaço.',
    image: '/projects/wow-rv-003-fachada-diurna.jpg',
    alt: 'Fachada diurna — projeto RV',
    position: 'center',
    overlay: 'soft',
  },
  {
    numero: '03',
    titulo: 'Confiança',
    descricao:
      'Nosso processo é estruturado para oferecer clareza, previsibilidade e segurança em cada etapa. Da direção criativa à entrega final, mantemos um fluxo organizado, comunicação precisa e compromisso absoluto com qualidade e prazo.',
    image: '/projects/cena-06.jpg',
    alt: 'Cena arquitetônica — Wizards Office',
    position: 'bottom-right',
    overlay: 'bottom',
  },
]
