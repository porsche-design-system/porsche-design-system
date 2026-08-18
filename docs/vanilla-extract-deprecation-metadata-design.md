# vanilla-extract deprecation metadata design

## Summary

vanilla-extract's deprecated surface shall be published as `vanillaExtractDeprecationsMeta` beside `vanillaExtractMeta`,
generated at build time from the `@deprecated` annotations its exports already carry. No hand-authored catalog is
introduced.

This replaces the knowledge skill's traversal of `src/*/deprecated/index.ts`, its declaration lookup, its JSDoc parsing
and its package-root resolution — the last of that machinery in the skill. `vanillaExtractMeta` is unaffected: it
remains the documented, deprecation-free catalog of the current API.

This is the annotation-first case of the
[SCSS design's conventions](./scss-deprecation-metadata-design.md#the-rule-that-decides-the-mechanism) (conventions 7
and 9–13), mirroring [Emotion](./emotion-deprecation-metadata-design.md).

This design is implemented.

## Architecture & approach

```text
@deprecated annotations on the legacy exports
  -> scripts/deprecations.ts                 (build time, TypeScript type checker)
  -> vanillaExtractDeprecationsMeta          (@porsche-design-system/vanilla-extract meta entry)
  -> knowledge-skill deprecations.md
```

The annotation is the single source. It has to exist regardless — it is what strikes an export through in a consumer's
IDE — so a catalog beside it would be a second thing to keep in sync.

## Components

### Build-time extractor

`scripts/deprecations.ts` resolves the public legacy surface through the TypeScript type checker: `getExportsOfModule()`
on each `src/<domain>/deprecated/index.ts` for the public names, `getAliasedSymbol()` to reach the declaration a barrel
re-exports, and `getJsDocTags()` for the `@deprecated` tag, whose text is carried verbatim.

It builds a domain-keyed catalog in meta key order, which a build step emits as static data on the package's metadata
entry — the compiler and the `src` reads stay out of every consumer's build graph.

The two packages share a directory layout, a barrel convention and an annotation style, so this is the Emotion extractor
with a different `src` root. It is copied rather than shared: the file is ~55 lines, and a shared module would add a
build-order edge between two packages that are otherwise independent.

### Knowledge-skill adapter

`collectors/vanillaExtract.ts` — which held the filesystem parser — is a one-to-one mapping over the catalog that adds
only the `styleAlias/vanillaExtract/<name>` rule ID, the source category and `references/styles/vanilla-extract.md`. It
preserves the package's order, sorts nothing, and touches no filesystem. `vanillaExtractRoot()` is dropped from the
skill's package-root helpers, which now hold only the roots the remaining marker scans need.

## Data & state

The stable identity is the public export name; the rule ID is `styleAlias/vanillaExtract/<name>`. The message is the
annotation text exactly as authored. Entries have no structured `replacement`: the annotation sentence carries that
guidance in prose.

## Trade-offs

### Generating the catalog versus resolving it at import time

**Chosen:** generate static data at build time, as Emotion does.

The extraction needs the TypeScript compiler and the `src` sources; the meta entry is a bundled artifact other consumers
import. Generating the catalog keeps that entry plain data. The cost is a generated file and a build-order edge —
`build:meta:deprecations` runs before the meta bundle — and staleness is covered by a package test comparing the catalog
with a fresh extraction.

### Reading the annotations versus authoring a catalog

**Chosen:** read the annotations, as Emotion does.

An earlier revision of this design proposed _authoring_ `vanillaExtractDeprecationsMeta` with deprecated leaf types,
identity and message helpers, mirroring SCSS. The published shape is the same either way; what is rejected is authoring
it. That is the right mechanism for a package whose metadata _generates_ its declarations; vanilla-extract's
declarations are hand-written TypeScript that already carry the annotation, so authoring a catalog restates them. Doing
so for Emotion measured 741 lines to produce a 120-row table.

The cost is that the rendered table inherits the annotations' prose, and that the remediation column carries no
structured replacement. Both are wording problems in the annotations, fixable in the place that also fixes the IDE hint.

## Risks & mitigations

| Risk                                                          | Mitigation                                                                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| A private helper is reported to a project.                    | The public surface comes from `getExportsOfModule`, not directory traversal; a package test asserts it.                         |
| A legacy export ships without an annotation, so is unindexed. | A package test compares the catalog with the `deprecated` barrels' own runtime exports, and with a fresh extraction.            |
| A deprecated domain is missing from the catalog.              | The extractor reads the domains from `src` and fails when one has no `vanillaExtractMeta` key.                                  |
| The generated catalog goes stale.                             | The build regenerates it; a package test compares it with a fresh extraction.                                                   |
| Emotion and vanilla-extract drift apart.                      | Both use the same extraction and the same adapter shape; their deprecated surfaces are compared where they intentionally match. |

## Testing strategy

The package proves the catalog equals the `deprecated` barrels' runtime exports — never a hand-written list — that every
entry carries a non-empty annotation, and that it matches a fresh extraction.

The skills completeness gate derives its expectations from `vanillaExtractDeprecationsMeta` and proves that collected
names, order, rule IDs and messages match it entry for entry, that every entry links to the vanilla-extract reference,
and that the collector performs no filesystem access.

## Rollout

1. Add the deprecation types, the build-time extractor and the generated catalog on the metadata entry.
2. Replace `collectors/vanillaExtract.ts` with the adapter; drop `vanillaExtractRoot()`.
3. Update the skills completeness gate and snapshots.

With this, no knowledge-skill collector parses another package's sources.

## Open questions

Whether to standardize the annotation wording across both TypeScript styling packages — and, with it, adopt `{@link}` so
the replacement becomes a checked symbol reference — is deferred to its own change, and should be decided for Emotion
and vanilla-extract together.
