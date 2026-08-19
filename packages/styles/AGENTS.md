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
- Deprecation metadata uses one contract, from `@porsche-design-system/shared/deprecation`: the `Deprecation` marker,
  the `Deprecated<T>` wrapper, the lifecycle wording and the `deprecationMessage` / `deprecationText` / `isDeprecated`
  helpers. Do not add a package-local marker type, default sentence or message helper — intersect or import the shared
  one. Only the canonical identity helper (`scssIdentifier`, `tailwindIdentifier`) is package-owned. Import the deep
  path, never the package barrel, which is 53 modules against the contract's one.
- Deprecated nodes carry **no** `description` — `Deprecated<T>` strips it; extra guidance goes in `deprecation.message`.
- Keep the deprecation types in one block at the **end** of each package's types file, in the same order everywhere:
  leaf aliases (where the package has leaf kinds), their union, then
  `DeprecationsMeta<PackageMeta, DeprecatedPackageNode>`. Four types at most, two for the annotation-first packages.
- Each package keeps a domain-keyed deprecations catalog beside its meta (`scssDeprecationsMeta`,
  `tailwindDeprecationsMeta`, `emotionDeprecationsMeta`, `vanillaExtractDeprecationsMeta`) but **publishes only the flat
  `<pkg>Deprecations`** built from it with the shared `publishDeprecations(catalog, identifierOf)`, which the knowledge
  skill's deprecation index is built from. The grouping is authoring and composition routing, and the identity helper is
  internal; do not export either. In `scss` and `tailwindcss` the catalog is authored and the shipped artifact's
  deprecation markers are generated from it; in `emotion` and `vanilla-extract` the `@deprecated` annotation on the
  declaration is the source and the catalog is generated from it (`scripts/deprecations.ts`). See
  [`docs/scss-deprecation-metadata-design.md`](../../docs/scss-deprecation-metadata-design.md).
- The global styles (single source of truth for `variables.css`, `color-scheme.css`, `normalize.css` and
  `font-face.css`) now live in
  [`packages/components/projects/stylesheets`](../components/projects/stylesheets/AGENTS.md). Add or change CSS
  variables in that package's meta, not directly in the build scripts.

## Testing Expectations

- Run the relevant unit tests for the subpackage you change.
- Run `npm run test:vrt:styles` when a visual contract or rendered demo output changes.
- Be careful with cross-target changes: a token or helper adjustment may affect several style packages at once.
