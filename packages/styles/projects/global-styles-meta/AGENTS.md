# AGENTS.md — Global Styles Meta Package

> This file provides context for AI coding assistants working in
> `packages/styles/projects/global-styles-meta/`.
> See the root [`AGENTS.md`](../../../../AGENTS.md) and the
> [styles AGENTS.md](../../AGENTS.md) for broader guidance.

## Overview

`@porsche-design-system/global-styles-meta` is the **single source of truth** describing every part of the
global styles. It is intentionally **independent from the design tokens**: the set of exposed CSS variables is
not guaranteed to map 1:1 to tokens, so structure, names, grouping and descriptions are authored here. Token
values are imported only to fill the `value` fields (avoiding duplicated literals).

It is consumed by:

- the `@porsche-design-system/global-styles` build scripts to generate `variables.css`, `color-scheme.css`,
  `normalize.css` and `legacy-radius.css`;
- the storefront to render the CSS variable / color-scheme documentation and to produce LLM context.

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
```

## How the meta resolves into CSS

The meta is not only descriptive data; it also gives away exactly how it becomes
CSS. Variable leaves are themselves `CssDeclaration`s (they carry `property` +
`value`, enriched with `name`/`description`/`type` and, for colors, `valueLight`/
`valueDark`), so they can be emitted into CSS directly. Each topic file exposes a
resolved `CssNode` tree (e.g. `variablesCss`, `colorSchemeCss`, `normalizeCss`,
`legacyRadiusCss`), and `index.ts` aggregates them into `globalStylesMeta`, a
single object keyed by stylesheet (`cssVariables`, `colorScheme`, `normalize`,
`legacyRadius`) where each entry carries its published `file` name, a
markdown-enabled `description` and the resolved `meta` (`CssNode` tree).
The `global-styles` build scripts only iterate `globalStylesMeta`, call
`renderCss(entry.meta)` and write the result to `entry.file` through Prettier —
they contain no CSS structure of their own.

- variable leaves (in `cssVariablesMeta`) & `legacyRadiusMeta` entries → emitted directly as `--p-…: value` declarations
- `colorSchemeClassesMeta` entries are structurally `CssRule`s (`.scheme-* { color-scheme: … }`) → emitted directly
- `colorSchemePolyfillCssRule()` → the `@supports not (color: light-dark(…))` polyfill rule

For component and docs access, the granular metas are exported independently of
`globalStylesMeta` (`cssVariablesMeta`, `colorSchemeClassesMeta`,
`legacyRadiusMeta`, plus `reference()` and the flatten/render helpers), so single
entries (e.g. `cssVariablesMeta.color.background.canvas`) can be read directly.

For component and docs access, keep using the tree (`cssVariablesMeta`), the
arrays (`colorSchemeClassesMeta`, …) and `reference(leaf)` for `var(--…)`.

## Working Guidelines

- To add or change a CSS variable, edit the relevant meta file here — never hardcode it in the build scripts.
- Color leaves must provide `value` (the `light-dark()` value), `valueLight` and `valueDark` (for the polyfill).
- After changing the meta, rebuild `global-styles` and update its snapshots, then verify the storefront docs.

## Commands

```bash
npm run build --workspace=@porsche-design-system/global-styles-meta
npm run test:unit --workspace=@porsche-design-system/global-styles-meta -- run
```

