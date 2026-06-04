import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type SceneTone = 'olive' | 'ink' | 'transparent' | 'sand'
export type SceneMinHeight = 'screen' | 'tall' | 'auto'

export interface SceneProps {
  children: ReactNode
  /** Fundo da cena. Reaproveita os tokens do DS. */
  tone?: SceneTone
  /** Quando true, alinha a cena ao scroll-snap (exige ancestral .scene-snap). */
  snap?: boolean
  /** Altura mínima. `screen` = 100svh (fallback 100vh); `tall` = 120vh. */
  minHeight?: SceneMinHeight
  /**
   * Aplica `overflow-hidden` (default true) para conter mídia full-bleed.
   * Passe `false` quando a cena contiver `PinnedSection`/`HorizontalScroll`:
   * `overflow-hidden` em um ancestral quebra o `position: sticky` desses
   * primitivos.
   */
  clip?: boolean
  className?: string
}

const toneClass: Record<SceneTone, string> = {
  olive: 'bg-background',
  ink: 'bg-background-alt',
  transparent: 'bg-transparent',
  sand: 'bg-sand',
}

const minHeightClass: Record<SceneMinHeight, string> = {
  screen: 'min-h-screen supports-[min-height:100svh]:min-h-svh',
  tall: 'min-h-[120vh]',
  auto: '',
}

/**
 * Bloco full-bleed de uma narrativa scroll-driven.
 * `relative overflow-hidden` para conter mídia que sangra até a borda.
 */
export function Scene({
  children,
  tone = 'olive',
  snap = false,
  minHeight = 'screen',
  clip = true,
  className,
}: SceneProps) {
  return (
    <section
      className={cn(
        'relative flex w-full flex-col',
        clip && 'overflow-hidden',
        toneClass[tone],
        minHeightClass[minHeight],
        snap && 'snap-start',
        className,
      )}
    >
      {children}
    </section>
  )
}
