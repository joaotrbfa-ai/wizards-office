import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main'
}

export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-wrap px-5 sm:px-8 lg:px-12 xl:px-16', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
