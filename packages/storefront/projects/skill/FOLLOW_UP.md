# Follow-up opportunities

## End goal

The SKILL package should become fully standalone. It should consume all shared documentation, metadata, and utilities
through declared package dependencies and public package exports, with no relative imports reaching into Storefront. Its
build and tests should operate entirely through this package boundary.

## Architecture overhaul

### Centralize component examples

Examples should eventually have a single source of truth that can be imported by both Storefront and SKILL. We should
investigate introducing a shared model such as `ComponentExamplesMeta` that contains a component's default example and
curated examples.

Storefront could use this metadata to render its examples pages, while SKILL could use the same metadata to generate its
framework-specific example files and reference tables. Keeping the example definitions and registration in one place
would avoid duplicate wiring, make it harder for the two outputs to drift, and ensure that adding or changing an example
is reflected in both consumers.

The shared model should contain only renderer-independent example data. Storefront-specific React rendering and
SKILL-specific Markdown or file generation should remain in their respective adapters.

### Introduce a shared LINKTREE

Replace manual link rewriting with stable semantic `LINKTREE` identities shared by the documentation. Storefront and
SKILL can each resolve the same identity to an output-specific target, keeping authored links independent of routing and
file layout.

### Resolve shared MDX components by target

Refactor `renderMdxToMarkdown` around shared semantic documentation components that can be imported in MDX files.
Storefront can render their React implementations while SKILL maps the same components to Markdown, keeping content
reusable without hard-coded handling of Storefront-specific components.

## Refactor

### Share component API logic between SKILL and Storefront

Both SKILL and Storefront generate component API documentation from `componentMeta`, but they currently maintain
separate logic:

- Storefront uses React components to render its API tables.
- SKILL transforms the same metadata into Markdown in `src/components/api.ts`.

We should investigate extracting a shared metadata-to-API model or formatting layer. Storefront and SKILL could then use
the same normalized data while keeping their output-specific renderers (React and Markdown). This would reduce
duplicated logic, prevent the two API representations from drifting apart, and make future metadata changes easier to
implement consistently.

Before extracting this layer, compare the information and formatting required by both outputs and define which behavior
belongs in the shared transformation versus each renderer.

### Refactor component prose to remove overrides

`ROSTER_SUMMARY_OVERRIDES` exists because some component introductions do not start with a concise, standalone
description that SKILL can use as the roster summary. Similar inconsistencies across introduction, usage, accessibility,
and notes MDX also require SKILL-specific cleanup and transformations.

We should refactor all component prose MDX files so they follow a consistent structure and are directly reusable by both
Storefront and SKILL. Introductions should begin with an accurate summary sentence, headings should be predictable, and
repeated boilerplate should be removed from the source rather than stripped during generation.

Once the content is normalized, remove `ROSTER_SUMMARY_OVERRIDES` and any other prose transformations that are no longer
necessary. This keeps the source documentation authoritative and avoids maintaining SKILL-specific exceptions when the
prose changes.

### Simplify package skill integration

Package skills should provide all required content and metadata themselves. The central SKILL should only plug them in,
without package-specific logic or separately maintained documentation in `packageSkills.ts`. Storefront should consume
the same package-owned prose instead of maintaining duplicate pages.

### Simplify the test setup

The test setup contains too much supporting logic and should be refactored. Tests should focus on observable behavior,
with minimal fixtures and helpers, rather than maintaining a parallel implementation of the SKILL generation process.

### Consolidate shared generation utilities

Move duplicated Markdown helpers and framework-placeholder handling behind appropriate public package exports so package
skills and renderers use one implementation.

### Add all missing documentation from structured metadata

Eventually add all missing documentation to SKILL, including Getting started, partials, migration, testing, SSR,
`componentsReady()`, deployment and CSP, prefixing and micro-frontends, AG Grid, CJK typography, browser support,
patterns, and the China CDN stylesheet. Add each domain once it is available as package-owned structured metadata that
Storefront and SKILL can both consume.

## Questions

### Do icon names need a separate reference?

SKILL currently derives the icon names from the `p-icon` metadata and writes them to a dedicated `references/icons.md`
file. This avoids repeating the full icon-name list in every component API that has an icon prop, but it introduces
another generated reference to maintain and navigate.

We should evaluate whether this separate file is necessary or whether both Storefront and SKILL can point to an existing
canonical icon-name source. The decision should consider whether SKILL must remain self-contained, how discoverable the
names are for consumers, and whether removing the generated reference would reduce complexity without reintroducing
large duplicated lists.
