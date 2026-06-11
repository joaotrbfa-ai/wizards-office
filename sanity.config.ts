import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes, SINGLETON_TYPES } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

const singletonTypes = new Set<string>(SINGLETON_TYPES)
// Singletons só permitem publicar/editar — sem criar, duplicar ou excluir.
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'wizards-office',
  title: 'Wizards Office — Admin',
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Esconde os singletons do menu global "Create new".
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
    // Remove ações de criar/duplicar/excluir nos singletons.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter((action) => action.action && singletonActions.has(action.action))
        : prev,
  },
})
