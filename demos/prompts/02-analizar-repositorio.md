# Demo 2 — Agente analizando un repositorio

**Cuándo:** Opcional, si preguntan “¿cómo sabe qué archivos tocar?”. **Duración:** 3 min.  
**Proyecto:** `demos/clinica-turnos`

---

## Prompt (sesión nueva)

```
Analizá la estructura de este repositorio sin escribir código.

Entregable:
1. Stack y scripts (package.json)
2. Convenciones del proyecto (AGENTS.md)
3. Qué existe hoy para turnos/reservas (rutas, lib, tests)
4. Lista de archivos que habría que crear o modificar para implementar POST /api/appointments según SPEC.md
5. Riesgos o ambigüedades que detectás en la spec

No generes código. No modifiques archivos.
```

---

## Qué observar

- ¿Lee `package.json`, `tests/`, `SPEC.md`?
- ¿Inventa `controllers/` o Prisma?
- ¿Menciona no tocar `src/lib/auth.ts`?

---

## Cierre

> Un agente que mapea primero comete menos errores que uno que implementa de entrada.
