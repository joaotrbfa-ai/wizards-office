// Baixa imagens do site antigo (wizardsoffice.com) para /public/projects e /public/partners.
// Uso (na raiz do projeto):
//   node scripts/fetch-old-site-images.mjs
//
// Requer Node 18+ (usa fetch global). Sobrescreve arquivos existentes.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')
const PUBLIC_DIR = join(ROOT, 'public')

const HOST = 'https://wizardsoffice.com'
const BASE = `${HOST}/var/assets/img/media/original`

// Brizy Cloud não serve o path /original/ para alguns assets (retorna HTTP 404).
// Para esses, baixamos a maior variante do endpoint de transform (sempre
// disponível — é a URL que o próprio site usa em produção).
const TRANSFORM_OVERRIDES = {
  'projects/cena-06.jpg':
    '/var/assets/img/media/iW=900&iH=1126&oX=0&oY=0&cW=900&cH=1126/2f2361f5bd9e80b42bdcc8d7e898968f/CENA-06.jpg',
  'projects/wow-rv-001-hall-05.jpg':
    '/var/assets/img/media/iW=1134&iH=1134&oX=118&oY=0&cW=900&cH=1134/fa7bf022549ab51f2e797b14e6afaba9/WOW-RV-001-HALL-05-E02.jpg',
  'projects/wow-ppt-002-fachada-01.jpg':
    '/var/assets/img/media/iW=900&iH=1200&oX=0&oY=30&cW=900&cH=1140/b6dbebe12e3a273c11e7220693e52993/WOW-PPT-002-FACHADA-01-E02.jpg',
  'partners/rv.png':
    '/var/assets/img/media/iW=420&iH=420&oX=0&oY=50&cW=420&cH=320/df1be9da815cd7fd0462a0bce33d6352/RV.png',
  'partners/racitec.png':
    '/var/assets/img/media/iW=410&iH=410&oX=0&oY=46&cW=410&cH=318/b2159a889a47db674b977c250336c93d/racitec.png',
  'partners/brasa.png':
    '/var/assets/img/media/iW=580&iH=580&oX=0&oY=122&cW=580&cH=336/6a081e66ecb11bcd46416ea7bb7e4aa4/brasa.png',
  'partners/untitled.png':
    '/var/assets/img/media/iW=780&iH=780&oX=0&oY=220&cW=780&cH=338/9b1f4b51c41048d52d72a2e4793455cc/Untitled-1.png',
  'partners/procave.png':
    '/var/assets/img/media/iW=440&iH=440&oX=0&oY=56&cW=440&cH=330/8e57a87c788ca7fbd81c0c63c063befd/PROCAVE.png',
  'partners/fhobus.png':
    '/var/assets/img/media/iW=674&iH=674&oX=82&oY=174&cW=510&cH=326/c4c48255d19ca4aaf1678cfb3291bd19/f-hobus.png',
}

/** [hash do asset no CMS, nome de arquivo original, destino relativo a /public] */
const ASSETS = [
  // ---- Projetos (Home + Pilares) ----
  ['2f2361f5bd9e80b42bdcc8d7e898968f', 'CENA-06.jpg',                            'projects/cena-06.jpg'],
  ['fa7bf022549ab51f2e797b14e6afaba9', 'WOW-RV-001-HALL-05-E02.jpg',             'projects/wow-rv-001-hall-05.jpg'],
  ['b6dbebe12e3a273c11e7220693e52993', 'WOW-PPT-002-FACHADA-01-E02.jpg',         'projects/wow-ppt-002-fachada-01.jpg'],
  ['239842a407c1dc16745f92399adb5b39', 'WOW-RV-001-WINE-GOURMET-01-E02-REEDITADO.jpg', 'projects/wow-rv-001-wine-gourmet.jpg'],
  ['c64b260b1d95338022640f07db603fb5', 'WOW-RV-003-FACHADA-GERAL-DIURNA-E02.jpg', 'projects/wow-rv-003-fachada-diurna.jpg'],

  // ---- Extras úteis (galeria / serviços) ----
  ['2f772d0fe0a393c78e3eceb9d11894a2', 'WOW-ART-001-SUITE-GARDEN-E02-REEDITADA.jpg', 'projects/wow-art-001-suite-garden.jpg'],
  ['20912685a10cff3da855004ea2c9acda', 'WOW-RV-001-HALL-03-E02.jpg',             'projects/wow-rv-001-hall-03.jpg'],
  ['568d9d3b6990674fc75951f1dc08bcc7', 'WOW-PPT-002-WINECLUB-02-E02-PLAYER.jpg', 'projects/wow-ppt-002-wineclub.jpg'],
  ['bd75fa39b113dd0a748fb4047d00810a', 'WOW-RV-001-FACHADA-ANGULADA-E03.jpg',    'projects/wow-rv-001-fachada-angulada.jpg'],
  ['c85b6ef0c1cca207c147f4b3d9418d07', 'BLESSED-FACHADA-03.jpg',                 'projects/blessed-fachada-03.jpg'],

  // ---- Partners (logos PNG, sem versão SVG no site antigo) ----
  ['df1be9da815cd7fd0462a0bce33d6352', 'RV.png',          'partners/rv.png'],
  ['b2159a889a47db674b977c250336c93d', 'racitec.png',     'partners/racitec.png'],
  ['6a081e66ecb11bcd46416ea7bb7e4aa4', 'brasa.png',       'partners/brasa.png'],
  ['9b1f4b51c41048d52d72a2e4793455cc', 'Untitled-1.png',  'partners/untitled.png'],
  ['8e57a87c788ca7fbd81c0c63c063befd', 'PROCAVE.png',     'partners/procave.png'],
  ['becb6fa4639edf86f8b98ede6ab8add6', 'PROSPERITA.png',  'partners/prosperita.png'],
  ['c4c48255d19ca4aaf1678cfb3291bd19', 'f-hobus.png',     'partners/fhobus.png'],

  // ---- Logo da marca (caso queira reaproveitar) ----
  ['976660055f8a2f611e2f7b71b3655171', 'LOGO-COR-2---BEGE-CLARO.png', 'brand/logo-bege-claro.png'],
]

async function download([hash, filename, dest]) {
  const url = TRANSFORM_OVERRIDES[dest]
    ? HOST + TRANSFORM_OVERRIDES[dest]
    : `${BASE}/${hash}/${encodeURIComponent(filename)}`
  const outPath = join(PUBLIC_DIR, dest)

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WizardsOffice-Migration/1.0)',
        Accept: 'image/*,*/*;q=0.8',
      },
    })
    if (!res.ok) {
      console.log(`  ✗ ${dest}  (HTTP ${res.status})`)
      return false
    }
    const buf = Buffer.from(await res.arrayBuffer())
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, buf)
    const kb = (buf.byteLength / 1024).toFixed(0)
    console.log(`  ✓ ${dest}  (${kb} KB)`)
    return true
  } catch (err) {
    console.log(`  ✗ ${dest}  (${err.message})`)
    return false
  }
}

;(async () => {
  console.log(`\nBaixando ${ASSETS.length} arquivos para ${PUBLIC_DIR}\n`)
  const results = await Promise.all(ASSETS.map(download))
  const ok = results.filter(Boolean).length
  console.log(`\nFinalizado: ${ok}/${ASSETS.length} arquivos baixados.`)
  if (ok < ASSETS.length) {
    console.log('Alguns falharam — pode ser que o asset tenha sido removido do CMS antigo.')
    process.exit(1)
  }
})()
