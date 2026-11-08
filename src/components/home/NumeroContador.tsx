'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useReducedMotionConfig } from 'framer-motion'
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
 *
 * O HTML do servidor já traz o valor FINAL, nunca o zero: sem JavaScript
 * (buscadores, prévias de link, leitores) o número certo aparece. Só depois de
 * hidratar, e se o movimento não estiver reduzido, o contador volta a zero
 * enquanto está fora da tela e conta ao entrar nela. Com prefers-reduced-motion
 * o valor final fica parado.
 */
export function NumeroContador({ valor, className }: { valor: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const emVista = useInView(ref, { once: true, amount: 0.5 })
  const reduzido = useReducedMotionConfig()
  const parsed = useMemo(() => parseValor(valor), [valor])
  const final = parsed ? formatar(parsed.target, parsed) : valor
  const [display, setDisplay] = useState(final)

  useEffect(() => {
    if (!parsed || reduzido) {
      setDisplay(final)
      return
    }
    if (!emVista) {
      setDisplay(formatar(0, parsed))
      return
    }
    const controls = animate(0, parsed.target, {
      duration: 2,
      ease: EASE_SOFT,
      onUpdate: (v) => setDisplay(formatar(Math.round(v), parsed)),
    })
    return () => controls.stop()
  }, [parsed, final, reduzido, emVista])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
