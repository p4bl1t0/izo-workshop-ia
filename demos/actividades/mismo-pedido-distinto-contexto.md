# Actividad sin PC — Mismo pedido, distinto contexto

**Cuándo:** Bloque 4 — Context Engineering (antes o en lugar de Demo 1 si no hay red).  
**Duración:** 10–12 min (6 trabajo + 4 plenario).  
**Grupos:** 4 (uno por carta). Duplas si el aula es chica.  
**Material:** imprimir este archivo; cortar por las líneas `✂`. Una carta por grupo. No se muestran entre sí hasta el plenario.

---

## Consigna (leer en voz alta · 30 s)

> Son el **modelo**. Solo pueden usar lo que está en su hoja.  
> En **6 minutos** completen la plantilla de respuesta.  
> **No inventen** contexto que no esté escrito.

Después: plenario A → B → C → D. Criterios: ¿inventó stack? ¿auth? ¿reglas de negocio? ¿tests? ¿el ruido diluyó lo importante?

**Cierre:** *Mismo pedido. Distinto contexto. Distinta calidad.*

---

## Plantilla de respuesta (una por grupo · reverso o hoja aparte)

```
Grupo: ____   Carta: ____________

1) Stack / tecnologías que voy a usar:
   ·
   ·
   ·

2) Archivos o carpetas que voy a crear / tocar:
   ·
   ·
   ·

3) Reglas de negocio que voy a implementar:
   ·
   ·
   ·

4) Qué asumo o qué preguntaría al humano:
   ·
   ·
```

---

## Rúbrica rápida del docente (plenario)

| | A Vacío | B Parcial | C Ruido | D Curado |
|---|---------|-----------|---------|----------|
| Inventa stack (Express/JWT/Prisma…) | sí | poco | a veces | no |
| Respeta auth / “qué no tocar” | no | no | dudoso | sí |
| Reglas (cupo 3, slot único, pasado) | no | inventa | diluidas | sí |
| Menciona tests | no | raro | raro | sí |
| Se pierde en ruido | — | — | sí | no |

---

✂ — — — — — — — — — — — — — — — — — — — — — — — — —

# CARTA A — Vacío

**Grupo A** · No miren las otras cartas.

---

## Pedido (igual para todos)

> Creá un endpoint para reservar turnos.

---

## Contexto disponible

*(Ninguno. Solo el pedido de arriba.)*

---

## Tu tarea

Completá la plantilla de respuesta **solo** con lo que podés inferir del pedido.

---

### Notas del docente (no imprimir / tachar antes de fotocopiar)

Esperado: Express o Nest, JWT, `controllers/`, Prisma o Mongo, sin cupos, sin tests, sin `X-User-Id`.

✂ — — — — — — — — — — — — — — — — — — — — — — — — —

# CARTA B — Parcial

**Grupo B** · No miren las otras cartas.

---

## Pedido (igual para todos)

> Creá un endpoint para reservar turnos.

---

## Contexto disponible

**Stack del proyecto**

- Next.js App Router
- TypeScript

*(No hay SPEC. No hay reglas de auth. No hay “qué no tocar”. No hay tests mencionados.)*

---

## Tu tarea

Completá la plantilla de respuesta **solo** con el pedido + este contexto.

---

### Notas del docente (no imprimir / tachar antes de fotocopiar)

Esperado: ruta App Router plausible (`app/api/...`), pero inventan JWT/sesión, base de datos, reglas de cupo o nombres genéricos. Casi nunca tests ni “no tocar auth”.

✂ — — — — — — — — — — — — — — — — — — — — — — — — —

# CARTA C — Ruido

**Grupo C** · No miren las otras cartas.

---

## Pedido (igual para todos)

> Creá un endpoint para reservar turnos.

---

## Contexto disponible

### package-lock.json (extracto)

```
"node_modules/lodash": { "version": "4.17.21" }
"node_modules/left-pad": { "version": "1.3.0" }
"node_modules/moment": { "version": "2.29.4" }
… (847 líneas más omitidas)
```

### Módulo de pagos (src/lib/payments.ts)

Cobros con Mercado Pago. Webhooks en `/api/webhooks/mp`.  
No confundir `PaymentIntent` con `Appointment`.

### Branding

Logo en `public/logo-clinica.svg`. Colores: `#0B3D91` / `#F5F7FA`.  
README de marketing: “La clínica del futuro”.

### PR #128 (merged hace 8 meses)

“Migración incompleta de Express a Next — dejar controllers/ por compatibilidad temporal.”

### PR #201 (abierto)

“Spike: ¿JWT o cookies? Discutir en el próximo refinement.”

### Notas de una reunión vieja

“Quizás Prisma en Q3. O Drizzle. O nada.”

### SPEC.md (al final del dump)

- Auth: header `X-User-Id` (no JWT).
- Máximo **3** reservas activas por usuario.
- Un slot = una reserva activa.
- No reservar slots en el pasado.
- Stack real: Next.js App Router, Zod, Vitest, store in-memory (`src/lib/store.ts`).
- No modificar `src/lib/auth.ts`.
- Patrón: `src/app/api/patients/route.ts`.

---

## Tu tarea

Completá la plantilla. Tenés **6 minutos**. Usá lo que creas relevante.

---

### Notas del docente (no imprimir / tachar antes de fotocopiar)

Esperado: diluyen el SPEC (abajo/chico), mezclan pagos o JWT del PR, o inventan Prisma por la “nota de reunión”. El punto: más tokens ≠ mejor contexto.

✂ — — — — — — — — — — — — — — — — — — — — — — — — —

# CARTA D — Curado

**Grupo D** · No miren las otras cartas.

---

## Pedido (igual para todos)

> Creá un endpoint para reservar turnos.

---

## Contexto disponible

Sos un agente de implementación en este repositorio.

**Stack y convenciones**

- Next.js App Router, TypeScript estricto
- Validación con Zod en handlers
- Tests con Vitest (`npm test`)
- Auth: header `X-User-Id` (`src/lib/auth.ts`). **No** agregues JWT ni middleware nuevo.
- Persistencia in-memory en `src/lib/store.ts` (**no** Prisma ni base de datos)

**Tarea**

Implementá `POST /api/appointments` para crear una reserva según estas reglas MVP:

- usuario identificado
- máximo **3** reservas activas por usuario
- un slot = una reserva activa
- no reservar en el pasado

**Restricciones**

- Reutilizá el patrón de `src/app/api/patients/route.ts`
- Agregá o actualizá tests en `tests/`
- **No** modifiques `src/lib/auth.ts` ni el contrato de `X-User-Id`
- **No** escribas README ni refactors fuera de alcance

Antes de “codear”: listá en la plantilla qué archivos vas a tocar.

---

## Tu tarea

Completá la plantilla de respuesta **solo** con este contexto.

---

### Notas del docente (no imprimir / tachar antes de fotocopiar)

Esperado: `src/app/api/appointments/route.ts`, `src/lib/appointments.ts`, tests; Zod + `X-User-Id`; cupo 3 / slot / pasado; no JWT ni Prisma.
