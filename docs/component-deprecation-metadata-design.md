# Component deprecation metadata design

## Summary

> The shared deprecation contract this design builds on was reduced to `Deprecation`, `Deprecated<T>`, `Deprecations`,
> `isDeprecated` and `getDeprecationComment` — see
> [`docs/deprecation-contract-design.md`](./deprecation-contract-design.md), which is authoritative wherever the prose
> below names a removed helper.

Component deprecations shall be exported as structured `componentDeprecationsMeta` from
`@porsche-design-system/component-meta`. Unlike the styling catalogs, deprecated components, props, events, slots, CSS
variables, and values remain in the complete `componentMeta` object because component documentation and tooling require
the full supported API.

`componentDeprecationsMeta` is generated from the same structured component metadata; it is not separately authored. The
knowledge skill imports it directly and no longer cleans `@deprecated` prose, parses replacements, calculates current
value alternatives, or sorts entries.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources), with one
documented exception. Components cannot use the type-level split those conventions prescribe: a deprecated prop moved
out of `componentMeta` would make the supported component API incomplete for documentation and tooling. Components
therefore keep one complete catalog and **derive** a deprecated-only view from it, and the "no `deprecation` on the
current type" rule does not apply. Every other convention does — required `deprecation` on derived entries, optional and
omitted `description`, the shared default wording and helpers, one-to-one adapter mapping, and a completeness gate
derived from the package catalog.

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
  /** Optional note replacing the package default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing identifier of the replacement. */
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

Because the complete catalog must keep documenting deprecated entities, `deprecation` is optional here — unlike the
styling catalogs, where the field's absence on the current type is what keeps the two apart. The required-`deprecation`
guarantee moves to the derived catalog's entry type instead.

### Message helper

Ship the shared wording helpers so components state the same lifecycle sentences as every other source:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

`componentDeprecationMessage(entity)` returns the lifecycle sentence the knowledge skill records as `message`, and the
skill renders `replacement` in its own column. Where a component's existing hand-written message must be preserved
verbatim to avoid changing rendered documentation, it is carried as an authored `message`. The knowledge skill
implements no fallback wording and performs no message cleanup.

### Generated deprecation catalog

`packages/component-meta/scripts/generateComponentMeta.ts` shall emit a package-owned catalog whose entry type requires
`deprecation`, with entries for:

- components;
- props;
- prop values;
- events;
- slots;
- CSS variables.

Each entry contains entity kind, identifier, owner and prop context where applicable, final message, and optional
replacement. `description` is optional on entries and omitted, since the entry is not a documentation row. Skill rule
IDs and reference paths remain outside the package.

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

It sets `message` from `componentDeprecationMessage(entity)`, carries `replacement` through — omitted rather than set to
`undefined` when absent so the Markdown remediation column composes cleanly — preserves metadata order, and contains no
message cleanup, replacement regex, allowed-value comparison, or sorting.

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

This is the one documented departure from the SCSS conventions, which keep the two catalogs disjoint at the type level
by omitting `deprecation` from the current leaf types. That is unavailable here, so the equivalent guarantee is provided
one level down: the derived catalog's entry type requires `deprecation`, and a test asserts the derivation is total in
both directions.

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
2. Every structured deprecation produces exactly one `componentDeprecationsMeta` entry, and every entry traces back to
   exactly one structured deprecation.
3. Every deprecated value has per-value metadata and remains in the compatibility array.
4. Entry identities are unique and deterministic.
5. Components and their supported deprecated entities remain present in `componentMeta`.
6. Icon-name values are assigned only to the icon category.
7. A fixture entity receives the shared default wording for both the replacement and no-replacement cases.
8. The generated package exports both metadata objects.

Skills tests derive their expectations from `componentDeprecationsMeta` using the package's own helper — never a
hand-authored rule-ID list — and prove that collected identities, order, rule IDs, messages, replacements and reference
links match it entry for entry, with no prose or replacement parser remaining in the collector.

## Rollout

1. Add structured deprecation and per-value metadata types, plus the shared message helper.
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
