import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { imageProps } from '@/sanity/image'
import type { Membro } from '@/sanity/types'

export function EquipeHorizontal({ membros }: { membros: Membro[] }) {
  // Empty state: não renderiza a seção (evita HorizontalScroll vazio com 1 tela em branco).
  if (!membros?.length) return null

  return (
    <Scene tone="ink" minHeight="auto" clip={false}>
      <Container className="py-24">
        <h2 className="font-sans text-[clamp(1.95rem,3.7vw,3.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
          The wizards.
        </h2>
      </Container>

      <HorizontalScroll pinHeight="100vh">
        {membros.map((membro) => {
          const { src, alt, blurDataURL } = imageProps(membro.foto)
          return (
            <div key={membro._id} className="relative h-full w-screen shrink-0 md:w-[50vw]">
              <FullBleedMedia
                src={src || ''}
                type="image"
                alt={alt || membro.nome || ''}
                blurDataURL={blurDataURL}
                overlay="bottom"
              >
                {/* Nome e cargo sobrepostos à foto, no canto inferior. */}
                <div className="flex h-full w-full flex-col justify-end p-8 md:p-16">
                  <span className="text-sm tracking-[0.2em] text-muted">
                    {membro.numero} / {String(membros.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-sans text-[clamp(1.4rem,3.2vw,2.85rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
                    {membro.nome}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted">
                    {membro.cargo}
                  </p>
                  {membro.extra && <p className="mt-4 text-sm text-muted">{membro.extra}</p>}
                </div>
              </FullBleedMedia>
            </div>
          )
        })}
      </HorizontalScroll>
    </Scene>
  )
}
