# Emotion deprecation metadata design

## Summary

Emotion's deprecated surface shall be published as `emotionDeprecations` beside `emotionMeta` from
`@porsche-design-system/emotion/meta`, in the shape SCSS publishes: the shared `Deprecations` — an ordered flat list of
canonical identifiers and markers — and nothing else. No deprecated leaf type, no second catalog and no type describing
one reach a consumer.

Only the way it is _gathered_ differs. SCSS projects its list out of the authored catalog its metadata generates the
shipped declarations from; Emotion's declarations are hand-written TypeScript that already carry a `@deprecated`
annotation, so the list is generated from those annotations at build time. No hand-authored catalog is introduced.

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
  -> emotionMeta/deprecations.ts        (generated static list)
  -> emotionDeprecations                (@porsche-design-system/emotion/meta)
  -> knowledge-skill deprecations.md
```

The annotation is the single source. It has to exist regardless — it is what strikes an export through in a consumer's
IDE — so anything that restates it is a second thing to keep in sync. It is written in the shape the shared contract
generates, so the marker recovered from it is structured rather than prose.

The package owns both the reading of its own sources and the published list. The knowledge skill owns only the audit
vocabulary.

The two public exports have the same responsibilities as their SCSS counterparts:

- `emotionMeta` contains only the recommended, documented API.
- `emotionDeprecations` contains only deprecated public exports.
- An export appears in exactly one of them.

Domains are how the extractor walks `src` and what fixes the order, but they are not materialised: nothing outside the
extractor sees them, so the published surface is one array in every package.

## Components

### Build-time extractor

`scripts/deprecations.ts` resolves the public legacy surface through the TypeScript type checker:

- `checker.getExportsOfModule()` on each `src/<domain>/deprecated/index.ts` yields the public names, so the shared
  internals those directories also hold (`_displayFontPartA`, `displayShared`, `ThemeColorSet`) cannot be reported to a
  project;
- `checker.getAliasedSymbol()` follows a barrel's re-export to the declaration the annotation sits on;
- `symbol.getJsDocTags()` returns the `@deprecated` tag, from which the marker is recovered and validated.

The domains are read from `src`, not from `emotionMeta`, so a `deprecated` barrel under a directory the meta catalog
does not know fails the build instead of going unindexed.

`scripts/build.ts` renders the result and writes `emotionMeta/deprecations.ts`, run by `npm run build:meta:deprecations`
before the meta bundle is built. The generated file is git-ignored like the repository's other generated sources.

### Annotation convention

An annotation names its replacement as a `{@link …}` reference and otherwise reads exactly as `getDeprecationComment`
renders it for that marker:

```ts
/** @deprecated Use {@link colorFrostedLight} instead. This API will be removed with the next major release. */
```

The extractor therefore validates rather than guesses. It takes the replacement from the link — never as a phrase
recovered from the sentence around it — reconstructs the sentence the shared contract would generate, and compares:

- text equals the generated sentence → `{ replacement }`, no note;
- text starts with it → the remainder becomes the `note`;
- anything else → **the build fails**, naming the export and printing the expected form.

A `{@link …}` target must additionally be something the package itself exports, so a replacement the audit renders is
always importable. Guidance that names anything else — a private token, a literal value, a concept — belongs in the
sentence after the lifecycle message, where it is carried as the `note`.

These annotations are hand-maintained because `src/` is the shipped library rather than generated output. Writing them
as the generated text is what keeps them identical to every other source's, and the comparison is what keeps them that
way; when the package's declarations are generated from metadata, the annotation will be emitted by
`getDeprecationComment` and the validation becomes unnecessary.

Roughly a fifth of them name no exported symbol — _"Use individual variables instead."_, a literal value, a
`linear-gradient(…)` snippet. Those carry no `replacement` and keep their guidance as the `note`.

### Deprecation types

None. `emotionMeta/types.ts` declares nothing for the deprecated surface: `emotionDeprecations` is the shared
`Deprecations` from `@porsche-design-system/shared/deprecation`, and the generated module is typed by it directly.

Removing the domain-keyed catalog removes the last thing that had a package-specific shape. It only ever recorded which
domains were checked, and the check itself is elsewhere: the extractor reads the domains from `src` and fails when one
has no `emotionMeta` key.

An entry carries only its identifier and marker — no `description`, since a deprecated export is documented by its
annotation, and no `value` or `styles`, since nothing renders it. There is no wording or identity helper either: the
sentence is generated by the shared `getDeprecationComment` like every other source's, and an Emotion identifier is its
export name.

### Knowledge-skill adapter

`collectors/emotion.ts` flattens the catalog in domain order and maps it one-to-one onto `DeprecationEntry`, adding only
the `styleAlias/emotion/<name>` rule ID, the source category and the reference path. It preserves the package's order,
sorts nothing, and touches no filesystem.

## Data & state

The stable identity is the public export name; the rule ID is `styleAlias/emotion/<name>`. An entry carries the
structured `replacement` recovered from the annotation's `{@link …}` reference, plus a `note` when the annotation adds
guidance beyond the generated sentence.

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

SCSS generates its declarations from `scssCatalog`, so there the catalog is the only place a deprecation is authored.
Emotion's declarations already carry the annotation, so authoring a catalog restates them. It was implemented and
measured at 741 lines of descriptors plus types, helpers and their tests, to produce a 120-row table — with the wording
living in two places and free to drift.

The cost is that the rendered table inherits the annotations' inconsistent prose. That is the same text a consumer reads
in their IDE, so improving it improves both surfaces at once, which is the right place to fix it.

### Structured replacements, and the ones that stayed prose

**Chosen:** recover the replacement from a `{@link …}` reference, and validate that it resolves.

The original skill-side parser guessed a replacement out of the prose and published `variables directly` and
`typescale variables` as things to migrate to. Taking it from a link instead removes the guess: the checker returns a
symbol reference, and the extractor rejects one the package does not export.

Converting the annotations exposed why an earlier attempt deferred this. Of the names the prose used:

- most are genuine public exports and convert directly;
- eleven named an export that does not exist — `proseHeadingSm` where the package exports `proseHeadingSmStyle`. The
  prose had been wrong since it was written; the validation is what surfaced it, and the annotations are corrected.
- thirty-eight named theme-specific colors (`colorCanvasDark`, `colorFrostedLight`) that live in the **private**
  `@porsche-design-system/tokens` package. A consumer of this package cannot import them, so publishing them as a
  structured `replacement` would render
  `Use \`colorCanvasDark\`.`in the audit for something unreachable. They stay guidance in the`note`, exactly as they
  read before.

The remainder — conceptual advice (_"Use individual variables instead."_), literal values, a `linear-gradient(…)`
snippet — carry no replacement either, for the same reason: there is no symbol to name.

A structured replacement therefore means the audit can point at something importable, and nothing else is dressed up as
one.

### Not adopting the scss / tailwind catalog model

**Chosen:** keep the two-source model — hand-authored `emotionMeta` describing the library, deprecations generated from
the annotations.

The scss and tailwind packages now author **one catalog** per domain holding documented and deprecated declarations
alike, and derive their meta and their published deprecations from it. That model exists because in those packages the
metadata _generates_ the shipped artifact, so the catalog is the only place a declaration can be recorded. Here the
direction is reversed: `src/` is hand-written TypeScript and is itself the shipped library, so the metadata describes it
rather than producing it.

Two consequences make the catalog model the wrong fit:

- **The annotation is a better home than any catalog.** `@deprecated` on the declaration is what drives IDE
  strikethrough and the `.d.ts` hint. Moving the marker into a catalog would restate wording that already exists, which
  is convention 10, settled after a hand-authored catalog for this package measured 741 lines.
- **A deprecated entry is not the same kind of thing here.** In scss and tailwind it is a complete render input,
  identical to a documented one. Here it is a name plus an annotation — no value, no styles, no description — so merging
  both into one catalog would produce a leaf union of two genuinely different shapes.

The drift the catalog model prevents is already prevented: the package tests assert that `emotionMeta` documents every
public export and references the real export for every entry, so meta and library cannot diverge in either direction.

What _is_ adopted is the part that was about cross-solution convergence: the documented shape is now the parameterized
`StylesMeta<TToken, TUtility>`, instantiated as `EmotionMeta = StylesMeta<EmotionToken, EmotionUtility>`, matching scss
and tailwind so the four contracts can later be merged into one.

## Risks & mitigations

| Risk                                                          | Mitigation                                                                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| A private helper is reported to a project.                    | The public surface comes from `getExportsOfModule`, not from directory traversal; a package test asserts it. |
| A legacy export ships without an annotation, so is unindexed. | A package test compares the list with the `deprecated` barrels' own runtime exports.                         |
| A deprecated domain is missing from the list.                 | The extractor reads the domains from `src` and fails when one has no `emotionMeta` key.                      |
| The generated list goes stale, or its order drifts.           | The build regenerates it; a package test compares it with a fresh extraction, which is what pins the order.  |
| The index inherits inconsistent wording.                      | Accepted; it is the wording consumers already see. Standardizing it is a separate change.                    |

## Testing strategy

The package proves the list equals the `deprecated` barrels' runtime exports — never a hand-written list — that every
entry carries a structured marker, and that it matches a fresh extraction, which is what pins domain-then-barrel order.

The skills completeness gate derives its expectations from `emotionDeprecations` and proves that collected names, order,
rule IDs and messages match it entry for entry, that every entry links to the Emotion reference, and that the collector
performs no filesystem access.

## Rollout

1. Add the build-time extractor and the generated list; export it from the meta entry.
2. Replace the skill collector; drop the Emotion half of the shared source parser and `emotionRoot()`.
3. Update the skills completeness gate and snapshots.

vanilla-extract has the identical shape and followed with the same mechanism — see
[its design](./vanilla-extract-deprecation-metadata-design.md). The token package, whose declarations are likewise
hand-written TypeScript, collects its deprecations the same way — see
[its design](./token-deprecation-metadata-design.md).

## Open questions

Whether to standardize the annotation wording — and, with it, adopt `{@link}` so the replacement becomes a checked
symbol reference rather than prose — is deferred to its own change.
