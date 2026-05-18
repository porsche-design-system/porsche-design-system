---
name: post-component-change
description: Use when the user has finished modifying a component and needs to rebuild wrappers, regenerate metadata, or run follow-up tests. Activate after any component API, markup, or style change.
allowed-tools: shell
---

# Post Component Change

Run mandatory follow-up steps after modifying a component's API or markup.

**Component name**: read from the user's message (kebab-case, e.g., `button`). Ask the user if not provided.

## Context

When a component's public API changes (props, events, or slots), the wrappers (React, Angular, Vue), component-meta, and potentially storefront docs must be updated. Skipping these steps causes build failures or stale wrappers.

## Steps

### 1. Determine what changed

- Read the git diff for `packages/components/src/components/{name}/`
- Classify: API change (full rebuild), markup change (e2e/VRT may need updating), logic-only (unit tests), style change (VRT)

### 2. Rebuild the component chain

```bash
npm run build:components
npm run build:components-js
```

### 3. Regenerate metadata (if API changed)

```bash
npm run build:component-meta
```

### 4. Regenerate wrappers (if API changed)

```bash
npm run build:components-react
npm run build:components-angular
npm run build:components-vue
```


### 5. Run verification tests

```bash
npm run test:unit:components -- {name}
```

### 6. Report

Summarize what was rebuilt and tested. Flag if VRT snapshots, storefront docs, E2E, or A11y tests need updating.

## In this repository (Porsche Design System)

- Build order: `components` → `components-js` → `component-meta` → wrappers (parallel)
- VRT updates if needed: `./docker.sh npm run test:vrt:components-js -- --grep {name}`
- Lint/format: `npm run lint` and `npm run format`
