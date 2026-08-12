# AGENTS.md — Patterns (Nunjucks) Package

> This file provides context for AI coding assistants working in `packages/patterns-nunjucks/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance, [`README.md`](README.md) for the authoring reference and
> [`COMPARISON.md`](COMPARISON.md) for why this package exists.

## Overview

Nunjucks port of [`packages/patterns-html`](../patterns-html), built as a decision aid: same three demo pages, same
Tailwind v4 setup, same "plain HTML with relative paths" build contract, but rendered by
[Nunjucks](https://mozilla.github.io/nunjucks/) instead of the in-house `@include`/`@if`/`@each` engine.

**The two packages are meant to stay in sync.** If a pattern is added to one, add it to the other, otherwise the
comparison stops being meaningful. The package is `private: true` and is not published.

## Structure

```text
plugins/nunjucks.ts               # environment factory + renderTemplate() + Vite plugin (dev server)
scripts/build.ts                  # production build: render pages, copy everything else verbatim
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3008) + Tailwind plugin
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
tests/unit/nunjucks.spec.ts       # 41 tests describing the engine contract
tests/fixtures/                   # `_data.json`, `_layouts/` and `_partials/` used by those tests
src/
├── index.html                    # overview page
├── _data.json                    # shared data (navigation, …), base scope of every page
├── _layouts/base.njk             # page shell with `content` block
├── _partials/                    # head.njk, header.njk, footer.njk — macros, not includes
├── assets/patterns.css           # Tailwind entry: @theme, dark mode, global element defaults
├── landing-page/                 # one folder per pattern: index.html
└── contact-page/                 # index.html + main.js
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. Every other
`src/**/*.html` becomes a page. Pages keep `.html` so Vite treats them as MPA entries; layouts and macros use `.njk`.

## Commands

```bash
npm run start:patterns-nunjucks      # dev server on http://localhost:3008
npm run build:patterns-nunjucks      # writes ./dist (gitignored)
npm run test:unit:patterns-nunjucks  # vitest
```

Ports 3008/3009 are used on purpose: the `patterns-html` twin holds 3006/3007, so both can run at once.

## Conventions that are easy to get wrong

- **Partials are macros, not includes.** Every value a partial needs is a parameter, which is the checked equivalent of
  the twin's `@include … { … }` props. Do not switch them to `{% include %}` — implicit context reads are what the
  comparison is trying to avoid.
- **Re-indent macro output** with `| trim | indent(4)` in the layout. Nunjucks emits macro bodies flush-left, and the
  generated markup is documentation, so it has to stay readable.
- **`{% set %}` at page level overrides `_data.json` wholesale.** There is no deep merge and no append, exactly like the
  twin's `@props`.
- **`throwOnUndefined` is on.** Optional values (`showSearch`, `mainClass`, `pageScript`) must be guarded with
  `{% if %}` in the layout instead of being printed directly.
- **`autoescape` is on.** Anything that must render as markup needs an explicit `| safe`; think twice before adding it.
- **URLs are relative to the page, not the macro.** Pass `basePath` (`"./"` at the root, `"../"` one level down).
- **Whitespace is controlled globally** by `trimBlocks` + `lstripBlocks`. Reach for `{%-` / `-%}` only when a specific
  spot needs it, and re-run the build to check the diff against the twin.

## Tooling notes

- `packages/patterns-nunjucks/src/**/*.html` and all `*.njk` files are **excluded from Biome** in
  [`biome.json`](../../biome.json): page templates contain `{% … %}` expressions that Biome's HTML parser rejects. This
  is stricter than the twin, where only `_partials` are excluded — see [`COMPARISON.md`](COMPARISON.md).
- Template files must end with exactly one newline. Nunjucks reproduces trailing blank lines verbatim, so a sloppy
  layout leaks empty lines into every generated page.
- Vitest needs its own config because `vite.config.ts` sets `root: 'src'`, which would make Vitest look for tests there.
- `nunjucks` is CommonJS: import the default export, and import its types with `import type { … } from 'nunjucks'`.

## Adding a pattern

1. Create `src/<pattern-name>/index.html` (plus `main.js` if the pattern needs behaviour).
2. Start with `{% extends "_layouts/base.njk" %}` and `{% set %}` for `basePath`, `title`, `description`, `currentPage`,
   and optionally `mainClass`, `showSearch`, `pageScript`.
3. Put the markup in `{% block content %}`.
4. Style with Tailwind utilities; touch `src/assets/patterns.css` only for genuinely global defaults or theme values.
5. Link the pattern from `src/index.html`, and add it to `src/_data.json` if it belongs in the main navigation.
6. Run the build and confirm no `{% … %}` or `{{ … }}` remains in `dist/`.
7. **Mirror the pattern in [`packages/patterns-html`](../patterns-html)** so the two stay comparable.

## Accessibility baseline

Every page ships a skip link, `header`/`main`/`footer` landmarks, labelled `nav` elements, `aria-current="page"` on the
active nav item only, visible `:focus-visible` outlines and a `forced-colors: active` block. These demos are
documentation, so they have to be correct by example — keep the baseline when adding patterns.

## Status and open items

Point-in-time notes, last updated 2026-08-12.

Done:

- Full port of the three demo pages; `dist/` is structurally identical to the twins' (only reworded prose differs).
- 41 unit tests covering conditions, loops, macros, includes, scope precedence, layout inheritance and error messages.
- [`COMPARISON.md`](COMPARISON.md) with the measured cost/benefit of all three engines and a recommendation.

Open:

1. **Decide.** This package is a decision aid, not a second product. Once the call is made, delete the losing package
   and fold its documentation into the survivor.
2. If Nunjucks wins, revisit whether pages should move to `.njk` with a Vite `resolve` shim, so the `.html` extension
   stops implying "valid HTML" to editors and linters.
