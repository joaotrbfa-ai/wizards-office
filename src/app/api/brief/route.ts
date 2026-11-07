import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { briefSchema } from '@/lib/brief-schema'

export const runtime = 'nodejs'

// Rate-limit em memória, POR INSTÂNCIA: cada função serverless tem o próprio Map,
// zerado a cada cold start. Não é um teto global de envios (nem da cota do Resend);
// para isso seria preciso um store compartilhado (ex.: Upstash/Redis).
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const MAX_BODY_BYTES = 50_000
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

/**
 * IP do cliente definido pela borda da Vercel, que sobrescreve esses headers (o
 * cliente não consegue forjá-los). `request.ip` não existe no runtime nodejs do
 * Next 14. Não usa X-Forwarded-For: fora da Vercel (`next start`) ele vem do cliente.
 * Sem o header (dev local / self-hosted), cai num bucket único compartilhado.
 */
function clientIp(req: Request): string {
  const header = req.headers.get('x-vercel-forwarded-for') ?? req.headers.get('x-real-ip')
  return header?.split(',')[0]?.trim() || 'unknown'
}

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
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload muito grande.' }, { status: 413 })
    }
    body = JSON.parse(raw)
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
      return NextResponse.json({ error: 'Falha ao enviar o e-mail.' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ error: 'Falha ao enviar o e-mail.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
