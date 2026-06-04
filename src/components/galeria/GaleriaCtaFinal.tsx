import { CtaFinal } from '@/components/shared/CtaFinal'
import { imageProps } from '@/sanity/image'
import type { CtaBlock } from '@/sanity/types'

export function GaleriaCtaFinal({ cta }: { cta?: CtaBlock }) {
  if (cta) {
    const img = imageProps(cta.image, 2400)
    return (
      <CtaFinal
        image={img.src}
        alt={img.alt}
        blurDataURL={img.blurDataURL}
        titulo={cta.tituloLinhas}
        subtitulo={cta.subtitulo}
        href={cta.href}
        ctaLabel={cta.ctaLabel}
        script={cta.mostrarScriptMagic}
      />
    )
  }

  // Fallback — valores originais quando o Sanity ainda não tem ctaFinal.
  return (
    <CtaFinal
      image="/projects/wow-ppt-002-wineclub.jpg"
      alt="Ambiente Wizards Office"
      titulo={['Vamos conversar', 'sobre o seu?']}
      subtitulo="Conte sobre seu projeto. Respondemos em até 48h úteis."
      href="/contato"
      ctaLabel="Reconhece seu projeto?"
    />
  )
}
