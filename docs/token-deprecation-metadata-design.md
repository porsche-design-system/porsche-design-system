# Token deprecation metadata design

## Summary

Token deprecations shall be generated into `tokenDeprecationsMeta` beside `tokensMeta` and published as
`tokenDeprecations` from `@porsche-design-system/tokens-meta`. It is explicitly empty today and replaces the knowledge
skill's source-marker scan.

The generated `tokensMeta` remains the recommended token catalog. Future deprecated token exports remain available in
`@porsche-design-system/tokens` until removal but move from `tokensMeta` into `tokenDeprecationsMeta`.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources). The
literal-object authoring convention does not apply, because both catalogs are generator output rather than hand-authored
— the equivalent constraint is that the _generator input_ carries structured deprecation data. It is implemented.

## Architecture & approach

```text
token source declarations and structured deprecation annotations
  -> tokens-meta generator
  -> tokensMeta + tokenDeprecationsMeta
  -> knowledge-skill deprecations.md
```

The existing generator at `packages/tokens/projects/tokens-meta/scripts/generateTokensMeta.ts` shall classify every
token into exactly one metadata catalog. The skill imports the result and performs no token source scan.

## Components

### Token metadata

The marker and the leaf wrapper come from
[`@porsche-design-system/shared/deprecation`](./deprecation-contract-design.md); the package
declares neither:

```ts
export type DeprecatedTokenMeta = Deprecated<Omit<TokenMeta, 'description'>>;
export type TokenDeprecationsMeta = Record<keyof TokensMetaTree, TokenDeprecationsTree>;
```

`TokenMeta` itself gains **no** `deprecation` field, so the generator cannot emit a deprecated token into `tokensMeta`
or a current token into `tokenDeprecationsMeta` without a compile error. `deprecation: {}` is a valid, complete marker:
the lifecycle sentence with no replacement named. The `description` is omitted here rather than by the shared
`Deprecated<T>`, which strips nothing: the generated `@deprecated` JSDoc carries the guidance and nothing renders a docs
row for a legacy token, and stating the omission locally keeps it visible where it is made.

The generator emits:

- `tokensMeta`: current tokens only;
- `tokenDeprecationsMeta`: deprecated tokens only, preserving generator order.

Both reuse the existing `TokensMetaTree` shape; no detailed second tree type is required. The deprecation block lives at
the end of the types file, in the order every other package uses — leaf alias, then catalog.

### Identity helper

The wording is shared, so the package adds only canonical identity. `tokenIdentifier(node)` returns the public export
name, and `replacement` is authored through it against the current catalog rather than as a retyped string. It stays
internal: what the package publishes is `tokenDeprecations`, typed by the shared `Deprecations` — one deprecation
export, an ordered flat list of `{ identifier, deprecation }`, with identifiers already spelled. A three-line
`flattenTokenDeprecations` walks the generated tree, since the shape is this package's own.

The wording comes from the shared `getDeprecationComment`, which is also what renders the `@deprecated` JSDoc:
`This API will be removed with the next major release.`, prefixed by `Use <replacement> instead.` when one is named and
followed by the optional `note`. TypeScript JSDoc is stripped from emitted JavaScript and retained in `.d.ts`, so full
sentences cost consumers nothing.

### Authoritative token annotations

Token source declarations need structured deprecation input that the tokens-meta generator can consume. Existing
`@deprecated` JSDoc may remain for IDE declarations, but replacement data must be represented structurally rather than
parsed from prose. The token package's source annotation and generated declaration documentation must share one
package-owned descriptor or generation input.

The implemented annotation is the declaration's own `@deprecated` tag, with the replacement authored as a `{@link}`
symbol reference:

```ts
/**
 * Holds a **frosted** blur effect value.
 *
 * @deprecated {@link blurSoft}
 */
export const blurFrosted = 'blur(32px)';
```

The generator reads the link through the TypeScript type checker, never the sentence around it, and fails both when the
link resolves to nothing and when it names a token the documented catalog does not contain. Text beside the link becomes
the `note`; a bare `@deprecated` is the complete marker. One input therefore serves both surfaces: the annotation a
consumer's IDE shows and the metadata the audit reads. See
[`packages/tokens/AGENTS.md`](../packages/tokens/AGENTS.md#deprecating-a-token).

### Package export

Update `packages/tokens/projects/tokens-meta/src/index.ts` to export `tokenDeprecations`. The existing root export is
sufficient. `tokenDeprecationsMeta` stays internal — its grouping is generator bookkeeping, not something a consumer of
the deprecated surface needs.

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

## Risks & mitigations

| Risk                                            | Mitigation                                                                                   |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| A deprecated token remains in current metadata. | Make generator classification exclusive and test the partition.                              |
| Metadata drops a token source declaration.      | Compare generated current and deprecated identities with the generator's complete input set. |
| Replacement prose is parsed inconsistently.     | Store replacement structurally in package-owned source data.                                 |
| Generator ordering changes reference output.    | Preserve generator order and snapshot both catalogs.                                         |

## Testing strategy

Package tests shall prove:

1. `tokenDeprecations` is exported and explicitly empty in the current release.
2. Every generated token appears exactly once across the two catalogs.
3. Current metadata contains no deprecation field, and every documented token has a non-empty `description`.
4. Deprecated metadata entries always carry deprecation details.
5. Token names are unique across both catalogs.
6. Generated token package exports remain compatible.

The default wording needs no test here — it is the shared module's, and tested there.

Items 3 and 4 are additionally enforced by the compiler through `DeprecatedTokenMeta`; the runtime assertions remain as
the backstop for generator output typed loosely.

Skills tests derive the category from the published list — never a hand-authored list and never a source scan — and,
with a fixture, verify direct rendering of message and replacement data.

## Rollout

1. Add `DeprecatedTokenMeta` and the identity helper over the shared contract, plus the structured source annotation.
2. Extend `generateTokensMeta.ts` to emit current and deprecated catalogs.
3. Publish the explicit empty `tokenDeprecations`.
4. Replace the skill marker scan with the metadata adapter.
5. Update generator, export, completeness, and skills tests.
6. Remove token source-root resolution from the skill.

## Open questions

None. The source annotation is the `@deprecated` tag with a `{@link}` replacement, described above: structured,
package-owned, and never recovered from prose.
