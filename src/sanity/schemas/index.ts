import type { SchemaTypeDefinition } from 'sanity'

// Objects (reusáveis)
import { ctaBlock } from './objects/ctaBlock'
import { galeriaItem } from './objects/galeriaItem'
import { galeriaRow } from './objects/galeriaRow'
import { metricaSobre } from './objects/metricaSobre'
import { temaPapeis } from './objects/temaPapeis'

// Documents (listáveis)
import { projeto } from './documents/projeto'
import { pilar } from './documents/pilar'
import { servico } from './documents/servico'
import { etapaProcesso } from './documents/etapaProcesso'
import { membro } from './documents/membro'
import { parceiro } from './documents/parceiro'

// Singletons (conteúdo de páginas)
import { config } from './singletons/config'
import { paginaHome } from './singletons/paginaHome'
import { paginaSobre } from './singletons/paginaSobre'
import { paginaServicos } from './singletons/paginaServicos'
import { paginaProjetos } from './singletons/paginaProjetos'
import { paginaGaleria } from './singletons/paginaGaleria'
import { paginaContato } from './singletons/paginaContato'

/** IDs dos singletons — usados pelo structure builder e pela migração. */
export const SINGLETON_TYPES = [
  'config',
  'paginaHome',
  'paginaSobre',
  'paginaServicos',
  'paginaProjetos',
  'paginaGaleria',
  'paginaContato',
] as const

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  ctaBlock,
  galeriaItem,
  galeriaRow,
  metricaSobre,
  temaPapeis,
  // documents
  projeto,
  pilar,
  servico,
  etapaProcesso,
  membro,
  parceiro,
  // singletons
  config,
  paginaHome,
  paginaSobre,
  paginaServicos,
  paginaProjetos,
  paginaGaleria,
  paginaContato,
]
