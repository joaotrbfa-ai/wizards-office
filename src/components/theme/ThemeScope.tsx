import type { CSSProperties, ReactNode } from 'react'
import { rolesToStyle, type RoleOverrides } from '@/lib/themes'

/**
 * Escopo de tema: aplica overrides de papel (CSS vars --role-*) a uma subárvore.
 * As variáveis herdam pela árvore do DOM, então qualquer `text-heading`,
 * `text-body`, `text-label`, `text-accent` ou `bg-surface` abaixo passa a usar
 * a cor sobrescrita. Papéis não preenchidos herdam do nível acima (página herda
 * do tema global; seção herda da página).
 *
 * Sem overrides → não cria div extra (Fragment), evitando qualquer impacto de layout.
 */
export function ThemeScope({
  roles,
  children,
  className,
}: {
  roles?: RoleOverrides | null
  children: ReactNode
  className?: string
}) {
  const style = rolesToStyle(roles)
  if (Object.keys(style).length === 0) return <>{children}</>
  return (
    <div style={style as CSSProperties} className={className}>
      {children}
    </div>
  )
}
