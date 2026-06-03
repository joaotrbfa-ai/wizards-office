import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'outline' | 'solid' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-none font-sans uppercase tracking-widest transition-[background-color,color,border-color,transform] duration-500 ease-soft will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cream disabled:cursor-not-allowed disabled:opacity-50'

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.7rem]',
  lg: 'px-8 py-4 text-[0.75rem]',
}

const variants: Record<Variant, string> = {
  outline: 'border border-cream/70 text-cream hover:border-cream hover:bg-cream hover:text-olive',
  solid: 'bg-cream text-olive hover:bg-terracotta hover:text-cream',
  ghost: 'text-cream hover:text-terracotta',
}

type SharedProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: undefined }

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps | 'href'> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  variant = 'outline',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className)

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    )
  }

  const { href: _ignored, ...buttonRest } = rest
  void _ignored
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
