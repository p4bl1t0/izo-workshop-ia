# Demostraciones del workshop

Material listo para copiar y pegar en clase. **Un solo proyecto base** sirve para las demos 1 a 7.

## Antes de la clase (5 minutos)

```bash
cd demos/clinica-turnos
npm install
npm test          # debe pasar (3 tests)
```

Abrí esta carpeta en Cursor (o tu AI IDE). Las demos 1 y 3 usan **sesiones nuevas** del agente.

## Estructura

```
demos/
├── README.md                 ← estás acá
├── prompts/                  ← prompts para copiar y pegar (uno por demo)
│   ├── 00-setup.md
│   ├── 01-prompt-pobre-vs-contextualizado.md
│   └── …
└── clinica-turnos/           ← proyecto base (copiar o abrir directo)
    ├── AGENTS.md
    ├── SPEC.md
    ├── estados/demo-5/       ← solo para demo 5 (tests en rojo)
    └── …
```

## Qué demo usa qué

| Demo | Prioridad | Proyecto base | Notas |
|------|-----------|---------------|-------|
| 01 Prompt pobre vs contextualizado | **En vivo** | `clinica-turnos` | 2 sesiones nuevas |
| 02 Analizar repositorio | Opcional | `clinica-turnos` | Sin escribir código |
| 03 Plan antes de código | **En vivo** | `clinica-turnos` + `SPEC.md` | No implementar |
| 04 Implementar paso 1 | Si hay tiempo | `clinica-turnos` | Tras demo 3 |
| 05 Tests y corrección | Consulta | `clinica-turnos` + estado demo-5 | Ver `estados/demo-5/README.md` |
| 06 Dos agentes | Casa | `clinica-turnos` | Dos sesiones, mismo prompt |
| 07 ADE multiagente | Opcional | `clinica-turnos` | Cursor / worktrees |
| 08 MCP | Consulta | Repo del workshop + MCP GitHub | MCP ya configurado |

## Regla de oro

- **Demo 1 y 3:** no improvisar prompts; copiar desde `prompts/`.
- **No implementar el sistema completo en vivo.** Demo 4 es un paso acotado; el desafío final es asincrónico.
- Si falla internet: leer “Resultado esperado” en cada `.md` y discutir.
