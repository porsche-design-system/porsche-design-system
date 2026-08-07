# Tailwind CSS deprecation metadata design

## Summary

Tailwind CSS deprecations shall be authored in `tailwindDeprecationsMeta`, exported beside `tailwindMeta` from
`@porsche-design-system/tailwindcss`. The current `tailwindMeta` remains the recommended API.

Deprecated custom-property aliases currently stored as CSS-only nodes with `alias (deprecated)` comments shall move into
structured metadata. The Tailwind build renders those nodes, and the knowledge skill maps the same object directly into
`deprecations.md`.

## Architecture & approach

```text
tailwindMeta + tailwindDeprecationsMeta
  -> Tailwind CSS composition and index.css
  -> package metadata exports
  -> knowledge-skill deprecations.md
```

Every supported public Tailwind variable or utility belongs to exactly one current or deprecated catalog. Internal
defaults, resets, keyframes, and implementation-only declarations remain in the composition layer.

## Components

### Deprecation field

Add a Tailwind-owned deprecation detail to renderable public leaves:

```ts
export type TailwindDeprecation = {
  message?: string;
  replacement?: string;
};
```

`TailwindThemeVariable` and `TailwindUtility` gain optional `deprecation`. Deprecated custom-property aliases use
`property` as their identifier; deprecated utilities use `class` or `selector`.

### Domain metadata

Move the deprecated border-width entries currently mixed into `borderWidthThemeVariables`, plus
`shadowDeprecatedThemeVariables` and `motionDeprecatedThemeVariables`, into domain-owned deprecated metadata carrying
descriptions and structured replacements. For example, `--shadow-low` references `tailwindMeta.shadow.sm.property`
through the existing prefix mechanism and records `--shadow-sm` as its replacement.

No deprecated alias remains an unclassified `CssNode` in `src/css/index.ts`.

### CSS renderer and composition

Extend `packages/styles/projects/tailwindcss/src/css/render.ts` to render a standardized standalone `@deprecated`
comment from metadata. Compose `tailwindDeprecationsMeta` into the same positions in the `@theme` block so declaration
order and generated behavior remain stable.

### Package and skill exports

Export `tailwindDeprecationsMeta` from the existing package root. Replace `collectTailwindcssDeprecations()` with a
direct metadata adapter that derives rule IDs and the Tailwind reference path. The adapter preserves metadata order and
performs no CSS parsing or sorting.

## Data & state

Custom-property identity is `property`; utility identity is its public class or selector. Package metadata owns
deprecation wording, replacement, values, and order. The skill owns `styleAlias/tailwindcss/` IDs and
`references/styles/tailwindcss.md`.

## Trade-offs

The current Tailwind leaf types lack a common `name`, but adding one only for deprecations would duplicate `property` or
`class`. Structural identity remains simpler and matches existing renderers.

Keeping deprecated aliases as generic CSS plumbing is rejected because it forces downstream parsing. Internal non-public
CSS nodes remain outside both public catalogs.

## Risks & mitigations

| Risk                                                   | Mitigation                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Moving aliases changes `index.css` order or values.    | Preserve composition positions and compare generated CSS snapshots.                         |
| Internal declarations are mistaken for public aliases. | Require `deprecation` and a public identity before inclusion in `tailwindDeprecationsMeta`. |
| Replacement properties drift.                          | Derive alias values and replacement identifiers from current metadata nodes.                |
| Comment normalization affects snapshots.               | Treat standardized comments as the only intentional text change.                            |

## Testing strategy

Package tests shall prove:

1. `tailwindMeta` has no deprecated nodes.
2. Every deprecated node has a unique public identity and deprecation details.
3. Current and deprecated identities are disjoint.
4. Every generated public Tailwind declaration originates from one catalog.
5. Internal CSS plumbing remains explicitly outside both catalogs.
6. Generated CSS values and order remain stable apart from standardized comments.
7. The root package exports both metadata objects.

Skills tests verify the existing rule IDs, metadata order, replacement rendering, reference links, and absence of CSS
file access.

## Rollout

1. Add the deprecation field and package message helper.
2. Convert border-width, shadow, and motion aliases to structured deprecated metadata.
3. Assemble and export `tailwindDeprecationsMeta`.
4. Compose deprecated metadata into `tailwindCssMeta`.
5. Update renderer and CSS snapshots.
6. Replace the skill collector with the direct adapter.
7. Remove generated-CSS parsing and Tailwind package-root resolution.

## Open questions

None for the currently deprecated custom-property aliases. A future deprecated utility can use the same catalog with its
class as identity.
