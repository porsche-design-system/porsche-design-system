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
- A deprecated public API needs an `@deprecated` annotation on its declaration. Every package publishes a domain-keyed
  deprecations catalog beside its meta (`emotionDeprecationsMeta`, `vanillaExtractDeprecationsMeta`,
  `scssDeprecationsMeta`), which the knowledge skill's deprecation index is built from; in `emotion` and
  `vanilla-extract` it is generated from those annotations (`scripts/deprecations.ts`), in `scss` it is authored and the
  annotations are generated from it. See
  [`docs/emotion-deprecation-metadata-design.md`](../../docs/emotion-deprecation-metadata-design.md).
- The global styles (single source of truth for `variables.css`, `color-scheme.css`, `normalize.css` and
  `font-face.css`) now live in
  [`packages/components/projects/stylesheets`](../components/projects/stylesheets/AGENTS.md). Add or change CSS
  variables in that package's meta, not directly in the build scripts.

## Testing Expectations

- Run the relevant unit tests for the subpackage you change.
- Run `npm run test:vrt:styles` when a visual contract or rendered demo output changes.
- Be careful with cross-target changes: a token or helper adjustment may affect several style packages at once.
