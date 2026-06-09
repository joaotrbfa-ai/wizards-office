import { Fragment } from 'react'
import { Scene } from '@/components/scroll/Scene'
import { FullBleedMedia } from '@/components/scroll/FullBleedMedia'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'

export function ContatoFecho({
  textoScript,
  captionLinhas,
}: {
  textoScript?: string
  captionLinhas?: string[]
}) {
  const script = textoScript ?? 'magic.'
  const linhas = captionLinhas ?? ['O que as pessoas', 'sentem antes', 'de existir.']

  return (
    <Scene minHeight="screen">
      <FullBleedMedia
        src="/projects/wow-rv-003-fachada-diurna.jpg"
        alt="Ambiente Wizards Office"
        overlay="strong"
        parallax
      >
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <RevealGroup className="flex max-w-4xl flex-col items-center">
            <Reveal>
              <span className="font-script text-3xl text-cream md:text-4xl">{script}</span>
            </Reveal>
            <Reveal>
              <h2 className="mt-4 font-sans text-[clamp(1.6rem,3.5vw,3.9rem)] font-bold uppercase leading-[0.9] tracking-wide text-cream">
                {linhas.map((linha, i) => (
                  <Fragment key={i}>
                    {i > 0 && <br />}
                    {linha}
                  </Fragment>
                ))}
              </h2>
            </Reveal>
          </RevealGroup>
        </div>
      </FullBleedMedia>
    </Scene>
  )
}
