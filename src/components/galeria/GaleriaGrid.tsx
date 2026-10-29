import { GaleriaGridClient } from './GaleriaGridClient'
import type { GaleriaFeedItem, GaleriaRow as GaleriaRowType } from '@/sanity/types'

/**
 * Usa o feed (`imagens`); enquanto ele estiver vazio, cai nas linhas antigas
 * (`rows`) achatadas — o site continua com conteúdo antes da carga das imagens.
 */
export function GaleriaGrid({
  imagens,
  rows,
}: {
  imagens?: GaleriaFeedItem[]
  rows?: GaleriaRowType[]
}) {
  const feed = imagens?.length ? imagens : (rows ?? []).flatMap((row) => row.images)
  return <GaleriaGridClient imagens={feed} />
}
