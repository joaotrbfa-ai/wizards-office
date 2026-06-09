import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { HashScroll } from '@/components/scroll/HashScroll'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cream focus:px-4 focus:py-2 focus:text-olive"
      >
        Pular para o conteúdo
      </a>

      <MotionProvider>
        <HashScroll />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </MotionProvider>
    </div>
  )
}
