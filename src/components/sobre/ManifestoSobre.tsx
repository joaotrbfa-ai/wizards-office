import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import type { PaginaSobre } from '@/sanity/types'

export function ManifestoSobre({
  manifesto,
}: {
  manifesto?: PaginaSobre['manifesto']
}) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-32 md:py-48">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.2em] text-sand">
              {manifesto?.label ?? ''}
            </p>
            <h2 className="mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.8rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
              {manifesto?.titulo ?? ''}
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-prose text-lg leading-relaxed text-sand md:text-xl">
              {manifesto?.texto ?? ''}
            </p>
          </Reveal>
        </RevealGroup>
      </Container>
    </Scene>
  )
}
