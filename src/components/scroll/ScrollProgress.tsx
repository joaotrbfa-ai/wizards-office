'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Barra fina de progresso de scroll no topo da viewport.
 * Em prefers-reduced-motion fica estática (scaleX 0).
 */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-terracotta"
      style={{ scaleX: reduced ? 0 : scaleX }}
    />
  )
}
