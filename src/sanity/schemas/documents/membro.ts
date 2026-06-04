import { defineField, defineType } from 'sanity'

export const membro = defineType({
  name: 'membro',
  title: 'Membro da equipe',
  type: 'document',
  fields: [
    defineField({
      name: 'numero',
      title: 'Número',
      type: 'string',
      description: 'Dois dígitos (ex.: 01 … 05).',
      validation: (rule) => rule.required().regex(/^\d{2}$/, { name: 'dois dígitos' }),
    }),
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cargo',
      title: 'Cargo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'extra',
      title: 'Credencial extra',
      type: 'string',
      description: 'Linha adicional opcional (ex.: "Arquiteto · +10 anos · Design de Fachada").',
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
  ],
  orderings: [
    { title: 'Número', name: 'numeroAsc', by: [{ field: 'numero', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nome', subtitle: 'cargo', media: 'foto' },
  },
})
