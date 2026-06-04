'use client'

import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const QUERY_KEY = 'img'

/**
 * Para os tiles do grid: abre o lightbox setando `?img=`.
 * NÃO lê searchParams — assim o grid continua sendo renderizado no servidor
 * (SSR/SSG), sem cair no fallback do Suspense.
 *
 * push() cria entrada no history → back button fecha o lightbox.
 */
export function useLightboxOpen() {
  const router = useRouter()
  const pathname = usePathname()
  return useCallback(
    (index: number) => {
      router.push(`${pathname}?${QUERY_KEY}=${index}`, { scroll: false })
    },
    [router, pathname],
  )
}

/**
 * Para o overlay: lê o índice de `?img=` e expõe close/next/prev + teclado +
 * bloqueio de scroll. Usa useSearchParams, então DEVE ficar dentro de um
 * <Suspense> (só o overlay, que é invisível quando fechado).
 */
export function useLightboxState(total: number) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const raw = searchParams.get(QUERY_KEY)
  const index =
    raw === null ? null : Math.max(0, Math.min(total - 1, parseInt(raw, 10) || 0))
  const isOpen = index !== null

  // replace não polui o history → navegar entre imagens não acumula entradas.
  const replaceIndex = useCallback(
    (newIndex: number) => {
      router.replace(`${pathname}?${QUERY_KEY}=${newIndex}`, { scroll: false })
    },
    [router, pathname],
  )

  // push para uma URL limpa → robusto também quando aberto via link direto.
  const close = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  const next = useCallback(() => {
    if (index !== null) replaceIndex((index + 1) % total)
  }, [index, replaceIndex, total])

  const prev = useCallback(() => {
    if (index !== null) replaceIndex((index - 1 + total) % total)
  }, [index, replaceIndex, total])

  // Bloqueia o scroll do body enquanto aberto.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Teclado: ESC fecha, ← → navegam.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, next, prev])

  return { isOpen, index: index ?? 0, close, next, prev }
}
