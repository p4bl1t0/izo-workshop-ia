import type { Metadata } from 'next'
import { RevealDeck } from './reveal-deck'

export const metadata: Metadata = {
  title: 'Diapositivas · Desarrollo con Agentes de IA',
  description:
    'Presentación Reveal.js del workshop Desarrollo con Agentes de IA. Del IDE al ADE.',
}

export default function SlidesPage() {
  return <RevealDeck />
}
