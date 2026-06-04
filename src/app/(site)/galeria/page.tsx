import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { GaleriaAbertura } from '@/components/galeria/GaleriaAbertura'
import { GaleriaGrid } from '@/components/galeria/GaleriaGrid'
import { GaleriaCtaFinal } from '@/components/galeria/GaleriaCtaFinal'
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
    <>
      <ScrollProgress />
      <GaleriaAbertura abertura={pagina?.abertura} />
      <GaleriaGrid rows={pagina?.rows ?? []} />
      <GaleriaCtaFinal cta={pagina?.ctaFinal} />
    </>
  )
}
