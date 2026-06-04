import type { Metadata, Viewport } from 'next'
import { script, serif } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://wizardsoffice.com'),
  title: {
    default: 'Wizards Office · Visualização arquitetônica de alto padrão',
    template: '%s · wzds.',
  },
  description:
    'Estúdio de visualização arquitetônica em Balneário Camboriú. Imagens, vídeos e experiências que carregam o peso do design.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Wizards Office',
    title: 'Wizards Office',
    description:
      'Estúdio de visualização arquitetônica em Balneário Camboriú. Imagens, vídeos e experiências que carregam o peso do design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wizards Office — Crafting spaces that feel like magic.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wizards Office',
    description: 'Visualização arquitetônica de alto padrão em Balneário Camboriú.',
    images: ['/og-image.jpg'],
  },
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
