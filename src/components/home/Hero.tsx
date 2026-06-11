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
  // Encerramento "magic ." → ponto upright e espaçado em sans, separado do script.
  const scriptText = fraseScript.replace(/\s*\.\s*$/, '')
  const hasDot = /\.\s*$/.test(fraseScript)

  // Quebra travada em 2 linhas como no template (CRAFTING SPACES THAT / FEELS LIKE magic).
  // Aceita marcador "|" no Sanity para controle manual; senão, joga os 2 últimos
  // termos para a 2ª linha (onde o script vive).
  const words = fraseHead.trim().split(/\s+/)
  const [linha1, linha2] = fraseHead.includes('|')
    ? fraseHead.split('|').map((s) => s.trim())
    : words.length > 2
      ? [words.slice(0, -2).join(' '), words.slice(-2).join(' ')]
      : [fraseHead.trim(), '']

  return (
    <Scene minHeight="screen">
      <FullBleedMedia src={videoUrl} type="video" poster={poster} overlay="bottom" priority>
        <div className="relative flex h-full w-full items-end justify-start p-6 pb-14 sm:p-10 sm:pb-16 md:p-14 md:pb-20 lg:px-16 lg:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.4 }}
            className="flex flex-col font-sans text-[clamp(1.4rem,3.4vw,3.75rem)] font-bold uppercase leading-[0.6] tracking-tight text-heading"
          >
            <span className="whitespace-nowrap">{linha1}</span>
            <span className="whitespace-nowrap">
              {linha2 && <>{linha2}&nbsp;</>}
              <span className="font-script align-baseline text-[3.4em] font-normal normal-case leading-[0.7] tracking-normal">
                {scriptText}
              </span>
              {hasDot && (
                <span aria-hidden className="font-sans">
                  &nbsp;.
                </span>
              )}
            </span>
          </motion.h1>

          <ScrollCue className="absolute bottom-8 right-8" />
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
