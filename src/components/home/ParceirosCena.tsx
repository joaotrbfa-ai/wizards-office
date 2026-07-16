'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { imageProps } from '@/sanity/image'
import type { Parceiro } from '@/sanity/types'

export interface ParceirosCenaProps {
  parceiros: Parceiro[]
}

function PartnerLogo({ partner }: { partner: Parceiro }) {
  const [erro, setErro] = useState(false)
  const logo = partner.logo ? imageProps(partner.logo, 280) : null

  if (erro || !logo?.src) {
    return <span className="text-sm uppercase tracking-widest text-label">{partner.nome}</span>
  }

  return (
    <Image
      src={logo.src}
      alt={logo.alt || partner.nome}
      width={140}
      height={48}
      onError={() => setErro(true)}
      className="h-16 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-24"
    />
  )
}

export function ParceirosCena({ parceiros }: ParceirosCenaProps) {
  return (
    <Scene tone="olive" minHeight="auto" className="py-7 md:py-9">
      <Container>
        <RevealGroup className="grid grid-cols-3 items-center justify-items-center gap-8 sm:grid-cols-4 md:gap-12 lg:grid-cols-7 lg:gap-8">
          {parceiros.map((partner) => (
            <Reveal key={partner._id} className="flex items-center justify-center">
              <PartnerLogo partner={partner} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
