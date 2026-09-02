# Demo 3 — Plan antes de modificar código

**Cuándo:** Bloque 6 — walkthrough (~min 112). **Duración:** 4 min.  
**Proyecto:** `demos/clinica-turnos` — **sesión nueva**

---

## Contexto a adjuntar (opcional)

Si el agente no indexa el repo, pegar también el contenido de `SPEC.md` o decir: “Leé SPEC.md y AGENTS.md del proyecto abierto”.

---

## Prompt

```
Leé SPEC.md y AGENTS.md de este repositorio.

Tarea: generá un plan de implementación para cumplir el MVP de reservas (POST /api/appointments y lo necesario en lib/tests).

El plan debe incluir:
- Archivos a crear o modificar (rutas exactas)
- Orden de implementación (pasos numerados)
- Tests a escribir o actualizar (nombres descriptivos)
- Riesgos: concurrencia de slot, cupo de 3 reservas, fechas pasadas, auth con X-User-Id
- Qué archivos NO tocar

Restricciones:
- No escribas código
- No ejecutes cambios
- Si algo en SPEC.md es ambiguo, hacé una pregunta antes de asumir

Formato: markdown con secciones ## Plan, ## Tests, ## Riesgos, ## Preguntas (si hay).
```

---

## Checklist para rechazar el plan (con el aula)

Marcar en rojo si falta:

- [ ] Cupo de 3 reservas activas
- [ ] Slot único / conflicto
- [ ] No reservar en el pasado
- [ ] Al menos 2 tests nombrados
- [ ] “No tocar auth” explícito

Si falta algo: **“Plan incompleto — agregá X antes de implementar.”**

---

## Qué NO hacer en esta demo

No dejar que el agente implemente. Decir: “Plan aprobado queda para el desafío; ahora seguimos con la actividad de gastos.”

---

## Cierre

> Un plan malo revisado cuesta menos que un módulo malo escrito.
