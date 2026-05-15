# Porsche Design System

Monorepo providing design tokens, web components (Stencil), and framework wrappers (Angular, React, Vue) for Porsche web applications.

## Toolchain

- **Node**: v24 (managed via Volta)
- **Package manager**: npm 10+ with workspaces (36+ workspaces)
- **TypeScript**: ~6.0
- **Linting/Formatting**: Biome (JS/TS/JSON/CSS) — single quotes, 2-space indent, 120 char lines, LF
- **Markdown formatting**: Prettier (MD/MDX only)
- **No `console.log`** — use `console.warn` or `console.error`

## Build Order (Critical)

Sequential dependency chain — always build in this order:

1. `shared` → `tokens` → `assets` → `styles` → `utilities` → `component-meta`
2. `components` (Stencil core)
3. `components-js`
4. `components-angular`, `components-react`, `components-vue` (parallel OK)
5. `storefront`

Use `npm run build` for the full chain, or `npm run build:core-dependencies` for step 1 only.

## Essential Commands

| Task | Command |
|------|---------|
| Install | `npm install` |
| Full build | `npm run build` |
| Core deps only | `npm run build:core-dependencies` |
| Dev components | `npm run start:components` |
| Dev storefront | `npm run start:storefront` |
| Unit tests | `npm run test:unit:{package}` |
| E2E tests | `npm run test:e2e:components-js` |
| VRT tests | `./docker.sh npm run test:vrt:components-js` |
| A11y tests | `npm run test:a11y:components-js` |
| Lint | `npm run lint` |
| Format | `npm run format` |
| Clean rebuild | `npm run clean && npm install && npm run build` |

## Accessibility (Non-Negotiable)

All code must meet **WCAG 2.2 AA**:
- Full keyboard access, no mouse-only interactions, no keyboard traps
- Visible focus via `getFocusBaseStyles()` from `packages/components/src/styles/common-styles.ts`
- High Contrast Mode support via `forcedColorsMediaQuery()`
- Prefer PDS `p-` components over custom widgets
- Use component's `aria` prop, never `aria-*` directly on host element

See `.claude/rules/accessibility.md` for full guidance.

## Coding Conventions

- **Tag prefix**: `p-` for all web components (e.g., `p-button`, `p-modal`)
- **Prop naming**: Feature-based, not action-based (`compact` not `enableCompact`)
- **Boolean props**: Default to `false`, positive naming (`disabled` not `notEnabled`)
- **CSS variables**:
  - `--p-*` — global design tokens
  - `--p-<component>-*` — public writable API (needs JSDoc)
  - `--ref-p-<component>-*` — public read-only API (needs JSDoc)
  - `--_p-<component>-{a,b,c}` — internal, may change anytime

See `docs/coding-standards-and-guidelines.md` for details.

## Component Architecture

Components are Stencil classes with shadow DOM and JSS styling:
- `@Component({ tag: 'p-name', shadow: { delegatesFocus: true } })`
- Props validated via `propTypes` constant + `validateProps()` in `render()`
- Styles applied via `attachComponentCss(host, getComponentCss, ...args)`
- JSS objects composed with `getCss()` and `mergeDeep()`
- Form components use `@AttachInternals()` + `formAssociated: true`

File structure per component: `{name}.tsx`, `{name}-styles.ts`, `{name}-utils.ts`, `{name}.spec.ts`

## Testing

- **Unit**: Vitest with jsdom — components instantiated directly (`new Button()`)
- **E2E**: Playwright — functional browser tests
- **VRT**: Playwright in Docker — visual regression (`./docker.sh` required)
- **A11y**: Playwright + axe-core — accessibility + a11y tree snapshots
- Always build before running cross-package tests

## Common Pitfalls

- Do **not** skip `npm run build` before tests
- Do **not** run VRT without Docker — screenshots won't match CI
- Do **not** manually edit `package-lock.json` — run `npm install`
- Do **not** remove focus outlines without accessible alternatives
- Check `docs/dependencies.md` before upgrading packages
- `globby` and `change-case` are ESM-only — use existing workarounds

## Knowledge Files

| Rule File | Scope |
|-----------|-------|
| `components.md` | Stencil web components |
| `components-js.md` | JS wrapper, e2e/vrt/a11y test harness, partials |
| `components-react.md` | React wrapper + Next.js/Remix/React Router |
| `components-angular.md` | Angular wrapper |
| `components-vue.md` | Vue wrapper |
| `storefront.md` | Next.js documentation site |
| `tokens.md` | Design tokens |
| `styles.md` | Style libraries (Tailwind, SCSS, Emotion, etc.) |
| `assets.md` | Icons, fonts, crest, marque, flags |
| `shared.md` | Internal shared utilities and generators |
| `component-meta.md` | Component metadata generation |
| `utilities.md` | AG Grid integration |
| `accessibility.md` | Cross-cutting accessibility (all frontend files) |
| `testing.md` | Cross-cutting test conventions |
| `code-style.md` | Cross-cutting code style and formatting |

All rule files are in `.claude/rules/` with glob-based auto-activation.
Per-package `AGENTS.md` files provide additional canonical reference.

## Quick Reference

| Task | Command |
|------|---------|
| Fresh install | `npm install && npm run build` |
| Dev components | `npm run start:components` |
| Dev React | `npm run start:components-react` |
| Dev storefront | `npm run start:storefront` |
| Test component | `npm run test:unit:components -- {name}.spec.ts` |
| Docker run | `./docker.sh {command}` |
