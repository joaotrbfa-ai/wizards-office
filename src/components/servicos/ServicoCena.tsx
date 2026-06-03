import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import type { ServicoData, ServicoPosition } from '@/data/servicos'

/**
 * Posições assimétricas só a partir de `md`. No mobile tudo vira bottom-left
 * para leitura confortável.
 */
const vJustify: Record<ServicoPosition, string> = {
  'bottom-left': 'justify-end',
  center: 'justify-end md:justify-center',
  'bottom-right': 'justify-end',
}

const hAlign: Record<ServicoPosition, string> = {
  'bottom-left': 'items-start text-left',
  center: 'items-start text-left md:items-center md:text-center',
  'bottom-right': 'items-start text-left md:items-end md:text-right',
}

export function ServicoCena({
  numero,
  titulo,
  subitems,
  descricao,
  image,
  alt,
  position = 'bottom-left',
  featured = false,
  overlay = 'strong',
}: ServicoData) {
  const label = featured
    ? `${numero} — ${subitems[0] ?? 'Serviço'}`
    : `${numero} — Serviço`

  return (
    <Scene minHeight="screen">
      <FullBleedMedia src={image} alt={alt} overlay={overlay} parallax>
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
            <p className="text-sm uppercase tracking-[0.25em] text-sand">{label}</p>

            <h2
              className={cn(
                'mt-4 font-sans font-bold uppercase leading-[0.9] tracking-wide text-cream',
                featured
                  ? 'text-[clamp(3.5rem,8vw,9rem)]'
                  : 'text-[clamp(2.5rem,6vw,7rem)]',
              )}
            >
              {titulo}
            </h2>

            {!featured && subitems.length > 0 && (
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-sand">
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
