'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface MemberPortraitProps {
  /** Nome completo (alt + sr-only). */
  name: string
  /** Inicial exibida no placeholder. */
  initial: string
  /** Caminho da foto em /public. Cai no placeholder se ausente/erro. */
  src?: string
  className?: string
}

/**
 * Retrato de membro para a cena horizontal da Equipe.
 * Placeholder com inicial gigante; troca por <Image> quando a foto existir.
 * Em desktop preenche a altura da coluna; em mobile usa aspect 3/4.
 */
export function MemberPortrait({ name, initial, src, className }: MemberPortraitProps) {
  const [erro, setErro] = useState(false)
  const mostrarImagem = Boolean(src) && !erro

  return (
    <div
      className={cn(
        'relative aspect-[3/4] overflow-hidden border border-sand/15 bg-olive/40 md:aspect-auto md:h-full',
        className,
      )}
    >
      {mostrarImagem ? (
        <Image
          src={src as string}
          alt={`Foto de ${name}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          onError={() => setErro(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            aria-hidden
            className="font-sans text-[clamp(8rem,20vw,20rem)] font-light leading-none tracking-wide text-sand"
          >
            {initial}
          </span>
          <span className="sr-only">{name}</span>
        </div>
      )}
    </div>
  )
}
