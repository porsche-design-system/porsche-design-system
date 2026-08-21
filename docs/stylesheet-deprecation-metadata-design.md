# Stylesheet deprecation metadata design

## Summary

Global stylesheet deprecations shall be exported as `stylesheetDeprecationsMeta` beside `stylesheetsMeta` from
`@porsche-design-system/stylesheets/meta`. The deprecated catalog is explicitly empty today and replaces the knowledge
skill's marker scan.

Future deprecated CSS variables or utilities move from current metadata into deprecated metadata while remaining in
generated CSS until removal.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources), with the same
CSS-specific comment caveat as [Tailwind CSS](./tailwindcss-deprecation-metadata-design.md).

## Architecture & approach

```text
stylesheetsMeta + stylesheetDeprecationsMeta
  -> globalStylesMeta composition
  -> generated variables.css / color-scheme.css
  -> knowledge-skill deprecations.md
```

Every public stylesheet variable or utility belongs to exactly one catalog. Normalize rules and other internal CSS
composition nodes remain outside both.

## Components

### Deprecation details

Use the shared `Deprecation` marker (`{ note?, replacement? }`) rather than a package-owned one, plus a deprecated
subtype for each of `CssVariableMeta` and `ColorSchemeClassMeta`:

```ts
export type DeprecatedCssVariableMeta = Omit<CssVariableMeta, 'description'> & {
  description?: string;
  deprecation: StylesheetDeprecation;
};
```

The current node types gain **no** `deprecation` field and the deprecated subtypes require one, so the two catalogs are
kept apart by the compiler rather than by a test. `description` is optional on the deprecated subtypes and omitted in
practice. The existing renderable node shapes remain the source for CSS.

Because the catalog is empty today, adopting the subtypes now costs nothing and means the first real deprecation cannot
be authored in the wrong shape.

### Identity and message helpers

Mirror the SCSS helpers so wording is package-owned and identical across sources. `stylesheetIdentifier(node)` returns
the custom property for a variable and the selector for a utility; author `replacement` through it, reading the current
node from the exported `stylesheetsMeta`.

Default wording is fixed and shared with the other sources: one sentence,
`This API will be removed with the next major release.`, prefixed by `Use <replacement> instead.` when a replacement is
named and followed by the optional `note`. It is built by the shared `getDeprecationComment`, which also wraps it in the
comment syntax the artifact needs — this package declares no wording helper of its own, and the knowledge skill records
only the `note` and the `replacement`, since its reference states the lifecycle once for the whole table.

### Deprecated catalog

Add a domain-keyed `stylesheetDeprecationsMeta` in `packages/components/projects/stylesheets/src/meta.ts`. Reuse the
existing branch types rather than introducing a detailed second tree type. Every current root domain has an explicit
deprecated branch, including empty arrays or objects, so a checked domain stays distinguishable from a forgotten one.

Entries are authored as literal repeated objects — no factory functions and no `.map()` over a tuple table.

### CSS composition

Extend `packages/components/projects/stylesheets/src/css/index.ts` to compose current and deprecated nodes. A deprecated
node's property, value, selectors, and declarations remain unchanged.

As with Tailwind, the generated artifact is plain CSS shipped to consumers verbatim, and CSS has no silent comment form.
Do not standardize generated comments into full sentences here: keep any marker terse, or omit generated comments and
rely on the metadata catalog and `deprecations.md`. Decide explicitly when the first deprecation is authored and record
the byte delta.

### Knowledge-skill adapter

Replace `collectStylesheetDeprecations()` in `collectors/scanned.ts` with a direct import from
`@porsche-design-system/stylesheets/meta`. The adapter adds rule IDs and the stylesheet reference path, sets `message`
from the marker's `note`, carries `replacement` through, preserves order, and performs no source scan or package-root
resolution.

## Data & state

CSS variables use `property` as identity; utilities use `selector`. Package metadata owns declaration data, deprecation
details, and order. The skill owns source category, audit ID, and reference.

## Trade-offs

The separate deprecated catalog preserves `stylesheetsMeta` as recommended API and follows the SCSS and Tailwind
conventions. An empty manifest is preferable to scanning because it is an explicit package contract and establishes the
future workflow.

Adopting the dedicated deprecated subtypes while the catalog is empty costs nothing today and makes the first
deprecation impossible to author in the wrong catalog.

## Risks & mitigations

| Risk                                                | Mitigation                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| Future deprecated CSS is added only to composition. | Require all public declarations to originate from one metadata catalog. |
| Current and deprecated identities overlap.          | Test uniqueness across both catalogs.                                   |
| CSS output changes during movement.                 | Preserve composition positions and compare generated CSS snapshots.     |
| Internal normalize declarations are indexed.        | Keep explicitly internal composition nodes outside public catalogs.     |
| Generated comments inflate every consumer's CSS.    | Keep markers terse or omit them; measure the byte delta of any change.  |

## Testing strategy

Package tests shall prove:

1. `stylesheetDeprecationsMeta` is exported and explicitly empty today, with every root domain present.
2. Current metadata contains no deprecated nodes, and every documented leaf has a non-empty `description`.
3. Every future deprecated node carries details and a unique identity.
4. Every generated public variable or utility originates from exactly one catalog, and every catalog node is rendered
   exactly once.
5. Internal composition nodes remain excluded.
6. Generated CSS behavior and order remain stable, and the generated comment payload does not grow.
7. A fixture entry receives the shared default wording for both the replacement and no-replacement cases.

Skills tests derive the category from the imported catalog — never a hand-authored list and never a source scan — and
prove the empty category is metadata-derived with no package-root resolution remaining.

## Rollout

1. Add the deprecation detail, the `Deprecated*` node subtypes, the identity helper and the two message helpers.
2. Add and export the explicit empty deprecated catalog with every root domain present.
3. Extend CSS composition to support future deprecated nodes, and record the generated-comment policy.
4. Replace the skill marker scan with the metadata adapter.
5. Add metadata, composition, export, and skills tests.
6. Remove stylesheet source-root resolution from the skill.

## Open questions

None while the catalog is empty. The first utility deprecation should confirm whether selector alone is sufficient as
its audit identity.
