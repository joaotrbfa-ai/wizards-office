import Image from 'next/image'
import Link from 'next/link'
import { Container } from './Container'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { configQuery } from '@/sanity/queries'
import type { Config } from '@/sanity/types'

export async function Footer() {
  const config = await sanityFetch<Config>({ query: configQuery, tags: [TAGS.config] })
  const year = new Date().getFullYear()

  const siteName = config?.siteName ?? 'Wizards Office'
  const brandDescription =
    config?.brandDescription ??
    'Estúdio de visualização arquitetônica. Balneário Camboriú, Santa Catarina.'
  const email = config?.contact?.email ?? 'contato@wizardsoffice.com'
  const instagramUrl = config?.contact?.instagramUrl ?? 'https://www.instagram.com/wizards.office/'
  const instagramHandle = config?.contact?.instagramHandle ?? '@wizards.office'
  const address = config?.contact?.address ?? 'Balneário Camboriú · SC'

  return (
    <footer className="border-t border-cream/10 bg-olive">
      <Container as="div" className="py-section-sm">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-eyebrow text-sand">{siteName}</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
                {brandDescription}
              </p>
            </div>

            <Link
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-3 font-sans text-base uppercase tracking-widest text-cream transition-colors hover:text-terracotta sm:text-lg"
            >
              <span className="border-b border-cream/40 pb-1 group-hover:border-terracotta">
                {email}
              </span>
              <span aria-hidden className="transition-transform duration-500 ease-soft group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 text-[0.72rem] uppercase tracking-widest text-sand sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <Image
                src="/brand/logo-light.png"
                alt="wzds."
                width={1250}
                height={404}
                className="h-6 w-auto"
              />
              <span>{address}</span>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              {instagramHandle}
            </a>

            <span>© {year} {siteName}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
