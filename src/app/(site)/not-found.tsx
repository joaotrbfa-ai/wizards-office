import { NotFoundContent } from '@/components/NotFoundContent'

// Captura notFound() disparado dentro do site (ex.: slug de projeto inválido).
// O chrome (Header/Footer) vem do (site)/layout.tsx.
export default function NotFound() {
  return <NotFoundContent />
}
