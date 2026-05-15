# Post Token Change

Run mandatory follow-up steps after modifying design tokens. Token changes cascade through the entire monorepo.

**What changed** (optional): $ARGUMENTS (e.g., `color`, `spacing`, `motion`, or leave blank for all)

## Context

Tokens in `packages/tokens/` are the foundation of the design system. Changes cascade:
```
tokens → styles (5 packages) → components → components-js → wrappers → storefront
tokens → utilities (ag-grid theme)
```

Skipping downstream rebuilds will leave packages using stale token values.

## Steps

### 1. Identify what changed

- Check `git diff packages/tokens/` to understand the scope
- Determine which token categories changed (color, font, spacing, motion, border, blur, gradient, breakpoint, shadow)
- Assess impact: naming change vs. value change vs. new token

### 2. Run token tests

```bash
npm run test:unit:tokens
```

Confirm tokens build and pass their own tests before rebuilding downstream.

### 3. Rebuild tokens

```bash
npm run build:tokens
```

### 4. Rebuild styles (all 5 targets)

Styles consume tokens directly:

```bash
npm run build:styles
```

This rebuilds: global-styles, tailwindcss, scss, emotion, vanilla-extract.

Then run style tests:

```bash
npm run test:unit:styles
```

### 5. Rebuild utilities

The AG Grid theme uses tokens:

```bash
npm run build:utilities
npm run test:unit:utilities
```

### 6. Rebuild components

Components use tokens via CSS variables:

```bash
npm run build:components
npm run build:components-js
```

### 7. Run component tests

```bash
npm run test:unit:components
```

### 8. Flag VRT impact

Token value changes (especially color, spacing, border, shadow) will almost certainly cause VRT snapshot differences. Report:

- VRT snapshots will likely need updating
- Command: `./docker.sh npm run test:vrt:components-js`
- Style VRT: `./docker.sh npm run test:vrt:styles`
- Review ALL snapshot changes carefully — a token change affects many components

### 9. Report

Summarize:
- Which tokens changed
- Which downstream packages were rebuilt
- Which tests passed/failed
- Whether VRT updates are needed
- Whether storefront needs visual verification
