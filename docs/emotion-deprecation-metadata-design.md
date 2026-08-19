# Emotion deprecation metadata design

## Summary

Emotion's deprecated surface shall be published as `emotionDeprecationsMeta` beside `emotionMeta` from
`@porsche-design-system/emotion/meta`, in the same shape SCSS uses: a domain-keyed catalog of nodes carrying a
`deprecation` marker.

Only the way it is _gathered_ differs. SCSS authors its catalog because its metadata generates the shipped declarations;
Emotion's declarations are hand-written TypeScript that already carry a `@deprecated` annotation, so the catalog is
generated from those annotations at build time. No second, hand-authored catalog is introduced.

This replaces the knowledge skill's traversal of `src/*/deprecated/index.ts`, its declaration lookup, its JSDoc parsing
and its package-root resolution. `emotionMeta` is unaffected: it remains the documented, deprecation-free catalog of the
current API.

This is the annotation-first case of
[the rule that decides the mechanism](./scss-deprecation-metadata-design.md#the-rule-that-decides-the-mechanism)
(conventions 7 and 9–13).

This design is implemented.

## Architecture & approach

```text
@deprecated annotations on the legacy exports
  -> scripts/deprecations.ts            (build time, TypeScript type checker)
  -> emotionMeta/deprecations.ts        (generated static catalog)
  -> emotionDeprecationsMeta            (@porsche-design-system/emotion/meta)
  -> knowledge-skill deprecations.md
```

The annotation is the single source. It has to exist regardless — it is what strikes an export through in a consumer's
IDE — so anything that restates it is a second thing to keep in sync.

The package owns both the reading of its own sources and the published catalog. The knowledge skill owns only the audit
vocabulary.

The two public catalogs have the same responsibilities as their SCSS counterparts:

- `emotionMeta` contains only the recommended, documented API.
- `emotionDeprecationsMeta` contains only deprecated public exports.
- An export appears in exactly one of them.

## Components

### Build-time extractor

`scripts/deprecations.ts` resolves the public legacy surface through the TypeScript type checker:

- `checker.getExportsOfModule()` on each `src/<domain>/deprecated/index.ts` yields the public names, so the shared
  internals those directories also hold (`_displayFontPartA`, `displayShared`, `ThemeColorSet`) cannot be reported to a
  project;
- `checker.getAliasedSymbol()` follows a barrel's re-export to the declaration the annotation sits on;
- `symbol.getJsDocTags()` returns the `@deprecated` tag, whose text is carried verbatim.

The domains are read from `src`, not from `emotionMeta`, so a `deprecated` barrel under a directory the meta catalog
does not know fails the build instead of going unindexed.

`scripts/build.ts` renders the result and writes `emotionMeta/deprecations.ts`, run by `npm run build:meta:deprecations`
before the meta bundle is built. The generated file is git-ignored like the repository's other generated sources.

### Deprecation types

`emotionMeta/types.ts` gains `DeprecatedEmotionNode` and `EmotionDeprecationsMeta`
(`Record<keyof EmotionMeta, DeprecatedEmotionNode[]>`). The node is `Deprecated<{ name: string }>` from
`@porsche-design-system/shared/deprecation`, narrowing the marker to `{ message: string }`: an annotation-derived
catalog always has the annotation text, and never a structured `replacement`. The required `deprecation` keeps the two
catalogs apart at the type level, exactly as it does for SCSS and Tailwind.

`emotionDeprecations` — the catalog as an ordered flat list — is what the meta entry publishes; the domain-keyed catalog
itself stays internal, since its grouping only records which domains were checked. Every styling package offers the
audit the same single read surface.

A deprecated node carries no `description` — it is documented by its annotation — and no `value` or `styles`, since
nothing renders it. There is no default-wording or identity helper: the message is always the annotation, and an Emotion
identifier is its export name.

### Knowledge-skill adapter

`collectors/emotion.ts` flattens the catalog in domain order and maps it one-to-one onto `DeprecationEntry`, adding only
the `styleAlias/emotion/<name>` rule ID, the source category and the reference path. It preserves the package's order,
sorts nothing, and touches no filesystem.

## Data & state

The stable identity is the public export name; the rule ID is `styleAlias/emotion/<name>`. The message is the annotation
text exactly as authored, including the `since v4.0.0` prefix each carries. Entries have no structured `replacement`:
the annotation sentence carries that guidance in prose.

Catalog order is the rendered contract: domains in `emotionMeta` key order, exports in barrel order within a domain.

## Trade-offs

### Generating the catalog versus resolving it at import time

**Chosen:** generate static data at build time.

The extraction needs the TypeScript compiler and the `src` sources. `@porsche-design-system/emotion/meta` is a bundled
artifact imported by storefront MDX pages as well as by the skill, so an extractor reachable from that entry would put
the compiler and filesystem reads into every consumer's build graph. Generating the catalog keeps the published entry
plain data.

The cost is a generated file and a build-order edge: `build:meta:deprecations` runs before the meta bundle. Staleness is
not a real risk — the build regenerates the file, and a package test compares it with a fresh extraction.

### Reading the annotations versus authoring a catalog

**Chosen:** read the annotations.

SCSS generates its declarations from `scssDeprecationsMeta`, so there the catalog is the only place a deprecation is
authored. Emotion's declarations already carry the annotation, so authoring a catalog restates them. It was implemented
and measured at 741 lines of descriptors plus types, helpers and their tests, to produce a 120-row table — with the
wording living in two places and free to drift.

The cost is that the rendered table inherits the annotations' inconsistent prose. That is the same text a consumer reads
in their IDE, so improving it improves both surfaces at once, which is the right place to fix it.

### No structured replacement column

**Chosen:** carry the sentence, not a parsed replacement.

The previous skill-side parser guessed a replacement out of the prose and published `variables directly` and
`typescale variables` as things to migrate to. Dropping the column removes the guess.

Making it structured without guessing means `{@link radiusLg}` in every annotation, which the checker returns as a
resolved symbol reference. This was prototyped and deferred: 41 of the 120 annotations name an export `emotionMeta`
documents and could be converted mechanically, but 14 name an export that does not exist (`proseHeadingLg` for
`proseHeadingLgStyle`) and 40 name theme-specific colors from the **private** `@porsche-design-system/tokens` package,
so it is a wording decision rather than a codemod.

## Risks & mitigations

| Risk                                                          | Mitigation                                                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| A private helper is reported to a project.                    | The public surface comes from `getExportsOfModule`, not from directory traversal; a package test asserts it.             |
| A legacy export ships without an annotation, so is unindexed. | A package test compares the catalog with the `deprecated` barrels' own runtime exports.                                  |
| A deprecated domain is missing from the catalog.              | The extractor reads the domains from `src` and fails when one has no `emotionMeta` key; a package test asserts the keys. |
| The generated catalog goes stale.                             | The build regenerates it; a package test compares it with a fresh extraction.                                            |
| The index inherits inconsistent wording.                      | Accepted; it is the wording consumers already see. Standardizing it is a separate change.                                |

## Testing strategy

The package proves the catalog equals the `deprecated` barrels' runtime exports — never a hand-written list — that every
entry carries a non-empty annotation, that it is keyed by every `emotionMeta` domain in catalog order, and that it
matches a fresh extraction.

The skills completeness gate derives its expectations from `emotionDeprecationsMeta` and proves that collected names,
order, rule IDs and messages match it entry for entry, that every entry links to the Emotion reference, and that the
collector performs no filesystem access.

## Rollout

1. Add the deprecation types, the build-time extractor and the generated catalog; export it from the meta entry.
2. Replace the skill collector; drop the Emotion half of the shared source parser and `emotionRoot()`.
3. Update the skills completeness gate and snapshots.

vanilla-extract has the identical shape and followed with the same mechanism — see
[its design](./vanilla-extract-deprecation-metadata-design.md).

## Open questions

Whether to standardize the annotation wording — and, with it, adopt `{@link}` so the replacement becomes a checked
symbol reference rather than prose — is deferred to its own change.
