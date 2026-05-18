---
name: post-shared-change
description: Use when the user has modified packages/shared/, changed shared generators, testing helpers, or utilities, or asks what downstream packages need rebuilding after a shared change.
allowed-tools: shell
---

# Post Shared Change

Run mandatory follow-up steps after modifying `packages/shared/`.

**What changed** (optional): read from user's message (e.g., `generators`, `testing helpers`). Run full analysis if not specified.

## Context

The shared package provides generated lookups, testing helpers, framework conversion utilities, and shared data. Changes cascade to: components, all wrappers, styles, storefront, component-meta, and test infrastructure.

## Steps

### 1. Identify what changed

Check `git diff packages/shared/`. Classify: generator scripts, testing helpers, utils/models, data, or styles.

### 2. Run shared tests and rebuild

```bash
npm run test:unit:shared
npm run build:shared
```

### 3. Rebuild affected downstream packages

| Changed Area | What to rebuild |
|---|---|
| Tag/chunk names | components, components-js, all wrappers |
| Code example generators | storefront |
| Models / types | All packages importing from shared |
| Style helpers | components |

For generator changes (most common):
```bash
npm run build:component-meta
npm run build:components
npm run build:components-js
npm run build:components-react && npm run build:components-angular && npm run build:components-vue
```

For code example generator changes:
```bash
npm run build:storefront
```

### 4. Run downstream tests

```bash
npm run test:unit:components
```

If testing helpers changed:
```bash
npm run test:e2e:components-js
npm run test:a11y:components-js
```

### 5. Report

Summarize what changed in shared, which packages were rebuilt, test results, and any manual verification needed.

## In this repository (Porsche Design System)

- `src/lib/` is generated — do not hand-edit, rebuild instead
- Key import paths: `@porsche-design-system/shared/testing`, `@porsche-design-system/shared/examples` (resolve via `dist/` subdirectories)
- See `packages/shared/AGENTS.md` for generator and export path documentation
