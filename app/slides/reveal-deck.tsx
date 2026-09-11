'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { deckSlides, formatSpeakerNotes } from '@/lib/revealDeck'
import { DeckSlideView } from './slide-views'

import 'reveal.js/reveal.css'
import './slides.css'

export function RevealDeck() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = deckRef.current
    if (!el) return

    let destroyed = false
    let deck: { destroy: () => void } | null = null

    const boot = async () => {
      const [{ default: Reveal }, { default: RevealNotes }, { default: RevealSearch }, { default: RevealZoom }] =
        await Promise.all([
          import('reveal.js'),
          import('reveal.js/plugin/notes'),
          import('reveal.js/plugin/search'),
          import('reveal.js/plugin/zoom'),
        ])

      if (destroyed || !deckRef.current) return

      const instance = new Reveal(el, {
        hash: true,
        history: true,
        slideNumber: 'c/t',
        progress: true,
        controls: true,
        controlsTutorial: true,
        center: false,
        width: 1280,
        height: 720,
        margin: 0.08,
        minScale: 0.3,
        maxScale: 1.8,
        transition: 'slide',
        backgroundTransition: 'fade',
        autoAnimate: true,
        autoAnimateDuration: 0.7,
        fragments: true,
        fragmentInURL: true,
        hideInactiveCursor: true,
        previewLinks: false,
        plugins: [RevealNotes, RevealZoom, RevealSearch],
      })

      await instance.initialize()
      if (destroyed) {
        instance.destroy()
        return
      }

      let timerId: number | null = null
      const stopTimer = () => {
        if (timerId !== null) {
          window.clearInterval(timerId)
          timerId = null
        }
      }
      const startTimer = (root: HTMLElement) => {
        const display = root.querySelector<HTMLElement>('[data-countdown]')
        if (!display) return
        stopTimer()
        let remaining = Number(display.dataset.countdown || 1500)
        const render = () => {
          const mins = String(Math.floor(remaining / 60)).padStart(2, '0')
          const secs = String(remaining % 60).padStart(2, '0')
          display.textContent = `${mins}:${secs}`
        }
        render()
        timerId = window.setInterval(() => {
          remaining = Math.max(0, remaining - 1)
          render()
          if (remaining === 0) stopTimer()
        }, 1000)
      }

      const current = instance.getCurrentSlide()
      if (current) startTimer(current)
      instance.on('slidechanged', (event: { currentSlide: HTMLElement }) => {
        stopTimer()
        startTimer(event.currentSlide)
      })

      deck = {
        destroy: () => {
          stopTimer()
          instance.destroy()
        },
      }
    }

    void boot()

    return () => {
      destroyed = true
      deck?.destroy()
    }
  }, [])

  return (
    <div className="reveal-page">
      <div className="izo-chrome">
        <Link href="/" className="izo-back">
          ← Sitio del workshop
        </Link>
        <span className="izo-hint">← → avanzar · F pantalla completa · S notas · O mapa</span>
      </div>
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          {deckSlides.map((slide, index) => (
            <section
              key={`${slide.type}-${slide.title ?? slide.question ?? index}`}
              data-auto-animate={slide.autoAnimate ? 'true' : undefined}
              data-background-gradient={slide.background}
              data-background-color={slide.background ? undefined : '#121318'}
            >
              <DeckSlideView slide={slide} notes={formatSpeakerNotes(slide.sourceId)} />
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
