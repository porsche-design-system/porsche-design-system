# AGENTS.md

> This file provides context for AI coding assistants working in this repository.
> See [agents.md](https://agents.md/) for the specification.

## Overview

The **Porsche Design System (PDS)** is a monorepo providing design tokens, web components, and framework wrappers for building Porsche web applications. Components are built with **Stencil** and wrapped for Angular, React, and Vue.

## Tech Stack

| Layer              | Technology                                 |
| ------------------ | ------------------------------------------ |
| Package Manager    | npm 10+ (workspaces)                     |
| Node               | v24 (use Volta)                            |
| Web Components     | Stencil 4.x                                |
| Styling            | JSS (CSS-in-JS), Tailwind CSS              |
| Frameworks         | Angular 21, React 19, Vue 3, Next.js 15    |
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
├── components-react/   # React wrapper + Next.js/React Router integrations
├── components-vue/     # Vue wrapper
├── storefront/         # Next.js documentation site
├── tokens/             # Design tokens (colors, spacing, typography)
├── styles/             # Shared styles, Tailwind plugin
├── assets/             # Icons, fonts, marque, crest
├── shared/             # Internal utilities shared across packages
├── component-meta/     # Component metadata generation
└── utilities/          # AG Grid theme, utility functions
```

## Public API Surface (Read Before Judging a Breaking Change)

Only **four** packages are published to npm:

```
@porsche-design-system/components-{js|angular|react|vue}
```

Every other workspace package is `"private": true`, including all of `packages/styles/projects/*`,
`@porsche-design-system/tokens-meta`, `@porsche-design-system/stylesheets` and `shared` — regardless of having a scoped
name, an `exports` map, `files` and `.d.ts` output. The published packages are assembled by copying **selected build
output** into a wrapper `dist/`; what is not copied does not exist for a consumer.

**The most reliable and easiest way to tell what is published is to read the built wrapper `dist/` folders.** Each one
_is_ the npm package — the tarball root, `package.json` included:

```
packages/components-js/dist/components-wrapper     → @porsche-design-system/components-js
packages/components-angular/dist/angular-wrapper   → @porsche-design-system/components-angular
packages/components-react/dist/react-wrapper       → @porsche-design-system/components-react
packages/components-vue/dist/vue-wrapper           → @porsche-design-system/components-vue
```

```bash
ls packages/components-js/dist/components-wrapper          # top-level folders = published subpaths
grep -rl "<exact-identifier>" packages/components-*/dist/*-wrapper/  # no hit = internal, full stop
```

Grep for the exact identifier, not a loose word: the generated skill markdown contains prose like "deprecations".

Never answer this from a workspace package's own `package.json` — its `exports`, `files` and `types` describe workspace
resolution, not what npm ships. If `dist/` is not built yet, run `npm run build`, or fall back to
`grep -n "cp -r \.\./" packages/components-{js,angular,react,vue}/package.json` and
`npm view @porsche-design-system/components-js@latest exports --json`.

The most common mistake is treating an internal entry point as public:

| Looks public                                                    | Actually                                                            |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `@porsche-design-system/scss` JS exports (`scssMeta`, `kindOf`) | Internal — only `dist/*.scss` ships, under the `sass` condition      |
| `@porsche-design-system/tailwindcss` JS exports                 | Internal — only `dist/index.css` ships                               |
| `@porsche-design-system/{emotion,vanilla-extract}/meta`         | Internal — `meta/` is never copied; only `dist/` (from `src/`) ships |
| `@porsche-design-system/tokens-meta`                            | Internal in full — the public token surface is `./tokens`            |
| `@porsche-design-system/shared/deprecation`                     | Internal in full                                                     |
| All `*Deprecations` lists                                       | Internal metadata — the _declarations_ they describe are public      |

[`docs/public-api.md`](docs/public-api.md) is the single source of truth, with the full subpath-to-source map and the
three checks to run when the answer is not obvious. **Verify against it before reporting a removed or changed export as
breaking, and before writing a changelog entry for one.**

## Build Order (Critical)

The monorepo has **strict build dependencies**. Always build in this order:

1. `shared` → `tokens` → `assets` → `styles` → `utilities` → `component-meta`
2. `components` (Stencil core)
3. `components-js`
4. `components-angular`, `components-react`, `components-vue` (can be parallel)
5. `storefront`

Use `npm run build` to handle this automatically.

## Essential Commands

```bash
# Install dependencies (run from repo root)
npm install

# Build everything (required before running tests)
npm run build

# Build only core dependencies (faster for component work)
npm run build:core-dependencies

# Start dev servers
npm run start:components      # Component dev server
npm run start:storefront      # Documentation site

# Run tests
npm run test:unit:components          # Unit tests (Vitest)
npm run test:e2e:components-js        # E2E tests (Playwright, requires build)
./docker.sh npm run test:vrt:components-js   # VRT tests (use Docker!)
npm run test:a11y:components-js       # Accessibility tests

# Lint and format
npm run lint
npm run format
```

## Testing

| Test Type | Command                                     | Notes                                      |
| --------- | ------------------------------------------- | ------------------------------------------ |
| Unit      | `npm run test:unit:{package}`                  | Vitest, runs fast                          |
| E2E       | `npm run test:e2e:components-js`               | Playwright, requires build first           |
| VRT       | `./docker.sh npm run test:vrt:components-js`   | **Must use Docker** for consistent screenshots |
| A11Y      | `npm run test:a11y:components-js`              | Axe-core + a11y tree snapshots             |

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

## Changelog

Consumer-facing changes are documented in [`packages/components/CHANGELOG.md`](packages/components/CHANGELOG.md) under
`[Unreleased]`. [`docs/changelog.md`](docs/changelog.md) defines what belongs there, which section an entry goes in, and
how entries are worded — it is the single source of truth for both humans and agents.

"Consumer-facing" means reachable through a published subpath — check [`docs/public-api.md`](docs/public-api.md) before
writing or requesting an entry.

- Run the `update-changelog` skill to reconcile the changelog with the current branch
- When reviewing a pull request, apply the `.github/skills/code-review-changelog` skill — including when the pull
  request does not touch the changelog at all, since a missing entry is the most common error

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
| Skip `npm run build` before tests                   | Build first, then test                             |
| Modify `package-lock.json` manually                 | Run `npm install` to regenerate                    |
| Remove focus outlines                               | Provide accessible alternatives                    |
| Run VRT tests locally without Docker                | Use `./docker.sh` for VRT                          |
| Upgrade packages without checking `dependencies.md` | Check [`docs/dependencies.md`](docs/dependencies.md) first |
| Patch a missing native binding in a CI step         | Regenerate the lockfile cleanly, then `npm run npm:verify-lock` |
| Patch a missing native binding in a CI step         | Regenerate the lockfile cleanly and run `npm run npm:verify-lock` |

## Known Constraints

1. **ESM-only packages**: `globby` and `change-case` are ESM-only; use existing workarounds
2. **Angular updates**: Versions are bumped by syncpack like any other dependency; only Angular's framework migrations
   are applied via `npm run ng:update -- … --migrate-only` (wrapper in `packages/components-angular`) — never `ng update`
   directly, which fails on the hoisted `node_modules` / unpublished private workspace deps. Check TypeScript compatibility.

## Task Runbooks

- [`docs/runbooks/dependency-updates-agent.md`](docs/runbooks/dependency-updates-agent.md) — step-by-step runbook for AI
  cloud agents performing the recurring weekly npm dependency update.

## Package-Specific Instructions

Each major package has its own `AGENTS.md` with detailed guidance:

- [`packages/components/AGENTS.md`](packages/components/AGENTS.md) — Stencil web components
- [`packages/component-meta/AGENTS.md`](packages/component-meta/AGENTS.md) — Component metadata generation
- [`packages/shared/AGENTS.md`](packages/shared/AGENTS.md) — Internal shared utilities and generated lookups
- [`packages/styles/AGENTS.md`](packages/styles/AGENTS.md) — Style libraries and preview app
- [`packages/tokens/AGENTS.md`](packages/tokens/AGENTS.md) — Design tokens
- [`packages/utilities/AGENTS.md`](packages/utilities/AGENTS.md) — Utility packages such as AG Grid theme
- [`packages/storefront/AGENTS.md`](packages/storefront/AGENTS.md) — Next.js documentation site
- [`packages/components-react/AGENTS.md`](packages/components-react/AGENTS.md) — React wrapper
- [`packages/components-angular/AGENTS.md`](packages/components-angular/AGENTS.md) — Angular wrapper
- [`packages/components-vue/AGENTS.md`](packages/components-vue/AGENTS.md) — Vue wrapper

## Agent Guidance Priority

When multiple guidance files exist, prefer them in this order:

1. The nearest package- or folder-level `AGENTS.md`
2. Applicable Cursor rules from `.cursor/rules/`
3. Root-level `AGENTS.md`
4. `.github/instructions/*.instructions.md` for GitHub/Copilot-oriented guidance

## Quick Reference

| Task           | Command                                    |
| -------------- | ------------------------------------------ |
| Fresh install  | `npm install && npm run build`               |
| Dev components | `npm run start:components`                    |
| Dev storefront | `npm run start:storefront`                    |
| Test component | `npm run test:unit:components`                |
| Clean rebuild  | `npm run clean && npm install && npm run build` |
| Run in Docker  | `./docker.sh {command}`                    |

