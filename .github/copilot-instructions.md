# Porsche Design System - General Copilot Instructions

> **Note**: The canonical source for AI assistant instructions is [`AGENTS.md`](../AGENTS.md) at the repository root.
> This file is maintained for GitHub Copilot compatibility. Both files should be kept in sync.

## Overview

The Porsche Design System (PDS) is a **monorepo** providing design tokens, web components, and framework wrappers for
building Porsche web applications. Components are built with **Stencil** and wrapped for Angular, React, and Vue.

## Tech Stack

| Layer                  | Technology                                 |
| ---------------------- | ------------------------------------------ |
| **Package Manager**    | npm 11+ (workspaces)                       |
| **Node**               | v24 (use Volta)                            |
| **Web Components**     | Stencil 4.x                                |
| **Styling**            | stylis (CSS-in-JS), Tailwind CSS           |
| **Frameworks**         | Angular 22, React 19, Vue 3, Next.js 16    |
| **Build**              | Rollup, Vite, Webpack                      |
| **Testing**            | Vitest (unit), Playwright (e2e/vrt/a11y)   |
| **Linting/Formatting** | Biome (JS/TS/JSON), Prettier (MD/MDX only) |
| **Types**              | TypeScript 6.x                             |

## Project Structure

```
packages/
├── components/        # Core Stencil web components (source of truth)
├── components-js/     # JS wrapper, partials, CDN build
├── components-angular/# Angular wrapper
├── components-react/  # React wrapper + Next.js/React Router integrations
├── components-vue/    # Vue wrapper
├── storefront/        # Next.js documentation site
├── tokens/            # Design tokens (colors, spacing, typography)
├── styles/            # Shared styles, Tailwind plugin
├── assets/            # Icons, fonts, marque, crest
├── shared/            # Internal utilities shared across packages
├── component-meta/    # Component metadata generation
└── utilities/         # AG Grid theme, utility functions
```

## Essential Commands

```bash
# Install dependencies (run from repo root)
npm install

# Build everything (required before running tests)
npm run build

# Build only core dependencies (faster for component work)
npm run build:core-dependencies

# Start component dev server
npm run start:components

# Start storefront dev server
npm run start:storefront

# Run unit tests for a package
npm run test:unit:components
npm run test:unit:storefront

# Run e2e tests (requires build first)
npm run test:e2e:components-js

# Run visual regression tests (use Docker for consistency)
./docker.sh npm run test:vrt:components-js

# Lint and format
npm run lint
npm run format
```

## Build Order (Critical)

The monorepo has **strict build dependencies**. Always build in this order:

1. `shared` → `tokens` → `assets` → `styles` → `utilities` → `component-meta`
2. `components` (Stencil core)
3. `components-js`
4. `components-angular`, `components-react`, `components-vue` (can be parallel)
5. `storefront`

Use `npm run build` to handle this automatically, or `npm run build:core-dependencies` + individual package builds.

## Component Development

### File Structure (per component)

```
packages/components/src/components/{name}/
├── {name}.tsx           # Stencil component
├── {name}-styles.ts     # JSS styles
├── {name}-utils.ts      # Utility functions
├── {name}.spec.ts       # Unit tests
├── {name}-styles.spec.ts
├── {name}-utils.spec.ts
└── {name}.props.md      # Props documentation (auto-generated)
```

### Component Conventions

- **Tag prefix**: All components use `p-` prefix (e.g., `p-button`, `p-modal`)
- **Props**: Use feature-based naming, not action-based (e.g., `compact` not `enableCompact`)
- **Boolean props**: Default to `false`, use positive naming (e.g., `disabled` not `notEnabled`)
- **Styles**: Import from `../../styles/common-styles.ts` for focus, transitions, etc.
- **Accessibility**: Use helpers from `packages/components/src/utils/a11y/a11y.ts`

## Testing

| Test Type | Command                                      | Notes                          |
| --------- | -------------------------------------------- | ------------------------------ |
| Unit      | `npm run test:unit:{package}`                | Vitest, runs fast              |
| E2E       | `npm run test:e2e:components-js`             | Playwright, requires build     |
| VRT       | `./docker.sh npm run test:vrt:components-js` | Use Docker for consistency     |
| A11Y      | `npm run test:a11y:components-js`            | Axe-core + a11y tree snapshots |

**Important**: VRT tests should run in Docker (`./docker.sh`) to ensure consistent screenshots across machines.

## Linting Rules

- **Biome** handles JS/TS/JSON formatting and linting
- **Prettier** handles MD/MDX only (run via editor or `prettier --write`)
- No `console.log` allowed (use `console.warn` or `console.error`)
- Imports are auto-sorted by Biome

## Known Constraints

1. **ESM-only packages**: `globby` and `change-case` are ESM-only; use existing workarounds in the codebase
2. **Angular updates**: Versions are bumped by syncpack like any other dependency; only Angular's framework migrations
   are applied via `npm run ng:update -- … --migrate-only` (wrapper in `packages/components-angular`) — never `ng update`
   directly, which fails on the hoisted `node_modules` / unpublished private workspace deps. Check TypeScript compatibility.

## Common Pitfalls

- **Don't** skip `npm run build` before running tests
- **Don't** modify `package-lock.json` manually; run `npm install` to regenerate
- **Don't** remove focus outlines without providing accessible alternatives
- **Do** use Docker for VRT to match CI environment
- **Do** check `docs/dependencies.md` before upgrading packages
- **Do** follow `docs/runbooks/dependency-updates-agent.md` for the recurring automated npm dependency update task

## Accessibility (Critical)

Accessibility instructions are in `instructions/accessibility.instructions.md`. Follow these guidelines strictly to
ensure compliance with WCAG 2.2 AA standards.

## Quick Reference

| Task           | Command                                         |
| -------------- | ----------------------------------------------- |
| Fresh install  | `npm install && npm run build`                  |
| Dev components | `npm run start:components`                      |
| Dev storefront | `npm run start:storefront`                      |
| Test component | `npm run test:unit:components`                  |
| Clean rebuild  | `npm run clean && npm install && npm run build` |
| Run in Docker  | `./docker.sh {command}`                         |
