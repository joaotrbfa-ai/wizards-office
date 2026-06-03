import { DM_Serif_Display, Pinyon_Script } from 'next/font/google'
// import localFont from 'next/font/local'

/**
 * Tipografia do wzds.
 *
 * Fonte principal (sans / workhorse): NEUE MONTREAL.
 * Como ainda não temos os arquivos auto-hospedados, usamos "General Sans"
 * da Fontshare como substituto próximo (importada via @import em globals.css).
 *
 * Para migrar para Neue Montreal:
 *   1) Adicione NeueMontreal-Medium.woff2 e NeueMontreal-Bold.woff2 em /public/fonts
 *   2) Descomente o bloco `sans` abaixo, comente o fallback `sansVariable`
 *   3) Remova o @import do General Sans em globals.css
 *
 * Esse arquivo é o ÚNICO ponto de troca.
 */

// ---------- Fonte principal (sans) ----------
// SELF-HOST (ativar quando os arquivos existirem):
// export const sans = localFont({
//   src: [
//     { path: '../../public/fonts/NeueMontreal-Medium.woff2', weight: '500', style: 'normal' },
//     { path: '../../public/fonts/NeueMontreal-Bold.woff2', weight: '700', style: 'normal' },
//   ],
//   variable: '--font-sans',
//   display: 'swap',
// })

// FALLBACK (General Sans via @import em globals.css):
// expomos apenas a variável CSS — o nome da família já é resolvido em globals.css.
export const sansVariable = '--font-sans'

// ---------- Fonte editorial (serif) ----------
export const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
})

// ---------- Fonte de detalhe (script) ----------
export const script = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})
