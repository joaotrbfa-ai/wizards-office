import { GaleriaGridClient } from './GaleriaGridClient'
import type { GaleriaRow as GaleriaRowType } from '@/sanity/types'

export function GaleriaGrid({ rows }: { rows: GaleriaRowType[] }) {
  return <GaleriaGridClient rows={rows} />
}
