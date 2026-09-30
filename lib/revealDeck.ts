import { slides, type Slide } from '@/lib/slidesData'

export type DeckSlideType =
  | 'title'
  | 'section'
  | 'hook'
  | 'bullets'
  | 'flow'
  | 'formula'
  | 'cards'
  | 'compare'
  | 'ticket'
  | 'activity'
  | 'challenge'
  | 'quote'
  | 'thanks'

export type DeckCard = {
  kicker?: string
  title: string
  body: string
}

export type DeckColumn = {
  title: string
  items: string[]
  accent?: 'blue' | 'gold' | 'muted'
}

export type DeckSlide = {
  type: DeckSlideType
  sourceId?: number
  kicker?: string
  title?: string
  subtitle?: string
  question?: string
  hint?: string
  bullets?: string[]
  steps?: string[]
  parts?: string[]
  result?: string
  cards?: DeckCard[]
  columns?: DeckColumn[]
  ticket?: { label: string; body: string }
  meta?: string[]
  quote?: string
  attribution?: string
  background?: string
  autoAnimate?: boolean
  notesExtra?: string
}

const notesFrom = (id: number): Slide['teacherNotes'] => {
  const slide = slides.find((s) => s.id === id)
  if (!slide) throw new Error(`Slide source ${id} not found`)
  return slide.teacherNotes
}

export function formatSpeakerNotes(sourceId?: number, extra?: string): string {
  const lines: string[] = []
  if (sourceId) {
    const n = notesFrom(sourceId)
    lines.push(`⏱ ${n.time}`)
    lines.push(`Explicar: ${n.explain}`)
    lines.push(`Idea: ${n.mainIdea}`)
    lines.push(`Ejemplo: ${n.example}`)
    lines.push(`Pregunta: ${n.question}`)
    lines.push(`→ ${n.transition}`)
    if (n.note) lines.push(`Nota: ${n.note}`)
  }
  if (extra) lines.push(extra)
  return lines.join('\n\n')
}

export const deckSlides: DeckSlide[] = [
  {
    type: 'title',
    sourceId: 1,
    kicker: 'Instituto Zona Oeste · Workshop práctico',
    title: 'Desarrollo con Agentes de IA',
    subtitle: 'Del IDE al ADE',
    meta: ['Pablo Botta', 'Método, no magia'],
    background: 'linear-gradient(155deg, #0b1c2e 0%, #121318 42%, #1b140c 100%)',
  },
  {
    type: 'hook',
    sourceId: 1,
    kicker: 'Antes de cualquier definición',
    question: '¿Quién ya le pidió código a un modelo de IA esta semana?',
    hint: 'Levantá la mano. Anotá la herramienta. Ahora vemos cómo la usás.',
    background: 'linear-gradient(180deg, #101114 0%, #0d1a28 100%)',
  },
  {
    type: 'cards',
    sourceId: 1,
    kicker: 'Mini-actividad · 4 min · conocernos',
    title: 'Herramienta + cómo la usás',
    subtitle: 'Recodá tu elección. En Ecosistema la clasificamos con la fórmula.',
    notesExtra: 'Correr ya: manos → pizarra → 3 modos. No postergar a “después”.',
    cards: [
      {
        kicker: '1 · Modelo',
        title: '¿Quién esta semana usó?',
        body: 'ChatGPT, Copilot, Cursor, Claude, Gemini, “ninguna”. Tres nombres a la pizarra.',
      },
      {
        kicker: '2 · Modo',
        title: '¿Cómo la usaste?',
        body: 'Autocomplete · chat de código · agente que edita · pegar y rezar. Una frase por voluntario.',
      },
      {
        kicker: '3 · Cierre',
        title: 'Sin ranking',
        body: 'No hay herramienta “correcta”. Hay modos.',
      },
    ],
    background: 'linear-gradient(160deg, #0d1a28 0%, #121318 100%)',
  },
  {
    type: 'bullets',
    sourceId: 2,
    kicker: 'Introducción',
    title: 'La calidad no está en el modelo',
    bullets: [
      'La IA ya está en el flujo. Eso no está en discusión.',
      'Muchos ya la usan como creadora de software.',
      'Pero sigue faltando profesionalismo: spec, contexto, validación.',
    ],
  },
  {
    type: 'flow',
    sourceId: 3,
    kicker: 'Cada salto cambió el rol',
    title: 'Cómo evolucionó el desarrollo de software',
    steps: ['IDE', 'Git', 'CI/CD', 'AI Coding', 'Agentes'],
    subtitle: 'No es una moda de autocompletado. Es trabajo delegable y supervisado.',
    autoAnimate: true,
  },
  {
    type: 'hook',
    sourceId: 4,
    kicker: 'El disparador de este workshop',
    question: '¿Cómo pasamos de pedirle código a dirigir un proceso con agentes?',
    hint: 'Especificar · Contextualizar · Validar',
    background: 'linear-gradient(180deg, #121318 0%, #0c2236 100%)',
  },
  {
    type: 'flow',
    sourceId: 4,
    kicker: 'El desarrollo de software mantiene su forma',
    title: 'Del requerimiento al software',
    steps: ['Requerimiento', 'Spec', 'Contexto', 'Plan', 'Desarrollo', 'Test', 'Review', 'Software'],
    subtitle: 'Hoy los agentes pueden hacer todo el trabajo. Pero en los requerimientos, Spec y Contexto están las decisiones humanas que definen el éxito.',
  },
  {
    type: 'section',
    sourceId: 5,
    kicker: 'Actualidad del desarrollo de software',
    title: 'Ecosistema',
    subtitle: 'Un modelo no es un agente. Y un agente sin dirección es un modelo con pistas.',
    background: 'linear-gradient(160deg, #082033 0%, #121318 100%)',
  },
  {
    type: 'formula',
    sourceId: 5,
    kicker: 'Anoten esto. Se reusa toda la clase.',
    title: 'La fórmula',
    parts: ['Modelo', 'Objetivo (spec)', 'Contexto', 'Herramientas (Harness)', 'Iterar'],
    result: 'Agente',
  },
  {
    type: 'cards',
    sourceId: 5,
    kicker: 'Tres capas. Sin ranking de marcas.',
    title: 'No es lo mismo hablar que actuar. Ejemplo práctico:',
    cards: [
      {
        kicker: 'Chatbot IA',
        title: 'Escribe una función que devuelva el cupo de reservas activas.',
        body: 'Código en texto plano. Sin repo ni tests.',
      },
      {
        kicker: 'Asistente de IA',
        title: 'Autocompleta la función que devuelva el cupo de reservas activas.',
        body: 'Código en texto plano en el archivo abierto. Sin repo ni tests.',
      },
      {
        kicker: 'Agente',
        title: 'Implementa la función que devuelva el cupo de reservas activas.',
        body: 'Modificación de varios archivos según SPEC.md. Corre validaciones y agrega tests.',
      },
    ],
  },
  {
    type: 'hook',
    sourceId: 5,
    kicker: 'Mini-actividad · 4 min · remontamos el inicio',
    question: 'La herramienta que anotaron: ¿chatbot, asistente o agente?',
    hint: 'Misma que al minuto 0. Justifiquen con la fórmula.',
    background: 'linear-gradient(180deg, #1a150c 0%, #121318 100%)',
  },
  {
    type: 'cards',
    sourceId: 6,
    kicker: 'Límites que importan en el trabajo',
    title: 'El modelo no es magia. Tiene Contexto.',
    cards: [
      {
        kicker: 'Context window',
        title: 'El contexto es finito',
        body: 'Prompt + archivos + historial + respuesta. Si no entra, olvida o inventa.',
      },
      {
        kicker: 'Alucinaciones',
        title: 'Posible ≠ verdadero',
        body: 'Importa un archivo que no existe. El test es el detector, no la confianza del chat.',
      },
      {
        kicker: 'Sin tools',
        title: 'Solo emite texto',
        body: 'Sin leer, ejecutar ni consultar, no hay agente. Hay un párrafo convincente.',
      },
    ],
  },
  {
    type: 'flow',
    sourceId: 7,
    kicker: 'Las marcas rotan. Las formas no.',
    title: 'Ubiquen cualquier herramienta acá',
    steps: ['Proveedor', 'Modelo', 'Agente', 'Entorno', 'Herramientas', 'Proyecto'],
    subtitle: 'Si mañana sale “Forge IDE”: ¿tiene agente con tools o solo chat?',
  },
  {
    type: 'section',
    sourceId: 8,
    kicker: 'Desarrollo con Agentes de IA',
    title: 'IDE → ADE',
    subtitle: 'De editar un archivo a orquestar trabajo. El IDE deja de ser el centro.',
    background: 'linear-gradient(160deg, #082033 0%, #121318 100%)',
  },
  {
    type: 'compare',
    sourceId: 10,
    kicker: 'Tres formas. Mismo editor, distinto foco.',
    title: '¿En qué columna están hoy?',
    autoAnimate: true,
    columns: [
      {
        title: 'IDE',
        accent: 'muted',
        items: ['Un editor, un archivo', 'Vos escribís y depurás', 'Unidad: el buffer'],
      },
      {
        title: 'AI IDE',
        accent: 'blue',
        items: ['Tab, chat, edición', 'Asistir ≠ delegar', 'Unidad: archivo + chat'],
      },
      {
        title: 'ADE',
        accent: 'gold',
        items: ['Objetivo + diffs', 'Agentes, a veces en paralelo', 'Unidad: el trabajo'],
      },
    ],
  },
  {
    type: 'bullets',
    sourceId: 11,
    kicker: 'ADE',
    title: 'DEMO Cursor',
    bullets: [
      'Agent mode + tools + diffs revisables.',
      'Rules y Skills dan forma al agente entre sesiones.',
      'MCP cuando el trabajo vive fuera del repo.',
    ],
    subtitle: 'Cursor / Codex / Claude Code / OpenCode',
  },
  {
    type: 'section',
    sourceId: 12,
    kicker: '¿Qué es el contexto?',
    title: 'Contexto',
    subtitle: 'El prompt es lo que le decimos al modelo. El contexto es lo que el modelo va a saber sobre el proyecto.',
    background: 'linear-gradient(160deg, #1a150c 0%, #121318 100%)',
  },
  {
    type: 'formula',
    sourceId: 12,
    kicker: 'Codificar con Agentes',
    title: '¿Qué decide el resultado?',
    parts: ['Modelo', 'Prompt', 'Contexto', 'Herramientas'],
    result: 'Resultado',
  },
  {
    type: 'hook',
    sourceId: 12,
    kicker: 'Actividad + Demo',
    question: 'Mismo pedido. Distinto contexto. ¿Qué va a contestar el modelo?',
    hint: 'Sin PC: 4 cartas (Vacío / Parcial / Ruido / Curado). Ver demos/actividades/.',
    background: 'linear-gradient(180deg, #0d1a28 0%, #121318 100%)',
  },
  // {
  //   type: 'flow',
  //   sourceId: 13,
  //   kicker: 'De adentro hacia afuera. Lo que falta, el modelo lo inventa.',
  //   title: 'Capas — y un tanque que no es infinito',
  //   steps: ['Prompt', 'Conversación', 'Proyecto', 'Repo', 'Arquitectura', 'Org'],
  //   subtitle: 'Más archivos ≠ mejor. Curar 5 buenos gana a dumpear el monorepo.',
  // },
  {
    type: 'flow',
    sourceId: 14,
    kicker: 'MCP · después de SPEC/Rules · recortable',
    title: 'De copiar y pegar a actuar',
    steps: ['Agente', 'MCP client', 'MCP server', 'Herramienta', 'Sistema'],
    subtitle: 'En Cursor el repo ya está al alcance. MCP es para lo que vive afuera.',
  },
  {
    type: 'hook',
    sourceId: 14,
    kicker: 'Una pregunta, y seguimos',
    question: '¿Qué sistema de su día siguen copiando a mano al chat?',
    hint: 'Eso es una herramienta que el agente todavía no tiene.',
    background: 'linear-gradient(180deg, #101114 0%, #0d1a28 100%)',
  },
  {
    type: 'section',
    sourceId: 15,
    kicker: 'Bloque 06 · 12 min',
    title: 'Del requerimiento al software',
    subtitle: 'Ocho pasos. Un enunciado. Cero magia. Hoy: walkthrough. Después: ustedes.',
    background: 'linear-gradient(160deg, #082033 0%, #121318 100%)',
  },
  {
    type: 'ticket',
    sourceId: 16,
    kicker: 'El requerimiento pobre',
    title: 'Esto parece trabajo. Para un agente es una invitación a inventar el producto.',
    ticket: {
      label: 'Ticket · P1 · sin spec',
      body: 'El sistema debe permitir que un usuario reserve un turno.',
    },
    subtitle: 'Garbage in → software plausible → negocio incorrecto.',
  },
  {
    type: 'cards',
    sourceId: 24,
    kicker: 'Checklist · sin laptop · 3 min',
    title: '8 partes. El ingeniero decide; el agente ejecuta.',
    cards: [
      {
        kicker: 'Qué',
        title: 'Objetivo · Actores · Alcance',
        body: 'Problema en una frase. Quién usa. Qué entra y qué queda fuera.',
      },
      {
        kicker: 'Reglas',
        title: 'Verificables · Edge cases · CA',
        body: 'No adjetivos. Casos límite escritos. CA que un test pueda romper.',
      },
      {
        kicker: 'Límites',
        title: 'Restricciones',
        body: 'Stack, auth, HTTP, seguridad. Mini-actividad: tachá qué falta en el ticket.',
      },
    ],
  },
  {
    type: 'bullets',
    sourceId: 17,
    kicker: 'Antes del primer diff',
    title: 'SPEC, Rules y plan',
    bullets: [
      'SPEC.md: reglas verificables + fuera de alcance.',
      'Rules/Skills: cómo trabaja el agente; “qué no tocar”.',
      '“Generá un plan. No modifiques código.”',
    ],
    subtitle: 'Un plan malo se corrige en un párrafo. Un módulo malo, no.',
  },
  {
    type: 'flow',
    sourceId: 18,
    kicker: 'Tres hábitos',
    title: 'Implementar, romper, revisar',
    steps: ['Implementador', 'Código', 'QA', 'Review humano'],
    subtitle: 'Los tests no tienen ego. Los agentes, a veces, sí. Autor ≠ reviewer.',
  },
  {
    type: 'activity',
    sourceId: 19,
    kicker: 'El corazón de la clase · proteger este bloque',
    title: 'Registrar gastos personales',
    subtitle: '0–12 min sin PC: 8 partes del requerimiento. Después contexto y plan.',
    meta: ['25 min', 'Duplas', 'Sin PC al inicio'],
    bullets: [
      'Laptops abajo: redactor + abogado del diablo',
      'Completar las 8 partes en papel; atacar un CA',
      'Min 17: plan semilla en pantalla (válido sin IA)',
    ],
    ticket: {
      label: 'Requerimiento',
      body: 'El sistema debe permitir registrar gastos personales con categoría y monto.',
    },
    background: 'linear-gradient(155deg, #1a150c 0%, #121318 55%, #0c2236 100%)',
  },
  {
    type: 'section',
    sourceId: 20,
    kicker: 'Bloque 08 · 15 min',
    title: 'Cierre',
    subtitle: 'Lo que gana valor, lo que no se romantiza, y la consigna de la casa.',
    background: 'linear-gradient(160deg, #1a150c 0%, #121318 100%)',
  },
  {
    type: 'compare',
    sourceId: 20,
    kicker: 'Human in the Loop no es opcional',
    title: 'El oficio que gana valor',
    columns: [
      {
        title: 'Pierde valor relativo',
        accent: 'muted',
        items: ['Boilerplate', 'Memorizar APIs', 'Copy-paste', 'Debugging mecánico'],
      },
      {
        title: 'Gana valor',
        accent: 'gold',
        items: ['Spec verificable', 'Contexto curado', 'Tests de negocio', 'Review con criterio'],
      },
    ],
  },
  {
    type: 'cards',
    sourceId: 21,
    kicker: 'Tres riesgos · cuatro prácticas',
    title: 'Velocidad sin validación es deuda',
    cards: [
      {
        kicker: 'Riesgo',
        title: 'Alucinaciones',
        body: 'SQL concatenado “porque el agente lo vio en un blog”.',
      },
      {
        kicker: 'Riesgo',
        title: 'Prompt injection',
        body: 'Un README malicioso que le pide al agente filtrar secretos.',
      },
      {
        kicker: 'Práctica',
        title: 'Evidencia, no fe',
        body: 'Spec antes de delegar. Plan ≠ impl ≠ review. Tests que intentan romper.',
      },
    ],
  },
  {
    type: 'challenge',
    sourceId: 22,
    kicker: 'Desafío · 4–6 h · 7 días',
    title: 'Reservas de turnos',
    subtitle: 'La spec dada manda. El juez va a intentar el cuarto turno y el doble booking.',
    bullets: [
      'IA obligatoria y documentada en AI.md',
      'Cupo 3 · slot único · 24 h · no pasado',
      'Entrega: src, tests, README, SPEC.md, AI.md',
    ],
    cards: [
      { title: 'CA3', body: 'El cuarto turno activo falla' },
      { title: 'CA4', body: 'Dos POST al mismo slot: uno pierde' },
      { title: 'CA5', body: 'Cancelar 23 h 59 min antes: no' },
      { title: 'CA6', body: 'Tras cancelar a tiempo, otro toma el slot' },
    ],
  },
  {
    type: 'quote',
    sourceId: 23,
    quote: 'La IA puede escribir código. El oficio es definir, contextualizar, dirigir y validar.',
    attribution: 'La ventaja ya no es tipear más rápido.',
    background: 'linear-gradient(160deg, #0b1c2e 0%, #121318 50%, #1a150c 100%)',
  },
  {
    type: 'thanks',
    sourceId: 23,
    kicker: 'El material queda en el sitio',
    title: 'Gracias',
    subtitle: 'Oficina de consultas: Recursos y Glosario. Preguntas de entrega, no de teoría nueva.',
    meta: ['Esc · overview', 'S · notas del docente', 'F · pantalla completa'],
  },
]
