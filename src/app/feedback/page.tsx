import { notFound } from 'next/navigation';

// Página retirada: en vez de servir un 200 vacío (malo para SEO), devuelve
// un 404 real para que no quede indexada como contenido fino/vacío.
export default function FeedbackPage() {
  notFound();
}
