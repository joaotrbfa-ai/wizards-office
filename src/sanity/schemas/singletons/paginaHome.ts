import { defineField, defineType } from 'sanity'

export const paginaHome = defineType({
  name: 'paginaHome',
  title: 'Página: Home',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'videoUrl', title: 'URL do vídeo', type: 'url' }),
        defineField({
          name: 'fraseHead',
          title: 'Frase principal',
          type: 'string',
          initialValue: 'Crafting spaces that feel like',
        }),
        defineField({
          name: 'fraseScript',
          title: 'Frase em script',
          type: 'string',
          initialValue: 'magic.',
        }),
        defineField({
          name: 'poster',
          title: 'Poster (fallback do vídeo)',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'manifestoTextoParagrafos',
      title: 'Manifesto — parágrafos',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: 'pausaScript',
      title: 'Pausa (script)',
      type: 'object',
      fields: [
        defineField({ name: 'texto', title: 'Texto', type: 'string', initialValue: 'magic.' }),
        defineField({ name: 'caption', title: 'Legenda', type: 'string' }),
      ],
    }),
    defineField({ name: 'ctaFinal', title: 'CTA final', type: 'ctaBlock' }),
    defineField({
      name: 'aparencia',
      title: 'Aparência da página (cores)',
      type: 'temaPapeis',
      description: 'Sobrescreve as cores desta página inteira. Vazio = herda do tema global.',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Home' }) },
})
