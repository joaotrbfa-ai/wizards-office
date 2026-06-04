import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './src/sanity/env'

export default defineConfig({
  name: 'wizards-office',
  title: 'Wizards Office — Admin',
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    // Schemas reais vêm na Fase C. Por agora, lista vazia mas válida.
    types: [],
  },
})
