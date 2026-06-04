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
│   │   ├── layout.tsx                 root layout mínimo (<html>/<body>, fontes)
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts · robots.ts · icon.svg
│   │   ├── api/brief/route.ts         endpoint do formulário de brief
│   │   ├── (site)/                    route group do site público
│   │   │   ├── layout.tsx             Header + Footer + MotionProvider + skip-link
│   │   │   ├── page.tsx               home
│   │   │   ├── sobre/page.tsx
│   │   │   ├── servicos/page.tsx
│   │   │   ├── projetos/page.tsx · projetos/[slug]/page.tsx
│   │   │   ├── galeria/page.tsx
│   │   │   ├── contato/page.tsx
│   │   │   └── dev/scroll-demo/page.tsx
│   │   └── (studio)/                  route group do admin (sem chrome do site)
│   │       └── admin/[[...tool]]/      Sanity Studio (NextStudio)
│   ├── sanity/
│   │   ├── env.ts                     projectId/dataset/apiVersion
│   │   └── client.ts                  cliente de fetching (uso na Fase D)
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
├── sanity.config.ts                   config do Sanity Studio (basePath /admin)
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

## Admin (Sanity)

O conteúdo editável do site é gerido pelo **Sanity Studio**, embutido na própria aplicação Next em `/admin` (route group `(studio)`, isolado do Header/Footer/MotionProvider do site).

- **URL:** `https://wizardsoffice.com/admin` (produção) · `http://localhost:3000/admin` (local)
- **Login:** SSO da Sanity (Google ou e-mail convidado).
- **Rodar localmente:** `npm run dev` → abra [http://localhost:3000/admin](http://localhost:3000/admin).

> **Status:** schemas definidos (Fase C). O conteúdo do site é editável no Studio.
> Os componentes do site ainda leem de `src/data/*.ts` — a leitura via Sanity entra na Fase D.

### Variáveis de ambiente

| Variável | Descrição |
| -------- | --------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto Sanity (dashboard → Project settings). Obrigatória. |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset — use `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API (data, `YYYY-MM-DD`). |
| `SANITY_API_WRITE_TOKEN` | Token de escrita (Editor). **Só local**, para a migração — nunca na Vercel. |

Configure as três primeiras em `.env.local` (local) e nas **Environment Variables** do Vercel (produção). O token de escrita fica **só** em `.env.local`. Veja `.env.example`.

### Migração inicial (popular o Sanity)

Sobe todo o conteúdo de `src/data/*.ts` + imagens de `/public` para o Sanity.

**Pré-requisitos:**
1. Crie um token de escrita: dashboard Sanity → **API** → **Tokens** → **Add API token** → Name `Migration script`, Permissions **Editor**.
2. Adicione em `.env.local`: `SANITY_API_WRITE_TOKEN=sk_...`

**Rodar:**

```bash
npx tsx scripts/migrate-to-sanity.ts
```

- **Idempotente** — usa `_id` determinístico + `createOrReplace`; pode rodar quantas vezes precisar sem duplicar.
- Imagens são deduplicadas (a mesma imagem reusada sobe uma vez só).
- Após sucesso, abra `/admin` e confira os documentos criados.

### Adicionar um novo editor

Dashboard Sanity → **Members** → **Invite** → e-mail do editor.

### Configurar CORS

Para o Studio autenticar a partir do navegador, libere as origens em
dashboard Sanity → **API** → **CORS Origins** → **Add**:

- `https://wizardsoffice.com`
- `https://wizards-office.vercel.app`
- `http://localhost:3000`

Marque **Allow credentials** em cada uma.

### Webhook de revalidação (on-demand)

O site lê o conteúdo do Sanity em build (SSG) com revalidação por _tag_. Quando
um documento é publicado no Studio, um webhook avisa o site para revalidar só as
páginas afetadas — sem novo deploy.

**Fluxo:** publicar no Studio → webhook → `POST /api/revalidate` → `revalidateTag('sanity:<tipo>')`.

**Variáveis de ambiente** (local + Vercel):

| Variável | Descrição |
| -------- | --------- |
| `SANITY_API_READ_TOKEN` | Token de leitura (Viewer). Dataset é público, então **opcional**; recomendado. |
| `SANITY_REVALIDATE_SECRET` | Segredo do webhook. Mesmo valor aqui e no Sanity. |

**Configurar o webhook** (após o deploy): dashboard Sanity → **API** → **Webhooks** → **Create webhook**:

- **URL:** `https://wizards-office.vercel.app/api/revalidate` (depois `https://wizardsoffice.com/api/revalidate`)
- **Trigger on:** Create + Update + Delete
- **Filter:**
  ```
  _type in ["projeto","pilar","servico","etapaProcesso","membro","parceiro","paginaHome","paginaSobre","paginaServicos","paginaProjetos","paginaGaleria","paginaContato","config"]
  ```
- **Secret:** o mesmo valor de `SANITY_REVALIDATE_SECRET`

O handler valida a assinatura HMAC do Sanity; requisições sem assinatura válida recebem `401`.

### `src/data/*.ts` — histórico

Os arquivos em `src/data/` (`projetos`, `equipe`, `processo`, `servicos`,
`pilares`, `parceiros`, `galeria`) eram a fonte de conteúdo antes do Sanity.
Desde a **Fase D** o site lê via `src/sanity/queries.ts` e esses arquivos estão
marcados `@deprecated` — mantidos apenas como **referência histórica / rollback**
e porque o script `scripts/migrate-to-sanity.ts` ainda os usa como seed.
Nenhum componente do site os importa.

---

## Próximas etapas

- Self-host de Neue Montreal.
- OG image (singleton `config.seo.ogImage`), favicon.
- Codegen de tipos do Sanity (`sanity typegen`) no lugar dos tipos manuais.
