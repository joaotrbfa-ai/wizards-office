import { cn } from '@/lib/utils'

type PlaceholderProps = {
  /** Índice ou identificador exibido no canto. Ex: "01" */
  index?: string
  /** Variação visual (rotaciona gradientes). */
  variant?: 0 | 1 | 2 | 3
  className?: string
  /** Razão de aspecto via classe Tailwind (default 4/5). */
  aspect?: string
  /** Quando true, o placeholder ganha levíssimo movimento parallax no hover via CSS. */
  interactive?: boolean
}

const gradients = [
  'from-ink via-olive/80 to-olive/30',
  'from-olive via-ink to-ink/40',
  'from-olive/40 via-olive/80 to-ink',
  'from-ink via-ink/70 to-olive/60',
]

/**
 * Placeholder visual rico para slots de imagem ainda não preenchidos.
 * Gradiente em paleta + ruído sutil via SVG inline. Substituível por <Image />.
 */
export function Placeholder({
  index,
  variant = 0,
  className,
  aspect = 'aspect-[4/5]',
  interactive = false,
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-ink',
        aspect,
        interactive && 'transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]',
        className,
      )}
    >
      {/* base gradiente */}
      <div
        className={cn('absolute inset-0 bg-gradient-to-br', gradients[variant])}
        aria-hidden
      />

      {/* faixa diagonal sutil — sensação de "luz" arquitetônica */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 0%, transparent 38%, hsl(var(--color-cream)) 50%, transparent 62%, transparent 100%)',
        }}
      />

      {/* ruído */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* vinheta */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, hsl(var(--color-ink) / 0.45) 100%)',
        }}
      />

      {/* índice */}
      {index && (
        <span className="absolute left-5 top-5 font-sans text-[0.65rem] uppercase tracking-widest text-cream/55 sm:left-6 sm:top-6">
          {index}
        </span>
      )}
    </div>
  )
}
