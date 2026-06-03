import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import type { ProcessoEtapaData, ProcessoPosition } from '@/data/processo'

/** Justificação vertical (eixo do flex-col) por posição. */
const vJustify: Record<ProcessoPosition, string> = {
  'bottom-left': 'justify-end',
  center: 'justify-center',
  'bottom-right': 'justify-end',
}

/** Alinhamento horizontal + de texto por posição. */
const hAlign: Record<ProcessoPosition, string> = {
  'bottom-left': 'items-start text-left',
  center: 'items-center text-center',
  'bottom-right': 'items-end text-right',
}

export function ProcessoEtapa({
  numero,
  titulo,
  descricao,
  image,
  alt,
  position = 'bottom-left',
  overlay = 'strong',
}: ProcessoEtapaData) {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia src={image} alt={alt} overlay={overlay} parallax>
        <div
          className={cn(
            'flex h-full w-full flex-col p-8 pb-20 md:p-16 md:pb-32',
            vJustify[position],
          )}
        >
          <Reveal className={cn('flex flex-col gap-5', hAlign[position])}>
            <p className="text-sm uppercase tracking-[0.25em] text-sand">
              {numero} — Etapa
            </p>
            <h2 className="font-sans text-[clamp(3rem,7vw,8rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
              {titulo}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-cream md:text-lg">
              {descricao}
            </p>
          </Reveal>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
