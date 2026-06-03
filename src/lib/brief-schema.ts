import { z } from 'zod'

/** Opções do brief — usadas no schema e na UI (radios/checkboxes). */
export const TIPOS_PROJETO = [
  'Residencial multifamiliar',
  'Residencial unifamiliar',
  'Hospitalidade',
  'Corporativo',
  'Urbanismo',
  'Outro',
] as const

export const SERVICOS_BRIEF = [
  'Fotografia / CGI',
  'Design de fachada',
  'Design de interiores',
  'Filmes',
  'Plantas humanizadas',
  'Tour 360',
  'Design gráfico',
] as const

export const PRAZOS = [
  'Até 30 dias',
  '30 a 60 dias',
  '60 a 90 dias',
  'Sem prazo definido',
] as const

/** Schema único — validado no cliente (UX) e no servidor (segurança). */
export const briefSchema = z.object({
  nome: z.string().trim().min(2, 'Como podemos te chamar?').max(120),
  email: z.string().trim().email('Esse e-mail não parece válido.'),
  empresa: z.string().trim().max(120).optional(),
  telefone: z.string().trim().max(40).optional(),
  tipoProjeto: z.enum(TIPOS_PROJETO, {
    message: 'Selecione um tipo.',
  }),
  servicos: z.array(z.enum(SERVICOS_BRIEF)).min(1, 'Pelo menos um serviço.'),
  prazo: z.enum(PRAZOS).optional(),
  mensagem: z
    .string()
    .trim()
    .min(20, 'Conta um pouco mais — pelo menos 20 caracteres.')
    .max(4000),
  /** Honeypot anti-spam: deve permanecer vazio. */
  website: z.string().optional(),
})

export type BriefData = z.infer<typeof briefSchema>
