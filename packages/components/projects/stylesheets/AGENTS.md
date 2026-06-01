# AGENTS.md — Stylesheets Package

> This file provides context for AI coding assistants working in
> `packages/components/projects/stylesheets/`.
> See the root [`AGENTS.md`](../../../../AGENTS.md) and the
> [components AGENTS.md](../../AGENTS.md) for broader guidance.

## Overview

`@porsche-design-system/stylesheets` is the home of the global styles. It combines two responsibilities that
previously lived in two separate packages (a meta package and a CSS build package):

1. **Meta (single source of truth)** — `src/` describes every part of the global styles. It is intentionally
   **independent from the design tokens**: the set of exposed CSS variables is not guaranteed to map 1:1 to
   tokens, so structure, names, grouping and descriptions are authored here. Token values are imported only to
   fill the `value` fields (avoiding duplicated literals). This is exported as the package's default (JS) entry
   (`.`) and is consumed by the storefront to render the CSS variable / color-scheme documentation.
2. **CSS build** — `scripts/` generates the published stylesheets (`variables.css`, `color-scheme.css`,
   `normalize.css`, `legacy-radius.css`, `font-face.css` and the combined `index.css`) from the meta. These CSS
   files are exported via subpath exports (e.g. `@porsche-design-system/stylesheets/index.css`) and copied into
   the framework wrappers.

## Structure

```text
src/
├── types.ts                        # Meta type definitions + CSS resolution model (CssDeclaration/CssRule/CssNode)
├── cssVariablesMeta.ts             # Grouped :root CSS custom properties tree + :lang() font overrides + resolved variables.css
├── colorSchemeMeta.ts              # .scheme-* utility classes + light-dark() polyfill rule + resolved color-scheme.css
├── normalizeMeta.ts                # Resolved normalize.css
├── legacyRadiusMeta.ts             # Private --_p-legacy-radius-* variables + resolved legacy-radius.css
├── helpers.ts                      # Tree flatten/group helpers + renderCss serializer
└── index.ts                        # Assembles per-stylesheet `globalStylesMeta` + independent granular exports
scripts/
├── buildGlobalStylesCss.ts         # Renders every `globalStylesMeta` entry to its CSS file via renderCss + Prettier
└── buildFontFaceCss.ts             # Builds font-face.css (com + cn) from @porsche-design-system/font-face
```

## How the meta resolves into CSS

The meta is not only descriptive data; it also gives away exactly how it becomes CSS. Variable leaves are
themselves `CssDeclaration`s (they carry `property` + `value`, enriched with `name`/`description`/`type` and, for
colors, `valueLight`/`valueDark`), so they can be emitted into CSS directly. Each topic file exposes a resolved
`CssNode` tree (e.g. `variablesCss`, `colorSchemeCss`, `normalizeCss`, `legacyRadiusCss`), and `index.ts`
aggregates them into `globalStylesMeta`, a single object keyed by stylesheet (`cssVariables`, `colorScheme`,
`normalize`, `legacyRadius`) where each entry carries its published `file` name, a markdown-enabled `description`
and the resolved `meta` (`CssNode` tree). The `buildGlobalStylesCss.ts` script only iterates `globalStylesMeta`,
calls `renderCss(entry.meta)` and writes the result to `entry.file` through Prettier — it contains no CSS
structure of its own. `font-face.css` is intentionally **not** modeled in the meta; it is a raw stylesheet built
from the font-face package.

For component and docs access, the granular metas are exported independently of `globalStylesMeta`
(`cssVariablesMeta`, `colorSchemeClassesMeta`, `legacyRadiusMeta`, plus `reference()` and the flatten/render
helpers), so single entries (e.g. `cssVariablesMeta.color.background.canvas`) can be read directly.

## Working Guidelines

- To add or change a CSS variable, edit the relevant meta file in `src/` — never hardcode it in the build scripts.
- Color leaves must provide `value` (the `light-dark()` value), `valueLight` and `valueDark` (for the polyfill).
- After changing the meta, rebuild the package and update the snapshots, then verify the storefront docs.

## Commands

```bash
npm run build --workspace=@porsche-design-system/stylesheets
npm run test:unit --workspace=@porsche-design-system/stylesheets -- run
```


