import type { StructureBuilder, StructureResolver } from 'sanity/structure'

/** Singleton: item de menu que abre direto o documento (id = nome do tipo), sem lista. */
function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Conteúdo das páginas')
        .id('paginas')
        .child(
          S.list()
            .title('Conteúdo das páginas')
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
