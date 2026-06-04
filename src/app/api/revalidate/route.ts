import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Webhook de revalidação on-demand do Sanity.
 * Configurado em: sanity.io → API → Webhooks (mesmo secret de SANITY_REVALIDATE_SECRET).
 */
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ error: 'Missing _type' }, { status: 400 })
    }

    const tag = `sanity:${body._type}`
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown' },
      { status: 500 },
    )
  }
}
