import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Hero } from '@/components/home/Hero'
import { ManifestoPinned } from '@/components/home/ManifestoPinned'
import { ManifestoText } from '@/components/home/ManifestoText'
import { PilarScene } from '@/components/home/PilarScene'
import { ProjetosHorizontal } from '@/components/home/ProjetosHorizontal'
import { ServicosLista } from '@/components/home/ServicosLista'
import { ParceirosCena } from '@/components/home/ParceirosCena'
import { PausaScript } from '@/components/home/PausaScript'
import { CtaFinal } from '@/components/shared/CtaFinal'
import { PILARES_DATA } from '@/data/pilares'

export const metadata: Metadata = {
  title: {
    absolute: 'Wizards Office — Crafting spaces that feel like magic.',
  },
  description:
    'Estúdio criativo de visualização arquitetônica de alto padrão em Balneário Camboriú. Imagens, filmes e narrativas visuais que transformam arquitetura em desejo.',
}

export default function HomePage() {
  return (
    <>
      <ScrollProgress />

      <Hero />

      <ManifestoPinned />
      <ManifestoText />

      {PILARES_DATA.map((pilar) => (
        <PilarScene
          key={pilar.numero}
          numero={pilar.numero}
          titulo={pilar.titulo}
          descricao={pilar.descricao}
          image={pilar.image}
          alt={pilar.alt}
          position={pilar.position}
          overlay={pilar.overlay}
        />
      ))}

      <PausaScript />

      <ProjetosHorizontal />
      <ServicosLista />
      <ParceirosCena />
      <CtaFinal
        image="/projects/wow-rv-001-wine-gourmet.jpg"
        alt="Ambiente Wizards Office"
        titulo={['Vamos criar', 'magia', 'juntos?']}
        subtitulo="Conte sobre seu projeto. Respondemos em até 48h úteis."
        href="/contato"
        ctaLabel="Iniciar brief"
      />
    </>
  )
}
