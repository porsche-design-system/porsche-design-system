# SCSS deprecation metadata design

## Summary

SCSS deprecations shall be authored as package-owned metadata and imported directly by the knowledge skill. The SCSS
package shall export a new `scssDeprecationsMeta` object beside the existing `scssMeta` export from
`@porsche-design-system/scss`.

`scssMeta` remains the catalog of the recommended API. `scssDeprecationsMeta` is a separate, domain-keyed catalog that
contains only deprecated public variables and mixins. Both catalogs use the existing `ScssVariable` and `ScssMixin`
types, extended with an optional `deprecation` field.

The catalogs are authored separately but declarations are not duplicated. Deprecating a current API means moving its
existing node from `scssMeta` to `scssDeprecationsMeta` and adding `deprecation`. The explicit `ScssMeta` shape is
updated at the same time because the recommended public catalog genuinely changed. No separate full-catalog type or
recursive type-level filtering is introduced.

This change covers all current top-level SCSS variable and mixin deprecations atomically. Deprecated map keys and other
internal plumbing remain outside the public deprecation catalog.

## Architecture & approach

The SCSS package becomes authoritative for three outputs:

```text
domain-owned current and deprecated SCSS nodes
  -> scssMeta and scssDeprecationsMeta exports
  -> generated dist/*.scss declarations
  -> SCSS skill documentation and knowledge-skill deprecations.md
```

No knowledge-skill code may read generated SCSS files, inspect comments, resolve package directories, or parse SCSS
syntax. Its SCSS collector becomes a small adapter over `scssDeprecationsMeta`.

The two public catalogs have distinct responsibilities:

- `scssMeta` contains only the recommended, documented API.
- `scssDeprecationsMeta` contains only deprecated public variables and mixins.
- Both catalogs reuse the existing renderable node model.
- Deprecations are authored beside current nodes in the relevant domain module, such as `blur` and `blurDeprecations` in
  `src/theme/blur.ts`.
- A node exists in exactly one catalog and is moved, not copied, when its lifecycle changes.

These two objects are the package's only authoritative metadata catalogs. Existing public helpers such as `kindOf`,
`flatten`, exported types, the Sass entry point, and `./skill` may remain available, but they do not define additional
SCSS declarations. Domain objects, composition descriptors such as `scssFileMeta`, and internal plumbing are not exposed
through package subpaths.

Every generated public variable or mixin must originate from exactly one of the two catalogs. The composition layer may
add only non-public plumbing such as `@use`, `@forward`, lookup maps, and raw helpers that are not independently
supported consumer APIs.

The SCSS migration is atomic. A temporary mixed collector would preserve the filesystem parser and make completeness
depend on merging two sources.

## Components

### SCSS node types

Extend the existing node types in `packages/styles/projects/scss/src/types.ts` with an optional deprecation object:

```ts
export type ScssDeprecation = {
  /** Optional note replacing the package default. */
  message?: string;
  /** Canonical consumer-facing identifier, such as `$radius-sm` or `focus-visible()`. */
  replacement?: string;
};

export type ScssVariable = {
  // Existing fields.
  deprecation?: ScssDeprecation;
};

export type ScssMixin = {
  // Existing fields.
  deprecation?: ScssDeprecation;
};
```

The presence of `deprecation`, including an empty object, means the node is deprecated. `deprecation: {}` uses the
package default message and has no replacement. Variable versus mixin is already inferable from the existing node shape,
so no duplicate deprecation `kind` field is needed.

No `DeprecatedScssVariable`, `DeprecatedScssMixin`, full-catalog, or recursive filtered-view types are added. The
`scssDeprecationsMeta` object keeps its inferred type and is checked against existing branch types. Package tests
enforce that each of its leaves has `deprecation`.

This keeps one declaration model. Deprecated nodes remain complete render inputs: variables carry `name` and `value`;
mixins carry `name`, optional `signature`, and `raw`. Custom legacy implementations therefore do not require an opaque
deprecated `ScssRaw` block.

The existing generic `comment` field is not the source of deprecation semantics. The renderer creates deprecation
comments from `deprecation`.

### Deprecation message helper

Add one package-local helper that turns a node's `deprecation` object into the complete generated message. Both the SCSS
renderer and the knowledge-skill adapter use this helper, so default wording remains owned by the SCSS package without
requiring resolved metadata subtypes.

Replacement identifiers use their consumer-facing SCSS spelling:

- variables include `$`, for example `$radius-sm`;
- mixins include `()`, for example `focus-visible()`.

When a replacement is another metadata node, author its value from that node's `name` through a canonical identifier
helper. The exported `deprecation.replacement` remains a simple string.

Default messages are:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

The package helper applies the default and derives the replacement sentence:

```text
Use <replacement> instead. <message>
```

Exceptional migrations may provide `message`. The knowledge skill does not parse comments or maintain its own fallback
wording.

### Domain metadata

Each domain module exports its current metadata and deprecated metadata beside each other:

```ts
const frosted = {
  name: '$blur-frosted',
  value: blurFrosted,
  description: '...',
} satisfies ScssVariable;

export const blur = {
  frosted,
} satisfies ScssMeta['blur'];

export const blurDeprecations = {
  legacyFrostedGlass: {
    name: 'pds-frosted-glass',
    raw: `  backdrop-filter: ${blurFrosted};
  -webkit-backdrop-filter: ${blurFrosted};`,
    deprecation: {
      replacement: scssIdentifier(frosted),
    },
  },
} satisfies ScssBranch;
```

The migration replaces all current deprecated `ScssRaw` blocks with structured nodes. Non-public support data remains
ordinary plumbing. For example, the maps used by `pds-focus()` remain raw internal nodes, while `pds-focus()` itself
becomes a deprecated mixin node.

To deprecate `$blur-frosted` later, maintainers move its existing object to `blurDeprecations` and add the field:

```ts
const frosted = {
  name: '$blur-frosted',
  value: blurFrosted,
  description: '...',
  deprecation: {
    replacement: '$new-blur-token',
  },
} satisfies ScssVariable;

export const blur = {} satisfies ScssMeta['blur'];

export const blurDeprecations = {
  // Existing deprecated mixins remain here.
  frosted,
} satisfies ScssBranch;
```

The `frosted` property is also removed from `ScssMeta['blur']`. This type edit is intentional: it records that the
recommended cross-solution shape changed. No additional combined-catalog type needs updating. `$blur-frosted` remains in
generated SCSS and is added to `deprecations.md`.

### Root deprecation catalog

Assemble `scssDeprecationsMeta` beside the existing `scssMeta` in `src/meta.ts` and export both from `src/index.ts`. The
package root already provides the stable JavaScript metadata export, so no new package subpath is needed.

```ts
export const scssMeta = {
  border,
  blur,
  // Remaining current domains.
} satisfies ScssMeta;

export const scssDeprecationsMeta = {
  border: borderDeprecations,
  blur: blurDeprecations,
  // Remaining deprecated domains.
} satisfies Record<keyof ScssMeta, ScssBranch>;
```

`Record<keyof ScssMeta, ScssBranch>` reuses the existing root domain keys without defining a detailed
`ScssDeprecationsMeta` type. Every root domain is explicit, including empty arrays, so a checked domain remains
distinguishable from an omitted domain.

### SCSS renderer

Extend `renderNode()` to render variables and mixins carrying `deprecation`. Every deprecated declaration receives one
standalone comment immediately above it:

```scss
/* @deprecated Use $radius-sm instead. This API will be removed with the next major release. */
$pds-border-radius-small: 4px;
```

For an API without a replacement:

```scss
/* @deprecated This API will be removed with the next major release and has no replacement. */
$pds-breakpoint-base: 0;
```

The old `alias (deprecated)` and `(deprecated)` marker variants are removed. They are no longer needed because comments
are generated from structured data rather than scraped for meaning.

`scssFileMeta` composes current and deprecated domain branches in the same declaration order as today. Declaration
names, values, signatures, bodies, file placement, and forwarding behavior remain unchanged. The only intentional
generated SCSS difference is the standardized deprecation comments.

### Knowledge-skill adapter

Replace the filesystem implementation in
`packages/storefront/projects/skills/src/knowledge/deprecations/collectors/scss.ts` with a metadata adapter that imports
`flatten` and `scssDeprecationsMeta` from `@porsche-design-system/scss`.

For each deprecated node, the adapter derives only knowledge-skill concerns:

```ts
{
  id: `styleAlias/scss/${identifier}`,
  kind: 'styleAlias',
  source: 'scss',
  identifier,
  message: node.deprecation.message,
  replacement: node.deprecation.replacement,
  reference: 'references/styles/scss.md',
}
```

The adapter formats a mixin identifier with `()` and leaves variable names unchanged. It preserves
`scssDeprecationsMeta` order and performs no additional sorting. JavaScript object and array iteration order is
deterministic, so the package metadata owns the rendered order. Stable rule IDs depend only on identifiers, not row
position. The source origin changes from shipped-partial parsing to the `@porsche-design-system/scss` metadata export.

SCSS remains adapted into the skill-owned `DeprecationEntry` type. A cross-package shared deprecation type is deferred
until a second metadata producer needs it.

## Data & state

The metadata is immutable build-time data; no runtime state or lifecycle is introduced.

Each public deprecated entry has one stable identity:

```text
variable: its $-prefixed name
mixin: its name followed by ()
rule ID: styleAlias/scss/<identity>
```

The package owns:

- the declaration shape from which variable versus mixin is inferred;
- declaration name and implementation;
- deprecation message;
- canonical primary replacement, when one exists.

The knowledge skill owns:

- `styleAlias/scss/` rule-ID construction;
- source category and human-readable origin;
- the SCSS reference path;
- Markdown rendering.

The package metadata does not contain skill paths, audit effort, or rule IDs.

Only top-level public SCSS variables and mixins are included. Deprecated keys embedded in `$pds-breakpoints`, internal
maps, and other support nodes remain outside this phase so the migration does not silently expand the existing audit
contract.

## Trade-offs

### Separate catalogs versus a combined catalog

**Chosen:** author separate current and deprecated catalogs with the same leaf types.

This preserves `scssMeta` as the recommended API catalog mirrored by Emotion and vanilla-extract. A deprecation moves
one node rather than duplicating it. The accompanying `ScssMeta` type change is useful because it makes changes to the
recommended cross-solution shape explicit.

A combined catalog with derived views was rejected because preserving precise output types would require recursive
mapped types and filtering arrays and nested records. Returning broad `ScssBranch` views would instead lose the exact
typing and autocomplete available today. Exposing one combined public `scssMeta` was rejected because every existing
consumer would need to remember to filter legacy APIs.

### Optional field versus a standalone deprecation type

**Chosen:** add optional `deprecation` to `ScssVariable` and `ScssMixin` without introducing deprecated leaf subtypes.

This makes deprecation a lifecycle state of the same renderable declaration. The deprecated catalog keeps an inferred
type, while package tests enforce that all of its leaves carry the field. A standalone normalized index would duplicate
declarations or leave generated SCSS independently authored.

### String replacements versus exported node references

**Chosen:** authored metadata derives canonical replacement strings from current node names where possible.

Exporting full node references would duplicate current metadata inside the deprecation object and complicate consumers.
Unrelated free-form prose would require parsing. A canonical identifier helper provides linkage while keeping the public
shape small.

### SCSS-owned type versus a shared package contract

**Chosen:** keep the first implementation SCSS-owned.

Introducing a shared contract before another producer is migrated would add dependency and build-order work without
proving the abstraction. The knowledge skill's adapter is intentionally small and can later target a shared contract.

### Standardized comments versus byte-identical output

**Chosen:** standardize all generated comments as standalone `@deprecated` comments.

This intentionally changes comments in shipped SCSS but does not change declarations or behavior. It removes the
historical marker distinction that existed only for the parser and gives package consumers actionable guidance directly
in generated source.

## Risks & mitigations

| Risk                                                                    | Mitigation                                                                                                                                                             |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A legacy declaration is missed during the atomic migration.             | Preserve the existing SCSS rule-ID/count snapshots and migrate every current collector result before deleting parser logic.                                            |
| A node is copied instead of moved when deprecated.                      | Assert that identifiers are unique across `scssMeta` and `scssDeprecationsMeta`.                                                                                       |
| A generated declaration changes behavior while moving out of `ScssRaw`. | Snapshot every generated partial and review changes so only standardized comments differ. Keep names, values, signatures, bodies, order, and file placement unchanged. |
| Replacement strings drift after a current API rename.                   | Derive replacements from current metadata node names through the canonical identifier helper whenever a corresponding node exists.                                     |
| Custom mixins appear not to fit the model.                              | Keep their complete implementation in `ScssMixin.raw`; only non-public support maps remain separate raw plumbing.                                                      |
| Deprecated and current APIs become mixed in normal docs.                | Keep `scssMeta` current-only and make SCSS skill serialization continue to read only it.                                                                               |
| Future code adds another opaque deprecated `ScssRaw` block.             | Make optional `deprecation` on public catalog nodes the documented convention, and test that `scssDeprecationsMeta` contains only structured variable/mixin nodes.     |
| Comment changes surprise consumers comparing generated files.           | Treat comment normalization as an explicit release-note-worthy source change; declarations and compiled behavior remain stable.                                        |
| Metadata reordering creates noisy Markdown changes.                     | Treat metadata order as the rendered contract and review intentional ordering changes through generated snapshots.                                                     |

## Testing strategy

### SCSS package

Add tests that prove:

1. `scssMeta` and `scssDeprecationsMeta` are exported from `@porsche-design-system/scss`.
2. Every `ScssMeta` root domain is represented in `scssDeprecationsMeta`, including explicit empty branches.
3. Every flattened `scssDeprecationsMeta` node is a variable or mixin carrying `deprecation`.
4. Identifiers are unique within and across both catalogs.
5. Every generated public variable and mixin is composed from exactly one catalog node; raw composition nodes contain
   only explicitly internal plumbing.
6. Every replacement is canonical (`$name` for variables, `name()` for mixins) and differs from the deprecated
   identifier.
7. `scssMeta` remains free of nodes carrying `deprecation`.
8. An authored empty `deprecation: {}` receives the correct default message.
9. Generated partial snapshots contain the same declarations in the same files and order, with only the expected
   standardized comments changed.
10. Generated comments contain the replacement sentence when present and the no-replacement lifecycle message otherwise.
11. Existing Sass compilation tests continue to compile the public package.

No test parses generated SCSS to reconstruct metadata. Metadata invariants and output snapshots are the two verification
boundaries.

### Knowledge skills package

Update tests to prove:

1. the SCSS source imports package metadata and performs no filesystem access;
2. the complete existing SCSS rule-ID set remains present exactly once;
3. entry IDs remain stable and rendered order matches `scssDeprecationsMeta`;
4. metadata replacements appear in the Markdown remediation column;
5. every SCSS entry links to `references/styles/scss.md`;
6. generated `deprecations.md` snapshots contain the enriched SCSS guidance;
7. framework-specific outputs retain the same SCSS section because SCSS spelling is framework-independent.

The old SCSS syntax, declaration-boundary, marker, and generated-directory tests are removed.

## Rollout

Implement this as one SCSS-focused change:

1. Add the optional deprecation field, canonical identifier helper, and deprecation message helper.
2. Add deprecated metadata beside each current domain and convert deprecated variables and mixins from `ScssRaw` blocks
   to renderable nodes carrying `deprecation`.
3. Separate internal support maps or snippets from their public deprecated mixins where they currently share one raw
   block.
4. Assemble and export the domain-keyed `scssDeprecationsMeta` beside the existing `scssMeta`.
5. Extend the SCSS renderer to generate standardized standalone `@deprecated` comments.
6. Update `scssFileMeta` to render deprecated metadata branches in their current files and positions.
7. Update SCSS metadata, generation, snapshot, and compilation tests.
8. Replace the knowledge skill's SCSS filesystem collector with the direct metadata adapter.
9. Update skills tests and generated `deprecations.md` snapshots, confirming stable rule IDs and enriched replacements.
10. Remove SCSS-specific filesystem parsing and marker tests. Keep shared package-root utilities while other collectors
    still depend on them.

No feature flag or compatibility adapter is needed. The package build already emits metadata before skill generation,
and the skills package already declares `@porsche-design-system/scss` as a direct development dependency.

## Open questions

None for the SCSS phase.

Future phases may decide whether deprecated map keys should become first-class audit entries and whether the SCSS-owned
deprecation contract should move to a shared low-level package once another metadata producer adopts it.
