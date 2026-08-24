# AGENTS.md — Styles Package

> This file provides context for AI coding assistants working in `packages/styles/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the publishable PDS style libraries and the local demo app used to preview them. It covers
multiple styling targets, including global CSS, Tailwind CSS, SCSS, Emotion, and Vanilla Extract.

## Structure

```text
packages/styles/
├── projects/tailwindcss/      # Tailwind package
├── projects/scss/             # SCSS package
├── projects/emotion/          # Emotion package
├── projects/vanilla-extract/  # Vanilla Extract package
├── src/                       # Demo app / local preview UI
└── tests/vrt/                 # Visual regression tests
```

Each publishable project follows a shared `meta/` (the documented catalog, single source of truth) + `scripts/` (build)
layout. All four projects (`scss`, `tailwindcss`, `emotion`, `vanilla-extract`) ship a pure `skill/skill.ts` serializer
that turns their meta into markdown for the docs/LLM skill. The storefront skill generator imports these serializers
directly; the style package builds do not write separate skill artifacts. Each serializer is snapshot-tested in its own
package. This mirrors [`packages/components/projects/stylesheets`](../components/projects/stylesheets/AGENTS.md). For
`emotion` and `vanilla-extract` the JS `src/` stays the source of truth and the serializer reads the descriptive `*Meta`
catalog (`emotionMeta`/`vanillaExtractMeta`); for `scss`/`tailwindcss` the meta itself is the source of truth.

## Commands

```bash
# Build all style packages and demo app
npm run build:styles

# Run unit tests for all style packages
npm run test:unit:styles

# Run visual regression tests
npm run test:vrt:styles
```

## Working Guidelines

- Treat `projects/*` as the source of truth for publishable style packages.
- Treat root `src/` as the demo application and preview surface, not the published library output.
- Do not edit generated `dist/` output.
- When possible, make changes in the relevant style target package rather than patching the demo only.
- Keep naming and token usage aligned across style targets unless a package intentionally exposes a target-specific API.
- Deprecation metadata uses one contract, from `@porsche-design-system/shared/deprecation`: the `Deprecation` marker
  (`{ note?, replacement? }`), the `Deprecated` marker slot, the published `Deprecations` shape, `isDeprecated` and
  `getDeprecationComment`. That last one owns the wording _and_ the comment syntax (`line` / `block` / `jsdoc`), so no
  package writes an `@deprecated` sentence of its own. `note` **appends** to the generated sentence; it never replaces
  it. Only the canonical identity helper (`scssIdentifier`, `tailwindIdentifier`) is package-owned. Import the deep
  path, never the package barrel, which is 53 modules against the contract's one. See
  [`docs/deprecation-contract-design.md`](../../docs/deprecation-contract-design.md).
- `scss` and `tailwindcss` author **one catalog** per domain holding every public declaration, deprecated ones marked in
  place by intersecting `Deprecated` into the leaf type (`type ScssVariable = { … } & Deprecated`), and derive both
  public exports from it: `<pkg>Meta` (the catalog minus its deprecated declarations, checked against the package-local
  hand-authored `StylesMeta` contract) and the flat `<pkg>Deprecations`. Deprecating is adding one field — never moving
  a declaration. See [`docs/scss-deprecation-metadata-design.md`](../../docs/scss-deprecation-metadata-design.md) and
  [`docs/tailwindcss-deprecation-metadata-design.md`](../../docs/tailwindcss-deprecation-metadata-design.md).
- `emotion` and `vanilla-extract` deliberately keep the **two-source** model and do not adopt the catalog: their `src/`
  is hand-written TypeScript and is itself the shipped library, so the meta describes it rather than generating it, and
  the `@deprecated` annotation on the declaration — which also drives the IDE hint — is the source the flat
  `<pkg>Deprecations` is generated from (`scripts/deprecations.ts`). Those annotations are written to read exactly as
  `getDeprecationComment` renders them, naming the replacement as `{@link …}`; the extractor recovers the marker and
  **fails the build** on one it cannot structure. Package tests already assert the meta documents every public export,
  so meta and library cannot drift.
- Every package's deprecated surface is **one** export, the shared `Deprecations` — no deprecated leaf type, no second
  catalog and no type describing one. `@porsche-design-system/tokens-meta` publishes `tokenDeprecations` the same way;
  see [`docs/token-deprecation-metadata-design.md`](../../docs/token-deprecation-metadata-design.md).
- All four packages state their documented shape as a package-local `StylesMeta<TToken, TUtility>`, parameterized so it
  can later become one shared cross-solution contract. The blocker for merging them is shape, not taxonomy: utility
  groups are positional arrays in `scss` / `tailwindcss` but keyed records in `emotion` / `vanilla-extract`, and `grid`
  has three different shapes.
- The global styles (single source of truth for `variables.css`, `color-scheme.css`, `normalize.css` and
  `font-face.css`) now live in
  [`packages/components/projects/stylesheets`](../components/projects/stylesheets/AGENTS.md). Add or change CSS
  variables in that package's meta, not directly in the build scripts.

## Testing Expectations

- Run the relevant unit tests for the subpackage you change.
- Run `npm run test:vrt:styles` when a visual contract or rendered demo output changes.
- Be careful with cross-target changes: a token or helper adjustment may affect several style packages at once.
