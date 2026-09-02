# Clínica Turnos — proyecto base para demos

API mínima de reservas para el workshop **Fundamentos de IA para Desarrolladores**.

## Uso en clase

```bash
npm install
npm test    # 3 tests en verde (estado inicial)
npm run dev # opcional, puerto 3000
```

Abrí **esta carpeta** en Cursor (no la raíz del sitio del workshop).

## Estado inicial (demos 1–4)

- `GET /api/patients` — listado de pacientes
- `GET /api/appointments/slots` — slots disponibles
- `POST /api/appointments` — **no implementado** (501) → material para demos 1 y 4
- Auth simulada: header `X-User-Id`

## Demo 5 (tests en rojo)

```bash
npm run preparar:demo-5
npm test   # falla test de cupo (3 reservas)
npm run reset:demo-5
```

## Archivos de contexto para el agente

- `AGENTS.md` — convenciones del repo
- `SPEC.md` — reglas de negocio MVP
- `docs/arquitectura.md` — mapa rápido (demo 8 filesystem)

## Ejemplo curl

```bash
curl -s http://localhost:3000/api/appointments/slots | jq
curl -s -H "X-User-Id: user-1" http://localhost:3000/api/patients | jq
```
