import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { Abertura } from '@/components/sobre/Abertura'
import { ManifestoSobre } from '@/components/sobre/ManifestoSobre'
import { ProcessoEtapa } from '@/components/sobre/ProcessoEtapa'
import { NumerosCena } from '@/components/sobre/NumerosCena'
import { EquipeHorizontal } from '@/components/sobre/EquipeHorizontal'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { paginaSobreQuery, etapasQuery, membrosQuery } from '@/sanity/queries'
import { imageProps } from '@/sanity/image'
import type { PaginaSobre, EtapaProcesso, Membro } from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Sobre — Wizards Office',
  },
  description:
    'Estúdio criativo de visualização arquitetônica fundado em 2019 em Balneário Camboriú. Conheça o time e o processo por trás de cada projeto.',
}

export default async function SobrePage() {
  const [pagina, etapas, membros] = await Promise.all([
    sanityFetch<PaginaSobre | null>({
      query: paginaSobreQuery,
      tags: [TAGS.paginaSobre],
    }),
    sanityFetch<EtapaProcesso[]>({
      query: etapasQuery,
      tags: [TAGS.etapaProcesso],
    }),
    sanityFetch<Membro[]>({
      query: membrosQuery,
      tags: [TAGS.membro],
    }),
  ])

  return (
    <>
      <ScrollProgress />
      <Abertura abertura={pagina?.abertura} />
      <ManifestoSobre manifesto={pagina?.manifesto} />
      {(etapas ?? []).map((etapa) => {
        const { src, alt, blurDataURL } = imageProps(etapa.image)
        return (
          <ProcessoEtapa
            key={etapa._id}
            titulo={etapa.titulo}
            descricao={etapa.descricao}
            image={src}
            alt={alt}
            blurDataURL={blurDataURL}
            position={etapa.position}
            overlay={etapa.overlay}
          />
        )
      })}
      <NumerosCena numeros={pagina?.numeros ?? []} />
      <EquipeHorizontal membros={membros ?? []} />
    </>
  )
}
