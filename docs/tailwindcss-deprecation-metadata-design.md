# Tailwind CSS metadata design

## Summary

The Tailwind package authors **one catalog**. Every public declaration lives in it exactly once — documented and
deprecated alike — and deprecation is an optional `deprecation` marker on the declaration itself, so deprecating an API
adds one field instead of moving a node between catalogs.

The catalog is what the shipped `index.css` is generated from. The package's two public metadata exports are projections
of it:

```text
tailwindCatalog ──┬─ stripDeprecated ─→ tailwindMeta          (documented API, checked against the contract)
                  ├─ flatten + filter ─→ tailwindDeprecations (flat list for the knowledge skill)
                  └─ tailwindCssMeta ──→ dist/index.css
```

This supersedes the earlier two-catalog design, in which `tailwindMeta` and `tailwindDeprecationsMeta` were authored
separately. It is the same model the SCSS package uses — see
[SCSS metadata design](./scss-deprecation-metadata-design.md), which holds the shared rationale; the sections below
record only what differs for Tailwind, where the generated artifact is plain CSS.

Tailwind CSS remains the **meta-first** case of
[the rule that decides the mechanism](./scss-deprecation-metadata-design.md#the-rule-that-decides-the-mechanism): the
metadata generates `index.css`, so the metadata is where a deprecation is authored. A generated artifact is never the
source it is read back from.

## Architecture & approach

Three layers, each with one job:

| Layer                                      | Owns                                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| **catalog** (`src/theme`, `src/utilities`) | the data model of the public surface: every documented and deprecated declaration |
| **composition** (`src/css/index.ts`)       | CSS assembly: `@theme` ordering, resets, defaults, layers, keyframes              |
| **projections** (`src/meta.ts`)            | `tailwindMeta` and `tailwindDeprecations`                                         |

CSS-only plumbing — namespace resets, retained base colors, `--default-*` globals, the `--*--line-height` companions,
the skeleton animation and the `--_*` per-scheme fallbacks — is not part of the model and stays in the composition
layer.

## Components

### Declaration types

`TailwindThemeVariable` (a token) and `TailwindUtility` (a utility) each gain an optional `deprecation?: Deprecation`
from `@porsche-design-system/shared/deprecation`. Its presence is what makes a declaration deprecated, and both types
keep `description` required, deprecated declarations included.

```ts
export type TailwindCatalog =
  | TailwindThemeVariable
  | TailwindUtility
  | TailwindCatalog[]
  | { [key: string]: TailwindCatalog };

export type TailwindMeta<T> = /* T without its deprecated declarations */;

export type StylesMeta<TToken, TUtility> = { /* the hand-authored contract */ };
```

`TailwindCatalog` is the only type validation a deprecated declaration receives — the contract covers documented
declarations only.

### The contract

`StylesMeta<TToken, TUtility>` is parameterized so it can later become the shared cross-solution contract, but stays
package-local: Tailwind's shape genuinely differs today. `gradient` is a utility domain (Tailwind emits classes, not a
token), there are no `focus` / `mediaQuery` domains (both are built-in variants) and `grid` ships per-area utilities
rather than tokens.

```ts
export const tailwindMeta = stripDeprecated(tailwindCatalog) satisfies StylesMeta<
  TailwindThemeVariable,
  TailwindUtility
>;
```

The check is asymmetric in the same way as SCSS: removing, renaming, moving or deprecating a documented declaration
fails the build; adding one the contract doesn't declare passes silently and is caught by the identifier snapshot.

### Where a legacy alias lives

Author it where it renders — in the group of the declarations it aliases:

- the two `--border-width-*` aliases join `border.width`, after the `--default-border-width` they point at;
- the three `--shadow-{low,medium,high}` aliases join `shadow`, after the `sm`/`md`/`lg` scale;
- the four `--transition-duration-*` word-scale aliases join `motion.duration`.

### Identity and walkers

`tailwindIdentifier` is unchanged: the custom property of a theme variable, the class of a utility, deliberately
unprefixed. `flatten` is shared with the CSS composition layer and therefore widens catalog leaves to `CssNode`;
`meta.ts` restates the catalog's narrower leaf type once, at the single place it derives the deprecations from.

`stripDeprecated` sits beside `flatten` in `src/css/render.ts` and reuses its `property` / `selector` / `raw` leaf
predicate. The comment itself comes from the shared `getDeprecationComment(deprecation, 'block')`, so the wording is
identical to every other source's. CSS has no silent comment, so it does reach every consumer of `index.css` — measured
at 831 bytes across the nine declarations, on a 37 KB file. The terse `/* alias (deprecated) */` it replaced was sized
against a source two orders of magnitude larger.

## Data & state

Build-time data only. Each public declaration has one identity — the custom property for a token, the class for a
utility — spelled by `tailwindIdentifier` before publication.

`tailwindDeprecations` keeps the shared `Deprecations` shape every styling package publishes, so the knowledge skill's
`styleAliasSource` adapter is unchanged.

## Trade-offs

The rationale for one catalog over two, for an optional marker over dedicated deprecated types, for a derived meta type,
and for `satisfies` over an annotation is identical to SCSS and recorded in
[its design](./scss-deprecation-metadata-design.md#trade-offs). Two points are Tailwind-specific:

**Interleaved `@theme` output.** Rendering from the catalog moves the `--shadow-*` and `--transition-duration-*` aliases
from a block near the end of `@theme` to directly beneath the scales they alias. The generated custom-property set is
unchanged; only order differs. Custom properties are not order-dependent for `var()` resolution, and the aliases resolve
through `--theme(…)` at use time, so this is safe — and it reads better, since each alias now sits under its
replacement.

**One narrowing in `meta.ts`.** SCSS ended cast-free because its raw nodes left the catalog branch type. Tailwind's
`flatten` is shared with the CSS layer and must keep returning `CssNode[]`, so the catalog's leaf type is restated once
rather than introducing a second walker.

## Risks & mitigations

| Risk                                                                  | Mitigation                                                                                                          |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| A documented declaration is added that the contract does not declare. | Passes the compiler by design; the identifier snapshot test surfaces it in review.                                  |
| The `@theme` reordering hides a real change.                          | The generated `index.css` snapshot is reviewed; the custom-property set was verified identical before and after.    |
| A deprecated alias keeps a stale description of the modern API.       | The description is authored beside the declaration it describes and reviewed with it.                               |
| Replacement strings drift after a rename.                             | `replacement` is authored as `tailwindIdentifier(<current node>)` read from the catalog, never as a retyped string. |

## Testing strategy

Metadata invariants and the output snapshot are the two verification boundaries; nothing parses the generated CSS.

1. `tailwindMeta` carries no deprecated declaration, and every documented declaration has a description.
2. Snapshots of the documented and deprecated identifier lists — the review artifact for what the contract cannot check.
3. `tailwindDeprecations` publishes every deprecated declaration exactly once, spelled canonically, carrying its marker
   by reference.
4. Every `replacement` points at a documented identifier other than its own.
5. Every generated declaration is spelled uniquely, and the catalog renders exactly once into the stylesheet; the
   remaining generated properties are CSS-only plumbing from an explicit allowlist.
6. Every deprecated declaration renders the comment the shared contract generates for its marker.

## Rollout

One change: add the marker to the two leaf types, add `TailwindCatalog` / `TailwindMeta<T>` / `StylesMeta` and
`stripDeprecated`, merge each `*Deprecations` export into its domain catalog with a description, rewrite `meta.ts` to
the catalog and the two projections, point the `@theme` recipe at the domain objects, and update the tests, the
`index.css` snapshot and the collector's origin sentence.

`tailwindMeta` keeps its shape and `tailwindDeprecations` keeps its contract, so nothing downstream changes.

## Open questions

None for this change.

Open for later: aligning the four styling solutions onto one shared `StylesMeta`. The blocker is shape, not taxonomy —
`typography.heading`, `skeleton` and the other utility groups are positional arrays here and in SCSS but keyed records
in Emotion and vanilla-extract, and `grid` has three different shapes across the four.
