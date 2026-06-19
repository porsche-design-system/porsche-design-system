# `@porsche-design-system/scss` — context & glossary

This package ships the Porsche Design System design tokens as a Sass library (`@use
'@porsche-design-system/scss' as pds`) plus a JavaScript meta export (`import { scssMeta } from
'@porsche-design-system/scss'`) that drives the storefront API docs and the LLM skill.

It runs on a **meta-driven pipeline**: one documented model (`scssMeta`) is the single source of
truth, and three consumers are derived from it — the generated SCSS partials (`dist/`), the
storefront docs tables, and the skill markdown (`skill/generated/scss.md`). There is no separate
hand-maintained copy of the token list; the generated partials and the docs cannot drift because
they read the same object references.

## Glossary

The vocabulary below was resolved during the refactor that moved every domain onto this pipeline.
Use these terms consistently in code, comments and reviews.

### Documented surface

The public API a consumer is meant to use, and the only thing rendered into the docs and the skill:
the `$`-prefixed variables and the `@mixin`s that the storefront API pages expose. Everything in the
documented surface is an entry in **`scssMeta`**. If it is not in `scssMeta`, it is not documented.

### Plumbing

SCSS that is *emitted into the partials* but is **not** part of the documented surface — it carries
no `scssMeta` entry and appears in no docs table or skill section. Plumbing covers:

- deprecated `$pds-*` / `pds-*` aliases (kept for backwards compatibility),
- private helper mixins (e.g. `-prose-heading`, `cjk-font-family`),
- the `color-scheme()` theming mixin (consumers can still `@include` it; it lives only in storefront
  examples, not an API table),
- the lookup maps a mixin consults (e.g. `$pds-breakpoints`),
- the `_index.scss` `@forward` index.

Plumbing is **colocated with the documented model it relates to**: each `theme/` and `utilities/`
domain module exports both its `scssMeta` entries and its plumbing nodes (the deprecated aliases, the
helper/theming mixins, the lookup maps) as named exports — mirroring how the tailwindcss package
keeps e.g. `motionDeprecatedThemeVariables` next to `motion` in `theme/motion.ts`. The `_index.scss`
`@forward` index and the blank-line separators stay in `src/scss/index.ts`. Plumbing is never part of
`scssMeta`; the **composition layer** (`src/scss/index.ts`) imports it by name and interleaves it with
the documented entries.

### `scssMeta`

The documented model (`src/meta.ts`), mirroring the tailwindcss package's `tailwindMeta`. Two halves:

- **`theme`** — the documented **variables**, grouped by the shared tailwind token taxonomy
  (`color.background`, `typography.family`, `spacing.fluid`, `border.radius`, …).
- **`utilities`** — the documented **mixins**, grouped by topic (`typography.heading`, `skeleton`,
  `focus`, `mediaQuery`, `grid`). Some catalog members map only to plumbing (the `gradient` mixins
  and `typography.display` are deprecated) and are intentionally left unpopulated.

### Variable

A documented Sass variable: `ScssVariable` (`src/types.ts`) — a `$`-prefixed `name`, a `value`, a
`description` and an optional doc `group`. The same object is **both** a docs-table row and a render
node: it serializes to `$name: value;`.

### Mixin

A documented Sass mixin: `ScssMixin` (`src/types.ts`) — a `name`, an optional `signature` (the
parameter list with parentheses, e.g. `()` or `($offset: 2px)`), a `description` and a verbatim
`raw` body. It serializes to `@mixin name(signature) { <raw> }`; the docs render the `@include` call.

### File-meta (composition descriptor)

`ScssFileMeta` (`src/types.ts`) — one entry per generated partial. It names the output `file`, its
`@use` headers (`uses`) and an **ordered** list of render `nodes` that interleaves documented
`scssMeta` entries (referenced *by identity*) with plumbing nodes. The ordered collection of these
descriptors is the **composition layer** (`scssFileMeta` in `src/scss/index.ts`); the build iterates
it, renders + Prettier-formats each descriptor and writes `dist/<file>`. This is the single source
of every generated partial — there is no second generation path.

### Escape hatch / raw body

The verbatim `raw` string carried by a mixin (or a `ScssRaw` plumbing node). Rendered character-for-
character with no structured modelling, it lets logic-bearing SCSS — `@if`/`@each`, `@error`,
`@content`, media queries, keyframes, the responsive `pds-grid` template — pass through unchanged
while still being composed and ordered like any other node. Use it when modelling the SCSS
structurally would add no value; use a structured `ScssVariable`/`ScssMixin` when the docs need to
read its fields.

## Layout

```
src/
  meta.ts            # scssMeta — the documented model (single source of truth)
  types.ts           # the meta + render-node types (duplicated from tailwindcss; see the ADR)
  theme/             # one module per domain: documented variables + their plumbing (deprecated
                     #   aliases, helper/theming mixins) as named exports
  utilities/         # one module per domain: documented mixins + their plumbing (deprecated
                     #   variants, lookup maps, private helpers) as named exports
  scss/
    index.ts         # the composition layer: scssFileMeta + renderScssFile (imports the plumbing
                     #   from theme/ + utilities/ and interleaves it with the documented entries)
    render.ts        # flatten() + renderNode()
scripts/
  build.ts           # iterate scssFileMeta → dist/<file>
  build-skill.ts     # getScssSkill() → skill/generated/scss.md (+ a copy of the partials)
skill/
  skill.ts           # the markdown serializer (pure function over scssMeta)
  intro.md, how-to-use.md   # hand-authored prose
tests/unit/specs/
  scss.spec.ts       # output-parity snapshot, keyed off scssFileMeta
  skill.spec.ts      # skill markdown snapshot, over getScssSkill()
  _*.spec.ts         # Sass-compile behaviour specs for the logic-bearing mixins
```

## Tests

- **Output-parity snapshot** (`scss.spec.ts`) — snapshots every generated partial, keyed off
  `scssFileMeta`. The guard that the meta pipeline reproduces the historical partials exactly.
- **Skill snapshot** (`skill.spec.ts`) — locks the skill generator's pure-function output.
- **Behaviour specs** (`_skeleton`, `_focus`, `_media-query`, …) — compile a mixin with Sass and
  assert the emitted CSS, protecting the logic in the raw bodies.

See the ADR (`docs/adr/`) for why the shared meta types and skill machinery are **duplicated** into
this package rather than extracted into a shared styles module.
