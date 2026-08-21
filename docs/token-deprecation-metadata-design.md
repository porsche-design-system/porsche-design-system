# Token deprecation metadata design

## Summary

Token deprecations shall be generated into `tokenDeprecations` beside `tokensMeta` and published from
`@porsche-design-system/tokens-meta`. It is the shared `Deprecations` — an ordered flat list of canonical identifiers
and markers — and nothing else, the shape scss publishes. It is explicitly empty today and replaces the knowledge
skill's source-marker scan.

The generated `tokensMeta` remains the recommended token catalog. Future deprecated token exports remain available in
`@porsche-design-system/tokens` until removal but move out of `tokensMeta` into `tokenDeprecations`.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources). The
literal-object authoring convention does not apply, because both catalogs are generator output rather than hand-authored
— the equivalent constraint is that the _generator input_ carries structured deprecation data. It is implemented.

The token declarations are hand-written TypeScript and are themselves the shipped library, so this is the
annotation-first case that [Emotion](./emotion-deprecation-metadata-design.md) and
[vanilla-extract](./vanilla-extract-deprecation-metadata-design.md) are, and it collects its deprecations exactly as
they do: same annotation convention, same recovery from a `{@link}` reference, same round-trip validation against the
shared `getDeprecationComment`.

## Architecture & approach

```text
token source declarations and their `@deprecated` annotations
  -> scripts/deprecations.ts   (marker recovery and validation)
  -> scripts/tokensMeta.ts     (classification, grouping, order, render)
  -> tokensMeta + tokenDeprecations
  -> knowledge-skill deprecations.md
```

The existing generator at `packages/tokens/projects/tokens-meta/scripts/generateTokensMeta.ts` shall classify every
token into exactly one metadata catalog. The skill imports the result and performs no token source scan.

The split mirrors the file layout of the other two annotation-first packages: `scripts/deprecations.ts` holds the same
recovery-and-validation step theirs do and nothing else, while the documented catalog — which they do not have, their
meta being hand-authored — stays in `scripts/tokensMeta.ts`.

## Components

### Token metadata

The package declares **no** deprecation type. `tokenDeprecations` is the shared `Deprecations` from
[`@porsche-design-system/shared/deprecation`](./deprecation-contract-design.md), and the generated module is typed by it
directly:

```ts
export const tokensMeta = { … } satisfies TokensMetaTree;
export const tokenDeprecations: Deprecations = [];
```

`TokenMeta` gains **no** `deprecation` field, so a marker cannot reach the documented catalog; a deprecated token is not
a `TokenMeta` at all, so the two cannot overlap. `deprecation: {}` is a valid, complete marker: the lifecycle sentence
with no replacement named.

The generator emits:

- `tokensMeta`: current tokens only, grouped like the token sources;
- `tokenDeprecations`: deprecated tokens only, in catalog order — export name and marker, nothing else.

A deprecated entry carries no `description` — a legacy token is documented by its `@deprecated` annotation, not by a
docs row — and no `value`, since nothing renders one. The identifier is the export name, which is what a consumer
imports, so no identity helper is needed either.

The wording comes from the shared `getDeprecationComment`: `This API will be removed with the next major release.`,
prefixed by `Use <replacement> instead.` when one is named and followed by the optional `note`. It is also what the
generator validates the source annotation against, so the sentence a consumer's IDE shows and the one the audit renders
are the same string. TypeScript JSDoc is stripped from emitted JavaScript and retained in `.d.ts`, so full sentences
cost consumers nothing.

### Authoritative token annotations

Token source declarations need structured deprecation input that the tokens-meta generator can consume. The
declaration's own `@deprecated` tag is that input — it has to exist regardless, since it is what strikes a token through
in a consumer's IDE, so anything beside it would be a second thing to keep in sync. The replacement is authored as a
`{@link}` symbol reference and the rest of the tag reads exactly as `getDeprecationComment` renders it:

```ts
/**
 * Holds a **frosted** blur effect value.
 *
 * @deprecated Use {@link blurSoft} instead. This API will be removed with the next major release.
 */
export const blurFrosted = 'blur(32px)';
```

This is the [Emotion annotation convention](./emotion-deprecation-metadata-design.md#annotation-convention) applied to
tokens, and `scripts/deprecations.ts` is the same extractor: it **validates** rather than guesses. It takes the
replacement from the link — never as a phrase recovered from the sentence around it — reconstructs the sentence the
shared contract would generate, and compares:

- text equals the generated sentence → `{ replacement }`, no note;
- text starts with it → the remainder becomes the `note`;
- anything else → **the build fails**, naming the token and printing the expected form.

The replacement is additionally checked against the documented exports, so it can be neither a name no token carries nor
a token that is itself deprecated. Cross-file links do not resolve in the annotated file's scope, so the name is what is
checked, and the exports are read before the markers for exactly that reason. Guidance that names anything else — a
private value, a concept — belongs after the lifecycle sentence, where it is carried as the `note`.

One input therefore serves both surfaces: the annotation a consumer's IDE shows and the metadata the audit reads. See
[`packages/tokens/AGENTS.md`](../packages/tokens/AGENTS.md#deprecating-a-token).

### Package export

Update `packages/tokens/projects/tokens-meta/src/index.ts` to export `tokenDeprecations` beside `tokensMeta`, both from
the generated module. The existing root export is sufficient. That is the whole deprecated surface: one array, the same
single export every other source offers the audit.

### Knowledge-skill adapter

Replace `collectTokenDeprecations()` in `collectors/scanned.ts` with a call to the shared `styleAliasSource`
(`collectors/styleAlias.ts`) that the styling solutions already use — these entries are the same `styleAlias` kind. The
collector becomes pure configuration: the published list, an origin sentence and the token reference. An empty manifest
produces the verified-empty Tokens section, order is preserved, and `tokensMetaRoot()` is dropped once nothing else uses
it.

The completeness gate gains a row in its table rather than a new block of assertions.

## Data & state

The token export name is the stable identifier. The package owns token value, description, deprecation details, and
order. The skill owns category, rule ID, and the token reference path.

Metadata trees remain internal and unstable. A future public stable metadata API should normalize entries from both
catalogs and preserve identifiers across lifecycle changes.

## Trade-offs

Generating both catalogs from token source is preferable to separately hand-authoring deprecated metadata because
`tokensMeta` is already generated. A standalone empty array would remove the current scan but would not establish a safe
future deprecation workflow.

### Copying the extraction rather than sharing it

**Chosen:** copy it, as Emotion and vanilla-extract already copy it from each other.

The recovery-and-validation step is identical in all three packages, so a shared helper is the obvious de-duplication.
It is rejected on purpose: `tokens` reads its own sources and stays standalone, and the thing that must not drift is the
_wording_, which is shared already — `getDeprecationComment` is what every copy validates against, so a divergent
sentence is a build error in each of them regardless of who owns the parsing. What is shared is the contract; what is
copied is a few lines of type-checker plumbing over a package's own private layout.

## Risks & mitigations

| Risk                                            | Mitigation                                                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| A deprecated token remains in current metadata. | Make generator classification exclusive and test the partition.                                          |
| Metadata drops a token source declaration.      | Compare generated current and deprecated identities with the generator's complete input set.             |
| Replacement prose is parsed inconsistently.     | Take it from the `{@link}` reference only, and fail the build on an annotation that does not round-trip. |
| An annotation drifts from the shared wording.   | The round-trip comparison is the validator — a divergent sentence is a build error, not a silent note.   |
| Generator ordering changes reference output.    | Preserve generator order and snapshot both catalogs.                                                     |

## Testing strategy

Package tests shall prove:

1. `tokenDeprecations` is exported and explicitly empty in the current release.
2. Every generated token appears exactly once across the two projections.
3. Current metadata contains no deprecation field, and every documented token has a non-empty `description`.
4. Every published entry carries a structured marker, and no field the contract does not define.
5. Token names are unique across both projections.
6. Generated token package exports remain compatible.
7. Both projections match a fresh extraction, so the generated output cannot go stale.
8. Every annotation round-trips, over fixture modules read through the checker exactly like the real declarations: the
   replacement comes from the link, extra guidance becomes the `note`, and an unstructured annotation, an unknown
   replacement or one that is itself deprecated fails the build.

The default wording needs no test here — it is the shared module's, and tested there.

Item 3 is additionally enforced by the compiler: `TokenMeta` has no `deprecation` field, so a marked leaf cannot satisfy
`TokensMetaTree`. The runtime assertions remain as the backstop for generator output typed loosely.

Skills tests derive the category from the published list — never a hand-authored list and never a source scan — and,
with a fixture, verify direct rendering of message and replacement data.

## Rollout

1. Add the structured source annotation and its extractor over the shared contract.
2. Extend `generateTokensMeta.ts` to emit the documented catalog and the deprecated list.
3. Publish the explicit empty `tokenDeprecations`.
4. Replace the skill marker scan with the metadata adapter.
5. Update generator, export, completeness, and skills tests.
6. Remove token source-root resolution from the skill.

## Open questions

None. The source annotation is the `@deprecated` tag with a `{@link}` replacement, described above: structured,
package-owned, validated against the shared wording, and never recovered from prose.

Open for later: generating the token declarations from metadata, at which point the annotation is emitted by
`getDeprecationComment(deprecation, 'jsdoc')` and the validation becomes unnecessary — the same "open for later" the
Emotion and vanilla-extract designs carry.
