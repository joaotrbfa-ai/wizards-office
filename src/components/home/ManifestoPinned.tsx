'use client'

import { motion, useTransform } from 'framer-motion'
import { Scene } from '@/components/scroll/Scene'
import { PinnedSection, type PinnedRenderArgs } from '@/components/scroll/PinnedSection'

const CREAM = '#EAE1D3'
const TERRACOTTA = '#B65A3A'

const FRASES = ['The invisible', 'Made', 'Visible.']

function ManifestoInner({ progress, reducedMotion }: PinnedRenderArgs) {
  const o1 = useTransform(progress, [0.05, 0.2, 0.28, 0.35], [0, 1, 1, 0])
  const o2 = useTransform(progress, [0.35, 0.5, 0.58, 0.65], [0, 1, 1, 0])
  const o3 = useTransform(progress, [0.65, 0.8, 1], [0, 1, 1])
  const visibleColor = useTransform(progress, [0.8, 1], [CREAM, TERRACOTTA])

  const frase =
    'absolute px-6 text-center font-sans font-bold uppercase leading-[0.9] tracking-wide text-heading [font-size:clamp(2.75rem,7.5vw,8rem)]'

  if (reducedMotion) {
    return (
      <div className="flex flex-col items-center gap-6 py-32 text-center">
        {FRASES.map((f) => (
          <h2
            key={f}
            className="font-sans text-[clamp(1.95rem,5.7vw,4.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-heading"
          >
            {f}
          </h2>
        ))}
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.h2 style={{ opacity: o1 }} className={frase}>
        The invisible
      </motion.h2>
      <motion.h2 style={{ opacity: o2 }} className={frase}>
        Made
      </motion.h2>
      <motion.h2 style={{ opacity: o3 }} className={frase}>
        <motion.span style={{ color: visibleColor }}>Visible.</motion.span>
      </motion.h2>
    </div>
  )
}

export function ManifestoPinned() {
  return (
    <Scene tone="olive" minHeight="auto" clip={false}>
      <PinnedSection height="350vh" pinHeight="100vh">
        {(args) => <ManifestoInner {...args} />}
      </PinnedSection>
    </Scene>
  )
}
