import { defineField, defineType } from 'sanity'
import { CUSTOM_THEME_ID, DEFAULT_PRESET_ID, THEME_PRESETS, THEME_SLOTS } from '@/lib/themes'

/** Rótulos amigáveis por slot para os color pickers do tema personalizado. */
const SLOT_LABELS: Record<(typeof THEME_SLOTS)[number], string> = {
  olive: 'Fundo principal',
  ink: 'Fundo alternativo (escuro)',
  cream: 'Texto principal',
  muted: 'Texto secundário',
  sand: 'Texto secundário (alt)',
  terracotta: 'Destaque / acento',
}

export const config = defineType({
  name: 'config',
  title: 'Configurações do site',
  type: 'document',
  // Singleton: create/delete são removidos via document.actions em sanity.config.ts.
  fields: [
    defineField({ name: 'siteName', title: 'Nome do site', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'brandDescription', title: 'Descrição da marca', type: 'text', rows: 3 }),
    defineField({
      name: 'contact',
      title: 'Contato',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'E-mail', type: 'string' }),
        defineField({ name: 'telefone', title: 'Telefone', type: 'string' }),
        defineField({ name: 'instagramUrl', title: 'URL do Instagram', type: 'url' }),
        defineField({ name: 'instagramHandle', title: 'Handle do Instagram', type: 'string' }),
        defineField({ name: 'address', title: 'Endereço', type: 'string' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'defaultTitle', title: 'Título padrão', type: 'string' }),
        defineField({ name: 'titleTemplate', title: 'Template de título', type: 'string' }),
        defineField({ name: 'defaultDescription', title: 'Descrição padrão', type: 'text', rows: 3 }),
        defineField({
          name: 'ogImage',
          title: 'Imagem OG',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Aparência (cores do site)',
      type: 'object',
      description:
        'Escolha um esquema pronto ou selecione "Personalizado" para definir cada cor manualmente.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'preset',
          title: 'Esquema de cores',
          type: 'string',
          initialValue: DEFAULT_PRESET_ID,
          options: {
            layout: 'radio',
            list: [
              ...THEME_PRESETS.map((p) => ({ title: p.label, value: p.id })),
              { title: 'Personalizado', value: CUSTOM_THEME_ID },
            ],
          },
        }),
        defineField({
          name: 'custom',
          title: 'Cores personalizadas',
          type: 'object',
          description:
            'Usado apenas quando o esquema é "Personalizado". Garanta contraste entre o fundo e o texto.',
          hidden: ({ parent }) => parent?.preset !== CUSTOM_THEME_ID,
          options: { columns: 2 },
          fields: THEME_SLOTS.map((slot) =>
            defineField({
              name: slot,
              title: SLOT_LABELS[slot],
              type: 'color',
              options: { disableAlpha: true },
            }),
          ),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Configurações do site' }) },
})
