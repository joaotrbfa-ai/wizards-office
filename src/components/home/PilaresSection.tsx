import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { imageProps } from '@/sanity/image'
import type { Pilar } from '@/sanity/types'

/**
 * Direção / Narrativa / Confiança em uma única seção: os três pilares lado a
 * lado (grade), no lugar das três telas full-bleed anteriores.
 */
export function PilaresSection({ pilares }: { pilares: Pilar[] }) {
  if (!pilares.length) return null

  return (
    <Scene tone="ink" minHeight="auto" className="py-16 md:py-20">
      <Container width="wide">
        <RevealGroup className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {pilares.map((pilar) => {
            const { src, alt, blurDataURL } = imageProps(pilar.image, 1200)
            return (
              <Reveal key={pilar._id}>
                <article className="group relative aspect-[3/2] overflow-hidden bg-olive md:aspect-[4/5]">
                  {src && (
                    <Image
                      src={src}
                      alt={alt || pilar.titulo}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
                    />
                  )}
                  {/* Título + descrição sobre degradê preto, sempre visíveis. */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-6 pt-20 md:p-7 md:pt-24">
                    <h3 className="font-sans text-[clamp(1.4rem,2.2vw,2rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
                      {pilar.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
                      {pilar.descricao}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
