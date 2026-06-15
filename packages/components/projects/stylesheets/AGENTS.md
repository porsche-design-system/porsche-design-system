# AGENTS.md — Stylesheets Package

> This file provides context for AI coding assistants working in `packages/components/projects/stylesheets/`. See the
> root [`AGENTS.md`](../../../../AGENTS.md) and the [components AGENTS.md](../../AGENTS.md) for broader guidance.

## Overview

`@porsche-design-system/stylesheets` is the home of the global styles. It combines two responsibilities that previously
lived in two separate packages (a meta package and a CSS build package):

1. **Meta (single source of truth)** — `src/` describes every part of the global styles. It is intentionally
   **independent from the design tokens**: the set of exposed CSS variables is not guaranteed to map 1:1 to tokens, so
   structure, names, grouping and descriptions are authored here. Token values are imported only to fill the `value`
   fields (avoiding duplicated literals). This is exported as the package's default (JS) entry (`.`) and is consumed by
   the storefront to render the CSS variable / color-scheme documentation.
2. **CSS build** — `scripts/` generates the published stylesheets (`variables.css`, `color-scheme.css`, `normalize.css`,
   `font-face.css` and the combined `index.css`) from the meta. These CSS files are exported via
   subpath exports (e.g. `@porsche-design-system/stylesheets/index.css`) and copied into the framework wrappers.

## Structure

```text
src/
├── types.ts                        # Meta type definitions + CSS resolution model (CssDeclaration/CssRule/CssNode)
├── cssVariablesMeta.ts             # SOURCE OF TRUTH: grouped :root CSS custom properties tree (authored `property` literals) + :lang() font overrides + resolved variables.css
├── ref.ts                          # Hand-written `ref(name, fallback?)` helper wrapping a name into `var(...)`
├── generated/                      # GITIGNORED build artifact (regenerated from cssVariablesMeta)
│   └── cssVariables/               #   one tree-shakeable const per variable, e.g. color/background/colorCanvas.ts
│       └── index.ts                #   generated barrels (re-export every name const)
├── colorSchemeMeta.ts              # .scheme-* utility classes + light-dark() polyfill rule + resolved color-scheme.css
├── normalizeMeta.ts                # Resolved normalize.css
├── helpers.ts                      # Tree flatten/group helpers + renderCss serializer
└── index.ts                        # Assembles per-stylesheet `stylesheetsMeta` + independent granular exports (incl. generated name consts + `ref`)
scripts/
├── buildCssVariableConstants.ts    # Generates src/generated/cssVariables/** (one plain-literal const per variable) from the meta
├── buildStylesheetsCss.ts         # Renders every `stylesheetsMeta` entry to its CSS file via renderCss + Prettier
└── buildFontFaceCss.ts             # Builds font-face.css (com + cn) from @porsche-design-system/font-face
```

## CSS variable names: source of truth + generated consts + `ref()`

`cssVariablesMeta` is the **single source of truth**: it carries the authored `property` literals (e.g.
`property: '--p-color-canvas'`) plus the grouping, descriptions and (for colors) light/dark values.

From it, `scripts/buildCssVariableConstants.ts` **generates** one individual, plain-literal const per variable so
bundlers (Stencil/Rollup) can tree-shake a single variable into a component **without** dragging the whole
`cssVariablesMeta` object along:

```ts
// src/generated/cssVariables/color/background/colorCanvas.ts (generated, gitignored)
export const colorCanvas = '--p-color-canvas';
```

- The generated consts are a **derived build artifact** living in the gitignored `src/generated/` folder. They are
  (re)built by `build:constants` (part of `npm run build`) and by the unit-test global setup, so a fresh checkout never
  needs them committed. Never edit them by hand, and never make the meta import them (the meta stays the source —
  keeping it independent avoids any circular/bootstrap coupling).
- They are emitted as standalone literals (not derived from the meta object at runtime), which is what makes the
  per-variable tree-shaking work.
- The grouped directory structure mirrors `cssVariablesMeta` (e.g. `color/background/`) to preserve the categorization
  used by the docs/LLM context.
- Wrap a name into a CSS `var(...)` reference with the hand-written `ref(name, fallback?)` helper (`src/ref.ts`), e.g.
  in component JSS: `background: ref(colorCanvas)`.
- `tests/unit/specs/cssVariables.spec.ts` guards that every meta `property` has a matching generated const.

## How the meta resolves into CSS

The meta is not only descriptive data; it also gives away exactly how it becomes CSS. Variable leaves are themselves
`CssDeclaration`s (they carry `property` + `value`, enriched with `name`/`description`/`type` and, for colors,
`valueLight`/`valueDark`), so they can be emitted into CSS directly. Each topic file exposes a resolved `CssNode` tree
(e.g. `variablesCss`, `colorSchemeCss`, `normalizeCss`), and `index.ts` aggregates them into
`stylesheetsMeta`, a single object keyed by stylesheet (`cssVariables`, `colorScheme`, `normalize`)
where each entry carries its published `file` name, a markdown-enabled `description` and the resolved `meta` (`CssNode`
tree). The `buildStylesheetsCss.ts` script only iterates `stylesheetsMeta`, calls `renderCss(entry.meta)` and writes the
result to `entry.file` through Prettier — it contains no CSS structure of its own. `font-face.css` is intentionally
**not** modeled in the meta; it is a raw stylesheet built from the font-face package.

For component and docs access, the granular metas are exported independently of `stylesheetsMeta` (`cssVariablesMeta`,
`colorSchemeClassesMeta`, the individual CSS variable name consts plus the `ref()` helper, and the
flatten/render helpers), so single entries (e.g. `cssVariablesMeta.color.background.canvas`) can be read directly.

## Working Guidelines

- To add or change a CSS variable, edit the relevant meta file in `src/` — never hardcode it in the build scripts.
- Color leaves must provide `value` (the `light-dark()` value), `valueLight` and `valueDark` (for the polyfill).
- After changing the meta, rebuild the package and update the snapshots, then verify the storefront docs.

## Commands

```bash
npm run build --workspace=@porsche-design-system/stylesheets
npm run test:unit --workspace=@porsche-design-system/stylesheets -- run
```
