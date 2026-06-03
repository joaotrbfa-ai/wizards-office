import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'
import { Container } from './Container'

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Tom de fundo da seção. */
  tone?: 'olive' | 'ink' | 'transparent'
  /** Espaçamento vertical. */
  spacing?: 'lg' | 'sm' | 'none'
  /** Se true, renderiza filhos direto (sem Container interno). */
  bare?: boolean
}

const toneClass = {
  olive: 'bg-olive',
  ink: 'bg-ink',
  transparent: 'bg-transparent',
}

const spacingClass = {
  lg: 'py-section',
  sm: 'py-section-sm',
  none: '',
}

export function Section({
  tone = 'transparent',
  spacing = 'lg',
  bare = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(toneClass[tone], spacingClass[spacing], className)} {...rest}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  )
}
