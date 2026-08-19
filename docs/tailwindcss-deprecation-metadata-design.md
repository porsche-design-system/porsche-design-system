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

This design is implemented.

Tailwind CSS is the **meta-first** case of
[the rule that decides the mechanism](./scss-deprecation-metadata-design.md#the-rule-that-decides-the-mechanism): the
metadata generates `index.css`, so the metadata is where a deprecation is authored, and the catalog below is that
authoring surface. The knowledge skill's current scan of the generated `index.css` for `alias (deprecated)` markers is
exactly what this replaces — a generated artifact is never the source it is read back from. Emotion and vanilla-extract
publish the same catalog shape but sit in the annotation-first row: theirs is generated from the `@deprecated`
annotations their declarations already carry, rather than authored.

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
export type DeprecatedTailwindThemeVariable = Deprecated<TailwindThemeVariable>;
export type DeprecatedTailwindUtility = Deprecated<TailwindUtility>;
export type DeprecatedTailwindNode = DeprecatedTailwindThemeVariable | DeprecatedTailwindUtility;
```

`Deprecated<T>` and the `Deprecation` marker it carries are the shared contract from `@porsche-design-system/shared`;
Tailwind declares no deprecation detail type of its own.

Both subtypes exist from the start even though only theme variables are deprecated today, so the first deprecated
utility is an authoring change rather than a type change — the same shape SCSS settled on.

`TailwindThemeVariable` and `TailwindUtility` gain **no** `deprecation` field, and `Deprecated<T>` requires one, so a
node in the wrong catalog fails to compile rather than relying on a test. `description` is optional on the deprecated
subtypes and is omitted in practice.

Deprecated custom-property aliases use `property` as their identifier; deprecated utilities use `class` or `selector`.

### Identity and message helpers

Mirror the SCSS helpers. `tailwindIdentifier(node)` returns the public identity as a consumer writes it — the plain
custom property (`--shadow-sm`) for a theme variable, the class or selector for a utility. It is deliberately _not_
prefixed: `prefix()` / `--theme()` wraps an alias's **value** so it resolves under a configured Tailwind prefix, while
the declared property in `index.css` — and therefore the audit identity — stays unprefixed.

Author `replacement` as `tailwindIdentifier(<current node>)` read from the exported `tailwindMeta`, never a retyped
string and never an intermediate local const.

Identity is all the package adds. The marker, the guard and the wording come from
`@porsche-design-system/shared/deprecation`, shared with SCSS:

- with replacement: `This API will be removed with the next major release.`;
- without replacement: `This API will be removed with the next major release and has no replacement.`.

`deprecationMessage(node)` returns the lifecycle sentence the knowledge skill records as `message`;
`deprecationText(node)` prefixes `Use <replacement> instead.` for a generated comment — unused here, since the marker in
`index.css` stays terse.

Rather than making consumers walk the nested catalog, the package publishes `tailwindDeprecations`: the same catalog as
an ordered flat list, mirroring `scssDeprecations`, so the adapter and the tests need neither a tree walk nor a cast.

### Authoring conventions

Deprecated entries are authored as literal repeated objects — no factory functions and no `.map()` over a tuple table.

### Domain metadata

Each domain module exports its current metadata and its deprecated metadata beside each other — `shadow` and
`shadowDeprecations` in `src/theme/shadow.ts` — replacing today's `shadowDeprecatedThemeVariables` /
`motionDeprecatedThemeVariables` `CssNode[]` arrays and the two aliases mixed into `borderWidthThemeVariables`. Every
node carries a structured replacement, e.g. `--shadow-low` records `tailwindIdentifier(tailwindMeta.shadow.sm)`.

No deprecated alias remains an unclassified `CssNode` in `src/css/index.ts`.

The border-width aliases need one decision the shadow and motion aliases do not: they are currently in **both** catalogs
— documented leaves of `tailwindMeta.border.width` _and_ index entries, because their `comment` marker reaches the
generated CSS the collector scans. Moving them out is what makes the catalogs disjoint, and it is a deliberate change to
the recommended shape:

- `tailwindMeta.border.width` keeps only `--default-border-width`. No type edit is needed —
  `TailwindMeta['border'].width` is a `TailwindThemeVariable[]`, not a keyed record — but the documented surface
  genuinely shrank;
- the storefront `tailwindcss/border/api` table and the Tailwind skill reference each lose two rows;
- both aliases record `tailwindIdentifier(<the default border width node>)` as their replacement, following the
  migration guide: _"The CSS variables `--border-width-thin` and `--border-width-regular` are deprecated. The default
  border width is now `1px` via `--default-border-width`."_ Because `--border-width-regular` is `2px` and the default is
  `1px`, it also authors
  `message: 'The default border width is now 1px. This API will be removed with the next major release.'`, so the
  remediation states the value change rather than implying an equivalent swap.

### Root deprecation catalog

Assemble `tailwindDeprecationsMeta` beside `tailwindMeta` in `src/meta.ts`; the package root already provides the stable
JavaScript metadata export, so no new subpath is needed.

The nested catalog stays **internal**, as in SCSS: its grouping is routing information for the `@theme` composition, and
`src/index.ts` publishes the flat `tailwindDeprecations` instead.

```ts
export const tailwindDeprecationsMeta = {
  border: borderDeprecations,
  blur: [],
  // Remaining domains, empty ones included.
} satisfies Record<keyof TailwindMeta, TailwindDeprecationsBranch>;
```

Every root domain of `TailwindMeta` is spelled out, empty branches included, so "checked, nothing deprecated" stays
distinguishable from "forgotten". Key order is the rendered contract: the knowledge skill emits entries in exactly this
order, which replaces today's alphabetical sort. Only `border`, `shadow` and `motion` are populated.

### CSS renderer and composition

Compose `tailwindDeprecationsMeta` into the same positions in the `@theme` block so declaration order and generated
behavior remain stable.

Comments need a decision the SCSS phase did not: **CSS has no silent comment form.** SCSS could move its markers to `//`
so they document the shipped partial while contributing nothing to a consumer's compiled output. `index.css` is consumed
as-is, so every byte of every comment reaches the browser. The SCSS migration measured this: standardizing 126 terse
`/* alias (deprecated) */` markers into full sentences would have grown the payload from 3 KB to 12 KB.

**Decided:** keep the existing terse `/* alias (deprecated) */` marker, but render it from the node's `deprecation`
instead of its generic `comment` field, exactly as `render.ts` derives the SCSS marker. The nine markers are unchanged
strings in unchanged positions, so the byte delta is **0** and `index.css` still tells a reader an alias is legacy.
Expanding them into sentences stays rejected, and the full guidance — replacement and lifecycle message — lives in the
catalog and `deprecations.md`.

### Package and skill exports

Export `tailwindDeprecations`, the deprecated types and `tailwindIdentifier` from the existing package root; the marker
and message helpers come from `@porsche-design-system/shared/deprecation`. Replace `collectTailwindcssDeprecations()`
with a direct metadata adapter that derives rule IDs and the Tailwind reference path, sets `message` from the package
message helper and carries `replacement` through, omitting it rather than setting `undefined` when absent. The adapter
preserves metadata order and performs no CSS parsing, sorting, or package-root resolution.

`tailwindcssRoot()` is dropped from the skill's package-root helpers, as is the completeness gate's `index.css` marker
scan. The rendered index changes accordingly: the nine entries keep their identifiers and rule IDs but move to catalog
order, gain a populated remediation column, and their message becomes the shared default (or the authored one) instead
of the collector's hardcoded sentence.

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

| Risk                                                    | Mitigation                                                                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Moving aliases changes `index.css` order or values.     | Preserve composition positions and compare generated CSS snapshots.                                          |
| Internal declarations are mistaken for public aliases.  | Require `deprecation` and a public identity before inclusion in `tailwindDeprecationsMeta`.                  |
| The border-width aliases silently vanish from the docs. | The move is intentional and recorded here; the API table and skill snapshots are updated in the same change. |
| Replacement properties drift.                           | Derive replacement identifiers from current metadata nodes through the identity helper.                      |
| Generated comments inflate every consumer's CSS.        | Do not expand markers into sentences; measure the byte delta of any comment change.                          |

## Testing strategy

Package tests shall prove:

1. `tailwindMeta` has no deprecated nodes, and every documented leaf has a non-empty `description`.
2. Every deprecated node has a unique public identity and deprecation details.
3. Current and deprecated identities are disjoint.
4. Every generated public Tailwind declaration originates from one catalog, and every catalog node is rendered exactly
   once.
5. Internal CSS plumbing remains explicitly outside both catalogs. Two families are matched by pattern rather than
   listed: the `--_*`-prefixed per-scheme fallbacks (the package's own private-name convention) and the
   Tailwind-required `--*--line-height` size companions.
6. Generated CSS values and order remain stable, and the generated comment payload does not grow.
7. An empty `deprecation: {}` receives the no-replacement default, a replacement prefixes the sentence, and an authored
   `message` overrides the default.
8. The root package exports both metadata objects, and the deprecated catalog is keyed by every `tailwindMeta` domain in
   catalog order.

Skills tests derive their expectations from `tailwindDeprecationsMeta` using the package's own helpers — never a
hand-authored identity list and never a re-parse of `index.css` — and prove that collected identities, order, rule IDs,
messages, replacements and reference links match it entry for entry, with no CSS file access remaining.

## Rollout

1. Add the deprecation detail, the `Deprecated*` leaf subtypes, the identity helper, the two message helpers and the
   `isDeprecated` guard; export `flatten`.
2. Convert border-width, shadow, and motion aliases to structured deprecated metadata, and shrink
   `TailwindMeta['border'].width` to the default border width.
3. Assemble and export `tailwindDeprecationsMeta`.
4. Compose deprecated metadata into `tailwindCssMeta` at the same positions; render the terse marker from `deprecation`.
5. Update renderer, CSS and skill snapshots, and the storefront border API table.
6. Replace the skill collector with the direct adapter.
7. Remove generated-CSS parsing and Tailwind package-root resolution.

## Open questions

None. A future deprecated utility uses the same catalog with its class as identity, and its type already exists.
