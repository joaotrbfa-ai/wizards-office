export type ParceiroData = {
  nome: string
  /** Logo em /public/partners/. */
  src: string
}

/** Parceiros exibidos na Home. Extraídos de ParceirosCena.tsx para migração ao Sanity. */
export const PARCEIROS_DATA: ParceiroData[] = [
  { src: '/partners/rv.png', nome: 'RV' },
  { src: '/partners/racitec.png', nome: 'racitec' },
  { src: '/partners/brasa.png', nome: 'brasa' },
  { src: '/partners/untitled.png', nome: 'Untitled-1' },
  { src: '/partners/procave.png', nome: 'PROCAVE' },
  { src: '/partners/prosperita.png', nome: 'PROSPERITA' },
  { src: '/partners/fhobus.png', nome: 'f-hobus' },
]
