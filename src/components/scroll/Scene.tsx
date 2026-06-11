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
  /** id no elemento raiz — usado como âncora de scroll (#id). */
  id?: string
  className?: string
}

/** Mapeia o tom ao scheme de superfície (data-scheme). O fundo vem de bg-surface. */
const toneScheme: Record<SceneTone, 'olive' | 'ink' | 'sand' | undefined> = {
  olive: 'olive',
  ink: 'ink',
  sand: 'sand',
  transparent: undefined,
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
  id,
  className,
}: SceneProps) {
  return (
    <section
      id={id}
      data-scheme={toneScheme[tone]}
      className={cn(
        'relative flex w-full flex-col',
        clip && 'overflow-hidden',
        tone === 'transparent' ? 'bg-transparent' : 'bg-surface',
        minHeightClass[minHeight],
        snap && 'snap-start',
        className,
      )}
    >
      {children}
    </section>
  )
}
