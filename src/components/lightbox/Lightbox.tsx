'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { EASE_SOFT } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LightboxImage } from './LightboxImage'
import type { LightboxItem } from './types'

interface LightboxProps {
  items: LightboxItem[]
  isOpen: boolean
  index: number
  close: () => void
  next: () => void
  prev: () => void
}

/** Dica de swipe que some sozinha após 3s (só mobile). */
function SwipeHint() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-x-0 bottom-24 mx-auto text-center text-xs uppercase tracking-[0.2em] text-sand md:hidden"
        >
          Arraste para navegar
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export function Lightbox({ items, isOpen, index, close, next, prev }: LightboxProps) {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  useEffect(() => setMounted(true), [])

  // Move o foco pro botão fechar ao abrir; restaura ao fechar.
  useEffect(() => {
    if (isOpen) {
      prevFocus.current = document.activeElement as HTMLElement
      const id = requestAnimationFrame(() => closeRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
    prevFocus.current?.focus?.()
  }, [isOpen])

  if (!mounted) return null

  const total = items.length
  const item = items[index]
  const canSwipe = !reduced && total > 1

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -100 || info.velocity.x < -500) next()
    else if (info.offset.x > 100 || info.velocity.x > 500) prev()
  }

  // Focus trap simples: Tab cicla entre os botões do diálogo.
  const onKeyDownTrap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const focusables = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled])'),
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement
    if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Visualizar imagem"
          onKeyDown={onKeyDownTrap}
          onClick={close}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE_SOFT }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
        >
          {/* Contador */}
          <div
            aria-live="polite"
            className="pointer-events-none absolute left-6 top-6 z-10 text-xs uppercase tracking-[0.25em] text-sand"
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          {/* Fechar */}
          <button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Fechar"
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center text-cream transition-colors hover:text-terracotta"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Anterior */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Imagem anterior"
              className="absolute left-6 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream md:flex"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Próxima */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Próxima imagem"
              className="absolute right-6 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream md:flex"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Imagem (swipe) */}
          <motion.div
            key={index}
            onClick={(e) => e.stopPropagation()}
            drag={canSwipe ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={canSwipe ? onDragEnd : undefined}
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_SOFT }}
            className="relative flex items-center justify-center"
          >
            <LightboxImage item={item} />
          </motion.div>

          {/* Caption */}
          {item.caption && (
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.2 }}
              className="pointer-events-none absolute inset-x-8 bottom-8 mx-auto max-w-2xl text-balance text-center text-xs uppercase tracking-[0.2em] text-sand"
            >
              {item.caption}
            </motion.p>
          )}

          {canSwipe && <SwipeHint />}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
