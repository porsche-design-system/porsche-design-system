# AGENTS.md — Patterns (JSX) Package

> This file provides context for AI coding assistants working in `packages/patterns-jsx/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance, [`README.md`](README.md) for the authoring reference and
> [`COMPARISON.md`](../patterns-nunjucks/COMPARISON.md) for why this package exists.

## Overview

TSX port of [`packages/patterns-html`](../patterns-html), built as a decision aid alongside
[`packages/patterns-nunjucks`](../patterns-nunjucks): same three demo pages, same Tailwind v4 setup, same "plain HTML
with relative paths" build contract, but rendered from **typed function components** instead of a template engine.

There is no template syntax. Conditions are ternaries, loops are `map()`, partials are components, and the layout takes
`children`. Rendering happens once at build time via `preact-render-to-string`; **no framework code reaches the
browser**.

**The three packages are meant to stay in sync.** If a pattern is added to one, add it to the others, otherwise the
comparison stops being meaningful. The package is `private: true` and is not published.

## Structure

```text
plugins/jsx.ts                    # renderPage() + page URL resolution + Vite plugin (dev server)
scripts/build.ts                  # production build: render pages, copy everything else verbatim
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3010) + Tailwind plugin
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
tests/unit/jsx.spec.tsx           # 49 tests describing the rendering contract
src/
├── index.page.tsx                # overview page
├── _data.ts                      # shared data (navigation, …) as typed exports
├── _layouts/BasePage.tsx         # page shell, takes `children`
├── _partials/                    # Head.tsx, Header.tsx, Footer.tsx — components with checked props
├── assets/patterns.css           # Tailwind entry: @theme, dark mode, global element defaults
├── landing-page/                 # one folder per pattern: index.page.tsx
└── contact-page/                 # index.page.tsx + main.js
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. **Page rule:** only
`*.page.tsx` is rendered, to `index.html` next to it; every other `.ts`/`.tsx` file is a build-time input, and all
non-TypeScript files are copied verbatim.

## Commands

```bash
npm run start:patterns-jsx      # dev server on http://localhost:3010
npm run build:patterns-jsx      # writes ./dist (gitignored)
npm run test:unit:patterns-jsx  # vitest
```

Ports 3010/3011 are used on purpose: `patterns-html` holds 3006/3007 and `patterns-nunjucks` 3008/3009, so all three can
run at once.

## Conventions that are easy to get wrong

- **Use plain HTML attribute names** — `class`, `for`, `charset`, `novalidate`. Preact accepts and types them, and the
  generated markup has to stay copy-pasteable HTML. `className`/`htmlFor` are a test failure, not a style preference.
- **JSX collapses whitespace between elements.** Elements on separate lines produce no whitespace text node, so
  `renderPage()` formats with `htmlWhitespaceSensitivity: 'ignore'` to keep the output readable. Consequence: inline
  whitespace in `dist/` is decided by the formatter, not by the source. If a pattern ever needs a _meaningful_ space,
  use `&nbsp;` (`{'\u00a0'}`), not a line break.
- **Blank lines are not preserved.** The twins separate sections with blank lines in the source; a renderer cannot, so
  `dist/` is slightly denser. That is the only structural difference from the twins' output.
- **Tailwind scans comments too.** `@source "../**/*.tsx"` feeds whole files to the scanner, so prose such as
  "`{% block content %}`" or "relative to the page" leaks `.block` and `.relative` into `dist/assets/patterns.css`.
  Check the compiled CSS after larger comment edits.
- **URLs are relative to the page, not the component.** Pass `basePath` (`"./"` at the root, `"../"` one level down).
- **`_data.ts` is imported, not injected.** Unlike the twins' ambient scope, a page can extend the shared navigation
  (`[...navItems, extra]`) instead of only replacing it wholesale.
- **Pages are rendered server-side only.** They are not in the client module graph, so the dev server does a full reload
  on any `.ts`/`.tsx` change rather than an HMR patch.

## Scope discipline (important)

TSX has no expressiveness ceiling — a page _could_ fetch data, keep state or pull in a component library. That is
exactly what the twins prevent by construction and what has to be a review rule here:

- Pages and partials are **pure, synchronous, presentational** functions. No hooks, no state, no effects, no async.
- No client-side hydration. If a pattern needs behaviour, ship a plain `main.js` and hook it on ids, as
  [`contact-page/main.js`](src/contact-page/main.js) does.
- No dependency on the PDS React wrapper. If the demos should use real PDS components, use the **web components** via
  the CDN partials, so the output stays framework-free.

## Tooling notes

- Nothing is excluded from Biome. Pages, layout and partials are ordinary TSX, so they lint **and** format — unlike
  `patterns-html` (formatter disabled for `src/**/*.html`, `_partials` excluded) and `patterns-nunjucks` (all pages and
  `.njk` files excluded). See [`biome.json`](../../biome.json).
- `npx tsc --noEmit` type-checks pages, partials, the build script and the plugin in one pass.
- The JSX transform is configured **once**, in [`tsconfig.json`](tsconfig.json) (`jsx: "react-jsx"`,
  `jsxImportSource: "preact"`). Vite and Vitest pick it up from there; do not duplicate it in the configs.
- Vitest needs its own config because `vite.config.ts` sets `root: 'src'`, which would make Vitest look for tests there.
- Prettier is used as a **library** in the build to format rendered markup, not as a repo formatter for this package.

## Adding a pattern

1. Create `src/<pattern-name>/index.page.tsx` (plus `main.js` if the pattern needs behaviour).
2. Default-export a component that renders `<BasePage>` with `basePath`, `title`, `description`, `currentPage`, and
   optionally `mainClass`, `showSearch`, `pageScript`, `navItems`.
3. Put the markup in `children`.
4. Style with Tailwind utilities; touch `src/assets/patterns.css` only for genuinely global defaults or theme values.
5. Link the pattern from `src/index.page.tsx`, and add it to `src/_data.ts` if it belongs in the main navigation.
6. Run the build and confirm `dist/` contains no stray utilities in the CSS and renders as expected.
7. **Mirror the pattern in [`packages/patterns-html`](../patterns-html) and
   [`packages/patterns-nunjucks`](../patterns-nunjucks)** so the three stay comparable.

## Accessibility baseline

Every page ships a skip link, `header`/`main`/`footer` landmarks, labelled `nav` elements, `aria-current="page"` on the
active nav item only, visible `:focus-visible` outlines and a `forced-colors: active` block. These demos are
documentation, so they have to be correct by example — keep the baseline when adding patterns. The unit tests assert it
for every page.

## Status and open items

Point-in-time notes, last updated 2026-08-12.

Done:

- Full port of the three demo pages; `dist/` is structurally identical to the twins' — `assets/patterns.css` and
  `contact-page/main.js` are byte-identical, and the HTML differs only in reworded prose, blank lines and the inline
  line-breaking described above.
- 49 unit tests covering page URL resolution, escaping, optional props, navigation overrides, the accessibility baseline
  and the "no framework attribute names in the output" rule.

Open:

1. **Decide.** This package is a decision aid, not a third product. Once the call is made, delete the losing packages
   and fold their documentation into the survivor.
2. If JSX wins, consider dropping the Prettier formatting pass in favour of accepting dense output, and revisit whether
   `_layouts`/`_partials` should become `components/` now that the underscore rule only exists for the twins' benefit.
