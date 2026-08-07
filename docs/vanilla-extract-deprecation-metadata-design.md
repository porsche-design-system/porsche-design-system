# vanilla-extract deprecation metadata design

## Summary

vanilla-extract deprecations shall be exposed through `vanillaExtractDeprecationsMeta` from
`@porsche-design-system/vanilla-extract/meta`. The existing `vanillaExtractMeta` remains the current, documented,
deprecation-free API.

The knowledge skill shall import this metadata directly instead of traversing deprecated barrels, resolving TypeScript
declarations, parsing JSDoc, or deriving replacements from prose.

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

Add a package-owned `VanillaExtractDeprecation` with optional `message` and `replacement`. Existing
`VanillaExtractToken` and `VanillaExtractUtility` leaves may carry it where appropriate.

The deprecated surface also contains public type exports and functions, so add a minimal descriptor for entries that do
not fit existing leaves:

```ts
export type DeprecatedVanillaExtractExportMeta = {
  name: string;
  exportKind: 'value' | 'function' | 'type';
  deprecation: VanillaExtractDeprecation;
};
```

An empty deprecation object uses package default wording. Replacement identifiers are vanilla-extract export names, not
parsed JSDoc fragments.

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
adds stable rule IDs, source category, and `references/styles/vanilla-extract.md`; it does not sort or parse.

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

1. `vanillaExtractMeta` contains no deprecated entries.
2. Every deprecated metadata name is unique and publicly exported.
3. Every public deprecated barrel export appears exactly once in metadata.
4. Runtime exports, generated styles, and declarations remain compatible.
5. Messages and replacements come from descriptors.
6. The metadata export is available through `@porsche-design-system/vanilla-extract/meta`.

Skills tests retain the existing rule-ID set, verify metadata order and links, and assert no filesystem/JSDoc collector
is used.

## Rollout

1. Define package-owned deprecation and export descriptor shapes.
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
