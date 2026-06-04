'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { PARCEIROS_DATA, type ParceiroData } from '@/data/parceiros'

const PARTNERS = PARCEIROS_DATA

function PartnerLogo({ partner }: { partner: ParceiroData }) {
  const [erro, setErro] = useState(false)

  if (erro) {
    return <span className="text-sm uppercase tracking-widest text-sand">{partner.nome}</span>
  }

  return (
    <Image
      src={partner.src}
      alt={partner.nome}
      width={140}
      height={48}
      unoptimized
      onError={() => setErro(true)}
      className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-12"
    />
  )
}

export function ParceirosCena() {
  return (
    <Scene tone="olive" minHeight="auto" className="py-32 md:py-48">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sand">Quem confia</p>
          <h2 className="mt-6 font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-wide text-cream">
            Parceiros
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 flex flex-wrap items-center justify-center gap-12">
          {PARTNERS.map((partner) => (
            <Reveal key={partner.nome} className="flex items-center justify-center">
              <PartnerLogo partner={partner} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Scene>
  )
}
