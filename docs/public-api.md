# Public API surface

This repository publishes **four** npm packages. Everything else is internal, no matter how public it looks from inside
the monorepo.

```
@porsche-design-system/components-js
@porsche-design-system/components-angular
@porsche-design-system/components-react
@porsche-design-system/components-vue
```

Read this before deciding whether a change is breaking, whether it belongs in the changelog, or whether an export has to
keep working. It is the single source of truth for "is this public?" for both humans and agents.

## Why this file exists

Almost every workspace package looks published: it has a scoped name (`@porsche-design-system/scss`), an `exports` map,
`files`, `types`, and `.d.ts` output. None of that makes it public. All of them carry `"private": true` and are only
ever resolved through npm workspaces. `packages/shared` is not even scoped — its `name` is literally `shared`.

The published packages are assembled by copying **selected build output** of those workspace packages into a wrapper
`dist/`. What is not copied does not exist for a consumer.

## The published packages are folders you can read

Each wrapper build assembles the npm package as a complete folder. Reading it is the most reliable and by far the
easiest way to tell whether something is published:

```
packages/components-js/dist/components-wrapper       → @porsche-design-system/components-js
packages/components-angular/dist/angular-wrapper     → @porsche-design-system/components-angular
packages/components-react/dist/react-wrapper         → @porsche-design-system/components-react
packages/components-vue/dist/vue-wrapper             → @porsche-design-system/components-vue
```

That folder is the tarball root: its `package.json` is the published manifest, its top-level folders are the published
subpaths, and its files are the exact bytes a consumer installs.

## How to check whether something is public

**Read the built wrapper `dist/` folders. They _are_ the npm packages** — each is the tarball root that gets published,
`package.json` included. Nothing else needs to be reasoned about: if a file, export or subpath is not in there, it is
not shipped.

| Published package                           | Its exact content on npm                           |
| ------------------------------------------- | -------------------------------------------------- |
| `@porsche-design-system/components-js`      | `packages/components-js/dist/components-wrapper`   |
| `@porsche-design-system/components-angular` | `packages/components-angular/dist/angular-wrapper` |
| `@porsche-design-system/components-react`   | `packages/components-react/dist/react-wrapper`     |
| `@porsche-design-system/components-vue`     | `packages/components-vue/dist/vue-wrapper`         |

Three checks, cheapest first:

```bash
# 1. Which subpaths exist at all? Top-level folders are the published subpaths.
ls packages/components-js/dist/components-wrapper

# 2. Is a specific symbol shipped anywhere? No hit = internal, full stop.
grep -rl "scssMeta\|ScssKind" packages/components-*/dist/*-wrapper/

# 3. Under which condition is a subpath exposed? This is the published package.json.
node -p "JSON.stringify(require('./packages/components-js/dist/components-wrapper/package.json').exports, null, 2)"
```

Check 2 settles almost every "did this break a consumer?" question on its own. Grep for **exact identifiers** — the
generated skill markdown legitimately contains prose words like "deprecations", so a loose pattern produces false hits.

### If the wrapper `dist/` is not built

`npm run build` produces all four. Until then, fall back to the two indirect checks:

```bash
# What the wrapper build copies in — the copy steps are explicit and named build:<target>.
grep -n "cp -r \.\./" packages/components-{js,angular,react,vue}/package.json

# What the last release actually shipped.
npm view @porsche-design-system/components-js@latest exports --json
```

`.github/workflows/release.yml` lists the packages that get published — only the four wrappers appear there.

Do **not** answer this question from a workspace package's own `package.json`. Its `exports`, `files` and `types` fields
describe workspace resolution inside the monorepo, not what npm ships, and they are the single biggest source of
false-positive breaking-change reports.

## Published subpaths and where they come from

This table is the reference version of what `ls packages/components-js/dist/components-wrapper` shows — every row is a
folder in there. When in doubt, trust the folder.

| Published subpath                                                                                      | Built from                                       | What ships                    |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ----------------------------- |
| `.`                                                                                                    | `packages/components` via the wrapper projects   | Components, types, JS         |
| `./partials`                                                                                           | `packages/components-js/projects/partials`       | JS + types                    |
| `./jsdom-polyfill`                                                                                     | `packages/components-js/projects/jsdom-polyfill` | JS + types                    |
| `./testing`                                                                                            | wrapper `src/testing`                            | JS + types                    |
| `./tokens`                                                                                             | `packages/tokens/dist`                           | JS + types                    |
| `./emotion`, `./styles`                                                                                | `packages/styles/projects/emotion/dist`          | JS + types                    |
| `./vanilla-extract`, `./styles/vanilla-extract`                                                        | `packages/styles/projects/vanilla-extract/dist`  | JS + types                    |
| `./scss`                                                                                               | `packages/styles/projects/scss/dist`             | **`.scss` files only**        |
| `./tailwindcss`                                                                                        | `packages/styles/projects/tailwindcss/dist`      | **`index.css` only**          |
| `./meta`                                                                                               | `packages/component-meta/dist` (minus `utils`)   | JS + types                    |
| `./ag-grid`                                                                                            | `packages/utilities/projects/ag-grid/dist`       | JS + types                    |
| `./index.css`, `./variables.css`, `./normalize.css`, `./font-face.css`, `./color-scheme.css`, `./cn/*` | `packages/components/projects/stylesheets/lib`   | CSS only                      |
| `skills/` + `bin/pds-skill`                                                                            | `packages/storefront/projects/skills/generated`  | Generated skill content + bin |

The Angular, React and Vue wrappers re-export the same surface; their
`src/{emotion,vanilla-extract,tokens,meta}/index.ts` barrels are one-line
`export * from '@porsche-design-system/components-js/…'`.

## Internal-only, despite appearances

Everything below is absent from all four wrapper `dist/` folders — verify any of it with a single grep. Use exact
identifiers: the generated skill markdown legitimately contains prose words like "deprecations", so a loose pattern
produces false hits.

```bash
grep -rl "scssMeta\|tailwindMeta\|emotionMeta\|vanillaExtractMeta\|stylesheetsMeta\|tokensMeta" \
  packages/components-*/dist/*-wrapper/
```

- **Every `meta/` build output.** `scss/meta`, `tailwindcss/meta`, `emotion/meta`, `vanilla-extract/meta` and
  `stylesheets/meta` are never copied into a wrapper. Their exports — `scssMeta`, `tailwindMeta`, `emotionMeta`,
  `vanillaExtractMeta`, `stylesheetsMeta`, the `*Deprecations` lists, `kindOf`, `flatten` and the meta types — exist for
  the storefront docs and the skills generator. Renaming or removing one of them is **not** a breaking change and needs
  **no** changelog entry.
- **`@porsche-design-system/tokens-meta`** in full, including `tokensMeta` and `tokenDeprecations`. The published token
  surface is `@porsche-design-system/tokens` → `./tokens`; the meta describes it.
- **`@porsche-design-system/shared`** in full, including the `@porsche-design-system/shared/deprecation` deep entry
  point. "Consumers import it directly" in that module's docs means _internal_ consumers — the metadata-producing
  packages.
- **`@porsche-design-system/stylesheets`** `dist/` (the tree-shakeable CSS custom property name consts and `ref()`).
  Only `lib/*.css` is published; the consts are a build-time input for `packages/components`.
- **`@porsche-design-system/component-meta/utils`**, explicitly deleted from the wrapper copy.
- **`packages/storefront`** sources, the skills generator (`packages/storefront/projects/skills/src`) and every
  `projects/*/skill/skill.ts`. Only the _generated_ skill content ships.
- **Anything under `tests/`, `scripts/` or `projects/*/src` that is not listed in the table above.**

## Two meanings of "public" inside a package

Both are legitimate; keep them apart when writing comments.

- **Published API** — reachable by an npm consumer through a wrapper subpath. This is what breaking changes and
  changelog entries are about.
- **Package API** — a workspace package's own entry point, as opposed to its internal modules. `emotion`'s
  `emotionMeta/index.ts` has a package API; none of it is published.

When a comment or JSDoc describes an entry point that is not published, say so — write "internal package entry point",
not "public API". A bare "public API" on an internal barrel is what makes reviewers and agents report phantom breaking
changes.

Note also that the **documented** surface and the **published** surface differ deliberately. `emotionMeta` and
`vanillaExtractMeta` document `emotion`/`vanilla-extract` `src/`, which _is_ published — so removing an export from
`src/` is breaking, while removing it from the meta that describes it is not.

## Consequences

- **Changelog**: only a change to a published subpath earns an entry. See [`docs/changelog.md`](changelog.md).
- **Breaking changes**: an export that never reached a wrapper `dist/` cannot break a consumer. Do not add compatibility
  aliases or deprecation paths for it — delete it.
- **Deprecations**: deprecation _metadata_ is internal. The deprecated **declarations** it describes (props, CSS
  variables, SCSS variables, style utilities, tokens) are public, and deprecating one of those does need a changelog
  entry.
