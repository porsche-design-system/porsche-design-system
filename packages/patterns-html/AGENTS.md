# AGENTS.md — Patterns (HTML) Package

> This file provides context for AI coding assistants working in `packages/patterns-html/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance and [`README.md`](README.md) for the authoring reference.

## Overview

Standalone HTML/CSS pattern demos for the Porsche Design System. Shared chrome (head, header, footer) lives in
`src/_partials/` and is inlined at build time, so the generated pages are **plain HTML with relative paths** — no
framework runtime, no bundling, no hashed asset names.

The package is `private: true` and is not published.

## Why it is built this way

| Decision                               | Rationale                                                                                                                                                                                             |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plain HTML, not React**              | The storefront already renders patterns through `WebsiteViewer` (an iframe). Full-bleed patterns need their own document and CSS isolation from the storefront's Tailwind and global styles.          |
| **Vite for dev only, custom build**    | Bundler builds rewrite `href="styles.css"` into hashed asset paths. `scripts/build.ts` copies every non-HTML file verbatim, which keeps the output copy-pasteable and portable to any base path.      |
| **In-house template engine**           | Adding a template engine dependency triggers the monorepo's dependency governance (syncpack, ORT license scanning) for a private demo package. The engine is roughly 250 lines and fully unit tested. |
| **Iframe embedding in the storefront** | Storefront is `output: 'export'`, so anything copied into its `public/` folder ships as static files on the same origin.                                                                              |

## Structure

```text
plugins/htmlInclude.ts            # engine: block parser + expression evaluator + Vite plugin (dev server)
scripts/build.ts                  # production build: expand templates, copy everything else verbatim
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3006)
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
tests/unit/htmlInclude.spec.ts    # 24 tests describing the full engine contract
tests/fixtures/                   # partials used by the include tests
src/
├── index.html                    # overview page, links to all patterns
├── _data.json                    # shared data (navigation, …), base scope of every page
├── _partials/                    # head.html, header.html, footer.html
├── assets/patterns.css           # shared base, header and footer styles
├── landing-page/                 # one folder per pattern: index.html + styles.css
└── contact-page/                 # index.html + styles.css + main.js
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. Every other
`src/**/*.html` becomes a page.

## Commands

```bash
npm run start:patterns-html      # dev server on http://localhost:3006
npm run build:patterns-html      # writes ./dist (gitignored)
npm run test:unit:patterns-html  # vitest
```

## Template syntax

Full reference in [`README.md`](README.md). Short version:

| Directive                                                  | Notes                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `<!-- @props { … } -->`                                    | File level JSON values, inherited by every include in that file. Stripped from the output. |
| `<!-- @include _partials/header.html { … } -->`            | Inline props override file level ones.                                                     |
| `<!-- @if expr -->` … `<!-- @else -->` … `<!-- @endif -->` | `key`, `!key`, `a == b`, `a != b`; each side is a dotted path or a JSON literal.           |
| `<!-- @each item in items -->` … `<!-- @endeach -->`       | Exposes `item` and `loop` (`index`, `number`, `first`, `last`, `length`).                  |
| `{{ key }}` / `{{ item.label }}`                           | Raw substitution — text content **or** attribute values.                                   |

Non-obvious behaviour worth knowing before changing the engine:

- Includes are expanded **per render pass**, so a partial inside an `@each` sees the scope of its iteration.
- URLs inside a partial are relative to the **including page**, not the partial. Pages pass a `basePath` prop (`"./"` at
  the root, `"../"` one level down).
- Whitespace and the line break directly around a directive are stripped, which keeps the generated markup tidy.
- Blocks nest freely but cannot span an include boundary. `loop` is reserved inside `@each`.
- Use real JSON booleans in conditions; the string `"false"` is truthy. Empty arrays are falsy.

## Scope discipline (important)

The engine intentionally stops here: no `@elseif`, no filters, no arithmetic, no macros, no template inheritance.

**If a feature request needs any of those, migrate to [Eleventy](https://www.11ty.dev/) instead of extending this
engine.** Eleventy's `addPassthroughCopy` preserves the same clean, unhashed output that motivated this setup, and the
unit tests in `tests/unit/` describe the current contract well enough to make such a migration verifiable.

## Accessibility baseline

Every page ships a skip link, `header`/`main`/`footer` landmarks, labelled `nav` elements, `aria-current="page"` on the
active nav item only, visible `:focus-visible` outlines and a `forced-colors: active` block. These demos are
documentation, so they have to be correct by example — keep the baseline when adding patterns.

## Tooling notes

- `**/_partials` is excluded from Biome in [`biome.json`](../../biome.json): partials are templates, so `{{ … }}`
  placeholders are not parseable HTML.
- The Biome **formatter** is disabled for `src/**/*.html` (the linter stays on) so hand-authored markup is not
  rewritten. Without this, Biome strips the `/` from void elements in pages but not in the excluded partials, producing
  inconsistent output.
- Vitest needs its own config because `vite.config.ts` sets `root: 'src'`, which would make Vitest look for tests there.

## Adding a pattern

1. Create `src/<pattern-name>/index.html` (plus `styles.css` / `main.js` as needed).
2. Add `<!-- @props … -->` with `basePath`, `title`, `description` and the nav state (`currentPage`).
3. Include `_partials/head.html`, `_partials/header.html` and `_partials/footer.html`.
4. Link the pattern from `src/index.html`, and add it to `src/_data.json` if it belongs in the main navigation.
5. Run the build and confirm no `@…` directives or `{{ … }}` placeholders remain in `dist/`.

## Status and open items

Point-in-time notes, last updated 2026-08-12 on branch `issue/4652` (#4652).

Done:

- Package scaffolded with the include engine, dev server, build script and three demo pages.
- Conditions (`@if`/`@else`) and loops (`@each`) added, backed by 24 unit tests.
- The header demonstrates a loop over `navItems` with a nested condition for `aria-current`, plus an optional search
  form driven by a `showSearch` prop.

Open:

1. **Storefront hookup** — copy `dist` into `packages/storefront/public/` during the storefront `prebuild`, then add an
   optional local URL prop to `packages/storefront/src/components/common/WebsiteViewer.tsx`, which currently hardcodes
   the GitHub Pages base of the external `porsche-design-system/examples` repository.
2. **Optional rename** `patterns-html` → `patterns` (only `package.json` `name` plus the root scripts change).
3. **Optional** — use real PDS web components in the demos by injecting the CDN partials (`getComponentChunkLinks()`,
   `getFontLinks()`, `getLoaderScript()`) via a `transformIndexHtml` plugin, the same way
   [`packages/components-js/vite.config.js`](../components-js/vite.config.js) does. Keep `order: 'pre'` on the include
   plugin so partials are expanded first.
