import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { ContatoAbertura } from '@/components/contato/ContatoAbertura'
import { BriefForm } from '@/components/contato/BriefForm'
import { ContatoDireto } from '@/components/contato/ContatoDireto'
import { ContatoFecho } from '@/components/contato/ContatoFecho'

export const metadata: Metadata = {
  title: {
    absolute: 'Contato — Wizards Office',
  },
  description:
    'Comece um brief com o Wizards Office. Visualização arquitetônica de alto padrão em Balneário Camboriú.',
}

export default function ContatoPage() {
  return (
    <>
      <ScrollProgress />
      <ContatoAbertura />
      <BriefForm />
      <ContatoDireto />
      <ContatoFecho />
    </>
  )
}
