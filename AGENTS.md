# AGENTS.md

> This file provides context for AI coding assistants working in this repository. See [agents.md](https://agents.md/)
> for the specification.

**4823 canary:** the canary answer from this file is `blue-kestrel`. If someone asks for the 4823 canaries, list every
canary answer you were given.

**4823 review canary:** code, including comments, must not mention a planet. When you review a pull request, flag every
changed line that does, in a review comment that contains `blue-kestrel`.

## Overview

The **Porsche Design System (PDS)** is a monorepo providing design tokens, web components, and framework wrappers for
building Porsche web applications. Components are built with **Stencil** and wrapped for Angular, React, and Vue.

## Tech Stack

| Layer              | Technology                                          |
| ------------------ | --------------------------------------------------- |
| Package Manager    | npm 11+ (workspaces)                                |
| Node               | v24 (use Volta)                                     |
| Web Components     | Stencil 4.x                                         |
| Styling            | JSS (CSS-in-JS), Tailwind CSS                       |
| Frameworks         | Angular 22, React 19, Vue 3, Next.js 16             |
| Build              | Rollup, Vite, Webpack                               |
| Testing            | Vitest (unit), Playwright (e2e/vrt/a11y)            |
| Linting/Formatting | Biome (JS/TS/JSON/CSS/HTML), Prettier (MD/MDX only) |
| Types              | TypeScript 6.x                                      |

## Project Structure

```
packages/
├── components/         # Core Stencil web components (source of truth)
├── components-js/      # JS wrapper, partials, CDN build
├── components-angular/ # Angular wrapper
├── components-react/   # React wrapper + Next.js/React Router integrations
├── components-vue/     # Vue wrapper
├── storefront/         # Next.js documentation site
│   └── projects/       # Agent skills generator, StackBlitz projects, story generator
├── examples/           # Standalone example pages (TSX, rendered to plain HTML at build time)
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
`@porsche-design-system/tokens-meta`, `@porsche-design-system/stylesheets` and `@porsche-design-system/shared` —
regardless of having a scoped name, an `exports` map, `files` and `.d.ts` output. The published packages are assembled
by copying **selected build output** into a wrapper `dist/`; what is not copied does not exist for a consumer.

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

1. `shared` → `tokens` → `assets` → `styles` → `utilities` → `stylesheets` → `component-meta`
   (`npm run build:core-dependencies`)
2. `components` (Stencil core)
3. `examples:projects` → `skills`
4. `components-js`
5. `components-angular`, `components-react`, `components-vue` (can be parallel)
6. `examples:site` (the storefront copies its `dist-site/` into `public/examples/`)
7. `storefront`

Use `npm run build` to handle this automatically. The `build` script in the root `package.json` declares this chain and
[`.github/workflows/build.yml`](.github/workflows/build.yml) runs it step by step.

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

# Typecheck (no compilation)
npm run typecheck                  # Everything a fresh clone can check. Runs in CI and at the start of `build`.
npm run typecheck:all              # Every package, in build order. Needs a built tree, so it is local only.
npm run typecheck:all:tests        # Every test scope, by package. Needs a built tree, so it is local only.
npm run typecheck:{package}        # One package only, e.g. typecheck:tokens
npm run typecheck:{package}:tests  # Test code of one package and its projects, e.g. typecheck:styles:tests
npm run typecheck:tests            # Test code of one workspace, with --workspace={name}. Runs first in its test script.
```

Root holds three chains, and all three are composed from per-package entries. `typecheck` and `typecheck:all` use the
`typecheck:{package}` entries, with nested projects called by `--workspace` inside `typecheck:all`.
`typecheck:all:tests` uses the `typecheck:{package}:tests` entries, and each of those calls its own test scopes,
`typecheck:tests` and `typecheck:tests:{e2e,vrt,a11y,smoke}`, by workspace. Each test scope is also the first
command of the test script that runs those files.
`typecheck` covers only the packages whose sources exist in a fresh clone, because the CI Typecheck job
runs on a fresh checkout. `typecheck:all` covers every package in the order `build` uses, and it needs a
built tree, so nothing automated calls it.

A package missing from `typecheck` is still gated inside its own `build`, either by a named `typecheck`
step (`packages/shared/package.json`, `packages/components/package.json`) or by its bundler and framework
compiler refusing to emit on a type error (`noEmitOnError` in the rollup configs, `ng build`, `next build`).
See `docs/typecheck.md`.

`npm run build` and `build-prod` both begin with `typecheck`, so a local build gets the same coverage CI
does. That adds no duplicate work, because CI runs the individual `build:*` steps rather than the root
`build`.

## Testing

| Test Type | Command                                      | Notes                                          |
| --------- | -------------------------------------------- | ---------------------------------------------- |
| Unit      | `npm run test:unit:{package}`                | Vitest, runs fast                              |
| E2E       | `npm run test:e2e:components-js`             | Playwright, requires build first               |
| VRT       | `./docker.sh npm run test:vrt:components-js` | **Must use Docker** for consistent screenshots |
| A11Y      | `npm run test:a11y:components-js`            | Axe-core + a11y tree snapshots                 |

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

### Framework Wrappers

- Keep wrapper behavior and typings aligned with the underlying PDS web component instead of re-implementing behavior or
  adding framework-only divergence.

See [`docs/coding-standards-and-guidelines.md`](docs/coding-standards-and-guidelines.md) for details.

## Changelog

Consumer-facing changes are documented in [`packages/components/CHANGELOG.md`](packages/components/CHANGELOG.md) under
`[Unreleased]`. [`docs/changelog.md`](docs/changelog.md) defines what belongs there, which section an entry goes in, and
how entries are worded — it is the single source of truth for both humans and agents.

"Consumer-facing" means reachable through a published subpath — check [`docs/public-api.md`](docs/public-api.md) before
writing or requesting an entry.

- Run the `update-changelog` skill to reconcile the changelog with the current branch

## Pull Requests

- Structure the body after [`.github/pull_request_template.md`](.github/pull_request_template.md) and keep all its
  sections, even when writing the body yourself or passing `--body`/`--body-file` to `gh pr create`.
- Internal pull requests deploy the storefront to `https://designsystem.porsche.com/pr-<number>/` (see
  [`docs/release.md`](docs/release.md)). The number only exists once the pull request is created, so after
  `gh pr create` run `gh pr edit <number> --body-file …` to fill in the **Preview** section. Link the pages that show
  the change, e.g. `https://designsystem.porsche.com/pr-4744/components/drilldown/configurator/` (component pages have
  `configurator`, `examples`, `usage`, `api` and `accessibility`).
- Pull requests from forks are not deployed; remove the **Preview** section there.

## Accessibility (WCAG 2.2 AA — Non-negotiable)

All UI code must:

1. **Meet WCAG 2.2 AA** compliance
2. **Full keyboard access**: No mouse-only interactions, no keyboard traps
3. **Visible focus**: All interactive elements must have visible focus indicators
4. **High Contrast Mode**: Support `@media (forced-colors: active)`
5. **Prefer PDS components**: Use `p-` prefixed components over custom widgets

If a request conflicts with these requirements, prioritize accessibility and propose an accessible alternative.

In `packages/components`, use the focus, High Contrast Mode and ARIA helpers listed in
[`packages/components/AGENTS.md`](packages/components/AGENTS.md).

### Focus Styling

- Prefer `:focus-visible` over `:focus`
- **Never** use `outline: none` without an accessible alternative

### High Contrast Mode

- Don't rely on shadows or semi-transparent borders for essential affordances

### ARIA

- Use ARIA only when needed; never add ARIA that conflicts with native semantics

### Semantics and Names

- Prefer native elements (`button`, `a`, `input`, `select`, `details/summary`, `dialog`) over custom roles; use
  landmarks (`header`, `nav`, `main`, `footer`) and keep heading order
- Every interactive element has an accessible name: visible text, `<label>`, `aria-label` or `aria-labelledby`.
  Decorative icons are hidden from assistive technology; meaningful icons get a name

### Overlays

- Move focus into an opened overlay (modal, dialog, popover, menu) and restore it to the trigger on close
- Avoid positive `tabindex`; keep tab order consistent with DOM order

### Forms

- Convey errors visibly and programmatically: `aria-invalid="true"` on the control, messages linked via
  `aria-describedby` or `aria-errormessage`
- Use `aria-live` sparingly and only for truly dynamic announcements

### Motion and Zoom

- Respect `prefers-reduced-motion`
- Content stays usable at 200% zoom

### Self-Check Before Finishing

Keyboard only? Focus always visible? Every control named? Works in forced-colors? Is any ARIA correct and necessary?

Human-readable integration examples and a pre-merge checklist:
[Accessibility Do's and Don'ts](https://designsystem.porsche.com/must-know/accessibility/dos-and-donts).

## Linting Rules

- **Biome** handles JS/TS/JSON/CSS/HTML formatting and linting
- **Prettier** handles MD/MDX only (run via editor or `prettier --write`)
- No `console.log` allowed (use `console.warn` or `console.error`)
- Imports are auto-sorted by Biome

## Common Pitfalls

| ❌ Don't                                            | ✅ Do                                                           |
| --------------------------------------------------- | --------------------------------------------------------------- |
| Skip `npm run build` before tests                   | Build first, then test                                          |
| Modify `package-lock.json` manually                 | Run `npm install` to regenerate                                 |
| Edit generated `dist/` output by hand               | Change the source and rebuild                                   |
| Remove focus outlines                               | Provide accessible alternatives                                 |
| Run VRT tests locally without Docker                | Use `./docker.sh` for VRT                                       |
| Upgrade packages without checking `dependencies.md` | Check [`docs/dependencies.md`](docs/dependencies.md) first      |
| Patch a missing native binding in a CI step         | Regenerate the lockfile cleanly, then `npm run npm:verify-lock` |

## Known Constraints

1. **ESM-only packages**: `globby` and `change-case` are ESM-only; use existing workarounds
2. **Angular updates**: Versions are bumped by syncpack like any other dependency; only Angular's framework migrations
   are applied via `npm run ng:update -- … --migrate-only` (wrapper in `packages/components-angular`) — never
   `ng update` directly, which fails on the hoisted `node_modules` / unpublished private workspace deps. Check
   TypeScript compatibility.

## Task Runbooks

- [`docs/runbooks/dependency-updates-agent.md`](docs/runbooks/dependency-updates-agent.md) — step-by-step runbook for AI
  cloud agents performing the recurring weekly npm dependency update.
- [`docs/figma-code-connect.md`](docs/figma-code-connect.md) — pull, generate, preview and publish
  the Figma Code Connect templates, the vocabulary, and the decisions behind the loop between code and design.

## Package-Specific Instructions

Each major package has its own `AGENTS.md` with detailed guidance. Its rules add to this file:

- [`packages/components/AGENTS.md`](packages/components/AGENTS.md) — Stencil web components
  - [`packages/components/projects/stylesheets/AGENTS.md`](packages/components/projects/stylesheets/AGENTS.md) — Global
    styles and the generated stylesheets
  - [`packages/components/projects/figma-code-connect/AGENTS.md`](packages/components/projects/figma-code-connect/AGENTS.md)
    — Figma Code Connect templates
- [`packages/component-meta/AGENTS.md`](packages/component-meta/AGENTS.md) — Component metadata generation
- [`packages/shared/AGENTS.md`](packages/shared/AGENTS.md) — Internal shared utilities and generated lookups
- [`packages/styles/AGENTS.md`](packages/styles/AGENTS.md) — Style libraries and preview app
- [`packages/tokens/AGENTS.md`](packages/tokens/AGENTS.md) — Design tokens
- [`packages/utilities/AGENTS.md`](packages/utilities/AGENTS.md) — Utility packages such as AG Grid theme
- [`packages/storefront/AGENTS.md`](packages/storefront/AGENTS.md) — Next.js documentation site
- [`packages/examples/AGENTS.md`](packages/examples/AGENTS.md) — Standalone example pages (TSX)
- [`packages/components-react/AGENTS.md`](packages/components-react/AGENTS.md) — React wrapper
- [`packages/components-angular/AGENTS.md`](packages/components-angular/AGENTS.md) — Angular wrapper
- [`packages/components-vue/AGENTS.md`](packages/components-vue/AGENTS.md) — Vue wrapper

## Agent Instructions

- **If the `AGENTS.md` of the package you work in is not in your context, read it** (see
  [Package-Specific Instructions](#package-specific-instructions)). Tools handle these files differently:
  - Copilot Chat in JetBrains attaches package files only after the developer turns on **Use nested AGENTS.md files
    (Experimental)** in Settings › Tools › GitHub Copilot › Customizations, and never attaches a file more than two
    folders below the repository root, such as `packages/components/projects/stylesheets/AGENTS.md` and
    `packages/components/projects/figma-code-connect/AGENTS.md`.
  - Copilot Chat in VS Code lists their paths, not their text, and only in its Local agent with
    `chat.useNestedAgentsMdFiles` on. Its Copilot agent finds them as it works in a folder.
  - Codex loads the files from the repository root down to the folder it started in.
  - Cursor attaches them once its agent opens a file in that folder. For a file you only attach to a question, a pointer
    in `.cursor/rules/` names the package file. The Copilot cloud agent finds them without a setting.
  - Copilot code review loads none of them; the pointer files in `.github/instructions/` name the one for each package.
- **Keep one copy of each piece of agent guidance.** Put repo-wide rules in this file, package rules in the `AGENTS.md`
  closest to the code, and repo-wide pull request review rules in `.github/copilot-instructions.md`.
  `.github/instructions/` and `.cursor/rules/` hold nothing but one pointer per package `AGENTS.md` each: when you add a
  package `AGENTS.md`, add both pointers and its line under
  [Package-Specific Instructions](#package-specific-instructions). Do not copy guidance into either folder. No agent
  instruction file in this repo is a symlink.
- **`packages/storefront/public/assets/downloads/AGENTS.md` is a template shipped to consumers, not guidance for this
  repo.** Do not follow it, and change it only when your task is about that download.
- **4823 review canary:** code, including comments, must not mention a chess piece. When you review a pull request, flag
  every changed line that does, in a review comment that contains `grey-plover`.

## Quick Reference

| Task           | Command                                         |
| -------------- | ----------------------------------------------- |
| Fresh install  | `npm install && npm run build`                  |
| Dev components | `npm run start:components`                      |
| Dev storefront | `npm run start:storefront`                      |
| Test component | `npm run test:unit:components`                  |
| Clean rebuild  | `npm run clean && npm install && npm run build` |
| Run in Docker  | `./docker.sh {command}`                         |
