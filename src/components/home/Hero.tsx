'use client'

import { motion } from 'framer-motion'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { ScrollCue } from '@/components/scroll/ScrollCue'
import { EASE_SOFT } from '@/lib/motion'

export interface HeroProps {
  videoUrl: string
  fraseHead: string
  fraseScript: string
  poster?: string
}

export function Hero({ videoUrl, fraseHead, fraseScript, poster = '/hero-poster.jpg' }: HeroProps) {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia src={videoUrl} type="video" poster={poster} overlay="bottom" priority>
        <div className="relative flex h-full w-full items-end justify-start p-8 pb-20 md:p-16 md:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.4 }}
            className="max-w-5xl font-sans text-[clamp(1.75rem,4vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream"
          >
            {fraseHead}{' '}
            <span className="font-script normal-case text-cream">{fraseScript}</span>
          </motion.h1>

          <ScrollCue className="absolute bottom-8 right-8" />
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
