import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'

export function Abertura() {
  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src="/projects/wow-art-001-suite-garden.jpg"
        alt="Espaço Wizards Office"
        overlay="strong"
        parallax
        priority
      >
        <div className="flex h-full w-full flex-col items-start justify-end p-8 pb-20 md:p-16 md:pb-32">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">Serviços</p>
          <h1 className="mt-5 font-sans text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
            Tudo o que
            <br />
            imaginamos.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand md:text-lg">
            Sete frentes de trabalho que se conectam para transformar arquitetura
            em experiência visual. Cada serviço é executado com a mesma direção
            criativa, o mesmo cuidado técnico e a mesma obsessão por atmosfera.
          </p>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
