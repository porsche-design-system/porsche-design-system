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
| **Styling**            | JSS (CSS-in-JS), Tailwind CSS              |
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

## Public API Surface (Read Before Judging a Breaking Change)

Only **four** packages are published to npm: `@porsche-design-system/components-{js|angular|react|vue}`. Every other
workspace package is `"private": true` — including all of `packages/styles/projects/*`,
`@porsche-design-system/tokens-meta`, `@porsche-design-system/stylesheets` and `shared` — regardless of having a scoped
name, an `exports` map, `files` and `.d.ts` output. The published packages are assembled by copying **selected build
output** into a wrapper `dist/`; what is not copied does not exist for a consumer.

**The most reliable and easiest way to tell what is published is to read the built wrapper `dist/` folders.** Each one
*is* the npm package — the tarball root, `package.json` included:

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

`docs/public-api.md` is the single source of truth, with the full subpath-to-source map and the three checks to run when
the answer is not obvious. **Verify against it before reporting a removed or changed export as breaking, and before
requesting a changelog entry for one.** An export that never reached a wrapper `dist/` cannot break a consumer, needs no
compatibility alias and needs no changelog entry.

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
- **Don't** patch a missing native binding in a CI step; regenerate the lockfile cleanly and verify it with `npm run npm:verify-lock`
- **Don't** patch a missing native binding in a CI step; regenerate the lockfile cleanly and verify it with
  `npm run npm:verify-lock` (see `docs/dependencies.md` → _Platform-specific native bindings in the lockfile_)
- **Don't** remove focus outlines without providing accessible alternatives
- **Do** use Docker for VRT to match CI environment
- **Do** check `docs/dependencies.md` before upgrading packages
- **Do** document consumer-facing changes in `packages/components/CHANGELOG.md` following `docs/changelog.md`
- **Do** follow `docs/runbooks/dependency-updates-agent.md` for the recurring automated npm dependency update task

## Changelog

Consumer-facing changes are documented in `packages/components/CHANGELOG.md` under `[Unreleased]`. The rules for what
belongs there and how entries are worded are in `docs/changelog.md`.

"Consumer-facing" means reachable through a published subpath — check `docs/public-api.md` before writing or requesting
an entry.

When performing a code review, always apply the `.github/skills/code-review-changelog` skill to check whether the
changelog was updated correctly for the changes in the pull request — including when the pull request does not touch
`packages/components/CHANGELOG.md` at all.

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
