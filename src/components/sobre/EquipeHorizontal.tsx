import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { MemberPortrait } from '@/components/ui/MemberPortrait'
import { MEMBROS } from '@/data/equipe'

export function EquipeHorizontal() {
  return (
    <Scene tone="ink" minHeight="auto" clip={false}>
      <Container className="py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-sand">O time</p>
        <h2 className="mt-6 font-sans text-[clamp(3rem,6vw,7rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
          The wizards.
        </h2>
        <p className="mt-8 hidden text-xs uppercase tracking-[0.25em] text-sand md:block">
          Role para arrastar →
        </p>
      </Container>

      <HorizontalScroll pinHeight="100vh">
        {MEMBROS.map((membro) => (
          <div key={membro.slug} className="relative h-full w-screen shrink-0">
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <MemberPortrait
                name={membro.nome}
                initial={membro.nome.charAt(0)}
                src={`/team/${membro.slug}.jpg`}
              />

              <div className="flex flex-col justify-end p-8 md:p-16">
                <span className="text-sm tracking-[0.2em] text-sand">
                  {membro.numero} / {String(MEMBROS.length).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-sans text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
                  {membro.nome}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-sand">
                  {membro.cargo}
                </p>
                {membro.extra && (
                  <p className="mt-4 text-sm text-sand">{membro.extra}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </Scene>
  )
}
