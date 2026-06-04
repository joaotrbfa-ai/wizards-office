import { defineField, defineType } from 'sanity'

const CATEGORIAS = [
  'Residencial multifamiliar',
  'Residencial unifamiliar',
  'Hospitalidade',
  'Corporativo',
  'Urbanismo',
]

export const projeto = defineType({
  name: 'projeto',
  title: 'Projeto',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: { list: CATEGORIAS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (rule) => rule.required().min(2010).max(2035).integer(),
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galeria',
      title: 'Galeria',
      type: 'array',
      of: [{ type: 'galeriaItem' }],
      description: '3-5 imagens grandes para o corpo do case.',
    }),
    defineField({
      name: 'resumo',
      title: 'Resumo',
      type: 'string',
      description: 'Frase curta editorial para overlay/listagem.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destaque',
      title: 'Destaque (aparece na Home)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem manual',
      type: 'number',
      description: 'Controla a ordem de exibição (crescente). Opcional.',
    }),
  ],
  orderings: [
    {
      title: 'Ordem manual',
      name: 'ordemAsc',
      by: [{ field: 'ordem', direction: 'asc' }],
    },
    {
      title: 'Ano (mais recente)',
      name: 'anoDesc',
      by: [{ field: 'ano', direction: 'desc' }],
    },
    {
      title: 'Alfabética',
      name: 'nomeAsc',
      by: [{ field: 'nome', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'nome', categoria: 'categoria', ano: 'ano', media: 'coverImage' },
    prepare({ title, categoria, ano, media }) {
      return { title, subtitle: [categoria, ano].filter(Boolean).join(' · '), media }
    },
  },
})
