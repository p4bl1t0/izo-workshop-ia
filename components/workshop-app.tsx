'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { TeacherModePrompt } from '@/components/teacher-mode-prompt'
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
  activityStudentTemplates,
  closingReflection,
  contentBlocks,
  facilitationGuide,
  finalChallenge,
  orcaCaseStudy,
  pedagogicalIdeas,
  practicalActivity,
  programBlocks,
  sections,
  studentGuide,
  visibleSections,
  workshopMeta,
} from '@/lib/workshopData'

const STORAGE_KEY = 'izo-workshop-ia'

export function WorkshopApp() {
  const [active, setActive] = useState('inicio')
  const [completed, setCompleted] = useState<string[]>([])
  const [teacherMode, setTeacherMode] = useState(false)
  const [teacherToken, setTeacherToken] = useState<string | null>(null)
  const [showTeacherPrompt, setShowTeacherPrompt] = useState(false)
  const [teacherAuthError, setTeacherAuthError] = useState('')
  const [teacherAuthLoading, setTeacherAuthLoading] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [glossaryQuery, setGlossaryQuery] = useState('')
  const [expandedDemo, setExpandedDemo] = useState<number | null>(1)
  const [activityChecks, setActivityChecks] = useState<boolean[]>(
    () => new Array(practicalActivity.steps.length).fill(false),
  )
  const [deliveryChecks, setDeliveryChecks] = useState<boolean[]>(
    () => new Array(finalChallenge.deliveryChecklist.length).fill(false),
  )
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [navHovered, setNavHovered] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const navExpanded = !navCollapsed || navHovered

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const state = JSON.parse(saved)
      setActive(state.active || 'inicio')
      setCompleted(state.completed || [])
      const savedToken = typeof state.teacherToken === 'string' ? state.teacherToken : null
      setTeacherToken(savedToken)
      setTeacherMode(Boolean(state.teacherMode && savedToken))
      setSlideIndex(state.slideIndex || 0)
      setActivityChecks(state.activityChecks || new Array(practicalActivity.steps.length).fill(false))
      setDeliveryChecks(state.deliveryChecks || new Array(finalChallenge.deliveryChecklist.length).fill(false))
      setNavCollapsed(Boolean(state.navCollapsed))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!teacherToken) return
    fetch(`/api/teacher-mode?token=${encodeURIComponent(teacherToken)}`)
      .then((res) => res.json())
      .then((data: { valid?: boolean }) => {
        if (!data.valid) {
          setTeacherToken(null)
          setTeacherMode(false)
        }
      })
      .catch(() => {
        setTeacherToken(null)
        setTeacherMode(false)
      })
  }, [teacherToken])

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        active,
        completed,
        teacherMode,
        teacherToken,
        slideIndex,
        activityChecks,
        deliveryChecks,
        navCollapsed,
      }),
    )
  }, [active, completed, teacherMode, teacherToken, slideIndex, activityChecks, deliveryChecks, navCollapsed])

  const handleTeacherModeToggle = async () => {
    if (teacherMode) {
      setTeacherMode(false)
      return
    }
    if (teacherToken) {
      setTeacherMode(true)
      return
    }
    setTeacherAuthError('')
    setShowTeacherPrompt(true)
  }

  const submitTeacherKey = async (key: string) => {
    setTeacherAuthLoading(true)
    setTeacherAuthError('')
    try {
      const res = await fetch('/api/teacher-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      const data = (await res.json()) as { token?: string; error?: string }
      if (!res.ok || !data.token) {
        setTeacherAuthError(data.error || 'Clave incorrecta.')
        return
      }
      setTeacherToken(data.token)
      setTeacherMode(true)
      setShowTeacherPrompt(false)
    } catch {
      setTeacherAuthError('No se pudo verificar la clave. Intentá de nuevo.')
    } finally {
      setTeacherAuthLoading(false)
    }
  }

  const navItems = visibleSections(teacherMode)
  const totalMinutes = programBlocks.reduce((sum, b) => sum + b.minutes, 0)

  useEffect(() => {
    const current = sections.find((s) => s.id === active)
    if (current?.audience === 'teacher' && !teacherMode) setActive('inicio')
  }, [active, teacherMode])

  const filteredGlossary = useMemo(() => {
    const q = glossaryQuery.toLowerCase().trim()
    if (!q) return glossaryTerms
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    )
  }, [glossaryQuery])

  const finishSection = () => {
    setCompleted((old) => (old.includes(active) ? old : [...old, active]))
    const idx = navItems.findIndex((s) => s.id === active)
    if (idx < navItems.length - 1) setActive(navItems[idx + 1].id)
  }

  return (
    <main className="min-h-screen bg-[#27282B] text-[#FEFEFE]">
      <TeacherModePrompt
        open={showTeacherPrompt}
        error={teacherAuthError}
        loading={teacherAuthLoading}
        onClose={() => {
          if (!teacherAuthLoading) {
            setShowTeacherPrompt(false)
            setTeacherAuthError('')
          }
        }}
        onSubmit={submitTeacherKey}
      />
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#27282B]/90 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <button className="flex items-center gap-3 text-left" onClick={() => setActive('inicio')}>
            <Image src="/logo-izo.webp" alt="Instituto Zona Oeste" width={44} height={50} className="h-11 w-auto" priority />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9B466]">Instituto Zona Oeste</p>
              <p className="text-sm font-semibold leading-tight md:text-base">Fundamentos de IA para Desarrolladores</p>
            </div>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="rounded-md border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:bg-white/5 md:hidden"
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? 'Cerrar menú' : 'Menú'}
            </button>
            <button
              onClick={handleTeacherModeToggle}
              className={`rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                teacherMode ? 'bg-[#D9B466] text-[#27282B]' : 'border border-white/20 text-white/80 hover:bg-white/5'
              }`}
            >
              Modo docente
            </button>
            {teacherMode && (
              <Link
                href="/slides"
                className="rounded-md border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:bg-white/5"
              >
                Presentar
              </Link>
            )}
            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bfbfbf]">Progreso</p>
                <p className="font-mono text-sm font-bold">
                  {completed.filter((id) => navItems.some((s) => s.id === id)).length} / {navItems.length}
                </p>
              </div>
              <div
                className="h-10 w-10 rounded-full border-4 border-white/15 border-t-[#0077C8]"
                style={{ transform: `rotate(${completed.filter((id) => navItems.some((s) => s.id === id)).length * (360 / navItems.length)}deg)` }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside
          id="workshop-nav"
          className={`relative z-10 shrink-0 border-b border-white/10 bg-[#27282B] transition-[width,padding,box-shadow] duration-200 ease-out md:sticky md:top-[81px] md:min-h-[calc(100vh-81px)] md:self-start md:border-b-0 md:border-r ${
            navExpanded ? 'md:w-[200px] md:px-3 md:py-4' : 'md:w-12 md:px-1.5 md:py-4'
          } ${navCollapsed && navHovered ? 'md:shadow-xl md:shadow-black/40' : ''} ${
            mobileNavOpen ? 'w-full px-4 py-3' : 'hidden md:block'
          }`}
          onMouseEnter={() => navCollapsed && setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <div className={`mb-3 flex items-center ${navExpanded ? 'justify-between gap-2' : 'justify-center md:flex-col md:gap-2'}`}>
            {navExpanded && (
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9B466]">Workshop</p>
                <p className="truncate text-xs font-semibold text-white/90">{workshopMeta.subtitle}</p>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setNavCollapsed((v) => !v)
                setNavHovered(false)
                setMobileNavOpen(false)
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/70 transition hover:bg-white/5 hover:text-white"
              aria-label={navCollapsed ? 'Expandir navegación' : 'Ocultar navegación'}
              title={navCollapsed ? 'Expandir navegación' : 'Ocultar navegación'}
            >
              <span className={`inline-block text-sm transition-transform duration-200 ${navCollapsed ? 'rotate-180' : ''}`}>
                ‹
              </span>
            </button>
          </div>
          {navExpanded && (
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#bfbfbf]">
              {teacherMode ? 'Alumno' : 'Navegación'}
            </p>
          )}
          <nav
            className={`flex gap-1.5 pb-1 md:flex-col ${navExpanded ? 'overflow-x-auto md:overflow-visible' : 'md:items-center'}`}
            aria-label="Secciones del workshop"
          >
            {navItems.map((item, index) => (
              <div key={item.id} className="contents">
                {teacherMode && navExpanded && item.audience === 'teacher' && navItems[index - 1]?.audience !== 'teacher' && (
                  <p className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9B466]">Docente</p>
                )}
                <button
                  onClick={() => {
                    setActive(item.id)
                    setMobileNavOpen(false)
                  }}
                  title={item.title}
                  className={`flex items-center rounded-md text-left text-xs transition-colors ${
                    navExpanded ? 'min-w-max gap-2 px-2 py-1.5 md:w-full' : 'h-8 w-8 justify-center md:px-0'
                  } ${
                    active === item.id
                      ? item.audience === 'teacher'
                        ? 'bg-[#D9B466]/20 font-bold text-white ring-1 ring-[#D9B466]/50'
                        : 'bg-[#0077C8]/25 font-bold text-white ring-1 ring-[#0077C8]/50'
                      : 'text-[#bfbfbf] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span
                    className={`shrink-0 font-mono text-[10px] ${completed.includes(item.id) ? 'text-[#D9B466]' : 'text-white/35'}`}
                  >
                    {completed.includes(item.id) ? '✓' : String(index + 1).padStart(2, '0')}
                  </span>
                  {navExpanded && <span className="truncate">{item.title}</span>}
                </button>
              </div>
            ))}
          </nav>
        </aside>

        <section className="relative min-w-0 flex-1 overflow-hidden px-5 py-8 md:px-10 md:py-10 lg:px-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_rgba(0,119,200,0.22),_transparent_65%)]" aria-hidden />
          <div className="relative max-w-3xl">
            {active === 'inicio' && <HomeSection teacherMode={teacherMode} onNavigate={setActive} />}
            {active === 'sobre' && <AboutSection teacherMode={teacherMode} />}
            {active === 'programa' && <ProgramSection totalMinutes={totalMinutes} teacherMode={teacherMode} />}
            {active === 'contenidos' && <ContentsSection teacherMode={teacherMode} />}
            {active === 'diapositivas' && (
              <SlidesSection
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
              />
            )}
            {active === 'demos' && (
              <DemosSection
                expandedDemo={expandedDemo}
                setExpandedDemo={setExpandedDemo}
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
                  {active === navItems[navItems.length - 1]?.id ? 'Listo' : 'Marcar y continuar'}
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
        <p className="mt-1 text-white/60">Material de estudio · {workshopMeta.title}</p>
      </footer>
    </main>
  )
}

function HomeSection({
  teacherMode,
  onNavigate,
}: {
  teacherMode: boolean
  onNavigate: (id: string) => void
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Material de estudio"
        title={workshopMeta.title}
        summary="Este sitio queda después de la clase: los temas, los enunciados y lo que tenés que entregar. No es un recetario de prompts."
      />
      <p className="mt-2 text-2xl font-bold text-[#7ec8f5]">{workshopMeta.subtitle}</p>
      <p className="mt-4 text-base leading-7 text-white/80">{workshopMeta.tagline}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <MetaBadge label="Clase" value={`${workshopMeta.duration} · ${workshopMeta.instructor}`} />
        <MetaBadge label="Entrega" value="Desafío · 4–6 h · 7 días" />
      </div>
      <div className="mt-8">
        <QuoteBlock>{workshopMeta.quote}</QuoteBlock>
      </div>
      <Card variant="gold">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">La pregunta que estructura todo</p>
        <p className="mt-3 text-base leading-7 text-white/90">{workshopMeta.centralQuestion}</p>
      </Card>
      <div className="mt-8">
        <DiagramBlock content={workshopMeta.coreFlow} label="El método — memorizá este flujo" />
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">{studentGuide.howToUseTitle}</p>
        <ul className="grid gap-2">
          {studentGuide.howToUse.map((item, i) => (
            <li key={item} className="flex gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/85">
              <span className="font-mono text-[#D9B466]">{String(i + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">{studentGuide.outcomesTitle}</p>
        <ul className="grid gap-2">
          {studentGuide.outcomes.map((item, i) => (
            <li key={item} className="flex gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/85">
              <span className="font-mono text-[#7ec8f5]">{String(i + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">{studentGuide.studyPathTitle}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {studentGuide.studyPath.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onNavigate(step.id)}
              className="border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition hover:border-[#0077C8]/40 hover:bg-[#0077C8]/10"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">{step.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/80">{step.detail}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <SectionHeader eyebrow="Cierre del oficio" title="Qué gana valor" summary={closingReflection.question} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-xs font-bold uppercase text-[#bfbfbf]">Pierde valor relativo</p>
            <ul className="mt-3 space-y-1">
              {closingReflection.losesValue.map((v) => (
                <li key={v} className="text-sm text-white/75">− {v}</li>
              ))}
            </ul>
          </Card>
          <Card variant="blue">
            <p className="text-xs font-bold uppercase text-[#7ec8f5]">Gana valor</p>
            <ul className="mt-3 space-y-1">
              {closingReflection.gainsValue.map((v) => (
                <li key={v} className="text-sm text-white/85">+ {v}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-6"><QuoteBlock>{closingReflection.closingQuote}</QuoteBlock></div>
      </div>
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
        eyebrow="Docente · facilitación"
        title="Guía de facilitación"
        summary="Público, ideas pedagógicas, materiales, ritmo y fallbacks. El alumno no ve esta sección."
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
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Resultados de aprendizaje</p>
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
        eyebrow="Seis temas · para volver después de clase"
        title="Material de estudio"
        summary="Leé en orden. Cada tema tiene el concepto, un ejemplo, los malentendidos típicos y un ejercicio para vos — sin la respuesta."
      />
      <div className="mt-8 grid gap-2">
        {contentBlocks.map((block) => (
          <button
            key={`index-${block.id}`}
            type="button"
            onClick={() => setExpandedBlock(block.id)}
            className={`flex gap-3 border px-4 py-3 text-left text-sm transition ${
              expandedBlock === block.id
                ? 'border-[#0077C8]/50 bg-[#0077C8]/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-white/20'
            }`}
          >
            <span className="font-mono text-[#D9B466]">{String(block.id).padStart(2, '0')}</span>
            <span>
              <span className="font-semibold">{block.title}</span>
              <span className="mt-1 block text-xs text-white/55">{block.takeaways[0]}</span>
            </span>
          </button>
        ))}
      </div>
      {contentBlocks
        .filter((b) => b.id === expandedBlock)
        .map((block) => (
          <div key={block.id} className="mt-8">
            <h2 className="text-2xl font-bold">{block.title}</h2>
            <Card variant="blue">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Para qué sirve este tema</p>
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Ejemplos</p>
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
                  {teacherMode
                    ? `Mini-actividad · ${block.miniActivity.duration} · ${block.miniActivity.grouping}`
                    : 'Para practicar'}
                </p>
                <p className="mt-2 text-base font-semibold leading-7">{block.miniActivity.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/85">{block.miniActivity.prompt}</p>
                {teacherMode && (
                  <>
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-white/80">
                      {block.miniActivity.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <div className="mt-4 border-t border-[#D9B466]/25 pt-3 text-sm text-white/85">
                      <p className="font-semibold text-[#D9B466]">Salidas esperadas</p>
                      {block.miniActivity.expectedOutput.map((o) => (
                        <p key={o} className="mt-1">› {o}</p>
                      ))}
                      <p className="mt-3"><strong>Cierre:</strong> {block.miniActivity.debrief}</p>
                    </div>
                  </>
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
}: {
  slideIndex: number
  setSlideIndex: (i: number) => void
}) {
  const slide = slides[slideIndex]
  return (
    <>
      <SectionHeader
        eyebrow={`Presentación · Reveal.js`}
        title="Diapositivas"
        summary="Deck visual para proyectar en clase. Acá podés ensayar el guion; el modo presentación abre Reveal.js."
      />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href="/slides" className="rounded-md bg-[#0077C8] px-4 py-2 text-sm font-bold text-white hover:bg-[#0099ff]">
          Presentar con Reveal.js
        </Link>
        <span className="font-mono text-sm text-[#bfbfbf]">
          Guion {String(slideIndex + 1).padStart(2, '0')} / {slides.length}
        </span>
      </div>
      <p className="mt-3 text-xs text-white/50">
        En el deck: flechas para avanzar · F pantalla completa · S notas del docente · O mapa de diapositivas
      </p>
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
}: {
  expandedDemo: number | null
  setExpandedDemo: (id: number | null) => void
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Docente · demos"
        title="Demostraciones"
        summary="En 2 horas, como máximo dos en vivo (1 y 3). Prompts en demos/prompts/. El alumno no ve esta sección."
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
                <div className="mt-4 border-l-2 border-[#D9B466] pl-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D9B466]">Notas del docente</p>
                  {demo.teacherNotes.map((n) => (
                    <p key={n} className="mt-1 text-sm leading-6 text-white/85">› {n}</p>
                  ))}
                </div>
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
        eyebrow={`Práctica · ${practicalActivity.duration}`}
        title={practicalActivity.title}
        summary="Enunciado. Completá vos la spec, el contexto, el prompt y el plan. No hay código. No hay solución publicada."
      />
      <Card variant="blue">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Enunciado</p>
        <p className="mt-2 text-lg font-semibold text-white">{practicalActivity.requirement}</p>
        <p className="mt-3 text-sm leading-6 text-white/75">
          El ticket está pobre a propósito, como en el trabajo. Tu oficio es convertirlo en reglas verificables antes
          de pedirle nada a un agente.
        </p>
      </Card>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaBadge label="Formato" value={teacherMode ? practicalActivity.grouping : 'Individual o en dupla'} />
        <MetaBadge label="Entregable" value="Spec + contexto + prompt + plan" />
      </div>
      <Card>
        <p className="text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">Qué tenés que producir</p>
        <p className="mt-2 text-sm leading-6 text-white/85">{practicalActivity.goal}</p>
      </Card>
      <div className="mt-6"><DiagramBlock content={practicalActivity.methodology} label="Método a aplicar" /></div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Preguntas que no podés saltear</p>
        <div className="space-y-3">
          {practicalActivity.guidedQuestions.map((q) => (
            <div key={q.question} className="border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-sm font-semibold text-white">{q.question}</p>
              {teacherMode && (
                <p className="mt-2 text-sm leading-6 text-white/70">
                  <span className="text-[#7ec8f5]">Decisión de ejemplo: </span>
                  {q.sampleDecision}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Checklist</p>
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
      <div className="mt-8">
        <DiagramBlock content={activityStudentTemplates.spec} label="Plantilla vacía · mini-spec" />
      </div>
      <div className="mt-6">
        <DiagramBlock content={activityStudentTemplates.context} label="Plantilla vacía · contexto" />
      </div>
      <div className="mt-6">
        <DiagramBlock content={activityStudentTemplates.prompt} label="Plantilla · prompt del plan" />
      </div>
      {teacherMode && (
        <>
          <div className="mt-10 border-t border-[#D9B466]/30 pt-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#D9B466]">Solo docente</p>
            <ul className="grid gap-2">
              {practicalActivity.timing.map((t) => (
                <li key={t.minutes} className="flex gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85">
                  <span className="shrink-0 font-mono text-[#D9B466]">{t.minutes}</span>
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6"><DiagramBlock content={practicalActivity.specTemplate} label="Spec resuelta (ejemplo)" /></div>
          <div className="mt-6"><DiagramBlock content={practicalActivity.contextTemplate} label="Contexto resuelto (ejemplo)" /></div>
          <div className="mt-6"><DiagramBlock content={practicalActivity.promptTemplate} label="Prompt resuelto (ejemplo)" /></div>
          <div className="mt-6"><DiagramBlock content={practicalActivity.seedPlan} label="Plan semilla (para criticar)" /></div>
          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Un plan o spec “alcanza” si</p>
            <ul className="grid gap-2">
              {practicalActivity.qualityCriteria.map((c) => (
                <li key={c} className="text-sm text-white/85"><span className="text-[#D9B466]">›</span> {c}</li>
              ))}
            </ul>
          </div>
          <Card variant="gold">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">Plenario (3 min)</p>
            <ul className="mt-3 grid gap-2">
              {practicalActivity.debriefQuestions.map((q) => (
                <li key={q} className="text-sm leading-6 text-white/85">› {q}</li>
              ))}
            </ul>
          </Card>
          <TeacherNotesBlock>
            {practicalActivity.teacherNotes.map((n) => (
              <p key={n}>› {n}</p>
            ))}
          </TeacherNotesBlock>
        </>
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
      <SectionHeader
        eyebrow="Entrega · asincrónico"
        title={finalChallenge.title}
        summary="Enunciado, spec que manda, plantillas y rúbrica. Usá IA. Documentá el proceso. El código sin AI.md no cumple."
      />
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
        <div className="mt-10 border-t border-[#D9B466]/30 pt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#D9B466]">Solo docente · evaluación</p>
          <div className="mt-6"><DiagramBlock content={finalChallenge.evaluationFlow} label="Flujo de evaluación" /></div>
          <div className="mt-6"><DiagramBlock content={finalChallenge.multiAgentFlow} label="Evaluación multiagente" /></div>
          <div className="mt-6"><DiagramBlock content={finalChallenge.pedagogicalConcept} label="Concepto pedagógico" /></div>
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
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#bfbfbf]">Seguridad</p>
            <ul className="grid gap-2">
              {finalChallenge.securityNotes.map((n) => (
                <li key={n} className="text-sm text-white/85"><span className="text-[#D9B466]">›</span> {n}</li>
              ))}
            </ul>
          </div>
          <TeacherNotesBlock title="Notas del docente · evaluación">
            {finalChallenge.teacherNotes.map((n) => (
              <p key={n}>› {n}</p>
            ))}
          </TeacherNotesBlock>
        </div>
      )}
    </>
  )
}

function ResourcesSection() {
  return (
    <>
      <SectionHeader
        eyebrow="Para seguir"
        title="Recursos"
        summary="Las marcas rotan. Estos enlaces son el mapa oficial: modelos, IDEs, agentes, MCP y Git."
      />
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
        summary="Si una palabra no cierra durante el desafío, buscala acá. Son definiciones de oficio, no de paper."
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
