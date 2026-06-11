import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { ContatoAbertura } from '@/components/contato/ContatoAbertura'
import { BriefForm } from '@/components/contato/BriefForm'
import { ContatoDireto } from '@/components/contato/ContatoDireto'
import { ThemeScope } from '@/components/theme/ThemeScope'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { paginaContatoQuery, configQuery } from '@/sanity/queries'
import type { PaginaContato, Config } from '@/sanity/types'

export const metadata: Metadata = {
  title: {
    absolute: 'Contato — Wizards Office',
  },
  description:
    'Comece um brief com o Wizards Office. Visualização arquitetônica de alto padrão em Balneário Camboriú.',
}

export default async function ContatoPage() {
  const [pagina, config] = await Promise.all([
    sanityFetch<PaginaContato | null>({
      query: paginaContatoQuery,
      tags: [TAGS.paginaContato],
    }),
    sanityFetch<Config | null>({
      query: configQuery,
      tags: [TAGS.config],
    }),
  ])

  return (
    <ThemeScope roles={pagina?.aparencia}>
      <ScrollProgress />
      <ContatoAbertura abertura={pagina?.abertura} />
      <BriefForm
        eyebrow={pagina?.brief?.eyebrow}
        titulo={pagina?.brief?.titulo}
        submitLabel={pagina?.brief?.submitLabel}
        contatoEmail={config?.contact?.email}
      />
      <ContatoDireto direto={pagina?.direto} contact={config?.contact} />
    </ThemeScope>
  )
}
