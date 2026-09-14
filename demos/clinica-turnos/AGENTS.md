# AGENTS.md — Clínica Turnos (demo workshop)

## Stack

- Next.js 16 App Router (`src/app/api/`)
- TypeScript estricto
- Validación con Zod en handlers
- Tests: Vitest (`npm test`)
- **Sin** Prisma, **sin** base de datos: persistencia en `src/lib/store.ts` (in-memory)

## Auth (no modificar sin pedido explícito)

- Usuario identificado por header `X-User-Id`
- Helper: `getUserId(request)` en `src/lib/auth.ts`
- Si falta el header → 401
- **No** agregar JWT, sesiones ni middleware de auth en estas demos

## Convenciones de código

- Handlers en `src/app/api/<recurso>/route.ts`
- Lógica de negocio en `src/lib/<dominio>.ts`
- Errores de validación → 400 con `{ error: string }`
- Conflictos de negocio (slot ocupado) → 409
- No encontrado → 404
- Tests en `tests/*.test.ts` importando desde `@/lib/...`

## Patrón de referencia

Copiar estilo de `src/app/api/patients/route.ts` para nuevos endpoints.

## Alcance MVP (ver SPEC.md)

- Reservar slot libre
- Máximo 3 reservas activas por usuario
- No reservar slots en el pasado
- Un slot = una reserva activa

## Fuera de alcance

- Pagos, emails, UI, multi-consultorio, Prisma, Docker

## Verificación (antes de declarar listo)

```bash
npm test
```

No dar por terminado un cambio sin suite en verde. Si falla un test de cupo/slot, corregir el código — no borrar el test.
