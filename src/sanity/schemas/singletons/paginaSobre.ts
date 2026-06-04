import { defineField, defineType } from 'sanity'

export const paginaSobre = defineType({
  name: 'paginaSobre',
  title: 'Página: Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'abertura',
      title: 'Abertura',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({
          name: 'tituloLinhas',
          title: 'Título (uma linha por item)',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'subtitulo', title: 'Subtítulo', type: 'string' }),
        defineField({
          name: 'image',
          title: 'Imagem',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'manifesto',
      title: 'Manifesto',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'titulo', title: 'Título', type: 'string' }),
        defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 5 }),
      ],
    }),
    defineField({
      name: 'numeros',
      title: 'Números',
      type: 'array',
      of: [{ type: 'metricaSobre' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Sobre' }) },
})
