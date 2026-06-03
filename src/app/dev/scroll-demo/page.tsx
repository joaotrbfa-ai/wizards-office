'use client'

import { motion, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { PinnedSection, type PinnedRenderArgs } from '@/components/scroll/PinnedSection'
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'

/* Rota de DEV — valida cada primitivo isoladamente. Não linkar no header. */

const IMG_1 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920'
const IMG_3 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920'
const IMG_H = [
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1920',
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920',
]

function DebugLabel({ children }: { children: ReactNode }) {
  return (
    <span className="absolute left-5 top-28 z-20 text-xs uppercase tracking-[0.2em] text-sand">
      {children}
    </span>
  )
}

const PINNED_TEXTS = ['Primeiro', 'Segundo', 'Terceiro']

function PinnedDemo({ progress, reducedMotion }: PinnedRenderArgs) {
  const o1 = useTransform(progress, [0.0, 0.1, 0.28], [0, 1, 0])
  const o2 = useTransform(progress, [0.3, 0.45, 0.62], [0, 1, 0])
  const o3 = useTransform(progress, [0.66, 0.8, 1], [0, 1, 1])
  const opacities = [o1, o2, o3]

  if (reducedMotion) {
    return (
      <div className="flex flex-col items-center gap-10 py-32 text-center">
        {PINNED_TEXTS.map((t, i) => (
          <h2
            key={t}
            className="font-sans text-[clamp(2rem,6vw,5rem)] font-bold uppercase tracking-wide text-cream"
          >
            {i + 1}. {t}
          </h2>
        ))}
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {PINNED_TEXTS.map((t, i) => (
        <motion.h2
          key={t}
          style={{ opacity: opacities[i] }}
          className="absolute px-6 text-center font-sans text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase tracking-wide text-cream"
        >
          {t}
        </motion.h2>
      ))}
    </div>
  )
}

export default function ScrollDemoPage() {
  return (
    <>
      <ScrollProgress />

      {/* 1 — FullBleedMedia (imagem) */}
      <Scene>
        <DebugLabel>01 · Scene + FullBleedMedia (image, overlay soft)</DebugLabel>
        <FullBleedMedia src={IMG_1} alt="Arquitetura — demo full bleed" overlay="soft" priority>
          <div className="flex h-full w-full items-center justify-center">
            <h1 className="px-6 text-center font-sans text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase tracking-wide text-cream">
              Scene 1 — Full bleed
            </h1>
          </div>
        </FullBleedMedia>
      </Scene>

      {/* 2 — PinnedSection (scrub) */}
      <Scene tone="ink" minHeight="auto" clip={false}>
        <DebugLabel>02 · PinnedSection (height 300vh, scrub)</DebugLabel>
        <PinnedSection height="300vh">
          {(args) => <PinnedDemo {...args} />}
        </PinnedSection>
      </Scene>

      {/* 3 — FullBleedMedia com parallax */}
      <Scene>
        <DebugLabel>03 · FullBleedMedia (parallax, overlay strong)</DebugLabel>
        <FullBleedMedia src={IMG_3} alt="Arquitetura — demo parallax" parallax overlay="strong">
          <div className="flex h-full w-full items-end justify-start p-8 md:p-16">
            <h2 className="max-w-2xl font-sans text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
              Texto sobre imagem com parallax
            </h2>
          </div>
        </FullBleedMedia>
      </Scene>

      {/* 4 — HorizontalScroll */}
      <Scene tone="ink" minHeight="auto" clip={false}>
        <DebugLabel>04 · HorizontalScroll (3 cenas)</DebugLabel>
        <HorizontalScroll>
          {IMG_H.map((src, i) => (
            <div key={src} className="relative h-full w-screen shrink-0">
              <FullBleedMedia src={src} alt={`Cena horizontal ${i + 1}`} overlay="soft">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-sans text-[clamp(3rem,10vw,9rem)] font-bold uppercase tracking-wide text-cream">
                    {`0${i + 1}`}
                  </span>
                </div>
              </FullBleedMedia>
            </div>
          ))}
        </HorizontalScroll>
      </Scene>

      {/* Fecho — confirma fim do scroll */}
      <Scene minHeight="auto" className="py-32">
        <div className="flex w-full items-center justify-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sand">Fim da demo</p>
        </div>
      </Scene>
    </>
  )
}
