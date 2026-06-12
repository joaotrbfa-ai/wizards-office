import Link from 'next/link'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { imageProps } from '@/sanity/image'
import type { ProjetoCard } from '@/sanity/types'

export interface ProjetosHorizontalProps {
  projetos: ProjetoCard[]
}

export function ProjetosHorizontal({ projetos }: ProjetosHorizontalProps) {
  const total = String(projetos.length).padStart(2, '0')

  return (
    <>
      <Scene tone="cream" minHeight="auto" clip={false}>
        <Container className="py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-label/50">Projetos selecionados</p>
          <h2 className="mt-6 max-w-4xl font-sans text-[clamp(1.6rem,3.2vw,2.85rem)] font-bold uppercase leading-[0.95] tracking-wide text-heading/75">
            Trabalhos que falam por si.
          </h2>
          <p className="mt-8 hidden text-xs uppercase tracking-[0.25em] text-label/40 md:block">
            Role para arrastar →
          </p>
        </Container>

        <HorizontalScroll pinHeight="100vh">
          {projetos.map((projeto, i) => {
            const cover = imageProps(projeto.coverImage, 2000)
            return (
              <div key={projeto._id} className="group relative h-full w-screen shrink-0">
                <FullBleedMedia
                  src={cover.src}
                  alt={cover.alt}
                  blurDataURL={cover.blurDataURL}
                  overlay="bottom"
                >
                  <div className="pointer-events-none flex h-full w-full items-end justify-between gap-8 p-8 pb-16 md:p-16 md:pb-24">
                    <div className="flex flex-col gap-3">
                      <span className="text-sm tracking-[0.2em] text-label">
                        {String(i + 1).padStart(2, '0')} / {total}
                      </span>
                      <h3 className="font-sans text-[clamp(1.4rem,3.2vw,2.85rem)] font-bold uppercase leading-[0.95] tracking-wide text-heading">
                        {projeto.nome}
                      </h3>
                    </div>

                    {/* Afordância visual (o card inteiro é o link via overlay abaixo). */}
                    <span
                      aria-hidden
                      className="hidden shrink-0 items-center gap-2 self-end pb-2 text-sm uppercase tracking-[0.2em] text-body sm:inline-flex"
                    >
                      <span className="border-b border-body/40 pb-1 transition-colors group-hover:border-body">
                        Ver projeto
                      </span>
                      <span className="transition-transform duration-500 ease-soft group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </FullBleedMedia>

                {/* Card inteiro clicável — funciona também no mobile. */}
                <Link
                  href={`/projetos/${projeto.slug}`}
                  aria-label={`Ver projeto: ${projeto.nome}`}
                  className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
                />
              </div>
            )
          })}
        </HorizontalScroll>
      </Scene>

      <Scene tone="ink" minHeight="auto" className="py-24">
        <Container className="flex justify-center">
          <Button variant="outline" href="/projetos" size="md">
            Ver todos os projetos
          </Button>
        </Container>
      </Scene>
    </>
  )
}
