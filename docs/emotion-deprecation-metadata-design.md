# Emotion deprecation metadata design

## Summary

Emotion deprecations shall be exposed through a package-owned `emotionDeprecationsMeta` object from
`@porsche-design-system/emotion/meta`. The existing `emotionMeta` remains the current, documented API and stays
deprecation-free.

The metadata replaces the knowledge skill's traversal of `src/*/deprecated/index.ts`, declaration lookup, JSDoc parsing,
replacement parsing, and package-root resolution. Deprecated TypeScript exports and their metadata must share one
package-owned descriptor so names, messages, replacements, and exported declarations cannot drift.

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

Add an Emotion-owned metadata detail:

```ts
export type EmotionDeprecation = {
  message?: string;
  replacement?: string;
};
```

Existing `EmotionToken` and `EmotionUtility` leaves may gain `deprecation?: EmotionDeprecation` where their shape fits.
Deprecated public type exports and aliases that do not fit those runtime leaf shapes use a minimal export descriptor:

```ts
export type DeprecatedEmotionExportMeta = {
  name: string;
  exportKind: 'value' | 'function' | 'type';
  deprecation: EmotionDeprecation;
};
```

The package owns default wording for an empty `deprecation: {}`. The public metadata exposes the final message or an
exported package helper resolves it; the knowledge skill does not implement fallback wording.

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
- the package-owned message and replacement.

The adapter preserves metadata order and contains no filesystem, export-graph, declaration, JSDoc, or prose parsing.

## Data & state

The stable identity is the public Emotion export name. Package metadata owns export kind, message, replacement, and
authored order. The knowledge skill owns audit rule IDs and `references/styles/emotion.md`.

The metadata trees remain internal, undocumented package interfaces. If a stable public metadata API is needed later, it
should be a normalized catalog generated from current and deprecated metadata rather than stabilizing their exact tree
shape.

## Trade-offs

### Separate deprecated metadata

Keeping `emotionMeta` current-only preserves its alignment with SCSS and vanilla-extract and prevents deprecated exports
from appearing in normal API documentation.

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

1. `emotionMeta` remains deprecation-free.
2. Every `emotionDeprecationsMeta` entry has a unique public name and deprecation details.
3. Every deprecated public export is represented exactly once and no private helper is represented.
4. Generated deprecated runtime exports and declarations match the existing API.
5. Replacement names reference current exports or are explicitly documented free-form guidance.
6. `emotionDeprecationsMeta` is exported from `@porsche-design-system/emotion/meta`.

Skills tests shall prove the complete existing rule-ID set is retained, metadata order is preserved, all entries link to
the Emotion reference, and no collector accesses package files.

## Rollout

1. Define the minimal deprecation and deprecated-export descriptor shapes.
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
