import { defineField, defineType } from 'sanity'

/** Bloco de CTA reusável (fecho de página com imagem de fundo + título em linhas). */
export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Bloco de CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagem de fundo',
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
      name: 'tituloLinhas',
      title: 'Título (uma linha por item)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cada item é renderizado como uma linha do título.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texto do botão',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Destino do botão',
      type: 'string',
      description: 'Rota interna (ex.: /contato).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mostrarScriptMagic',
      title: 'Mostrar "magic." em script',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { media: 'image', linhas: 'tituloLinhas', subtitle: 'ctaLabel' },
    prepare({ media, linhas, subtitle }) {
      return {
        media,
        title: Array.isArray(linhas) ? linhas.join(' ') : 'Bloco de CTA',
        subtitle,
      }
    },
  },
})
