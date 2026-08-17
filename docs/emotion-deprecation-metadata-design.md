# Emotion deprecation metadata design

## Summary

Emotion deprecations shall be exposed through a package-owned `emotionDeprecationsMeta` object from
`@porsche-design-system/emotion/meta`. The existing `emotionMeta` remains the current, documented API and stays
deprecation-free.

The metadata replaces the knowledge skill's traversal of `src/*/deprecated/index.ts`, declaration lookup, JSDoc parsing,
replacement parsing, and package-root resolution. Deprecated TypeScript exports and their metadata must share one
package-owned descriptor so names, messages, replacements, and exported declarations cannot drift.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources); the sections
below record only how they apply to Emotion.

## Architecture & approach

```text
Emotion deprecated export descriptors
  -> deprecated TypeScript exports and @deprecated declarations
  -> emotionDeprecationsMeta
  -> knowledge-skill deprecations.md
```

`emotionMeta` and `emotionDeprecationsMeta` are separate authoritative catalogs. A current Emotion export is moved from
the current metadata into the deprecated metadata when deprecated, while its runtime export remains available until its
scheduled removal.

The package's metadata order is the rendered `deprecations.md` order. The knowledge skill performs no sorting.

## Components

### Deprecation details

Add an Emotion-owned metadata detail and one deprecated subtype per leaf kind:

```ts
export type EmotionDeprecation = {
  /** Optional note replacing the package default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing export name, such as `radiusLg`. */
  replacement?: string;
};

export type DeprecatedEmotionToken = Omit<EmotionToken, 'description'> & {
  description?: string;
  deprecation: EmotionDeprecation;
};
```

`EmotionToken` and `EmotionUtility` gain **no** `deprecation` field, and the deprecated subtypes require one. The
separation between the two catalogs is therefore a compile error in both directions rather than something a test has to
notice. `description` is optional on the deprecated subtypes and is omitted in practice, because a legacy export is
documented by its generated `@deprecated` JSDoc and nothing reads a deprecated entry's description.

Deprecated public type exports and aliases that do not fit those runtime leaf shapes use a minimal export descriptor:

```ts
export type DeprecatedEmotionExportMeta = {
  name: string;
  exportKind: 'value' | 'function' | 'type';
  description?: string;
  deprecation: EmotionDeprecation;
};
```

### Identity and message helpers

Mirror the SCSS helpers. `emotionIdentifier(node)` returns the public export name; because Emotion identifiers need no
decoration it is a thin accessor, but authoring `replacement` through it — reading the current node straight from the
exported `emotionMeta`, never a retyped string and never an intermediate local const — is what keeps a replacement from
outliving a rename.

Default wording is fixed and shared with SCSS:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

Expose `emotionDeprecationMessage(node)` for the lifecycle sentence — which the knowledge skill uses as the entry's
`message`, rendering `replacement` in its own column — and `emotionDeprecationText(node)` for the generated JSDoc, which
prefixes `Use <replacement> instead.`. The knowledge skill implements no fallback wording.

TypeScript is unconstrained here in a way SCSS was not: `@deprecated` JSDoc is stripped from emitted JavaScript by the
bundler and retained in `.d.ts`, where it drives IDE strikethrough. Full sentences cost consumers nothing.

### Authoring conventions

Deprecated entries are authored as literal repeated objects — no factory functions and no `.map()` over a tuple table —
so what is declared is readable at the point of declaration and a one-off exception stays cheap.

### Authoritative descriptors

The current deprecated surface lives under `packages/styles/projects/emotion/src/*/deprecated/`. Introduce package-local
descriptors beside those domains and use them to produce:

- the public deprecated export name;
- its `@deprecated` declaration documentation;
- its runtime value, function body, or type declaration;
- its `emotionDeprecationsMeta` entry.

During migration, generated deprecated modules must remain byte-equivalent in runtime behavior and type shape. A
package-local generation step is preferred over separately authored JSDoc and metadata. If a declaration cannot
initially be generated, a temporary package-local parity test may compare its export and JSDoc with the descriptor; the
knowledge skill must never perform that comparison.

### Root metadata

Assemble a domain-keyed object beside `emotionMeta` in `packages/styles/projects/emotion/emotionMeta/meta.ts`:

```ts
export const emotionDeprecationsMeta = {
  border: borderDeprecations,
  blur: blurDeprecations,
  // Remaining domains in authored order.
};
```

Export it through the existing `@porsche-design-system/emotion/meta` subpath. No new package subpath is required.

### Knowledge-skill adapter

Replace `collectEmotionDeprecations()` in
`packages/storefront/projects/skills/src/knowledge/deprecations/collectors/styleExports.ts` with a direct import and
mapping step. The adapter adds only:

- `styleAlias/emotion/<name>` rule IDs;
- category and reference fields;
- `message` from `emotionDeprecationMessage(node)` and `replacement` from the metadata, the latter omitted rather than
  set to `undefined` when absent so the Markdown remediation column composes cleanly.

The adapter preserves metadata order and contains no filesystem, export-graph, declaration, JSDoc, or prose parsing.
`emotionRoot()` is dropped from the skill's package-root helpers once nothing else uses it.

## Data & state

The stable identity is the public Emotion export name. Package metadata owns export kind, message, replacement, and
authored order. The knowledge skill owns audit rule IDs and `references/styles/emotion.md`.

The metadata trees remain internal, undocumented package interfaces. If a stable public metadata API is needed later, it
should be a normalized catalog generated from current and deprecated metadata rather than stabilizing their exact tree
shape.

## Trade-offs

### Separate deprecated metadata

Keeping `emotionMeta` current-only preserves its alignment with SCSS and vanilla-extract and prevents deprecated exports
from appearing in normal API documentation. As in SCSS, the split is expressed as dedicated deprecated types with a
required `deprecation` rather than an optional field on the shared leaf, so a node in the wrong catalog fails to compile
instead of relying on a test to notice.

### Generated declarations

Generating deprecated modules requires more package code than retaining handwritten declarations, but it eliminates the
current duplicate truth between source JSDoc and metadata. A permanent source parser in the skill is rejected.

### Package-specific export descriptors

Emotion has deprecated values, functions, and types, so its descriptor cannot be identical to SCSS variables and mixins.
The common consumer fields remain `name`, `message`, and `replacement`.

## Risks & mitigations

| Risk                                                                  | Mitigation                                                                                                     |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Generated deprecated exports change runtime behavior or declarations. | Retain package declaration/runtime snapshots and compare public exports before replacing handwritten modules.  |
| Internal helper exports are accidentally indexed.                     | Build metadata from explicit public descriptor lists, not directory traversal.                                 |
| JSDoc and metadata diverge during migration.                          | Generate both from one descriptor or retain a temporary package-local parity test.                             |
| Emotion and vanilla-extract catalogs drift.                           | Share generator conventions and cross-solution identity tests where their deprecated APIs intentionally match. |
| Metadata ordering creates noisy reference changes.                    | Treat descriptor order as rendered order and snapshot it.                                                      |

## Testing strategy

Package tests shall prove:

1. `emotionMeta` remains deprecation-free, and every documented leaf has a non-empty `description`.
2. Every `emotionDeprecationsMeta` entry has a unique public name and deprecation details.
3. Every deprecated public export is represented exactly once and no private helper is represented.
4. Every catalog entry corresponds to exactly one generated export, and every generated deprecated export to exactly one
   catalog entry.
5. Generated deprecated runtime exports and declarations match the existing API.
6. Replacement names reference current exports or are explicitly documented free-form guidance.
7. An empty `deprecation: {}` receives the no-replacement default, a replacement prefixes the sentence, and an authored
   `message` overrides the default.
8. `emotionDeprecationsMeta` is exported from `@porsche-design-system/emotion/meta`.

Skills tests shall derive their expectations from `emotionDeprecationsMeta` using the package's own helpers — never a
hand-authored name list and never a re-parse of package sources — and prove that collected names, order, rule IDs,
messages and replacements match it entry for entry, that every entry links to the Emotion reference, and that the
collector performs no filesystem access.

## Rollout

1. Define the deprecation detail, the `Deprecated*` leaf subtypes, the export descriptor, the identity helper and the
   two message helpers.
2. Inventory the public exports currently reachable through every Emotion `deprecated/index.ts`.
3. Convert each domain to package-owned descriptors while preserving declarations and behavior.
4. Assemble and export `emotionDeprecationsMeta`.
5. Replace the skill collector with the direct metadata adapter.
6. Update package and skills snapshots.
7. Remove Emotion export-graph, declaration, JSDoc, replacement, and package-root parsing from the skill.
8. Remove temporary package-local parity checks after all deprecated declarations are descriptor-generated.

## Open questions

The implementation must choose whether deprecated source modules are generated in place or emitted only into build
output. Either is acceptable if source review remains practical and the descriptor is authoritative.
