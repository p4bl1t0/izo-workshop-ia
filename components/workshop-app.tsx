'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Card,
  DiagramBlock,
  MetaBadge,
  QuoteBlock,
  SectionHeader,
  TakeawayGrid,
  TeacherNotesBlock,
} from '@/components/ui-blocks'
import { demoBaseProjectPath, demoPriorityLabel, demoPromptPaths, demos } from '@/lib/demosData'
import { glossaryTerms } from '@/lib/glossaryData'
import { resourceGroups } from '@/lib/resources'
import { rubricCriteria, rubricTotal } from '@/lib/rubric'
import { slides } from '@/lib/slidesData'
import {
  closingReflection,
  contentBlocks,
  facilitationGuide,
  finalChallenge,
  orcaCaseStudy,
  pedagogicalIdeas,
  practicalActivity,
  programBlocks,
  sections,
  workshopMeta,
} from '@/lib/workshopData'

const STORAGE_KEY = 'izo-workshop-ia'
const TOTAL_SECTIONS = sections.length

type ViewMode = 'site' | 'slides' | 'presentation'

export function WorkshopApp() {
  const [active, setActive] = useState('inicio')
  const [completed, setCompleted] = useState<string[]>([])
  const [teacherMode, setTeacherMode] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('site')
  const [slideIndex, setSlideIndex] = useState(0)
  const [glossaryQuery, setGlossaryQuery] = useState('')
  const [expandedDemo, setExpandedDemo] = useState<number | null>(1)
  const [activityChecks, setActivityChecks] = useState<boolean[]>(
    () => new Array(practicalActivity.steps.length).fill(false),
  )
  const [deliveryChecks, setDeliveryChecks] = useState<boolean[]>(
    () => new Array(finalChallenge.deliveryChecklist.length).fill(false),
  )

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const state = JSON.parse(saved)
      setActive(state.active || 'inicio')
      setCompleted(state.completed || [])
      setTeacherMode(Boolean(state.teacherMode))
      setSlideIndex(state.slideIndex || 0)
      setActivityChecks(state.activityChecks || new Array(practicalActivity.steps.length).fill(false))
      setDeliveryChecks(state.deliveryChecks || new Array(finalChallenge.deliveryChecklist.length).fill(false))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ active, completed, teacherMode, slideIndex, activityChecks, deliveryChecks }),
    )
  }, [active, completed, teacherMode, slideIndex, activityChecks, deliveryChecks])

  const slide = slides[slideIndex]
  const totalMinutes = programBlocks.reduce((sum, b) => sum + b.minutes, 0)

  const filteredGlossary = useMemo(() => {
    const q = glossaryQuery.toLowerCase().trim()
    if (!q) return glossaryTerms
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    )
  }, [glossaryQuery])

  const finishSection = () => {
    setCompleted((old) => (old.includes(active) ? old : [...old, active]))
    const idx = sections.findIndex((s) => s.id === active)
    if (idx < sections.length - 1) setActive(sections[idx + 1].id)
  }

  const goToSlides = (mode: ViewMode) => {
    setViewMode(mode)
    setActive('diapositivas')
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (viewMode === 'site') return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setSlideIndex((i) => Math.min(i + 1, slides.length - 1))
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSlideIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Escape') setViewMode('site')
    },
    [viewMode],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (viewMode === 'presentation') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1b1e] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
          <span className="font-mono text-xs text-[#bfbfbf]">
            {String(slideIndex + 1).padStart(2, '0')} / {slides.length}
          </span>
          <button
            onClick={() => setViewMode('site')}
            className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5] hover:text-white"
          >
            Salir (Esc)
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B466]">{slide.section}</p>
          <h2 className="mt-4 max-w-4xl text-center text-4xl font-bold leading-tight md:text-6xl">{slide.title}</h2>
          <ul className="mt-10 max-w-2xl space-y-4">
            {slide.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-xl text-white/85 md:text-2xl">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0077C8]" />
                {b}
              </li>
            ))}
          </ul>
          {slide.diagram && (
            <pre className="mt-10 font-mono text-sm text-[#7ec8f5] md:text-base">{slide.diagram}</pre>
          )}
        </div>
        <div className="flex justify-between border-t border-white/10 px-6 py-4">
          <button
            disabled={slideIndex === 0}
            onClick={() => setSlideIndex((i) => i - 1)}
            className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold disabled:opacity-30"
          >
            ← Anterior
          </button>
          <button
            disabled={slideIndex === slides.length - 1}
            onClick={() => setSlideIndex((i) => i + 1)}
            className="rounded-md bg-[#0077C8] px-4 py-2 text-sm font-bold disabled:opacity-30"
          >
            Siguiente →
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#27282B] text-[#FEFEFE]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#27282B]/90 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <button className="flex items-center gap-3 text-left" onClick={() => { setActive('inicio'); setViewMode('site') }}>
            <Image src="/logo-izo.webp" alt="Instituto Zona Oeste" width={44} height={50} className="h-11 w-auto" priority />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9B466]">Instituto Zona Oeste</p>
              <p className="text-sm font-semibold leading-tight md:text-base">Fundamentos de IA para Desarrolladores</p>
            </div>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTeacherMode((v) => !v)}
              className={`rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                teacherMode ? 'bg-[#D9B466] text-[#27282B]' : 'border border-white/20 text-white/80 hover:bg-white/5'
              }`}
            >
              Modo docente
            </button>
            <button
              onClick={() => goToSlides('presentation')}
              className="rounded-md border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:bg-white/5"
            >
              Modo presentación
            </button>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bfbfbf]">Progreso</p>
                <p className="font-mono text-sm font-bold">{completed.length} / {TOTAL_SECTIONS}</p>
              </div>
              <div
                className="h-10 w-10 rounded-full border-4 border-white/15 border-t-[#0077C8]"
                style={{ transform: `rotate(${completed.length * (360 / TOTAL_SECTIONS)}deg)` }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl md:grid-cols-[270px_1fr]">
        <aside className="border-b border-white/10 px-5 py-5 md:min-h-[calc(100vh-81px)] md:border-b-0 md:border-r md:px-6 md:py-8">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D9B466]">Workshop</p>
          <p className="mb-4 text-sm font-semibold text-white/90">{workshopMeta.subtitle}</p>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#bfbfbf]">Navegación</p>
          <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:gap-1" aria-label="Secciones del workshop">
            {sections.map((item, index) => (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setViewMode('site') }}
                className={`flex min-w-max items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors md:w-full ${
                  active === item.id
                    ? 'bg-[#0077C8]/25 font-bold text-white ring-1 ring-[#0077C8]/50'
                    : 'text-[#bfbfbf] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`font-mono text-xs ${completed.includes(item.id) ? 'text-[#D9B466]' : 'text-white/35'}`}>
                  {completed.includes(item.id) ? '✓' : String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="relative overflow-hidden px-5 py-8 md:px-12 md:py-12 lg:px-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_rgba(0,119,200,0.22),_transparent_65%)]" aria-hidden />
          <div className="relative max-w-3xl">
            {active === 'inicio' && <HomeSection teacherMode={teacherMode} />}
            {active === 'sobre' && <AboutSection teacherMode={teacherMode} />}
            {active === 'programa' && <ProgramSection totalMinutes={totalMinutes} teacherMode={teacherMode} />}
            {active === 'contenidos' && <ContentsSection teacherMode={teacherMode} />}
            {active === 'diapositivas' && (
              <SlidesSection
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
                teacherMode={teacherMode}
                onPresentation={() => goToSlides('presentation')}
              />
            )}
            {active === 'demos' && (
              <DemosSection
                expandedDemo={expandedDemo}
                setExpandedDemo={setExpandedDemo}
                teacherMode={teacherMode}
              />
            )}
            {active === 'actividad' && (
              <ActivitySection
                checks={activityChecks}
                setChecks={setActivityChecks}
                teacherMode={teacherMode}
              />
            )}
            {active === 'desafio' && (
              <ChallengeSection
                checks={deliveryChecks}
                setChecks={setDeliveryChecks}
                teacherMode={teacherMode}
              />
            )}
            {active === 'recursos' && <ResourcesSection />}
            {active === 'glosario' && (
              <GlossarySection query={glossaryQuery} setQuery={setGlossaryQuery} terms={filteredGlossary} />
            )}

            {active !== 'diapositivas' && (
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button
                  onClick={finishSection}
                  className="rounded-md bg-[#0077C8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0099ff]"
                >
                  {active === sections[sections.length - 1].id ? 'Workshop completado' : 'Marcar y continuar'}
                </button>
                <button
                  onClick={() =>
                    setCompleted((old) =>
                      old.includes(active) ? old.filter((id) => id !== active) : [...old, active],
                    )
                  }
                  className="rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white/85 transition hover:bg-white/5"
                >
                  {completed.includes(active) ? 'Sección completada' : 'Marcar para después'}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10 bg-gradient-to-b from-[#27282B] to-[#0077C8] px-5 py-8 text-center text-sm text-white/80 md:px-10">
        <p>Instituto Superior Particular Incorporado Nº 9045 &ldquo;Zona Oeste&rdquo;</p>
        <p className="mt-1 text-white/60">Workshop · {workshopMeta.title}</p>
      </footer>
    </main>
  )
}

function HomeSection({ teacherMode }: { teacherMode: boolean }) {
  return (
    <>
      <SectionHeader eyebrow="Workshop · 2 horas" title={workshopMeta.title} summary={workshopMeta.tagline} />
      <p className="mt-2 text-2xl font-bold text-[#7ec8f5]">{workshopMeta.subtitle}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MetaBadge label="Duración" value={workshopMeta.duration} />
        <MetaBadge label="Nivel" value={workshopMeta.level} />
        <MetaBadge label="Modalidad" value={workshopMeta.modality} />
        <MetaBadge label="Conocimientos previos" value={workshopMeta.prerequisites} />
        <MetaBadge label="Docente" value={workshopMeta.instructor} />
        <MetaBadge label="Después de clase" value="Desafío · 4–6 h" />
      </div>
      <div className="mt-8">
        <QuoteBlock>{workshopMeta.quote}</QuoteBlock>
      </div>
      <div className="mt-8">
        <DiagramBlock content={workshopMeta.coreFlow} label="Eje conceptual del workshop" />
      </div>
      <Card variant="gold">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">Pregunta central</p>
        <p className="mt-3 text-base leading-7 text-white/90">{workshopMeta.centralQuestion}</p>
      </Card>
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Cómo se usa el tiempo</p>
        <p className="mt-3 text-sm leading-6 text-white/85">
          68 minutos de mapa conceptual (paradigma, ecosistema, entornos, contexto, MCP). 37 minutos de método
          aplicado (walkthrough de turnos + actividad de gastos hasta el plan). 15 minutos de cierre y consignas
          del desafío. El código completo se hace en casa, con IA, y se documenta.
        </p>
      </Card>
      {teacherMode && (
        <TeacherNotesBlock>
          <p><strong>Abrir:</strong> {facilitationGuide.pacing[0]}</p>
          <p><strong>Proteger:</strong> la actividad de 25 min. Recortar ADE o MCP, no Context Engineering ni práctica.</p>
          <p><strong>Demos en vivo:</strong> máximo 2 (pobre vs contextualizado, y plan sin código).</p>
        </TeacherNotesBlock>
      )}
    </>
  )
}

function AboutSection({ teacherMode }: { teacherMode: boolean }) {
  return (
    <>
      <SectionHeader
        eyebrow="Contexto"
        title="Sobre el workshop"
        summary="Workshop de 2 horas para estudiantes y desarrolladores de software. Método primero, herramientas como ejemplos."
      />
      <div className="mt-10 grid gap-5">
        <p className="text-base leading-7 text-white/85">
          El objetivo <strong>no</strong> es enseñar a desarrollar aplicaciones de IA ni construir agentes desde cero.
          Es enseñar cómo utilizar modelos, asistentes y agentes como parte del proceso profesional de desarrollo,
          desde un requerimiento hasta software funcionando y validado.
        </p>
        <p className="text-base leading-7 text-white/85">
          En dos horas no se implementa un sistema completo en vivo. Se instala el mapa (modelo ≠ agente, contexto,
          ADE) y se practica el oficio hasta el plan. El desafío asincrónico es donde el alumno cierra el loop con
          código, tests y bitácora de IA.
        </p>
      </div>
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Público</p>
        <p className="mt-3 text-base leading-7 text-white/90">
          Estudiantes y desarrolladores con conocimientos básicos de programación. Nivel intermedio.
          No requieren conocimientos previos de Inteligencia Artificial. La actividad en clase funciona con o sin laptop.
        </p>
      </Card>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Al terminar, el alumno puede</p>
        <ul className="grid gap-2">
          {facilitationGuide.outcomes.map((outcome, i) => (
            <li key={outcome} className="flex gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85">
              <span className="font-mono text-[#D9B466]">{String(i + 1).padStart(2, '0')}</span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">8 ideas pedagógicas</p>
        <ul className="grid gap-2">
          {pedagogicalIdeas.map((idea, i) => (
            <li key={idea} className="flex gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85">
              <span className="font-mono text-[#D9B466]">{String(i + 1).padStart(2, '0')}</span>
              {idea}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Enfoque</p>
        <p className="text-base leading-7 text-white/85">
          Pensamiento crítico + especificación + contexto + agentes + herramientas + validación.
          Las herramientas son ejemplos del paradigma, no el centro del curso.
        </p>
      </div>
      {teacherMode && (
        <div className="mt-8 space-y-4">
          <TeacherNotesBlock title="Guía de facilitación">
            <p><strong>Grupo:</strong> {facilitationGuide.audience}</p>
            <p className="font-semibold text-[#D9B466]">Materiales</p>
            {facilitationGuide.materials.map((m) => (
              <p key={m}>› {m}</p>
            ))}
            <p className="font-semibold text-[#D9B466]">Ritmo</p>
            {facilitationGuide.pacing.map((m) => (
              <p key={m}>› {m}</p>
            ))}
            <p className="font-semibold text-[#D9B466]">Demos</p>
            {facilitationGuide.liveDemos.map((m) => (
              <p key={m}>› {m}</p>
            ))}
            <p className="font-semibold text-[#D9B466]">Si algo falla</p>
            {facilitationGuide.fallbacks.map((m) => (
              <p key={m}>› {m}</p>
            ))}
          </TeacherNotesBlock>
        </div>
      )}
    </>
  )
}

function ProgramSection({ totalMinutes, teacherMode }: { totalMinutes: number; teacherMode: boolean }) {
  return (
    <>
      <SectionHeader
        eyebrow="Agenda · 2 horas"
        title="Programa del workshop"
        summary={`Timeline de ${totalMinutes} minutos: seis bloques de mapa, actividad en clase y cierre con el desafío.`}
      />
      <div className="mt-10 space-y-0">
        {programBlocks.map((block, index) => (
          <div key={block.id} className="relative flex gap-4 pb-8 last:pb-0">
            {index < programBlocks.length - 1 && (
              <div className="absolute left-[19px] top-10 h-full w-px bg-[#0077C8]/30" aria-hidden />
            )}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0077C8]/25 font-mono text-sm font-bold text-[#7ec8f5] ring-1 ring-[#0077C8]/50">
              {String(block.id).padStart(2, '0')}
            </div>
            <div className="flex-1 border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-white">{block.title}</h3>
                <span className="rounded bg-[#0077C8]/20 px-2 py-1 font-mono text-xs text-[#7ec8f5]">
                  {block.duration}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-[#D9B466]">{block.clock}</p>
              <p className="mt-2 text-sm leading-6 text-white/75">{block.description}</p>
              {teacherMode && (
                <div className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-[#D9B466]">
                  {block.teacherNotes.map((note) => (
                    <p key={note} className="mt-1">› {note}</p>
                  ))}
                  <p className="mt-2 text-white/70"><strong>Si vas tarde:</strong> {block.ifLate}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ContentsSection({ teacherMode }: { teacherMode: boolean }) {
  const [expandedBlock, setExpandedBlock] = useState(1)
  return (
    <>
      <SectionHeader
        eyebrow="Teoría · 6 bloques"
        title="Contenidos del workshop"
        summary="Conceptos, ejemplos, malentendidos frecuentes, mini-actividades y notas para facilitar cada bloque."
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {contentBlocks.map((block) => (
          <button
            key={block.id}
            onClick={() => setExpandedBlock(block.id)}
            className={`rounded-md px-3 py-2 text-xs font-bold transition ${
              expandedBlock === block.id
                ? 'bg-[#0077C8] text-white'
                : 'border border-white/15 text-white/70 hover:bg-white/5'
            }`}
          >
            Bloque {block.id}
          </button>
        ))}
      </div>
      {contentBlocks
        .filter((b) => b.id === expandedBlock)
        .map((block) => (
          <div key={block.id} className="mt-8">
            <h2 className="text-2xl font-bold">{block.title}</h2>
            <Card variant="blue">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Objetivo</p>
              <p className="mt-2 text-sm leading-6 text-white/90">{block.objective}</p>
            </Card>
            <div className="mt-6 grid gap-4">
              {block.body.map((p) => (
                <p key={p} className="text-base leading-7 text-white/85">{p}</p>
              ))}
            </div>
            {block.keyConcept && <div className="mt-6"><DiagramBlock content={block.keyConcept} label="Concepto clave" /></div>}
            {block.diagram && <div className="mt-6"><DiagramBlock content={block.diagram} label="Diagrama" /></div>}
            {block.table && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {block.table.headers.map((h) => (
                        <th key={h} className="border border-white/15 bg-[#0077C8]/15 px-3 py-2 text-left font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="border border-white/10 px-3 py-2 text-white/85">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {block.examples && block.examples.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Ejemplos de clase</p>
                {block.examples.map((ex) => (
                  <Card key={ex.title}>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">{ex.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/85">{ex.body}</p>
                  </Card>
                ))}
              </div>
            )}
            {block.misconceptions && block.misconceptions.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Malentendidos frecuentes</p>
                {block.misconceptions.map((m) => (
                  <div key={m.wrong} className="border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-sm text-white/55">{m.wrong}</p>
                    <p className="mt-2 text-sm leading-6 text-white/90">{m.right}</p>
                  </div>
                ))}
              </div>
            )}
            {block.id === 3 && (
              <Card variant="blue">
                <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">{orcaCaseStudy.title}</p>
                {orcaCaseStudy.body.map((p) => (
                  <p key={p} className="mt-3 text-sm leading-6 text-white/85">{p}</p>
                ))}
                <a href={orcaCaseStudy.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-[#7ec8f5] underline">
                  {orcaCaseStudy.url}
                </a>
              </Card>
            )}
            <div className="mt-6"><TakeawayGrid items={block.takeaways} /></div>
            {block.miniActivity && (
              <Card variant="gold">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">
                  Mini-actividad · {block.miniActivity.duration} · {block.miniActivity.grouping}
                </p>
                <p className="mt-2 text-base font-semibold leading-7">{block.miniActivity.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/85">{block.miniActivity.prompt}</p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-white/80">
                  {block.miniActivity.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                {teacherMode && (
                  <div className="mt-4 border-t border-[#D9B466]/25 pt-3 text-sm text-white/85">
                    <p className="font-semibold text-[#D9B466]">Salidas esperadas</p>
                    {block.miniActivity.expectedOutput.map((o) => (
                      <p key={o} className="mt-1">› {o}</p>
                    ))}
                    <p className="mt-3"><strong>Cierre:</strong> {block.miniActivity.debrief}</p>
                  </div>
                )}
              </Card>
            )}
            {teacherMode && (
              <div className="mt-4">
                <TeacherNotesBlock>
                  <p><strong>Ritmo:</strong> {block.teacherNotes.pacing}</p>
                  <p><strong>Decir:</strong> {block.teacherNotes.say}</p>
                  <p><strong>Atender:</strong> {block.teacherNotes.watchFor}</p>
                  <p><strong>Si vas tarde:</strong> {block.teacherNotes.ifLate}</p>
                  <p><strong>Malentendido:</strong> {block.teacherNotes.misconception}</p>
                </TeacherNotesBlock>
              </div>
            )}
          </div>
        ))}
    </>
  )
}

function SlidesSection({
  slideIndex,
  setSlideIndex,
  teacherMode,
  onPresentation,
}: {
  slideIndex: number
  setSlideIndex: (i: number) => void
  teacherMode: boolean
  onPresentation: () => void
}) {
  const slide = slides[slideIndex]
  return (
    <>
      <SectionHeader
        eyebrow={`Presentación · ${slides.length} diapositivas`}
        title="Diapositivas"
        summary="Pensadas para 2 horas. Activá modo docente para ver tiempo, guion y notas de corte."
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={onPresentation} className="rounded-md bg-[#0077C8] px-4 py-2 text-sm font-bold text-white hover:bg-[#0099ff]">
          Modo presentación
        </button>
        <span className="flex items-center font-mono text-sm text-[#bfbfbf]">
          {String(slideIndex + 1).padStart(2, '0')} / {slides.length}
        </span>
      </div>
      <div className="mt-8 border border-white/15 bg-[#1c1d20] p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B466]">{slide.section}</p>
        <h2 className="mt-3 text-3xl font-bold">{slide.title}</h2>
        <ul className="mt-6 space-y-3">
          {slide.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-base text-white/85">
              <span className="text-[#0077C8]">▸</span>{b}
            </li>
          ))}
        </ul>
        {slide.diagram && <pre className="mt-6 font-mono text-sm text-[#7ec8f5]">{slide.diagram}</pre>}
      </div>
      {teacherMode && (
        <Card variant="gold">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">Notas del docente</p>
          <div className="mt-4 grid gap-3 text-sm text-white/85">
            <p><strong>Tiempo:</strong> {slide.teacherNotes.time}</p>
            <p><strong>Explicar:</strong> {slide.teacherNotes.explain}</p>
            <p><strong>Idea principal:</strong> {slide.teacherNotes.mainIdea}</p>
            <p><strong>Ejemplo:</strong> {slide.teacherNotes.example}</p>
            <p><strong>Pregunta al público:</strong> {slide.teacherNotes.question}</p>
            <p><strong>Transición:</strong> {slide.teacherNotes.transition}</p>
            {slide.teacherNotes.note && <p><strong>Nota:</strong> {slide.teacherNotes.note}</p>}
          </div>
        </Card>
      )}
      <div className="mt-6 flex justify-between">
        <button
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex(slideIndex - 1)}
          className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold disabled:opacity-30"
        >
          ← Anterior
        </button>
        <button
          disabled={slideIndex === slides.length - 1}
          onClick={() => setSlideIndex(slideIndex + 1)}
          className="rounded-md bg-[#0077C8] px-4 py-2 text-sm font-bold disabled:opacity-30"
        >
          Siguiente →
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-1">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSlideIndex(i)}
            className={`h-8 w-8 text-xs font-bold ${i === slideIndex ? 'bg-[#0077C8] text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
            title={s.title}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  )
}

function DemosSection({
  expandedDemo,
  setExpandedDemo,
  teacherMode,
}: {
  expandedDemo: number | null
  setExpandedDemo: (id: number | null) => void
  teacherMode: boolean
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Práctica guiada · 8 demos"
        title="Demostraciones"
        summary="En 2 horas, como máximo dos en vivo (1 y 3). Prompts listos en demos/prompts/ y un solo proyecto base."
      />
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Proyecto base (copiar o abrir)</p>
        <p className="mt-2 font-mono text-sm text-white/90">{demoBaseProjectPath}/</p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          Next.js + Zod + Vitest, auth por <code className="text-[#7ec8f5]">X-User-Id</code>,{' '}
          <code className="text-[#7ec8f5]">AGENTS.md</code> y <code className="text-[#7ec8f5]">SPEC.md</code>.
          Demos 1–7 usan esta misma carpeta. Antes de clase: <code className="text-[#7ec8f5]">npm install && npm test</code>.
        </p>
        <p className="mt-3 text-sm text-white/60">
          Guía: <span className="font-mono text-[#D9B466]">{demoPromptPaths.baseReadme}</span>
          {' · '}
          Setup: <span className="font-mono text-[#D9B466]">{demoPromptPaths.setup}</span>
        </p>
      </Card>
      <div className="mt-8 space-y-3">
        {demos.map((demo) => (
          <div key={demo.id} className="border border-white/10 bg-white/[0.03]">
            <button
              onClick={() => setExpandedDemo(expandedDemo === demo.id ? null : demo.id)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-bold">
                {String(demo.id).padStart(2, '0')} · {demo.title}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    demo.priority === 'live'
                      ? 'bg-[#D9B466] text-[#27282B]'
                      : demo.priority === 'optional'
                        ? 'bg-[#0077C8]/30 text-[#7ec8f5]'
                        : 'bg-white/10 text-white/60'
                  }`}
                >
                  {demoPriorityLabel[demo.priority]}
                </span>
                <span className="text-[#7ec8f5]">{expandedDemo === demo.id ? '−' : '+'}</span>
              </span>
            </button>
            {expandedDemo === demo.id && (
              <div className="border-t border-white/10 px-5 pb-5 pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7ec8f5]">
                  Prompts · <span className="font-mono normal-case">{demo.promptPath}</span>
                </p>
                <DemoField label="Cuándo" value={`${demo.duration} · ${demo.when}`} />
                <DemoField label="Objetivo" value={demo.objective} />
                <DemoField label="Contexto" value={demo.context} />
                <DemoField label="Prompt" value={demo.prompt} mono />
                <DemoField label="Resultado esperado" value={demo.expectedResult} />
                <DemoField label="Qué observar" value={demo.observe} />
                <DemoField label="Conclusión" value={demo.conclusion} highlight />
                {teacherMode && (
                  <div className="mt-4 border-l-2 border-[#D9B466] pl-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D9B466]">Notas del docente</p>
                    {demo.teacherNotes.map((n) => (
                      <p key={n} className="mt-1 text-sm leading-6 text-white/85">› {n}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

function DemoField({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className={`mt-4 ${highlight ? 'border-l-2 border-[#D9B466] pl-4' : ''}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#bfbfbf]">{label}</p>
      <p className={`mt-1 text-sm leading-6 text-white/85 ${mono ? 'font-mono whitespace-pre-wrap' : ''}`}>{value}</p>
    </div>
  )
}

function ActivitySection({
  checks,
  setChecks,
  teacherMode,
}: {
  checks: boolean[]
  setChecks: (c: boolean[]) => void
  teacherMode: boolean
}) {
  return (
    <>
      <SectionHeader
        eyebrow={`En clase · ${practicalActivity.duration}`}
        title={practicalActivity.title}
        summary={practicalActivity.note}
      />
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Requerimiento (deliberadamente pobre)</p>
        <p className="mt-2 font-semibold text-white">{practicalActivity.requirement}</p>
        <p className="mt-3 text-sm leading-6 text-white/75">{practicalActivity.whyThis}</p>
      </Card>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaBadge label="Agrupación" value={practicalActivity.grouping} />
        <MetaBadge label="Meta" value="Spec + contexto + prompt + plan. Sin código." />
      </div>
      <Card>
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Objetivo de los 25 minutos</p>
        <p className="mt-2 text-sm leading-6 text-white/85">{practicalActivity.goal}</p>
      </Card>
      <div className="mt-6"><DiagramBlock content={practicalActivity.methodology} label="Metodología" /></div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Reloj</p>
        <ul className="grid gap-2">
          {practicalActivity.timing.map((t) => (
            <li key={t.minutes} className="flex gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85">
              <span className="shrink-0 font-mono text-[#D9B466]">{t.minutes}</span>
              {t.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Preguntas guía (y decisiones de ejemplo)</p>
        <div className="space-y-3">
          {practicalActivity.guidedQuestions.map((q) => (
            <div key={q.question} className="border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-sm font-semibold text-white">{q.question}</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                <span className="text-[#7ec8f5]">Ejemplo de decisión: </span>
                {q.sampleDecision}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8"><DiagramBlock content={practicalActivity.specTemplate} label="Plantilla de mini-spec" /></div>
      <div className="mt-6"><DiagramBlock content={practicalActivity.contextTemplate} label="Plantilla de contexto" /></div>
      <div className="mt-6"><DiagramBlock content={practicalActivity.promptTemplate} label="Prompt para pedir el plan" /></div>
      <div className="mt-6"><DiagramBlock content={practicalActivity.seedPlan} label="Plan semilla (para criticar)" /></div>
      <div className="mt-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Un plan o spec “alcanza” si</p>
        <ul className="grid gap-2">
          {practicalActivity.qualityCriteria.map((c) => (
            <li key={c} className="text-sm text-white/85"><span className="text-[#D9B466]">›</span> {c}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Checklist interactivo</p>
        {practicalActivity.steps.map((step, i) => (
          <label key={step} className="mb-2 flex cursor-pointer items-start gap-3 border border-white/10 bg-white/[0.03] px-4 py-3">
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => {
                const next = [...checks]
                next[i] = !next[i]
                setChecks(next)
              }}
              className="mt-1 accent-[#0077C8]"
            />
            <span className={`text-sm ${checks[i] ? 'text-[#D9B466] line-through opacity-70' : 'text-white/85'}`}>
              {i + 1}. {step}
            </span>
          </label>
        ))}
      </div>
      <Card variant="gold">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">Plenario (3 min)</p>
        <ul className="mt-3 grid gap-2">
          {practicalActivity.debriefQuestions.map((q) => (
            <li key={q} className="text-sm leading-6 text-white/85">› {q}</li>
          ))}
        </ul>
      </Card>
      {teacherMode && (
        <TeacherNotesBlock>
          {practicalActivity.teacherNotes.map((n) => (
            <p key={n}>› {n}</p>
          ))}
        </TeacherNotesBlock>
      )}
    </>
  )
}

function ChallengeSection({
  checks,
  setChecks,
  teacherMode,
}: {
  checks: boolean[]
  setChecks: (c: boolean[]) => void
  teacherMode: boolean
}) {
  return (
    <>
      <SectionHeader eyebrow="Asincrónico" title={finalChallenge.title} summary={finalChallenge.description} />
      <p className="mt-2 text-xl font-bold text-[#7ec8f5]">{finalChallenge.subtitle}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <MetaBadge label="Esfuerzo estimado" value={finalChallenge.estimatedEffort} />
        <MetaBadge label="Plazo sugerido" value={finalChallenge.suggestedDeadline} />
      </div>
      <Card variant="gold">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">Qué se evalúa</p>
        <p className="mt-2 text-sm leading-6 text-white/90">{finalChallenge.objective}</p>
      </Card>
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Escenario</p>
        <p className="mt-2 text-sm leading-6 text-white/90">{finalChallenge.scenario}</p>
      </Card>
      <div className="mt-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Herramientas permitidas (y esperadas)</p>
        <div className="flex flex-wrap gap-2">
          {finalChallenge.tools.map((t) => (
            <span key={t} className="rounded border border-white/15 px-2 py-1 text-xs text-white/75">{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-6"><DiagramBlock content={finalChallenge.givenSpec} label="Especificación dada (manda sobre la tuya)" /></div>
      <div className="mt-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Restricciones</p>
        <ul className="grid gap-2">
          {finalChallenge.constraints.map((c) => (
            <li key={c} className="text-sm leading-6 text-white/85"><span className="text-[#D9B466]">›</span> {c}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6"><DiagramBlock content={finalChallenge.deliveryStructure} label="Estructura de entrega" /></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs font-bold uppercase text-[#7ec8f5]">SPEC.md</p>
          <p className="mt-2 text-sm text-white/85">{finalChallenge.specMd}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold uppercase text-[#7ec8f5]">AI.md</p>
          <p className="mt-2 text-sm text-white/85">{finalChallenge.aiMd}</p>
        </Card>
      </div>
      <div className="mt-6"><DiagramBlock content={finalChallenge.specMdTemplate} label="Plantilla SPEC.md" /></div>
      <div className="mt-6"><DiagramBlock content={finalChallenge.aiMdTemplate} label="Plantilla AI.md" /></div>
      <div className="mt-8 space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Qué se ve bien (y qué no)</p>
        {finalChallenge.goodVsBad.map((item) => (
          <Card key={item.title}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/85">{item.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8"><DiagramBlock content={finalChallenge.evaluationFlow} label="Flujo de evaluación automática" /></div>
      <div className="mt-6"><DiagramBlock content={finalChallenge.multiAgentFlow} label="Evaluación multiagente" /></div>
      <div className="mt-6"><DiagramBlock content={finalChallenge.pedagogicalConcept} label="Concepto pedagógico central" /></div>
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Agente evaluador</p>
        <ul className="mt-3 grid gap-2">
          {finalChallenge.evaluatorCapabilities.map((c) => (
            <li key={c} className="text-sm text-white/85"><span className="text-[#D9B466]">›</span> {c}</li>
          ))}
        </ul>
      </Card>
      <div className="mt-6">
        <pre className="overflow-x-auto border border-white/10 bg-[#1c1d20] p-4 font-mono text-xs leading-5 text-[#7ec8f5]">
          {finalChallenge.exampleEvidence}
        </pre>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Rúbrica · {rubricTotal} puntos</p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-white/15 bg-[#0077C8]/15 px-3 py-2 text-left">Criterio</th>
              <th className="border border-white/15 bg-[#0077C8]/15 px-3 py-2 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rubricCriteria.map((c) => (
              <tr key={c.name}>
                <td className="border border-white/10 px-3 py-2">
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-white/60">{c.description}</p>
                  <ul className="mt-2 space-y-1 text-xs text-white/55">
                    {c.levels.map((level) => (
                      <li key={level.name}>
                        <span className="font-semibold text-[#7ec8f5]">{level.name}:</span> {level.description}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-white/10 px-3 py-2 text-right align-top font-mono text-[#D9B466]">{c.points}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-white/10 px-3 py-2 font-bold">TOTAL</td>
              <td className="border border-white/10 px-3 py-2 text-right font-mono font-bold text-[#D9B466]">{rubricTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Seguridad de la evaluación</p>
        <ul className="grid gap-2">
          {finalChallenge.securityNotes.map((n) => (
            <li key={n} className="text-sm text-white/85"><span className="text-[#D9B466]">›</span> {n}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Checklist de entrega</p>
        {finalChallenge.deliveryChecklist.map((item, i) => (
          <label key={item} className="mb-2 flex cursor-pointer items-start gap-3 border border-white/10 bg-white/[0.03] px-4 py-3">
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => {
                const next = [...checks]
                next[i] = !next[i]
                setChecks(next)
              }}
              className="mt-1 accent-[#0077C8]"
            />
            <span className={`text-sm ${checks[i] ? 'text-[#D9B466]' : 'text-white/85'}`}>{item}</span>
          </label>
        ))}
      </div>
      {teacherMode && (
        <TeacherNotesBlock title="Notas del docente · evaluación">
          {finalChallenge.teacherNotes.map((n) => (
            <p key={n}>› {n}</p>
          ))}
        </TeacherNotesBlock>
      )}
      <div className="mt-8">
        <SectionHeader eyebrow="Cierre" title="Reflexión" summary={closingReflection.question} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-xs font-bold uppercase text-[#bfbfbf]">Pierden valor relativo</p>
            <ul className="mt-3 space-y-1">
              {closingReflection.losesValue.map((v) => (
                <li key={v} className="text-sm text-white/75">− {v}</li>
              ))}
            </ul>
          </Card>
          <Card variant="blue">
            <p className="text-xs font-bold uppercase text-[#7ec8f5]">Ganan valor</p>
            <ul className="mt-3 space-y-1">
              {closingReflection.gainsValue.map((v) => (
                <li key={v} className="text-sm text-white/85">+ {v}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-6"><QuoteBlock>{closingReflection.closingQuote}</QuoteBlock></div>
      </div>
    </>
  )
}

function ResourcesSection() {
  return (
    <>
      <SectionHeader eyebrow="Referencias" title="Recursos" summary="Enlaces oficiales agrupados por categoría." />
      <div className="mt-8 space-y-8">
        {resourceGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-lg font-bold text-[#7ec8f5]">{group.title}</h3>
            <div className="grid gap-3">
              {group.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-[#0077C8]/40 hover:bg-[#0077C8]/10"
                >
                  <p className="font-semibold text-white">{item.name}</p>
                  {item.description && <p className="mt-1 text-sm text-white/65">{item.description}</p>}
                  <p className="mt-1 font-mono text-xs text-[#7ec8f5]">{item.url}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function GlossarySection({
  query,
  setQuery,
  terms,
}: {
  query: string
  setQuery: (q: string) => void
  terms: typeof glossaryTerms
}) {
  return (
    <>
      <SectionHeader
        eyebrow={`${glossaryTerms.length} términos`}
        title="Glosario"
        summary="Definiciones breves orientadas a desarrolladores."
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar término..."
        className="mt-6 w-full rounded-md border border-white/15 bg-[#1c1d20] px-4 py-3 text-sm text-white outline-none ring-[#0077C8] focus:ring-2"
      />
      <div className="mt-6 space-y-3">
        {terms.map((t) => (
          <div key={t.term} id={t.term.toLowerCase().replace(/\s+/g, '-')} className="border border-white/10 bg-white/[0.03] px-5 py-4">
            <h3 className="font-bold text-[#D9B466]">{t.term}</h3>
            <p className="mt-2 text-sm leading-6 text-white/85">{t.definition}</p>
          </div>
        ))}
        {terms.length === 0 && <p className="text-sm text-white/60">No se encontraron términos.</p>}
      </div>
    </>
  )
}
