export type GaleriaAspect = '4/5' | '3/4' | '4/3' | '16/9' | '1/1'

export type GaleriaImage = { src: string; alt: string; aspect?: GaleriaAspect }

export type GaleriaRow =
  | { layout: 'full'; images: [GaleriaImage] }
  | { layout: 'split'; images: [GaleriaImage, GaleriaImage] }
  | { layout: 'asymmetric-left'; images: [GaleriaImage, GaleriaImage, GaleriaImage] }
  | { layout: 'asymmetric-right'; images: [GaleriaImage, GaleriaImage, GaleriaImage] }
  | { layout: 'trio'; images: [GaleriaImage, GaleriaImage, GaleriaImage] }

/** Curadoria inicial — reaproveita assets existentes. Estender ao receber o material real. */
export const GALERIA_ROWS: GaleriaRow[] = [
  {
    layout: 'full',
    images: [{ src: '/projects/cena-06.jpg', alt: 'Visualização arquitetônica — cena editorial' }],
  },
  {
    layout: 'split',
    images: [
      { src: '/projects/wow-rv-001-hall-05.jpg', alt: 'Hall residencial — RV', aspect: '4/5' },
      { src: '/projects/wow-art-001-suite-garden.jpg', alt: 'Suíte com jardim', aspect: '4/5' },
    ],
  },
  {
    layout: 'asymmetric-left',
    images: [
      { src: '/projects/wow-rv-001-fachada-angulada.jpg', alt: 'Fachada angulada — RV', aspect: '4/5' },
      { src: '/projects/wow-rv-001-hall-03.jpg', alt: 'Hall — RV', aspect: '4/3' },
      { src: '/projects/wow-ppt-002-wineclub.jpg', alt: 'Wine club — PPT 002', aspect: '4/3' },
    ],
  },
  {
    layout: 'full',
    images: [{ src: '/projects/wow-rv-003-fachada-diurna.jpg', alt: 'Fachada diurna — RV 003' }],
  },
  {
    layout: 'asymmetric-right',
    images: [
      { src: '/projects/wow-ppt-002-fachada-01.jpg', alt: 'Fachada — PPT 002', aspect: '4/3' },
      { src: '/projects/blessed-fachada-03.jpg', alt: 'Fachada — Blessed', aspect: '4/3' },
      { src: '/projects/wow-rv-001-wine-gourmet.jpg', alt: 'Wine gourmet — RV', aspect: '4/5' },
    ],
  },
  {
    layout: 'trio',
    images: [
      { src: '/projects/wow-rv-001-hall-03.jpg', alt: 'Hall — RV', aspect: '3/4' },
      { src: '/projects/wow-rv-003-fachada-diurna.jpg', alt: 'Fachada diurna — RV 003', aspect: '3/4' },
      { src: '/projects/wow-ppt-002-fachada-01.jpg', alt: 'Fachada — PPT 002', aspect: '3/4' },
    ],
  },
]
