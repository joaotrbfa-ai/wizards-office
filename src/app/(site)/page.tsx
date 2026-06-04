import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Hero } from '@/components/home/Hero'
import { ManifestoPinned } from '@/components/home/ManifestoPinned'
import { ManifestoText } from '@/components/home/ManifestoText'
import { PilarScene } from '@/components/home/PilarScene'
import { ProjetosHorizontal } from '@/components/home/ProjetosHorizontal'
import { ServicosLista } from '@/components/home/ServicosLista'
import { ParceirosCena } from '@/components/home/ParceirosCena'
import { CtaFinal } from '@/components/shared/CtaFinal'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import {
  paginaHomeQuery,
  projetosDestaqueQuery,
  pilaresQuery,
  parceirosQuery,
  servicosQuery,
} from '@/sanity/queries'
import { imageProps } from '@/sanity/image'
import type { PaginaHome, ProjetoCard, Pilar, Parceiro, Servico } from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Wizards Office — Crafting spaces that feels like magic.',
  },
  description:
    'Estúdio criativo de visualização arquitetônica de alto padrão em Balneário Camboriú. Imagens, filmes e narrativas visuais que transformam arquitetura em desejo.',
}

export default async function HomePage() {
  const [home, projetos, pilares, parceiros, servicos] = await Promise.all([
    sanityFetch<PaginaHome>({ query: paginaHomeQuery, tags: [TAGS.paginaHome] }),
    sanityFetch<ProjetoCard[]>({ query: projetosDestaqueQuery, tags: [TAGS.projeto] }),
    sanityFetch<Pilar[]>({ query: pilaresQuery, tags: [TAGS.pilar] }),
    sanityFetch<Parceiro[]>({ query: parceirosQuery, tags: [TAGS.parceiro] }),
    sanityFetch<Servico[]>({ query: servicosQuery, tags: [TAGS.servico] }),
  ])

  const cta = home?.ctaFinal
  const ctaImg = cta?.image ? imageProps(cta.image, 2400) : null

  return (
    <>
      <ScrollProgress />

      <Hero
        videoUrl={home?.hero?.videoUrl ?? ''}
        fraseHead={home?.hero?.fraseHead ?? 'Crafting spaces that feels like'}
        fraseScript={home?.hero?.fraseScript ?? 'magic.'}
        poster={home?.hero?.poster ? imageProps(home.hero.poster, 1920).src : undefined}
      />

      <ManifestoPinned />
      <ManifestoText paragrafos={home?.manifestoTextoParagrafos ?? []} />

      {pilares.map((pilar) => {
        const img = imageProps(pilar.image, 2400)
        return (
          <PilarScene
            key={pilar._id}
            numero={pilar.numero}
            titulo={pilar.titulo}
            descricao={pilar.descricao}
            image={img.src}
            alt={img.alt}
            blurDataURL={img.blurDataURL}
            position={pilar.position}
            overlay={pilar.overlay}
          />
        )
      })}

      <ProjetosHorizontal projetos={projetos} />
      <ServicosLista servicos={servicos.map((s) => s.titulo)} />
      <ParceirosCena parceiros={parceiros} />

      {cta && (
        <CtaFinal
          image={ctaImg?.src ?? ''}
          alt={ctaImg?.alt ?? ''}
          blurDataURL={ctaImg?.blurDataURL}
          titulo={cta.tituloLinhas}
          subtitulo={cta.subtitulo}
          ctaLabel={cta.ctaLabel}
          href={cta.href}
        />
      )}
    </>
  )
}
