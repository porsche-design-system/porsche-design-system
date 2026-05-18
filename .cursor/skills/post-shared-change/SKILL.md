---
name: post-shared-change
description: Run mandatory follow-up rebuild steps after modifying packages/shared/. Shared changes cascade across the entire monorepo. Use after any change in the shared package.
---

# Post Shared Change

Run mandatory follow-up steps after modifying `packages/shared/`.

**What changed** (optional): read from user's message (e.g., `generators`, `testing helpers`, `utils`). Proceed with full analysis if not specified.

## Context

The shared package provides generated lookups, testing helpers, framework conversion utilities, and shared data. Changes cascade to: components, all wrappers, styles, storefront, component-meta, and test infrastructure.

## Steps

### 1. Identify what changed

- Check `git diff packages/shared/` to understand the scope
- Classify the change:
  - **Generator scripts** (`scripts/`) — regenerated output will change
  - **Testing helpers** (`src/testing/`) — test infrastructure affected
  - **Utils** (`src/utils/`) — framework conversion, misc helpers
  - **Models/types** (`src/models/`) — type contracts may break downstream
  - **Data** (`src/data/`) — shared data sets
  - **Styles** (`src/styles/`) — shared style helpers

### 2. Run shared tests

```bash
npm run test:unit:shared
```

### 3. Rebuild shared

```bash
npm run build:shared
```

This regenerates `src/lib/` with updated lookups.

### 4. Identify affected downstream packages

| Changed Area | Downstream Impact |
|---|---|
| Tag names / chunk names | components, components-js, all wrappers |
| Code example generators | storefront |
| Testing helpers | All test suites (no rebuild needed, but tests may behave differently) |
| Models / types | All packages importing from shared |
| Style helpers | components |
| Framework conversion utils | storefront (code examples) |

### 5. Rebuild affected packages

For generator changes (most common):

```bash
npm run build:component-meta
npm run build:components
npm run build:components-js
npm run build:components-react
npm run build:components-angular
npm run build:components-vue
```

For code example generator changes:

```bash
npm run build:storefront
```

### 6. Run downstream tests

```bash
npm run test:unit:components
```

If testing helpers changed:

```bash
npm run test:e2e:components-js
npm run test:a11y:components-js
```

### 7. Report

Summarize what changed, which packages were rebuilt, test results, and any manual verification needed.

## In this repository (Porsche Design System)

- `src/lib/` is generated — do not hand-edit, rebuild instead
- Key import paths consumers use: `@porsche-design-system/shared/testing`, `@porsche-design-system/shared/examples`
- See `packages/shared/AGENTS.md` for full generator and export path documentation
