# AGENTS.md — Styles Package

> This file provides context for AI coding assistants working in `packages/styles/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the PDS style libraries and the local demo app used to preview them. It covers multiple styling
targets, including global CSS, Tailwind CSS, SCSS, Emotion, and Vanilla Extract.

## What Actually Ships

None of these projects is published to npm — all four are `"private": true` and reach consumers only through the wrapper
packages, which copy **`dist/` and nothing else**:

| Project           | Copied into the wrappers    | Published subpath                                 | Never shipped                                    |
| ----------------- | --------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| `scss`            | `dist/` (`.scss` files)     | `./scss` — `sass` condition only, no JS, no types | `meta/` (`scssMeta`, `kindOf`, `flatten`, types) |
| `tailwindcss`     | `dist/index.css`            | `./tailwindcss`                                   | `meta/` (`tailwindMeta`, `kindOf`, types)        |
| `emotion`         | `dist/` (built from `src/`) | `./emotion`, `./styles`                           | `meta/` (`emotionMeta`, types)                   |
| `vanilla-extract` | `dist/` (built from `src/`) | `./vanilla-extract`, `./styles/vanilla-extract`   | `meta/` (`vanillaExtractMeta`, types)            |

Consequences worth internalising before changing an export:

- For `emotion` and `vanilla-extract`, `src/` **is** the published library — removing an export there is breaking.
  Removing one from the `meta/` that describes it is not.
- For `scss` and `tailwindcss` there is no published TypeScript surface at all. A type-only change is invisible to
  consumers and needs no changelog entry.
- Every `<pkg>Deprecations` list is internal metadata for the storefront docs and the skills generator. The
  _declarations_ it describes are public; the list is not.

See [`docs/public-api.md`](../../docs/public-api.md) for the full map. The quickest check is to read the built wrapper
`dist/` folders, which are the npm packages themselves — `ls packages/components-js/dist/components-wrapper/scss` shows
`.scss` files and nothing else, and `grep -rl "scssMeta\|emotionMeta" packages/components-*/dist/*-wrapper/` returns
nothing.

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

Each project follows a shared `meta/` (the documented catalog, single source of truth) + `scripts/` (build) layout. All
four projects (`scss`, `tailwindcss`, `emotion`, `vanilla-extract`) ship a pure `skill/skill.ts` serializer that turns
their meta into markdown for the docs/LLM skill. The storefront skill generator imports these serializers directly; the
style package builds do not write separate skill artifacts. Each serializer is snapshot-tested in its own package. This
mirrors [`packages/components/projects/stylesheets`](../components/projects/stylesheets/AGENTS.md). For `emotion` and
`vanilla-extract` the JS `src/` stays the source of truth and the serializer reads the descriptive `*Meta` catalog
(`emotionMeta`/`vanillaExtractMeta`); for `scss`/`tailwindcss` the meta itself is the source of truth.

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

- Treat `projects/*` as the source of truth for the style packages.
- Treat root `src/` as the demo application and preview surface, not the library output.
- Do not edit generated `dist/` output.
- When possible, make changes in the relevant style target package rather than patching the demo only.
- Keep naming and token usage aligned across style targets unless a package intentionally exposes a target-specific API.
- Deprecation metadata uses one contract, from `@porsche-design-system/shared/deprecation`: the `Deprecation` marker
  (`{ note?, replacement? }`), the `Deprecated` marker slot, the shared `Deprecations` shape, `isDeprecated` and
  `getDeprecationComment`. That last one owns the wording _and_ the comment syntax (`line` / `block` / `jsdoc`), so no
  package writes an `@deprecated` sentence of its own. `note` **appends** to the generated sentence; it never replaces
  it. Only the canonical identity helper (`scssIdentifier`, `tailwindIdentifier`) is package-owned. Import the deep
  path, never the package barrel, which is 53 modules against the contract's one. Each export is documented where it is
  declared.
- `scss` and `tailwindcss` author **one catalog** per domain holding every public declaration, deprecated ones marked in
  place by intersecting `Deprecated` into the leaf type (`type ScssVariable = { … } & Deprecated`), and derive both meta
  exports from it: `<pkg>Meta` (the catalog minus its deprecated declarations, checked against the package-local
  hand-authored `StylesMeta` contract) and the flat `<pkg>Deprecations`. Deprecating is adding one field — never moving
  a declaration. `@porsche-design-system/stylesheets` follows the same model; see
  [`packages/components/projects/stylesheets/AGENTS.md`](../components/projects/stylesheets/AGENTS.md).
- `emotion` and `vanilla-extract` deliberately keep the **two-source** model and do not adopt the catalog: their `src/`
  is hand-written TypeScript and is itself the shipped library, so the meta describes it rather than generating it, and
  the `@deprecated` annotation on the declaration — which also drives the IDE hint — is the source the flat
  `<pkg>Deprecations` is generated from (`scripts/deprecations.ts`). Those annotations are written to read exactly as
  `getDeprecationComment` renders them, naming the replacement as `{@link …}`; the extractor recovers the marker and
  **fails the build** on one it cannot structure. Package tests already assert the meta documents every public export,
  so meta and library cannot drift.
- Every package's deprecated surface is **one** export, the shared `Deprecations` — no deprecated leaf type, no second
  catalog and no type describing one. `@porsche-design-system/tokens-meta` exposes `tokenDeprecations` the same way; see
  [`packages/tokens/AGENTS.md`](../tokens/AGENTS.md).
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
