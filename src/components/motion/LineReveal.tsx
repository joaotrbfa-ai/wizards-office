'use client'

import { motion, MotionConfig } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_SOFT } from '@/lib/motion'

/**
 * Traço fino (hairline) que "cresce" da esquerda para a direita ao entrar na
 * viewport. `duration` casa com a contagem dos números (2s) para o traço e o
 * número avançarem juntos.
 *
 * `MotionConfig reducedMotion="never"` local: o `scaleX` é transform, que o
 * `reducedMotion="user"` global suprimiria — deixando a linha em scaleX:0
 * (invisível). Revelamos sempre, coerente com o contador dos números.
 */
export function LineReveal({
  className,
  duration = 2,
  delay = 0,
}: {
  className?: string
  duration?: number
  delay?: number
}) {
  return (
    <MotionConfig reducedMotion="never">
      <motion.span
        aria-hidden
        className={cn('block h-px origin-left bg-label/25', className)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: EASE_SOFT, delay }}
      />
    </MotionConfig>
  )
}
