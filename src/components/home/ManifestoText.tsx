import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export interface ManifestoTextProps {
  paragrafos: string[]
}

export function ManifestoText({ paragrafos }: ManifestoTextProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <h2 className="text-base uppercase tracking-[0.25em] text-label md:text-lg">Manifesto</h2>
              <p className="mt-6 text-sm uppercase tracking-[0.15em] text-label">SINCE 2019</p>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <RevealGroup className="flex flex-col gap-6">
              {paragrafos.map((p, i) => (
                <Reveal key={i}>
                  <p className="max-w-prose text-base leading-relaxed text-label md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
              <Reveal>
                <div className="pt-4">
                  <Button variant="outline" href="/sobre" size="md">
                    Sobre nós
                  </Button>
                </div>
              </Reveal>
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Scene>
  )
}
