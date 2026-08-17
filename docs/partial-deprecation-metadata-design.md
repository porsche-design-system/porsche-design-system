# Partial deprecation metadata design

## Summary

Partials currently expose functions but no metadata and have no deprecations. Introduce an explicit
`partialDeprecationsMeta` export from `@porsche-design-system/partials/meta` so the knowledge skill can remove its
source marker scan.

The metadata subpath must be built before skills without requiring the full partials package, which currently builds
later as part of components-js.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources).

## Architecture & approach

```text
partial deprecation descriptors
  -> metadata-only partials build
  -> @porsche-design-system/partials/meta
  -> knowledge-skill deprecations.md

partial implementations
  -> existing later partials build and wrapper copies
```

The initial manifest is explicitly empty. Before the first partial deprecation, the affected public export and its
metadata must share one package-owned descriptor so implementation JSDoc and metadata cannot drift.

## Components

### Partial metadata contract

Add a minimal type independent of React and generated partial code:

```ts
export type PartialDeprecation = {
  /** Optional note replacing the package default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing export name. */
  replacement?: string;
};

export type DeprecatedPartialMeta = {
  name: string;
  description?: string;
  deprecation: PartialDeprecation;
};
```

`deprecation` is required, so an entry cannot reach the manifest without its lifecycle detail. `description` is optional
and omitted in practice — the generated `@deprecated` JSDoc is the documentation. Should a full `partialsMeta` be added
later, its entries must not carry a `deprecation` field, keeping the two catalogs disjoint at the type level.

Export `partialDeprecationsMeta` as an empty ordered array initially. A complete `partialsMeta` is not required solely
to remove the scan, although it may be introduced later for documentation.

Ship the shared wording helpers alongside it. Default messages are fixed and identical across sources:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

`partialDeprecationMessage(node)` returns the lifecycle sentence the knowledge skill records as `message`;
`partialDeprecationText(node)` prefixes `Use <replacement> instead.` for the generated `@deprecated` JSDoc. Entries are
authored as literal repeated objects.

### Metadata-only build

Add a small Rollup input and output that compiles only metadata and types into a `meta/` directory. Add a `./meta`
export to `packages/components-js/projects/partials/package.json`.

The root build must run this metadata target before `build:skills`. It must not execute `buildPartials.ts`, depend on
React JSX runtime, or copy wrapper artifacts. The existing full partial build remains after skills.

### Future deprecation authorship

When a partial function is first deprecated:

- keep the function exported until removal;
- add one package-owned descriptor with message and replacement;
- generate or derive its `@deprecated` declaration documentation from that descriptor;
- add it to `partialDeprecationsMeta`;
- keep runtime behavior unchanged.

A permanent independently maintained list is rejected. A temporary package-local parity test is acceptable while the
first descriptor-generation path is introduced.

### Knowledge-skill adapter

Replace `collectPartialDeprecations()` in `collectors/scanned.ts` with a direct import from the new metadata subpath.
The adapter preserves manifest order, adds category, rule ID, and partial reference information, sets `message` from
`partialDeprecationMessage(node)` and carries `replacement` through. `partialsRoot()` is dropped once nothing else uses
it.

## Data & state

The public partial export name is the identity. The partials package owns lifecycle and remediation. The skill owns
audit IDs and reference links.

The metadata schema is internal and may evolve before it becomes documented as a stable public interface.

## Trade-offs

A metadata-only build avoids moving the complete partials build earlier and avoids a new workspace package. Exporting an
empty array from unbuilt source would rely on workspace resolution details and would not represent the installed package
contract.

Creating a complete `partialsMeta` now would improve symmetry but adds documentation scope unrelated to removing the
deprecation scan.

## Risks & mitigations

| Risk                                              | Mitigation                                                                                         |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Skills run before the metadata artifact exists.   | Add the metadata-only target to core dependency ordering and test a clean build.                   |
| Metadata build pulls in React or generated files. | Keep its entry dependency-free and separate from `src/index.ts`.                                   |
| First deprecation becomes manually duplicated.    | Require descriptor-owned declaration documentation before allowing a non-empty manifest.           |
| Full partial build overwrites metadata output.    | Use separate `meta/` and `dist/` directories and clean/build scripts that preserve intended order. |

## Testing strategy

Partials tests shall prove:

1. `@porsche-design-system/partials/meta` resolves after the metadata-only build.
2. The current manifest is explicitly empty.
3. The metadata target has no runtime partial or React dependency.
4. A fixture descriptor renders the shared default wording for both the replacement and no-replacement cases.
5. A clean root build makes metadata available before skills and still builds full partials later.

Skills tests derive the category from the imported contract using the package's own helper — never a hand-authored list
and never a source scan — and prove no source scan remains.

## Rollout

1. Add metadata types, the message helpers, the entry point, the Rollup target, and the package subpath.
2. Export the explicit empty manifest.
3. Wire the metadata-only build before `build:skills`.
4. Replace the skill marker scan with the direct adapter.
5. Add clean-build, package-resolution, and skills tests.
6. Remove partial source-root resolution from the skill.
7. Introduce descriptor-driven declaration generation when the first deprecation is authored.

## Open questions

The root command that owns the metadata-only build should be chosen to avoid rebuilding full partials. The required
invariant is that the installed `./meta` subpath exists before skills execute.
