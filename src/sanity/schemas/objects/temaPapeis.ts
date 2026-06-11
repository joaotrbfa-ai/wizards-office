import { defineField, defineType } from 'sanity'

/**
 * Override de cores por papel. Todos os campos são opcionais — vazio HERDA do
 * nível acima (seção herda da página; página herda do tema global). Reusado em:
 * config (ajuste fino global), páginas (campo "aparencia") e seções.
 */
export const temaPapeis = defineType({
  name: 'temaPapeis',
  title: 'Cores',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'surface', title: 'Fundo', type: 'color', options: { disableAlpha: true } }),
    defineField({ name: 'heading', title: 'Títulos', type: 'color', options: { disableAlpha: true } }),
    defineField({ name: 'body', title: 'Texto principal', type: 'color', options: { disableAlpha: true } }),
    defineField({ name: 'label', title: 'Texto secundário', type: 'color', options: { disableAlpha: true } }),
    defineField({ name: 'accent', title: 'Destaque', type: 'color', options: { disableAlpha: true } }),
  ],
})
