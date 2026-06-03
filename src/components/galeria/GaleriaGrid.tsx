import { GaleriaRow } from './GaleriaRow'
import { GALERIA_ROWS } from '@/data/galeria'

export function GaleriaGrid() {
  return (
    <>
      {GALERIA_ROWS.map((row, i) => (
        <GaleriaRow key={i} row={row} />
      ))}
    </>
  )
}
