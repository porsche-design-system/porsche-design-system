# AGENTS.md — Patterns (HTML) Package

> This file provides context for AI coding assistants working in `packages/patterns-html/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance and [`README.md`](README.md) for the authoring reference.

## Overview

Standalone HTML/CSS pattern demos for the Porsche Design System. Shared chrome (head, header, footer) lives in
`src/_partials/` and is inlined at build time, so the generated pages are **plain HTML with relative paths** — no
framework runtime, no bundling, no hashed asset names. Styling is **Tailwind CSS v4**, compiled into a single plain
stylesheet.

The package is `private: true` and is not published.

## Why it is built this way

| Decision                                  | Rationale                                                                                                                                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plain HTML, not React**                 | The storefront already renders patterns through `WebsiteViewer` (an iframe). Full-bleed patterns need their own document and CSS isolation from the storefront's Tailwind and global styles.          |
| **Vite for dev only, custom build**       | Bundler builds rewrite `href="styles.css"` into hashed asset paths. `scripts/build.ts` copies every non-HTML file verbatim, which keeps the output copy-pasteable and portable to any base path.      |
| **In-house template engine**              | Adding a template engine dependency triggers the monorepo's dependency governance (syncpack, ORT license scanning) for a private demo package. The engine is roughly 250 lines and fully unit tested. |
| **Tailwind via CLI, not via the bundler** | The CLI writes one unhashed `dist/assets/patterns.css`, so pages keep linking a plain relative stylesheet. `@tailwindcss/vite` covers the dev server from the same entry file.                        |
| **Iframe embedding in the storefront**    | Storefront is `output: 'export'`, so anything copied into its `public/` folder ships as static files on the same origin.                                                                              |

## Structure

```text
plugins/htmlInclude.ts            # engine: block parser + expression evaluator + Vite plugin (dev server)
scripts/build.ts                  # production build: expand templates, copy everything else verbatim
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3006) + Tailwind plugin
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
tests/unit/htmlInclude.spec.ts    # 29 tests describing the full engine contract
tests/fixtures/                   # `_data.json` and partials used by the include tests
src/
├── index.html                    # overview page, links to all patterns
├── _data.json                    # shared data (navigation, …), base scope of every page
├── _partials/                    # head.html, header.html, footer.html
├── assets/patterns.css           # Tailwind entry: @theme, dark mode, global element defaults
├── landing-page/                 # one folder per pattern: index.html
└── contact-page/                 # index.html + main.js
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. Every other
`src/**/*.html` becomes a page.

## Commands

```bash
npm run start:patterns-html      # dev server on http://localhost:3006
npm run build:patterns-html      # writes ./dist (gitignored)
npm run test:unit:patterns-html  # vitest
```

## Styling (Tailwind v4)

Configured CSS-first in `src/assets/patterns.css`; there is no `tailwind.config.*`.

- Utilities live in the markup. There are **no per-page stylesheets** and no `@apply`.
- `@theme` defines the palette (`--color-fg`, `--color-fg-muted`, `--color-bg`, `--color-surface`, `--color-line`,
  `--color-focus`), `--container-page` and `--font-sans`, yielding utilities like `text-fg-muted` or `border-line`.
- Dark mode overrides those variables in `prefers-color-scheme: dark`, so no `dark:` variants are needed in markup.
- The `@layer base` block is deliberately small: only `body`, `main`, `a` and the `:focus-visible` outline, i.e. the
  defaults that would otherwise be duplicated on every page.
- Forced colors are handled per element via the `forced-colors:` variant (`forced-colors:border-[canvastext]`,
  `forced-colors:bg-[highlight]`, `forced-colors:forced-color-adjust-none`).
- JavaScript hooks on ids, never on utility classes, so restyling cannot break behaviour.
- `@source "../**/*.html"` makes Tailwind scan the templates, partials included.

Two pipelines share that one entry file: `@tailwindcss/vite` in dev, the Tailwind CLI (`build:css`) for the build.
Because the CLI writes `dist/assets/patterns.css`, `scripts/build.ts` skips that single file when copying assets.

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

- Scope precedence is `_data.json` → file level `@props` → inline include props, each a **shallow merge**. A page can
  therefore override any shared value, arrays included — `src/landing-page/index.html` overrides `navItems` this way.
  There is no deep merge and no append: redefining a key replaces it completely.
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

A cheaper migration target is already implemented and measured: [`packages/patterns-nunjucks`](../patterns-nunjucks) is
a Nunjucks port of this package that produces structurally identical `dist/` output. Read
[`COMPARISON.md`](../patterns-nunjucks/COMPARISON.md) before proposing either an engine extension or a migration.

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

1. Create `src/<pattern-name>/index.html` (plus `main.js` if the pattern needs behaviour).
2. Add `<!-- @props … -->` with `basePath`, `title`, `description` and the nav state (`currentPage`).
3. Include `_partials/head.html`, `_partials/header.html` and `_partials/footer.html`.
4. Style with Tailwind utilities; touch `src/assets/patterns.css` only for genuinely global defaults or theme values.
5. Link the pattern from `src/index.html`, and add it to `src/_data.json` if it belongs in the main navigation.
6. Run the build and confirm no `@…` directives or `{{ … }}` placeholders remain in `dist/`.

## Status and open items

Point-in-time notes, last updated 2026-08-12 on branch `issue/4652` (#4652).

Done:

- Package scaffolded with the include engine, dev server, build script and three demo pages.
- Conditions (`@if`/`@else`) and loops (`@each`) added, backed by 29 unit tests.
- The header demonstrates a loop over `navItems` with a nested condition for `aria-current`, plus an optional search
  form driven by a `showSearch` prop.
- The landing page demonstrates overriding a shared `_data.json` list (`navItems`) through page level `@props`.
- Styling migrated from hand-written CSS to Tailwind v4 utilities (theme + dark mode + forced colors in the entry file).

Open:

1. **Storefront hookup** — copy `dist` into `packages/storefront/public/` during the storefront `prebuild`, then add an
   optional local URL prop to `packages/storefront/src/components/common/WebsiteViewer.tsx`, which currently hardcodes
   the GitHub Pages base of the external `porsche-design-system/examples` repository.
2. **Optional rename** `patterns-html` → `patterns` (only `package.json` `name` plus the root scripts change).
3. **Optional** — swap the local `@theme` palette for the PDS Tailwind preset (`@porsche-design-system/tailwindcss`, see
   `packages/styles/projects/tailwindcss`). That aligns the demos with the real design tokens but adds a workspace
   dependency and therefore a build-order constraint the package does not have today.
4. **Optional** — use real PDS web components in the demos by injecting the CDN partials (`getComponentChunkLinks()`,
   `getFontLinks()`, `getLoaderScript()`) via a `transformIndexHtml` plugin, the same way
   [`packages/components-js/vite.config.js`](../components-js/vite.config.js) does. Keep `order: 'pre'` on the include
   plugin so partials are expanded first.
