# Demo 6 — Dos agentes, mismo problema

**Cuándo:** Tarea para casa, no en vivo en 2 h.  
**Proyecto:** `demos/clinica-turnos` — **dos sesiones** (o dos modelos).

---

## Preparación

1. Copiar el repo o usar dos chats limpios.
2. Mismo commit / misma carpeta en ambos.
3. Pegar el **mismo** prompt en A y B.

---

## Prompt (idéntico en ambos)

```
Leé SPEC.md y AGENTS.md.

Implementá el MVP de reservas:
- POST /api/appointments según SPEC.md
- Tests que cubran: reserva válida, slot ocupado, cuarto cupo del mismo usuario, slot en el pasado

Restricciones:
- No agregues Prisma ni JWT
- Usá X-User-Id para auth
- npm test debe quedar en verde

Documentá en 5 bullets qué archivos tocaste.
```

---

## Comparar resultados

| Criterio | Agente A | Agente B |
|----------|----------|----------|
| ¿Cupo de 3? | | |
| ¿Conflicto de slot? | | |
| ¿Tests de pasado? | | |
| ¿Archivos extra (pagos, UI)? | | |
| ¿Líneas de diff razonables? | | |

---

## Pregunta de cierre

> ¿Confiarías en producción al que “pasó tests” sin leer el diff?
