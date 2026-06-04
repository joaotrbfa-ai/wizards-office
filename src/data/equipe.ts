/**
 * @deprecated Source-of-truth migrado para o Sanity em 2026-06-04 (Fase D).
 * O site lê via src/sanity/queries.ts. Mantido como referência histórica /
 * rollback e para o script scripts/migrate-to-sanity.ts.
 */
export type Membro = {
  numero: string
  nome: string
  cargo: string
  /** Usado para a foto futura em /public/team/<slug>.jpg. */
  slug: string
  /** Credencial extra (linha adicional). */
  extra?: string
}

export const MEMBROS: Membro[] = [
  {
    numero: '01',
    nome: 'Lucas Berth',
    cargo: 'CEO',
    slug: 'lucas',
    extra: 'Arquiteto · +10 anos · Design de Fachada',
  },
  { numero: '02', nome: 'Matheus Griza', cargo: 'Diretor de Arte', slug: 'matheus' },
  { numero: '03', nome: 'Renata Schmitt', cargo: 'Diretora Operacional', slug: 'renata' },
  { numero: '04', nome: 'Mylena Yumi', cargo: 'Arquiteta e Artista 3D', slug: 'mylena' },
  { numero: '05', nome: 'Renner Coelho', cargo: 'Artista 3D', slug: 'renner' },
]
