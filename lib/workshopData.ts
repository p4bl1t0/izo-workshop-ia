export type WorkshopSection = {
  id: string
  title: string
  eyebrow: string
  summary: string
  audience: 'student' | 'teacher'
}

export type ProgramBlock = {
  id: number
  title: string
  duration: string
  minutes: number
  clock: string
  description: string
  teacherNotes: string[]
  ifLate: string
}

export type MiniActivity = {
  title: string
  duration: string
  grouping: string
  prompt: string
  steps: string[]
  expectedOutput: string[]
  debrief: string
}

export type TeacherNote = {
  pacing: string
  say: string
  watchFor: string
  ifLate: string
  misconception: string
}

export type ContentBlock = {
  id: number
  title: string
  objective: string
  body: string[]
  keyConcept?: string
  diagram?: string
  table?: { headers: string[]; rows: string[][] }
  examples?: { title: string; body: string }[]
  misconceptions?: { wrong: string; right: string }[]
  takeaways: string[]
  miniActivity?: MiniActivity
  teacherNotes: TeacherNote
}

export const workshopMeta = {
  title: 'Desarrollo con Agentes de IA',
  subtitle: 'Del IDE al ADE',
  tagline: 'Cómo utilizar IA y agentes durante el proceso de desarrollo de software.',
  duration: '2 horas',
  level: 'Intermedio',
  modality: 'Workshop práctico',
  prerequisites: 'Programación básica',
  instructor: 'Pablo Botta',
  contact: '@pablo_botta / pabloluisbotta@gmail.com',
  quote:
    'La IA puede escribir código. El oficio es definir, contextualizar, dirigir y validar.',
  centralQuestion:
    '¿Cómo pasa un desarrollador de "pedirle código a una IA" a diseñar y supervisar un proceso de desarrollo en colaboración con agentes de IA?',
  coreFlow: `REQUERIMIENTO
      ↓
ANÁLISIS
      ↓
ESPECIFICACIÓN
      ↓
CONTEXTO
      ↓
PLAN
      ↓
AGENTE
      ↓
IMPLEMENTACIÓN
      ↓
TESTING
      ↓
REVISIÓN
      ↓
SOFTWARE`,
}

export const studentGuide = {
  howToUseTitle: 'Cómo usar este sitio',
  howToUse: [
    'Leé los seis temas en orden. Cada uno cierra con ideas para recordar y un ejercicio corto.',
    'Hacé la actividad de gastos: primero en papel (8 partes del requerimiento), después contexto y plan. Sin mirar soluciones.',
    'El desafío de turnos es la entrega. La spec dada manda; documentá el proceso en AI.md.',
    'Cuando trabes, pasá por Glosario y Recursos. Las marcas cambian; los conceptos no.',
    'Las diapositivas están abiertas para repasar el recorrido de la clase (Reveal.js).',
  ],
  outcomesTitle: 'Al terminar, tenés que poder',
  outcomes: [
    'Distinguir modelo, asistente y agente, y ubicar la herramienta que usás todos los días.',
    'Redactar un requerimiento con sus partes (objetivo, actores, alcance, reglas, CA…) y explicar por qué eso manda sobre el agente.',
    'Explicar por qué el contexto y la spec determinan la calidad del software generado.',
    'Aplicar el flujo requerimiento → spec → contexto → plan → validación a un ticket real.',
    'Entregar un MVP testeado, con SPEC.md y AI.md honestos, no “usé ChatGPT”.',
  ],
  studyPathTitle: 'Camino de estudio',
  studyPath: [
    { id: 'contenidos', label: 'Temas', detail: 'Mapa, SPEC/Rules/Skills, Cursor ADE, MCP y el flujo completo.' },
    { id: 'actividad', label: 'Actividad', detail: 'Gastos: dinámica sin PC + spec/contexto/plan. Sin soluciones.' },
    { id: 'desafio', label: 'Desafío', detail: 'Reservas de turnos · asincrónico. IA obligatoria.' },
    { id: 'diapositivas', label: 'Diapositivas', detail: 'Deck Reveal.js para repasar la clase.' },
    { id: 'glosario', label: 'Glosario', detail: 'Cuando una palabra no cierra.' },
  ],
}

/** Partes de un buen requerimiento / mini-spec. El desarrollador las decide; el agente ejecuta bajo eso. */
export const requirementPartsChecklist = {
  thesis:
    'El desarrollador decide; el agente ejecuta. Sin estas partes, el modelo inventa el producto.',
  parts: [
    {
      id: 'objetivo',
      name: 'Objetivo / problema',
      ask: '¿Qué problema resuelve el MVP, en una frase?',
      tip: 'Una frase. Si no cabe, el alcance está inflado.',
    },
    {
      id: 'actores',
      name: 'Actores',
      ask: '¿Quién usa el sistema? ¿Hay roles distintos?',
      tip: '“Usuario” sin más es una trampa. Paciente ≠ admin; dueño de gastos ≠ multi-usuario.',
    },
    {
      id: 'en-alcance',
      name: 'Alcance (entra)',
      ask: '¿Qué operaciones o pantallas entran en el MVP?',
      tip: 'Lista corta y concreta (alta, listado, borrado…).',
    },
    {
      id: 'fuera',
      name: 'Fuera de alcance',
      ask: '¿Qué queda explícitamente afuera?',
      tip: 'Si no lo escribís, el agente arma pagos, charts o JWT “por las dudas”.',
    },
    {
      id: 'reglas',
      name: 'Reglas verificables',
      ask: '¿Qué comportamientos se pueden testear (no adjetivos)?',
      tip: 'Mal: “intuitivo”. Bien: “monto > 0”; “máximo 3 reservas activas”.',
    },
    {
      id: 'edges',
      name: 'Casos límite',
      ask: '¿Qué pasa en los bordes (cuarto cupo, monto 0, slot pasado…)?',
      tip: 'Si no listás edge cases, el happy path se aprueba solo.',
    },
    {
      id: 'ca',
      name: 'Criterios de aceptación',
      ask: '¿Qué comportamientos observables puede intentar romper un evaluador?',
      tip: 'Cada CA debería poder fallar con un test o un POST concreto.',
    },
    {
      id: 'restricciones',
      name: 'Restricciones',
      ask: '¿Stack, auth, códigos HTTP, tiempo, seguridad?',
      tip: 'Decisiones abiertas (403 vs 404, X-User-Id, comando de test) van acá o en SPEC.md.',
    },
  ],
}

export const activityStudentTemplates = {
  spec: `## Objetivo
(¿Qué problema resuelve el MVP, en una frase?)

## Actores
-

## En alcance
-

## Fuera de alcance
-

## Reglas
- (tienen que poder testearse)

## Casos límite
-

## Criterios de aceptación
1.
2.
3.
4.
5.

## Restricciones
-`,
  context: `## Stack
-

## Cómo se testea
Comando:

## Carpetas
-

## Qué no tocar / no agregar
-`,
  prompt: `Sos un agente de implementación. Leé la spec y el contexto de abajo.

Tarea: proponé un plan de implementación paso a paso.
Restricciones:
- No escribas código todavía.
- No agregues features de “Fuera de alcance”.
- Listá archivos a crear, orden, y 3 tests que vas a escribir primero.
- Si una regla es ambigua, preguntá. No asumas.

[pegar mini-spec]
[pegar contexto]`,
}

export function visibleSections(teacherMode: boolean) {
  return sections.filter((s) => s.audience === 'student' || teacherMode)
}

export const pedagogicalIdeas = [
  'La IA no es solamente un chatbot.',
  'Un modelo no es un agente.',
  'Un agente necesita contexto y herramientas para realizar trabajo útil.',
  'El desarrollador decide y redacta el requerimiento; el agente ejecuta bajo esa spec.',
  'La calidad del software generado depende en gran medida de la calidad de los requisitos, la especificación, el contexto y la validación.',
  'Los agentes pueden participar en distintas etapas del ciclo de desarrollo.',
  'El futuro inmediato no es solamente AI Coding, sino Agentic Development.',
  'El desarrollador pasa progresivamente de escribir cada línea de código a analizar, diseñar, delegar, coordinar, revisar y validar.',
]

export const facilitationGuide = {
  title: 'Guía de facilitación (2 horas)',
  audience:
    'Grupo de 12–30 estudiantes o desarrolladores. Asumir que algunos ya usan Copilot o ChatGPT y otros no tocaron un agente. No asumir laptop para todos: la actividad en clase funciona en papel.',
  outcomes: [
    'Distinguir modelo, asistente y agente, y ubicar las herramientas que ya usan.',
    'Redactar las partes de un buen requerimiento (sin laptop) y explicar por qué el ingeniero manda sobre el agente.',
    'Explicar por qué el contexto y la especificación determinan la calidad del software generado.',
    'Aplicar el flujo requerimiento → spec → contexto → plan → validación sobre un caso real.',
    'Salir con un desafío asincrónico concreto, plantillas y criterios de evaluación.',
  ],
  materials: [
    'Proyector y esta plataforma (modo presentación + modo docente).',
    'Una herramienta de IA lista: Cursor, Claude, ChatGPT o similar, con un repo de ejemplo abierto.',
    'Proyecto base: demos/clinica-turnos (npm install && npm test). Prompts en demos/prompts/.',
    'Demo 1 (prompt pobre vs contextualizado) y Demo 3 (plan antes de código) ensayadas.',
    'Papel o pizarra para la dinámica sin PC (checklist de 8 partes). Plan semilla impreso o en pantalla.',
  ],
  pacing: [
    'Minuto 0: reconocimiento (manos + herramienta + modo). No abrir con definiciones.',
    'Minutos 15–50: teoría densa. Cortar ADE o MCP si el grupo se atrasa; no recortar Context Engineering.',
    'Minutos 68–105: walkthrough (checklist de requerimiento) + actividad. Los primeros 12 min de la actividad son sin laptop.',
    'Últimos 15 minutos: no improvisar el desafío. Mostrar spec, plantillas y rúbrica en pantalla.',
  ],
  liveDemos: [
    'Prioridad 1 — Demo 1 (prompt pobre vs contextualizado): 4 min, durante Context Engineering.',
    'Prioridad 2 — Demo 3 (plan antes de código): 4 min, durante el walkthrough.',
    'Si hay tiempo — Demo 4 (implementar) o Demo 5 (tests). Nunca más de 3 demos en vivo.',
  ],
  fallbacks: [
    'Si falla internet o la herramienta: usar los prompts y resultados esperados de Demostraciones y discutir en voz alta.',
    'Si el grupo es muy principiante: en ADE mostrar la tabla comparativa y saltar worktrees.',
    'Si el grupo es avanzado: recortar “qué es un modelo” y profundizar review multiagente.',
  ],
}

export const sections: WorkshopSection[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    eyebrow: 'Estudio',
    summary: 'Para qué sirve este sitio y cómo usarlo después de clase.',
    audience: 'student',
  },
  {
    id: 'contenidos',
    title: 'Temas',
    eyebrow: 'Estudio',
    summary: 'Seis temas: paradigma, ecosistema, Cursor ADE, SPEC/Rules/Skills, MCP y el flujo completo.',
    audience: 'student',
  },
  {
    id: 'actividad',
    title: 'Actividad',
    eyebrow: 'Práctica',
    summary: 'Enunciado de gastos: dinámica sin PC + spec, contexto y plan. Sin código.',
    audience: 'student',
  },
  {
    id: 'desafio',
    title: 'Desafío',
    eyebrow: 'Entrega',
    summary: 'Consigna asincrónica, spec, plantillas, rúbrica y checklist de entrega.',
    audience: 'student',
  },
  {
    id: 'recursos',
    title: 'Recursos',
    eyebrow: 'Referencias',
    summary: 'Enlaces oficiales a modelos, herramientas, MCP y documentación.',
    audience: 'student',
  },
  {
    id: 'glosario',
    title: 'Glosario',
    eyebrow: 'Conceptos',
    summary: 'Definiciones breves orientadas a desarrolladores.',
    audience: 'student',
  },
  {
    id: 'diapositivas',
    title: 'Diapositivas',
    eyebrow: 'Presentación',
    summary: 'Deck Reveal.js del workshop: repaso visual de los temas de clase.',
    audience: 'student',
  },
  {
    id: 'sobre',
    title: 'Facilitación',
    eyebrow: 'Docente',
    summary: 'Público, ideas pedagógicas y guía de facilitación.',
    audience: 'teacher',
  },
  {
    id: 'programa',
    title: 'Programa',
    eyebrow: 'Docente',
    summary: 'Timeline de 2 horas con reloj, cortes y notas de ritmo.',
    audience: 'teacher',
  },
  {
    id: 'demos',
    title: 'Demos',
    eyebrow: 'Docente',
    summary: 'Prompts, proyecto base y demos en vivo.',
    audience: 'teacher',
  },
]

export const programBlocks: ProgramBlock[] = [
  {
    id: 1,
    title: 'Apertura y cambio de paradigma',
    duration: '15 min',
    minutes: 15,
    clock: '00:00 – 00:15',
    description:
      'Reconocimiento del aula (herramienta + modo), pregunta central, evolución de herramientas y el nuevo rol: especificar, contextualizar y validar.',
    teacherNotes: [
      'Abrir con “¿quién ya le pidió código a una IA esta semana?”. 4 min: manos, 3 nombres en pizarra, cómo la usan (autocomplete / chat / agente / pegar).',
      'Guardar esas herramientas en voz alta: en Ecosistema las clasifican. No ranking — modos.',
      'Recorrer la línea IDE → Git → Cloud → CI/CD → AI Coding → Agentes en 3 minutos. Cerrar con el flujo Requerimiento → Software visible.',
    ],
    ifLate: 'Reconocimiento en 2 min (manos + un voluntario). Saltar anécdota del prompt que no compilaba.',
  },
  {
    id: 2,
    title: 'Ecosistema: modelo, asistente y agente',
    duration: '15 min',
    minutes: 15,
    clock: '00:15 – 00:30',
    description:
      'Proveedor, modelo, asistente y agente. Limitaciones prácticas de un LLM. Clasificar herramientas del aula.',
    teacherNotes: [
      'Usar la fórmula AGENTE = Modelo + Objetivo + Contexto + Herramientas + Iteración como ancla visual.',
      'No ranking de modelos. Mencionar 3 proveedores como ejemplos y seguir.',
      'Remontar el reconocimiento del inicio: clasificar LA herramienta que cada uno anotó (chatbot / asistente / agente). Vale más que otra definición.',
    ],
    ifLate: 'No explicar temperatura ni tokens en detalle. “Hay un límite de contexto y a veces inventan” alcanza.',
  },
  {
    id: 3,
    title: 'IDE → AI IDE → ADE',
    duration: '12 min',
    minutes: 12,
    clock: '00:30 – 00:42',
    description:
      'De editar código a orquestar agentes. Tabla comparativa y Cursor como ADE de referencia, no como tutorial de atajos.',
    teacherNotes: [
      'Mostrar la tabla IDE / AI IDE / ADE. Preguntar en qué columna están hoy.',
      'Cursor: 90 segundos. “Es el ADE de referencia. Agent, Rules, Skills, MCP — el curso no es un tutorial de atajos.”',
      'Worktrees / sesiones aisladas: una frase (“cada agente en su espacio, sin pisarse”). Detalle solo si preguntan.',
    ],
    ifLate: 'Mostrar solo la tabla y el diagrama ADE. Saltar worktrees y el caso Cursor extendido.',
  },
  {
    id: 4,
    title: 'Context Engineering: SPEC, Rules y Skills',
    duration: '18 min',
    minutes: 18,
    clock: '00:42 – 01:00',
    description:
      'Resultado = Modelo + Prompt + Contexto + Herramientas. SPEC.md, Rules y Skills como contexto reutilizable; demo prompt pobre vs contextualizado.',
    teacherNotes: [
      'Este bloque no se recorta. Si hay que recortar, se recorta ADE o MCP, no este.',
      'Correr Demo 1 aquí (4 min). Dejar que el aula compare las dos salidas antes de concluir.',
      'Cerrar con “SPEC define el producto; Rules/Skills definen cómo trabaja el agente”.',
    ],
    ifLate: 'Saltar capas de organización. Quedarse en SPEC / Rules / repo. Igual correr la demo.',
  },
  {
    id: 5,
    title: 'MCP y herramientas',
    duration: '8 min',
    minutes: 8,
    clock: '01:00 – 01:08',
    description:
      'Tools locales en Cursor vs MCP para sistemas externos. Cuándo enchufar MCP y por qué después de SPEC/Rules.',
    teacherNotes: [
      'Un diagrama: repo ya al alcance del Agent; MCP para GitHub/Jira/etc. No implementar un server.',
      'Pregunta útil: “¿qué sistema de tu día a día copiás a mano al chat?”',
    ],
    ifLate: 'Reducir a 4 min: tools del repo → MCP como enchufe externo → seguir.',
  },
  {
    id: 6,
    title: 'Del requerimiento al software',
    duration: '12 min',
    minutes: 12,
    clock: '01:08 – 01:20',
    description:
      'Walkthrough “reservar un turno”: ambigüedad, checklist de 8 partes del requerimiento, SPEC.md, plan. Demo 3 si hay tiempo.',
    teacherNotes: [
      'No implementar turnos en vivo. Anclar: el desarrollador redacta; el agente ejecuta bajo esa spec.',
      'Mostrar los componentes del requerimiento (8 partes) antes de pedir preguntas. Mini-actividad: tachar qué falta en el ticket pobre.',
      'Si el tiempo alcanza, Demo 3: pedir un plan y criticar juntos 2 minutos.',
    ],
    ifLate: 'Checklist (2 min) + 5 preguntas del aula + pasos 1–5. Testing/review en dos frases.',
  },
  {
    id: 7,
    title: 'Actividad práctica en clase',
    duration: '25 min',
    minutes: 25,
    clock: '01:20 – 01:45',
    description:
      'Duplas: dinámica sin PC (12 min) redactando el requerimiento de gastos; luego contexto/prompt/plan (semilla si no hay laptop).',
    teacherNotes: [
      'Proteger este bloque. Si llegás tarde, recortá MCP y ADE, no la dinámica sin PC.',
      '0–12 min: arrancar sin PC. Solo el requerimiento. Roles: redactor / abogado del diablo.',
      'Debrief de 3 min: 2 duplas leen un Criterio de Aceptación y el peor supuesto que evitaron.',
    ],
    ifLate: 'Solo la dinámica sin PC (0–12) + plenario con plan semilla. Contexto/prompt quedan de tarea.',
  },
  {
    id: 8,
    title: 'Cierre y desafío final',
    duration: '15 min',
    minutes: 15,
    clock: '01:45 – 02:00',
    description:
      'Profesionalismo que gana valor, riesgos, consignas del desafío asincrónico, plantillas y rúbrica.',
    teacherNotes: [
      'No cerrar con “pregunten”. Cerrar con la spec del desafío en pantalla y la fecha de entrega.',
      'Mostrar SPEC.md y AI.md vacíos. Decir qué no se evalúa (programar sin IA).',
      'Dejar 2 minutos para preguntas sobre la entrega. Contacto: @pablo_botta / pabloluisbotta@gmail.com.',
    ],
    ifLate: 'Saltar la lista pierde/gana valor. Mostrar desafío + rúbrica + quote de cierre.',
  },
]

export const contentBlocks: ContentBlock[] = [
  {
    id: 1,
    title: 'El cambio de paradigma',
    objective:
      'Comprender que el oficio ya no se define por escribir cada línea, sino por dirigir un proceso: analizar, especificar, contextualizar, delegar y validar.',
    body: [
      'Las herramientas de desarrollo no cambiaron de a una: cada salto redefinió qué se considera “saber programar”. El IDE concentró edición y depuración. Git volvió colaborativo el código. La nube y los containers separaron “mi máquina” de “producción”. CI/CD automatizó lo que antes era un checklist humano. AI Coding metió un modelo dentro del editor. Agentic Development da un paso más: el entorno ya no asiste al que escribe, sino que ejecuta trabajo en paralelo bajo supervisión.',
      'Eso no elimina al desarrollador. Cambia dónde está el valor. Escribir boilerplate, recordar firmas de APIs y traducir un ticket vago a código a pulso siguen ocurriendo, pero cada vez aportan menos diferencia. Lo que no se automatiza —y lo que la IA hace mal cuando falta— es decidir qué hay que construir, con qué restricciones, sobre qué código existente y cómo se demuestra que funciona.',
      'Human in the Loop no es un eslogan de precaución: es el diseño del proceso. La IA acelera. El criterio humano define calidad, alcance, seguridad y cuándo parar. Un desarrollador que acepta diffs sin leerlos no está usando agentes; está delegando la profesión.',
    ],
    keyConcept: `Antes:
Problema → Desarrollador → Código

Ahora:
Problema → Especificación → Contexto → Agente → Código → Tests → Revisión humana`,
    examples: [
      {
        title: 'Mismo ticket, dos oficios',
        body: 'Ticket: “Hay que poder reservar un turno”. El oficio anterior abre el editor y empieza el controller. El oficio nuevo abre preguntas: ¿quién reserva, contra qué agenda, qué pasa si dos personas pisan el mismo horario, cómo se cancela, qué es “turno disponible”? Recién después aparece un agente.',
      },
      {
        title: 'Lo que ya están haciendo (aunque no lo nombren)',
        body: 'Pegar un stack trace en ChatGPT es análisis. Pedirle a Copilot que complete un test es implementación asistida. Pedirle a Cursor que “arme el feature” sin spec es delegación sin dirección — y suele terminar en reescritura.',
      },
    ],
    misconceptions: [
      {
        wrong: '“La IA va a programar sola; aprender a especificar es para managers.”',
        right:
          'Especificar, contextualizar y validar son habilidades de ingeniería. Un manager no corre los tests ni lee el diff que rompe autenticación.',
      },
      {
        wrong: '“Si uso IA, estoy haciendo trampa.”',
        right:
          'En este workshop usar IA es el método de trabajo. Hacer trampa sería entregar software que no cumple la spec o no se puede ejecutar.',
      },
    ],
    takeaways: [
      'La IA no reemplaza el pensamiento del desarrollador; reemplaza parte del tipeo.',
      'El valor se traslada hacia especificación, contexto y validación.',
      'Agentic Development es el siguiente paso después de AI Coding: dirigir procesos, no solo autocompletar.',
    ],
    miniActivity: {
      title: 'Reconocimiento: herramienta + modo',
      duration: '4 min',
      grouping: 'Plenario, manos arriba',
      prompt:
        '¿Quién ya le pidió código a una IA esta semana? Anotá la herramienta y, en una frase, cómo la usás: autocomplete, chat, agente que edita, o pegar y rezar.',
      steps: [
        '60 s: manos arriba. Quien no usa IA anota “ninguna” igual.',
        '90 s: 3 nombres a la pizarra (marcas distintas si se puede).',
        '90 s: tres voluntarios dicen el modo. Docente escribe la pareja herramienta → modo.',
      ],
      expectedOutput: [
        'Un mapa rápido del aula: quién está en chat, quién en Copilot, quién ya tocó un agente.',
        'Al menos un “pegar sin leer” o “ninguna” — usarlos como gancho, no como juicio.',
      ],
      debrief:
        '“Guardá esa pareja. En unos minutos la clasificamos: chatbot, asistente o agente. Hoy no ranking: modos.”',
    },
    teacherNotes: {
      pacing: '4 min reconocimiento + 8 min exposición + 3 min flujo en pantalla. El flujo grande queda visible el resto de la clase.',
      say: 'No vinimos a construir modelos. Primero vemos cómo la usan hoy; después el oficio alrededor.',
      watchFor:
        'Si alguien dice “yo no uso IA”, invitarlo igual: el workshop es el método, no la herramienta favorita. Puede hacer la actividad en papel.',
      ifLate: 'Reconocimiento en 2 min (manos + un voluntario). Saltar el segundo ejemplo del cambio de paradigma.',
      misconception:
        'Evitar el debate “¿la IA nos deja sin trabajo?”. Reencuadrar: “el trabajo que queda es más de diseño y de criterio. Eso se entrena.”',
    },
  },
  {
    id: 2,
    title: 'Ecosistema: de modelos a agentes',
    objective:
      'Diferenciar proveedor, modelo, asistente y agente, y entender por qué un LLM solo no alcanza para hacer trabajo de desarrollo.',
    body: [
      'Un proveedor (OpenAI, Anthropic, Google, Meta) entrena y ofrece modelos. El modelo es capacidad de inferencia: recibe tokens, predice tokens. No tiene tu repo, no corre tests, no abre un PR. Confundir “usé GPT” con “tengo un agente” es el error más caro del aula, porque lleva a pedirle a un chatbot que se comporte como un desarrollador sin darle ni objetivo, ni archivos, ni herramientas.',
      'Una aplicación o asistente envuelve al modelo: ChatGPT, Copilot inline, el chat del IDE. Suma UI, a veces un poco de contexto del archivo abierto, y responde. Un agente agrega cinco piezas: un objetivo, contexto (qué existe y qué reglas rigen), herramientas (leer, escribir, ejecutar), capacidad de iterar (ver el error y corregir) y, en los mejores casos, un plan antes de tocar código.',
      'Los límites prácticos importan más que la magia. La ventana de contexto es finita: prompt + archivos + historial + respuesta. Si no entra, el modelo “olvida” o inventa. Las alucinaciones no son un bug pintoresco: son el comportamiento por defecto cuando falta evidencia. Un modelo de razonamiento puede planificar mejor, pero sigue siendo un generador de texto hasta que alguien (o un tool call) contrastó el resultado con el mundo.',
    ],
    diagram: `PROVEEDOR
    ↓
MODELO
    ↓
AGENTE  =  modelo + objetivo + contexto + herramientas + iterar
    ↓
CLIENTE / ENTORNO
    ↓
HERRAMIENTAS
    ↓
PROYECTO`,
    keyConcept: `Chatbot:     Pregunta → respuesta
Asistente:   Pregunta → respuesta + ayuda contextual (archivo, IDE)
Agente:      Objetivo → plan → acciones → observación → corrección → resultado`,
    examples: [
      {
        title: 'Mismo problema, tres modos',
        body: 'Problema: un usuario no puede tener más de 3 reservas activas. Chatbot: “¿qué significa el límite de 3 reservas activas y cómo lo testearía?”. Asistente: “en este archivo de appointments, completá el test del cuarto cupo que está a medias”. Agente: “implementá el límite de 3 reservas activas según SPEC.md, corré Vitest y no toques auth”. Mismo negocio; cambian evidencia, tools e iteración.',
      },
      {
        title: 'Alucinación típica de desarrollo',
        body: 'El modelo importa `from "@/lib/appointments"` porque “era razonable”. Ese archivo no existe. Sin leer el repo, no hay manera de que lo sepa. El test que falla es la evidencia; la confianza del modelo no.',
      },
    ],
    misconceptions: [
      {
        wrong: '“Cuanto más grande el modelo, menos contexto tengo que dar.”',
        right:
          'Un modelo más capaz improvisa con más fluidez. Sin contexto, improvisa mejor… el sistema equivocado.',
      },
      {
        wrong: '“Agente = chatbot con memoria.”',
        right: 'La memoria es una pieza. Sin herramientas ni iteración, sigue siendo conversación.',
      },
    ],
    takeaways: [
      'Las herramientas cambian; las capas (proveedor → modelo → agente → proyecto) se mantienen.',
      'Un modelo no es un agente. Un agente actúa, observa y corrige.',
      'Alucinaciones se mitigan con contexto, tests y revisión — no con más fe en el modelo.',
    ],
    miniActivity: {
      title: 'Clasificá la tuya (remontamos el inicio)',
      duration: '4 min',
      grouping: 'Duplas, 1 min de plenario',
      prompt:
        'Tomá la herramienta que anotaste al inicio. Ubicala en chatbot, asistente o agente. Justificá con la fórmula. Después contrastá con ChatGPT, Copilot inline y Cursor Agent.',
      steps: [
        '2 min: clasificar en silencio en dupla (primero la propia, después 2 marcas del aula).',
        '1 min: una dupla comparte. El resto objeta.',
        '1 min: el docente corrige con la fórmula, no con la marca.',
      ],
      expectedOutput: [
        'ChatGPT web sin tools: chatbot (o asistente débil).',
        'Copilot inline: asistente.',
        'Cursor Agent / Claude Code con terminal y archivos: agente.',
        'Disenso esperado: Copilot Workspace, GPTs con tools, Gemini en el IDE. Usarlo para mostrar que el límite es de capacidades, no de logo.',
      ],
      debrief:
        '“Si mañana sale una herramienta nueva, no pregunten cómo se llama. Pregunten: ¿tiene objetivo, contexto, tools e iteración?”',
    },
    teacherNotes: {
      pacing: '11 min de mapa mental + 4 min de clasificación remontando el reconocimiento. No entrar a APIs de proveedores.',
      say: 'No vamos a elegir “el mejor modelo”. Vamos a dejar de confundir la materia prima con el sistema que trabaja.',
      watchFor:
        'Alumnos que usan “GPT” como sinónimo de todo. Pedirles: “¿el chat, el autocompletado o el agente que edita archivos?”',
      ifLate: 'Saltar embeddings, RAG y temperatura. Quedan en el glosario.',
      misconception:
        'Si alguien pide “cuál modelo saca 10 en el desafío”, responder: “el que tenga spec, contexto y tests. El modelo es el 20%.”',
    },
  },
  {
    id: 3,
    title: 'IDE, AI IDE y ADE',
    objective:
      'Ubicar el entorno de trabajo en una evolución: editar, asistir, orquestar — y entender qué implica un Agentic Development Environment.',
    body: [
      'Un IDE clásico está diseñado alrededor de un cursor y un archivo. El desarrollador piensa, escribe, depura. Un AI IDE inserta un asistente en ese mismo gesto: autocompletado, chat al costado, “editá esta selección”. El desarrollador sigue siendo quien conduce cada cambio; la IA acorta el camino entre intención y tecla.',
      'Un ADE (Agentic Development Environment) se diseña alrededor de trabajo delegable. En lugar de un hilo “yo escribo”, hay un orquestador: agentes con objetivos, tools (terminal, filesystem, a veces browser), reglas persistentes, y un flujo de revisión de diffs. El oficio se parece más a dirigir un equipo pequeño que a pelear con un buffer.',
      'Esto no obliga a abandonar VS Code mañana. Obliga a reconocer el techo del asistente: un chat al costado del editor no sostiene Rules/Skills, MCP ni un Agent que itera con tests. Cursor es el ADE de referencia de este workshop: Agent mode, Rules, Skills, MCP y diffs revisables. No es el objetivo memorizar atajos; es entender el paradigma para reconocerlo en Cursor y en cualquier herramienta que aparezca.',
    ],
    table: {
      headers: ['Característica', 'IDE', 'AI IDE', 'ADE'],
      rows: [
        ['Editor', 'Sí', 'Sí', 'Sí'],
        ['Asistente en el flujo de edición', 'No', 'Sí', 'Sí'],
        ['Agente con tools e iteración', 'No', 'A veces', 'Sí'],
        ['Varios agentes a la vez', 'No', 'Limitado', 'Sí'],
        ['Aislamiento (worktrees)', 'Manual', 'Parcial', 'Diseñado adentro'],
        ['Orquestación de tareas', 'El dev', 'El dev', 'El entorno + el dev'],
        ['Unidad de trabajo', 'Archivo / cursor', 'Archivo + chat', 'Objetivo + diff'],
      ],
    },
    examples: [
      {
        title: 'Una tarde en cada paradigma',
        body: 'IDE: implementás el endpoint, después los tests, después el README. AI IDE: el asistente te escribe el handler mientras vos armás el test. ADE (Cursor): un Agent implementa según SPEC.md, otro pase (o sesión) escribe tests de edge cases, vos revisás el diff y rechazás lo que tocó auth sin que se lo pidieran.',
      },
    ],
    misconceptions: [
      {
        wrong: '“ADE es marketing de una startup.”',
        right:
          'Es un nombre para un patrón que ya aparece en varios productos: agentes con repo, terminal, aislamiento y revisión. El nombre puede cambiar; el patrón no.',
      },
      {
        wrong: '“En paralelo siempre es mejor.”',
        right:
          'Sin spec compartida y sin aislamiento, dos agentes se pisan o se contradicen. El paralelismo es un premio a la orquestación, no un default.',
      },
    ],
    takeaways: [
      'El ADE se diseña alrededor de agentes y diffs, no solo del editor.',
      'Cursor es el ADE de referencia; el curso no es un tutorial de atajos.',
      'El salto profesional es coordinar y revisar, no solo aceptar autocompletado.',
    ],
    miniActivity: {
      title: '¿Qué podrías paralelizar?',
      duration: '2 min',
      grouping: 'Individual, 2 respuestas en voz alta',
      prompt:
        'De tu proyecto actual, nombrá dos tareas que podrían correr en paralelo sin compartir los mismos archivos (ej. tests de un módulo + docs de otro).',
      steps: [
        '60 s para anotar.',
        '60 s: dos personas dicen sus pares de tareas. El docente pregunta: “¿y si ambos tocan el schema?”',
      ],
      expectedOutput: [
        'Pares sanos: API de turnos + README; tests de cancelación + UI de listado.',
        'Pares peligrosos: dos agentes tocando el mismo modelo de datos. Ahí hace falta un plan secuencial.',
      ],
      debrief: '“Paralelo no es ‘todos a la vez’. Es ‘mismos objetivos, distintos archivos, misma spec’.”',
    },
    teacherNotes: {
      pacing: '10 min de tabla y caso + 2 min de mini-actividad. Worktrees solo si hay pregunta.',
      say: 'Vamos a mirar Cursor como ADE de referencia. Lo que importa es reconocer cuándo un entorno deja de asistir y empieza a ejecutar trabajo bajo Rules, Skills y revisión.',
      watchFor: 'Quedarse a discutir marcas (Cursor vs Copilot vs Windsurf). Cortar: “capa, no logo”.',
      ifLate: 'Tabla + una frase de Cursor como ADE. Mini-actividad en 60 s.',
      misconception:
        'Si preguntan si GitHub Codespaces o un IDE con muchos plugins “ya es ADE”: no, salvo que orquesten agentes aislados. Plugins ≠ orquestación.',
    },
  },
  {
    id: 4,
    title: 'Context Engineering: SPEC, Rules y Skills',
    objective:
      'Entender que la calidad del resultado depende de qué evidencia ve el agente — y cómo SPEC, Rules y Skills le dan forma de modo reutilizable (en Cursor y en cualquier ADE).',
    body: [
      'La ecuación de este workshop es Resultado = Modelo + Prompt + Contexto + Herramientas. El prompt es la instrucción del momento. El contexto es todo lo que el sistema debería saber para no improvisar: conversación previa, archivos del proyecto, arquitectura, convenciones, requisitos, tests, historial de Git, reglas de la organización, sistemas externos. Context Engineering es la disciplina de elegir, estructurar y mantener esa información.',
      'Un prompt brillante sobre un repo vacío produce un tutorial genérico. El mismo prompt, con SPEC.md, la estructura real de carpetas, el estilo de los tests y “no toques auth”, produce un cambio encajado. En Cursor eso se materializa en capas reutilizables: Rules (reglas siempre-on o por glob), Skills (procedimientos que el agente puede invocar) y docs de proyecto (SPEC.md, AGENTS.md, README). No son burocracia: son cómo le das forma al agente entre sesiones. Cada chat que empieza de cero sin esas capas le pide al modelo que adivine el sistema.',
      'Hay que priorizar. La ventana de contexto no es infinita, y más tokens no es más inteligencia: un dump de todo el monorepo diluye lo importante. El oficio es curar. Capas, de adentro hacia afuera: la instrucción de ahora, lo dicho en la conversación, el módulo que se toca, el repositorio, las decisiones de arquitectura, las políticas del equipo. Si una capa falta, el agente la inventa.',
    ],
    diagram: `PROMPT          ← instrucción de esta tarea
 ↓
CONVERSACIÓN    ← decisiones ya tomadas en el chat
 ↓
PROYECTO        ← convenciones, scripts, stack
 ↓
REPOSITORIO     ← código y tests reales
 ↓
ARQUITECTURA    ← límites, módulos, “qué no tocar”
 ↓
ORGANIZACIÓN    ← seguridad, compliance, estilo de PRs`,
    examples: [
      {
        title: 'Mismo pedido, distinto contexto',
        body: 'Pobre: “Creá un endpoint para reservar turnos.” Contextualizado: “Next.js App Router, Prisma, Zod, Vitest. Implementá POST /api/appointments según SPEC.md. No modifiques el módulo de auth. Reutilizá el patrón de /api/patients.” El primero inventa Express y JWT. El segundo encaja.',
      },
      {
        title: 'SPEC, Rules y Skills (mismo repo de turnos)',
        body: 'SPEC.md: “máximo 3 reservas activas; cancelar solo hasta 24 h antes”. Rule: “no toques auth; errores de negocio en 4xx con código; tests en Vitest”. Skill: “cuando agregues una regla de negocio, primero proponé el test que la rompe, después el código”. El SPEC define el producto; Rules y Skills definen cómo el agente trabaja sobre ese producto.',
      },
      {
        title: 'Contexto que conviene tener escrito',
        body: 'Stack y versión. Cómo se corren los tests. Dónde viven las rutas. Qué archivos son sagrados. Errores de negocio en qué formato (HTTP 400 + código). Nombres en español o inglés. Eso cabe en AGENTS.md / Rules de una página.',
      },
    ],
    misconceptions: [
      {
        wrong: '“Prompt Engineering ya cubre esto.”',
        right:
          'Prompt Engineering diseña la instrucción. Context Engineering decide qué evidencia tiene el modelo para cumplirla. Se necesitan las dos; en proyectos reales gana la segunda.',
      },
      {
        wrong: '“Le pego todo el repo y listo.”',
        right:
          'Ruido. El agente atiende a lo último o a lo más largo, no a lo correcto. Curar 6 archivos relevantes suele ganar a 200 irrelevantes.',
      },
    ],
    takeaways: [
      'Un prompt excelente con contexto pobre produce resultados mediocres.',
      'SPEC.md define el producto; Rules y Skills (y AGENTS.md) definen cómo el agente trabaja. Son contexto estructurado, no adorno.',
      'Context Engineering es tan importante como Prompt Engineering — en el día a día, más.',
    ],
    miniActivity: {
      title: '¿Qué 5 archivos le darías?',
      duration: '3 min',
      grouping: 'Duplas',
      prompt:
        'Van a pedirle a un agente que agregue “cancelar turno”. Listen 5 archivos o docs que incluirían como contexto, y uno que explícitamente no incluirían.',
      steps: [
        '2 min: lista de 5 + 1 exclusión.',
        '1 min: una dupla comparte. El docente pregunta por tests y por el módulo de auth.',
      ],
      expectedOutput: [
        'Incluir: SPEC o ticket, rutas de appointments, modelo/schema, tests existentes, convenciones (AGENTS.md).',
        'Excluir típico: vendor, lockfile completo, un módulo de pagos que no se toca, secretos.',
      ],
      debrief: '“Si no está el test de reserva, el agente no sabe cómo se nombra el éxito en este repo.”',
    },
    teacherNotes: {
      pacing: '11 min de concepto + 4 min Demo 1 + 3 min mini-actividad. Bloque intocable.',
      say: 'El prompt es lo que le gritan al modelo. El contexto es el proyecto en el que tiene que vivir la respuesta.',
      watchFor:
        'Si la demo falla, tener las dos salidas (genérica vs alineada) en una nota y leerlas. El punto se enseña igual.',
      ifLate: 'No recortar la demo. Recortar la capa Organización.',
      misconception:
        'Alguien va a decir que “con Claude 4 ya no hace falta contexto”. Respuesta: el modelo más capaz alucina APIs con más seguridad. El test sigue siendo el juez.',
    },
  },
  {
    id: 5,
    title: 'MCP y herramientas',
    objective:
      'Comprender cuándo y por qué MCP importa en el flujo con Cursor: el agente ya tiene manos locales; MCP conecta sistemas externos sin que vos seas el cable.',
    body: [
      'Sin herramientas, el agente solo emite texto. En Cursor, Agent mode ya puede leer el repo, editar archivos y correr `npm test`: eso es tool calling sobre el entorno local. El ciclo se vuelve: planificar, invocar una herramienta, observar el resultado, corregir. Rules y Skills le dicen cómo hacerlo; las tools le permiten hacerlo.',
      'MCP (Model Context Protocol) entra cuando el trabajo vive fuera del repo: GitHub issues/PRs, una base, Figma, un tracker. Es un estándar abierto: el cliente (p. ej. Cursor) habla con servidores MCP que exponen herramientas y recursos. No hace falta implementar el protocolo en este workshop; hace falta saber cuándo enchufarlo.',
      'Para el oficio: primero SPEC + Rules/Skills + tools del repo. Después MCP, cuando el copy/paste a sistemas externos se vuelve el cuello de botella. Un agente con MCP y sin SPEC rompe más rápido — y con más sistemas.',
    ],
    keyConcept: `ANTES
Agente ↔ copiar/pegar ↔ Jira / DB / GitHub

AHORA
AGENTE → MCP CLIENT → MCP SERVER → HERRAMIENTA → SISTEMA`,
    examples: [
      {
        title: 'Cuándo MCP importa (y cuándo no)',
        body: 'No hace falta MCP para el desafío de turnos si todo vive en el repo: SPEC.md, código, Vitest. Sí importa cuando el ticket vive en GitHub/Jira o hay que abrir el PR desde el agente: “tomá el issue #412, implementá según SPEC.md, abrí el PR”. Ahí Cursor + MCP deja de pedirte que copies y pegues.',
      },
    ],
    misconceptions: [
      {
        wrong: '“MCP es un producto de una empresa.”',
        right: 'Es un protocolo abierto. Distintos clientes y servidores lo implementan.',
      },
    ],
    takeaways: [
      'Tool calling es lo que convierte texto en acción.',
      'MCP estandariza la conexión agente–sistemas externos (p. ej. en Cursor); no hace falta implementarlo para usarlo conceptualmente.',
      'Cada sistema que hoy copiás a mano es una herramienta que el agente todavía no tiene.',
    ],
    teacherNotes: {
      pacing: '8 min. Un diagrama, dos ejemplos, una pregunta al aula. Cero live-coding de servers.',
      say: 'En Cursor, el repo ya está al alcance del Agent. MCP es para lo que sigue viviendo afuera. Si ustedes copian y pegan issues, son el cable.',
      watchFor: 'Preguntas de implementación (JSON-RPC, transports). Aparcar: “está en Recursos; hoy alcanza el mapa”.',
      ifLate: '4 min: copy/paste → tools → MCP como enchufe. Seguir a la metodología.',
      misconception:
        'MCP no “hace inteligente” al modelo. Le da manos. Un agente con manos y sin spec rompe producción más rápido.',
    },
  },
  {
    id: 6,
    title: 'Del requerimiento al software',
    objective:
      'Practicar el flujo completo sobre un requerimiento realista, aprender qué partes debe tener una buena redacción, y ver por qué un enunciado vago produce software incorrecto aunque el modelo sea bueno.',
    body: [
      'El enunciado “el sistema debe permitir que un usuario reserve un turno” parece trabajo. Para un agente es una invitación a inventar el producto: una reserva por usuario o cien, con o sin overlap, con o sin cancelación, autenticado o anónimo, agenda infinita o slots. Si no se decide, se decide igual — en el código, sin que nadie lo haya aprobado.',
      'Antes del diff, el oficio es redactar. Un buen requerimiento (o la mini-spec que le sigue) no es prosa larga: son partes concretas — objetivo, actores, alcance in/out, reglas verificables, casos límite, criterios de aceptación y restricciones. El desarrollador las decide y las escribe; el agente ejecuta bajo esa spec. Sin esas partes, “usar Cursor” es operar un generador, no dirigir un proceso.',
      'El flujo de este workshop fuerza esas decisiones. (1) Leer el requerimiento como sospechoso. (2) Listar ambigüedades en forma de preguntas. (3) Completar las partes del requerimiento y convertirlas en SPEC verificable (lo mismo que exigirá el desafío en SPEC.md). (4) Adjuntar contexto: stack, Rules/Skills o AGENTS.md, “qué no tocar”, cómo se testea. (5) Pedir un plan sin modificar código. (6) Implementar el plan aprobado en Cursor Agent, revisando diffs. (7) Tests de caso feliz y edge cases; intentar romper. (8) Review con otra sesión o agente (quien implementó no se autoaprueba) y un humano al final.',
      'Separar plan de implementación no es ceremonia. Un plan malo se corrige en un párrafo. Un módulo malo se corrige en una hora y deja tests que testean el error. Usar un agente distinto para QA no es moda multiagente: es el mismo principio que no dejar que el autor de un PR se haga el unique reviewer.',
    ],
    diagram: `REQUERIMIENTO (vago)
      ↓  preguntas
ESPECIFICACIÓN (8 partes → reglas + CA)
      ↓  stack, repo, “no tocar”
CONTEXTO
      ↓  “no modifiques código”
PLAN (archivos, orden, riesgos)
      ↓  diffs supervisados
IMPLEMENTACIÓN
      ↓  edge cases
TESTING
      ↓  otro agente + humano
REVIEW → SOFTWARE`,
    table: {
      headers: ['Parte', 'Pregunta guía', 'Truco'],
      rows: requirementPartsChecklist.parts.map((p) => [p.name, p.ask, p.tip]),
    },
    keyConcept: requirementPartsChecklist.thesis,
    examples: [
      {
        title: 'Del enunciado pobre a reglas',
        body: 'Preguntas: ¿quién reserva? ¿un usuario autenticado? ¿cuántas reservas activas? ¿qué pasa si dos POST llegan al mismo slot? ¿se puede cancelar? ¿hasta cuándo? ¿turnos en el pasado? Decisiones de ejemplo: usuario autenticado; máximo 3 reservas futuras; slot único; cancelación hasta 24 h antes; 400 si el slot está ocupado o es pasado. Eso ya se puede testear.',
      },
      {
        title: 'SPEC del desafío (lo que manda)',
        body: 'La spec dada del desafío fija cupo 3, slot único, no pasado y cancelación 24 h. Tu SPEC.md reescribe esas reglas, decide auth/HTTP y no puede borrar el cupo. Sin ese contrato, Cursor Agent improvisa el producto — y el evaluador intenta el 4.º cupo, el doble booking y cancelar tarde.',
      },
      {
        title: 'El prompt del plan (copiar)',
        body: '“Leé SPEC.md y las Rules del proyecto. Listá archivos a crear o modificar, orden de implementación, riesgos (concurrencia, auth) y tests (incluidos edge cases de cupo y 24 h). No escribas código todavía. Si una regla es ambigua, preguntá; no asumas.”',
      },
    ],
    misconceptions: [
      {
        wrong: '“Si el agente es bueno, la spec puede ser corta.”',
        right:
          'Una spec corta desplaza las decisiones al modelo. Vas a pasar el rato corrigiendo producto, no bugs.',
      },
      {
        wrong: '“Redactar requerimientos es trabajo de analista; yo solo opero el agente.”',
        right:
          'Decidir alcance, CA y restricciones es ingeniería. Operar el agente sin eso es delegar la profesión.',
      },
      {
        wrong: '“Los tests los genera el mismo agente al final y alcanza.”',
        right:
          'El implementador tiende a testear lo que ya hizo. Un segundo pase (o un humano) tiene que intentar romper las reglas de negocio.',
      },
    ],
    takeaways: [
      'El desarrollador decide y redacta las partes del requerimiento; el agente ejecuta bajo esa spec.',
      'La calidad del software generado sigue a la calidad de la especificación y del contexto.',
      'Separar planificación de implementación reduce retrabajo. Implementador ≠ revisor.',
    ],
    miniActivity: {
      title: '¿Qué partes faltan? (sin laptop)',
      duration: '3 min',
      grouping: 'Individual o dupla, papel o mental',
      prompt:
        'Ticket: “el sistema debe permitir que un usuario reserve un turno.” Con la checklist de 8 partes, tachá las que YA están cubiertas y rodeá las que faltan. Escribí 1 pregunta por parte faltante.',
      steps: [
        '60 s: leer la tabla de 8 partes (está arriba en este tema).',
        '90 s: tachar / rodear; anotar preguntas (papel o chat del IDE cerrado).',
        '30 s: dos voluntarios dicen la parte que más duele (casi siempre actores, CA o edge cases).',
      ],
      expectedOutput: [
        'Casi nadie tacha más de “objetivo” a medias. Actores, fuera de alcance, CA y restricciones aparecen como huecos.',
        'Si alguien dice “está todo implícito”, pedir un CA que se pueda romper con un POST.',
      ],
      debrief:
        '“Eso que rodearon es el trabajo de ustedes. El agente no adivina actores ni fuera de alcance — los inventa.”',
    },
    teacherNotes: {
      pacing:
        '6 min flujo + checklist, 3 min mini-actividad, 3 min ejemplos/Demo 3. No implementar turnos.',
      say: 'No vamos a programar el sistema de turnos ahora. Vamos a dejarlo tan especificado que programarlo sea la parte aburrida — y eso es el desafío de la casa. Ustedes redactan; el agente ejecuta.',
      watchFor:
        'El aula quiere ver código. Mostrar la checklist y un plan en viñetas vale más. El código del desafío es asincrónico.',
      ifLate: 'Checklist en 2 min + mini-actividad. Pasos 6–8 en dos frases.',
      misconception:
        'Si dicen “en el trabajo el ticket ya viene así de vago”, responder: “entonces el primer entregable es completar las 8 partes (o la lista de preguntas), no el PR.”',
    },
  },
]

export const cursorCaseStudy = {
  title: 'Caso de estudio: Cursor',
  body: [
    'Cursor parte de la misma limitación del IDE clásico — un desarrollador, un hilo, una tarea — y la supera como ADE: Agent mode con tools, Rules y Skills para dar forma al comportamiento, MCP para sistemas externos, y diffs para revisar. El desarrollador orquesta, rechaza y valida; no escribe cada línea.',
    'En este workshop Cursor es el ADE de referencia, no un manual de atajos. Sirve para responder: ¿qué tiene un entorno cuando deja de ser un editor con chat y pasa a ser un lugar donde se dirige trabajo de agentes con SPEC, Rules y evidencia?',
  ],
  url: 'https://cursor.com',
}

export const closingReflection = {
  question: '¿Qué habilidades del desarrollador ganan valor en este nuevo paradigma?',
  losesValue: [
    'Escribir boilerplate',
    'Memorizar APIs',
    'Tareas repetitivas',
    'Copiar código entre archivos',
    'Debugging mecánico (leer el stack y pegarlo)',
  ],
  gainsValue: [
    'Análisis de requerimientos',
    'Especificación verificable',
    'Arquitectura y límites (“qué no tocar”)',
    'Pensamiento crítico sobre diffs',
    'Context Engineering',
    'Diseño de tests de negocio',
    'Coordinación de agentes',
    'Validación y seguridad',
  ],
  closingQuote:
    'La ventaja ya no es tipear más rápido. El oficio es definir, contextualizar, dirigir y validar.',
}

export const practicalActivity = {
  title: 'Registrar gastos personales',
  duration: '25 minutos',
  grouping: 'Duplas (o tríos). Un portavoz. Arrancar sin PC: solo el requerimiento los primeros 12 min.',
  goal: 'Practicar el método hasta el plan — no terminar una app. Prioridad: redactar un requerimiento completo en papel. Después: contexto, prompt y plan (propio, o criticando el plan semilla).',
  requirement: 'El sistema debe permitir registrar gastos personales con categoría y monto.',
  whyThis:
    'Es deliberadamente pobre, como un ticket real. El caso de turnos queda para el walkthrough y el desafío; acá transfieren el método a otro dominio. La primera mitad es sin PC a propósito: el criterio no necesita laptop.',
  offlineDynamic: {
    title: 'Ticket sospechoso (sin PC)',
    duration: '12 min',
    needsComputer: false,
    materials: 'Papel, marcador o pizarra. Una hoja por dupla. Checklist de 8 partes a la vista (proyector o impresa).',
    roles:
      'Redactor escribe. Abogado del diablo solo pregunta “¿y si…?” y marca huecos. A los 8 min rotan 30 s el rol.',
    framing:
      'Arrancar sin PC. Solo el requerimiento. El entregable de esta mitad tiene las 8 partes — no un prompt a la IA.',
    steps: [
      {
        minutes: '0–1',
        label: 'Leer el enunciado en voz alta. Subrayar palabras vagas (“permitir”, “gastos personales”).',
      },
      {
        minutes: '1–4',
        label: 'Individual → unir: mínimo 6 preguntas de ambigüedad. No responder todavía.',
      },
      {
        minutes: '4–10',
        label:
          'Completar en papel las 8 partes (objetivo, actores, en/fuera de alcance, reglas, edge cases, CA, restricciones). Decidir; no acumular “depende”.',
      },
      {
        minutes: '10–12',
        label:
          'Atacar: el abogado del diablo elige 1 Criterio de Aceptación y 1 edge case. Si no se puede romper con un ejemplo concreto, reescribir.',
      },
    ],
    doneWhen: [
      'Hay actores explícitos (aunque sea “un solo usuario local”).',
      'Hay fuera de alcance con al menos 3 ítems.',
      'Hay ≥3 reglas testeables y ≥3 CA observables.',
      'Hay al menos 1 caso límite escrito (monto 0, categoría inventada, fecha futura…).',
    ],
    say: 'Ustedes son el ingeniero: deciden. La IA, si aparece después, ejecuta bajo lo que escribieron acá.',
    debrief:
      'En el plenario final (min 22–25): una dupla lee su CA más sólido; otra, el supuesto que iban a dejar colar (auth, USD, categorías libres).',
    watchFor: [
      'Duplas que abren el chat a los 2 minutos → pedir laptop abajo hasta el minuto 12.',
      'Prosa en vez de partes → señalar la checklist en pantalla: “completen casillas, no un ensayo”.',
      'MVP inflado (presupuestos, multi-moneda) → imponer el fuera de alcance de ejemplo y seguir.',
    ],
  },
  timing: [
    { minutes: '0–12', label: 'Arrancar sin PC: ambigüedades → 8 partes del requerimiento → atacar un Criterio de Aceptación.' },
    { minutes: '12–17', label: 'Contexto (stack coherente) + prompt del plan. Sigue válido en papel.' },
    { minutes: '17–22', label: 'Pedir plan a una IA o criticar el plan semilla. Marcar 2 riesgos / huecos.' },
    { minutes: '22–25', label: 'Plenario: 2 duplas — un CA sólido y el peor supuesto evitado.' },
  ],
  guidedQuestions: [
    {
      question: '¿Quién registra el gasto? ¿Hay usuarios o es una sola persona?',
      sampleDecision: 'Un único usuario local, sin auth (MVP). Lo dejamos explícito para no inventar JWT.',
    },
    {
      question: '¿El monto puede ser cero o negativo? ¿En qué moneda?',
      sampleDecision: 'Monto > 0, 2 decimales, moneda ARS fija en el MVP. Rechazar 0 y negativos con error de validación.',
    },
    {
      question: '¿Categorías libres o de una lista?',
      sampleDecision: 'Lista cerrada: comida, transporte, vivienda, ocio, otros. No strings libres: si no, no hay reportes.',
    },
    {
      question: '¿Se puede editar o borrar? ¿Hay fecha distinta al momento de carga?',
      sampleDecision: 'Alta y borrado. Sin edición (evita historial). Fecha del gasto opcional; default = ahora.',
    },
    {
      question: '¿Hay tope, presupuestos, multi-moneda, adjuntos?',
      sampleDecision: 'Fuera de alcance. Un renglón en la spec “No incluye” evita que el agente arme un ERP.',
    },
    {
      question: '¿Cómo se demuestra que funciona?',
      sampleDecision: 'Tests: alta válida; monto inválido; categoría inválida; listado ordenado por fecha desc.',
    },
  ],
  specTemplate: `## Objetivo
MVP para registrar gastos personales de un único usuario local.

## Actores
- Un único usuario local (sin auth en el MVP).

## En alcance
- Alta de gasto: monto, categoría, fecha opcional, nota opcional (máx. 140 caracteres).
- Listado ordenado por fecha descendente.
- Borrado por id.

## Fuera de alcance
- Auth, multi-usuario, presupuestos, adjuntos, multi-moneda, reportes gráficos.

## Reglas
- monto > 0, máximo 2 decimales, moneda ARS.
- categoría ∈ {comida, transporte, vivienda, ocio, otros}.
- fecha no puede ser futura.

## Casos límite
- monto 0 o negativo → 4xx, no persiste.
- categoría desconocida → 4xx.
- DELETE de id inexistente → 404.
- fecha futura → 4xx.

## Criterios de aceptación
1. POST de un gasto válido lo persiste y lo devuelve con id.
2. POST con monto ≤ 0 responde error de validación (4xx) y no persiste.
3. POST con categoría desconocida responde 4xx y no persiste.
4. GET lista todos, más reciente primero.
5. DELETE de un id inexistente responde 404.

## Restricciones
- TypeScript + API HTTP mínima; tests con Vitest/Jest; sin Docker obligatorio.`,
  contextTemplate: `Stack (ejemplo, pueden elegir otro si es coherente):
- TypeScript, API HTTP mínima (Next.js route handlers o Express).
- Persistencia in-memory o SQLite. Sin Docker obligatorio.
- Tests con Vitest o Jest. Un script \`npm test\`.
- Convención: archivos en src/, tests en tests/.
- No agregar autenticación ni UI compleja salvo que el plan lo justifique en una línea.`,
  promptTemplate: `Sos un agente de implementación. Leé la spec y el contexto de abajo.

Tarea: proponé un plan de implementación paso a paso.
Restricciones:
- No escribas código todavía.
- No agregues features de la sección “Fuera de alcance”.
- Listá archivos a crear, orden, y 3 tests que vas a escribir primero.
- Si una regla es ambigua, preguntá. No asumas.

[pegar mini-spec]
[pegar contexto]`,
  seedPlan: `Plan semilla (para grupos sin IA o para criticar):
1. Modelo Expense { id, amount, category, date, note }.
2. POST /expenses, GET /expenses, DELETE /expenses/:id.
3. Validar monto y categoría en el handler.
4. Array in-memory.
5. Un test de alta feliz.

Fallos plantados a propósito:
- No menciona fecha futura.
- No menciona 404 en delete.
- No menciona orden del listado.
- Un único test. El implementador se autoaprueba.
- No dice dónde viven los archivos ni cómo correr tests.`,
  qualityCriteria: [
    'Las 8 partes del requerimiento están (aunque sea en una línea cada una).',
    'Las reglas se pueden testear (no “el usuario debería poder cargar gastos de forma sencilla”).',
    'Hay una sección explícita de fuera de alcance.',
    'Hay al menos un caso límite escrito aparte del happy path.',
    'El prompt prohíbe código hasta tener plan (si usaron IA).',
    'El plan nombra archivos, orden y tests — no solo “armar el backend”.',
  ],
  steps: [
    'Listar ambigüedades del requerimiento (mínimo 6 preguntas).',
    'Completar las 8 partes (objetivo, actores, alcance, fuera, reglas, edge cases, CA, restricciones).',
    'Atacar un Criterio de Aceptación y un edge case: si no se rompe con un ejemplo, reescribir.',
    'Definir contexto: stack, carpetas, cómo se testea, qué no tocar.',
    'Escribir el prompt del agente (plan, no código) — o pasar directo al plan semilla.',
    'Obtener o criticar un plan: marcar 2 huecos o riesgos.',
  ],
  methodology: `REQUERIMIENTO
↓
8 PARTES (papel)
↓
ESPECIFICACIÓN
↓
CONTEXTO
↓
PLAN
↓
VALIDACIÓN`,
  note: 'No es necesario programar ni tener laptop. Arrancar sin PC: los primeros 12 minutos son solo el requerimiento. El entregable de los 25 minutos es el método aplicado: requerimiento completo + contexto + prompt/plan criticado.',
  debriefQuestions: [
    '¿Qué supuesto iba a colar el agente si no lo escribían (auth, pesos vs dólares, categorías libres)?',
    '¿Cuál de las 8 partes les costó más decidir? ¿Por qué?',
    '¿El plan semilla les pareció “suficiente”? ¿Por qué no lo es?',
    '¿Qué van a copiar tal cual al desafío de turnos?',
  ],
  teacherNotes: [
    'Minuto 0: “arrancar sin PC”. La dinámica sin laptop es el corazón; no la salteen por “avanzar al prompt”.',
    'Repartir roles: redactor / abogado del diablo. A los 8 minutos rotan.',
    'Si una dupla discute 10 minutos sin decidir, imponer el MVP de las decisiones de ejemplo y pedirles que sigan. Decidir mal y explícito gana a no decidir.',
    'Tener el plan semilla en pantalla a partir del minuto 17. Los que no usan IA igual practican review.',
    'Debrief corto. Elegir una dupla que se haya ido a multi-usuario o a charts y mostrar cómo la spec se infló.',
    'Recoger 1 foto de una buena hoja de 8 partes para el cierre: “esto es el nivel que espero en SPEC.md del desafío”.',
  ],
}

export const finalChallenge = {
  title: 'Desafío · Asincrónico — Reservas de turnos',
  subtitle: 'La spec dada manda. El juez intenta el 4.º cupo, el doble booking y cancelar tarde.',
  description:
    'Actividad asincrónica (unas 4–6 horas de trabajo a lo largo de una semana). El alumno usa libremente herramientas de IA y agentes para transformar la especificación dada en software ejecutable, testeado y documentado.',
  objective:
    'Evaluar si puede dirigir un proceso con IA — especificar, contextualizar, planificar, implementar, testear y registrar decisiones — no si programa sin IA. Usar IA es obligatorio y se documenta en AI.md. Mismo profesionalismo que en clase: el desarrollador decide y redacta; el agente ejecuta bajo la spec.',
  estimatedEffort: '4–6 horas',
  suggestedDeadline: '7 días corridos después de la clase',
  tools: ['ChatGPT', 'Claude', 'Cursor', 'GitHub Copilot', 'Claude Code', 'Codex', 'Gemini', 'Otros agentes'],
  scenario:
    'Un consultorio chico quiere un MVP para que pacientes autenticados reserven turnos sobre una agenda de slots. No hay UI sofisticada: alcanza una API (y una UI mínima opcional). El producto se define por las reglas de negocio, no por el framework.',
  givenSpec: `## Producto
API de reserva de turnos para un único consultorio.

## Actores
- Paciente autenticado. En el MVP no es obligatorio login real (JWT/sesión/OAuth).
  - Opción válida y recomendada: simular al usuario con el header HTTP \`X-User-Id\` (string). Quien envía el request “es” ese paciente.
  - Comportamiento esperado con \`X-User-Id\`: si falta → típicamente 401; listar/cancelar solo sobre reservas de ese userId; reservar asocia el slot a ese userId; los tests envían el header de forma explícita.
  - Auth real también vale: documentar el flujo y cómo lo ejercitan los tests.
  - Obligatorio documentar la elección en README.md (cómo autenticarse / qué header mandar) y en SPEC.md (sección “Decisión de auth”).
- No hay rol admin en el MVP, salvo un seed de slots.

## En alcance
- Listar slots disponibles (futuros y libres).
- Reservar un slot libre.
- Listar las reservas del usuario actual.
- Cancelar una reserva propia.

## Fuera de alcance
- Pagos, recordatorios, videollamada, multi-profesional, overbooking comercial, app móvil.

## Reglas de negocio (obligatorias)
1. Un slot no puede tener más de una reserva activa.
2. Un usuario no puede tener más de 3 reservas activas (futuras y no canceladas).
3. No se puede reservar un slot en el pasado.
4. Cancelación permitida solo hasta 24 horas antes del inicio del slot.
5. Cancelar un slot lo vuelve a dejar disponible.
6. Operaciones sobre reservas ajenas → código HTTP 403 o 404 (elegir uno y usarlo siempre igual; documentarlo en SPEC.md).
7. Slot inexistente o ya ocupado → código HTTP 409 o 400 (elegir uno y usarlo siempre igual; documentarlo en SPEC.md).

Los ítems 6 y 7 son status codes HTTP de la API (no mensajes sueltos). La consistencia cuenta: el evaluador compara respuesta real vs. SPEC.md.

## Criterios de aceptación (el evaluador los va a intentar romper)
- CA1: listar disponibles no incluye pasados ni ocupados.
- CA2: reservar un slot libre lo marca ocupado y cuenta para el cupo del usuario.
- CA3: ya tiene 3 reservas vigentes → la 4.ª del mismo usuario falla.
- CA4: dos reservas al mismo horario: una gana, la otra no (aunque sea secuencial en tests).
- CA5: a 23 h 59 del turno no se puede cancelar (≥ 24 h sí).
- CA6: cancelación a tiempo libera el horario para otro.
- CA7: hay tests automatizados que cubren CA1–CA6 (no hace falta un test por CA si uno cubre varios, pero los seis comportamientos tienen que fallar si se rompen).

## Restricciones técnicas
- Stack libre. El README debe permitir, en menos de 10 minutos: (1) instalar, (2) testear, (3) levantar el servidor local o indicar una URL ya desplegada.
- Debe existir \`npm test\`, \`pnpm test\`, \`pytest\` o equivalente documentado.
- Si hospedan la API: Vercel, Render u otro PaaS simple. Dejar la URL en el README. El hosting no reemplaza los tests.
- Sin secretos reales. Sin llamar APIs pagas en los tests.`,
  constraints: [
    'Usar al menos una herramienta de IA o agente en el proceso y documentarlo. Entregar código “como si no hubiera IA” con AI.md incompleto no cumple el objetivo.',
    'No se evalúa originalidad del stack. Se evalúa cumplimiento de reglas, tests y honestidad del proceso.',
    'El alumno puede partir de un repo vacío. No se entrega un starter obligatorio.',
    'Si usan header `X-User-Id` en lugar de auth real, debe decirse en README y SPEC.md. Inventar un JWT a medias sin tests de auth no suma.',
  ],
  howToUseSpecAndAi: `## SPEC.md — interpretación operativa
- Para qué: decisiones que la spec dada deja abiertas (auth, códigos HTTP) + reglas reescritas verificables.
- Qué va: auth; códigos HTTP (ajena / slot ocupado o inexistente / validaciones); reglas 1–7; fuera de alcance extra; comando de test y mapa CA → casos.
- Qué no va: bitácora de prompts ni historial con el agente (eso es AI.md).
- Cuándo: antes o durante la implementación (no al final como relleno).
- “Listo”: alguien ajeno podría implementar solo con SPEC.md + spec dada; coincide con los tests; no contradice la spec dada.

## AI.md — bitácora del proceso con IA
- Para qué: demostrar que dirigiste el proceso (herramientas, delegación, rechazos, verificación).
- Qué va: herramientas por etapa; preguntas; plan; qué delegaste; diffs/ideas cortadas; tests agregados; incidentes; comandos finales en verde.
- Qué no va: reescritura de reglas de negocio ni contratos HTTP (eso es SPEC.md).
- Cuándo: durante el trabajo (no una línea el día de la entrega).
- “Listo”: se puede reconstruir el trabajo con IA; hay al menos un rechazo o incidente; figura el comando de verificación final.`,
  whatIsDeliverable: `El entregable es un Pull Request al repo de entregas (sin fork) con la carpeta completa. No alcanza con “el código en algún lado”.

Obligatorio:
- Código (src/ o equivalente): API que cumple alcance y reglas.
- tests/: suite automatizada que cubre CA1–CA6 (CA7).
- README.md: install + test (+ server o URL) en menos de 10 min; auth/X-User-Id explicado.
- SPEC.md: decisiones + reglas reescritas.
- AI.md: proceso con IA reconstruible.

Opcional pero útil: URL de demo si está hospedada (Vercel/Render/etc.).

No es entregable por sí solo: zip suelto, gist o repo externo sin el PR en el repositorio de entregas.`,
  deliveryStructure: `/
├── src/
├── tests/
├── README.md
├── SPEC.md
└── AI.md`,
  specMd:
    'Interpretación operativa: auth y códigos HTTP decididos, reglas 1–7 reescritas, fuera de alcance y mapa de tests. Completar antes/durante la impl. “Listo” = coincide con tests y no contradice la spec dada. No es copy-paste ni bitácora de IA.',
  aiMd:
    'Bitácora del proceso con IA (durante el trabajo): herramientas, plan, delegación, rechazos, incidentes, comando final en verde. “Listo” = se puede reconstruir el oficio. No pongas acá las reglas HTTP (van en SPEC.md).',
  specMdTemplate: `# SPEC.md — Reservas de turnos

> Completá todas las secciones. Decisiones + reglas verificables (no copy-paste).
> Antes/durante la implementación. “Listo” = coincide con tests y no contradice la spec dada.

## Decisión de auth
(Ej. \`X-User-Id\` / sesión / JWT).
- Mecanismo elegido:
- Cómo se identifica al usuario en los tests:
- Si falta autenticación, ¿qué responde la API?:

## Códigos HTTP elegidos
> Elegí un código por fila y usalo siempre igual.
- Operación sobre reserva ajena (403 o 404):
- Slot inexistente o ya ocupado (409 o 400):
- Validación (pasado, cupo, ventana de cancelación):

## Reglas (reescritas, verificables)
1.
2.
3.
4.
5.
6.
7.

## Fuera de alcance (además de lo dado)
-

## Cómo se prueba
- Comando:
- Casos que cubren CA1–CA6:`,
  aiMdTemplate: `# AI.md

> Bitácora del proceso con IA. Completala durante el trabajo.
> “Listo” = se puede reconstruir el trabajo, con rechazo/incidente y comando final en verde.
> Reglas de negocio y códigos HTTP van en SPEC.md, no acá.

## Herramientas
- (nombre, para qué etapa: spec / plan / impl / tests / review)

## Proceso
1. Preguntas que le hice a la spec antes de codear:
2. Plan que aprobé (resumen):
3. Tareas delegadas al agente:
4. Diffs o ideas que rechacé (y por qué):
5. Tests que el agente no escribió y agregué yo (o al revés):

## Incidentes
- Alucinación o error grave:
- Cómo lo detecté (test, review, ejecución):

## Verificación final
- Comandos corridos:
- Qué queda sin cubrir:`,
  goodVsBad: [
    {
      title: 'SPEC.md débil',
      body: '“El usuario puede reservar turnos de forma intuitiva. Se usó Node.” No hay cupo, no hay códigos HTTP elegidos, no hay CA. El evaluador no sabe qué era intención y qué fue accidente.',
    },
    {
      title: 'SPEC.md sólida',
      body: 'Reescribe las 7 reglas, elige 409 en conflicto de slot y 404 en reserva ajena, documenta X-User-Id (y 401 si falta), lista los tests por CA, y un párrafo de fuera de alcance (“no hay lista de espera”).',
    },
    {
      title: 'AI.md débil',
      body: '“Usé ChatGPT.” Sin prompts, sin rechazos, sin fallos. No se puede evaluar el oficio, solo el repo.',
    },
    {
      title: 'AI.md sólida',
      body: 'Tres herramientas, el prompt del plan, “el agente quiso agregar pagos y lo corté”, el test de ventana de 24 h que falló dos veces, comando de test en verde al final.',
    },
  ],
  evaluationFlow: `ENTREGA DEL ALUMNO
        ↓
ENTORNO AISLADO
        ↓
EVALUADOR
        ↓
TESTS AUTOMÁTICOS
        ↓
AGENTE QA
        ↓
AGENTE CODE REVIEW
        ↓
JUDGE AGENT
        ↓
INFORME
        ↓
PUNTUACIÓN`,
  multiAgentFlow: `              ENTREGA
                 ↓
        ┌────────┴────────┐
        ↓                 ↓
    QA AGENT         CODE AGENT
        ↓                 ↓
        └────────┬────────┘
                 ↓
             JUDGE AGENT
                 ↓
             INFORME`,
  pedagogicalConcept: `DOCENTE
  ↓
DEFINE ESPECIFICACIÓN
  ↓
ALUMNO + AGENTES
  ↓
SOFTWARE + SPEC.md + AI.md
  ↓
AGENTE EVALUADOR + HUMANO
  ↓
FEEDBACK`,
  securityNotes: [
    'Ejecución en entorno aislado/sandbox. Sin red salvo dependencias declaradas.',
    'El código del alumno no puede modificar la rúbrica ni los tests privados de evaluación.',
    'Credenciales y evaluador permanecen fuera del repositorio del alumno.',
    'Los tests del alumno se corren; los tests del docente se usan para romper reglas y no se publican antes de la entrega.',
  ],
  evaluatorCapabilities: [
    'Leer archivos y ejecutar el comando de test documentado.',
    'Ejecutar la aplicación si el README lo permite de forma no interactiva.',
    'Crear tests adicionales contra las reglas de negocio (cupo, conflicto de slot, ventana de 24 h).',
    'Comparar comportamiento con la spec dada y con el SPEC.md del alumno (si contradice la spec dada, gana la spec dada).',
    'Justificar cada recorte de puntaje con evidencia (comando, status HTTP, nombre de test).',
  ],
  exampleEvidence: `Criterio: Máximo 3 reservas activas (CA3).
Resultado: INCUMPLIDO.
Evidencia: El 4.º POST /reservations del mismo X-User-Id (ya con 3 vigentes) devuelve 201.
Test del evaluador: rejects_fourth_active_reservation
Esperado: HTTP 4xx | Obtenido: HTTP 201
Puntos en cumplimiento funcional: recorte proporcional.`,
  deliveryChecklist: [
    'Estructura src/, tests/, README.md, SPEC.md, AI.md en el PR del repo de entregas',
    'SPEC.md con decisiones (auth, códigos HTTP 403/404 y 409/400) y reglas reescritas',
    'AI.md con herramientas, rechazos y verificación — no una línea',
    'Tests que cubren los comportamientos CA1–CA6',
    'README con instalar, testear y (server local o URL) en menos de 10 minutos',
    'Comando de test en verde en un checkout limpio',
    'Sin secretos ni features de fuera de alcance que rompan el MVP',
  ],
  teacherNotes: [
    'En clase: proyectar la spec dada y CA1–CA6. Decir en voz alta: “el juez intenta el 4.º cupo, el doble booking y cancelar tarde”. Eso calibra más que la rúbrica en abstracto.',
    'Aclarar que la spec dada manda sobre el SPEC.md del alumno si hay contradicción. SPEC.md sirve para decisiones (códigos, auth), no para borrar el cupo de 3.',
    'No exigir auth real: un header documentado evita que el desafío se vuelva un curso de JWT. Quien implemente auth bien puede sumar en calidad, no en cumplimiento si los CA fallan.',
    'Insistir: 403/404 y 409/400 son códigos HTTP; el alumno elige uno por caso y lo documenta. Vercel/Render son opciones fáciles si quieren URL de demo; no sustituyen tests.',
    'Evaluación sugerida: primero `comando de test del alumno`; si no corre, techo bajo en rúbrica. Después 4 tests privados (cupo, conflicto, pasado, 24 h). Después lectura de AI.md para el 5% de documentación/proceso.',
    'Si no hay sandbox de agentes el primer año, el docente hace de Judge con la misma rúbrica. El relato multiagente sigue siendo el modelo a futuro, no un bloqueante.',
    'Feedback útil cita evidencia (“tu 4.º POST da 201”) no adjetivos (“poca IA”). El profesionalismo se corrige con contraejemplos.',
  ],
}
