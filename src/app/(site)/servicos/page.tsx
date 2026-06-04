import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Abertura } from '@/components/servicos/Abertura'
import { ServicoCena } from '@/components/servicos/ServicoCena'
import { CtaFinal } from '@/components/shared/CtaFinal'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { paginaServicosQuery, servicosQuery } from '@/sanity/queries'
import { imageProps } from '@/sanity/image'
import type { PaginaServicos, Servico } from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Serviços — Wizards Office',
  },
  description:
    'Fotografia, design de fachada, interiores, filmes, plantas humanizadas, tour 360 e design gráfico. Sete frentes para transformar arquitetura em desejo.',
}

export default async function ServicosPage() {
  const [pagina, servicos] = await Promise.all([
    sanityFetch<PaginaServicos>({ query: paginaServicosQuery, tags: [TAGS.paginaServicos] }),
    sanityFetch<Servico[]>({ query: servicosQuery, tags: [TAGS.servico] }),
  ])

  const abertura = pagina?.abertura
  const aberturaImg = imageProps(abertura?.image, 2400)

  const cta = pagina?.ctaFinal
  const ctaImg = cta?.image ? imageProps(cta.image, 2400) : null

  return (
    <>
      <ScrollProgress />

      <Abertura
        label={abertura?.label}
        tituloLinhas={abertura?.tituloLinhas ?? []}
        subtitulo={abertura?.subtitulo}
        image={aberturaImg.src}
        alt={aberturaImg.alt}
        blurDataURL={aberturaImg.blurDataURL}
      />

      {servicos.map((servico) => {
        const img = imageProps(servico.image, 2400)
        return (
          <ServicoCena
            key={servico._id}
            numero={servico.numero}
            titulo={servico.titulo}
            subitems={servico.subitems ?? []}
            descricao={servico.descricao}
            image={img.src}
            alt={img.alt}
            blurDataURL={img.blurDataURL}
            position={servico.position}
            overlay={servico.overlay}
            featured={servico.featured}
          />
        )
      })}

      {cta && (
        <CtaFinal
          image={ctaImg?.src ?? ''}
          alt={ctaImg?.alt ?? ''}
          blurDataURL={ctaImg?.blurDataURL}
          titulo={cta.tituloLinhas ?? []}
          subtitulo={cta.subtitulo}
          ctaLabel={cta.ctaLabel}
          href={cta.href}
        />
      )}
    </>
  )
}
