import { defineField, defineType } from 'sanity'
import { OVERLAY_OPTIONS, POSITION_OPTIONS } from '../_shared'

export const pilar = defineType({
  name: 'pilar',
  title: 'Pilar',
  type: 'document',
  fields: [
    defineField({
      name: 'numero',
      title: 'Número',
      type: 'string',
      description: 'Dois dígitos (ex.: 01, 02, 03).',
      validation: (rule) => rule.required().regex(/^\d{2}$/, { name: 'dois dígitos' }),
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
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
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'position',
      title: 'Posição do texto',
      type: 'string',
      options: { list: [...POSITION_OPTIONS] },
      initialValue: 'bottom-left',
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay',
      type: 'string',
      options: { list: [...OVERLAY_OPTIONS] },
      initialValue: 'strong',
    }),
  ],
  orderings: [
    { title: 'Número', name: 'numeroAsc', by: [{ field: 'numero', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'titulo', numero: 'numero', media: 'image' },
    prepare({ title, numero, media }) {
      return { title, subtitle: numero ? `${numero} — Pilar` : 'Pilar', media }
    },
  },
})
