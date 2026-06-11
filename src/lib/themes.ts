/**
 * Esquemas de cor do site.
 *
 * Fonte única de verdade compartilhada entre o Sanity Studio (dropdown de
 * presets + color pickers) e o site (injeção das CSS variables no <head>).
 *
 * Os 6 slots espelham os tokens definidos em src/app/globals.css. Cada slot tem
 * um PAPEL fixo na UI — ao criar presets, respeite a função de cada um para não
 * quebrar contraste/legibilidade:
 *   - olive       → fundo principal (body)
 *   - ink         → fundo alternativo (mais escuro)
 *   - cream       → texto principal (sobre o fundo)
 *   - muted/sand  → texto secundário
 *   - terracotta  → destaque/acento (links, seleção)
 */

export const THEME_SLOTS = ['cream', 'sand', 'olive', 'terracotta', 'ink', 'muted'] as const

export type ThemeSlot = (typeof THEME_SLOTS)[number]
export type ThemeColors = Record<ThemeSlot, string> // valores HEX (#RRGGBB)

export type ThemePreset = {
  id: string
  label: string
  colors: ThemeColors
}

/** Valor especial do dropdown que ativa as cores personalizadas. */
export const CUSTOM_THEME_ID = 'custom'

/** Preset aplicado quando o config está vazio (idêntico ao globals.css). */
export const DEFAULT_PRESET_ID = 'terroso'

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'terroso',
    label: 'Terroso (padrão)',
    colors: {
      cream: '#EAE1D3',
      sand: '#BFB6A2',
      olive: '#575549',
      terracotta: '#B65A3A',
      ink: '#2D2D2D',
      muted: '#D4CCBE',
    },
  },
  {
    id: 'escuro',
    label: 'Escuro',
    colors: {
      cream: '#F2EDE4',
      sand: '#A8A296',
      olive: '#2A2A28',
      terracotta: '#C96B45',
      ink: '#161615',
      muted: '#C9C2B6',
    },
  },
  {
    id: 'areia-clara',
    label: 'Areia clara',
    colors: {
      cream: '#3A372F', // vira o texto escuro sobre fundo claro
      sand: '#6B6555',
      olive: '#E8E1D2', // fundo claro
      terracotta: '#A84E2E',
      ink: '#D8CFBE',
      muted: '#57534A',
    },
  },
]

const PRESETS_BY_ID = new Map(THEME_PRESETS.map((p) => [p.id, p]))

const DEFAULT_COLORS = PRESETS_BY_ID.get(DEFAULT_PRESET_ID)!.colors

/** Shape do campo `theme` do singleton `config` (ver queries.ts). */
export type ThemeConfig = {
  preset?: string
  custom?: Partial<Record<ThemeSlot, string>>
}

/**
 * Resolve as cores finais a partir do config do Sanity.
 * - preset conhecido → cores do preset
 * - 'custom'         → default sobrescrito pelos hexes personalizados informados
 * - vazio/inválido   → default (Terroso)
 */
export function resolveThemeColors(theme?: ThemeConfig | null): ThemeColors {
  if (theme?.preset === CUSTOM_THEME_ID) {
    const custom = theme.custom ?? {}
    return THEME_SLOTS.reduce((acc, slot) => {
      acc[slot] = normalizeHex(custom[slot]) ?? DEFAULT_COLORS[slot]
      return acc
    }, {} as ThemeColors)
  }

  const preset = theme?.preset ? PRESETS_BY_ID.get(theme.preset) : undefined
  return preset?.colors ?? DEFAULT_COLORS
}

/**
 * Gera o bloco CSS que sobrescreve os tokens em :root.
 * Formato dos valores: "H S% L%" (sem hsl()) para casar com globals.css e
 * permitir alpha via Tailwind (hsl(var(--color-x) / <alpha-value>)).
 */
export function themeToCssVars(colors: ThemeColors): string {
  const decls = THEME_SLOTS.map((slot) => `--color-${slot}: ${hexToHslParts(colors[slot])};`).join('')
  return `:root{${decls}}`
}

// ===== Helpers de cor =====

/** Valida/normaliza um HEX (#RGB ou #RRGGBB) → "#RRGGBB" minúsculo, ou null. */
function normalizeHex(value?: string): string | null {
  if (!value) return null
  const v = value.trim().toLowerCase()
  const short = /^#?([0-9a-f]{3})$/.exec(v)
  if (short) {
    const [r, g, b] = short[1].split('')
    return `#${r}${r}${g}${g}${b}${b}`
  }
  const long = /^#?([0-9a-f]{6})$/.exec(v)
  return long ? `#${long[1]}` : null
}

/** Converte HEX → "H S% L%" (inteiros), compatível com o formato dos tokens. */
function hexToHslParts(hex: string): string {
  const normalized = normalizeHex(hex) ?? '#000000'
  const r = parseInt(normalized.slice(1, 3), 16) / 255
  const g = parseInt(normalized.slice(3, 5), 16) / 255
  const b = parseInt(normalized.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h /= 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
