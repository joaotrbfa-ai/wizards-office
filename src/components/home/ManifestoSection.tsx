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
 * Seção única de Manifesto. No desktop: identidade + equipe + números à esquerda
 * e os parágrafos à direita. No mobile os três blocos empilham na ordem de
 * leitura — título → texto do manifesto → equipe → números — via `order` +
 * grid placement (o desktop é reconstruído com col-start/row-start).
 */
export function ManifestoSection({ paragrafos, membros, numeros }: ManifestoSectionProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-16 md:py-20">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
          {/* 1. Identidade — sempre primeiro */}
          <div className="order-1 lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <h2 className="text-base uppercase tracking-[0.25em] text-label md:text-lg">
                Manifesto
              </h2>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-label">SINCE 2019</p>
            </Reveal>
          </div>

          {/* 2. Texto do manifesto — 2º no mobile; coluna direita (2 linhas) no desktop */}
          <div className="order-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:pt-8">
            <RevealGroup className="flex flex-col gap-7">
              {paragrafos.map((p, i) => (
                <Reveal key={i}>
                  <p className="text-base leading-relaxed text-label md:text-xl">{p}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>

          {/* 3. Equipe + Números — 3º no mobile; esquerda-baixo no desktop */}
          <div className="order-3 lg:col-span-5 lg:col-start-1 lg:row-start-2">
            {membros.length > 0 && (
              <RevealGroup className="grid grid-cols-3 gap-3">
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
              <Reveal className={membros.length > 0 ? 'mt-10' : ''}>
                <div className="border-t border-label/20 pt-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-label">
                    Números que nos definem
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-6">
                    {numeros.map((metrica, i) => (
                      <div key={`${metrica.label}-${i}`} className="flex flex-col">
                        <span
                          className={cn(
                            'font-sans font-bold leading-[0.85] text-heading',
                            metrica.tipo === 'numero'
                              ? 'text-[clamp(1.6rem,3vw,2.6rem)]'
                              : 'text-[clamp(1.15rem,2vw,1.75rem)]',
                          )}
                        >
                          {metrica.valor}
                        </span>
                        <span className="mt-3 border-t border-label/25 pt-3 text-[0.7rem] uppercase tracking-[0.15em] text-label">
                          {metrica.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </Scene>
  )
}
