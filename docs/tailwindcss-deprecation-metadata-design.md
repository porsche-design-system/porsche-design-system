# Tailwind CSS deprecation metadata design

## Summary

Tailwind CSS deprecations shall be authored in `tailwindDeprecationsMeta`, exported beside `tailwindMeta` from
`@porsche-design-system/tailwindcss`. The current `tailwindMeta` remains the recommended API.

Deprecated custom-property aliases currently stored as CSS-only nodes with `alias (deprecated)` comments shall move into
structured metadata. The Tailwind build renders those nodes, and the knowledge skill maps the same object directly into
`deprecations.md`.

This design follows the conventions established by the implemented
[SCSS deprecation metadata design](./scss-deprecation-metadata-design.md#conventions-for-other-sources); the sections
below record only how they apply to Tailwind CSS, where the generated artifact is plain CSS rather than SCSS.

Tailwind CSS is the **meta-first** case of
[the rule that decides the mechanism](./scss-deprecation-metadata-design.md#the-rule-that-decides-the-mechanism): the
metadata generates `index.css`, so the metadata is where a deprecation is authored, and the catalog below is that
authoring surface. The knowledge skill's current scan of the generated `index.css` for `alias (deprecated)` markers is
exactly what this replaces — a generated artifact is never the source it is read back from. Emotion and vanilla-extract
sit in the annotation-first row instead, and author no catalog at all.

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

Add a Tailwind-owned deprecation detail and one deprecated subtype per renderable public leaf:

```ts
export type TailwindDeprecation = {
  /** Optional note replacing the package default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing identifier, such as `--shadow-sm`. */
  replacement?: string;
};

export type DeprecatedTailwindThemeVariable = Omit<TailwindThemeVariable, 'description'> & {
  description?: string;
  deprecation: TailwindDeprecation;
};
```

`TailwindThemeVariable` and `TailwindUtility` gain **no** `deprecation` field, and the deprecated subtypes require one,
so a node in the wrong catalog fails to compile rather than relying on a test. `description` is optional on the
deprecated subtypes and is omitted in practice.

Deprecated custom-property aliases use `property` as their identifier; deprecated utilities use `class` or `selector`.

### Identity and message helpers

Mirror the SCSS helpers. `tailwindIdentifier(node)` returns the public identity — the custom property for a theme
variable, the class or selector for a utility. Author `replacement` as `tailwindIdentifier(<current node>)` read from
the exported `tailwindMeta`, never a retyped string and never an intermediate local const.

Default wording is fixed and shared with SCSS:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

`tailwindDeprecationMessage(node)` returns the lifecycle sentence the knowledge skill records as `message`;
`tailwindDeprecationText(node)` prefixes `Use <replacement> instead.` for any generated comment.

### Authoring conventions

Deprecated entries are authored as literal repeated objects — no factory functions and no `.map()` over a tuple table.

### Domain metadata

Move the deprecated border-width entries currently mixed into `borderWidthThemeVariables`, plus
`shadowDeprecatedThemeVariables` and `motionDeprecatedThemeVariables`, into domain-owned deprecated metadata carrying
structured replacements. For example, `--shadow-low` records `tailwindIdentifier(tailwindMeta.shadow.sm)` as its
replacement, resolved through the existing prefix mechanism.

No deprecated alias remains an unclassified `CssNode` in `src/css/index.ts`.

### CSS renderer and composition

Compose `tailwindDeprecationsMeta` into the same positions in the `@theme` block so declaration order and generated
behavior remain stable.

Comments need a decision the SCSS phase did not: **CSS has no silent comment form.** SCSS could move its markers to `//`
so they document the shipped partial while contributing nothing to a consumer's compiled output. `index.css` is consumed
as-is, so every byte of every comment reaches the browser. The SCSS migration measured this: standardizing 126 terse
`/* alias (deprecated) */` markers into full sentences would have grown the payload from 3 KB to 12 KB.

Therefore do **not** expand the existing markers into generated sentences. Either keep a terse marker or omit generated
comments from `index.css` entirely and rely on the metadata catalog and `deprecations.md`, which are the authoritative
index either way. Whichever is chosen, record the measured byte delta in the change;
`packages/styles/projects/tailwindcss/src/css/render.ts` should render at most what that decision allows.

### Package and skill exports

Export `tailwindDeprecationsMeta` from the existing package root. Replace `collectTailwindcssDeprecations()` with a
direct metadata adapter that derives rule IDs and the Tailwind reference path, sets `message` from the package message
helper and carries `replacement` through, omitting it rather than setting `undefined` when absent. The adapter preserves
metadata order and performs no CSS parsing, sorting, or package-root resolution.

## Data & state

Custom-property identity is `property`; utility identity is its public class or selector. Package metadata owns
deprecation wording, replacement, values, and order. The skill owns `styleAlias/tailwindcss/` IDs and
`references/styles/tailwindcss.md`.

## Trade-offs

The current Tailwind leaf types lack a common `name`, but adding one only for deprecations would duplicate `property` or
`class`. Structural identity remains simpler and matches existing renderers, and the identity helper hides the
difference from consumers.

Keeping deprecated aliases as generic CSS plumbing is rejected because it forces downstream parsing. Internal non-public
CSS nodes remain outside both public catalogs.

Dedicated deprecated leaf types with a required `deprecation` are preferred over an optional field on the shared type,
so a node in the wrong catalog is a compile error rather than a test failure — the same reasoning as SCSS.

Unlike SCSS, generated comments are not standardized into full sentences, because CSS offers no silent comment and the
generated stylesheet is shipped verbatim. The metadata catalog carries the full guidance instead.

## Risks & mitigations

| Risk                                                   | Mitigation                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Moving aliases changes `index.css` order or values.    | Preserve composition positions and compare generated CSS snapshots.                         |
| Internal declarations are mistaken for public aliases. | Require `deprecation` and a public identity before inclusion in `tailwindDeprecationsMeta`. |
| Replacement properties drift.                          | Derive replacement identifiers from current metadata nodes through the identity helper.     |
| Generated comments inflate every consumer's CSS.       | Do not expand markers into sentences; measure the byte delta of any comment change.         |

## Testing strategy

Package tests shall prove:

1. `tailwindMeta` has no deprecated nodes, and every documented leaf has a non-empty `description`.
2. Every deprecated node has a unique public identity and deprecation details.
3. Current and deprecated identities are disjoint.
4. Every generated public Tailwind declaration originates from one catalog, and every catalog node is rendered exactly
   once.
5. Internal CSS plumbing remains explicitly outside both catalogs.
6. Generated CSS values and order remain stable, and the generated comment payload does not grow.
7. An empty `deprecation: {}` receives the no-replacement default, a replacement prefixes the sentence, and an authored
   `message` overrides the default.
8. The root package exports both metadata objects.

Skills tests derive their expectations from `tailwindDeprecationsMeta` using the package's own helpers — never a
hand-authored identity list and never a re-parse of `index.css` — and prove that collected identities, order, rule IDs,
messages, replacements and reference links match it entry for entry, with no CSS file access remaining.

## Rollout

1. Add the deprecation detail, the `Deprecated*` leaf subtypes, the identity helper and the two message helpers.
2. Decide and record the generated-comment policy for `index.css`, with the measured byte delta.
3. Convert border-width, shadow, and motion aliases to structured deprecated metadata.
4. Assemble and export `tailwindDeprecationsMeta`.
5. Compose deprecated metadata into `tailwindCssMeta`.
6. Update renderer and CSS snapshots.
7. Replace the skill collector with the direct adapter.
8. Remove generated-CSS parsing and Tailwind package-root resolution.

## Open questions

None for the currently deprecated custom-property aliases. A future deprecated utility can use the same catalog with its
class as identity.
