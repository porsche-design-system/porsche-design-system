# Post Shared Change

Run mandatory follow-up steps after modifying `packages/shared/`. Changes here cascade across the entire monorepo.

**What changed** (optional): $ARGUMENTS (e.g., `generators`, `testing helpers`, `utils`, or leave blank)

## Context

The shared package provides:
- Generated lookup files (tag names, chunk names, partial names)
- Testing helpers (used by all Playwright test suites)
- Framework conversion utilities (used by code example generation)
- Shared data sets and models
- Style helpers

Changes here affect: components, all wrappers, styles, storefront, component-meta, and test infrastructure.

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

Based on what changed, determine which packages need rebuilding:

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

At minimum:

```bash
npm run test:unit:components
```

If testing helpers changed, run the affected test suites to verify:

```bash
npm run test:e2e:components-js
npm run test:a11y:components-js
```

### 7. Report

Summarize:
- What changed in shared
- Which downstream packages were rebuilt
- Test results
- Any manual verification needed
