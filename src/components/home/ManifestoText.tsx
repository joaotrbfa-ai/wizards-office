import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export interface ManifestoTextProps {
  paragrafos: string[]
}

export function ManifestoText({ paragrafos }: ManifestoTextProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-32 md:py-48">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <p className="text-sm uppercase tracking-[0.25em] text-sand">Manifesto</p>
              <p className="mt-8 font-script text-[clamp(5rem,8vw,9rem)] leading-none text-terracotta">
                magic.
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.15em] text-sand">
                2019 — Balneário Camboriú · SC
              </p>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <RevealGroup className="flex flex-col gap-6">
              {paragrafos.map((p, i) => (
                <Reveal key={i}>
                  <p className="max-w-prose text-base leading-relaxed text-sand md:text-lg">
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
