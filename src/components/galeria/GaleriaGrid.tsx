import { GaleriaRow } from './GaleriaRow'
import type { GaleriaRow as GaleriaRowType } from '@/sanity/types'

export function GaleriaGrid({ rows }: { rows: GaleriaRowType[] }) {
  return (
    <>
      {rows.map((row, i) => (
        <GaleriaRow key={i} row={row} />
      ))}
    </>
  )
}
