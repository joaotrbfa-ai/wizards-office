'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export interface ScrollCueProps {
  label?: string
  className?: string
}

/** Indicador de scroll: linha animada + label. Assinatura do Hero. */
export function ScrollCue({ label = 'Scroll', className }: ScrollCueProps) {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden className={cn('flex flex-col items-center gap-3', className)}>
      <span className="text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
      <span className="relative block h-8 w-px overflow-hidden bg-sand/30">
        <motion.span
          className="absolute left-0 top-0 block h-3 w-px bg-sand"
          animate={reduced ? undefined : { y: [-12, 32] }}
          transition={
            reduced ? undefined : { duration: 1.8, ease: 'easeInOut', repeat: Infinity }
          }
        />
      </span>
    </div>
  )
}
