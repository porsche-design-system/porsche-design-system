# Token deprecation metadata design

## Summary

Token deprecations shall be exported as `tokenDeprecationsMeta` beside `tokensMeta` from
`@porsche-design-system/tokens-meta`. It is explicitly empty today and replaces the knowledge skill's source-marker
scan.

The generated `tokensMeta` remains the recommended token catalog. Future deprecated token exports remain available in
`@porsche-design-system/tokens` until removal but move from `tokensMeta` into `tokenDeprecationsMeta`.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources). The
literal-object authoring convention does not apply, because both catalogs are generator output rather than hand-authored
— the equivalent constraint is that the _generator input_ carries structured deprecation data.

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

Add a package-owned deprecation detail with optional `message` and `replacement`, and a `DeprecatedTokenMeta` subtype
that requires it:

```ts
export type DeprecatedTokenMeta = Omit<TokenMeta, 'description'> & {
  description?: string;
  deprecation: TokenDeprecation;
};
```

`TokenMeta` itself gains **no** `deprecation` field, so the generator cannot emit a deprecated token into `tokensMeta`
or a current token into `tokenDeprecationsMeta` without a compile error. `deprecation: {}` means the default
no-replacement message. `description` is optional on the deprecated subtype because the generated `@deprecated` JSDoc
carries the guidance.

The generator emits:

- `tokensMeta`: current tokens only;
- `tokenDeprecationsMeta`: deprecated tokens only, preserving generator order.

Both reuse the existing `TokensMetaTree` shape; no detailed second tree type is required.

### Identity and message helpers

Mirror the SCSS helpers so wording is package-owned and identical across sources. `tokenIdentifier(node)` returns the
public export name, and `replacement` is authored through it against the current catalog rather than as a retyped
string.

Default wording is fixed and shared:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

`tokenDeprecationMessage(node)` returns the lifecycle sentence the knowledge skill records as `message`;
`tokenDeprecationText(node)` prefixes `Use <replacement> instead.` for the generated `@deprecated` JSDoc. TypeScript
JSDoc is stripped from emitted JavaScript and retained in `.d.ts`, so full sentences cost consumers nothing.

### Authoritative token annotations

Token source declarations need structured deprecation input that the tokens-meta generator can consume. Existing
`@deprecated` JSDoc may remain for IDE declarations, but replacement data must be represented structurally rather than
parsed from prose. The token package's source annotation and generated declaration documentation must share one
package-owned descriptor or generation input.

### Package export

Update `packages/tokens/projects/tokens-meta/src/index.ts` to export `tokenDeprecationsMeta`. The existing root export
is sufficient.

### Knowledge-skill adapter

Replace `collectTokenDeprecations()` in `collectors/scanned.ts` with a direct metadata adapter that adds only the rule
ID, category and token reference path, sets `message` from `tokenDeprecationMessage(node)` and carries `replacement`
through. An empty manifest produces the verified-empty Tokens section. Metadata order is preserved, and
`tokensMetaRoot()` is dropped once nothing else uses it.

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

1. `tokenDeprecationsMeta` is exported and explicitly empty in the current release.
2. Every generated token appears exactly once across the two catalogs.
3. Current metadata contains no deprecation field, and every documented token has a non-empty `description`.
4. Deprecated metadata entries always carry deprecation details.
5. Token names are unique across both catalogs.
6. A fixture entry receives the shared default wording for both the replacement and no-replacement cases.
7. Generated token package exports remain compatible.

Items 3 and 4 are additionally enforced by the compiler through `DeprecatedTokenMeta`; the runtime assertions remain as
the backstop for generator output typed loosely.

Skills tests derive the category from the imported catalog using the package's own helpers — never a hand-authored list
and never a source scan — and, with a fixture, verify direct rendering of message and replacement data.

## Rollout

1. Add the deprecation detail, `DeprecatedTokenMeta`, the identity helper, the two message helpers, and the structured
   source annotation.
2. Extend `generateTokensMeta.ts` to emit current and deprecated catalogs.
3. Export the explicit empty `tokenDeprecationsMeta`.
4. Replace the skill marker scan with the metadata adapter.
5. Update generator, export, completeness, and skills tests.
6. Remove token source-root resolution from the skill.

## Open questions

The exact source annotation belongs to the token generator design. It must be structured and package-owned; parsing
replacement text from JSDoc is not acceptable.
