# AGENTS.md — Utilities Package

> This file provides context for AI coding assistants working in `packages/utilities/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package currently focuses on the PDS AG Grid integration. Most real source work happens in `projects/ag-grid/`, while the package root mainly delegates build and test commands.

## Structure

```text
packages/utilities/
├── projects/ag-grid/          # AG Grid theme package and source of truth
│   ├── src/core/              # Theme definition
│   ├── src/parts/             # Custom themed AG Grid parts
│   ├── src/styles.ts          # Token-backed style exports
│   ├── scripts/               # Build-time generators
│   └── tests/                 # Unit tests
└── package.json               # Root command delegation
```

## Commands

```bash
# Build utilities package
yarn build:utilities

# Run unit tests
yarn test:unit:utilities
```

## Working Guidelines

- Prefer changes in `projects/ag-grid/src/`; avoid editing generated `dist/` output.
- Keep the AG Grid theme aligned with PDS tokens and styling primitives instead of hardcoding one-off values where shared tokens already exist.
- Preserve support for light, dark, and inherited `color-scheme` behavior when adjusting theme values.
- If changing build-time generation, update the corresponding tests and rebuild before finishing.

## Testing Expectations

- Use the package root scripts for normal validation.
- If you work directly inside `projects/ag-grid/`, keep its unit tests passing as well.
- Be careful with AG Grid theme changes because they can affect both appearance and interaction affordances like focus visibility.
