import { defineField, defineType } from 'sanity'

const LAYOUTS = [
  { title: 'Full — 1 imagem', value: 'full' },
  { title: 'Split — 2 imagens', value: 'split' },
  { title: 'Assimétrico (esquerda) — 3 imagens', value: 'asymmetric-left' },
  { title: 'Assimétrico (direita) — 3 imagens', value: 'asymmetric-right' },
  { title: 'Trio — 3 imagens', value: 'trio' },
  { title: 'Quarteto — 4 imagens', value: 'quartet' },
] as const

/** Quantidade esperada de imagens por layout (usado em validação de aviso). */
const EXPECTED: Record<string, number> = {
  full: 1,
  split: 2,
  'asymmetric-left': 3,
  'asymmetric-right': 3,
  trio: 3,
  quartet: 4,
}

/**
 * Linha de galeria — union discriminada por `layout`.
 * A contagem de imagens é validada como AVISO (não bloqueia publicação),
 * porque o layout ainda renderiza com contagem divergente.
 */
export const galeriaRow = defineType({
  name: 'galeriaRow',
  title: 'Linha da galeria',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: { list: [...LAYOUTS], layout: 'radio' },
      initialValue: 'full',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{ type: 'galeriaItem' }],
      validation: (rule) =>
        rule
          .custom((images: unknown[] | undefined, context) => {
            const layout = (context.parent as { layout?: string } | undefined)?.layout
            const expected = layout ? EXPECTED[layout] : undefined
            const count = images?.length ?? 0
            if (expected && count !== expected) {
              return `Layout "${layout}" espera ${expected} imagem(ns) — esta linha tem ${count}.`
            }
            return true
          })
          .warning(),
    }),
  ],
  preview: {
    select: { layout: 'layout', images: 'images', media: 'images.0.image' },
    prepare({ layout, images, media }) {
      const count = Array.isArray(images) ? images.length : 0
      return { title: `Linha · ${layout ?? '—'}`, subtitle: `${count} imagem(ns)`, media }
    },
  },
})
