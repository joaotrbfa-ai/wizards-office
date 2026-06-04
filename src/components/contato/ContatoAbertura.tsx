import { Fragment } from 'react'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { PaginaContato } from '@/sanity/types'

export function ContatoAbertura({ abertura }: { abertura?: PaginaContato['abertura'] }) {
  const { src, alt, blurDataURL } = imageProps(abertura?.image)
  const tituloLinhas = abertura?.tituloLinhas ?? ['Vamos', 'conversar.']

  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={src || '/projects/wow-ppt-002-wineclub.jpg'}
        alt={alt || 'Ambiente Wizards Office'}
        blurDataURL={blurDataURL}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">
            {abertura?.label ?? 'Contato'}
          </p>
          <h1 className="mt-5 font-sans text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            {tituloLinhas.map((linha, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {linha}
              </Fragment>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand md:text-lg">
            {abertura?.subtitulo ??
              'Toda grande imagem começa por uma conversa. Conte sobre o empreendimento — respondemos em até 48h úteis.'}
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
