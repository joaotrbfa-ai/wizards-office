'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type MediaType = 'image' | 'video'
export type MediaOverlay = 'none' | 'soft' | 'strong' | 'bottom'
/** Ancoragem do recorte do object-cover (onde a imagem "gruda" ao ser cortada). */
export type MediaFocus = 'center' | 'top' | 'bottom'

export interface FullBleedMediaProps {
  /** Caminho da imagem ou do vídeo. */
  src: string
  /** Tipo da mídia. Detectado pela extensão quando omitido. */
  type?: MediaType
  /** Texto alternativo (obrigatório quando for imagem com conteúdo). */
  alt?: string
  /** Poster do vídeo. */
  poster?: string
  /** Placeholder LQIP (base64) para imagens do Sanity. */
  blurDataURL?: string
  /** Intensidade do overlay de leitura. */
  overlay?: MediaOverlay
  /** Ancoragem do recorte (default center). 'top' preserva o topo da imagem. */
  focus?: MediaFocus
  /** Parallax sutil no scroll (desligado em prefers-reduced-motion). */
  parallax?: boolean
  /** Prioriza o carregamento da imagem (hero acima da dobra). */
  priority?: boolean
  /** Conteúdo sobreposto à mídia. */
  children?: ReactNode
  className?: string
}

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i

const overlayClass: Record<MediaOverlay, string> = {
  none: '',
  soft: 'bg-gradient-to-b from-black/30 via-transparent to-black/40',
  strong: 'bg-gradient-to-b from-black/60 via-black/30 to-black/60',
  bottom: 'bg-gradient-to-b from-transparent via-transparent to-black/70',
}

const focusClass: Record<MediaFocus, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
}

function detectType(src: string, explicit?: MediaType): MediaType {
  if (explicit) return explicit
  return VIDEO_EXT.test(src) ? 'video' : 'image'
}

export function FullBleedMedia({
  src,
  type,
  alt = '',
  poster,
  blurDataURL,
  overlay = 'soft',
  focus = 'center',
  parallax = false,
  priority = false,
  children,
  className,
}: FullBleedMediaProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaType = detectType(src, type)
  const parallaxOn = parallax && !reduced

  // Parallax: mapeia a visibilidade da cena (0→1) para um leve deslocamento Y.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // Vídeo só toca quando está no viewport (economia de recursos).
  useEffect(() => {
    const video = videoRef.current
    if (mediaType !== 'video' || !video) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [mediaType])

  return (
    <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Camada de mídia (com parallax opcional) */}
      <motion.div
        className={cn('absolute inset-0', parallaxOn && 'scale-[1.2] will-change-transform')}
        style={parallaxOn ? { y } : undefined}
      >
        {!src ? (
          // Sem mídia configurada no Sanity: fundo neutro em vez de passar
          // src='' ao next/image (que dispara erro de runtime).
          <div aria-hidden className="absolute inset-0 bg-ink" />
        ) : mediaType === 'image' ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            className={cn('object-cover', focusClass[focus])}
            {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden
          >
            <source src={src} />
          </video>
        )}
      </motion.div>

      {/* Overlay de leitura */}
      {overlay !== 'none' && (
        <div aria-hidden className={cn('absolute inset-0', overlayClass[overlay])} />
      )}

      {/* Conteúdo sobreposto */}
      {children && <div className="relative z-10 flex h-full w-full">{children}</div>}
    </div>
  )
}
