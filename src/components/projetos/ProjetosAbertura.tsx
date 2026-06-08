import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { Abertura } from '@/sanity/types'

const FALLBACK_IMG = '/projects/wow-rv-001-fachada-angulada.jpg'
const FALLBACK_TITULO = ['Trabalhos que', 'falam por si.']

export function ProjetosAbertura({ abertura }: { abertura?: Abertura }) {
  const img = abertura?.image ? imageProps(abertura.image, 2400) : null
  const src = img?.src || FALLBACK_IMG
  const alt = img?.alt || 'Trabalhos Wizards Office'
  const blurDataURL = img?.blurDataURL

  const label = abertura?.label || 'Projetos'
  const tituloLinhas =
    abertura?.tituloLinhas && abertura.tituloLinhas.length > 0
      ? abertura.tituloLinhas
      : FALLBACK_TITULO
  const subtitulo = abertura?.subtitulo || 'Seis cases. Cada um, uma direção.'

  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={src}
        alt={alt}
        blurDataURL={blurDataURL}
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">{label}</p>
          <h1 className="mt-5 font-sans text-[clamp(2.25rem,5vw,4.75rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            {tituloLinhas.map((linha, i) => (
              <span key={i}>
                {linha}
                {i < tituloLinhas.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {subtitulo}
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
