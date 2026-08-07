# Stylesheet deprecation metadata design

## Summary

Global stylesheet deprecations shall be exported as `stylesheetDeprecationsMeta` beside `stylesheetsMeta` from
`@porsche-design-system/stylesheets/meta`. The deprecated catalog is explicitly empty today and replaces the knowledge
skill's marker scan.

Future deprecated CSS variables or utilities move from current metadata into deprecated metadata while remaining in
generated CSS until removal.

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

Add a package-owned optional deprecation object to `CssVariableMeta` and `ColorSchemeClassMeta`, with optional `message`
and `replacement`. The existing renderable node shapes remain the source for CSS.

### Deprecated catalog

Add a domain-keyed `stylesheetDeprecationsMeta` in `packages/components/projects/stylesheets/src/meta.ts`. Reuse
existing node and branch types rather than introducing a detailed second tree type. Every current root domain has an
explicit deprecated branch, including empty arrays or objects.

### CSS composition

Extend `packages/components/projects/stylesheets/src/css/index.ts` to compose current and deprecated nodes. Generate
standardized standalone `@deprecated` comments from metadata. A deprecated node's property, value, selectors, and
declarations remain unchanged.

### Knowledge-skill adapter

Replace `collectStylesheetDeprecations()` in `collectors/scanned.ts` with a direct import from
`@porsche-design-system/stylesheets/meta`. The adapter adds rule IDs and the stylesheet reference path, preserves order,
and performs no source scan.

## Data & state

CSS variables use `property` as identity; utilities use `selector`. Package metadata owns declaration data, deprecation
details, and order. The skill owns source category, audit ID, and reference.

## Trade-offs

The separate deprecated catalog preserves `stylesheetsMeta` as recommended API and follows SCSS/Tailwind conventions. An
empty manifest is preferable to scanning because it is an explicit package contract and establishes the future workflow.

## Risks & mitigations

| Risk                                                | Mitigation                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| Future deprecated CSS is added only to composition. | Require all public declarations to originate from one metadata catalog. |
| Current and deprecated identities overlap.          | Test uniqueness across both catalogs.                                   |
| CSS output changes during movement.                 | Preserve composition positions and compare generated CSS snapshots.     |
| Internal normalize declarations are indexed.        | Keep explicitly internal composition nodes outside public catalogs.     |

## Testing strategy

Package tests shall prove:

1. `stylesheetDeprecationsMeta` is exported and explicitly empty today.
2. Current metadata contains no deprecated nodes.
3. Every future deprecated node carries details and a unique identity.
4. Every generated public variable or utility originates from exactly one catalog.
5. Internal composition nodes remain excluded.
6. Generated CSS behavior and order remain stable.

Skills tests verify the empty category is metadata-derived and require no source files or package-root resolution.

## Rollout

1. Add optional deprecation fields and a package message helper.
2. Add and export the explicit empty deprecated catalog.
3. Extend CSS composition to support future deprecated nodes.
4. Replace the skill marker scan with the metadata adapter.
5. Add metadata, composition, export, and skills tests.
6. Remove stylesheet source-root resolution from the skill.

## Open questions

None while the catalog is empty. The first utility deprecation should confirm whether selector alone is sufficient as
its audit identity.
