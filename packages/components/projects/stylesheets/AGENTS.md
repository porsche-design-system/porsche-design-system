# AGENTS.md — Stylesheets Package

> This file provides context for AI coding assistants working in `packages/components/projects/stylesheets/`. See the
> root [`AGENTS.md`](../../../../AGENTS.md) and the [components AGENTS.md](../../AGENTS.md) for broader guidance.

## Overview

`@porsche-design-system/stylesheets` is the home of the global styles. It combines two responsibilities that previously
lived in two separate packages (a meta package and a CSS build package):

1. **Meta (single source of truth)** — `src/` describes every part of the global styles. It is intentionally
   **independent from the design tokens**: the set of exposed CSS variables is not guaranteed to map 1:1 to tokens, so
   structure, names, grouping and descriptions are authored here. Token values are imported only to fill the `value`
   fields (avoiding duplicated literals). The documented catalog (`stylesheetsMeta`) is exposed via the dedicated
   **`./meta` subpath** (mirroring `@porsche-design-system/scss` / `tailwindcss`) and is consumed by the storefront to
   render the CSS variable / color-scheme documentation. The package's default (JS) entry (`.`) exposes only the
   tree-shakeable name consts + `ref` (what runtime consumers like the components package need); it is built into
   `dist/` by `rollup.config.mjs`, while the `./meta` catalog is built into `meta/` by `rollup.config.meta.mjs`.
2. **CSS build** — `scripts/` generates the published stylesheets (`variables.css`, `color-scheme.css`, `normalize.css`,
   `font-face.css` and the combined `index.css`) from the meta into `lib/`. These CSS files are exported via
   subpath exports (e.g. `@porsche-design-system/stylesheets/index.css`) and copied into the framework wrappers.
3. **Skill (docs generation)** — `skill/` serializes the meta into markdown (`skill/generated/stylesheets.md`) for the
   docs/LLM skill, mirroring the `scss` / `tailwindcss` skill layout. This is build-time documentation only; it is not
   published.

## Structure

```text
src/
├── types.ts                        # Meta types: discriminated StylesheetNode (CssVariableMeta token | ColorSchemeClassMeta utility), CssVariableTokens/StylesheetsMeta catalog + CSS resolution model (CssDeclaration/CssRule/CssNode)
├── kind.ts                         # kindOf(node) => 'token' | 'utility' (token has `property`, utility has `selector`)
├── meta.ts                         # `./meta` ENTRY: assembles the documented `stylesheetsMeta` catalog (theme tokens + colorScheme utilities); re-exports types, kindOf, helpers
├── theme/                          # SOURCE OF TRUTH (tokens): one file per domain — color, font, spacing, border, blur, shadow, motion
│   └── index.ts                    #   `cssVariableTokens` (the 7 token domains, in stable variables.css order)
├── utilities/
│   └── color-scheme.ts             #   `.scheme-*` utility leaves (`colorScheme`) + `colorSchemePolyfillCssRule`
├── normalize.ts                    # Raw normalize.css CssNode block (no documented leaves; not in the catalog)
├── css/index.ts                    # Composition layer: resolves catalog + plumbing into per-file `globalStylesMeta` (variables/color-scheme/normalize)
├── ref.ts                          # Hand-written `ref(name, fallback?)` helper wrapping a name into `var(...)`
├── generated/                      # GITIGNORED build artifact (regenerated from cssVariableTokens)
│   └── cssVariables/               #   one tree-shakeable const per variable, e.g. color/background/colorCanvas.ts
│       └── index.ts                #   generated barrels (re-export every name const)
├── helpers.ts                      # Token-tree flatten helpers + renderCss serializer
└── index.ts                        # Main (`.`) entry: generated name consts + `ref` only (meta lives behind `./meta`)
scripts/
├── buildCssVariableConstants.ts    # Generates src/generated/cssVariables/** (one plain-literal const per variable) from cssVariableTokens
├── buildStylesheetsCss.ts         # Renders every `globalStylesMeta` entry to its CSS file via renderCss + Prettier
├── buildFontFaceCss.ts            # Builds font-face.css (com + cn) from @porsche-design-system/font-face
└── build-skill.ts                 # Serializes the meta to skill/generated/stylesheets.md via getStylesheetsSkill + Prettier
skill/                              # Build-time docs (not published)
├── intro.md, how-to-use.md        # Hand-authored markdown prepended to the generated doc
├── skill.ts                       # `getStylesheetsSkill()`: pure serializer over stylesheetsMeta + globalStylesMeta
└── generated/                     # GITIGNORED build artifact (stylesheets.md)
```

The catalog uses the shared cross-solution vocabulary (`font`, `font.size`, `border.radius`, `motion.ease`) so it lines
up with the scss/tailwind metas. Renaming a tree key never changes a CSS variable's `property` string (and therefore
never changes the generated const names or the emitted CSS) — those are authored explicitly on each leaf.

## CSS variable names: source of truth + generated consts + `ref()`

Each domain token file in `src/theme/` is the **single source of truth**: it carries the authored `property` literals (e.g. `property: '--p-color-canvas'`)
plus the grouping, descriptions and (for colors) light/dark values; `cssVariableTokens` (`src/theme/index.ts`)
aggregates them.

From it, `scripts/buildCssVariableConstants.ts` **generates** one individual, plain-literal const per variable so
bundlers (Stencil/Rollup) can tree-shake a single variable into a component **without** dragging the whole
`cssVariableTokens` object along:

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
- The grouped directory structure mirrors `cssVariableTokens` (e.g. `color/background/`) to preserve the categorization
  used by the docs/LLM context. Const names derive from the `property` string, not the tree keys.
- Wrap a name into a CSS `var(...)` reference with the hand-written `ref(name, fallback?)` helper (`src/ref.ts`), e.g.
  in component JSS: `background: ref(colorCanvas)`.
- `tests/unit/specs/cssVariables.spec.ts` guards that every meta `property` has a matching generated const.

## How the meta resolves into CSS

The meta is not only descriptive data; it also gives away exactly how it becomes CSS. Variable leaves are themselves
`CssDeclaration`s (they carry `property` + `value`, enriched with `description`/`type` and, for colors,
`valueLight`/`valueDark`), so they can be emitted into CSS directly. The **composition layer** (`src/css/index.ts`)
resolves the catalog plus the CSS-only plumbing (the `:root` wrapper, `:lang()` font overrides, the `light-dark()`
polyfill, the raw normalize reset) into `globalStylesMeta`, a single object keyed by stylesheet (`cssVariables`,
`colorScheme`, `normalize`) where each entry carries its published `file` name, a markdown-enabled `description` and the
resolved `meta` (`CssNode` tree). The `buildStylesheetsCss.ts` script only iterates `globalStylesMeta`, calls
`renderCss(entry.meta)` and writes the result to `entry.file` through Prettier — it contains no CSS structure of its own.
`font-face.css` is intentionally **not** modeled here; it is a raw stylesheet built from the font-face package.

For docs and the LLM skill (`skill/skill.ts`), the documented catalog `stylesheetsMeta` is the partitionable surface: walk
it and use `kindOf` to split CSS-variable **tokens** from `.scheme-*` **utilities**. Single entries (e.g.
`stylesheetsMeta.color.background.canvas`) can be read directly; the storefront imports it from
`@porsche-design-system/stylesheets/meta`.

## Working Guidelines

- To add or change a CSS variable, edit the relevant domain file in `src/theme/` — never hardcode it in the build
  scripts. To add a `.scheme-*` class, edit `src/utilities/color-scheme.ts`.
- Color leaves must provide `value` (the `light-dark()` value), `valueLight` and `valueDark` (for the polyfill).
- A token leaf carries `property`; a utility leaf carries `selector` — `kindOf` relies on this. Keep that invariant.
- After changing the meta, rebuild the package and update the snapshots, then verify the storefront docs.

## Commands

```bash
npm run build --workspace=@porsche-design-system/stylesheets
npm run build:skill --workspace=@porsche-design-system/stylesheets   # regenerate skill/generated/stylesheets.md only
npm run test:unit --workspace=@porsche-design-system/stylesheets -- run
```
