# Demo 1 — Prompt pobre vs contextualizado

**Cuándo:** Bloque 4 — Context Engineering (~min 45). **Duración:** 4 min.  
**Proyecto:** `demos/clinica-turnos` abierto en Cursor.  
**Caso de uso:** cancelar un turno (mismo dominio que la práctica de solicitar y el desafío de reprogramar).  
**Importante:** dos **sesiones nuevas** (no el mismo chat).

---

## Prompt A — pobre (sesión 1)

Copiar y pegar **solo esto**:

```
Creá un endpoint para cancelar un turno.
```

### Qué debería pasar (para el docente)

- Inventa stack (Express, JWT, carpetas que no existen).
- Cancelación siempre permitida; no habla de “solo propia” ni de liberar el slot.
- No menciona tests ni `AGENTS.md`.
- No respeta auth por header.

### Pregunta al aula (antes de pegar)

> ¿Qué stack va a asumir la IA? ¿Va a dejar cancelar a 5 minutos del turno?

---

## Prompt B — contextualizado (sesión 2)

Copiar y pegar **todo el bloque**:

```
Sos un agente de implementación en este repositorio.

Stack y convenciones (leé AGENTS.md y package.json):
- Next.js App Router, TypeScript estricto
- Validación con Zod en handlers
- Tests con Vitest (npm test)
- Auth: header X-User-Id (ver src/lib/auth.ts). No agregues JWT ni middleware nuevo.
- Persistencia in-memory en src/lib/store.ts (no agregues Prisma ni base de datos)
- Ya existe POST /api/appointments para crear reservas.

Tarea:
Implementá la cancelación de una reserva propia según SPEC.md:
- solo el dueño (X-User-Id) puede cancelar
- cancelar solo si faltan ≥ 24 h para el inicio del slot
- cancelar a tiempo libera el slot
- sin header → 401; reserva ajena → 403 o 404 (elegí y documentá)

Restricciones:
- Reutilizá el patrón de src/app/api/patients/route.ts
- Agregá o actualizá tests en tests/
- No modifiques src/lib/auth.ts ni el contrato de X-User-Id
- No escribas README ni refactors fuera de alcance
- No implementes pagos ni reprogramación

Antes de codear: listá en 3 bullets qué archivos vas a tocar. Después implementá.
```

### Qué debería pasar

- Nombra ruta de cancel (DELETE o POST), `src/lib/appointments.ts`, tests.
- Usa Zod y el header `X-User-Id`.
- Menciona ventana 24 h y liberar slot.
- No toca auth ni inventa Prisma.

### Cierre (30 s)

> Mismo pedido de negocio. Distinto contexto. Distinto código.

---

## Si no hay red

Preferible: actividad sin PC con 4 cartas (Vacío / Parcial / Ruido / Curado).  
Imprimir `demos/actividades/mismo-pedido-distinto-contexto.pdf` (~10–12 min) — mismo pedido: cancelar.

Fallback rápido: leer en voz alta la diferencia — Prompt A → “Express + JWT + cancelar siempre”. Prompt B → “App Router + Zod + 24 h + solo propia + no tocar auth”.
