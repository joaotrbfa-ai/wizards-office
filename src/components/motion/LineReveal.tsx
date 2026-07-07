'use client'

import { motion, MotionConfig, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { EASE_SOFT } from '@/lib/motion'

/**
 * Traço fino (hairline) que "cresce" da esquerda para a direita ao entrar na
 * viewport. `duration` casa com a contagem dos números (2s) para o traço e o
 * número avançarem juntos.
 *
 * O `useInView` observa um wrapper ESTÁVEL — a linha em si tem `scaleX:0`
 * (largura zero), que o IntersectionObserver não detectaria como visível.
 * `MotionConfig reducedMotion="never"` garante o transform sob reduced-motion.
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
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <MotionConfig reducedMotion="never">
      <span ref={ref} className={cn('block', className)}>
        <motion.span
          aria-hidden
          className="block h-px origin-left bg-label/25"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration, ease: EASE_SOFT, delay }}
        />
      </span>
    </MotionConfig>
  )
}
