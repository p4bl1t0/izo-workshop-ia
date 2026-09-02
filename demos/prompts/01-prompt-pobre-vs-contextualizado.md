# Demo 1 — Prompt pobre vs contextualizado

**Cuándo:** Bloque 4 — Context Engineering (~min 45). **Duración:** 4 min.  
**Proyecto:** `demos/clinica-turnos` abierto en Cursor.  
**Importante:** dos **sesiones nuevas** (no el mismo chat).

---

## Prompt A — pobre (sesión 1)

Copiar y pegar **solo esto**:

```
Creá un endpoint para reservar turnos.
```

### Qué debería pasar (para el docente)

- Inventa stack (Express, JWT, carpetas que no existen).
- No menciona tests ni `AGENTS.md`.
- No respeta auth por header.

### Pregunta al aula (antes de pegar)

> ¿Qué stack va a asumir la IA?

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

Tarea:
Implementá POST /api/appointments para crear una reserva según SPEC.md (reglas MVP: usuario identificado, máximo 3 reservas activas por usuario, slot único, no reservar en el pasado).

Restricciones:
- Reutilizá el patrón de src/app/api/patients/route.ts
- Agregá o actualizá tests en tests/
- No modifiques src/lib/auth.ts ni el contrato de X-User-Id
- No escribas README ni refactors fuera de alcance

Antes de codear: listá en 3 bullets qué archivos vas a tocar. Después implementá.
```

### Qué debería pasar

- Nombra `src/app/api/appointments/route.ts`, `src/lib/appointments.ts`, tests.
- Usa Zod y el header `X-User-Id`.
- No toca auth ni inventa Prisma.

### Cierre (30 s)

> Mismo pedido de negocio. Distinto contexto. Distinto código.

---

## Si no hay red

Leer en voz alta la diferencia: Prompt A → “Express + JWT + controllers/”. Prompt B → “App Router + Zod + tests + no tocar auth”.
