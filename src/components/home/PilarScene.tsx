import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia, type MediaOverlay } from '@/components/scroll/FullBleedMedia'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import type { RoleOverrides } from '@/lib/themes'

export type PilarPosition = 'bottom-left' | 'center' | 'bottom-right'

export interface PilarSceneProps {
  titulo: string
  descricao: string
  image: string
  alt: string
  /** Placeholder LQIP (base64) da imagem do Sanity. */
  blurDataURL?: string
  position?: PilarPosition
  overlay?: MediaOverlay
  roles?: RoleOverrides | null
}

/** Justificação vertical (eixo do flex-col) por posição. */
const vJustify: Record<PilarPosition, string> = {
  'bottom-left': 'justify-end',
  center: 'justify-center',
  'bottom-right': 'justify-end',
}

/** Alinhamento horizontal + de texto por posição. */
const hAlign: Record<PilarPosition, string> = {
  'bottom-left': 'items-start text-left',
  center: 'items-center text-center',
  'bottom-right': 'items-end text-right',
}

export function PilarScene({
  titulo,
  descricao,
  image,
  alt,
  blurDataURL,
  position = 'bottom-left',
  overlay = 'strong',
  roles,
}: PilarSceneProps) {
  return (
    <Scene minHeight="screen" roles={roles}>
      <FullBleedMedia src={image} alt={alt} blurDataURL={blurDataURL} overlay={overlay} parallax>
        <div
          className={cn(
            'group flex h-full w-full flex-col p-8 pb-20 md:p-16 md:pb-32',
            vJustify[position],
          )}
        >
          <Reveal className={cn('flex flex-col gap-5', hAlign[position])}>
            <h2 className="font-sans text-[clamp(1.95rem,4.4vw,4.1rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
              {titulo}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-body md:text-lg">
              {descricao}
            </p>
          </Reveal>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
