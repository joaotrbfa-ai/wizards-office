'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { EASE_SOFT } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export interface ServicoItemProps {
  numero: string
  titulo: string
  descricao: string
  /** Controlado pelo pai (abertura exclusiva). */
  open: boolean
  onToggle: () => void
}

/**
 * Item de serviço como accordion controlado: o cabeçalho (número + título)
 * alterna a descrição, que expande com animação de altura. Acessível via
 * aria-expanded / aria-controls.
 */
export function ServicoItem({ numero, titulo, descricao, open, onToggle }: ServicoItemProps) {
  const reduced = useReducedMotion()
  const panelId = `servico-panel-${numero}`

  return (
    <div className="border-b border-label/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center gap-4 py-5 text-left md:py-6"
      >
        <span className="text-sm uppercase tracking-widest text-label transition-colors duration-300 group-hover:text-accent">
          {numero}.
        </span>
        <span className="flex-1 font-sans text-[clamp(1.15rem,1.9vw,1.75rem)] font-medium uppercase tracking-wide text-heading transition-colors duration-300 group-hover:text-accent">
          {titulo}
        </span>
        {/* Ícone "+" que gira para "×" quando aberto. */}
        <span
          aria-hidden
          className={cn(
            'relative h-3 w-3 shrink-0 text-label transition-[transform,color] duration-300 group-hover:text-accent',
            open && 'rotate-45',
          )}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_SOFT }}
            className="overflow-hidden"
          >
            <p className="max-w-prose pb-6 text-sm leading-relaxed text-label md:text-base">
              {descricao}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
