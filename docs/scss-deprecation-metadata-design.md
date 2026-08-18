# SCSS deprecation metadata design

## Summary

SCSS deprecations shall be authored as package-owned metadata and imported directly by the knowledge skill. The SCSS
package shall export a new `scssDeprecationsMeta` object beside the existing `scssMeta` export from
`@porsche-design-system/scss`.

`scssMeta` remains the catalog of the recommended API. `scssDeprecationsMeta` is a separate, domain-keyed catalog that
contains only deprecated public variables and mixins. Deprecated leaves reuse the existing render inputs through
dedicated `DeprecatedScssVariable` / `DeprecatedScssMixin` subtypes, so the two catalogs cannot mix at the type level.

The catalogs are authored separately but declarations are not duplicated. Deprecating a current API means moving its
existing node from `scssMeta` to `scssDeprecationsMeta` and adding `deprecation`. The explicit `ScssMeta` shape is
updated at the same time because the recommended public catalog genuinely changed. No separate full-catalog type or
recursive type-level filtering is introduced.

This change covers all current top-level SCSS variable and mixin deprecations atomically. Deprecated map keys and other
internal plumbing remain outside the public deprecation catalog.

This design is implemented, and is the reference the remaining per-source designs align to — see
[Conventions for other sources](#conventions-for-other-sources).

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

Add the lifecycle detail and one deprecated subtype per leaf kind in `packages/styles/projects/scss/src/types.ts`:

```ts
export type ScssDeprecation = {
  /** Optional note replacing the package default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing identifier, such as `$radius-sm` or `focus-visible()`. */
  replacement?: string;
};

export type DeprecatedScssVariable = Omit<ScssVariable, 'description'> & {
  description?: string;
  deprecation: ScssDeprecation;
};

export type DeprecatedScssMixin = Omit<ScssMixin, 'description'> & {
  description?: string;
  deprecation: ScssDeprecation;
};
```

`ScssVariable` and `ScssMixin` gain no `deprecation` field. The separation is therefore enforced by the compiler in both
directions: `satisfies ScssMeta` rejects a documented node that grew a `deprecation`, and the deprecated catalog's
`satisfies` rejects a legacy node that lost one. An optional field on the shared type was rejected because it makes both
mistakes merely test-detectable.

`deprecation: {}` is a valid, complete marker: it means the package default message and no replacement. Variable versus
mixin is already inferable from the node shape, so no duplicate deprecation `kind` field is needed.

`description` is optional on deprecated leaves and is omitted in practice — a legacy alias is documented by its
generated `@deprecated` comment, not by a docs row, and nothing reads a deprecated node's description (the skill
serializer reads only `scssMeta`; the audit adapter reads name and deprecation). Author one only where the default
guidance genuinely needs more. `ScssMeta` keeps `description` required, so documented leaves are still guaranteed one.

Deprecated nodes remain complete render inputs: variables carry `name` and `value`; mixins carry `name`, optional
`signature`, and `raw`. Custom legacy implementations therefore do not require an opaque deprecated `ScssRaw` block.

The existing generic `comment` field is not the source of deprecation semantics. The renderer creates deprecation
comments from `deprecation`.

### Identity and message helpers

Add package-local helpers that own canonical identity and default wording. The renderer and the knowledge-skill adapter
both use them, so no downstream code re-spells an identifier or re-invents a fallback message.

`scssIdentifier(node)` returns the consumer-facing spelling:

- variables include `$`, for example `$radius-sm`;
- mixins include `()`, for example `focus-visible()`.

When a replacement is another metadata node, author its value as `scssIdentifier(<current node>)` read straight from the
exported current catalog — `scssIdentifier(shadow.lg)`, not a retyped string and not an intermediate local const. The
exported `deprecation.replacement` remains a simple string.

Default messages are:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

Two helpers, because the two consumers need different halves:

- `scssDeprecationMessage(node)` returns the authored `message` or the applicable default. The knowledge skill uses this
  as the entry's `message` and renders `replacement` in its own column, so the remediation cell reads
  ``Use `$radius-sm`. This API will be removed…`` without duplicating the replacement.
- `scssDeprecationText(node)` prefixes the replacement sentence for the generated comment:

```text
Use <replacement> instead. <message>
```

Exceptional migrations may provide `message`. The knowledge skill does not parse comments or maintain its own fallback
wording.

### Domain metadata

Each domain module exports its current metadata and deprecated metadata beside each other. Deprecated entries are
authored as literal repeated objects — no factory function and no `.map()` over a tuple table, which obscures what is
actually declared and makes a one-off exception awkward:

```ts
export const blur = {
  frosted: {
    name: '$blur-frosted',
    value: blurFrosted,
    description: '...',
  },
} satisfies ScssMeta['blur'];

export const blurDeprecations = {
  frostedGlass: {
    name: 'pds-frosted-glass',
    raw: `  backdrop-filter: ${blurFrosted};
  -webkit-backdrop-filter: ${blurFrosted};`,
    deprecation: { replacement: scssIdentifier(blur.frosted) },
  },
} satisfies Record<string, DeprecatedScssMixin>;
```

The migration replaces all current deprecated `ScssRaw` blocks with structured nodes. Non-public support data remains
ordinary plumbing. For example, the maps used by `pds-focus()` remain raw internal nodes, while `pds-focus()` itself
becomes a deprecated mixin node.

To deprecate `$blur-frosted` later, maintainers move its existing object into `blurDeprecations`, add `deprecation`, and
drop its now-unused `description`:

```ts
export const blur = {} satisfies ScssMeta['blur'];

export const blurDeprecations = {
  // Existing deprecated mixins remain here.
  frosted: {
    name: '$blur-frosted',
    value: blurFrosted,
    deprecation: { replacement: '$new-blur-token' },
  },
} satisfies Record<string, DeprecatedScssVariable | DeprecatedScssMixin>;
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
standalone Sass _silent_ comment immediately above it:

```scss
// @deprecated Use $radius-sm instead. This API will be removed with the next major release.
$pds-border-radius-small: 4px;
```

For an API without a replacement:

```scss
// @deprecated This API will be removed with the next major release and has no replacement.
$pds-breakpoint-base: 0;
```

The comment must be silent, not a loud `/* … */`. Sass copies every top-level loud comment of a `@use`d module into the
consuming project's compiled CSS, whether or not that project references a single legacy API — a stylesheet whose entire
content is `@use '…/scss'` would ship 12 KB of prose describing 122 APIs it never calls. `//` keeps the guidance in the
source a developer reads and emits nothing.

The old `alias (deprecated)` and `(deprecated)` marker variants are removed. They are no longer needed because comments
are generated from structured data rather than scraped for meaning.

`scssFileMeta` composes current and deprecated domain branches in the same declaration order as today. Declaration
names, values, signatures, bodies, file placement, and forwarding behavior remain unchanged. The only intentional
generated SCSS difference is the standardized deprecation comments.

### Knowledge-skill adapter

Replace the filesystem implementation in
`packages/storefront/projects/skills/src/knowledge/deprecations/collectors/scss.ts` with a metadata adapter that imports
`flatten`, `isDeprecated`, `scssIdentifier`, `scssDeprecationMessage` and `scssDeprecationsMeta` from
`@porsche-design-system/scss`.

For each deprecated node, the adapter derives only knowledge-skill concerns:

```ts
{
  id: `styleAlias/scss/${identifier}`,
  kind: 'styleAlias',
  source: 'scss',
  identifier: scssIdentifier(node),
  message: scssDeprecationMessage(node),
  ...(node.deprecation.replacement ? { replacement: node.deprecation.replacement } : {}),
  reference: 'references/styles/scss.md',
}
```

Identity and wording both come from the package helpers; the adapter re-spells nothing. `replacement` is omitted rather
than set to `undefined` so the Markdown remediation column composes cleanly, and `message` is the lifecycle sentence
only — the renderer already prints the replacement in its own column, so using the full comment text would print it
twice.

The adapter preserves `scssDeprecationsMeta` order and performs no additional sorting. JavaScript object and array
iteration order is deterministic, so the package metadata owns the rendered order. Stable rule IDs depend only on
identifiers, not row position. The source origin changes from shipped-partial parsing to the
`@porsche-design-system/scss` metadata export, and `scssRoot()` is dropped from the skill's package-root helpers.

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

### Optional field versus dedicated deprecated subtypes

**Chosen:** dedicated `DeprecatedScssVariable` / `DeprecatedScssMixin` subtypes with a required `deprecation`, and no
`deprecation` field on the documented leaf types.

Deprecation is still a lifecycle state of the same renderable declaration — the subtypes reuse the current render inputs
rather than introducing a parallel model — but the state is now checked by the compiler instead of by a test. A
documented node that grows a `deprecation` and a legacy node that loses one are both build errors, and the deprecated
catalog's `satisfies` is what enforces it, so no reviewer has to notice.

Making `description` optional on the subtypes is part of the same move: nothing reads a deprecated node's description,
so requiring one produced 122 lines of prose that documented what the generated comment already said. `ScssMeta` keeps
`description` required, so the documented catalog is unaffected.

A standalone normalized index was still rejected — it would duplicate declarations or leave generated SCSS independently
authored.

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

**Chosen:** standardize all generated comments as standalone silent `// @deprecated` comments.

This intentionally changes comments in shipped SCSS but does not change declarations or behavior. It removes the
historical marker distinction that existed only for the parser and gives package consumers actionable guidance directly
in generated source.

Silent rather than loud is not cosmetic. The previous `/* alias (deprecated) */` markers were loud, so Sass emitted all
126 of them (3 KB) into the compiled CSS of every consuming project; standardizing the wording while keeping them loud
would have grown that to 12 KB. Silent comments carry the same guidance to anyone reading the shipped partial and cost
consumers nothing, which also keeps the package's compiled-CSS snapshots showing only the CSS under test.

## Risks & mitigations

| Risk                                                                    | Mitigation                                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A legacy declaration is missed during the atomic migration.             | Preserve the existing SCSS rule-ID/count snapshots and migrate every current collector result before deleting parser logic.                                                                                         |
| A node is copied instead of moved when deprecated.                      | Assert that identifiers are unique across `scssMeta` and `scssDeprecationsMeta`.                                                                                                                                    |
| A generated declaration changes behavior while moving out of `ScssRaw`. | Snapshot every generated partial and review changes so only standardized comments differ. Keep names, values, signatures, bodies, order, and file placement unchanged.                                              |
| Replacement strings drift after a current API rename.                   | Derive replacements from current metadata node names through the canonical identifier helper whenever a corresponding node exists.                                                                                  |
| Custom mixins appear not to fit the model.                              | Keep their complete implementation in `ScssMixin.raw`; only non-public support maps remain separate raw plumbing.                                                                                                   |
| Deprecated and current APIs become mixed in normal docs.                | Keep `scssMeta` current-only and make SCSS skill serialization continue to read only it.                                                                                                                            |
| Future code adds another opaque deprecated `ScssRaw` block.             | Make the `Deprecated*` leaf subtypes the documented convention, and test that `scssDeprecationsMeta` contains only structured variable/mixin nodes.                                                                 |
| Comment changes surprise consumers comparing generated files.           | Treat comment normalization as an explicit release-note-worthy source change; declarations and compiled behavior remain stable. Compiled CSS in fact shrinks, since the previous loud markers were emitted into it. |
| Metadata reordering creates noisy Markdown changes.                     | Treat metadata order as the rendered contract and review intentional ordering changes through generated snapshots.                                                                                                  |

## Testing strategy

### SCSS package

Add tests that prove:

1. `scssMeta` and `scssDeprecationsMeta` are exported from `@porsche-design-system/scss`.
2. Every `ScssMeta` root domain is represented in `scssDeprecationsMeta`, including explicit empty branches.
3. Every flattened `scssDeprecationsMeta` node is a variable or mixin carrying `deprecation`.
4. Identifiers are unique within and across both catalogs.
5. Every generated public variable and mixin is composed from exactly one catalog node; raw composition nodes contain
   only explicitly internal plumbing.
6. Every catalog node is rendered exactly once, so a node cannot be indexed for the audit without shipping.
7. Every replacement is canonical (`$name` for variables, `name()` for mixins) and differs from the deprecated
   identifier.
8. `scssMeta` remains free of nodes carrying `deprecation`, and every documented leaf has a non-empty `description`.
9. An authored empty `deprecation: {}` receives the correct default message, a replacement prefixes the sentence, and an
   authored `message` overrides the default.
10. Generated partial snapshots contain the same declarations in the same files and order, with only the expected
    standardized comments changed.
11. No rendered partial contains a loud `/* … @deprecated … */` comment.
12. Existing Sass compilation tests continue to compile the public package.

Items 3, 8 and the required-`deprecation` half of the contract are additionally enforced by the compiler through the
`Deprecated*` subtypes; the runtime assertions remain as the backstop for branches typed as `ScssBranch`.

No test parses generated SCSS to reconstruct metadata. Metadata invariants and output snapshots are the two verification
boundaries.

### Knowledge skills package

Update tests to prove:

1. the SCSS source imports package metadata and performs no filesystem access;
2. collected identifiers equal `flatten(scssDeprecationsMeta).filter(isDeprecated).map(scssIdentifier)` exactly, in
   catalog order — one entry each, none dropped, none added, none re-sorted;
3. every rule ID is `styleAlias/scss/<identifier>` built from that same identifier;
4. every entry's `message` and `replacement` equal the package's `scssDeprecationMessage(node)` and
   `node.deprecation.replacement` verbatim;
5. metadata replacements appear in the Markdown remediation column;
6. every SCSS entry links to `references/styles/scss.md`;
7. generated `deprecations.md` snapshots contain the enriched SCSS guidance;
8. framework-specific outputs retain the same SCSS section because SCSS spelling is framework-independent.

The gate derives its expectations from the package catalog using the package's own helpers. It must not freeze a
hand-authored identifier list — that duplicates the catalog and rots — and it must not re-parse the generated partials,
which is the coupling this design removes. Because the adapter is separate code from the helpers, the gate still catches
a dropped `()`, a lost replacement, a re-sort or a dropped entry.

The old SCSS syntax, declaration-boundary, marker, and generated-directory tests are removed.

## Rollout

Implement this as one SCSS-focused change:

1. Add the deprecation detail, the `Deprecated*` leaf subtypes, the canonical identifier helper, and the two message
   helpers.
2. Add deprecated metadata beside each current domain and convert deprecated variables and mixins from `ScssRaw` blocks
   to renderable nodes carrying `deprecation`.
3. Separate internal support maps or snippets from their public deprecated mixins where they currently share one raw
   block.
4. Assemble and export the domain-keyed `scssDeprecationsMeta` beside the existing `scssMeta`.
5. Extend the SCSS renderer to generate standardized standalone silent `@deprecated` comments.
6. Update `scssFileMeta` to render deprecated metadata branches in their current files and positions.
7. Update SCSS metadata, generation, snapshot, and compilation tests.
8. Replace the knowledge skill's SCSS filesystem collector with the direct metadata adapter.
9. Update skills tests and generated `deprecations.md` snapshots, confirming stable rule IDs and enriched replacements.
10. Remove SCSS-specific filesystem parsing and marker tests, and drop `scssRoot()`. Keep shared package-root utilities
    while other collectors still depend on them.

No feature flag or compatibility adapter is needed. The package build already emits metadata before skill generation,
and the skills package already declares `@porsche-design-system/scss` as a direct development dependency.

## Conventions for other sources

The remaining per-source designs — components, Emotion, vanilla-extract, Tailwind CSS, stylesheets, tokens, icons and
partials — follow the conventions this implementation settled on. Each doc records only how they apply to its package.

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

Every row ends in the same published shape: a domain-keyed `<pkg>DeprecationsMeta` catalog beside the current one, on
the package's metadata entry. The rows differ only in how it is produced — authored, or generated from the annotations.

One consequence is worth stating rather than discovering. A source in the first or third row can express a structured
`replacement`, because someone authors one; a source in the middle row carries the annotation's sentence instead, unless
its annotations are made structured (`{@link …}`) — so the rendered remediation column is populated for some sources and
not others. A package in the middle row also needs no wording or identity helpers: its message is the annotation and its
identifier is the export name.

Conventions 1 and 2 shape every deprecated catalog; 3–6 and 8 describe an authored one and apply to the first and third
rows. Conventions 7 and 9 apply to every source. Conventions 10–13 describe the annotation-first row.

1. **Dedicated deprecated types, not an optional field.** Add `Deprecated<Leaf>` types with a **required** `deprecation`
   and leave the current leaf types without the field, so neither catalog can absorb the other's entries. Where a
   package's documented catalog must stay complete (components), the deprecated catalog is _derived_ instead — see
   `docs/component-deprecation-metadata-design.md`.
2. **Deprecated entries carry no `description`.** Make it optional on the deprecated type and omit it; the generated
   `@deprecated` comment or JSDoc is the documentation. Author one only where the default guidance is insufficient. The
   current type keeps `description` required.
3. **Fixed default wording, owned by the package.** With a replacement:
   `This API will be removed with the next major release.` Without:
   `This API will be removed with the next major release and has no replacement.` Expose two helpers — one returning the
   lifecycle sentence for the skill, one prefixing `Use <replacement> instead.` for the generated comment — so the
   remediation column never prints the replacement twice.
4. **Canonical identity helper.** Author `replacement` as `<pkg>Identifier(<current node>)` read from the exported
   current catalog, never as a retyped string and never via an intermediate local const.
5. **Generated comments must not reach a consumer's shipped bytes.** SCSS uses silent `//`. TypeScript sources use
   `@deprecated` JSDoc, which the bundler strips from emitted JS and keeps in `.d.ts` where it drives IDE strikethrough
   — no constraint there. CSS output (Tailwind, stylesheets) has **no** silent comment form, so a comment there ships to
   every consumer verbatim: keep those markers terse or omit them entirely and rely on the metadata catalog, and measure
   the byte delta before expanding them.
6. **Catalogs are authored as literal repeated objects.** No factory functions, no `.map()` over a tuple table, and no
   intermediate consts extracted purely to be referenced — read the exported catalog directly. Generated catalogs
   (tokens, components, icons, Emotion's and vanilla-extract's annotation-derived catalogs) are exempt, since their
   authoring surface is the generator input.
7. **The adapter maps one-to-one.** It adds only the rule ID, source category and reference path, preserves catalog
   order, sorts nothing, and touches no filesystem.
8. **Package tests assert both directions.** Every generated public declaration originates from exactly one catalog,
   _and_ every catalog node is rendered exactly once.
9. **The skills completeness gate derives from the package catalog** using the package's own helpers — never a
   hand-authored identifier list, never a re-parse of the generated artifact.
10. **The annotation is the source; nothing restates it.** A hand-authored catalog beside an already-annotated
    declaration is a second place to keep in sync, and it is not small: authoring one for Emotion measured 741 lines of
    descriptors plus types, helpers and tests, to produce a 120-row table. Improving guidance means improving the
    annotation, which fixes the IDE hint at the same time.
11. **The package resolves its own public surface, and publishes the result as a catalog.** Use the type checker —
    `getExportsOfModule` over the public barrels, `getAliasedSymbol` to reach the declaration, `getJsDocTags` for the
    annotation — never a directory walk, so the shared internals those directories also hold cannot be reported to a
    project. The extractor lives in the package and runs at **build time**, emitting a generated `<pkg>DeprecationsMeta`
    on the metadata entry: that entry is a bundled artifact other consumers import, and neither the TypeScript compiler
    nor reads of `src` belong in their build graph. The skill imports the catalog, never the extractor.
12. **The message is the annotation text, carried verbatim.** No prose parsing anywhere. An entry gets no structured
    `replacement` until the annotations themselves are structured, which is a per-package wording decision rather than a
    codemod.
13. **The package test compares the catalog with the package's own runtime exports** — never a hand-written list — so an
    unannotated legacy export fails the build, and with a fresh extraction, so the generated catalog cannot go stale.

## Open questions

None for the SCSS phase.

Future phases may decide whether deprecated map keys should become first-class audit entries and whether the SCSS-owned
deprecation contract should move to a shared low-level package once another metadata producer adopts it.
