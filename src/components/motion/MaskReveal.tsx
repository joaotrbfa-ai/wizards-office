'use client'

import { motion, MotionConfig, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { EASE_SOFT } from '@/lib/motion'

/**
 * Revela um título deslizando de baixo por trás de uma máscara (overflow-hidden).
 * Usado nos títulos grandes das seções — entra uma vez ao aparecer no scroll.
 * O conteúdo deve caber em poucas linhas (uppercase, sem descendentes fortes).
 *
 * O `useInView` observa o elemento ESTÁVEL (a máscara), não o interno que
 * desliza — observar um elemento transladado para fora confunde o
 * IntersectionObserver e o gatilho não dispara (mesmo padrão do NumeroContador).
 * `MotionConfig reducedMotion="never"` garante que o transform anime mesmo sob
 * prefers-reduced-motion, coerente com o contador.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <MotionConfig reducedMotion="never">
      <span ref={ref} className={cn('block overflow-hidden pb-[0.12em]', className)}>
        <motion.span
          className="block"
          initial={{ y: '115%', opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: '115%', opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE_SOFT, delay }}
        >
          {children}
        </motion.span>
      </span>
    </MotionConfig>
  )
}
