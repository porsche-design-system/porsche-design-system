# SCSS metadata design

## Summary

The SCSS package authors **one catalog**. Every public declaration lives in it exactly once — documented and deprecated
alike — and deprecation is an optional `deprecation` marker on the declaration itself. Deprecating an API therefore
never moves a node between catalogs: it adds one field.

The catalog is what the shipped partials are generated from. The package's two public metadata exports are projections
of it:

```text
scssCatalog ──┬─ stripDeprecated ─→ scssMeta          (documented API, checked against the contract)
              ├─ flatten + filter ─→ scssDeprecations (flat list for the knowledge skill)
              └─ scssFileMeta ─────→ dist/*.scss
```

`scssMeta` keeps the shape it has today and remains the only thing the storefront and the SCSS skill read.
`scssDeprecations` keeps the shared `Deprecations` shape every styling package publishes.

This supersedes the earlier two-catalog design, in which `scssMeta` and `scssDeprecationsMeta` were authored separately
and a deprecation moved a node from one to the other. The conventions that design settled for the other sources are
unchanged and still recorded [below](#conventions-for-other-sources); SCSS's own divergence from two of them is noted
there.

## Architecture & approach

Three layers, each with one job:

| Layer                                      | Owns                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| **catalog** (`src/theme`, `src/utilities`) | the data model of the public surface: every documented and deprecated declaration     |
| **composition** (`src/scss/index.ts`)      | source assembly: file layout, ordering, `@use` headers, blank lines, private plumbing |
| **projections** (`src/meta.ts`)            | `scssMeta` and `scssDeprecations`                                                     |

Two rules keep the layers honest:

- **The catalog is everything the public API is made of.** Plumbing is not part of the public API, so it stays out —
  private helper mixins, lookup maps and `@use` headers are composition concerns.
- **Nothing downstream parses SCSS.** The knowledge skill's collector is an adapter over `scssDeprecations`; the docs
  read `scssMeta`.

### Deprecating in place

A deprecated declaration keeps its position and its render inputs, and gains a marker:

```ts
sm: {
  name: '$radius-sm',
  value: radiusSm,
  description: 'Holds a **small** `border-radius`.',
  deprecation: { replacement: scssIdentifier(radius.md) },
},
```

Three things follow automatically: it disappears from `scssMeta`, it appears in `scssDeprecations`, and it renders with
a generated `// @deprecated …` comment above it. Because `scssMeta`'s type is derived, the contract no longer sees the
declaration and `tsc` fails until the contract is edited — deprecating a documented API stays a conscious, reviewable
change to the public shape.

## Components

### Declaration types

```ts
export type ScssVariable = {
  name: string;
  value: string | number;
  description: string;
  comment?: string;
  deprecation?: Deprecation;
};

export type ScssMixin = {
  name: string;
  signature?: string;
  raw: string;
  description: string;
  comment?: string;
  deprecation?: Deprecation;
};

export type ScssRaw = { raw: string };
```

`Deprecation` is the shared marker from `@porsche-design-system/shared/deprecation` — its presence is what makes a
declaration deprecated, even when both its fields are omitted. `ScssRaw` is composition-only: verbatim snippets such as
lookup maps, the `@forward` index and blank separators, never part of the catalog.

`description` is required on every declaration, deprecated ones included. The alternative — optional on the type and
required through the contract — keeps the deprecated surface free of prose nothing renders, but makes the two leaf types
less obvious and pushes an intersection into the contract instantiation. A required field is simpler to read and the
knowledge skill's deprecation table renders it, so the prose is not dead.

### The catalog

```ts
export type ScssCatalog = ScssVariable | ScssMixin | ScssCatalog[] | { [key: string]: ScssCatalog };
```

A catalog is a leaf, a list, or a group. Each domain module exports one object `satisfies ScssCatalog`, and
`src/meta.ts` assembles them:

```ts
export const scssCatalog = { border, blur, breakpoint, color, font /* … */ };
```

This is the **only** type validation a deprecated declaration receives — the contract covers documented declarations
only — so it is what catches a typo'd or malformed legacy alias.

Where a legacy alias belongs follows one rule: **author it where it renders.**

- Next to the API that replaces it, in the same group (`$pds-border-radius-small` beside `$radius-sm`).
- In its taxonomy group when the group exists but has no documented members (`border.width`, `typography.display`).
  These strip to empty containers, exactly as they are hand-authored empty today.
- As a root-level key of its domain when the taxonomy has no such concept — the `$pds-font-hyphenation-*`,
  `$pds-font-style-*` and `$pds-font-variant` aliases. They are leaves, so they strip without leaving a trace.

The catalog itself stays internal. Publishing it would invite consumers to re-derive what the package already publishes.

### `ScssMeta<T>`: the projection

```ts
export type ScssMeta<T> = T extends { deprecation: unknown }
  ? never
  : T extends readonly (infer U)[]
    ? ScssMeta<U>[]
    : T extends ScssVariable | ScssMixin
      ? T
      : { [K in keyof T as [ScssMeta<T[K]>] extends [never] ? never : K]: ScssMeta<T[K]> };
```

Four arms: _deprecated → gone; list → map; leaf → keep; group → recurse._ The runtime walker mirrors it and returns
leaves by reference, so meta, deprecations and generated SCSS can never describe different objects:

```ts
export const stripDeprecated = <T>(branch: T): ScssMeta<T> =>
  (Array.isArray(branch)
    ? branch.filter((node) => !isDeprecated(node)).map(stripDeprecated)
    : isLeaf(branch as ScssCatalog)
      ? branch
      : Object.fromEntries(
          Object.entries(branch as object)
            .filter(([, node]) => !isDeprecated(node))
            .map(([key, node]) => [key, stripDeprecated(node)])
        )) as ScssMeta<T>;
```

The type-level half is not optional. Because `deprecation` is an optional field, a deprecated declaration is still a
valid `ScssVariable`: without the derivation the contract cannot see deprecations at all, and the emitted `.d.ts` would
advertise declarations that `stripDeprecated` removed at runtime. `ScssMeta<T>` is what makes the published type equal
the published object.

TypeScript resolves the type at declaration emit, so `meta/esm/meta.d.ts` keeps the same flat per-declaration shape it
has today, with deprecated keys already absent.

### `StylesMeta`: the contract

```ts
export type StylesMeta<TToken, TUtility> = {
  border: { radius: { xs: TToken /* … */ }; width: TToken[] };
  typography: { heading: TUtility[]; text: TUtility[]; display: TUtility[] };
  // … one entry per domain
};
```

Hand-authored intent: how styles are categorised and which tokens and utilities are meant to exist. It is parameterized
over the leaf types so it can later become the single cross-solution contract every styling package implements, but it
stays package-local until the other three adopt the catalog model — aligning them is a separate exercise.

`StylesMeta` states _what we promise_; `ScssMeta<T>` states _what we have_. The `satisfies` is where they meet:

```ts
export const scssMeta = stripDeprecated(scssCatalog) satisfies StylesMeta<ScssVariable, ScssMixin>;
```

`satisfies` rather than an annotation, so the published type stays the precise derived shape rather than collapsing to
the contract.

The check is asymmetric, and knowing which half it covers matters:

- Removing, renaming, moving or deprecating a documented declaration **fails the build** with a located error
  (`The types of 'border.radius.sm' are incompatible … Property 'description' is missing`).
- **Adding** a documented declaration the contract does not declare **passes silently** — assignment performs no
  excess-property check. The identifier snapshot test is what surfaces it in review.

### The split

```ts
export const scssMeta = stripDeprecated(scssCatalog) satisfies StylesMeta<ScssVariable, ScssMixin>;

export const scssDeprecations: Deprecations = flatten(scssCatalog)
  .filter(isDeprecated)
  .map((node) => ({ identifier: scssIdentifier(node), deprecation: node.deprecation }));
```

`scssDeprecations` keeps the shape and the order guarantee every styling package publishes, so the knowledge skill's
`styleAliasSource` adapter is unchanged. Order is catalog traversal order, which is the rendered order of the
deprecation index.

### Composition and rendering

Partials render from catalog branches. Legacy aliases therefore emit beside the API that replaces them rather than in a
trailing block per file — a one-time change to `dist/*.scss` with no change to declarations, values or behaviour. The
composition layer keeps its per-file descriptors, because the domain and file axes genuinely differ: `grid` is sliced
across twelve partials, `_display.scss` is one typography sub-branch, and `_index.scss` is derived from the partial
list.

`renderNode` is unchanged in shape: it prefixes `getDeprecationComment(node.deprecation, 'line')` to any declaration
carrying the marker, so the wording and the syntax both come from the shared contract.

## Data & state

Build-time data only. Each public declaration has one identity — `$name` for a variable, `name()` for a mixin — spelled
by `scssIdentifier` before publication, so no consumer re-spells a name.

The package owns declaration shape, name, implementation, description, the deprecation message and its canonical
replacement. The knowledge skill owns rule IDs, source category, reference paths and rendering.

Deprecated keys inside internal maps (`$pds-breakpoints`) remain plumbing and outside the public deprecation surface.

## Trade-offs

### One catalog versus two

**Chosen:** one. Two catalogs made every deprecation a move between files or objects, required each domain to export a
second symbol, and forced the composition layer to interleave two branches per file. One catalog makes deprecating a
one-field edit and removes the "declared in exactly one catalog" invariant entirely, because there is only one place a
declaration can be.

The earlier design rejected this on the grounds that deriving precise output types would need recursive mapped types.
That is true — it needs one, `ScssMeta<T>`, at nine lines — and in exchange the hand-written ~200-line shape, the
domain-keyed deprecations catalog and thirteen `*Deprecations` exports all disappear.

### Optional marker versus dedicated deprecated types

**Chosen:** an optional `deprecation` field on `ScssVariable` / `ScssMixin`.

The `Deprecated<T>` wrapper existed to keep two catalogs from absorbing each other's entries. With one catalog there is
nothing to keep apart, and the wrapper's cost is real: four derived types, a distributive `Omit`, and leaf types that no
longer read as the render inputs they are. The compiler check the wrapper provided is replaced by a stronger one — the
contract, which sees the _absence_ of a declaration rather than the presence of a field.

### Derived meta type versus a hand-written shape

**Chosen:** derived, checked against the contract.

A hand-written `ScssMeta` was not the published surface anyway — the emitted `.d.ts` has always been the inferred shape
— so it was an authoring contract duplicating an object we already author. Deriving makes drift impossible; the contract
preserves the part that mattered, which is stating intent and forcing deprecations to be acknowledged.

### Plumbing outside the catalog

**Chosen:** outside.

The failure modes are asymmetric. Plumbing missing from a partial fails loudly — `sass.compileString` in the unit tests,
the per-file snapshots, VRT. Plumbing leaking into the catalog without an `internal` marker would silently become
documented public API in the storefront and the skill, and consumers would start depending on it. Keeping it out also
avoids a third lifecycle state, since nothing structural distinguishes `-prose-heading` from a documented mixin.

### Interleaved output versus a trailing legacy block

**Chosen:** interleaved, so the catalog is the render source without a second collection pass.

Preserving the trailing block would have required composition to gather deprecated declarations by marker and emit them
last, making render order stop matching catalog order. Interleaving puts each legacy alias next to its replacement,
which reads better in the shipped partial.

### Package-local contract versus shared

**Chosen:** package-local, parameterized.

A shared `StylesMeta` is the goal, but the four solutions are not aligned enough yet for a shared shape to be anything
but a pile of optional keys. Parameterizing now costs nothing and makes the extraction mechanical later.

## Risks & mitigations

| Risk                                                                                           | Mitigation                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScssMeta<T>` strains TypeScript on the real catalog (~300 leaves, a 600-line `color` domain). | Verified first, before any authoring change. Fallback is to derive per domain (`{ border: stripDeprecated(border), … }`), keeping each instantiation shallow.                   |
| A documented declaration is added that the contract does not declare.                          | Passes the compiler by design; the identifier snapshot test surfaces it in review.                                                                                              |
| A declaration is deprecated but its `description` is left describing the modern API.           | The description is rendered in the deprecation index, so stale prose is visible rather than dead.                                                                               |
| Replacement strings drift after a rename.                                                      | `replacement` is authored as `scssIdentifier(<current node>)` read from the catalog, never as a retyped string.                                                                 |
| The one-time `dist/*.scss` reordering hides a real change.                                     | Per-file snapshots are reviewed declaration by declaration; names, values, signatures, bodies and file placement stay identical.                                                |
| A documented declaration inside a mixed array publishes as `{ …; deprecation?: undefined }`.   | Cosmetic only — TypeScript's union normalization for mixed array literals. It remains assignable to `ScssMixin`; `Omit` and contextual typing both made the emitted type worse. |

## Testing strategy

The two verification boundaries stay what they were: metadata invariants and output snapshots. Nothing parses generated
SCSS.

Invariants that survive, now stated against one catalog:

1. Every identifier is unique across the catalog.
2. Every `replacement` points at a canonical identifier of a **documented** declaration, other than its own.
3. Every generated public declaration comes from exactly one catalog node, and every catalog node is rendered exactly
   once — the plumbing allowlists stay, because plumbing stays outside the catalog.
4. Default wording: an empty `deprecation: {}` yields the no-replacement sentence, a replacement prefixes
   `Use … instead.`, and an authored `message` overrides the default.
5. Existing Sass compilation tests keep compiling the shipped partials.

Invariants that die with the second catalog: "every root domain is declared, empty branches included", "holds only
variables and mixins carrying a deprecation", and "a declaration lives in exactly one catalog". They described a
structure that no longer exists.

Added: a snapshot of the documented and deprecated identifier lists. It is the review artifact for the half the contract
cannot check — a new declaration, a forgotten contract entry, or a reordering all appear as a readable diff.

The skills package tests are unchanged in substance: the collector still derives from `scssDeprecations`, and the
completeness gate still builds its expectations from the published list.

## Rollout

One change, in this order:

1. Verify `ScssMeta<T>` against the real catalog before anything else.
2. Rewrite `src/types.ts`: the two leaf types, `ScssRaw`, `ScssCatalog`, `ScssMeta<T>`, `StylesMeta`; delete the
   `Deprecated*` aliases and `ScssDeprecationsMeta`.
3. Add `stripDeprecated` beside `flatten`.
4. Merge each domain's `*Deprecations` export into its catalog object, adding the missing descriptions.
5. Rewrite `src/meta.ts` to the catalog and the two projections; delete `scssDeprecationsMeta`.
6. Point the composition layer at catalog branches.
7. Update the SCSS unit tests and regenerate the partial snapshots.
8. Add the description column to the knowledge skill's deprecation table.
9. Update `packages/styles/AGENTS.md` and the storefront collector's origin comment.

No feature flag and no compatibility shim: `scssMeta` keeps its shape and `scssDeprecations` keeps its contract, so
nothing downstream changes.

## Conventions for other sources

The remaining per-source designs — components, Emotion, vanilla-extract, Tailwind CSS, stylesheets, tokens, icons and
partials — follow the conventions this implementation settled on. Each doc records only how they apply to its package.
The shared module they all build on is specified in
[`docs/deprecation-contract-design.md`](./deprecation-contract-design.md).

### The rule that decides the mechanism

One invariant governs every source: **the knowledge skill never parses another package's artifacts — it imports what
that package publishes about itself.** How a package produces that depends on where its declarations are authored, since
that is the only place a deprecation can be recorded without being stated twice:

| The declaration is authored in…                | The deprecation is…                                         | Sources                                                |
| ---------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| metadata, which generates the shipped artifact | authored in a deprecated catalog beside the current one     | scss, Tailwind CSS, stylesheets                        |
| code that can carry a `@deprecated` annotation | read from that annotation, by the package itself            | Emotion, vanilla-extract, tokens, partials, components |
| an artifact with no annotation site            | authored in a catalog, because there is nowhere else for it | icons                                                  |

Components reach the middle row indirectly: `componentMeta` is generated from Stencil source and its docblocks, so
`componentDeprecationsMeta` is derived from that metadata rather than separately authored.

Every row ends in the same published shape: exactly one deprecation export, `<pkg>Deprecations`, typed by the shared
`Deprecations` — the package's deprecated surface as an ordered flat list of `{ identifier, deprecation }` on its
metadata entry. Identifiers are spelled by the package _before_ publication, so no consumer re-spells a name and the
collectors need no per-source callback. Where a package keeps a grouped `<pkg>DeprecationsMeta` to derive it from, that
stays internal: the grouping is authoring and routing information, not something a consumer needs, and publishing both
invites downstream code to re-walk a tree it should not know about. Markers carry the **shared contract** from
`@porsche-design-system/shared/deprecation` — `Deprecation` (`{ note?, replacement? }`), the `Deprecated<T>` wrapper,
`isDeprecated` and `getDeprecationComment`, which owns both the wording and the comment syntax. The rows differ only in
how the marker is produced — authored beside the declaration, or recovered from its annotation.

It is a _deep_ entry point on purpose: the metadata bundles import it at runtime, and the package barrel costs 53
modules where the contract costs one.

Every row expresses a structured `replacement`. The first and third author one; the middle row recovers it from a
`{@link …}` reference in the annotation, so the rendered remediation column is populated the same way for every source.
A package in the middle row still needs no wording or identity helper: its sentence is generated like everyone else's
and its identifier is the export name.

Conventions 1 and 2 shape every deprecated surface; 3–6 and 8 describe an authored one and apply to the first and third
rows. Conventions 7 and 9 apply to every source. Conventions 10–13 describe the annotation-first row.

1. **The marker is a field, not a parallel type.** A declaration is deprecated because it carries a `deprecation`;
   nothing else distinguishes it. Where a package generates its declarations (scss, Tailwind CSS, stylesheets) the field
   is optional on the leaf type and authored in place, so deprecating is one edit and never a move between catalogs.
   Where they are hand-written TypeScript the node is `Deprecated<{ name }>`, produced by the extractor. Do not
   redeclare a package-local marker type; a package needing more intersects the shared one.
2. **`description` follows the leaf type.** `Deprecated<T>` strips nothing. A generated declaration keeps its
   `description` when deprecated, because it is still rendered into the artifact and read by the catalog's reader; an
   annotation-derived node never had one, and gains none — its documentation is the annotation. A package that wants the
   omission spells it locally (`Deprecated<Omit<TokenMeta, 'description'>>`) so it is visible where it is made.
3. **Fixed default wording, shared not repeated.** One sentence:
   `This API will be removed with the next major release.`, prefixed by `Use <replacement> instead.` when there is a
   replacement and followed by the optional `note`. It is built by the single shared `getDeprecationComment`, which also
   wraps it in the target comment syntax. The audit does not repeat the lifecycle sentence per row — its reference
   states it once — so it renders the `replacement` and the `note` only. A package that restated them would be free to
   drift from an index that renders every source in one table. Only _identity_ stays package-owned, because `$name`
   versus `name()` versus `--custom-property` is genuinely package-specific.
4. **Canonical identity helper.** Author `replacement` as `<pkg>Identifier(<current node>)` read from the exported
   current catalog, never as a retyped string and never via an intermediate local const.
5. **Comments come from `getDeprecationComment`, and their cost is measured.** It owns the sentence and the syntax, so
   pick the `style` the artifact needs — `line` for SCSS (silent, emitted nowhere), `jsdoc` for TypeScript (stripped
   from JS, kept in `.d.ts` where it drives IDE strikethrough), `block` for CSS. CSS has no silent form, so a comment
   there ships to every consumer verbatim: measure the delta rather than assume it. Tailwind's nine declarations cost
   831 bytes on a 37 KB file, which is worth paying; a source with two orders of magnitude more would not be.
6. **Catalogs are authored as literal repeated objects.** No factory functions, no `.map()` over a tuple table, and no
   intermediate consts extracted purely to be referenced — read the exported catalog directly. Generated catalogs
   (tokens, components, icons, Emotion's and vanilla-extract's annotation-derived catalogs) are exempt, since their
   authoring surface is the generator input.
7. **The adapter maps one-to-one.** It adds only the rule ID, source category and reference path, preserves catalog
   order, sorts nothing, and touches no filesystem. Because every package publishes the same shape, that mapping is a
   single shared function (`collectors/styleAlias.ts`) and a styling collector is pure configuration: its published
   list, its origin sentence and its reference. Nothing else.
8. **Package tests assert both directions.** Every generated public declaration originates from exactly one catalog,
   _and_ every catalog node is rendered exactly once.
9. **The skills completeness gate derives from the published list** — never a hand-authored identifier list, never a
   re-parse of the generated artifact. Since every styling source has the same shape, the gate is one table of
   `{ category, deprecations, reference, collector, specifier }` rows driving one set of expectations; a new styling
   solution is a row.
10. **The annotation is the source; nothing restates it.** A hand-authored catalog beside an already-annotated
    declaration is a second place to keep in sync, and it is not small: authoring one for Emotion measured 741 lines of
    descriptors plus types, helpers and tests, to produce a 120-row table. Improving guidance means improving the
    annotation, which fixes the IDE hint at the same time. This holds until the package's declarations are generated
    from metadata, at which point the annotation is emitted by `getDeprecationComment` and stops being hand-maintained.
11. **The package resolves its own public surface, and publishes the result as a catalog.** Use the type checker —
    `getExportsOfModule` over the public barrels, `getAliasedSymbol` to reach the declaration, `getJsDocTags` for the
    annotation — never a directory walk, so the shared internals those directories also hold cannot be reported to a
    project. The extractor lives in the package and runs at **build time**, emitting a generated `<pkg>DeprecationsMeta`
    on the metadata entry: that entry is a bundled artifact other consumers import, and neither the TypeScript compiler
    nor reads of `src` belong in their build graph. The skill imports the catalog, never the extractor.
12. **The annotation is structured, and the extractor validates it.** The replacement is a `{@link otherExport}`
    reference, taken as its own part of the tag and never as a phrase recovered from the sentence around it — there is
    no prose parsing anywhere. The rest of the annotation must read exactly as `getDeprecationComment` renders it for
    that marker, optionally followed by extra guidance which becomes the `note`; anything else **fails the build**,
    naming the export and printing the expected form. That comparison is what keeps a hand-maintained annotation
    identical to a generated one until the package generates it.
13. **The package test compares the catalog with the package's own runtime exports** — never a hand-written list — so an
    unannotated legacy export fails the build, and with a fresh extraction, so the generated catalog cannot go stale.

## Open questions

None for this change.

Open for later: whether `StylesMeta`, `ScssMeta<T>` and `stripDeprecated` move to `@porsche-design-system/shared` once a
second styling package adopts the catalog model, and whether deprecated map keys should become first-class audit
entries.
