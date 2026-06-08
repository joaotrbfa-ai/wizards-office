'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Scene } from '@/components/scroll/Scene'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/form/FormField'
import { TextInput } from '@/components/form/TextInput'
import { TextArea } from '@/components/form/TextArea'
import { RadioGroup } from '@/components/form/RadioGroup'
import { CheckboxGroup } from '@/components/form/CheckboxGroup'
import {
  briefSchema,
  type BriefData,
  TIPOS_PROJETO,
  SERVICOS_BRIEF,
  PRAZOS,
} from '@/lib/brief-schema'

type Status = 'idle' | 'sending' | 'success' | 'error'

const legendClass = 'text-sm uppercase tracking-[0.2em] text-sand'
const fieldsetClass = 'min-w-0 border-0 p-0'

type BriefFormProps = {
  eyebrow?: string
  titulo?: string
  submitLabel?: string
  contatoEmail?: string
}

export function BriefForm({
  eyebrow = 'Como começamos',
  titulo = 'Comece pela ambição.',
  submitLabel = 'Enviar brief',
  contatoEmail = 'contato@wizardsoffice.com',
}: BriefFormProps = {}) {
  const [status, setStatus] = useState<Status>('idle')
  const successRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      nome: '',
      email: '',
      empresa: '',
      telefone: '',
      servicos: [],
      mensagem: '',
      website: '',
    },
  })

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const onSubmit = async (data: BriefData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Scene tone="olive" minHeight="auto" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-sand">{eyebrow}</p>
          <h2 className="mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.8rem)] font-bold uppercase leading-[0.95] tracking-wide text-cream">
            {titulo}
          </h2>

          {status === 'success' ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="mt-12 border border-sand/30 p-8 focus:outline-none md:p-12"
            >
              <p className="font-script text-3xl text-cream md:text-4xl">obrigado.</p>
              <p className="mt-4 text-lg leading-relaxed text-cream">
                Brief recebido. Respondemos em até 48h úteis.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm uppercase tracking-[0.2em] text-sand underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                Enviar outro brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-12 flex flex-col gap-12">
              {/* Honeypot anti-spam (escondido de humanos) */}
              <div aria-hidden className="hidden">
                <label htmlFor="website">Não preencha este campo</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              {/* Grupo 1 — Identificação */}
              <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Identifique-se</legend>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField label="Nome" htmlFor="nome" required error={errors.nome?.message}>
                    <TextInput
                      id="nome"
                      autoComplete="name"
                      aria-invalid={errors.nome ? true : undefined}
                      aria-describedby={errors.nome ? 'nome-error' : undefined}
                      {...register('nome')}
                    />
                  </FormField>

                  <FormField label="E-mail" htmlFor="email" required error={errors.email?.message}>
                    <TextInput
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                    />
                  </FormField>

                  <FormField label="Empresa" htmlFor="empresa" error={errors.empresa?.message}>
                    <TextInput
                      id="empresa"
                      autoComplete="organization"
                      aria-invalid={errors.empresa ? true : undefined}
                      aria-describedby={errors.empresa ? 'empresa-error' : undefined}
                      {...register('empresa')}
                    />
                  </FormField>

                  <FormField
                    label="Telefone / WhatsApp"
                    htmlFor="telefone"
                    error={errors.telefone?.message}
                  >
                    <TextInput
                      id="telefone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={errors.telefone ? true : undefined}
                      aria-describedby={errors.telefone ? 'telefone-error' : undefined}
                      {...register('telefone')}
                    />
                  </FormField>
                </div>
              </fieldset>

              {/* Grupo 2 — Sobre o projeto */}
              <fieldset className={`${fieldsetClass} flex flex-col gap-10`}>
                <legend className={legendClass}>Sobre o projeto</legend>
                <RadioGroup
                  legend="Tipo de projeto"
                  name="tipoProjeto"
                  required
                  options={TIPOS_PROJETO}
                  registration={register('tipoProjeto')}
                  error={errors.tipoProjeto?.message}
                />
                <CheckboxGroup
                  legend="Serviços de interesse"
                  name="servicos"
                  required
                  options={SERVICOS_BRIEF}
                  registration={register('servicos')}
                  error={errors.servicos?.message}
                />
                <RadioGroup
                  legend="Prazo"
                  name="prazo"
                  options={PRAZOS}
                  registration={register('prazo')}
                  error={errors.prazo?.message}
                />
              </fieldset>

              {/* Grupo 3 — Mensagem */}
              <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Mensagem</legend>
                <div className="mt-6">
                  <FormField
                    label="Conte sobre o empreendimento"
                    htmlFor="mensagem"
                    required
                    error={errors.mensagem?.message}
                  >
                    <TextArea
                      id="mensagem"
                      rows={6}
                      placeholder="Empreendimento, localização, objetivo da comunicação, referências…"
                      aria-invalid={errors.mensagem ? true : undefined}
                      aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
                      {...register('mensagem')}
                    />
                  </FormField>
                </div>
              </fieldset>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" variant="solid" size="lg" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : submitLabel}
                </Button>

                {status === 'error' && (
                  <p role="alert" className="text-sm text-terracotta">
                    Algo deu errado no envio. Tente de novo ou escreva para{' '}
                    <a href={`mailto:${contatoEmail}`} className="underline">
                      {contatoEmail}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </Container>
    </Scene>
  )
}
