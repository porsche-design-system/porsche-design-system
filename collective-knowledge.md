# Porsche Design System — Collective Knowledge Index

Master index connecting all knowledge sources for AI assistants working in this monorepo.

## Knowledge System Overview

The knowledge system has three tiers:

| Tier | Location | When Loaded | Purpose |
|------|----------|-------------|---------|
| **CLAUDE.md** | Root | Always | Concise entry point — toolchain, build order, conventions, pitfalls |
| **`.claude/rules/*.md`** | `.claude/rules/` | Auto-activated by glob match | Self-contained per-package/cross-cutting guidance |
| **`AGENTS.md`** | Root + per-package | Read by other AI tools | Canonical detailed reference (GitHub Copilot, Cursor, etc.) |

## File Inventory

### Entry Point

| File | Lines | Purpose |
|------|-------|---------|
| `CLAUDE.md` | ~127 | Always-read entry point with essential knowledge |

### Package Rule Files (`.claude/rules/`)

| File | Globs | Purpose |
|------|-------|---------|
| `components.md` | `packages/components/**` | Stencil web components — patterns, JSS, a11y, forms, unit tests |
| `components-js.md` | `packages/components-js/**` | JS wrapper, e2e/vrt/a11y test harness, partials, Docker VRT |
| `components-react.md` | `packages/components-react/**` | React wrapper hooks, provider, SSR, Next.js/Remix/RR integrations |
| `components-angular.md` | `packages/components-angular/**` | Angular wrapper, BaseComponent, CVA, module setup |
| `components-vue.md` | `packages/components-vue/**` | Vue SFC wrappers, syncProperties, provider, v-model |
| `storefront.md` | `packages/storefront/**` | Next.js docs site, story files, Configurator/Examples recipes |
| `tokens.md` | `packages/tokens/**` | Design tokens — color, font, spacing, motion, etc. |
| `styles.md` | `packages/styles/**` | Style libraries — Tailwind, SCSS, Emotion, Vanilla Extract, Global |
| `assets.md` | `packages/assets/**` | Icons, fonts, crest, marque, flags, CDN serving |
| `shared.md` | `packages/shared/**` | Internal utilities, generated lookups, testing helpers |
| `component-meta.md` | `packages/component-meta/**` | Component metadata generation, source parsing |
| `utilities.md` | `packages/utilities/**` | AG Grid theme, token-backed styles |

### Cross-Cutting Rule Files (`.claude/rules/`)

| File | Globs | Purpose |
|------|-------|---------|
| `accessibility.md` | `**/*.{tsx,ts,vue,html,css,scss,mdx}` | WCAG 2.2 AA requirements, focus, HCM, ARIA |
| `testing.md` | `**/*.spec.ts,**/*.e2e.ts,...` | Vitest/Playwright patterns, when to add which test |
| `code-style.md` | `**/*.{ts,tsx,js,jsx,vue}` | Biome config, naming, JSS conventions, no-edit files |

### Per-Package AGENTS.md Files

| File | Package |
|------|---------|
| `AGENTS.md` (root) | Monorepo-wide guidance |
| `packages/components/AGENTS.md` | Stencil web components |
| `packages/components-react/AGENTS.md` | React wrapper |
| `packages/components-angular/AGENTS.md` | Angular wrapper |
| `packages/components-vue/AGENTS.md` | Vue wrapper |
| `packages/storefront/AGENTS.md` | Next.js documentation site |
| `packages/tokens/AGENTS.md` | Design tokens |
| `packages/styles/AGENTS.md` | Style libraries |
| `packages/shared/AGENTS.md` | Internal shared utilities |
| `packages/component-meta/AGENTS.md` | Component metadata |
| `packages/utilities/AGENTS.md` | AG Grid integration |

### Other Reference Files

| File | Purpose |
|------|---------|
| `docs/coding-standards-and-guidelines.md` | Prop naming, boolean props, CSS variable naming |
| `docs/dependencies.md` | Package upgrade guidelines |
| `docs/bundling.md` | Bundling strategy |
| `docs/release.md` | Release process |
| `.github/instructions/accessibility.instructions.md` | GitHub Copilot a11y guidance |
| `.github/instructions/components.instructions.md` | GitHub Copilot component guidance |
| `.github/instructions/storefront.instructions.md` | GitHub Copilot storefront guidance |

## Cross-Reference Matrix

Which knowledge files are relevant for common tasks:

| Task | Primary Rule | Also Relevant |
|------|-------------|---------------|
| Add a new component | `components.md` | `accessibility.md`, `testing.md`, `code-style.md` |
| Fix component styling | `components.md` | `code-style.md` (JSS conventions) |
| Write e2e/VRT tests | `components-js.md` | `testing.md` |
| Fix React wrapper | `components-react.md` | `code-style.md` |
| Fix Angular wrapper | `components-angular.md` | `code-style.md` |
| Fix Vue wrapper | `components-vue.md` | `code-style.md` |
| Add storefront docs | `storefront.md` | `accessibility.md` |
| Update design tokens | `tokens.md` | `styles.md` (downstream) |
| Change style libraries | `styles.md` | `tokens.md` (upstream) |
| Fix accessibility issue | `accessibility.md` | `components.md`, `testing.md` |
| Update assets/icons | `assets.md` | — |
| Change shared utilities | `shared.md` | All downstream packages |
| Update component metadata | `component-meta.md` | `shared.md` |
| Modify AG Grid theme | `utilities.md` | `tokens.md` |

## Knowledge Source Hierarchy

When multiple guidance files exist, prefer them in this order:

1. The nearest `.claude/rules/` file matching the current file's glob
2. Cross-cutting `.claude/rules/` files (accessibility, testing, code-style)
3. Root `CLAUDE.md`
4. The nearest per-package `AGENTS.md`
5. Root `AGENTS.md`
6. `docs/*.md` files for reference
7. `.github/instructions/*.instructions.md`

## Pattern Catalog

Reference implementations for every major code pattern:

| Pattern | Reference File | Key Concepts |
|---------|---------------|--------------|
| Stencil component | `packages/components/src/components/button/button.tsx` | `@Component`, `propTypes`, `validateProps`, `attachComponentCss`, `Host` |
| JSS style function | `packages/components/src/components/button/button-styles.ts` | `getComponentCss`, `getCss`, `mergeDeep`, conditional spreads |
| Component unit test | `packages/components/src/components/button/button.spec.ts` | Direct class instantiation, mock ElementInternals, lifecycle calls |
| Focus styles | `packages/components/src/styles/common-styles.ts` | `getFocusBaseStyles`, `getDisabledBaseStyles`, `getTransition` |
| HCM styles | `packages/components/src/styles/media-query/forced-colors-media-query.ts` | `forcedColorsMediaQuery()` wrapper |
| React wrapper | `packages/components-react/projects/react-wrapper/src/lib/components/fieldset.wrapper.tsx` | `forwardRef`, `usePrefix`, `useBrowserLayoutEffect`, `syncRef` |
| Angular wrapper | `packages/components-angular/projects/angular-wrapper/src/lib/components/fieldset.wrapper.ts` | `BaseComponent`, `@Component` with inputs/outputs |
| Vue wrapper | `packages/components-vue/projects/vue-wrapper/src/lib/components/FieldsetWrapper.vue` | `<script setup>`, `syncProperties`, `usePrefix` |
| Form component | `packages/components/src/components/input-text/input-text.tsx` | `@AttachInternals`, `formAssociated`, `formResetCallback` |
| CSS variable naming | `docs/coding-standards-and-guidelines.md` | `--p-*`, `--p-<comp>-*`, `--ref-p-*`, `--_p-*` |

## Maintenance Notes

### When to Update Knowledge Files

- **New package added**: Create a new `.claude/rules/{package}.md` with appropriate glob
- **Convention changed**: Update `code-style.md` and `CLAUDE.md`
- **New test type added**: Update `testing.md`
- **Accessibility guidelines updated**: Update `accessibility.md`
- **Build order changed**: Update `CLAUDE.md`

### Keeping Knowledge Current

- Rule files should reflect the actual codebase, not aspirational state
- When a pattern changes, update the rule file and the pattern catalog above
- Remove knowledge about deleted packages or deprecated patterns
- Cross-reference with `AGENTS.md` files to avoid drift
