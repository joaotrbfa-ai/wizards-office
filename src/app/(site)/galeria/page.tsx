import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { GaleriaGrid } from '@/components/galeria/GaleriaGrid'
import { ThemeScope } from '@/components/theme/ThemeScope'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { paginaGaleriaQuery } from '@/sanity/queries'
import type { PaginaGaleria } from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Galeria — Wizards Office',
  },
  description:
    'Curadoria de imagens selecionadas do estúdio de visualização arquitetônica Wizards Office.',
}

export default async function GaleriaPage() {
  const pagina = await sanityFetch<PaginaGaleria | null>({
    query: paginaGaleriaQuery,
    tags: [TAGS.paginaGaleria],
  })

  return (
    <ThemeScope roles={pagina?.aparencia}>
      <ScrollProgress />
      <Scene tone="olive" minHeight="auto" className="pt-28 pb-2 md:pt-36 md:pb-4">
        <Container>
          <Reveal>
            <h1 className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading">
              Galeria
            </h1>
          </Reveal>
        </Container>
      </Scene>
      <GaleriaGrid rows={pagina?.rows ?? []} />
    </ThemeScope>
  )
}
