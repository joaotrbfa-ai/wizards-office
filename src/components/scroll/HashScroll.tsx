'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@/components/providers/MotionProvider'

/**
 * Faz o scroll até a âncora (#id) quando a URL tem hash.
 *
 * Necessário porque o Lenis assume o controle do scroll e ignora o salto
 * nativo do browser — inclusive em navegações entre páginas
 * (ex.: Home → /servicos#servico-02) e em cliques de hash na mesma página.
 *
 * Após uma navegação client-side o Lenis fica com dimensões/posição
 * dessincronizadas, então recalculamos (`resize`) e medimos a posição
 * absoluta do alvo antes de rolar.
 */
export function HashScroll() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (!window.location.hash) return
    const id = decodeURIComponent(window.location.hash.slice(1))

    let cancelled = false
    let raf1 = 0
    let raf2 = 0

    const go = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (!el) return

      // Posição absoluta do alvo no documento — determinística, sem depender
      // do estado interno do Lenis (que fica dessincronizado pós-navegação).
      const y = el.getBoundingClientRect().top + window.scrollY

      if (lenis) {
        lenis.resize()
        lenis.scrollTo(y, { force: true, duration: 1.1 })
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }

    // Espera a nova rota pintar (timeout + 2 frames) para o layout assentar
    // e o Lenis sincronizar a posição após o reset de scroll da navegação.
    const t = window.setTimeout(() => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(go)
      })
    }, 250)

    window.addEventListener('hashchange', go)
    return () => {
      cancelled = true
      window.clearTimeout(t)
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.removeEventListener('hashchange', go)
    }
  }, [pathname, lenis])

  return null
}
