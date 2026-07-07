export type NavItem = {
  label: string
  href: string
}

// Menu da landing: âncoras para as seções da Home (o HashScroll cuida do
// scroll suave, inclusive vindo de outra página via `/#secao`).
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/#manifesto' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Contato', href: '/#contato' },
]

export const CONTACT = {
  email: 'contato@wizardsoffice.com',
  instagram: 'https://www.instagram.com/wizards.office/',
  instagramHandle: '@wizards.office',
} as const
