# Component deprecation metadata design

## Summary

Component deprecations shall be exported as structured `componentDeprecationsMeta` from
`@porsche-design-system/component-meta`. Unlike the styling catalogs, deprecated components, props, events, slots, CSS
variables, and values remain in the complete `componentMeta` object because component documentation and tooling require
the full supported API.

`componentDeprecationsMeta` is generated from the same structured component metadata; it is not separately authored. The
knowledge skill imports it directly and no longer cleans `@deprecated` prose, parses replacements, calculates current
value alternatives, or sorts entries.

## Architecture & approach

```text
component source annotations and package-owned deprecation descriptors
  -> generateComponentMeta.ts
  -> componentMeta + componentDeprecationsMeta
  -> component documentation and knowledge-skill deprecations.md
```

`componentMeta` remains backward-compatible and complete. The generator adds structured deprecation details and emits a
normalized deprecated-only view in deterministic component/entity order.

## Components

### Structured entity deprecations

Add a common component-owned detail:

```ts
export type ComponentDeprecation = {
  message?: string;
  replacement?: string;
};
```

Components, props, events, slots, and CSS variables gain structured deprecation details. Existing fields such as
`isDeprecated` and component `deprecationMessage` remain during compatibility migration and are generated from the same
detail.

Deprecated prop values need per-value structure:

```ts
export type DeprecatedValueMeta = Record<string, ComponentDeprecation>;
```

Retain `deprecatedValues?: string[]` as a derived compatibility field while exposing structured replacement/message data
for each value. The skill must not infer remediation from remaining `allowedValues`.

### Generated deprecation catalog

`packages/component-meta/scripts/generateComponentMeta.ts` shall emit a package-owned catalog with entries for:

- components;
- props;
- prop values;
- events;
- slots;
- CSS variables.

Each entry contains entity kind, identifier, owner and prop context where applicable, final message, and optional
replacement. Skill rule IDs and reference paths remain outside the package.

Icon-name deprecations are excluded from the component category and supplied by the icon-owned metadata described in
`docs/icon-deprecation-metadata-design.md`, while compatibility fields on `p-icon` remain available.

### Source annotation ownership

The component-meta generator already extracts JSDoc and source structures. Extend its package-owned annotations so
replacement is structured rather than parsed from prose. Existing deprecation messages may be migrated without changing
rendered documentation.

The knowledge skill does not inspect descriptions. Any source parsing needed to generate `componentMeta` remains
encapsulated in the owning package.

### Knowledge-skill adapter

Replace `collectors/componentMeta.ts` with a direct adapter over `componentDeprecationsMeta`. It adds:

- stable audit rule IDs;
- component reference paths;
- the `components` source category.

It preserves metadata order and contains no message cleanup, replacement regex, allowed-value comparison, or sorting.

## Data & state

Entity identity is:

```text
component: tag
prop/event/slot/cssVariable: owner + identifier
value: owner + prop + identifier
```

The component-meta package owns entity classification and remediation facts. The skill owns report IDs and links.

`componentMeta` is currently exported but undocumented as a stable public API. This design does not stabilize its exact
shape. A future stable facade can normalize entries while preserving entity identities.

## Trade-offs

### Derived rather than separate authorship

Components differ from current-only styling catalogs. Moving deprecated props out of `componentMeta` would make the
supported component API incomplete. Deriving the deprecation catalog avoids both data loss and duplicate maintenance.

### Compatibility fields

Keeping `isDeprecated`, `deprecationMessage`, and `deprecatedValues` temporarily adds redundancy to generated output,
but preserves existing consumers while structured fields become authoritative.

## Risks & mitigations

| Risk                                                | Mitigation                                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Legacy fields and structured details diverge.       | Generate compatibility fields from the structured detail and test equality.          |
| Deprecated prop values lose individual remediation. | Require a per-value descriptor and derive only the legacy values array.              |
| Icon values are emitted in two categories.          | Assign icon-name ownership to icon metadata and exclude them from component entries. |
| Entity order changes generated references.          | Preserve `TAG_NAMES` and entity object order and snapshot the catalog.               |
| Existing documentation changes unexpectedly.        | Compare component reference output before removing skill-side cleanup.               |

## Testing strategy

Component-meta tests shall prove:

1. Every legacy deprecation flag corresponds to structured details.
2. Every structured deprecation produces exactly one `componentDeprecationsMeta` entry.
3. Every deprecated value has per-value metadata and remains in the compatibility array.
4. Entry identities are unique and deterministic.
5. Components and their supported deprecated entities remain present in `componentMeta`.
6. Icon-name values are assigned only to the icon category.
7. The generated package exports both metadata objects.

Skills tests retain the existing component rule-ID set and links while asserting that the collector imports metadata and
contains no prose or replacement parser.

## Rollout

1. Add structured deprecation and per-value metadata types.
2. Extend component source annotations and generator extraction.
3. Generate compatibility fields from structured details.
4. Generate and export `componentDeprecationsMeta`.
5. Coordinate icon-name ownership with the icons package.
6. Replace the skill collector with the direct adapter.
7. Update component-meta, component-reference, and deprecation-reference snapshots.
8. Remove skill-side message cleanup, replacement parsing, value remediation inference, and sorting.

## Open questions

The source syntax for structured replacements must fit the existing component generation conventions. It may be a
dedicated JSDoc tag or an imported descriptor, but it must not require the skill to interpret prose.

Deprecated TypeScript-only exports are not collected by the current component deprecation section and remain outside
this metadata-source migration. Adding them later requires a new knowledge entry kind and an explicit public-export
inventory rather than silently folding them into component entities.
