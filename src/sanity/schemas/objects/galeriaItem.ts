import { defineField, defineType } from 'sanity'

/** Item reusável de galeria: imagem com hotspot + alt obrigatório e legenda opcional. */
export const galeriaItem = defineType({
  name: 'galeriaItem',
  title: 'Imagem',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Descrição da imagem para acessibilidade e SEO.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Legenda',
      type: 'string',
      description: 'Contexto curto opcional (exibido em alguns layouts).',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'image.alt', subtitle: 'caption' },
    prepare({ media, title, subtitle }) {
      return { media, title: title || 'Imagem', subtitle }
    },
  },
})
