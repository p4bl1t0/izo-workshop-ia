# AGENTS.md — Clínica Turnos (demo · cancelar)

## Stack

- Next.js App Router (`src/app/api/`), TypeScript estricto
- Validación con Zod en handlers
- Tests: Vitest (`npm test`)
- Persistencia in-memory en `src/lib/store.ts` — **sin** Prisma ni base de datos
- Ya existe `POST /api/appointments` para crear reservas

## Auth (no modificar sin pedido explícito)

- Usuario identificado por header `X-User-Id` — ver `src/lib/auth.ts`
- Sin header → 401
- **No** agregar JWT, sesiones ni middleware de auth

## Convenciones de código

- Handlers en `src/app/api/<recurso>/route.ts`
- Lógica de negocio en `src/lib/<dominio>.ts`
- Patrón de referencia: `src/app/api/patients/route.ts`
- Tests en `tests/` (actualizar o agregar al implementar)

## Qué no tocar

- `src/lib/auth.ts` ni el contrato de `X-User-Id`
- README, refactors fuera de alcance
- Pagos, reprogramación

## Alcance de esta demo

- Cancelación de una reserva propia según `SPEC.md`
