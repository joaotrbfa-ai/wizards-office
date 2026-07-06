import { z } from 'zod'

/** Schema único — validado no cliente (UX) e no servidor (segurança). */
export const briefSchema = z.object({
  nome: z.string().trim().min(2, 'Como podemos te chamar?').max(120),
  email: z.string().trim().email('Esse e-mail não parece válido.'),
  empresa: z.string().trim().max(120).optional(),
  telefone: z.string().trim().max(40).optional(),
  mensagem: z
    .string()
    .trim()
    .min(20, 'Conta um pouco mais — pelo menos 20 caracteres.')
    .max(4000),
  /** Honeypot anti-spam: deve permanecer vazio (max evita payload abusivo). */
  website: z.string().max(100).optional(),
})

export type BriefData = z.infer<typeof briefSchema>
