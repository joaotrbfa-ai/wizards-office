import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'

export interface AberturaProps {
  label?: string
  /** Linhas do título (cada item vira uma linha). */
  tituloLinhas?: string[]
  subtitulo?: string
  image?: string
  alt?: string
  /** Placeholder LQIP (base64) da imagem do Sanity. */
  blurDataURL?: string
}

export function Abertura({
  label = 'Serviços',
  tituloLinhas = [],
  subtitulo,
  image = '',
  alt = 'Espaço Wizards Office',
  blurDataURL,
}: AberturaProps) {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={image}
        alt={alt}
        blurDataURL={blurDataURL}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">{label}</p>
          <h1 className="mt-5 font-sans text-[clamp(2.5rem,5.6vw,5.6rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            {tituloLinhas.map((linha, i) => (
              <span key={i} className="block">
                {linha}
              </span>
            ))}
          </h1>
          {subtitulo && (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand md:text-lg">
              {subtitulo}
            </p>
          )}
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
