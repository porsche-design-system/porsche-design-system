---
name: post-token-change
description: Use when the user has changed design tokens, modified packages/tokens/, or asks what needs rebuilding after a token value or name change.
allowed-tools: shell
---

# Post Token Change

Run mandatory follow-up steps after modifying design tokens in `packages/tokens/`.

**What changed** (optional): read from user's message (e.g., `color`, `spacing`). Run full chain if not specified.

## Context

Token changes cascade through the entire monorepo:
```
tokens → styles (5 packages) → components → components-js → wrappers → storefront
tokens → utilities (ag-grid theme)
```

## Steps

### 1. Identify what changed

Check `git diff packages/tokens/`. Determine which categories changed (color, font, spacing, motion, border, blur, gradient, breakpoint, shadow) and whether it's a naming change, value change, or new token.

### 2. Run token tests and rebuild

```bash
npm run test:unit:tokens
npm run build:tokens
```

### 3. Rebuild styles

```bash
npm run build:styles
npm run test:unit:styles
```

### 4. Rebuild utilities

```bash
npm run build:utilities
npm run test:unit:utilities
```

### 5. Rebuild components

```bash
npm run build:components
npm run build:components-js
npm run test:unit:components
```

### 6. Flag VRT impact

Token value changes (especially color, spacing, border, shadow) will almost certainly cause VRT snapshot differences:
- `./docker.sh npm run test:vrt:components-js`
- `./docker.sh npm run test:vrt:styles`
- Review ALL snapshot changes carefully — one token affects many components

### 7. Report

Summarize which tokens changed, which packages were rebuilt, test results, and whether VRT updates are needed.

## In this repository (Porsche Design System)

- Build order is critical: tokens → styles → utilities → components → components-js
- VRT must run in Docker: `./docker.sh npm run test:vrt:components-js`
- See `packages/tokens/AGENTS.md` for token naming conventions
