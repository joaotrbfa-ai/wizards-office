import Link from 'next/link'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

type ProjetoCena = { n: string; image: string; nome: string; ano: number; alt: string }

const PROJETOS: ProjetoCena[] = [
  {
    n: '01',
    image: '/projects/cena-06.jpg',
    nome: 'Virentis Residences',
    ano: 2024,
    alt: 'Virentis Residences — visualização arquitetônica',
  },
  {
    n: '02',
    image: '/projects/wow-rv-001-hall-05.jpg',
    nome: 'RV Marina — Hall',
    ano: 2024,
    alt: 'RV Marina — hall de entrada',
  },
  {
    n: '03',
    image: '/projects/wow-ppt-002-fachada-01.jpg',
    nome: 'Procave 002 — Fachada',
    ano: 2024,
    alt: 'Procave 002 — fachada',
  },
  {
    n: '04',
    image: '/projects/wow-rv-001-wine-gourmet.jpg',
    nome: 'RV Wineclub',
    ano: 2024,
    alt: 'RV Wineclub — espaço gourmet',
  },
  {
    n: '05',
    image: '/projects/wow-rv-003-fachada-diurna.jpg',
    nome: 'RV Diurna',
    ano: 2023,
    alt: 'RV — fachada diurna',
  },
]

export function ProjetosHorizontal() {
  return (
    <>
      <Scene tone="ink" minHeight="auto" clip={false}>
        <Container className="py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-sand">Projetos selecionados</p>
          <h2 className="mt-6 max-w-4xl font-sans text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
            Trabalhos que falam por si.
          </h2>
          <p className="mt-8 hidden text-xs uppercase tracking-[0.25em] text-sand md:block">
            Role para arrastar →
          </p>
        </Container>

        <HorizontalScroll pinHeight="100vh">
          {PROJETOS.map((projeto) => (
            <div key={projeto.image} className="relative h-full w-screen shrink-0">
              <FullBleedMedia src={projeto.image} alt={projeto.alt} overlay="bottom">
                <div className="flex h-full w-full items-end justify-between gap-8 p-8 pb-16 md:p-16 md:pb-24">
                  <div className="flex flex-col gap-3">
                    <span className="text-sm tracking-[0.2em] text-sand">{projeto.n} / 05</span>
                    <h3 className="font-sans text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
                      {projeto.nome}
                    </h3>
                    <span className="text-sm uppercase tracking-[0.2em] text-sand">
                      {projeto.ano}
                    </span>
                  </div>

                  <Link
                    href="/projetos"
                    className="group hidden shrink-0 items-center gap-2 self-end pb-2 text-sm uppercase tracking-[0.2em] text-cream sm:inline-flex"
                  >
                    <span className="border-b border-cream/40 pb-1 transition-colors group-hover:border-cream">
                      Ver case
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-soft group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </FullBleedMedia>
            </div>
          ))}
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
