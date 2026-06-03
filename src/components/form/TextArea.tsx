import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea({ className, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full resize-y border border-sand/30 bg-transparent px-4 py-3 text-cream placeholder:text-sand/40',
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
