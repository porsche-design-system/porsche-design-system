# Stylesheet deprecation metadata design

> **Status:** implemented. The catalog is empty of deprecations today; the contract is in place so the first one is a
> single field rather than a design decision.

## Summary

`cssVariableTokens` and `colorScheme` together already are the stylesheets catalog: every public declaration, and what
the generated CSS is built from. This design adds the shared `deprecation` marker to their two leaf types and derives
**two projections** from that one catalog:

- `stylesheetsMeta` — the catalog without its deprecated declarations, the documented single source of truth the
  storefront and the knowledge reference render.
- `stylesheetsDeprecations` — the deprecated remainder, as the shared `Deprecations` list.

Both are exported from `@porsche-design-system/stylesheets/meta`. A declaration therefore cannot reach a consumer
without being either documented or published as deprecated. The knowledge skill imports `stylesheetsDeprecations`
directly, which replaces its source marker scan.

This follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources), and the shared
contract in [`docs/deprecation-contract-design.md`](./deprecation-contract-design.md).

## Architecture & approach

```text
cssVariableTokens + colorScheme          (the catalog: declarations, deprecated ones marked in place)
  ├─ stripDeprecated / filter  ─→ stylesheetsMeta          ─→ storefront docs, stylesheets.md
  ├─ flatten + isDeprecated    ─→ stylesheetsDeprecations  ─→ knowledge-skill deprecations.md
  └─ css/index.ts              ─→ variables.css / color-scheme.css   (deprecated declarations included)
```

Every public stylesheet variable or utility belongs to exactly one projection. Normalize rules and other internal CSS
composition nodes belong to neither: they are composition plumbing, live only in `css/index.ts`, and were never in the
catalog.

## Components

### The marker is a field, not a second catalog

An earlier revision of this document proposed a separate `stylesheetDeprecationsMeta` catalog with
`DeprecatedCssVariableMeta` / `DeprecatedColorSchemeClassMeta` subtypes. That was superseded by convention 1, which
names this package explicitly: where a package generates its declarations the field is optional on the leaf type and
authored in place, so deprecating is **one edit** and never a move between two catalogs — the move being exactly the
step that gets half-done.

```ts
type CssVariableMetaBase = CssDeclaration &
  Deprecated & {
    description: string;
    type: CssVariableType;
  };

export type ColorSchemeClassMeta = CssRule &
  Deprecated & {
    usage: string;
    description: string;
  };
```

The marker key is never spelled here: `Deprecated` is the shared non-generic slot (`{ deprecation?: Deprecation }`),
intersected into the leaf type, so every source declares it identically.

`description` stays required on both, per convention 2: a deprecated declaration is still rendered into the CSS and
still read by the catalog's reader.

### No new types

scss and Tailwind each declare a `Catalog` union and a key-removing conditional `Meta<T>`. Neither is needed here, and
adding them would be cargo-culted structure:

- A **catalog union** exists in those packages because their catalogs mix arbitrarily nested records and arrays, so only
  a generic walker gets through. Stylesheets is two known shapes — a `StylesheetTokenTree` of variables, and a flat
  `ColorSchemeClassMeta[]` — and `StylesheetTokenTree` already _is_ the catalog type.
- A **conditional `Meta<T>`** exists there because `StylesMeta` has exact keys, so a stripped key must vanish from the
  type too or `satisfies` breaks. `CssVariableTokens` is `Record`-keyed throughout, so the strip is invisible at type
  level and an identity-preserving `<T extends StylesheetTokenTree>(tree: T): T` is both simpler and accurate.

The net addition is two optional fields, one walker (`stripDeprecated`) and one identity helper.

### Identity helper

`stylesheetIdentifier(node)` returns the custom property for a variable and the selector for a utility, discriminated by
`property` so the leaf type narrows. Author `replacement` through it, reading the current node from the catalog, so a
rename cannot leave a deprecation pointing at a name that no longer exists.

Wording is **not** package-owned. The single shared `getDeprecationComment` builds the sentence and wraps it in the
target comment syntax; the knowledge skill records only the `note` and the `replacement`, since its reference states the
lifecycle once for the whole table.

### CSS composition

`css/index.ts` and `scripts/buildCssVariableConstants.ts` keep reading the catalog, so a deprecated variable still
renders into `variables.css` and still gets its generated const — it is deprecated, not removed.

`renderCssNode` emits the full generated comment above a deprecated declaration, in `block` style. CSS has no silent
comment form, so this ships to every consumer — the same trade Tailwind's `index.css` makes, and measured there at 831
bytes for 9 declarations. The catalog is empty today, so the current byte delta is **zero**; deciding the policy now
rather than at the first deprecation is the point.

### Knowledge-skill adapter

`collectors/stylesheets.ts` passes `stylesheetsDeprecations` to the shared `styleAliasSource`, which owns the rule-ID
scheme, the source category, the `replacement` passthrough, the order guarantee and the verified-empty declaration. The
adapter performs no source scan and no package-root resolution; `stylesheetsRoot()` was removed from `packageRoots.ts`
accordingly.

## Data & state

CSS variables use `property` as identity; utilities use `selector`. Package metadata owns declaration data, deprecation
details and order — variables in `variables.css` order, then classes in `color-scheme.css` order. The skill owns source
category, audit ID and reference.

## Trade-offs

### One catalog with an in-place marker, versus two catalogs

**Chosen:** one catalog. Deprecating becomes a single added field. The two-catalog alternative makes it a move, which
can be half-completed — leaving a declaration in both, or in neither.

### Publishing `Deprecations` while it is empty

**Chosen:** publish it empty, as tokens did.

The alternative — wait for the first real deprecation — leaves no marker field on the type and no documented convention,
so a v5 author adds a deprecated variable, writes no marker, and the category still renders _"checked and found to carry
none — this is a verified result, not an omission."_ The audit would then under-report against every consumer project. A
scan is a tripwire that only fires if the author already knew about a convention that did not exist.

### The full comment in generated CSS

**Chosen:** adopt it, matching Tailwind. Consistency across generated artifacts is worth more than bytes that are
currently zero, and the guidance reaches anyone reading the shipped stylesheet.

## Risks & mitigations

| Risk                                                             | Mitigation                                                                                      |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| A deprecated declaration is added only to the CSS composition.   | Composition renders the catalog; there is no second place to add one.                           |
| Current and deprecated identities overlap.                       | Uniqueness is tested across the whole catalog.                                                  |
| CSS output changes while adopting the contract.                  | Generated CSS snapshots are unchanged by this design.                                           |
| The mechanism is unproven because the catalog is empty.          | Fixture tests drive strip, publication and comment rendering, with and without a `replacement`. |
| A documented variable is deprecated without updating a contract. | **Not mitigated** — see below.                                                                  |

### Known gap: no exact-key contract

Tailwind checks `tailwindMeta` against an exact-keyed `StylesMeta`, so deprecating a documented declaration fails the
build until the contract is updated. `CssVariableTokens` is `Record`-keyed, so `satisfies StylesheetsMeta` cannot catch
the same thing. Tightening it to exact keys would give stylesheets that guardrail; it is a separate change with its own
blast radius and is deliberately not part of this one.

## Testing strategy

Package tests (`tests/unit/specs/stylesheetsDeprecations.spec.ts`) prove:

1. `stylesheetsDeprecations` is exported and explicitly empty in this release.
2. No catalog declaration carries a marker, and every catalog declaration is documented.
3. Every identity is unique across the whole catalog.
4. On fixtures: a variable is spelled by its custom property and a class by its selector; a deprecated declaration is
   stripped from the documented tree while current leaves keep object identity; the generated `block` comment is
   rendered above the declaration, both with a `replacement` and with a `note` only; the comment comes from
   `getDeprecationComment` rather than restated wording; and a current declaration renders unchanged.

Skills tests add a `stylesheets` row to the `METADATA_SOURCES` table in
`tests/specs/knowledge/deprecations/completeness.spec.ts`, which gates order, rule IDs, note and replacement
passthrough, the reference link, the declared-empty state, and that the collector imports package metadata rather than
touching the filesystem.

## Rollout

1. Add the `deprecation` field to both leaf types. ✅
2. Add `stylesheetIdentifier` and `stripDeprecated`; emit the comment from `renderCssNode`. ✅
3. Derive and export `stylesheetsMeta` and `stylesheetsDeprecations` from the one catalog. ✅
4. Replace the skill marker scan with the metadata adapter; drop `stylesheetsRoot()`. ✅
5. Add package and skills tests. ✅

## Open questions

None while the catalog is empty. The first utility deprecation should confirm whether the selector alone is sufficient
as its audit identity.
