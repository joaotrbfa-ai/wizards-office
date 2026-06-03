# wzds. — Wizards Office

Site institucional do estúdio de visualização arquitetônica de alto padrão **Wizards Office** (Balneário Camboriú / SC).

> **Status:** Etapa 1 — Fundação + Design System.
> Conteúdo real das páginas será construído nas próximas etapas.

---

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3.4** com tokens semânticos via CSS variables
- **framer-motion 11** com `MotionConfig` global que respeita `prefers-reduced-motion`
- **next/font** para self-host de fontes
- **ESLint** + **Prettier** (+ `prettier-plugin-tailwindcss`)

---

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build    # build de produção
npm run start    # servir build
npm run lint     # ESLint
npm run format   # Prettier --write
```

---

## Tipografia

Configurada em `src/lib/fonts.ts`:

| Família           | Uso                                          | Origem                                |
| ----------------- | -------------------------------------------- | ------------------------------------- |
| Neue Montreal     | Sans principal — workhorse e títulos grandes | Self-host (a ativar)                  |
| General Sans      | **Fallback ativo** enquanto a Neue não chega | Fontshare (via `@import` no globals)  |
| DM Serif Display  | Momentos editoriais pontuais                 | next/font/google                      |
| Pinyon Script     | Detalhes decorativos (ex.: "magic.")         | next/font/google                      |

### Migrar para Neue Montreal

1. Coloque `NeueMontreal-Medium.woff2` e `NeueMontreal-Bold.woff2` em `/public/fonts`.
2. Em `src/lib/fonts.ts`: descomente o bloco `sans` (next/font/local) e remova o `sansVariable`.
3. Aplique a classe `sans.variable` no `<html>` em `src/app/layout.tsx`.
4. Remova o `@import` do General Sans no topo de `src/app/globals.css`.

Único ponto de troca: `src/lib/fonts.ts` + `globals.css`.

---

## Paleta (Guia de Marca 2026)

| Token           | Hex      | Uso                          |
| --------------- | -------- | ---------------------------- |
| `cream`         | #EAE1D3  | Texto principal              |
| `sand`          | #BFB6A2  | Texto secundário / detalhes  |
| `olive`         | #575549  | **Background principal**     |
| `terracotta`    | #B65A3A  | Acento (uso parcimonioso)    |
| `ink`           | #2D2D2D  | Background alternativo       |

Mapeamento semântico Tailwind: `bg-background`, `bg-background-alt`, `text-text`, `text-text-muted`, `text-accent`.

Cores e fontes vivem em `tailwind.config.ts` + `src/app/globals.css`.

---

## Estrutura

```
.
├── public/
│   └── fonts/                         (vazio — placeholder p/ Neue Montreal)
├── src/
│   ├── app/
│   │   ├── globals.css                tokens + base styles
│   │   ├── layout.tsx                 root layout (Header, Footer, MotionProvider)
│   │   ├── page.tsx                   home placeholder (demo do DS)
│   │   ├── not-found.tsx
│   │   ├── sobre/page.tsx
│   │   ├── servicos/page.tsx
│   │   ├── projetos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── galeria/page.tsx
│   │   └── contato/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Header.tsx             nav desktop + menu mobile fullscreen
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   └── Button.tsx             outline | solid | ghost
│   │   ├── motion/
│   │   │   └── Reveal.tsx             Reveal + RevealGroup (stagger)
│   │   └── providers/
│   │       └── MotionProvider.tsx     MotionConfig + reducedMotion="user"
│   └── lib/
│       ├── fonts.ts                   ponto único de troca de fontes
│       ├── motion.ts                  variants reutilizáveis
│       ├── nav.ts                     items de nav + contato
│       └── utils.ts                   cn()
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
├── .eslintrc.json
├── .prettierrc
└── package.json
```

---

## Componentes base

- **`<Container />`** — wrapper centralizado, `max-w-wrap` (1440px), paddings responsivos.
- **`<Section tone="olive|ink|transparent" spacing="lg|sm|none" bare?>`** — wrapper de seção.
- **`<Button variant="outline|solid|ghost" size="md|lg" href? />`** — renderiza `<Link>` ou `<button>`.
- **`<Reveal>`** — entrada por scroll (fade + rise, easing soft, ~0.8s).
- **`<RevealGroup>`** — pai com stagger para filhos `<Reveal>`.
- **`<Header />`** — fixo, transparente; ganha fundo `olive/85` + backdrop-blur ao rolar > 24px. Menu mobile fullscreen com bloqueio de scroll.
- **`<Footer />`** — Instagram, email mailto, frase "Vamos criar magia juntos?".

---

## Convenções de animação

Todas as variants em `src/lib/motion.ts`:

- **Easing:** `EASE_SOFT = [0.22, 1, 0.36, 1]` — desaceleração suave.
- **Duração base:** 0.8s. Stagger entre filhos: 0.08s.
- **`fadeUp`** é o padrão de entrada (opacity 0→1, y 24→0).
- `prefers-reduced-motion` é respeitado em dois níveis:
  - `MotionConfig reducedMotion="user"` (framer-motion)
  - `@media (prefers-reduced-motion: reduce)` no `globals.css`

---

## Setup do domínio Resend

O formulário de brief em `/contato` envia e-mail via [Resend](https://resend.com). Passos para produção:

1. Crie uma conta em [resend.com](https://resend.com).
2. Em **Domains**, adicione o domínio `wizardsoffice.com`.
3. Insira os **DNS records** que o Resend gerar (SPF, DKIM e DMARC) no provedor de DNS do domínio.
4. Aguarde a **verificação** (o status do domínio fica "Verified").
5. Em **API Keys**, crie uma key e coloque em `.env.local` como `RESEND_API_KEY` (veja `.env.example`).
6. Após a verificação, o remetente `brief@wizardsoffice.com` fica disponível — defina `BRIEF_FROM_EMAIL="Wizards Office <brief@wizardsoffice.com>"`.

### Testar localmente antes da verificação

Use o domínio **sandbox** do Resend enquanto o domínio próprio não está verificado:

```bash
BRIEF_FROM_EMAIL="Wizards Office <onboarding@resend.dev>"
```

> ⚠️ O sandbox `onboarding@resend.dev` **só entrega para o e-mail do dono da conta Resend**. Para envio a qualquer destinatário, é obrigatório verificar o domínio próprio.

### Variáveis de ambiente

| Variável | Descrição |
| -------- | --------- |
| `RESEND_API_KEY` | API key do Resend (obrigatória). |
| `BRIEF_FROM_EMAIL` | Remetente. Sandbox antes da verificação; `brief@wizardsoffice.com` depois. |
| `BRIEF_TO_EMAIL` | Destinatário dos briefs (default `contato@wizardsoffice.com`). |

Nunca commite `.env.local` (já ignorado no `.gitignore`). Use `.env.example` como referência.

---

## Próximas etapas

- Self-host de Neue Montreal.
- OG image, favicon, sitemap, robots.
