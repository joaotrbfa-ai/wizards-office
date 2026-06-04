'use client'

/**
 * Studio do Sanity embutido. Client component: o NextStudio usa React context,
 * que não pode ser avaliado no render do servidor. metadata/viewport ficam na
 * layout (server component) ao lado.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
