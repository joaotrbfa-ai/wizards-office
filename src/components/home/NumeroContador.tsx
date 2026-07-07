'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { EASE_SOFT } from '@/lib/motion'

/** Decompõe "1.500+" em prefixo, alvo numérico e sufixo — preservando o texto ao redor. */
function parseValor(valor: string) {
  const match = valor.match(/^(\D*)([\d.,]+)(.*)$/)
  if (!match) return null
  const [, prefixo, bruto, sufixo] = match
  const target = Number(bruto.replace(/[.,]/g, ''))
  if (!Number.isFinite(target)) return null
  // Reproduz o agrupamento de milhar (pt-BR) quando o original tinha separador.
  const agrupado = /[.,]/.test(bruto) || target >= 1000
  return { prefixo, sufixo, target, agrupado }
}

function formatar(v: number, parsed: NonNullable<ReturnType<typeof parseValor>>) {
  const num = parsed.agrupado ? new Intl.NumberFormat('pt-BR').format(v) : String(v)
  return `${parsed.prefixo}${num}${parsed.sufixo}`
}

/**
 * Número que conta do zero até o valor quando entra na viewport. Sufixos/prefixos
 * ("+", "%", "anos", separador de milhar) são preservados. Se o valor não tiver
 * parte numérica, renderiza o texto como está.
 */
export function NumeroContador({ valor, className }: { valor: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const emVista = useInView(ref, { once: true, amount: 0.5 })
  const parsed = parseValor(valor)
  const [display, setDisplay] = useState(parsed ? formatar(0, parsed) : valor)

  useEffect(() => {
    if (!parsed || !emVista) return
    const controls = animate(0, parsed.target, {
      duration: 2,
      ease: EASE_SOFT,
      onUpdate: (v) => setDisplay(formatar(Math.round(v), parsed)),
    })
    return () => controls.stop()
  }, [emVista, parsed?.target]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {parsed ? display : valor}
    </span>
  )
}
