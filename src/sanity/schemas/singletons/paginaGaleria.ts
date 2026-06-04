import { defineField, defineType } from 'sanity'

export const paginaGaleria = defineType({
  name: 'paginaGaleria',
  title: 'Página: Galeria',
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
      name: 'rows',
      title: 'Linhas da galeria',
      type: 'array',
      of: [{ type: 'galeriaRow' }],
    }),
    defineField({ name: 'ctaFinal', title: 'CTA final', type: 'ctaBlock' }),
  ],
  preview: { prepare: () => ({ title: 'Página: Galeria' }) },
})
