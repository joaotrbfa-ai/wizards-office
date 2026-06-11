import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { ProjetosAbertura } from '@/components/projetos/ProjetosAbertura'
import { ProjetoCena } from '@/components/projetos/ProjetoCena'
import { CtaFinal } from '@/components/shared/CtaFinal'
import { ThemeScope } from '@/components/theme/ThemeScope'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { paginaProjetosQuery, projetosListQuery } from '@/sanity/queries'
import { imageProps } from '@/sanity/image'
import type { PaginaProjetos, ProjetoCard } from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Projetos — Wizards Office',
  },
  description:
    'Cases selecionados de visualização arquitetônica. Cada projeto traduz uma intenção em imagem, filme e narrativa.',
}

export default async function ProjetosPage() {
  const [pagina, projetos] = await Promise.all([
    sanityFetch<PaginaProjetos | null>({
      query: paginaProjetosQuery,
      tags: [TAGS.paginaProjetos],
    }),
    sanityFetch<ProjetoCard[]>({
      query: projetosListQuery,
      tags: [TAGS.projeto],
    }),
  ])

  const cta = pagina?.ctaFinal

  return (
    <ThemeScope roles={pagina?.aparencia}>
      <ScrollProgress />
      <ProjetosAbertura abertura={pagina?.abertura} />
      {projetos.map((projeto) => (
        <ProjetoCena key={projeto.slug} projeto={projeto} />
      ))}
      {cta ? (
        <CtaFinal
          image={imageProps(cta.image, 2400).src}
          alt={imageProps(cta.image, 2400).alt}
          blurDataURL={imageProps(cta.image, 2400).blurDataURL}
          titulo={cta.tituloLinhas}
          subtitulo={cta.subtitulo}
          href={cta.href}
          ctaLabel={cta.ctaLabel}
        />
      ) : (
        <CtaFinal
          image="/projects/wow-rv-001-wine-gourmet.jpg"
          alt="Ambiente Wizards Office"
          titulo={['Vamos criar', 'magia juntos?']}
          href="/contato"
          ctaLabel="Trazer minha visão"
        />
      )}
    </ThemeScope>
  )
}
