# AGENTS.md

> This file provides context for AI coding assistants working in this repository.
> See [agents.md](https://agents.md/) for the specification.

## Overview

The **Porsche Design System (PDS)** is a monorepo providing design tokens, web components, and framework wrappers for building Porsche web applications. Components are built with **Stencil** and wrapped for Angular, React, and Vue.

## Tech Stack

| Layer              | Technology                                 |
| ------------------ | ------------------------------------------ |
| Package Manager    | Yarn 1.22 (workspaces)                     |
| Node               | v22 (use Volta)                            |
| Web Components     | Stencil 4.x                                |
| Styling            | JSS (CSS-in-JS), Tailwind CSS              |
| Frameworks         | Angular 20, React 19, Vue 3, Next.js 15    |
| Build              | Rollup, Vite, Webpack                      |
| Testing            | Vitest (unit), Playwright (e2e/vrt/a11y)   |
| Linting/Formatting | Biome (JS/TS/JSON), Prettier (MD/MDX only) |
| Types              | TypeScript 5.9                             |

## Project Structure

```
packages/
├── components/         # Core Stencil web components (source of truth)
├── components-js/      # JS wrapper, partials, CDN build
├── components-angular/ # Angular wrapper
├── components-react/   # React wrapper + Next.js/Remix integrations
├── components-vue/     # Vue wrapper
├── storefront/         # Next.js documentation site
├── tokens/             # Design tokens (colors, spacing, typography)
├── styles/             # Shared styles, Tailwind plugin
├── assets/             # Icons, fonts, marque, crest
├── shared/             # Internal utilities shared across packages
├── component-meta/     # Component metadata generation
└── utilities/          # AG Grid theme, utility functions
```

## Build Order (Critical)

The monorepo has **strict build dependencies**. Always build in this order:

1. `shared` → `tokens` → `assets` → `styles` → `utilities` → `component-meta`
2. `components` (Stencil core)
3. `components-js`
4. `components-angular`, `components-react`, `components-vue` (can be parallel)
5. `storefront`

Use `yarn build` to handle this automatically.

## Essential Commands

```bash
# Install dependencies (run from repo root)
yarn install

# Build everything (required before running tests)
yarn build

# Build only core dependencies (faster for component work)
yarn build:core-dependencies

# Start dev servers
yarn start:components      # Component dev server
yarn start:storefront      # Documentation site

# Run tests
yarn test:unit:components          # Unit tests (Vitest)
yarn test:e2e:components-js        # E2E tests (Playwright, requires build)
./docker.sh yarn test:vrt:components-js   # VRT tests (use Docker!)
yarn test:a11y:components-js       # Accessibility tests

# Lint and format
yarn lint
yarn format
```

## Testing

| Test Type | Command                                     | Notes                                      |
| --------- | ------------------------------------------- | ------------------------------------------ |
| Unit      | `yarn test:unit:{package}`                  | Vitest, runs fast                          |
| E2E       | `yarn test:e2e:components-js`               | Playwright, requires build first           |
| VRT       | `./docker.sh yarn test:vrt:components-js`   | **Must use Docker** for consistent screenshots |
| A11Y      | `yarn test:a11y:components-js`              | Axe-core + a11y tree snapshots             |

Key test files:

- Axe-core: [`packages/components-js/tests/a11y/specs/axe-core/`](packages/components-js/tests/a11y/specs/axe-core/)
- A11y tree: [`packages/components-js/tests/a11y/specs/a11ytree/`](packages/components-js/tests/a11y/specs/a11ytree/)
- VRT: [`packages/components-js/tests/vrt/specs/`](packages/components-js/tests/vrt/specs/)

## Coding Conventions

### Component Naming

- **Tag prefix**: All components use `p-` prefix (e.g., `p-button`, `p-modal`)

### Prop Naming

- Use **feature-based naming**, not action-based (e.g., `compact` not `enableCompact`)
- Avoid action/state verbs like `show`, `hide`, `enable`, `disable`

### Boolean Props

- Default to `false`
- Use positive naming (e.g., `disabled` not `notEnabled`)
- Should enable a feature, not disable it

See [`docs/coding-standards-and-guidelines.md`](docs/coding-standards-and-guidelines.md) for details.

## Accessibility (WCAG 2.2 AA — Non-negotiable)

All UI code must:

1. **Meet WCAG 2.2 AA** compliance
2. **Full keyboard access**: No mouse-only interactions, no keyboard traps
3. **Visible focus**: All interactive elements must have visible focus indicators
4. **High Contrast Mode**: Support `@media (forced-colors: active)`
5. **Prefer PDS components**: Use `p-` prefixed components over custom widgets

### Focus Styling

- Use `getFocusBaseStyles()` from `packages/components/src/styles/common-styles.ts`
- Prefer `:focus-visible` over `:focus`
- **Never** use `outline: none` without an accessible alternative

### High Contrast Mode

- Use `forcedColorsMediaQuery()` from `packages/components/src/styles/media-query/`
- Don't rely on shadows or semi-transparent borders for essential affordances

### ARIA

- Use ARIA only when needed; never add ARIA that conflicts with native semantics
- Use helpers from `packages/components/src/utils/a11y/a11y.ts`

See [`.github/instructions/accessibility.instructions.md`](.github/instructions/accessibility.instructions.md) for full guidelines.

## Linting Rules

- **Biome** handles JS/TS/JSON formatting and linting
- **Prettier** handles MD/MDX only
- No `console.log` allowed (use `console.warn` or `console.error`)
- Imports are auto-sorted by Biome

## Common Pitfalls

| ❌ Don't                                            | ✅ Do                                              |
| --------------------------------------------------- | -------------------------------------------------- |
| Run `npm install`                                   | Always use `yarn`                                  |
| Skip `yarn build` before tests                      | Build first, then test                             |
| Modify `yarn.lock` manually                         | Run `yarn` to regenerate                           |
| Remove focus outlines                               | Provide accessible alternatives                    |
| Run VRT tests locally without Docker                | Use `./docker.sh` for VRT                          |
| Upgrade packages without checking `dependencies.md` | Check [`docs/dependencies.md`](docs/dependencies.md) first |

## Known Constraints

1. **ESM-only packages**: `globby` and `change-case` are ESM-only; use existing workarounds
2. **Jest limitations**: Some packages use Vitest due to Jest/ESM incompatibilities
3. **Stencil + npm**: A fake npm script exists at `packages/components/scripts/fakenpm/` to prevent Stencil from corrupting yarn workspaces
4. **Angular updates**: Use `ng update` separately, check TypeScript compatibility

## Package-Specific Instructions

Each major package has its own `AGENTS.md` with detailed guidance:

- [`packages/components/AGENTS.md`](packages/components/AGENTS.md) — Stencil web components
- [`packages/storefront/AGENTS.md`](packages/storefront/AGENTS.md) — Next.js documentation site
- [`packages/components-react/AGENTS.md`](packages/components-react/AGENTS.md) — React wrapper
- [`packages/components-angular/AGENTS.md`](packages/components-angular/AGENTS.md) — Angular wrapper
- [`packages/components-vue/AGENTS.md`](packages/components-vue/AGENTS.md) — Vue wrapper

## Quick Reference

| Task           | Command                                    |
| -------------- | ------------------------------------------ |
| Fresh install  | `yarn install && yarn build`               |
| Dev components | `yarn start:components`                    |
| Dev storefront | `yarn start:storefront`                    |
| Test component | `yarn test:unit:components`                |
| Clean rebuild  | `yarn clean && yarn install && yarn build` |
| Run in Docker  | `./docker.sh {command}`                    |

