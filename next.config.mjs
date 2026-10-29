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
if (process.env.NODE_ENV !== 'production') {
  remotePatterns.push({
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/photo-*',
  })
}

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
  // Security headers (CSP omitido de propósito: precisa de tuning fino por causa
  // do Sanity Studio em /admin com styled-components/inline; tratar separadamente).
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
        ],
      },
    ]
  },
}

export default nextConfig
