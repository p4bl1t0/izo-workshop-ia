export type DemoPriority = 'live' | 'optional' | 'reference'

export type Demo = {
  id: number
  title: string
  priority: DemoPriority
  duration: string
  when: string
  objective: string
  context: string
  prompt: string
  promptPath: string
  expectedResult: string
  observe: string
  conclusion: string
  teacherNotes: string[]
}

export const demoBaseProjectPath = 'demos/clinica-turnos'

export const demoPromptPaths = {
  setup: 'demos/prompts/00-setup.md',
  baseReadme: 'demos/README.md',
} as const

export const demos: Demo[] = [
  {
    id: 1,
    title: 'Prompt pobre vs prompt contextualizado',
    priority: 'live',
    duration: '4 min',
    when: 'Bloque 4 — Context Engineering (minuto ~00:45). Obligatorio.',
    promptPath: 'demos/prompts/01-prompt-pobre-vs-contextualizado.md',
    objective: 'Mostrar cómo el contexto transforma la calidad de la respuesta, con el mismo pedido de negocio.',
    context: 'Tener un proyecto Next.js (App Router) o, si no hay repo, simularlo nombrando Prisma, Zod y Vitest en el segundo prompt.',
    prompt: `Pobre: "Creá un endpoint para reservar turnos."

Contextualizado: "En este proyecto Next.js con App Router, Prisma y PostgreSQL, implementá POST /api/appointments según estas reglas: usuario identificado, máximo 3 reservas activas, slot único, no reservar en el pasado. TypeScript estricto, validación con Zod, tests con Vitest. No modifiques auth. No escribas README."`,
    expectedResult:
      'El pobre inventa stack (Express, JWT, nombres genéricos). El contextualizado encaja: rutas App Router, Zod, límites de negocio, no toca auth.',
    observe: '¿Respeta “no toques auth”? ¿Nombra tests? ¿Inventa carpetas que no existen?',
    conclusion: 'Context Engineering no es opcional: es la diferencia entre código usable y código descartable.',
    teacherNotes: [
      'Correr los dos prompts en sesiones nuevas, no en el mismo hilo.',
      'Pedir al aula que prediga el stack del primero antes de pegarlo.',
      'Si no hay red: leer en voz alta dos salidas preparadas. El punto se enseña igual.',
      'No “arreglar” el prompt pobre en la misma charla: el contraste tiene que doler.',
    ],
  },
  {
    id: 2,
    title: 'Agente analizando un repositorio',
    priority: 'optional',
    duration: '3 min',
    when: 'Solo si el grupo pregunta “¿cómo sabe qué archivos tocar?”. Si no, describir.',
    promptPath: 'demos/prompts/02-analizar-repositorio.md',
    objective: 'Demostrar que un agente útil explora antes de escribir.',
    context: 'Repo con src/, tests/ y un README. El de turnos o cualquier API chica.',
    prompt:
      'Analizá la estructura del proyecto, identificá patrones y listá qué archivos deberían modificarse para agregar reservas de turnos. No escribas código.',
    expectedResult: 'Mapa de archivos, convenciones y un plan preliminar. Cero diffs.',
    observe: '¿Lee package.json y tests? ¿Inventa una carpeta controllers/ en un App Router?',
    conclusion: 'Un agente que analiza primero comete menos errores que uno que implementa de entrada.',
    teacherNotes: [
      'Útil en grupos que nunca vieron Agent mode.',
      'Cortar a los 3 min aunque el agente siga listando archivos.',
    ],
  },
  {
    id: 3,
    title: 'Agente creando un plan antes de modificar código',
    priority: 'live',
    duration: '4 min',
    when: 'Bloque 6 — walkthrough (minuto ~01:12). Segunda prioridad después de Demo 1.',
    promptPath: 'demos/prompts/03-plan-sin-codigo.md',
    objective: 'Separar planificación de implementación y practicar rechazar un plan incompleto.',
    context: 'Pegar la spec de turnos (o 5 reglas) + stack. Sesión limpia.',
    prompt:
      'Analizá la especificación y el contexto. Identificá componentes a modificar y generá un plan de implementación paso a paso. Listá tests. No modifiques código todavía. Si algo es ambiguo, preguntá.',
    expectedResult: 'Plan con archivos, orden, tests, riesgos. Idealmente una pregunta (auth, códigos HTTP).',
    observe: '¿Cubre cupo, conflicto de slot y 24 h? ¿Se ofrece a “empezar a codear”? Cortarlo.',
    conclusion: 'Aprobar el plan antes de implementar reduce retrabajo y alucinaciones de diseño.',
    teacherNotes: [
      'Si el plan no menciona tests, pedirle al aula que lo rechace. Modelar el oficio.',
      'No dejar que ejecute el plan en esta demo. Eso es el desafío, no la clase.',
    ],
  },
  {
    id: 4,
    title: 'Agente implementando una funcionalidad',
    priority: 'optional',
    duration: '5 min',
    when: 'Solo si el walkthrough terminó temprano y hay un plan aprobado. Nunca en lugar de la actividad de gastos.',
    promptPath: 'demos/prompts/04-implementar-paso-1.md',
    objective: 'Mostrar supervisión de diffs: aceptar lo acotado, rechazar lo extra.',
    context: 'Plan del demo 3, aprobado en voz alta.',
    prompt: 'Implementá solo el paso 1 del plan aprobado. Después corré los tests existentes. No refactorices archivos no listados.',
    expectedResult: 'Diff chico. Si el agente “de paso” formatea todo el repo, es material de review.',
    observe: '¿Cambios no solicitados? ¿Auth tocada? ¿Tests ignorados?',
    conclusion: 'Supervisar diffs es tan importante como escribir la especificación.',
    teacherNotes: [
      'Limitar a un paso. Un feature entero se come el reloj.',
      'Si el diff es enorme, usarlo como anti-ejemplo y parar.',
    ],
  },
  {
    id: 5,
    title: 'Agente ejecutando tests y corrigiendo errores',
    priority: 'reference',
    duration: '4 min',
    when: 'Consulta o grupo avanzado. No en la pasada de 2 horas salvo que un test falle en Demo 4.',
    promptPath: 'demos/prompts/05-tests-y-correccion.md',
    objective: 'Mostrar el ciclo observación → corrección con evidencia.',
    context: 'Una suite en rojo (un test de cupo fallando).',
    prompt:
      'Ejecutá la suite. Para cada fallo, diagnosticá la causa y corregí lo mínimo. No borres el test. Repetí hasta verde o hasta 3 intentos.',
    expectedResult: 'Verde con parches justificados, o un diagnóstico honesto al tercer intento.',
    observe: '¿Parchea el test para que pase? Eso se señala como falta grave.',
    conclusion: 'La iteración con tests es la validación objetiva. Cambiar el test para complacer al agente es trampa.',
    teacherNotes: [
      'Si el agente borra el test, parar la demo y hablar 30 s de integridad.',
    ],
  },
  {
    id: 6,
    title: 'Dos agentes resolviendo el mismo problema',
    priority: 'reference',
    duration: '6 min',
    when: 'No en vivo en 2 horas. Útil como tarea: “en casa, dos modelos, misma spec”.',
    promptPath: 'demos/prompts/06-dos-agentes.md',
    objective: 'Comparar enfoques y ver que ningún agente es infalible.',
    context: 'Misma spec, dos sesiones o dos productos.',
    prompt: 'Misma instrucción a dos agentes distintos con el mismo contexto.',
    expectedResult: 'Diferencias en manejo de conflicto de slot, tests y archivos tocados.',
    observe: '¿Cuál cubre CA3? ¿Cuál agregó pagos que nadie pidió?',
    conclusion: 'La revisión humana (o un tercer juez) sigue siendo esencial.',
    teacherNotes: [
      'En clase, contar el resultado si ya lo corrieron. No abrir dos ventanas en vivo.',
    ],
  },
  {
    id: 7,
    title: 'ADE coordinando varios agentes',
    priority: 'reference',
    duration: '5 min',
    when: 'Solo si hay Cursor (varios agentes / worktrees) u otro ADE abierto y el bloque 3 no se recortó. Optativo.',
    promptPath: 'demos/prompts/07-ade-multiagente.md',
    objective: 'Visualizar paralelo con aislamiento.',
    context: 'Cursor u otro ADE con worktrees / sesiones aisladas.',
    prompt:
      'Agente Backend: API de listado de slots. Agente QA: tests de CA1. Agente Docs: README de cómo testear. En paralelo, sin tocar los mismos archivos.',
    expectedResult: 'Tres diffs. El docente rechaza el que se cruzó de módulo.',
    observe: '¿Conflictos? ¿Orquestación real o tres chats disfrazados?',
    conclusion: 'El ADE multiplica throughput cuando la spec es compartida y el aislamiento existe.',
    teacherNotes: [
      'Fácil que se vaya de tiempo. Screenshot > live si no está ensayado.',
    ],
  },
  {
    id: 8,
    title: 'Agente utilizando una herramienta externa via MCP',
    priority: 'reference',
    duration: '4 min',
    when: 'Fuera de la pasada de 2 horas. Complemento del bloque MCP si el grupo lo pide.',
    promptPath: 'demos/prompts/08-mcp-herramienta-externa.md',
    objective: 'Mostrar acción sobre un sistema real sin copy/paste.',
    context: 'MCP de GitHub o filesystem ya conectado. Nunca improvisar el setup en clase.',
    prompt:
      'Listá issues abiertos del repo (o archivos de /docs). Identificá uno relevante a reservas. No implementes: resumí el issue y proponé el primer commit de spec.',
    expectedResult: 'Datos reales, no alucinados. Si falla la tool, el agente lo dice.',
    observe: '¿Inventa issues si MCP no responde? Eso se señala.',
    conclusion: 'MCP convierte al agente de chatbot en participante del flujo — si la herramienta funciona y se verifica.',
    teacherNotes: [
      'Setup de MCP no se hace en los 8 minutos del bloque. O está listo, o se describe.',
    ],
  },
]

export const demoPriorityLabel: Record<DemoPriority, string> = {
  live: 'En vivo · prioridad',
  optional: 'Si hay tiempo',
  reference: 'Consulta / casa',
}
