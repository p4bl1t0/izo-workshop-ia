import type { Metadata } from 'next'
import { RevealDeck } from './reveal-deck'

export const metadata: Metadata = {
  title: 'Diapositivas · Fundamentos de IA para Desarrolladores',
  description:
    'Presentación Reveal.js del workshop Fundamentos de IA para Desarrolladores. Del IDE al ADE.',
}

export default function SlidesPage() {
  return <RevealDeck />
}
