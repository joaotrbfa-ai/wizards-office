'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * Wrapper SSR-safe do useReducedMotion do framer-motion.
 *
 * O hook do framer já é seguro para SSR (retorna `false` no servidor e na
 * primeira renderização do cliente, atualizando após a hidratação). Aqui apenas
 * normalizamos o retorno para `boolean` — nunca `null` — para simplificar o
 * consumo nos primitivos de scroll.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false
}
