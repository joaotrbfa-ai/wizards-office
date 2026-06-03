import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'

export function Abertura() {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src="/projects/wow-rv-001-hall-05.jpg"
        alt="Estúdio Wizards Office"
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">Sobre</p>
          <h1 className="mt-5 font-sans text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            Estúdio de
            <br />
            Visualização
            <br />
            Arquitetônica.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand md:text-lg">
            Fundada em 2019. Cinco wizards. Uma estética que antecipa o que ainda
            não foi construído.
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
