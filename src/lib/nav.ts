export type NavItem = {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Contato', href: '/contato' },
]

export const CONTACT = {
  email: 'contato@wizardsoffice.com',
  instagram: 'https://www.instagram.com/wizards.office/',
  instagramHandle: '@wizards.office',
} as const
