# Demo 7 — ADE / varios agentes en paralelo

**Cuándo:** Opcional, con Cursor (Agent / varios agentes) u otro ADE. **Duración:** 5 min.  
**Proyecto:** `demos/clinica-turnos` (idealmente con worktrees)

---

## Orquestación (docente)

Asignar **archivos disjuntos** para reducir conflictos:

| Agente | Alcance | Archivos |
|--------|---------|----------|
| Backend | POST reservas + lib | `src/lib/appointments.ts`, `src/app/api/appointments/route.ts` |
| QA | Tests de reglas | `tests/appointments.*.test.ts` |
| Docs | Cómo correr tests | `README.md` (solo sección Testing) |

---

## Prompt — Agente Backend

```
Worktree: solo Backend.

Implementá POST /api/appointments según SPEC.md (MVP).
Archivos permitidos: src/lib/appointments.ts, src/app/api/appointments/route.ts.
No toques tests/ ni README. No toques auth.
```

---

## Prompt — Agente QA

```
Worktree: solo QA.

Escribí tests en tests/ para SPEC.md:
- reserva válida (201)
- cuarto cupo mismo usuario (4xx)
- slot ya ocupado (4xx)
- slot en el pasado (4xx)

No modifiques src/ salvo que sea estrictamente necesario para importar tipos (preferir no tocar).
```

---

## Prompt — Agente Docs

```
Worktree: solo Docs.

Actualizá README.md: sección ## Testing con npm install, npm test, y ejemplo de curl con header X-User-Id.
No modifiques src/ ni tests/.
```

---

## Qué observar

- ¿Algún agente tocó archivos de otro?
- ¿Los diffs son revisables por separado?
- ¿Hay merge conflicts al integrar?

---

## Cierre

> Paralelo sin spec compartida y sin aislamiento es solo ruido más rápido.
