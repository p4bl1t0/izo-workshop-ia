# SPEC.md — Cancelar un turno (MVP demo)

> Las 8 partes del requerimiento. El agente ejecuta bajo esto; no inventa producto.

## 1. Objetivo / problema

Permitir que un paciente autenticado cancele una reserva propia a tiempo, liberando el slot para otros.

## 2. Actores

- **Paciente autenticado** — identificado por header `X-User-Id`; solo opera sobre sus reservas.
- **Anónimo** — sin header; no puede cancelar.
- Fuera de este MVP: admin, recepción, “VIP” con reglas distintas.

## 3. Alcance (entra)

- Endpoint para cancelar una reserva existente (método/ruta a definir en la implementación; p. ej. `DELETE` o `POST .../cancel`).
- Validar dueño, ventana de tiempo y liberación del slot.
- Tests en `tests/` que cubran los CA de abajo.

## 4. Fuera de alcance

- Pagos, reembolsos, notificaciones.
- Reprogramación.
- JWT / sesiones / middleware de auth nuevo.
- Prisma u otra base de datos.
- README, UI, panel admin, cancelación “flexible” VIP.

## 5. Reglas verificables

1. Solo el dueño de la reserva (`X-User-Id` = `userId` de la reserva) puede cancelar.
2. Cancelar solo si faltan **≥ 24 h** para el inicio del slot (`startsAt`).
3. Cancelar a tiempo **libera** el slot (vuelve a disponible).
4. Sin header `X-User-Id` → **401**.
5. Reserva ajena → **403 o 404** (elegir uno y usarlo siempre igual; documentar en este SPEC).
6. Reserva inexistente → 404.
7. Intento de cancelar con menos de 24 h → 4xx (mensaje claro).

### Decisión HTTP (completar al implementar)

- Reserva ajena: **403** | **404** → _____

## 6. Casos límite

- Cancelar la propia con ≥ 24 h → OK; el slot queda libre para otro `POST /api/appointments`.
- Cancelar la propia con < 24 h → rechazo; el slot sigue ocupado.
- Cancelar reserva de otro usuario → 403 o 404 (según decisión); sin liberar slot.
- Sin `X-User-Id` → 401.
- `appointmentId` inexistente → 404.
- Doble cancelación de la misma reserva → 404 (o 409; documentar).

## 7. Criterios de aceptación

- **CA1:** dueño cancela con ≥ 24 h → 2xx; la reserva deja de estar activa; el slot se puede volver a reservar.
- **CA2:** dueño intenta cancelar con < 24 h → 4xx; reserva y slot sin cambio.
- **CA3:** otro `X-User-Id` sobre la misma reserva → 403 o 404 (consistente con la decisión).
- **CA4:** request sin header → 401.
- **CA5:** id inexistente → 404.

## 8. Restricciones

- Stack: Next.js App Router, TypeScript estricto, Zod en handlers, Vitest (`npm test`).
- Auth: solo `X-User-Id` vía `src/lib/auth.ts` — **no** modificar ese archivo.
- Persistencia: `src/lib/store.ts` in-memory.
- Reutilizar el patrón de `src/app/api/patients/route.ts`.
- Ya existe `POST /api/appointments`; no reimplementar crear reservas.
- No escribir README ni refactors fuera de alcance.
- No implementar pagos ni reprogramación.
