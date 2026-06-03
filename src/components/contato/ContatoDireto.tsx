import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { CONTACT } from '@/lib/nav'

type Canal = { label: string; valor: string; href?: string; external?: boolean }

const CANAIS: Canal[] = [
  { label: 'E-mail', valor: CONTACT.email, href: `mailto:${CONTACT.email}` },
  {
    label: 'Instagram',
    valor: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    external: true,
  },
  { label: 'Estúdio', valor: 'Balneário Camboriú · SC' },
]

export function ContatoDireto() {
  return (
    <Scene tone="ink" minHeight="auto" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-sand">Canais diretos</p>
          <h2 className="mt-6 font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
            Ou fale direto.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-px border-t border-sand/20 sm:grid-cols-3">
          {CANAIS.map((canal) => (
            <Reveal key={canal.label} className="border-b border-sand/20 py-8">
              <p className="text-xs uppercase tracking-[0.25em] text-sand">{canal.label}</p>
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
