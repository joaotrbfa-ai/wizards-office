import { defineField, defineType } from 'sanity'

export const paginaContato = defineType({
  name: 'paginaContato',
  title: 'Página: Contato',
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
      name: 'brief',
      title: 'Brief (formulário)',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Como começamos' }),
        defineField({ name: 'titulo', title: 'Título', type: 'string', initialValue: 'Comece pela ambição.' }),
        defineField({ name: 'submitLabel', title: 'Texto do botão', type: 'string', initialValue: 'Enviar brief' }),
      ],
    }),
    defineField({
      name: 'direto',
      title: 'Canais diretos',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'titulo', title: 'Título', type: 'string' }),
        defineField({ name: 'emailLabel', title: 'Label do e-mail', type: 'string' }),
        defineField({ name: 'instagramLabel', title: 'Label do Instagram', type: 'string' }),
      ],
    }),
    defineField({
      name: 'fecho',
      title: 'Fecho',
      type: 'object',
      fields: [
        defineField({ name: 'textoScript', title: 'Texto em script', type: 'string' }),
        defineField({
          name: 'captionLinhas',
          title: 'Legenda (uma linha por item)',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'aparencia',
      title: 'Aparência da página (cores)',
      type: 'temaPapeis',
      description: 'Sobrescreve as cores desta página inteira. Vazio = herda do tema global.',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Página: Contato' }) },
})
