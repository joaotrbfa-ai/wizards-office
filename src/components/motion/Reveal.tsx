'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  variants?: Variants
  delay?: number
  className?: string
}

/**
 * Wrapper de entrada por scroll. Padrão: fade + rise suave.
 * Respeita prefers-reduced-motion via MotionConfig no layout raiz.
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  )
}

/** Container para staggerar várias entradas filhas. */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0.05,
}: {
  children: ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  )
}
