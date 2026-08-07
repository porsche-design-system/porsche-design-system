# Token deprecation metadata design

## Summary

Token deprecations shall be exported as `tokenDeprecationsMeta` beside `tokensMeta` from
`@porsche-design-system/tokens-meta`. It is explicitly empty today and replaces the knowledge skill's source-marker
scan.

The generated `tokensMeta` remains the recommended token catalog. Future deprecated token exports remain available in
`@porsche-design-system/tokens` until removal but move from `tokensMeta` into `tokenDeprecationsMeta`.

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

Extend `TokenMeta` with an optional package-owned deprecation object containing optional `message` and `replacement`.
`deprecation: {}` means the default no-replacement message.

The generator emits:

- `tokensMeta`: current tokens only;
- `tokenDeprecationsMeta`: deprecated tokens only, preserving generator order.

Both use the existing `TokenMeta` and `TokensMetaTree` types; no detailed second tree type is required.

### Authoritative token annotations

Token source declarations need structured deprecation input that the tokens-meta generator can consume. Existing
`@deprecated` JSDoc may remain for IDE declarations, but replacement data must be represented structurally rather than
parsed from prose. The token package's source annotation and generated declaration documentation must share one
package-owned descriptor or generation input.

### Package export

Update `packages/tokens/projects/tokens-meta/src/index.ts` to export `tokenDeprecationsMeta`. The existing root export
is sufficient.

### Knowledge-skill adapter

Replace `collectTokenDeprecations()` in `collectors/scanned.ts` with a direct metadata adapter. An empty manifest
produces the verified-empty Tokens section. Metadata order is preserved.

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
3. Current metadata contains no deprecation field.
4. Deprecated metadata entries always carry deprecation details.
5. Token names are unique across both catalogs.
6. Generated token package exports remain compatible.

Skills tests verify the empty category without scanning and, with a fixture, verify direct rendering of message and
replacement data.

## Rollout

1. Add the optional deprecation field and structured source annotation.
2. Extend `generateTokensMeta.ts` to emit current and deprecated catalogs.
3. Export the explicit empty `tokenDeprecationsMeta`.
4. Replace the skill marker scan with the metadata adapter.
5. Update generator, export, completeness, and skills tests.
6. Remove token source-root resolution from the skill.

## Open questions

The exact source annotation belongs to the token generator design. It must be structured and package-owned; parsing
replacement text from JSDoc is not acceptable.
