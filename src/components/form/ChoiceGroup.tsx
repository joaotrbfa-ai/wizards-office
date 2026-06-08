import type { UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'

export interface ChoiceGroupProps {
  /** Radio (escolha única) ou checkbox (múltipla). */
  type: 'radio' | 'checkbox'
  legend: string
  name: string
  options: readonly string[]
  registration: UseFormRegisterReturn
  error?: string
  required?: boolean
}

/**
 * Grupo de escolha do brief — radio ou checkbox. Mesma estrutura de
 * fieldset/legend/grid/erro; só o tipo do input e o indicador visual mudam.
 */
export function ChoiceGroup({
  type,
  legend,
  name,
  options,
  registration,
  error,
  required,
}: ChoiceGroupProps) {
  const errorId = `${name}-error`
  const isRadio = type === 'radio'

  return (
    <fieldset
      className="min-w-0 border-0 p-0"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="text-sm uppercase tracking-[0.15em] text-muted">
        {legend}
        {required && (
          <span aria-hidden className="text-terracotta">
            {' '}
            *
          </span>
        )}
      </legend>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex min-h-[44px] cursor-pointer items-center gap-3 py-1 text-sm text-cream"
          >
            <input type={type} value={opt} className="peer sr-only" {...registration} />
            <span
              aria-hidden
              className={cn(
                'relative flex h-4 w-4 shrink-0 items-center justify-center border border-sand/50 transition-colors peer-checked:border-terracotta peer-focus-visible:ring-1 peer-focus-visible:ring-cream peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-olive',
                isRadio
                  ? 'rounded-full peer-checked:[&_span]:opacity-100'
                  : 'peer-checked:bg-terracotta peer-checked:[&_svg]:opacity-100',
              )}
            >
              {isRadio ? (
                <span className="h-2 w-2 rounded-full bg-terracotta opacity-0 transition-opacity" />
              ) : (
                <svg className="h-3 w-3 opacity-0 transition-opacity" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-6"
                    stroke="hsl(var(--color-cream))"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              )}
            </span>
            <span className="tracking-wide">{opt}</span>
          </label>
        ))}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-terracotta">
          {error}
        </p>
      )}
    </fieldset>
  )
}
