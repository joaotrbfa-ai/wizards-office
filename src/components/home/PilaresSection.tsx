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
    <Scene tone="ink" minHeight="auto" className="py-24 md:py-32">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {pilares.map((pilar) => {
            const { src, alt, blurDataURL } = imageProps(pilar.image, 1200)
            return (
              <Reveal key={pilar._id}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden bg-olive">
                    {src && (
                      <Image
                        src={src}
                        alt={alt || pilar.titulo}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                        {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
                      />
                    )}
                  </div>
                  <span className="mt-6 block text-sm tracking-[0.2em] text-label">
                    {pilar.numero}
                  </span>
                  <h3 className="mt-2 font-sans text-[clamp(1.4rem,2.2vw,2rem)] font-bold uppercase leading-[0.95] tracking-wide text-heading">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-label md:text-base">
                    {pilar.descricao}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
