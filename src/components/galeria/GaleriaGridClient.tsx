'use client'

import { GaleriaRow } from './GaleriaRow'
import { LightboxMount } from '@/components/lightbox/LightboxMount'
import { useLightboxOpen } from '@/components/lightbox/useLightbox'
import type { LightboxItem } from '@/components/lightbox/types'
import type { GaleriaRow as GaleriaRowType } from '@/sanity/types'

export function GaleriaGridClient({ rows }: { rows: GaleriaRowType[] }) {
  // Lista plana de todas as imagens (preserva a ordem das rows) → índice global.
  const flatItems: LightboxItem[] = rows.flatMap((row) =>
    row.images.map((img) => ({ image: img.image, caption: img.caption })),
  )

  const open = useLightboxOpen()

  let globalIndex = 0

  return (
    <>
      {rows.map((row, i) => {
        const startIndex = globalIndex
        globalIndex += row.images.length
        return <GaleriaRow key={i} row={row} startIndex={startIndex} onOpen={open} />
      })}

      <LightboxMount items={flatItems} />
    </>
  )
}
