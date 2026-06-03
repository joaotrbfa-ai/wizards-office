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

      <PilarScene
        numero="01"
        titulo="Direção"
        descricao="Cada projeto exige uma linguagem própria. Nossa direção criativa constrói atmosferas, emoções e percepção de valor através de luz, composição, materialidade e ritmo visual. Não criamos apenas imagens — criamos presença."
        image="/projects/wow-rv-001-hall-05.jpg"
        alt="Hall interno — projeto RV"
        position="bottom-left"
        overlay="bottom"
      />
      <PilarScene
        numero="02"
        titulo="Narrativa"
        descricao="Acreditamos que arquitetura deve ser sentida antes de ser construída. Por isso, transformamos conceitos em narrativas visuais capazes de comunicar identidade, despertar desejo e conectar pessoas ao futuro de um espaço."
        image="/projects/wow-rv-003-fachada-diurna.jpg"
        alt="Fachada diurna — projeto RV"
        position="center"
        overlay="soft"
      />
      <PilarScene
        numero="03"
        titulo="Confiança"
        descricao="Nosso processo é estruturado para oferecer clareza, previsibilidade e segurança em cada etapa. Da direção criativa à entrega final, mantemos um fluxo organizado, comunicação precisa e compromisso absoluto com qualidade e prazo."
        image="/projects/cena-06.jpg"
        alt="Cena arquitetônica — Wizards Office"
        position="bottom-right"
        overlay="bottom"
      />

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
