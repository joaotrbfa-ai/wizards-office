import type { ReactNode } from 'react'
import { viewport as studioViewport } from 'next-sanity/studio'

export const metadata = {
  title: 'Wizards Office — Admin',
  robots: { index: false, follow: false },
}

// Viewport recomendado pelo next-sanity para a UI do Studio.
export const viewport = studioViewport

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
