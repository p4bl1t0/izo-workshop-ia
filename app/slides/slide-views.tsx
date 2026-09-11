import { Fragment } from 'react'
import type { DeckSlide } from '@/lib/revealDeck'

function Kicker({ children }: { children?: string }) {
  if (!children) return null
  return <p className="izo-kicker">{children}</p>
}

function Notes({ text }: { text: string }) {
  return <aside className="notes">{text}</aside>
}

function TitleSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <div className="izo-brand">
        <img src="/logo-izo.webp" alt="Instituto Zona Oeste" />
        <p>Instituto Zona Oeste</p>
      </div>
      <Kicker>{slide.kicker}</Kicker>
      <h1 className="izo-title">{slide.title}</h1>
      {slide.subtitle && <p className="izo-subtitle">{slide.subtitle}</p>}
      {slide.meta && (
        <div className="izo-meta">
          {slide.meta.map((item) => (
            <span key={item} className="izo-pill">
              {item}
            </span>
          ))}
        </div>
      )}
      <Notes text={notes} />
    </div>
  )
}

function SectionSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-section-title">{slide.title}</h2>
      {slide.subtitle && <p className="izo-subtitle wide">{slide.subtitle}</p>}
      <Notes text={notes} />
    </div>
  )
}

function HookSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <p className="izo-hand">{slide.kicker ?? 'Levantá la mano'}</p>
      <h2 className="izo-question">{slide.question}</h2>
      {slide.hint && <p className="izo-hint-line fragment fade-up">{slide.hint}</p>}
      <Notes text={notes} />
    </div>
  )
}

function BulletsSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      <ul className="izo-list">
        {slide.bullets?.map((item) => (
          <li key={item} className="fragment fade-up">
            {item}
          </li>
        ))}
      </ul>
      {slide.subtitle && <p className="izo-hint-line fragment fade-up">{slide.subtitle}</p>}
      <Notes text={notes} />
    </div>
  )
}

function FlowSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  const steps = slide.steps ?? []
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      <div className="izo-flow">
        {steps.map((step, index) => (
          <Fragment key={step}>
            <span className="izo-chip fragment fade-up">{step}</span>
            {index < steps.length - 1 && <span className="izo-arrow fragment fade-up">→</span>}
          </Fragment>
        ))}
      </div>
      {slide.subtitle && <p className="izo-hint-line fragment fade-up">{slide.subtitle}</p>}
      <Notes text={notes} />
    </div>
  )
}

function FormulaSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  const parts = slide.parts ?? []
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      <div className="izo-formula">
        {parts.map((part, index) => (
          <Fragment key={part}>
            <span className="izo-part fragment fade-up">{part}</span>
            {index < parts.length - 1 && <span className="izo-plus fragment fade-up">+</span>}
          </Fragment>
        ))}
        <span className="izo-eq fragment fade-up">=</span>
        <span className="izo-result fragment fade-up">{slide.result}</span>
      </div>
      <Notes text={notes} />
    </div>
  )
}

function CardsSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      <div className="izo-grid">
        {slide.cards?.map((card) => (
          <article key={card.title} className="izo-card fragment fade-up">
            {card.kicker && <strong>{card.kicker}</strong>}
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
      <Notes text={notes} />
    </div>
  )
}

function CompareSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      <div className="izo-cols">
        {slide.columns?.map((col) => (
          <article key={col.title} className={`izo-col ${col.accent ?? ''} fragment fade-up`}>
            <h3>{col.title}</h3>
            <ul>
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Notes text={notes} />
    </div>
  )
}

function TicketSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      {slide.ticket && (
        <div className="izo-ticket fragment fade-up">
          <span>{slide.ticket.label}</span>
          <p>{slide.ticket.body}</p>
        </div>
      )}
      {slide.subtitle && <p className="izo-hint-line fragment fade-up">{slide.subtitle}</p>}
      <Notes text={notes} />
    </div>
  )
}

function ActivitySlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <div className="izo-clock">
        <b data-countdown="1500">25:00</b>
        <span>en el reloj</span>
      </div>
      <h2 className="izo-title">{slide.title}</h2>
      {slide.ticket && (
        <div className="izo-ticket fragment fade-up">
          <span>{slide.ticket.label}</span>
          <p>{slide.ticket.body}</p>
        </div>
      )}
      {slide.meta && (
        <div className="izo-meta">
          {slide.meta.map((item) => (
            <span key={item} className="izo-pill fragment fade-up">
              {item}
            </span>
          ))}
        </div>
      )}
      <ul className="izo-list">
        {slide.bullets?.map((item) => (
          <li key={item} className="fragment fade-up">
            {item}
          </li>
        ))}
      </ul>
      <Notes text={notes} />
    </div>
  )
}

function ChallengeSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-title">{slide.title}</h2>
      {slide.subtitle && <p className="izo-subtitle wide">{slide.subtitle}</p>}
      <ul className="izo-list">
        {slide.bullets?.map((item) => (
          <li key={item} className="fragment fade-up">
            {item}
          </li>
        ))}
      </ul>
      <div className="izo-ca">
        {slide.cards?.map((card) => (
          <div key={card.title} className="fragment fade-up">
            <strong>{card.title}</strong>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
      <Notes text={notes} />
    </div>
  )
}

function QuoteSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <blockquote className="izo-quote">{slide.quote}</blockquote>
      {slide.attribution && <p className="izo-attr fragment fade-up">{slide.attribution}</p>}
      <Notes text={notes} />
    </div>
  )
}

function ThanksSlide({ slide, notes }: { slide: DeckSlide; notes: string }) {
  return (
    <div className="izo-slide">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="izo-thanks">{slide.title}</h2>
      {slide.subtitle && <p className="izo-subtitle wide">{slide.subtitle}</p>}
      {slide.meta && (
        <div className="izo-meta">
          {slide.meta.map((item) => (
            <span key={item} className="izo-pill">
              {item}
            </span>
          ))}
        </div>
      )}
      <Notes text={notes} />
    </div>
  )
}

export function DeckSlideView({ slide, notes }: { slide: DeckSlide; notes: string }) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} notes={notes} />
    case 'section':
      return <SectionSlide slide={slide} notes={notes} />
    case 'hook':
      return <HookSlide slide={slide} notes={notes} />
    case 'bullets':
      return <BulletsSlide slide={slide} notes={notes} />
    case 'flow':
      return <FlowSlide slide={slide} notes={notes} />
    case 'formula':
      return <FormulaSlide slide={slide} notes={notes} />
    case 'cards':
      return <CardsSlide slide={slide} notes={notes} />
    case 'compare':
      return <CompareSlide slide={slide} notes={notes} />
    case 'ticket':
      return <TicketSlide slide={slide} notes={notes} />
    case 'activity':
      return <ActivitySlide slide={slide} notes={notes} />
    case 'challenge':
      return <ChallengeSlide slide={slide} notes={notes} />
    case 'quote':
      return <QuoteSlide slide={slide} notes={notes} />
    case 'thanks':
      return <ThanksSlide slide={slide} notes={notes} />
  }
}
