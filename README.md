# Arkesia World

Repositorio configurado como monorepo con `pnpm workspace`.

## Estructura

```text
.
|-- apps/
|   `-- frontend/
|-- packages/
|-- package.json
|-- pnpm-lock.yaml
`-- pnpm-workspace.yaml
```

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm --filter @arkesia-world/frontend dev
```

## Anadir nuevos proyectos

Para nuevos proyectos de aplicacion, crea carpetas dentro de `apps/`.
Para librerias compartidas, usa `packages/`.

`pnpm` detectara ambos directorios automaticamente por `pnpm-workspace.yaml`.

## Creeacion del Frontend

```bash
pnmp create vite
```

Se selecciona como framework React y Typscript como variante.
