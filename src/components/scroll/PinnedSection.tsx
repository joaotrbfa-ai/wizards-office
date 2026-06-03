'use client'

import { useScroll, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface PinnedRenderArgs {
  /** Progresso do scroll dentro da seção (0 → 1). */
  progress: MotionValue<number>
  /** True quando o usuário pediu movimento reduzido — renderize estático. */
  reducedMotion: boolean
}

export interface PinnedSectionProps {
  /** Render prop: recebe { progress, reducedMotion }. */
  children: (args: PinnedRenderArgs) => ReactNode
  /** Altura total do espaço de scroll que será "scrubbed". */
  height?: string
  /** Altura da parte fixa (pinned). */
  pinHeight?: string
  className?: string
}

/**
 * Cria uma área alta de scroll com um miolo fixo (sticky) cujo conteúdo é
 * dirigido pelo progresso do scroll. Em prefers-reduced-motion, vira um bloco
 * estático de altura `pinHeight` e sinaliza `reducedMotion: true`.
 */
export function PinnedSection({
  children,
  height = '300vh',
  pinHeight = '100vh',
  className,
}: PinnedSectionProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  if (reduced) {
    return (
      <div className={cn('relative w-full', className)} style={{ minHeight: pinHeight }}>
        <div className="flex w-full flex-col items-center justify-center" style={{ minHeight: pinHeight }}>
          {children({ progress: scrollYProgress, reducedMotion: true })}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)} style={{ height }}>
      <div
        className="sticky top-0 flex w-full items-center justify-center overflow-hidden"
        style={{ height: pinHeight }}
      >
        {children({ progress: scrollYProgress, reducedMotion: false })}
      </div>
    </div>
  )
}
