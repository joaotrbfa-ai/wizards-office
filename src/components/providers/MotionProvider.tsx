'use client'

import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { EASE_SOFT } from '@/lib/motion'

/**
 * Contexto que expõe a instância do Lenis para componentes que precisem
 * fazer scroll programático (ex.: scrollTo em âncoras/menus).
 * `null` quando o smooth scroll está desligado (SSR ou prefers-reduced-motion).
 */
const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

/**
 * Aplica defaults globais de animação, respeita prefers-reduced-motion do SO
 * e inicializa o smooth scroll (Lenis) no client.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  // Observa a preferência de movimento reduzido (reativo a mudanças do SO).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Inicializa o Lenis — exceto quando o usuário pede movimento reduzido.
  useEffect(() => {
    if (reduced) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setLenis(instance)

    let rafId = requestAnimationFrame(function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user" transition={{ ease: EASE_SOFT, duration: 0.8 }}>
        {children}
      </MotionConfig>
    </LenisContext.Provider>
  )
}
