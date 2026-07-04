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

## Estado atual / retomar segunda
- Landing 100% montada e verificada (tsc + lint + build/dev todos verdes).
- Seed helper: `node scripts/seed-mini-galeria.mjs` (repopula mini-galeria com 3 capas deduplicadas).
- **Pendências abertas para decidir:**
  - Projeto "Elevare" duplicado no dataset (2 docs, mesmo slug) — limpar no Studio.
  - Curadoria da mini-galeria (quais 3 projetos) — hoje pega os 3 primeiros por ordem.
  - Ajuste fino visual do fecho (tamanho do script/wordmark) — aguardando feedback.
  - Ver se `/contato` também deve receber o Fecho (hoje só na landing).
- Não commitado ainda em relação a conteúdo do Sanity (mudanças de dados vivem no dataset, não no git).

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
