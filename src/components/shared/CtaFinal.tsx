import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Button } from '@/components/ui/Button'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export interface CtaFinalProps {
  image: string
  alt: string
  /** Placeholder LQIP (base64) da imagem do Sanity. */
  blurDataURL?: string
  /** Linhas do título (cada item vira uma linha). */
  titulo: string[]
  href: string
  ctaLabel: string
  /** Mostra "magic." em Pinyon Script acima do título. Default true. */
  script?: boolean
  /** Subtítulo opcional em sand. */
  subtitulo?: string
}

/**
 * Cena cinematic de chamada final (call to brief).
 * Compartilhada entre Home, Serviços, Projetos e Galeria.
 */
export function CtaFinal({
  image,
  alt,
  blurDataURL,
  titulo,
  href,
  ctaLabel,
  script = false,
  subtitulo,
}: CtaFinalProps) {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia src={image} alt={alt} blurDataURL={blurDataURL} overlay="strong" parallax>
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <RevealGroup className="flex max-w-4xl flex-col items-center">
            {script && (
              <Reveal>
                <span className="font-script text-3xl text-cream md:text-4xl">magic.</span>
              </Reveal>
            )}

            <Reveal>
              <h2
                className={cn(
                  'font-sans text-[clamp(2.25rem,5vw,5rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream',
                  script && 'mt-4',
                )}
              >
                {titulo.map((linha, i) => (
                  <span key={i} className="block">
                    {linha}
                  </span>
                ))}
              </h2>
            </Reveal>

            {subtitulo && (
              <Reveal>
                <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {subtitulo}
                </p>
              </Reveal>
            )}

            <Reveal>
              <Button variant="solid" href={href} size="lg" className="mt-12">
                {ctaLabel}
              </Button>
            </Reveal>
          </RevealGroup>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
