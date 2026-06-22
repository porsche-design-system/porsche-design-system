# Add a `skill/` generator to the stylesheets package

## Context

On branch `issue/4523-follow` the `@porsche-design-system/stylesheets` package
(`packages/components/projects/stylesheets/`) was aligned with the `scss` / `tailwindcss` meta
model: a single domain-keyed catalog (`src/meta.ts`, exposed via the `./meta` subpath) whose leaves
are a discriminated `StylesheetNode` union (a `CssVariableMeta` **token** carrying `property`, or a
`ColorSchemeClassMeta` **utility** carrying `selector`), with a derived `kindOf` discriminant
(`src/kind.ts`), per-domain token files under `src/theme/`, the `.scheme-*` utilities in
`src/utilities/color-scheme.ts`, and shared cross-solution vocabulary (`font`, `font.size`,
`border.radius`, `motion.ease`).

That alignment was **structure only** — it deliberately did **not** add a skill. `scss` and
`tailwindcss` each ship a `skill/` directory (`intro.md`, `how-to-use.md`, `skill.ts`) that
serializes their meta into markdown for the PDS docs/LLM skill, partitioning leaves via `kindOf`.
The stylesheets package now has everything needed to do the same but has no `skill/` dir yet.

## Goal

Add `packages/components/projects/stylesheets/skill/` (matching the scss/tailwind layout) that
generates the markdown documentation for the global styles from `stylesheetsMeta`.

## Scope

- **In scope:** a `skill/` directory with `intro.md`, `how-to-use.md`, and `skill.ts` that imports
  `{ kindOf, stylesheetsMeta }` from `../src/meta`, walks the catalog, partitions leaves into a
  **CSS variables** (token) section and a **color-scheme classes** (utility) section via `kindOf`,
  and renders the markdown tables/snippets. Wire it into whatever aggregates the per-solution skills
  (mirror how `scss`/`tailwindcss` skills are collected).
- **Out of scope:** any further change to the meta structure (it is final); the `normalize` reset
  (it has no documented leaves and is intentionally absent from the catalog — decide separately
  whether the skill should mention it as prose).

## Reference

- `packages/styles/projects/scss/skill/{intro.md,how-to-use.md,skill.ts}`
- `packages/styles/projects/tailwindcss/skill/{intro.md,how-to-use.md,skill.ts}`
- Catalog + discriminant to consume: `packages/components/projects/stylesheets/src/meta.ts`,
  `src/kind.ts`.

## Open questions

- Where the generated stylesheets skill output is collected/published (the scss/tailwind skills
  live under `packages/styles/projects/*/skill`; stylesheets lives under `packages/components/projects/`,
  so the collection wiring may differ).
- Whether the color-scheme `usage` field should be surfaced in the skill output (the storefront
  table already renders it).
