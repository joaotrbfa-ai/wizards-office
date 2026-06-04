import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'

/** Conteúdo da página 404, compartilhado entre o not-found global e o do (site). */
export function NotFoundContent() {
  return (
    <Section tone="olive" spacing="lg" className="page-pad-top">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-balance">Página não encontrada.</h1>
      <p className="mt-8 max-w-prose text-lg text-cream/80">
        O endereço que você procura não existe ou foi movido.
      </p>
      <div className="mt-10">
        <Button href="/" variant="outline" size="lg">
          Voltar ao início
        </Button>
      </div>
    </Section>
  )
}
