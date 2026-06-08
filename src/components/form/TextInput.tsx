import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function TextInput({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'min-h-[44px] w-full border border-sand/30 bg-transparent px-4 py-3 text-cream placeholder:text-muted/40',
          'transition-colors focus-visible:border-terracotta focus-visible:outline-none',
          'focus-visible:ring-1 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-olive',
          'aria-[invalid=true]:border-terracotta',
          className,
        )}
        {...props}
      />
    )
  },
)
