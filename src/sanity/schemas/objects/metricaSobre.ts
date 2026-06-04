import { defineField, defineType } from 'sanity'

/** Métrica da página Sobre — número de destaque ou frase curta. */
export const metricaSobre = defineType({
  name: 'metricaSobre',
  title: 'Métrica',
  type: 'object',
  fields: [
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Número', value: 'numero' },
          { title: 'Frase', value: 'frase' },
        ],
        layout: 'radio',
      },
      initialValue: 'numero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'valor',
      title: 'Valor',
      type: 'string',
      description: 'Ex.: "+10", "∞" ou "Empreendimentos".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Legenda',
      type: 'string',
      description: 'Ex.: "Anos de mercado" ou "em três estados".',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'valor', subtitle: 'label' },
  },
})
