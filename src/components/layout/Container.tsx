import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

/** Largura máxima do conteúdo. `wrap` = padrão (1440px); `wide` = mais largo, */
/** para seções que devem se aproximar do full-bleed; `full` = sem limite.     */
type ContainerWidth = 'wrap' | 'wide' | 'full'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main'
  width?: ContainerWidth
}

const widthClass: Record<ContainerWidth, string> = {
  wrap: 'max-w-wrap',
  wide: 'max-w-[1760px]',
  full: 'max-w-none',
}

export function Container({
  as: Tag = 'div',
  width = 'wrap',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16', widthClass[width], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
