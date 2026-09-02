export type GlossaryTerm = {
  term: string
  definition: string
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'LLM',
    definition:
      'Large Language Model. Modelo entrenado para procesar y generar texto. Base de asistentes y agentes, pero no es un agente por sí solo.',
  },
  {
    term: 'Token',
    definition:
      'Unidad mínima de texto que procesa un LLM. El consumo y los límites de contexto se miden en tokens.',
  },
  {
    term: 'Context Window',
    definition:
      'Cantidad máxima de tokens que un modelo puede procesar en una sola interacción. Incluye prompt, contexto y respuesta.',
  },
  {
    term: 'Prompt',
    definition: 'Instrucción o pregunta que se envía al modelo. Es solo una capa del contexto total.',
  },
  {
    term: 'Prompt Engineering',
    definition:
      'Disciplina de diseñar instrucciones efectivas para obtener mejores respuestas del modelo.',
  },
  {
    term: 'Context Engineering',
    definition:
      'Disciplina de proporcionar toda la información relevante (proyecto, código, reglas, docs) para que la IA tome buenas decisiones.',
  },
  {
    term: 'Embedding',
    definition:
      'Representación numérica de texto que captura significado semántico. Usado en búsqueda y RAG.',
  },
  {
    term: 'Agent',
    definition:
      'Sistema que combina modelo + objetivo + contexto + herramientas + iteración para ejecutar tareas de forma autónoma.',
  },
  {
    term: 'Tool Calling',
    definition:
      'Capacidad del modelo de invocar funciones o herramientas externas (archivos, APIs, terminales) en lugar de solo generar texto.',
  },
  {
    term: 'MCP',
    definition:
      'Model Context Protocol. Estándar abierto para conectar agentes con herramientas y fuentes de datos externas.',
  },
  {
    term: 'MCP Server',
    definition:
      'Servidor que expone herramientas o recursos a través del protocolo MCP para que un agente los utilice.',
  },
  {
    term: 'IDE',
    definition:
      'Integrated Development Environment. Entorno centrado en editar y depurar código.',
  },
  {
    term: 'AI IDE',
    definition:
      'IDE con asistente de IA integrado que sugiere, explica y genera código dentro del flujo de edición.',
  },
  {
    term: 'ADE',
    definition:
      'Agentic Development Environment. Entorno diseñado para orquestar múltiples agentes que ejecutan tareas en paralelo.',
  },
  {
    term: 'Agentic Development',
    definition:
      'Paradigma donde el desarrollador coordina agentes de IA que planifican, implementan, testean y revisan software.',
  },
  {
    term: 'Git Worktree',
    definition:
      'Mecanismo de Git que permite tener múltiples directorios de trabajo del mismo repo. Útil para aislar agentes en paralelo.',
  },
  {
    term: 'Orchestration',
    definition:
      'Coordinación de múltiples agentes, tareas y herramientas hacia un objetivo común.',
  },
  {
    term: 'Human in the Loop',
    definition:
      'Principio de mantener supervisión humana en decisiones críticas, revisión y validación del trabajo de la IA.',
  },
  {
    term: 'RAG',
    definition:
      'Retrieval-Augmented Generation. Técnica que recupera documentos relevantes antes de generar una respuesta.',
  },
  {
    term: 'Hallucination',
    definition:
      'Respuesta del modelo que suena plausible pero es incorrecta o inventada. Se mitiga con contexto, tests y revisión.',
  },
  {
    term: 'Prompt Injection',
    definition:
      'Ataque donde instrucciones maliciosas en el contexto intentan manipular el comportamiento del agente.',
  },
  {
    term: 'Especificación (SPEC)',
    definition:
      'Reglas de negocio y criterios de aceptación escritos de forma verificable. En este workshop, el contrato entre el alumno, el agente y el evaluador.',
  },
  {
    term: 'Criterio de aceptación',
    definition:
      'Comportamiento observable que se puede hacer fallar con un test (por ejemplo: el cuarto turno activo debe ser 4xx). No es un deseo (“que sea intuitivo”).',
  },
]
