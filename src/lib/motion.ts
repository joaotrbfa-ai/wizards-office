import type { Transition, Variants } from 'framer-motion'

/**
 * Easing suave, "de luxo" — desaceleração elegante.
 * Usado em todas as entradas. Nunca alterar sem motivo forte.
 */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const

const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_SOFT,
}

/** Fade + sutil rise. Padrão de entrada da casa. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
}

/** Fade puro, sem deslocamento. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
}

/** Container para staggerar filhos. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Variant para palavras em sequência (split). */
export const wordIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SOFT },
  },
}

/** Overlay de menu — slide vertical suave. */
export const menuOverlay: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SOFT },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: EASE_SOFT },
  },
}

/** Padrão de viewport para whileInView. */
export const viewportOnce = { once: true, amount: 0.25 } as const
