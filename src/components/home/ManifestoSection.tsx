import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { imageProps } from '@/sanity/image'
import { NumeroContador } from '@/components/home/NumeroContador'
import { LineReveal } from '@/components/motion/LineReveal'
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
          <div className="order-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <RevealGroup className="flex flex-col gap-7">
              {paragrafos.map((p, i) => (
                <Reveal key={i}>
                  <p className="text-base leading-relaxed text-label md:text-lg">{p}</p>
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
                      <figure className="group relative aspect-[3/4] overflow-hidden bg-ink">
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
                        {/* Nome/função sobre degradê preto — só no hover. */}
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="block font-sans text-xs uppercase tracking-wide text-cream">
                            {m.nome}
                          </span>
                          <span className="block text-[0.65rem] uppercase tracking-wide text-cream/70">
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
                        {metrica.tipo === 'numero' ? (
                          <NumeroContador
                            valor={metrica.valor}
                            className="font-sans font-bold leading-[0.85] text-heading text-[clamp(1.6rem,3vw,2.6rem)]"
                          />
                        ) : (
                          <span className="font-sans font-bold leading-[0.85] text-heading text-[clamp(1.15rem,2vw,1.75rem)]">
                            {metrica.valor}
                          </span>
                        )}
                        <LineReveal className="mt-3" />
                        <span className="mt-3 text-[0.7rem] uppercase tracking-[0.15em] text-label">
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
