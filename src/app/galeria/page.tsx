import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { GaleriaAbertura } from '@/components/galeria/GaleriaAbertura'
import { GaleriaGrid } from '@/components/galeria/GaleriaGrid'
import { GaleriaCtaFinal } from '@/components/galeria/GaleriaCtaFinal'

export const metadata: Metadata = {
  title: {
    absolute: 'Galeria — Wizards Office',
  },
  description:
    'Curadoria de imagens selecionadas do estúdio de visualização arquitetônica Wizards Office.',
}

export default function GaleriaPage() {
  return (
    <>
      <ScrollProgress />
      <GaleriaAbertura />
      <GaleriaGrid />
      <GaleriaCtaFinal />
    </>
  )
}
