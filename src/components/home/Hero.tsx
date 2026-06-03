'use client'

import { motion } from 'framer-motion'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { ScrollCue } from '@/components/scroll/ScrollCue'
import { EASE_SOFT } from '@/lib/motion'

const VIDEO_URL =
  'https://cloud-1de12d.becdn.net/customfile/41ab2e01656c41024eb5efaa834b070e5811799c36524bd61f90a3990c300918/Virentis-Site-Compress-2.mp4'

export function Hero() {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src={VIDEO_URL}
        type="video"
        poster="/hero-poster.jpg"
        overlay="bottom"
        priority
      >
        <div className="relative flex h-full w-full items-end justify-start p-8 pb-20 md:p-16 md:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.4 }}
            className="max-w-5xl font-sans text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream"
          >
            Crafting spaces that feel like{' '}
            <span className="font-script normal-case text-cream">magic.</span>
          </motion.h1>

          <ScrollCue className="absolute bottom-8 right-8" />
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
