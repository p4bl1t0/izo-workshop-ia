export type RubricLevel = {
  name: 'Insuficiente' | 'Suficiente' | 'Excelente'
  description: string
}

export type RubricCriterion = {
  name: string
  points: number
  description: string
  levels: RubricLevel[]
}

export const rubricCriteria: RubricCriterion[] = [
  {
    name: 'Cumplimiento funcional',
    points: 40,
    description:
      'El software se comporta según la spec dada (cupo, slot único, pasado, cancelación 24 h, listados). La spec dada manda si contradice al SPEC.md del alumno.',
    levels: [
      {
        name: 'Insuficiente',
        description: 'No corre, o fallan 3 o más reglas de negocio (CA1–CA6).',
      },
      {
        name: 'Suficiente',
        description: 'Las reglas principales se cumplen; 1 edge case flojo (p. ej. ventana de 24 h aproximada).',
      },
      {
        name: 'Excelente',
        description: 'CA1–CA6 se pueden romper y aguantan. Códigos HTTP consistentes con lo documentado.',
      },
    ],
  },
  {
    name: 'Edge cases',
    points: 15,
    description: 'Conflicto de slot, cuarto cupo, cancelación tarde, slot pasado, reserva ajena.',
    levels: [
      {
        name: 'Insuficiente',
        description: 'Solo happy path. El cuarto POST o el doble booking pasan.',
      },
      {
        name: 'Suficiente',
        description: 'Cupo o conflicto están cubiertos; falta un edge case de tiempo.',
      },
      {
        name: 'Excelente',
        description: 'Los edge cases de la spec están cubiertos y fallan ruidoso (4xx), no con 500 genérico.',
      },
    ],
  },
  {
    name: 'Tests',
    points: 15,
    description: 'Suite documentada que cubre los comportamientos CA1–CA6. No tests triviales (“true === true”).',
    levels: [
      {
        name: 'Insuficiente',
        description: 'No hay comando de test, no corre, o no cubre reglas de negocio.',
      },
      {
        name: 'Suficiente',
        description: 'Hay suite verde que cubre el núcleo; algunos CA se infieren pero no se nombran.',
      },
      {
        name: 'Excelente',
        description: 'Un checkout limpio corre tests; se ve qué CA cubre cada caso. No se “arregló” la spec para pasar.',
      },
    ],
  },
  {
    name: 'Calidad del código',
    points: 10,
    description: 'Legible, sin secretos, sin features de fuera de alcance que ensucien el MVP.',
    levels: [
      {
        name: 'Insuficiente',
        description: 'Inentendible, secretos commiteados, o un monolito generado sin recorte.',
      },
      {
        name: 'Suficiente',
        description: 'Se puede seguir el flujo reserva/cancelar. Algo de ruido de agente, pero acotado.',
      },
      {
        name: 'Excelente',
        description: 'Diff que un compañero revisaría. Nombres coherentes. Fuera de alcance respetado.',
      },
    ],
  },
  {
    name: 'Arquitectura',
    points: 10,
    description: 'Estructura coherente con el stack declarado. Separación razonable de rutas, reglas y persistencia.',
    levels: [
      {
        name: 'Insuficiente',
        description: 'Todo en un archivo sin criterio, o tres frameworks a la vez.',
      },
      {
        name: 'Suficiente',
        description: 'Una estructura reconocible y documentada. Persistencia explícita (memoria o DB).',
      },
      {
        name: 'Excelente',
        description: 'Límites claros (“qué no tocar” se nota). Fácil agregar un CA nuevo.',
      },
    ],
  },
  {
    name: 'Documentación y proceso',
    points: 5,
    description: 'README ejecutable. AI.md reconstruye el trabajo: herramientas, rechazos, verificación.',
    levels: [
      {
        name: 'Insuficiente',
        description: 'README vacío o AI.md de una línea (“usé ChatGPT”).',
      },
      {
        name: 'Suficiente',
        description: 'Se puede instalar y testear. AI.md nombra herramientas y un incidente.',
      },
      {
        name: 'Excelente',
        description: 'README de 10 minutos. AI.md con plan, diffs rechazados y comando final en verde.',
      },
    ],
  },
  {
    name: 'Especificación',
    points: 5,
    description: 'SPEC.md reescribe reglas, fija decisiones (auth, códigos HTTP) y no borra CA de la spec dada.',
    levels: [
      {
        name: 'Insuficiente',
        description: 'Copy-paste sin decisiones, o contradice la spec dada (p. ej. cupo 10).',
      },
      {
        name: 'Suficiente',
        description: 'Reglas reescritas y auth/HTTP decididos. Fuera de alcance presente.',
      },
      {
        name: 'Excelente',
        description: 'Decisiones trazables a tests. Una persona ajena podría implementar solo con este archivo.',
      },
    ],
  },
]

export const rubricTotal = rubricCriteria.reduce((sum, c) => sum + c.points, 0)
