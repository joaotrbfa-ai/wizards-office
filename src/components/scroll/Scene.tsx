import { cn } from '@/lib/utils'
import { rolesToStyle, type RoleOverrides } from '@/lib/themes'
import type { CSSProperties, ReactNode } from 'react'

export type SceneTone = 'olive' | 'ink' | 'transparent' | 'sand'
export type SceneMinHeight = 'screen' | 'tall' | 'auto'

export interface SceneProps {
  children: ReactNode
  /** Fundo da cena. Reaproveita os tokens do DS. */
  tone?: SceneTone
  /** Override de cores desta seção (CSS vars --role-*). Herda da página onde vazio. */
  roles?: RoleOverrides | null
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

/**
 * Cada tom define o fundo via `--role-surface`. Aplicado INLINE (não por regra
 * CSS global) para que:
 *  - tons claros (olive/ink) NÃO resetem os papéis de texto → eles HERDAM de
 *    overrides de ancestral (página/global);
 *  - o tom `sand` inverta o texto para escuro (contraste sobre fundo claro);
 *  - um override de seção (`roles`) sobrescreva o tom (vem depois no spread).
 */
const toneVars: Record<SceneTone, Record<string, string>> = {
  olive: { '--role-surface': 'var(--color-olive)' },
  ink: { '--role-surface': 'var(--color-ink)' },
  sand: {
    '--role-surface': 'var(--color-sand)',
    '--role-heading': 'var(--color-ink)',
    '--role-body': 'var(--color-ink)',
    '--role-label': 'var(--color-ink)',
  },
  transparent: {},
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
  roles,
  snap = false,
  minHeight = 'screen',
  clip = true,
  id,
  className,
}: SceneProps) {
  const style = { ...toneVars[tone], ...rolesToStyle(roles) } as CSSProperties

  return (
    <section
      id={id}
      style={style}
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
