---
name: post-component-change
description: Run mandatory follow-up rebuild and test steps after modifying a component's API (props, events, slots, or markup). Use immediately after finishing a component change.
---

# Post Component Change

Run mandatory follow-up steps after modifying a component's API or markup.

**Component name**: read from the user's message (kebab-case, e.g., `button`). Ask the user if not provided.

## Context

When a component's public API changes (props added/removed/renamed, events changed, slots modified), the wrappers (React, Angular, Vue), component-meta, and potentially storefront docs must be updated. Skipping these steps causes build failures or stale wrappers.

## Steps

### 1. Determine what changed

- Read the git diff for `packages/components/src/components/{name}/`
- Classify the change:
  - **API change** (props, events, slots) — requires full wrapper rebuild
  - **Markup change** (template/JSX) — may require e2e/VRT updates
  - **Logic-only change** — may only need unit tests
  - **Style change** — needs VRT update

### 2. Rebuild the component chain

```bash
npm run build:components
```

Wait for completion, then:

```bash
npm run build:components-js
```

### 3. Regenerate metadata (if API changed)

```bash
npm run build:component-meta
```

### 4. Regenerate wrappers (if API changed)

If props, events, or slots changed:

```bash
npm run build:components-react
npm run build:components-angular
npm run build:components-vue
```

These can run in parallel.


### 5. Run verification tests

```bash
npm run test:unit:components -- {name}
```

If shared utils were modified:

```bash
npm run test:unit:components
```

### 6. Report

Summarize what was rebuilt and tested. Flag if:
- VRT snapshots likely need updating (visual changes)
- Storefront documentation needs updating (API changes)
- E2E tests may need updating (behavior changes)
- A11y tests may need updating (ARIA or markup changes)

## In this repository (Porsche Design System)

- Build order: `components` → `components-js` → `component-meta` → wrappers (parallel)
- VRT updates (if needed): `./docker.sh npm run test:vrt:components-js -- --grep {name}`
- Lint/format before finishing: `npm run lint` and `npm run format`
