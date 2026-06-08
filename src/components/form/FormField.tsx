import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label: string
  /** id do input controlado — o erro recebe id `${htmlFor}-error`. */
  htmlFor: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
  children: ReactNode
}

/**
 * Layout de um campo único (label + input + erro).
 * O input deve apontar aria-describedby para `${htmlFor}-error` quando houver erro.
 */
export function FormField({
  label,
  htmlFor,
  error,
  required,
  hint,
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm uppercase tracking-[0.15em] text-muted">
        {label}
        {required && (
          <span aria-hidden className="text-terracotta">
            {' '}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-muted/70">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-terracotta">
          {error}
        </p>
      )}
    </div>
  )
}
