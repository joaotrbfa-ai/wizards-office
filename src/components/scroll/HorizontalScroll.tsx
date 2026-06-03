'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface HorizontalScrollProps {
  /** Cenas horizontais. Cada filho deve ser `shrink-0` (ex.: min-w-screen). */
  children: ReactNode
  /** Altura da parte fixa. */
  pinHeight?: string
  /** Gap entre as cenas (qualquer valor CSS). */
  gap?: string
  className?: string
}

/**
 * Converte scroll vertical em deslocamento horizontal de um trilho fixo.
 * A distância é medida (ResizeObserver) e o translateX vai de 0 a
 * -(larguraDoTrilho - viewport). Em prefers-reduced-motion vira stack vertical.
 */
export function HorizontalScroll({
  children,
  pinHeight = '100vh',
  gap = '0px',
  className,
}: HorizontalScrollProps) {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [viewportH, setViewportH] = useState(0)

  // Em mobile o scroll horizontal vira stack vertical (evita scroll-jacking).
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const stack = reduced || isMobile

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  useEffect(() => {
    if (stack) return
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth)
      setDistance(d)
      setViewportH(window.innerHeight)
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [stack])

  // Fallback: empilha as cenas na vertical (mobile ou prefers-reduced-motion).
  if (stack) {
    return (
      <div className={cn('flex w-full flex-col', className)} style={{ gap }}>
        {children}
      </div>
    )
  }

  // Altura total = distância horizontal + 1 viewport → scroll 1:1.
  const totalHeight = viewportH ? viewportH + distance : undefined

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ height: totalHeight ?? pinHeight }}
    >
      <div className="sticky top-0 overflow-hidden" style={{ height: pinHeight }}>
        <motion.div
          ref={trackRef}
          style={{ x, gap }}
          className="flex h-full w-max flex-nowrap will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
