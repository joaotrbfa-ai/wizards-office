import { Fragment } from 'react'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { PaginaSobre } from '@/sanity/types'

export function Abertura({ abertura }: { abertura?: PaginaSobre['abertura'] }) {
  const { src, alt, blurDataURL } = imageProps(abertura?.image)
  const tituloLinhas = abertura?.tituloLinhas ?? []

  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={src}
        alt={alt || 'Estúdio Wizards Office'}
        blurDataURL={blurDataURL}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            {abertura?.label ?? ''}
          </p>
          <h1 className="mt-5 font-sans text-[clamp(2.5rem,5.6vw,5.6rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            {tituloLinhas.map((linha, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {linha}
              </Fragment>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {abertura?.subtitulo ?? ''}
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
