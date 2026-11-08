/**
 * Allowlist de destinos de link vindos do CMS: caminho relativo à raiz ("/contato")
 * ou URL absoluta http(s). Recusa javascript:, data:, mailto: etc. e também
 * "//host" e "/\host", que o navegador trata como URL de outro domínio.
 */
const SAFE_HREF = /^(?:\/(?![/\\])|https?:\/\/)/i

export function isSafeHref(href: unknown): href is string {
  return typeof href === 'string' && SAFE_HREF.test(href)
}
