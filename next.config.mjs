const isDev = process.env.NODE_ENV !== 'production'

// O Next carrega os .env* antes de ler este arquivo. Sem projectId/dataset não dá
// para restringir o otimizador ao projeto, então falha em vez de liberar o host todo.
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET
if (!sanityProjectId || !sanityDataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET (images.remotePatterns)',
  )
}

/** @type {import('next/dist/shared/lib/image-config').RemotePattern[]} */
const remotePatterns = [
  // Só imagens do próprio projeto/dataset (urlFor gera /images/<projectId>/<dataset>/...).
  // Sem `search`: urlFor adiciona query (auto, fit, w) que varia por uso.
  {
    protocol: 'https',
    hostname: 'cdn.sanity.io',
    pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
  },
]
// Unsplash só é usado em /dev/scroll-demo; fora do dev não entra no otimizador.
if (isDev) {
  remotePatterns.push({
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/photo-*',
  })
}

// CSP em Report-Only: o navegador só avisa no console, não bloqueia nada.
// Serve para observar violações antes de virar a CSP de verdade.
// 'unsafe-inline' em script-src: o App Router injeta scripts inline sem nonce.
// 'unsafe-eval' só no dev (React Refresh / source maps do webpack).
const siteCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  // Vídeo do hero vem de um CDN externo configurado no Sanity.
  "media-src 'self' https://cdn.sanity.io https://cloud-1de12d.becdn.net",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

// O Studio do Sanity em /admin fala com a API do Sanity (HTTP e WebSocket),
// usa workers via blob: e mostra avatares de provedores de login.
const studioCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io",
  "worker-src 'self' blob:",
  "frame-src 'self' https://*.sanity.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://*.sanity.io",
  "object-src 'none'",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // styled-components é peer-dep do Sanity Studio (CSS-in-JS).
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy-Report-Only', value: siteCsp },
        ],
      },
      {
        // Mesma chave numa regra posterior sobrescreve a anterior.
        source: '/admin/:path*',
        headers: [{ key: 'Content-Security-Policy-Report-Only', value: studioCsp }],
      },
    ]
  },
}

export default nextConfig
