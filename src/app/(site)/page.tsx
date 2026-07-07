import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Hero } from '@/components/home/Hero'
import { ManifestoSection } from '@/components/home/ManifestoSection'
import { PilaresSection } from '@/components/home/PilaresSection'
import { ServicosLista } from '@/components/home/ServicosLista'
import { MiniGaleria } from '@/components/home/MiniGaleria'
import { BriefForm } from '@/components/contato/BriefForm'
import { ThemeScope } from '@/components/theme/ThemeScope'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import {
  paginaHomeQuery,
  pilaresQuery,
  servicosQuery,
  membrosQuery,
  paginaSobreQuery,
  paginaContatoQuery,
  configQuery,
  galeriaHomeProjetosQuery,
} from '@/sanity/queries'
import { imageProps } from '@/sanity/image'
import type {
  PaginaHome,
  Pilar,
  Servico,
  Membro,
  PaginaSobre,
  PaginaContato,
  Config,
  GaleriaHomeProjeto,
} from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Wizards Office — Crafting spaces that feel like magic.',
  },
  description:
    'Estúdio criativo de visualização arquitetônica de alto padrão em Balneário Camboriú. Imagens, filmes e narrativas visuais que transformam arquitetura em desejo.',
}

export default async function HomePage() {
  const [home, pilares, servicos, membros, sobre, contato, config, galeriaProjetos] =
    await Promise.all([
      sanityFetch<PaginaHome>({ query: paginaHomeQuery, tags: [TAGS.paginaHome] }),
      sanityFetch<Pilar[]>({ query: pilaresQuery, tags: [TAGS.pilar] }),
      sanityFetch<Servico[]>({ query: servicosQuery, tags: [TAGS.servico] }),
      sanityFetch<Membro[]>({ query: membrosQuery, tags: [TAGS.membro] }),
      sanityFetch<PaginaSobre | null>({ query: paginaSobreQuery, tags: [TAGS.paginaSobre] }),
      sanityFetch<PaginaContato | null>({ query: paginaContatoQuery, tags: [TAGS.paginaContato] }),
      sanityFetch<Config | null>({ query: configQuery, tags: [TAGS.config] }),
      sanityFetch<GaleriaHomeProjeto[]>({ query: galeriaHomeProjetosQuery, tags: [TAGS.projeto] }),
    ])

  // Equipe na landing: apenas Berth, Matheus e Renata (os três primeiros por número).
  const equipe = (membros ?? []).slice(0, 3)

  return (
    <ThemeScope roles={home?.aparencia}>
      <ScrollProgress />

      {/* 1. Hero */}
      <Hero
        videoUrl={home?.hero?.videoUrl ?? ''}
        fraseHead={home?.hero?.fraseHead ?? 'Crafting spaces that feel like'}
        fraseScript={home?.hero?.fraseScript ?? 'magic.'}
        poster={home?.hero?.poster ? imageProps(home.hero.poster, 1920).src : undefined}
      />

      {/* 2. Manifesto / Equipe / Números — seção única */}
      <div id="manifesto" className="scroll-mt-24">
        <ManifestoSection
          paragrafos={home?.manifestoTextoParagrafos ?? []}
          membros={equipe}
          numeros={sobre?.numeros ?? []}
        />
      </div>

      {/* 3. Direção / Narrativa / Confiança — seção única */}
      <div id="pilares" className="scroll-mt-24">
        <PilaresSection pilares={pilares} />
      </div>

      {/* 4. Serviços */}
      <div id="servicos" className="scroll-mt-24">
        <ServicosLista
          servicos={servicos.map((s) => ({
            numero: s.numero,
            titulo: s.titulo,
            descricao: s.descricao,
          }))}
        />
      </div>

      {/* 5. Galeria */}
      <div id="galeria" className="scroll-mt-24">
        <MiniGaleria
          projetos={galeriaProjetos ?? []}
          eyebrow={home?.miniGaleria?.eyebrow}
          titulo={home?.miniGaleria?.titulo}
          descricao={home?.miniGaleria?.descricao}
          max={7}
        />
      </div>

      {/* 6. CTA — do formulário direto para o rodapé */}
      <div id="contato" className="scroll-mt-24">
        <BriefForm
          eyebrow={contato?.brief?.eyebrow}
          titulo={contato?.brief?.titulo}
          submitLabel={contato?.brief?.submitLabel}
          contatoEmail={config?.contact?.email}
        />
      </div>
    </ThemeScope>
  )
}
