import type { UseFormRegisterReturn } from 'react-hook-form'

export interface RadioGroupProps {
  legend: string
  name: string
  options: readonly string[]
  registration: UseFormRegisterReturn
  error?: string
  required?: boolean
}

export function RadioGroup({
  legend,
  name,
  options,
  registration,
  error,
  required,
}: RadioGroupProps) {
  const errorId = `${name}-error`
  return (
    <fieldset
      className="min-w-0 border-0 p-0"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="text-sm uppercase tracking-[0.15em] text-sand">
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
            <input type="radio" value={opt} className="peer sr-only" {...registration} />
            <span
              aria-hidden
              className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-sand/50 transition-colors peer-checked:border-terracotta peer-checked:[&_span]:opacity-100 peer-focus-visible:ring-1 peer-focus-visible:ring-cream peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-olive"
            >
              <span className="h-2 w-2 rounded-full bg-terracotta opacity-0 transition-opacity" />
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
