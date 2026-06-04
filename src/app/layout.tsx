import type { Metadata, Viewport } from 'next'
import { script, serif } from '@/lib/fonts'
import { sanityFetch, TAGS } from '@/sanity/fetch'
import { configQuery } from '@/sanity/queries'
import { imageProps } from '@/sanity/image'
import type { Config } from '@/sanity/types'
import './globals.css'

const FALLBACK = {
  defaultTitle: 'Wizards Office · Visualização arquitetônica de alto padrão',
  titleTemplate: '%s · wzds.',
  description:
    'Estúdio de visualização arquitetônica em Balneário Camboriú. Imagens, vídeos e experiências que carregam o peso do design.',
  siteName: 'Wizards Office',
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await sanityFetch<Config>({ query: configQuery, tags: [TAGS.config] })
  const seo = config?.seo

  const defaultTitle = seo?.defaultTitle ?? FALLBACK.defaultTitle
  const description = seo?.defaultDescription ?? FALLBACK.description
  const siteName = config?.siteName ?? FALLBACK.siteName
  const ogImage = seo?.ogImage ? imageProps(seo.ogImage, 1200).src : '/og-image.jpg'

  return {
    metadataBase: new URL('https://wizardsoffice.com'),
    title: {
      default: defaultTitle,
      template: seo?.titleTemplate ?? FALLBACK.titleTemplate,
    },
    description,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName,
      title: siteName,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Wizards Office — Crafting spaces that feel like magic.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: 'Visualização arquitetônica de alto padrão em Balneário Camboriú.',
      images: [ogImage],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#575549',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${script.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
