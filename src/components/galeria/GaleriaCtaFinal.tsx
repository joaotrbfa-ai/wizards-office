import { CtaFinal } from '@/components/shared/CtaFinal'

export function GaleriaCtaFinal() {
  return (
    <CtaFinal
      image="/projects/wow-ppt-002-wineclub.jpg"
      alt="Ambiente Wizards Office"
      titulo={['Vamos conversar', 'sobre o seu?']}
      subtitulo="Conte sobre seu projeto. Respondemos em até 48h úteis."
      href="/contato"
      ctaLabel="Reconhece seu projeto?"
    />
  )
}
