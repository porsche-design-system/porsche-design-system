# Post Component Change

Run mandatory follow-up steps after modifying a component's API (props, events, slots, or markup).

**Component name**: $ARGUMENTS (kebab-case, e.g., `button` or `input-text`)

## Context

When a component's public API changes (props added/removed/renamed, events changed, slots modified), the wrappers (React, Angular, Vue), component-meta, and potentially storefront docs must be updated. Skipping these steps will cause build failures or stale wrappers.

## Steps

### 1. Determine what changed

- Read the git diff for `packages/components/src/components/$ARGUMENTS/`
- Classify the change:
  - **API change** (props, events, slots) — requires full wrapper rebuild
  - **Markup change** (template/JSX) — may require e2e/VRT updates
  - **Logic-only change** — may only need unit tests
  - **Style change** — needs VRT update

### 2. Rebuild the component chain

Run these in order (each step depends on the previous):

```bash
npm run build:components
```

Wait for completion, then:

```bash
npm run build:components-js
```

### 3. Regenerate wrappers (if API changed)

If props, events, or slots changed, regenerate all framework wrappers:

```bash
npm run build:components-react
npm run build:components-angular
npm run build:components-vue
```

These can run in parallel.

### 4. Regenerate metadata (if API changed)

```bash
npm run build:component-meta
```

### 5. Run verification tests

```bash
npm run test:unit:components -- $ARGUMENTS
```

If the change affects other components (e.g., shared utils were modified):

```bash
npm run test:unit:components
```

### 6. Report

Summarize what was rebuilt and tested. Flag if:
- VRT snapshots likely need updating (visual changes)
- Storefront documentation needs updating (API changes)
- E2E tests may need updating (behavior changes)
- A11y tests may need updating (ARIA or markup changes)

Suggest specific next steps based on the change type.
