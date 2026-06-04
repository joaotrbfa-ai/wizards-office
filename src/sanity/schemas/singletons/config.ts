import { defineField, defineType } from 'sanity'

export const config = defineType({
  name: 'config',
  title: 'Configurações do site',
  type: 'document',
  // Singleton: create/delete são removidos via document.actions em sanity.config.ts.
  fields: [
    defineField({ name: 'siteName', title: 'Nome do site', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'brandDescription', title: 'Descrição da marca', type: 'text', rows: 3 }),
    defineField({
      name: 'contact',
      title: 'Contato',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'E-mail', type: 'string' }),
        defineField({ name: 'telefone', title: 'Telefone', type: 'string' }),
        defineField({ name: 'instagramUrl', title: 'URL do Instagram', type: 'url' }),
        defineField({ name: 'instagramHandle', title: 'Handle do Instagram', type: 'string' }),
        defineField({ name: 'address', title: 'Endereço', type: 'string' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'defaultTitle', title: 'Título padrão', type: 'string' }),
        defineField({ name: 'titleTemplate', title: 'Template de título', type: 'string' }),
        defineField({ name: 'defaultDescription', title: 'Descrição padrão', type: 'text', rows: 3 }),
        defineField({
          name: 'ogImage',
          title: 'Imagem OG',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Configurações do site' }) },
})
