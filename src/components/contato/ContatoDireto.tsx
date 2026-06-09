import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import type { PaginaContato, Config } from '@/sanity/types'

type Canal = { label: string; valor: string; href?: string; external?: boolean }

export function ContatoDireto({
  direto,
  contact,
}: {
  direto?: PaginaContato['direto']
  contact?: Config['contact']
}) {
  const eyebrow = direto?.eyebrow ?? 'Canais diretos'
  const titulo = direto?.titulo ?? 'Ou fale direto.'
  const emailLabel = direto?.emailLabel ?? 'E-mail'
  const instagramLabel = direto?.instagramLabel ?? 'Instagram'

  const email = contact?.email ?? 'contato@wizardsoffice.com'
  const instagramUrl = contact?.instagramUrl ?? 'https://www.instagram.com/wizards.office/'
  const instagramHandle = contact?.instagramHandle ?? '@wizards.office'
  const address = contact?.address ?? 'Balneário Camboriú · SC'

  const canais: Canal[] = [
    { label: emailLabel, valor: email, href: `mailto:${email}` },
    {
      label: instagramLabel,
      valor: instagramHandle,
      href: instagramUrl,
      external: true,
    },
    { label: 'Estúdio', valor: address },
  ]

  return (
    <Scene tone="ink" minHeight="auto" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">{eyebrow}</p>
          <h2 className="mt-6 font-sans text-[clamp(1.55rem,3vw,2.3rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
            {titulo}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-px border-t border-sand/20 sm:grid-cols-3">
          {canais.map((canal) => (
            <Reveal key={canal.label} className="border-b border-sand/20 py-8">
              <p className="text-xs uppercase tracking-[0.25em] text-muted">{canal.label}</p>
              {canal.href ? (
                <a
                  href={canal.href}
                  target={canal.external ? '_blank' : undefined}
                  rel={canal.external ? 'noopener noreferrer' : undefined}
                  className="group mt-3 inline-flex items-center gap-2 font-sans text-lg uppercase tracking-wide text-cream transition-colors hover:text-terracotta"
                >
                  <span className="border-b border-cream/30 pb-1 group-hover:border-terracotta">
                    {canal.valor}
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-soft group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ) : (
                <p className="mt-3 font-sans text-lg uppercase tracking-wide text-cream">
                  {canal.valor}
                </p>
              )}
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
