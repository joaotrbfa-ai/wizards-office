import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { NotFoundContent } from '@/components/NotFoundContent'
import { MotionProvider } from '@/components/providers/MotionProvider'

// 404 global: capturado para URLs que não casam com nenhuma rota.
// Renderiza só dentro do root layout (mínimo), então embute o chrome do site
// para manter Header/Footer — espelha o (site)/layout.tsx.
export default function NotFound() {
  return (
    <div className="min-h-screen">
      <MotionProvider>
        <Header />
        <main id="conteudo">
          <NotFoundContent />
        </main>
        <Footer />
      </MotionProvider>
    </div>
  )
}
