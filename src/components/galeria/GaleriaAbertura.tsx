import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'

export function GaleriaAbertura() {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src="/projects/wow-art-001-suite-garden.jpg"
        alt="Galeria Wizards Office"
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">Galeria</p>
          <h1 className="mt-5 font-sans text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            Uma seleção
            <br />
            de trabalhos.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand md:text-lg">
            Imagens selecionadas, sem ordem cronológica. O que conecta cada cena é
            a intenção.
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
