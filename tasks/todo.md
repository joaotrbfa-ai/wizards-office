# Landing Page — consolidar a Home em página única

**Objetivo:** transformar a `/` numa landing page de 6 seções, reaproveitando os
componentes existentes. Páginas internas (`/sobre`, `/servicos`, `/projetos`,
`/galeria`, `/contato`) **permanecem** acessíveis. Conteúdo reaproveitado do Sanity.

## Estrutura final da `/`
1. Hero
2. Manifesto / Números / Direção → ManifestoPinned + ManifestoText + EquipeHorizontal + NumerosCena
3. Direção / Narrativa / Confiança → PilarScene ×3
4. Serviços → ServicosLista
5. Mini-galeria (NOVO) → grid fixo, imagem → projeto vinculado
6. CTA → BriefForm ("Comece pela ambição") + ContatoDireto ("Ou fale direto")

## Tarefas
- [x] Schema `galeriaItem`: adicionar campo opcional `projeto` (reference → projeto)
- [x] Schema `paginaHome`: adicionar objeto `miniGaleria` { eyebrow, titulo, descricao, itens[] (galeriaItem, máx 6) }
- [x] `queries.ts`: resolver `miniGaleria.itens[].projeto->{slug,nome,categoria}` em `paginaHomeQuery`
- [x] `types.ts`: tipos `MiniGaleriaItem`/`MiniGaleria`; `miniGaleria?` em `PaginaHome`
- [x] Novo componente `src/components/home/MiniGaleria.tsx` (grid fixo, clique → /projetos/[slug])
- [x] Reescrever `src/app/(site)/page.tsx`: 6 seções na ordem + âncoras (#manifesto, #pilares, #servicos, #galeria, #contato); remover ProjetosHorizontal, ParceirosCena, CtaFinal
- [x] `nav.ts`: menu aponta para âncoras da landing
- [x] Fix UX: menu mobile fecha ao clicar em âncora (Header)
- [x] Verificar build (tsc + lint + next build → todos exit 0)

## Decisões
- Removidos da Home: ProjetosHorizontal (substituído pela mini-galeria), ParceirosCena
  (fora do board), CtaFinal (substituído por Brief + Direto).
- Mantido `ManifestoPinned` (é parte do "Manifesto", ajuda a transição Hero→conteúdo).
- Seção 2 empilha Manifesto → Equipe (3 retratos) → Números.

## Rodada 2 — ajustes do cliente
- [x] Remover "The invisible / Made / Visible" (ManifestoPinned fora da home)
- [x] Manifesto + Equipe + Números → seção única (`ManifestoSection`), equipe só Berth/Matheus/Renata (3 primeiros)
- [x] Direção/Narrativa/Confiança → seção única em grade (`PilaresSection`)
- [x] Mini-galeria: 3 imagens, sem rótulos, título "Galeria" → /galeria; re-seed deduplicado
- [x] Formulário: manter só nome, email, empresa, telefone, mensagem (schema + BriefForm + api/brief)
- [x] tsc + lint + dev (home e /contato → 200, sem erros)

## Rodada 3 — serviços, fecho e polish
- [x] Serviços em 2 colunas + accordion com descrição (abertura exclusiva)
      → `ServicosLista` (server) + `ServicosAccordion` (client, estado) + `ServicoItem` (item controlado)
- [x] Remover botão "Sobre nós" do manifesto
- [x] Fundo da mini-galeria: cream → olive (mesmo do resto do site)
- [x] Mini-galeria: título "Galeria" linka p/ /galeria; 3 imagens; sem rótulos
- [x] Fecho antes do rodapé (`Fecho.tsx`) — usa paginaContato.fecho (script "magic." + caption), bookend do hero

## Rodada 4 — resolução das pendências
- [x] "Elevare duplicado" era só um **draft pendente** (única diff: ordem 1→2, resto idêntico).
      Decisão: publicar ordem=2 + descartar o draft. Dataset agora limpo/sequencial
      (Fazenda Garden 1, Elevare 2, Serras 3, Nilo 4; Believe/Harmonia sem ordem).
- [x] Curadoria da mini-galeria: **manter os 3 atuais** (Elevare, Fazenda Garden, Serras).
      A mini-galeria referencia projetos por _id, então publicar Elevare=2 não a alterou.
- [x] Ajuste fino do fecho: script "magic." reduzido `clamp(4.5rem,15vw,12rem)` →
      `clamp(3.5rem,11vw,9rem)` (mais contido). tsc + lint OK, home 200.

## Rodada 5 — polish de layout + galeria horizontal
- [x] Fecho: script "magic." menor (`clamp(3.5rem,11vw,9rem)`); wordmark "wizards"
      ajustado p/ 23vw + `whitespace-nowrap`; opacidade movida p/ o elemento
      (`text-cream opacity-[0.035]`) — some o acúmulo de alpha nas letras sobrepostas.
- [x] Números na Home (ManifestoSection): removido card `bg-cream`, integrado ao
      fundo olive com separador (`border-t`) e texto claro. (/sobre mantém cream.)
- [x] Container ganhou prop `width` ('wrap'|'wide'|'full'); Manifesto/Pilares/Galeria
      usam `width="wide"` (max-w 1760px) — conteúdo menos "centralizado".
- [x] Padding vertical das 3 seções: `py-24 md:py-32` → `py-16 md:py-20`.
- [x] Manifesto: texto `md:text-xl` sem `max-w-prose`; coluna com `lg:pt-8`.
- [x] Pilares: removida a numeração 01/02/03 (só imagem + título + descrição).
- [x] Galeria → scroll horizontal com pin (reusa `HorizontalScroll`). 7 imagens
      montadas de capa + fotos internas dos projetos (query `galeriaHomeProjetosQuery`,
      tipo `GaleriaHomeProjeto`, helper `montarImagens`). Altura fixa 62vh, aspect 3/4.
      Cabeçalho segue editável via `miniGaleria` (eyebrow/titulo/descricao).
- Schema `miniGaleria.itens` mantido (decisão do cliente), embora a Home não use mais.
- [x] Studio (`structure.ts`): grupo "🏠 Landing Page (Home)" no topo mapeando as
      seções da landing às fontes (Home, Equipe, Sobre→números, Pilares, Serviços,
      Projetos→galeria, Contato→brief/fecho). Páginas internas e Catálogos abaixo.
- [x] Push da branch `feat/landing-page` para o GitHub (gera preview na Vercel).

## Pendências remanescentes
- Ver se `/contato` também deve receber o Fecho (hoje só na landing) — não decidido ainda.
- Validar visualmente o scroll horizontal da galeria (efeito de pin) no browser.

## Notas de infra
- Seed helper: `node scripts/seed-mini-galeria.mjs` (repopula mini-galeria com 3 capas deduplicadas).
- Mudanças de conteúdo do Sanity vivem no dataset, não no git (só o código vai versionado).

## Review
- `/` agora é a landing de 6 seções. `tsc`, `next lint` e `next build` passam (exit 0).
- Seções 2 (números/equipe) e 6 (brief/direto) puxam de docs já existentes no
  Sanity (paginaSobre, membros, paginaContato, config) → renderizam com o conteúdo atual.
- **Ação manual pendente (Studio /admin):** popular "Página: Home → Mini-galeria"
  com 3–6 imagens, vinculando um projeto em cada. Enquanto vazio, a seção 5 não
  renderiza (empty state). As demais seções já aparecem.
- Páginas internas (`/sobre`, `/servicos`, `/projetos`, `/galeria`, `/contato`)
  permanecem intactas e acessíveis.
- Âncoras via `HashScroll` (já existente); menu mobile fecha ao clicar.
