import Image from 'next/image'
import Link from 'next/link'
import { Container } from './Container'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { configQuery } from '@/sanity/queries'
import type { Config } from '@/sanity/types'

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=5547997196922'
const WHATSAPP_LABEL = '+55 47 99719-6922'

export async function Footer() {
  const config = await sanityFetch<Config>({ query: configQuery, tags: [TAGS.config] })

  const email = config?.contact?.email ?? 'contato@wizardsoffice.com'
  const instagramUrl = config?.contact?.instagramUrl ?? 'https://www.instagram.com/wizards.office/'
  const instagramHandle = config?.contact?.instagramHandle ?? '@wizards.office'

  return (
    <footer className="border-t border-cream/10 bg-olive">
      <Container as="div" className="py-section-sm">
        <div className="flex flex-col gap-12">
          {/* Logo centralizada no topo */}
          <div className="flex justify-center">
            <Image
              src="/brand/logo-light.png"
              alt="wzds."
              width={1250}
              height={404}
              className="h-8 w-auto"
            />
          </div>

          {/* WhatsApp · Instagram (centro, alinhado à logo) · E-mail */}
          <div className="grid grid-cols-1 gap-6 border-t border-cream/10 pt-8 text-[0.72rem] uppercase tracking-widest text-muted sm:grid-cols-3 sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              {WHATSAPP_LABEL}
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream sm:text-center"
            >
              {instagramHandle}
            </a>

            <Link
              href={`mailto:${email}`}
              className="text-cream transition-colors hover:text-terracotta sm:text-right"
            >
              {email}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
