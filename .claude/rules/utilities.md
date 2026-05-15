---
globs: packages/utilities/**
---

# Utilities Package (`packages/utilities/`)

Currently focused on the PDS AG Grid integration. Most source work happens in `projects/ag-grid/`.

## Structure

```
packages/utilities/
├── projects/
│   └── ag-grid/                   # AG Grid theme package
│       ├── src/
│       │   ├── core/              # Theme definition
│       │   ├── parts/             # Custom themed AG Grid parts
│       │   └── styles.ts          # Token-backed style exports
│       ├── scripts/               # Build-time generators
│       └── tests/                 # Unit tests
└── package.json                   # Root command delegation
```

## AG Grid Theme

The AG Grid integration provides a PDS-themed AG Grid experience:
- Theme definition in `src/core/` aligns with PDS design tokens
- Custom parts in `src/parts/` theme specific AG Grid UI elements
- Style exports in `src/styles.ts` are backed by PDS tokens — import from `@porsche-design-system/tokens`, don't hardcode values
- Supports light, dark, and inherited `color-scheme` behavior

## Working Guidelines

- Make changes in `projects/ag-grid/src/` — don't edit `dist/`
- Keep the theme aligned with PDS tokens and styling primitives
- Preserve light/dark/inherited color-scheme support when adjusting theme values
- If changing build-time generation, update corresponding tests and rebuild
- AG Grid theme changes can affect both appearance and interaction affordances (e.g., focus visibility)

## Build

Uses TSUp for TypeScript bundling.

## Testing

```bash
npm run build:utilities         # Build
npm run test:unit:utilities     # Unit tests
```

Keep tests passing in both the package root and `projects/ag-grid/`.
