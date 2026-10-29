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
      name: 'imagens',
      title: 'Imagens do feed',
      type: 'array',
      of: [{ type: 'galeriaItem' }],
      description:
        'Feed infinito da galeria. A ordem aqui é a primeira volta; depois o feed recomeça embaralhado. Vazio = usa as linhas antigas abaixo.',
    }),
    defineField({
      name: 'rows',
      title: 'Linhas da galeria (legado)',
      type: 'array',
      of: [{ type: 'galeriaRow' }],
      description: 'Layout antigo em linhas. Só é usado enquanto "Imagens do feed" estiver vazio.',
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
  preview: { prepare: () => ({ title: 'Página: Galeria' }) },
})
