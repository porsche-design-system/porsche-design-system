---
name: post-token-change
description: Run mandatory follow-up rebuild steps after modifying design tokens. Token changes cascade through the entire monorepo. Use after any change in packages/tokens/.
---

# Post Token Change

Run mandatory follow-up steps after modifying design tokens in `packages/tokens/`.

**What changed** (optional): read from user's message (e.g., `color`, `spacing`, `motion`). Proceed with full chain if not specified.

## Context

Tokens are the foundation of the design system. Changes cascade:
```
tokens → styles (5 packages) → components → components-js → wrappers → storefront
tokens → utilities (ag-grid theme)
```

Skipping downstream rebuilds leaves packages using stale token values.

## Steps

### 1. Identify what changed

- Check `git diff packages/tokens/` to understand the scope
- Determine which token categories changed (color, font, spacing, motion, border, blur, gradient, breakpoint, shadow)
- Assess impact: naming change vs. value change vs. new token

### 2. Run token tests

```bash
npm run test:unit:tokens
```

Confirm tokens build and pass before rebuilding downstream.

### 3. Rebuild tokens

```bash
npm run build:tokens
```

### 4. Rebuild styles (all 5 targets)

```bash
npm run build:styles
npm run test:unit:styles
```

Rebuilds: global-styles, tailwindcss, scss, emotion, vanilla-extract.

### 5. Rebuild utilities

```bash
npm run build:utilities
npm run test:unit:utilities
```

### 6. Rebuild components

```bash
npm run build:components
npm run build:components-js
npm run test:unit:components
```

### 7. Flag VRT impact

Token value changes (especially color, spacing, border, shadow) will almost certainly cause VRT snapshot differences. Report:

- VRT snapshots will likely need updating
- Command: `./docker.sh npm run test:vrt:components-js`
- Style VRT: `./docker.sh npm run test:vrt:styles`
- Review ALL snapshot changes carefully — a token change affects many components

### 8. Report

Summarize which tokens changed, which packages were rebuilt, test results, and whether VRT updates are needed.

## In this repository (Porsche Design System)

- Build order is critical: tokens → styles → utilities → components → components-js
- VRT must run in Docker: `./docker.sh npm run test:vrt:components-js`
- See `packages/tokens/AGENTS.md` for token naming conventions
