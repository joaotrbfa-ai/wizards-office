import Link from 'next/link'
import { Container } from './Container'
import { CONTACT } from '@/lib/nav'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cream/10 bg-olive">
      <Container as="div" className="py-section-sm">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-eyebrow text-sand">Wizards Office</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
                Estúdio de visualização arquitetônica. Balneário Camboriú, Santa Catarina.
              </p>
            </div>

            <Link
              href={`mailto:${CONTACT.email}`}
              className="group inline-flex items-center gap-3 font-sans text-base uppercase tracking-widest text-cream transition-colors hover:text-terracotta sm:text-lg"
            >
              <span className="border-b border-cream/40 pb-1 group-hover:border-terracotta">
                {CONTACT.email}
              </span>
              <span aria-hidden className="transition-transform duration-500 ease-soft group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 text-[0.72rem] uppercase tracking-widest text-sand sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <span className="font-serif text-xl normal-case tracking-normal text-cream">
                wzds<span className="text-terracotta">.</span>
              </span>
              <span>Balneário Camboriú · SC</span>
            </div>

            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              {CONTACT.instagramHandle}
            </a>

            <span>© {year} Wizards Office</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
