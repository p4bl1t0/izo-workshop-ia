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
  title: 'Fundamentos de IA para Desarrolladores',
  subtitle: 'Del IDE al ADE',
  tagline: 'Cómo utilizar IA y agentes durante el proceso de desarrollo de software.',
  duration: '2 horas',
  level: 'Intermedio',
  modality: 'Workshop práctico',
  prerequisites: 'Programación básica',
  instructor: 'Pablo Botta',
  quote:
    'La IA puede escribir código. La nueva habilidad es aprender a dirigir, contextualizar y validar ese trabajo.',
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
    'Hacé la actividad de gastos sin mirar soluciones: el entregable es spec + contexto + prompt + plan.',
    'El desafío de turnos es la entrega. La spec dada manda; documentá el proceso en AI.md.',
    'Cuando trabes, pasá por Glosario y Recursos. Las marcas cambian; los conceptos no.',
  ],
  outcomesTitle: 'Al terminar, tenés que poder',
  outcomes: [
    'Distinguir modelo, asistente y agente, y ubicar la herramienta que usás todos los días.',
    'Explicar por qué el contexto y la spec determinan la calidad del software generado.',
    'Aplicar el flujo requerimiento → spec → contexto → plan → validación a un ticket real.',
    'Entregar un MVP testeado, con SPEC.md y AI.md honestos, no “usé ChatGPT”.',
  ],
  studyPathTitle: 'Camino de estudio',
  studyPath: [
    { id: 'contenidos', label: 'Temas', detail: 'Mapa, contexto, ADE, MCP y el flujo completo.' },
    { id: 'actividad', label: 'Actividad', detail: 'Enunciado de gastos. Sin soluciones.' },
    { id: 'desafio', label: 'Desafío', detail: 'Reservas de turnos. 4–6 h. IA obligatoria.' },
    { id: 'glosario', label: 'Glosario', detail: 'Cuando una palabra no cierra.' },
  ],
}

export const activityStudentTemplates = {
  spec: `## Objetivo
(¿Qué problema resuelve el MVP, en una frase?)

## En alcance
-

## Fuera de alcance
-

## Reglas
- (tienen que poder testearse)

## Criterios de aceptación
1.
2.
3.
4.
5.`,
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
  'El desarrollador debe aprender a proporcionar contexto y especificaciones de calidad.',
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
    'Explicar por qué el contexto y la especificación determinan la calidad del software generado.',
    'Aplicar el flujo requerimiento → spec → contexto → plan → validación sobre un caso real.',
    'Salir con un desafío asincrónico concreto, plantillas y criterios de evaluación.',
  ],
  materials: [
    'Proyector y esta plataforma (modo presentación + modo docente).',
    'Una herramienta de IA lista: Cursor, Claude, ChatGPT o similar, con un repo de ejemplo abierto.',
    'Proyecto base: demos/clinica-turnos (npm install && npm test). Prompts en demos/prompts/.',
    'Demo 1 (prompt pobre vs contextualizado) y Demo 3 (plan antes de código) ensayadas.',
    'Plan semilla impreso o en pantalla para grupos sin laptop.',
  ],
  pacing: [
    'Minuto 0: abrir con la pregunta central, no con definiciones.',
    'Minutos 15–50: teoría densa. Cortar ADE o MCP si el grupo se atrasa; no recortar Context Engineering.',
    'Minutos 68–105: walkthrough + actividad. Proteger estos 37 minutos: es el corazón del workshop.',
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
    summary: 'Los seis temas del workshop, escritos para volver a ellos.',
    audience: 'student',
  },
  {
    id: 'actividad',
    title: 'Actividad',
    eyebrow: 'Práctica',
    summary: 'Enunciado de la práctica de gastos: spec, contexto y plan. Sin código.',
    audience: 'student',
  },
  {
    id: 'desafio',
    title: 'Desafío',
    eyebrow: 'Entrega',
    summary: 'Consigna, spec, plantillas, rúbrica y checklist de entrega.',
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
    id: 'diapositivas',
    title: 'Diapositivas',
    eyebrow: 'Docente',
    summary: 'Deck Reveal.js y guion de cada slide.',
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
      'Pregunta central, evolución de herramientas y el nuevo rol: especificar, contextualizar y validar. Mini-actividad de mapeo.',
    teacherNotes: [
      'Abrir con “¿quién ya le pide código a una IA?”. Anotar 3 respuestas en la pizarra.',
      'Recorrer la línea IDE → Git → Cloud → CI/CD → AI Coding → Agentes en 3 minutos, sin historia de cada uno.',
      'Cerrar el bloque con el flujo Requerimiento → Software en pantalla. Dejarlo visible el resto de la clase.',
    ],
    ifLate: 'Saltar la anécdota larga del prompt que no compilaba. Ir directo a la pregunta central.',
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
      'La mini-actividad de clasificar ChatGPT / Copilot / Cursor Agent vale más que otra definición.',
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
      'De editar código a orquestar agentes. Tabla comparativa y Orca como caso de estudio, no como producto a aprender.',
    teacherNotes: [
      'Mostrar la tabla IDE / AI IDE / ADE. Preguntar en qué columna están hoy.',
      'Orca: 90 segundos. “Es un ejemplo del paradigma. El curso no es un tutorial de Orca.”',
      'Worktrees: una frase (“cada agente en su directorio, sin pisarse”). Detalle solo si preguntan.',
    ],
    ifLate: 'Mostrar solo la tabla y el diagrama ADE. Saltar worktrees y el caso Orca extendido.',
  },
  {
    id: 4,
    title: 'Context Engineering',
    duration: '18 min',
    minutes: 18,
    clock: '00:42 – 01:00',
    description:
      'Resultado = Modelo + Prompt + Contexto + Herramientas. Capas de contexto y demo en vivo de prompt pobre vs contextualizado.',
    teacherNotes: [
      'Este bloque no se recorta. Si hay que recortar, se recorta ADE o MCP, no este.',
      'Correr Demo 1 aquí (4 min). Dejar que el aula compare las dos salidas antes de concluir.',
      'Cerrar con “un prompt excelente con contexto pobre produce resultados mediocres”.',
    ],
    ifLate: 'Saltar capas de organización. Quedarse en prompt / proyecto / repo. Igual correr la demo.',
  },
  {
    id: 5,
    title: 'MCP y herramientas',
    duration: '8 min',
    minutes: 8,
    clock: '01:00 – 01:08',
    description:
      'De copiar y pegar a tool calling. MCP como estándar para conectar agentes con sistemas reales.',
    teacherNotes: [
      'Un diagrama y dos ejemplos (GitHub y filesystem). No implementar un server.',
      'Pregunta útil: “¿qué sistema de tu día a día copiás a mano al chat?”',
    ],
    ifLate: 'Reducir a 4 min: problema (copy/paste) → tool calling → “MCP es el enchufe estándar”.',
  },
  {
    id: 6,
    title: 'Del requerimiento al software',
    duration: '12 min',
    minutes: 12,
    clock: '01:08 – 01:20',
    description:
      'Walkthrough del caso “reservar un turno”: ambigüedad, spec, contexto, plan, tests y review. Demo 3 si hay tiempo.',
    teacherNotes: [
      'No implementar en vivo el sistema de turnos. Recorrer los 8 pasos con el requerimiento pobre en pantalla.',
      'Pedir al aula 4 preguntas antes de mostrar las vuestras. Escribirlas.',
      'Si el tiempo alcanza, Demo 3: pedir un plan y criticar juntos 2 minutos.',
    ],
    ifLate: 'Hacer solo pasos 1–5 (ambigüedad → spec → contexto → plan). Testing y review quedan para el cierre.',
  },
  {
    id: 7,
    title: 'Actividad práctica en clase',
    duration: '25 min',
    minutes: 25,
    clock: '01:20 – 01:45',
    description:
      'En duplas: convertir “registrar gastos” en especificación, contexto, prompt y plan. No hace falta programar.',
    teacherNotes: [
      'Proteger este bloque. Si llegás 10 minutos tarde, recortá MCP y ADE, no la actividad.',
      'Circular: a los 8 min deberían tener reglas, no seguir discutiéndolas. A los 18 min, un prompt escrito.',
      'Debrief de 3 minutos: 2 duplas leen su regla más importante y el peor supuesto que evitaron.',
    ],
    ifLate: 'Hacer solo pasos 1–4 (ambigüedades, spec, contexto, prompt). El plan se discute en plenario con el plan semilla.',
  },
  {
    id: 8,
    title: 'Cierre y desafío final',
    duration: '15 min',
    minutes: 15,
    clock: '01:45 – 02:00',
    description:
      'Habilidades que ganan valor, riesgos, consignas del desafío asincrónico, plantillas y rúbrica.',
    teacherNotes: [
      'No cerrar con “pregunten”. Cerrar con la spec del desafío en pantalla y la fecha de entrega.',
      'Mostrar SPEC.md y AI.md vacíos. Decir qué no se evalúa (programar sin IA).',
      'Dejar 2 minutos para preguntas sobre la entrega, no sobre teoría nueva.',
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
      title: 'Mapear tu flujo actual',
      duration: '3 min',
      grouping: 'Individual, 30 s de plenario',
      prompt:
        'Anotá una tarea de las últimas dos semanas y marcá: la hice yo / la hice con un chatbot / la delegué a un agente / la revisé sin haberla escrito.',
      steps: [
        '30 s: elegir la tarea (un bug, un endpoint, un test, un README).',
        '90 s: marcar en qué casillero cayó cada etapa (entender, implementar, testear, documentar).',
        '60 s: dos voluntarios dicen qué casillero les dio más vergüenza dejar vacío.',
      ],
      expectedOutput: [
        'La mayoría descubre que usa IA para implementar y casi nunca para especificar ni para review independiente.',
        'Al menos una persona admite que pegó código sin entenderlo. Usarlo como gancho, no como humillación.',
      ],
      debrief:
        '“Hoy vamos a entrenar justo las casillas vacías: spec, contexto, plan y validación. Implementar va a ser lo más fácil.”',
    },
    teacherNotes: {
      pacing: '12 min de exposición + 3 min de mini-actividad. El flujo grande queda en pantalla el resto de la clase.',
      say: 'No vinimos a construir modelos. Vinimos a dejar de usarla como oráculo de código y empezar a usarla como equipo al que se dirige.',
      watchFor:
        'Si alguien dice “yo no uso IA”, invitarlo igual: el workshop es el método, no la herramienta favorita. Puede hacer la actividad en papel.',
      ifLate: 'Saltar el segundo ejemplo. No saltar la mini-actividad: calibra al grupo.',
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
        title: 'Tres pedidos, tres niveles',
        body: 'Chatbot: “escribime una función que sume”. Asistente: “en este archivo, completá el test que está a medias”. Agente: “implementá el límite de 3 reservas activas según SPEC.md, corré Vitest y no toques auth”. El tercero necesita repo, spec y terminal.',
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
      title: 'Clasificá la herramienta',
      duration: '4 min',
      grouping: 'Duplas, 1 min de plenario',
      prompt:
        'Ubiquen ChatGPT, GitHub Copilot (inline), Cursor Chat, Cursor Agent / Claude Code y “un script que corre tests solo” en chatbot, asistente o agente. Justifiquen con la fórmula.',
      steps: [
        '2 min: clasificar en silencio en dupla.',
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
      pacing: '11 min de mapa mental + 4 min de clasificación. No entrar a APIs de proveedores.',
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
      'Un ADE (Agentic Development Environment) se diseña alrededor de trabajo delegable. En lugar de un hilo “yo escribo”, hay un orquestador: varios agentes con objetivos distintos, a menudo en paralelo, con aislamiento (por ejemplo Git worktrees), acceso a terminal, filesystem y a veces browser, y un flujo de revisión de diffs. El oficio se parece más a dirigir un equipo pequeño que a pelear con un buffer.',
      'Esto no obliga a abandonar VS Code mañana. Obliga a reconocer el techo del asistente: un chat al costado del editor no orquesta QA, docs y backend al mismo tiempo, ni aísla cambios, ni te obliga a un plan. Orca (onorca.dev) sirve como caso de estudio de ese techo superado: no es el objetivo del curso aprender sus botones, es entender el paradigma para reconocerlo en cualquier herramienta que aparezca.',
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
        body: 'IDE: implementás el endpoint, después los tests, después el README. AI IDE: el asistente te escribe el handler mientras vos armás el test. ADE: un agente arma la API en un worktree, otro escribe tests en otro, vos revisás dos diffs y rechazás el que cambió auth sin que se lo pidieran.',
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
      'Orca ilustra el paradigma; el curso no es un tutorial de Orca.',
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
      say: 'No les voy a pedir que usen Orca. Les voy a pedir que reconozcan cuándo un entorno les deja de asistir y empieza a ejecutar trabajo.',
      watchFor: 'Quedarse a discutir marcas (Cursor vs Copilot vs Windsurf). Cortar: “capa, no logo”.',
      ifLate: 'Tabla + una frase de Orca. Mini-actividad en 60 s.',
      misconception:
        'Si preguntan si GitHub Codespaces o un IDE con muchos plugins “ya es ADE”: no, salvo que orquesten agentes aislados. Plugins ≠ orquestación.',
    },
  },
  {
    id: 4,
    title: 'Context Engineering',
    objective:
      'Entender que la calidad del resultado depende menos de “el prompt ingenioso” y más de qué información relevante se le da al modelo o al agente, y en qué forma.',
    body: [
      'La ecuación de este workshop es Resultado = Modelo + Prompt + Contexto + Herramientas. El prompt es la instrucción del momento. El contexto es todo lo que el sistema debería saber para no improvisar: conversación previa, archivos del proyecto, arquitectura, convenciones, requisitos, tests, historial de Git, reglas de la organización, sistemas externos. Context Engineering es la disciplina de elegir, estructurar y mantener esa información.',
      'Un prompt brillante sobre un repo vacío produce un tutorial genérico. El mismo prompt, con SPEC.md, la estructura real de carpetas, el estilo de los tests y “no toques auth”, produce un cambio encajado. Por eso .cursorrules, AGENTS.md, README y specs no son burocracia: son contexto reutilizable. Cada sesión que empieza de cero le pide al modelo que adivine el sistema.',
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
        title: 'Contexto que conviene tener escrito',
        body: 'Stack y versión. Cómo se corren los tests. Dónde viven las rutas. Qué archivos son sagrados. Errores de negocio en qué formato (HTTP 400 + código). Nombres en español o inglés. Eso cabe en un AGENTS.md de una página.',
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
      'Reglas de proyecto (.cursorrules, AGENTS.md, SPEC.md) son contexto estructurado, no adorno.',
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
      'Comprender cómo un agente deja de ser un chat y pasa a actuar sobre sistemas reales, y qué problema resuelve MCP.',
    body: [
      'Sin herramientas, el agente solo emite texto. Con tool calling puede leer un archivo, correr `npm test`, consultar una API, abrir un issue. Ese salto —de hablar a actuar— es el que justifica la palabra agente en desarrollo. El ciclo se vuelve: planificar, invocar una herramienta, observar el resultado, corregir.',
      'El problema histórico es que cada integración era artesanal: un plugin para GitHub, otro para la base, copy/paste desde Jira. MCP (Model Context Protocol) es un estándar abierto: el agente habla con un cliente MCP, que se conecta a servidores que exponen herramientas y recursos (filesystem, GitHub, PostgreSQL, Figma, etc.). No hace falta implementar el protocolo en este workshop; hace falta saber que existe un enchufe común.',
      'Para el oficio, la pregunta útil no es “¿cómo escribo un MCP server?”. Es “¿qué sistemas de mi flujo siguen viviendo en copy/paste?”. Cada uno de esos es una herramienta que el agente todavía no tiene — y una fuente de errores humanos.',
    ],
    keyConcept: `ANTES
Agente ↔ copiar/pegar ↔ Jira / DB / GitHub

AHORA
AGENTE → MCP CLIENT → MCP SERVER → HERRAMIENTA → SISTEMA`,
    examples: [
      {
        title: 'Sin MCP vs con MCP',
        body: 'Sin: copiás el issue #412 al chat, después copiás el branch name a la terminal, después pegás el resumen en el PR. Con: “tomá el issue #412, creá branch, implementá según la spec del issue, abrí el PR”. El agente lee GitHub de verdad.',
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
      'MCP estandariza la conexión agente–mundo real; no hace falta implementarlo para usarlo conceptualmente.',
      'Cada sistema que hoy copiás a mano es una herramienta que el agente todavía no tiene.',
    ],
    teacherNotes: {
      pacing: '8 min. Un diagrama, dos ejemplos, una pregunta al aula. Cero live-coding de servers.',
      say: 'Si el agente no puede tocar el sistema, ustedes son el protocolo: copian y pegan. MCP existe para que dejen de ser el cable.',
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
      'Practicar el flujo completo sobre un requerimiento realista, y ver por qué un enunciado vago produce software incorrecto aunque el modelo sea bueno.',
    body: [
      'El enunciado “el sistema debe permitir que un usuario reserve un turno” parece trabajo. Para un agente es una invitación a inventar el producto: una reserva por usuario o cien, con o sin overlap, con o sin cancelación, autenticado o anónimo, agenda infinita o slots. Si no se decide, se decide igual — en el código, sin que nadie lo haya aprobado.',
      'El flujo de este workshop fuerza las decisiones antes del diff. (1) Leer el requerimiento como sospechoso. (2) Listar ambigüedades en forma de preguntas. (3) Convertir las respuestas en reglas verificables (especificación). (4) Adjuntar contexto: stack, carpetas, “qué no tocar”, cómo se testea. (5) Pedir un plan sin modificar código. (6) Implementar el plan aprobado, revisando diffs. (7) Tests de caso feliz y de borde; intentar romper. (8) Review con otra sesión o agente (quien implementó no se autoaprueba) y un humano al final.',
      'Separar plan de implementación no es ceremonia. Un plan malo se corrige en un párrafo. Un módulo malo se corrige en una hora y deja tests que testean el error. Usar un agente distinto para QA no es moda multiagente: es el mismo principio que no dejar que el autor de un PR se haga el unique reviewer.',
    ],
    diagram: `REQUERIMIENTO (vago)
      ↓  preguntas
ESPECIFICACIÓN (reglas + criterios de aceptación)
      ↓  stack, repo, “no tocar”
CONTEXTO
      ↓  “no modifiques código”
PLAN (archivos, orden, riesgos)
      ↓  diffs supervisados
IMPLEMENTACIÓN
      ↓  casos borde
TESTING
      ↓  otro agente + humano
REVIEW → SOFTWARE`,
    examples: [
      {
        title: 'Del enunciado pobre a reglas',
        body: 'Preguntas: ¿quién reserva? ¿un usuario autenticado? ¿cuántas reservas activas? ¿qué pasa si dos POST llegan al mismo slot? ¿se puede cancelar? ¿hasta cuándo? ¿turnos en el pasado? Decisiones de ejemplo: usuario autenticado; máximo 3 reservas futuras; slot único; cancelación hasta 24 h antes; 400 si el slot está ocupado o es pasado. Eso ya se puede testear.',
      },
      {
        title: 'El prompt del plan (copiar)',
        body: '“Leé SPEC.md y AGENTS.md. Listá archivos a crear o modificar, orden de implementación, riesgos (concurrencia, auth) y tests que vas a agregar. No escribas código todavía. Si una regla de la spec es ambigua, preguntá; no asumas.”',
      },
    ],
    misconceptions: [
      {
        wrong: '“Si el agente es bueno, la spec puede ser corta.”',
        right:
          'Una spec corta desplaza las decisiones al modelo. Vas a pasar el rato corrigiendo producto, no bugs.',
      },
      {
        wrong: '“Los tests los genera el mismo agente al final y alcanza.”',
        right:
          'El implementador tiende a testear lo que ya hizo. Un segundo pase (o un humano) tiene que intentar romper las reglas de negocio.',
      },
    ],
    takeaways: [
      'La calidad del software generado sigue a la calidad de la especificación y del contexto.',
      'Separar planificación de implementación reduce retrabajo y alucinaciones de diseño.',
      'Implementador ≠ revisor. Tests y un humano cierran el loop.',
    ],
    miniActivity: {
      title: 'Cinco preguntas antes de implementar',
      duration: '3 min',
      grouping: 'Individual, después se usan en la actividad larga',
      prompt:
        'Sin mirar las de la pizarra, escribí 5 preguntas que harías antes de implementar “reservar un turno”.',
      steps: [
        '2 min de escritura.',
        '1 min: recolectar 6–8 preguntas distintas. Completar las que falten (concurrencia, cancelación, identidad).',
      ],
      expectedOutput: [
        'Identidad del usuario, cupo, overlap, cancelación, pasado, timezone, notificaciones, admin vs paciente.',
        'Si nadie menciona concurrencia, el docente la pone: “dos reservas al mismo horario”.',
      ],
      debrief: '“Esas preguntas son el primer commit. El código viene después.”',
    },
    teacherNotes: {
      pacing: '9 min de walkthrough + 3 min de preguntas. Demo 3 solo si el reloj lo permite (queda buffer en la actividad).',
      say: 'No vamos a programar el sistema de turnos ahora. Vamos a dejarlo tan especificado que programarlo sea la parte aburrida — y eso es el desafío de la casa.',
      watchFor:
        'El aula quiere ver código. Mostrar un plan en viñetas vale más. El código del desafío es asincrónico.',
      ifLate: 'Pasos 1–5. Testing/review: dos frases y al desafío.',
      misconception:
        'Si dicen “en el trabajo el ticket ya viene así de vago”, responder: “entonces el primer entregable del agente es la lista de preguntas, no el PR.”',
    },
  },
]

export const orcaCaseStudy = {
  title: 'Caso de estudio: Orca',
  body: [
    'Orca (onorca.dev) parte de una limitación del IDE clásico: un desarrollador, un hilo, una tarea. Propone un ADE donde varios agentes trabajan en paralelo con aislamiento vía Git worktrees. El desarrollador orquesta, revisa diffs y valida; no escribe cada línea.',
    'En este workshop Orca no se enseña botón por botón. Se usa para responder: ¿qué tiene un entorno cuando deja de ser un editor con chat y pasa a ser un lugar donde se coordina trabajo de agentes?',
  ],
  url: 'https://onorca.dev',
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
    'La ventaja ya no está solamente en escribir código más rápido. Está en saber definir qué debe construirse, proporcionar el contexto adecuado, dirigir agentes y validar que el resultado sea correcto.',
}

export const practicalActivity = {
  title: 'Registrar gastos personales',
  duration: '25 minutos',
  grouping: 'Duplas (o tríos si falta máquina). Un portavoz por grupo.',
  goal: 'Practicar el método hasta el plan — no terminar una app. Al final de los 25 minutos cada dupla debe tener ambigüedades, reglas, contexto, un prompt y un plan (propio o criticado).',
  requirement: 'El sistema debe permitir registrar gastos personales con categoría y monto.',
  whyThis:
    'Es deliberadamente pobre, como un ticket real. El caso de turnos queda para el walkthrough y el desafío; acá transfieren el método a otro dominio.',
  timing: [
    { minutes: '0–3', label: 'Leer el enunciado y listar ambigüedades (individual, después unen listas).' },
    { minutes: '3–8', label: 'Convertir 6–8 preguntas en reglas concretas. Elegir, no acumular “depende”.' },
    { minutes: '8–13', label: 'Escribir la mini-spec (reglas + 5 criterios de aceptación).' },
    { minutes: '13–18', label: 'Definir contexto (stack inventado pero coherente) y el prompt para el agente.' },
    { minutes: '18–22', label: 'Pedir un plan a una IA o criticar el plan semilla. Marcar 2 riesgos.' },
    { minutes: '22–25', label: 'Plenario: 2 duplas leen una regla y el peor supuesto que evitaron.' },
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

## Criterios de aceptación
1. POST de un gasto válido lo persiste y lo devuelve con id.
2. POST con monto ≤ 0 responde error de validación (4xx) y no persiste.
3. POST con categoría desconocida responde 4xx y no persiste.
4. GET lista todos, más reciente primero.
5. DELETE de un id inexistente responde 404.`,
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
    'Las reglas se pueden testear (no “el usuario debería poder cargar gastos de forma sencilla”).',
    'Hay una sección explícita de fuera de alcance.',
    'El prompt prohíbe código hasta tener plan.',
    'El plan nombra archivos, orden y tests — no solo “armar el backend”.',
    'Hay al menos un riesgo (validación, persistencia al reiniciar, zona horaria).',
  ],
  steps: [
    'Listar ambigüedades del requerimiento (mínimo 6 preguntas).',
    'Decidir reglas concretas; anotar también lo que queda fuera de alcance.',
    'Redactar mini-spec con 5 criterios de aceptación verificables.',
    'Definir contexto: stack, carpetas, cómo se testea, qué no tocar.',
    'Escribir el prompt del agente (plan, no código).',
    'Obtener o criticar un plan: marcar 2 huecos o riesgos.',
  ],
  methodology: `REQUERIMIENTO
↓
ESPECIFICACIÓN
↓
CONTEXTO
↓
PLAN
↓
VALIDACIÓN`,
  note: 'No es necesario programar. El entregable de los 25 minutos es el método aplicado: spec + contexto + prompt + plan criticado.',
  debriefQuestions: [
    '¿Qué supuesto iba a colar el agente si no lo escribían (auth, pesos vs dólares, categorías libres)?',
    '¿El plan semilla les pareció “suficiente”? ¿Por qué no lo es?',
    '¿Qué van a copiar tal cual al desafío de turnos?',
  ],
  teacherNotes: [
    'Repartir roles en la dupla: uno escribe la spec, el otro ataca con “¿y si…?”. A los 8 minutos rotan.',
    'Si una dupla discute 10 minutos sin decidir, imponer el MVP de las decisiones de ejemplo y pedirles que sigan. Decidir mal y explícito gana a no decidir.',
    'Tener el plan semilla en pantalla a partir del minuto 18. Los que no llegaron a usar IA igual practican review.',
    'Debrief corto y concreto. Elegir una dupla que se haya ido a multi-usuario o a charts y mostrar cómo la spec se infló.',
    'Recoger 1 foto o 1 gist de una buena mini-spec para mostrar al cierre: “esto es el nivel que espero en SPEC.md del desafío”.',
  ],
}

export const finalChallenge = {
  title: 'Desafío Final — Del requerimiento al software',
  subtitle: 'Reservas de turnos, de la spec al sistema validado',
  description:
    'Actividad asincrónica (unas 4–6 horas de trabajo a lo largo de una semana). El alumno usa libremente herramientas de IA y agentes para transformar la especificación dada en software ejecutable, testeado y documentado.',
  objective:
    'Evaluar si puede dirigir un proceso con IA — especificar, contextualizar, planificar, implementar, testear y registrar decisiones — no si programa sin IA. Usar IA es obligatorio y se documenta en AI.md.',
  estimatedEffort: '4–6 horas',
  suggestedDeadline: '7 días corridos después de la clase',
  tools: ['ChatGPT', 'Claude', 'Cursor', 'GitHub Copilot', 'Claude Code', 'Codex', 'Gemini', 'Otros agentes'],
  scenario:
    'Un consultorio chico quiere un MVP para que pacientes autenticados reserven turnos sobre una agenda de slots. No hay UI sofisticada: alcanza una API (y una UI mínima opcional). El producto se define por las reglas de negocio, no por el framework.',
  givenSpec: `## Producto
API de reserva de turnos para un único consultorio.

## Actores
- Paciente autenticado (en el MVP puede ser un userId simulado por header \`X-User-Id\` si no implementan auth real; debe quedar documentado).
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
6. Operaciones sobre reservas ajenas: 403 o 404 (elegir uno y ser consistente).
7. Slot inexistente o ya ocupado: 409 o 400 (elegir uno y ser consistente).

## Criterios de aceptación (el evaluador los va a intentar romper)
- CA1: listar disponibles no incluye pasados ni ocupados.
- CA2: reservar un slot libre lo marca ocupado y cuenta para el cupo del usuario.
- CA3: un cuarto intento de reserva activa del mismo usuario falla.
- CA4: dos reservas sobre el mismo slot: una gana, la otra falla (aunque sea secuencial en tests).
- CA5: cancelar 24 h 1 min antes del slot está permitido; 23 h 59 min antes, no.
- CA6: tras cancelar a tiempo, otro usuario puede tomar el slot.
- CA7: hay tests automatizados que cubren CA1–CA6 (no hace falta un test por CA si uno cubre varios, pero los seis comportamientos tienen que fallar si se rompen).

## Restricciones técnicas
- Stack libre, pero \`README.md\` tiene que permitir instalar, testear y (si aplica) levantar el servidor en menos de 10 minutos.
- Debe existir \`npm test\`, \`pnpm test\`, \`pytest\` o equivalente documentado.
- Sin secretos reales. Sin llamar APIs pagas en los tests.`,
  constraints: [
    'Usar al menos una herramienta de IA o agente en el proceso y documentarlo. Entregar código “como si no hubiera IA” sin AI.md incompleto no cumple el objetivo.',
    'No se evalúa originalidad del stack. Se evalúa cumplimiento de reglas, tests y honestidad del proceso.',
    'El alumno puede partir de un repo vacío. No se entrega un starter obligatorio.',
    'Si usan header \`X-User-Id\` en lugar de auth real, debe decirse en README y SPEC.md. Inventar un JWT a medias sin tests de auth no suma.',
  ],
  deliveryStructure: `/
├── src/
├── tests/
├── README.md
├── SPEC.md
└── AI.md`,
  specMd:
    'Interpretación del alumno: reglas en sus palabras, decisiones (códigos HTTP, auth simulada o real), fuera de alcance y cómo se corre. No copiar y pegar la spec dada sin decidir.',
  aiMd: 'Bitácora del proceso: herramientas, prompts o instrucciones relevantes, qué se delegó, qué se rechazó, qué falló, cómo se verificó. Debe permitir reconstruir el trabajo.',
  specMdTemplate: `# SPEC.md — Reservas de turnos

## Decisión de auth
(Ej. \`X-User-Id\` / sesión / JWT). Cómo se identifica al usuario en los tests.

## Códigos HTTP elegidos
- Slot ocupado:
- Reserva ajena:
- Validación (pasado, cupo, ventana de cancelación):

## Reglas (reescritas, verificables)
1.
2.
3.

## Fuera de alcance (además de lo dado)
-

## Cómo se prueba
Comando:
Casos que cubren CA1–CA6:`,
  aiMdTemplate: `# AI.md

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
      body: '“El usuario puede reservar turnos de forma intuitiva. Se usó Node.” No hay cupo, no hay códigos, no hay CA. El evaluador no sabe qué era intención y qué fue accidente.',
    },
    {
      title: 'SPEC.md sólida',
      body: 'Reescribe las 7 reglas, elige 409 en conflicto de slot, documenta X-User-Id, lista los tests por CA, y un párrafo de fuera de alcance (“no hay lista de espera”).',
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
Evidencia: El cuarto POST /reservations del mismo X-User-Id devuelve 201.
Test del evaluador: rejects_fourth_active_reservation
Esperado: HTTP 4xx | Obtenido: HTTP 201
Puntos en cumplimiento funcional: recorte proporcional.`,
  deliveryChecklist: [
    'Estructura src/, tests/, README.md, SPEC.md, AI.md',
    'SPEC.md con decisiones (auth, códigos HTTP) y reglas reescritas',
    'AI.md con herramientas, rechazos y verificación — no una línea',
    'Tests que cubren los comportamientos CA1–CA6',
    'README con instalar, testear y correr en menos de 10 minutos',
    'Comando de test en verde en un checkout limpio',
    'Sin secretos ni features de fuera de alcance que rompan el MVP',
  ],
  teacherNotes: [
    'En clase: proyectar la spec dada y CA1–CA6. Decir en voz alta: “el juez va a intentar el cuarto turno y el doble booking”. Eso calibra más que la rúbrica en abstracto.',
    'Aclarar que la spec dada manda sobre el SPEC.md del alumno si hay contradicción. SPEC.md sirve para decisiones (códigos, auth), no para borrar el cupo de 3.',
    'No exigir auth real: un header documentado evita que el desafío se vuelva un curso de JWT. Quien implemente auth bien puede sumar en calidad, no en cumplimiento si los CA fallan.',
    'Evaluación sugerida: primero \`comando de test del alumno\`; si no corre, techo bajo en rúbrica. Después 4 tests privados (cupo, conflicto, pasado, 24 h). Después lectura de AI.md para el 5% de documentación/proceso.',
    'Si no hay sandbox de agentes el primer año, el docente hace de Judge con la misma rúbrica. El relato multiagente sigue siendo el modelo a futuro, no un bloqueante.',
    'Feedback útil cita evidencia (“tu cuarto POST da 201”) no adjetivos (“poca IA”). El oficio se corrige con contraejemplos.',
  ],
}
