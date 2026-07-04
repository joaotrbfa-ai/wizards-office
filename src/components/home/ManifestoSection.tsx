import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { imageProps } from '@/sanity/image'
import { cn } from '@/lib/utils'
import type { Membro, MetricaSobre } from '@/sanity/types'

export interface ManifestoSectionProps {
  paragrafos: string[]
  membros: Membro[]
  numeros: MetricaSobre[]
}

/**
 * Seção única de Manifesto: identidade + equipe + números à esquerda e os
 * parágrafos do manifesto à direita — consolidando o que antes eram três
 * seções separadas (manifesto, equipe, números).
 */
export function ManifestoSection({ paragrafos, membros, numeros }: ManifestoSectionProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Coluna esquerda: identidade + equipe + números */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-base uppercase tracking-[0.25em] text-label md:text-lg">
                Manifesto
              </h2>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-label">SINCE 2019</p>
            </Reveal>

            {membros.length > 0 && (
              <RevealGroup className="mt-10 grid grid-cols-3 gap-3">
                {membros.map((m) => {
                  const { src, alt, blurDataURL } = imageProps(m.foto, 600)
                  return (
                    <Reveal key={m._id}>
                      <figure>
                        <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                          {src && (
                            <Image
                              src={src}
                              alt={alt || m.nome}
                              fill
                              sizes="(min-width: 1024px) 12vw, 30vw"
                              className="object-cover object-top"
                              {...(blurDataURL
                                ? { placeholder: 'blur' as const, blurDataURL }
                                : {})}
                            />
                          )}
                        </div>
                        <figcaption className="mt-2">
                          <span className="block font-sans text-xs uppercase tracking-wide text-heading">
                            {m.nome}
                          </span>
                          <span className="block text-[0.65rem] uppercase tracking-wide text-label">
                            {m.cargo}
                          </span>
                        </figcaption>
                      </figure>
                    </Reveal>
                  )
                })}
              </RevealGroup>
            )}

            {numeros.length > 0 && (
              <Reveal className="mt-10">
                <div className="bg-cream p-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-olive/70">
                    Números que nos definem
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-6">
                    {numeros.map((metrica, i) => (
                      <div key={`${metrica.label}-${i}`} className="flex flex-col">
                        <span
                          className={cn(
                            'font-sans font-bold leading-[0.85] text-olive',
                            metrica.tipo === 'numero'
                              ? 'text-[clamp(1.6rem,3vw,2.6rem)]'
                              : 'text-[clamp(1.15rem,2vw,1.75rem)]',
                          )}
                        >
                          {metrica.valor}
                        </span>
                        <span className="mt-3 border-t border-olive/25 pt-3 text-[0.7rem] uppercase tracking-[0.15em] text-olive/70">
                          {metrica.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Coluna direita: parágrafos do manifesto */}
          <div className="lg:col-span-7">
            <RevealGroup className="flex flex-col gap-6">
              {paragrafos.map((p, i) => (
                <Reveal key={i}>
                  <p className="max-w-prose text-base leading-relaxed text-label md:text-lg">{p}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Scene>
  )
}
