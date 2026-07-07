'use client'

import { motion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { viewportOnce, EASE_SOFT } from '@/lib/motion'

/**
 * Revela um título deslizando de baixo por trás de uma máscara (overflow-hidden).
 * Usado nos títulos grandes das seções — entra uma vez ao aparecer no scroll.
 * O conteúdo deve caber em poucas linhas (uppercase, sem descendentes fortes).
 *
 * `MotionConfig reducedMotion="never"` local: a máscara depende de `transform`,
 * que o `reducedMotion="user"` global suprimiria — deixando o texto travado
 * embaixo da máscara (invisível). Aqui optamos por sempre revelar, coerente com
 * o contador dos números (que também roda independente do reduced-motion).
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
  return (
    <MotionConfig reducedMotion="never">
      <span className={cn('block overflow-hidden pb-[0.12em]', className)}>
        <motion.span
          className="block"
          initial={{ y: '115%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE_SOFT, delay }}
        >
          {children}
        </motion.span>
      </span>
    </MotionConfig>
  )
}
