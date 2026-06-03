import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { briefSchema } from '@/lib/brief-schema'

export const runtime = 'nodejs'

/** Escapa texto do usuário antes de interpolar no HTML do e-mail. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function linha(label: string, valor?: string): string {
  if (!valor) return ''
  return `<p style="margin:0 0 8px"><strong>${label}:</strong> ${esc(valor)}</p>`
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const parsed = briefSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', issues: parsed.error.flatten() },
      { status: 422 },
    )
  }
  const data = parsed.data

  // Honeypot preenchido → trata como spam, mas responde sucesso (não vaza a checagem).
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Serviço de e-mail não configurado.' },
      { status: 500 },
    )
  }

  const from = process.env.BRIEF_FROM_EMAIL ?? 'Wizards Office <onboarding@resend.dev>'
  const to = process.env.BRIEF_TO_EMAIL ?? 'contato@wizardsoffice.com'

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#2d2d2d;line-height:1.5">
      <h2 style="margin:0 0 16px">Novo brief — ${esc(data.nome)}</h2>
      ${linha('Nome', data.nome)}
      ${linha('E-mail', data.email)}
      ${linha('Empresa', data.empresa)}
      ${linha('Telefone', data.telefone)}
      ${linha('Tipo de projeto', data.tipoProjeto)}
      ${linha('Serviços', data.servicos.join(', '))}
      ${linha('Prazo', data.prazo)}
      <p style="margin:16px 0 8px"><strong>Mensagem:</strong></p>
      <p style="margin:0;white-space:pre-wrap">${esc(data.mensagem)}</p>
    </div>
  `

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Novo brief — ${data.nome}`,
      html,
    })
    if (error) {
      console.error('[brief] Resend error:', error)
      return NextResponse.json(
        {
          error: 'Falha ao enviar o e-mail.',
          // DEBUG temporário — remover depois que estabilizar
          detail: {
            name: error.name,
            message: error.message,
            from,
            to,
          },
        },
        { status: 502 },
      )
    }
  } catch (err) {
    console.error('[brief] Unexpected error:', err)
    return NextResponse.json(
      {
        error: 'Falha ao enviar o e-mail.',
        // DEBUG temporário — remover depois que estabilizar
        detail: err instanceof Error ? { name: err.name, message: err.message } : String(err),
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
