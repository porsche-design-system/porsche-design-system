# Duplicate the shared meta types and skill machinery into the scss package

## Context

When the `@porsche-design-system/scss` package was moved onto the meta-driven pipeline, it needed the
same base type shapes (`TokenMeta`, `UtilityMeta`, `TokenGroup`, `ThemeCatalog`, `UtilitiesCatalog`)
and the same skill-markdown serializer machinery that the `@porsche-design-system/tailwindcss`
package already had. These are genuinely solution-agnostic — the group taxonomy and the
serializer outline are not specific to either CSS dialect.

## Decision

We **duplicated** the solution-agnostic base types and the skill machinery into the scss package
rather than extracting a shared `styles` module consumed by both packages. The scss package keeps its
own copies in `projects/scss/src/types.ts` and `projects/scss/skill/`, and the tailwindcss package is
left untouched.

## Why

- **Self-containment over premature abstraction.** Only two consumers exist today (tailwindcss, scss).
  A shared module would add a build-order dependency and a versioning surface for a contract we have
  observed exactly twice — not yet enough signal to fix the right abstraction. Duplication keeps each
  package independently buildable and lets the two shapes diverge where the dialects actually differ
  (scss adds `$`-prefixed names, render nodes, the `@mixin` escape hatch).
- **Bounded, cheap cost.** The duplicated surface is small (a handful of type aliases and one
  serializer), changes rarely, and any drift is caught by each package's own snapshot tests.

## Consequences / future extraction path

The duplication is deliberate and reversible. When a **third** styling solution joins the pipeline
(`emotion` or `vanilla-extract` are the likely candidates), the three copies become the signal to
extract a shared `@porsche-design-system/styles-meta` module: lift the solution-agnostic base shapes
(`TokenMeta` / `UtilityMeta` / `TokenGroup` / `ThemeCatalog` / `UtilitiesCatalog`) and the
serializer outline into it, and have each solution extend the base with its own render-node types.
Until then, the cost of duplication is lower than the cost of maintaining a shared module for two
consumers.
