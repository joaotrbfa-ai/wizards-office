import { Fragment } from 'react'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { Abertura } from '@/sanity/types'

export function GaleriaAbertura({ abertura }: { abertura?: Abertura }) {
  const img = imageProps(abertura?.image, 2400)
  const src = img.src || '/projects/wow-art-001-suite-garden.jpg'
  const alt = img.alt || 'Galeria Wizards Office'
  const label = abertura?.label ?? 'Galeria'
  const tituloLinhas = abertura?.tituloLinhas ?? ['Uma seleção', 'de trabalhos.']
  const subtitulo =
    abertura?.subtitulo ??
    'Imagens selecionadas, sem ordem cronológica. O que conecta cada cena é a intenção.'

  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={src}
        alt={alt}
        blurDataURL={img.blurDataURL}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-label">{label}</p>
          <h1 className="mt-5 font-sans text-[clamp(1.95rem,4.4vw,3.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
            {tituloLinhas.map((linha, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {linha}
              </Fragment>
            ))}
          </h1>
          {subtitulo && (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-label md:text-lg">
              {subtitulo}
            </p>
          )}
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
