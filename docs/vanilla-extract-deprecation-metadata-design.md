# vanilla-extract deprecation metadata design

## Summary

vanilla-extract deprecations shall be exposed through `vanillaExtractDeprecationsMeta` from
`@porsche-design-system/vanilla-extract/meta`. The existing `vanillaExtractMeta` remains the current, documented,
deprecation-free API.

The knowledge skill shall import this metadata directly instead of traversing deprecated barrels, resolving TypeScript
declarations, parsing JSDoc, or deriving replacements from prose.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources), and mirrors
[Emotion](./emotion-deprecation-metadata-design.md) wherever the two packages already share patterns.

## Architecture & approach

```text
vanilla-extract deprecated export descriptors
  -> deprecated values, styles, functions, types, and @deprecated declarations
  -> vanillaExtractDeprecationsMeta
  -> knowledge-skill deprecations.md
```

The descriptor and generated export are one package-owned source of truth. Metadata order is authoritative and is
preserved by the skill.

## Components

### Deprecation details and export descriptors

Add a package-owned `VanillaExtractDeprecation` with optional `message` and `replacement`, plus one deprecated subtype
per leaf kind:

```ts
export type DeprecatedVanillaExtractToken = Omit<VanillaExtractToken, 'description'> & {
  description?: string;
  deprecation: VanillaExtractDeprecation;
};
```

`VanillaExtractToken` and `VanillaExtractUtility` gain no `deprecation` field, and the deprecated subtypes require one,
so neither catalog can absorb the other's entries without a compile error. `description` is optional and omitted in
practice — the generated `@deprecated` JSDoc is the documentation.

The deprecated surface also contains public type exports and functions, so add a minimal descriptor for entries that do
not fit existing leaves:

```ts
export type DeprecatedVanillaExtractExportMeta = {
  name: string;
  exportKind: 'value' | 'function' | 'type';
  description?: string;
  deprecation: VanillaExtractDeprecation;
};
```

### Identity and message helpers

Mirror SCSS and Emotion. Default wording is fixed and shared:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

Expose `vanillaExtractDeprecationMessage(node)` for the lifecycle sentence the knowledge skill records as `message`, and
`vanillaExtractDeprecationText(node)` for the generated JSDoc, which prefixes `Use <replacement> instead.`. An empty
`deprecation: {}` uses the no-replacement default.

Replacement identifiers are vanilla-extract export names authored through `vanillaExtractIdentifier(<current node>)`
read from the exported current catalog — never a retyped string, never an intermediate local const, and never a parsed
JSDoc fragment.

### Authoring conventions

Deprecated entries are authored as literal repeated objects — no factory functions and no `.map()` over a tuple table.

### Deprecated source generation

Descriptors live with the existing domains under `packages/styles/projects/vanilla-extract/src/*/deprecated/`. They
generate or directly share authorship with:

- public values and style objects;
- function implementations and parameter types;
- public type aliases;
- `@deprecated` declaration documentation;
- metadata entries.

vanilla-extract style generation and class-name behavior must remain unchanged. Any descriptor code generation must run
before the existing Rollup and test-style generation steps.

### Metadata export

Assemble `vanillaExtractDeprecationsMeta` beside `packages/styles/projects/vanilla-extract/vanillaExtractMeta/meta.ts`
and expose it through the existing `./meta` subpath.

### Knowledge-skill adapter

Replace `collectVanillaExtractDeprecations()` in `collectors/styleExports.ts` with a direct metadata import. The adapter
adds stable rule IDs, source category, and `references/styles/vanilla-extract.md`, sets `message` from the package
message helper and carries `replacement` through, omitting it rather than setting `undefined` when absent. It does not
sort, parse, or touch the filesystem, and `vanillaExtractRoot()` is dropped once nothing else uses it.

## Data & state

The public export name is the stable identity. The package owns export kind, message, replacement, and order. The skill
owns audit IDs and reference links.

The current and deprecated metadata trees are internal package contracts. A future stable public metadata API should be
a normalized facade generated from both, not the exact domain tree.

## Trade-offs

The design intentionally mirrors Emotion because both packages currently share deprecated directory and collector
patterns. It diverges only where vanilla-extract needs generated style artifacts or type declarations.

Keeping handwritten deprecated modules with independently authored metadata is rejected because it recreates the drift
the refactor is intended to remove. A temporary package-local parity test is acceptable only during migration.

## Risks & mitigations

| Risk                                                                 | Mitigation                                                                                     |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Generated style exports change class names or CSS.                   | Retain generated test-style snapshots and compare runtime exports before migration completion. |
| Public type aliases are omitted because they carry no runtime value. | Model export kind explicitly and test the built declaration surface.                           |
| Internal shared types are indexed as public deprecations.            | Populate metadata from explicit public descriptor lists matching deprecated barrels.           |
| Emotion and vanilla-extract drift.                                   | Reuse descriptor conventions and compare intentionally shared deprecated names.                |
| Build order changes generated test styles.                           | Run descriptor generation before both package Rollup and `generateVanillaExtractTestStyles`.   |

## Testing strategy

Package tests shall prove:

1. `vanillaExtractMeta` contains no deprecated entries, and every documented leaf has a non-empty `description`.
2. Every deprecated metadata name is unique and publicly exported.
3. Every public deprecated barrel export appears exactly once in metadata, and every metadata entry has exactly one
   generated export.
4. Runtime exports, generated styles, and declarations remain compatible.
5. Messages and replacements come from descriptors, and the default wording matches the shared lifecycle sentences.
6. The metadata export is available through `@porsche-design-system/vanilla-extract/meta`.

Skills tests derive their expectations from `vanillaExtractDeprecationsMeta` using the package's own helpers — never a
hand-authored name list and never a re-parse of package sources — and prove that collected names, order, rule IDs,
messages, replacements and reference links match it entry for entry, with no filesystem or JSDoc collector remaining.

## Rollout

1. Define the deprecation detail, the `Deprecated*` leaf subtypes, the export descriptor, the identity helper and the
   two message helpers.
2. Inventory all public deprecated barrel exports, including types.
3. Convert each domain to descriptors and preserve runtime/style output.
4. Assemble and export `vanillaExtractDeprecationsMeta`.
5. Replace the skill collector with a direct adapter.
6. Update package, declaration, generated-style, and skill snapshots.
7. Remove vanilla-extract parsing from `styleExports.ts`.
8. Remove temporary parity checks after descriptor generation owns every deprecated declaration.

## Open questions

The source-versus-build location of generated deprecated modules may differ from Emotion because vanilla-extract test
style generation consumes source modules. The descriptor must remain usable by that step.
