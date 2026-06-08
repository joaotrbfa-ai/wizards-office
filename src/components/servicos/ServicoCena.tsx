import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia, type MediaOverlay } from '@/components/scroll/FullBleedMedia'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import type { Position } from '@/sanity/types'

export interface ServicoCenaProps {
  numero: string
  titulo: string
  subitems?: string[]
  descricao: string
  image: string
  alt: string
  /** Placeholder LQIP (base64) da imagem do Sanity. */
  blurDataURL?: string
  position?: Position
  featured?: boolean
  overlay?: MediaOverlay
}

/**
 * Posições assimétricas só a partir de `md`. No mobile tudo vira bottom-left
 * para leitura confortável.
 */
const vJustify: Record<Position, string> = {
  'bottom-left': 'justify-end',
  center: 'justify-end md:justify-center',
  'bottom-right': 'justify-end',
}

const hAlign: Record<Position, string> = {
  'bottom-left': 'items-start text-left',
  center: 'items-start text-left md:items-center md:text-center',
  'bottom-right': 'items-start text-left md:items-end md:text-right',
}

export function ServicoCena({
  numero,
  titulo,
  subitems = [],
  descricao,
  image,
  alt,
  blurDataURL,
  position = 'bottom-left',
  featured = false,
  overlay = 'strong',
}: ServicoCenaProps) {
  const label = featured
    ? `${numero} — ${subitems[0] ?? 'Serviço'}`
    : `${numero} — Serviço`

  return (
    <Scene minHeight="screen">
      <FullBleedMedia src={image} alt={alt} blurDataURL={blurDataURL} overlay={overlay} parallax>
        <div
          className={cn(
            'flex h-full w-full flex-col p-8 pb-20 md:p-16 md:pb-32',
            vJustify[position],
          )}
        >
          <Reveal
            className={cn(
              'flex flex-col',
              featured ? 'max-w-4xl' : 'max-w-3xl',
              hAlign[position],
            )}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-muted">{label}</p>

            <h2
              className={cn(
                'mt-4 font-sans font-bold uppercase leading-[0.9] tracking-wide text-cream',
                featured
                  ? 'text-[clamp(2.5rem,5.5vw,6rem)]'
                  : 'text-[clamp(1.85rem,4vw,4.75rem)]',
              )}
            >
              {titulo}
            </h2>

            {!featured && subitems.length > 0 && (
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted">
                {subitems.join(' · ')}
              </p>
            )}

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream md:text-lg">
              {descricao}
            </p>
          </Reveal>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
