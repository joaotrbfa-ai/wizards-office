import type { MetadataRoute } from 'next'

const BASE = 'https://wizardsoffice.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dev/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
