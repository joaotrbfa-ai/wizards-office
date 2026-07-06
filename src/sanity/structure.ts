import type { StructureBuilder, StructureResolver } from 'sanity/structure'

/**
 * Singleton: item de menu que abre direto o documento (documentId = nome do tipo).
 * `id` permite reaproveitar o mesmo singleton em grupos diferentes sem colidir.
 */
function singleton(S: StructureBuilder, type: string, title: string, id = type) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(type))
}

/** Atalho para um catálogo (lista de documentos de um tipo), com id customizável. */
function catalog(S: StructureBuilder, type: string, title: string, id = type) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(S.documentTypeList(type).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      // ===== Landing Page (Home) — seções na ordem em que aparecem no site =====
      // A Home é uma landing única que reaproveita conteúdo de vários documentos;
      // este grupo é o mapa: cada item aponta para a fonte da respectiva seção.
      S.listItem()
        .title('🏠 Landing Page (Home)')
        .id('landing')
        .child(
          S.list()
            .title('Landing — seções na ordem do site')
            .items([
              singleton(S, 'paginaHome', '1 · Hero · Manifesto · Galeria (cabeçalho)', 'lp-home'),
              catalog(S, 'membro', '2 · Equipe (retratos do manifesto)', 'lp-membros'),
              singleton(S, 'paginaSobre', '3 · Números que nos definem', 'lp-numeros'),
              catalog(S, 'pilar', '4 · Pilares (Direção · Narrativa · Confiança)', 'lp-pilares'),
              catalog(S, 'servico', '5 · Serviços', 'lp-servicos'),
              catalog(S, 'projeto', '6 · Galeria (capas e fotos dos projetos)', 'lp-projetos'),
              singleton(S, 'paginaContato', '7 · Contato (Brief) e Fecho', 'lp-contato'),
              S.divider(),
              singleton(S, 'config', 'Configurações do site (contato, tema)', 'lp-config'),
            ]),
        ),
      S.divider(),

      // ===== Páginas internas (as rotas /sobre, /servicos, etc. ainda existem) =====
      S.listItem()
        .title('Páginas internas')
        .id('paginas')
        .child(
          S.list()
            .title('Páginas internas')
            .items([
              singleton(S, 'config', 'Configurações do site'),
              S.divider(),
              singleton(S, 'paginaHome', 'Página: Home'),
              singleton(S, 'paginaSobre', 'Página: Sobre'),
              singleton(S, 'paginaServicos', 'Página: Serviços'),
              singleton(S, 'paginaProjetos', 'Página: Projetos'),
              singleton(S, 'paginaGaleria', 'Página: Galeria'),
              singleton(S, 'paginaContato', 'Página: Contato'),
            ]),
        ),
      S.divider(),

      // ===== Catálogos =====
      S.listItem()
        .title('Catálogos')
        .id('catalogos')
        .child(
          S.list()
            .title('Catálogos')
            .items([
              S.documentTypeListItem('projeto').title('Projetos'),
              S.documentTypeListItem('pilar').title('Pilares'),
              S.documentTypeListItem('servico').title('Serviços'),
              S.documentTypeListItem('etapaProcesso').title('Etapas do Processo'),
              S.documentTypeListItem('membro').title('Equipe'),
              S.documentTypeListItem('parceiro').title('Parceiros'),
            ]),
        ),
    ])
