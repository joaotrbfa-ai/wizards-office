'use client'

import { Suspense } from 'react'
import { Lightbox } from './Lightbox'
import { useLightboxState } from './useLightbox'
import type { LightboxItem } from './types'

function Overlay({ items }: { items: LightboxItem[] }) {
  const { isOpen, index, close, next, prev } = useLightboxState(items.length)
  return (
    <Lightbox items={items} isOpen={isOpen} index={index} close={close} next={next} prev={prev} />
  )
}

/**
 * Monta o overlay do lightbox. O <Suspense> isola o useSearchParams do overlay
 * (invisível quando fechado) — o grid ao redor continua renderizando no servidor.
 */
export function LightboxMount({ items }: { items: LightboxItem[] }) {
  return (
    <Suspense>
      <Overlay items={items} />
    </Suspense>
  )
}
