/** Listas de opções compartilhadas entre schemas (pilar, serviço, etapa). */

export const POSITION_OPTIONS = [
  { title: 'Inferior esquerda', value: 'bottom-left' },
  { title: 'Centro', value: 'center' },
  { title: 'Inferior direita', value: 'bottom-right' },
] as const

export const OVERLAY_OPTIONS = [
  { title: 'Forte', value: 'strong' },
  { title: 'Inferior', value: 'bottom' },
  { title: 'Suave', value: 'soft' },
  { title: 'Nenhum', value: 'none' },
] as const
