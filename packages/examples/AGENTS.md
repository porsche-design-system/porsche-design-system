# AGENTS.md — Examples Package

> This file provides context for AI coding assistants working in `packages/examples/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance, [`README.md`](README.md) for the authoring reference and
> [`COMPARISON.md`](COMPARISON.md) for why this package renders pages the way it does.

## Overview

Standalone examples for Porsche Design System usage, rendered from **typed function components** to plain HTML with
relative paths at build time. They come in two categories:

| Category      | What it shows                                        | Layout        | Lives in          |
| ------------- | ---------------------------------------------------- | ------------- | ----------------- |
| **Templates** | A whole application page, chrome included.           | `BasePage`    | `src/templates/…` |
| **Patterns**  | A single section of a page, e.g. a header variation. | `PatternPage` | `src/patterns/…`  |

There is no template syntax. Conditions are ternaries, loops are `map()`, partials are components, and the layout takes
`children`. Rendering happens once at build time via `preact-render-to-string`; **no framework code reaches the
browser**.

This approach was picked over an in-house `@include` engine and Nunjucks, which rendered the same pages in two sibling
packages until 2026-08-13; [`COMPARISON.md`](COMPARISON.md) is the decision record. The package is `private: true` and
is not published.

## Structure

```text
plugins/jsx.ts                    # renderPage() + page URL resolution + Vite plugin (dev server)
plugins/partials.ts               # PDS partials (loader, fonts, icons, chunks), shared by dev server and build
scripts/build.ts                  # production build: render pages, inject partials, copy everything else verbatim
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3010) + Tailwind plugin
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
tests/unit/jsx.spec.tsx           # tests describing the rendering contract
src/
├── index.page.tsx                # overview page: the link list, no chrome
├── _data.ts                      # templateItems, patternItems (real URLs), chrome nav (placeholders)
├── _classes.ts                   # classes(): joins class names, dropping the unset optional ones
├── _layouts/
│   ├── BasePage.tsx              # full page shell, takes `children`
│   └── PatternPage.tsx           # minimal shell for a single section (beforeMain / afterMain)
├── _partials/                    # Head, SkipLink, Footer, ExampleList – checked props
│   └── header/                   # Header (variants) + the blocks it composes: HeaderBar, Brand,
│                                 # MainNav, MetaActions, NoticeBar, CategoryTabs
├── _types/pds-jsx.d.ts           # JSX typings for the PDS web components (derived, type-only)
├── assets/styles.css             # Tailwind entry: @theme, dark mode, global element defaults
├── assets/header.js              # behaviour of the header drilldown, shared by every page using it
├── templates/                    # one folder per template
│   ├── landing-page/             # index.page.tsx
│   └── contact-page/             # index.page.tsx + main.js
└── patterns/                     # one folder per pattern
    ├── header-1/                 # Header in its `overlay` variant (+ main.js for the video)
    └── header-2/                 # Header in its `stacked` variant
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. **Page rule:** only
`*.page.tsx` is rendered, to `index.html` next to it; every other `.ts`/`.tsx` file is a build-time input, and all
non-TypeScript files are copied verbatim.

## Links: only the overview navigates

The examples demonstrate chrome, they are not a website:

- Header, footer and example bodies link to `placeholderHref` (`"#"`). In-page anchors (`#features`) are real, because
  the target is on the page. Use the constant, not a bare `"#"`: Biome's `a11y/useValidAnchor` rejects the literal, and
  the constant says why the link goes nowhere.
- `src/index.page.tsx` is the only page whose links go somewhere, and the only page that renders **no** header and
  footer — repeating the demo chrome there would demonstrate nothing and would need URLs kept in sync for no benefit.
- Consequently `Header` and `Footer` take no `basePath`; only `Head` does, for the stylesheet.

A test asserts that the overview page contains no `href="#"` and that the chrome data contains nothing else.

## Commands

```bash
npm run start:examples      # dev server on http://localhost:3010
npm run build:examples      # writes ./dist (gitignored)
npm run test:unit:examples  # vitest
```

## Conventions that are easy to get wrong

- **Use plain HTML attribute names** — `class`, `for`, `charset`, `novalidate`. Preact accepts and types them, and the
  generated markup has to stay copy-pasteable HTML. `className`/`htmlFor` are a test failure, not a style preference.
- **JSX collapses whitespace between elements.** Elements on separate lines produce no whitespace text node, so
  `renderPage()` formats with `htmlWhitespaceSensitivity: 'ignore'` to keep the output readable. Consequence: inline
  whitespace in `dist/` is decided by the formatter, not by the source. If a pattern ever needs a _meaningful_ space,
  use `&nbsp;` (`{'\u00a0'}`), not a line break.
- **Blank lines are not preserved.** A renderer cannot carry source blank lines into the output, so `dist/` is denser
  than hand-authored markup would be. Structure and attributes are unaffected.
- **Tailwind scans comments too.** `@source "../**/*.tsx"` feeds whole files to the scanner, so prose such as
  "`{% block content %}`" or "relative to the page" leaks `.block` and `.relative` into `dist/assets/styles.css`. The
  same applies to string literals: the header variants are named `overlay`/`stacked` precisely because a display keyword
  would end up as an unused utility. Check the compiled CSS after larger comment edits.
- **Asset URLs are relative to the page, not the component.** Pass `basePath`: `"./"` at the root, `"../../"` inside an
  example folder. It only builds the stylesheet URL — navigation links are placeholders, see above.
- **`_data.ts` is imported, not injected.** There is no ambient template scope, so a page can extend the shared
  navigation (`[...navItems, extra]`) instead of only replacing it wholesale.
- **A pattern is not a page inside a page.** Patterns use `PatternPage`, which ships no header or footer, because that
  chrome is what the pattern demonstrates. Pass the section as `beforeMain` (headers) or `afterMain` (footers) so its
  landmark sits where it does on a real page.
- **Pages are rendered server-side only.** They are not in the client module graph, so the dev server does a full reload
  on any `.ts`/`.tsx` change rather than an HMR patch.
- **PDS components are typed as attributes, not props.** `<p-button>` and friends are typed by
  [`src/_types/pds-jsx.d.ts`](src/_types/pds-jsx.d.ts), which derives the tag names and their props from the Stencil
  types of `@porsche-design-system/components` (a **type-only** import, erased at compile time). Because the output is
  static HTML with nothing setting JS properties afterwards, the attribute names are kebab-cased — write `hide-label`,
  not `hideLabel` — and values are restricted to what survives serialization. String and number unions keep their
  autocompletion (`variant="primary"`); structural values such as `BreakpointCustomizable` objects or the `aria` record
  have to be written as JSON strings (`compact="{ base: false, m: true }"`).
- **No event handler props on PDS components.** The typing deliberately omits them: there is no client-side JS, so
  behaviour goes into a plain `main.js` hooked on ids.
- **A script next to a page is not loaded by being there.** Nothing scans the folder: a page has to list it via
  `pageScript` (a string or a list of them), which is the only thing rendering the `<script defer>` tag. Behaviour that
  belongs to a shared partial belongs in `src/assets/*.js`, not in one example folder — `BasePage` loads
  `assets/header.js` itself for every header variant, and a pattern that brings its own header lists it in `pageScript`.
- **A variant is a prop, not a copy.** `Header` renders both header patterns from one set of blocks
  (`_partials/header/`), driven by `navItems` and `metaActionItems` from `_data.ts`. If two variants need the same
  block, extract the block; do not paste the markup a second time, or one variant silently drifts from the other.
- **The navigation is rendered recursively.** A `NavItem` with `children` becomes a `p-drilldown-item` (plus a leading
  entry pointing at its own page, since a level is not a link), one without becomes a `p-drilldown-link`. Both are valid
  children of `p-drilldown` and of `p-drilldown-item`, which is what makes one component cover every depth.
- **`p-tabs-bar` accepts only `a` and `button` children.** Anything else – a divider, a wrapper – makes it throw at
  runtime, which static markup does not reveal at build time.
- **A color scheme class is never put on the `<header>`.** `scheme-*` cascades, and the drilldown lives inside the
  header while being a dialog on top of the _page_ – a scheme on the `<header>` opens a dark overlay on a light page.
  `Header` hands the scheme to its blocks instead, and each applies it to the elements that really sit on the dark hero;
  `MainNav` puts it on the menu button and not on `p-drilldown`. The same holds for any overlay a partial owns.
- **The PDS partials are injected by both the dev server and the build**, from
  [`plugins/partials.ts`](plugins/partials.ts). Without the loader script the `p-*` elements never upgrade and
  `:not(:defined)` keeps them invisible, so the partials cannot live in the Vite config alone.

## Scope discipline (important)

TSX has no expressiveness ceiling — a page _could_ fetch data, keep state or pull in a component library. A template
engine refuses that by construction; TSX does not, so it has to be a review rule here. This is the main cost of the
approach, and it is paid on every review:

- Pages and partials are **pure, synchronous, presentational** functions. No hooks, no state, no effects, no async.
- No client-side hydration. If an example needs behaviour, ship a plain `main.js` and hook it on ids, as
  [`templates/contact-page/main.js`](src/templates/contact-page/main.js) does.
- No dependency on the PDS React wrapper. If the demos should use real PDS components, use the **web components** via
  the CDN partials, so the output stays framework-free.

## Tooling notes

- Nothing is excluded from Biome. Pages, layout and partials are ordinary TSX, so they lint **and** format — no
  per-package carve-outs are needed in [`biome.json`](../../biome.json).
- `npx tsc --noEmit` type-checks pages, partials, the build script and the plugin in one pass.
- The JSX transform is configured **once**, in [`tsconfig.json`](tsconfig.json) (`jsx: "react-jsx"`,
  `jsxImportSource: "preact"`). Vite and Vitest pick it up from there; do not duplicate it in the configs.
- Vitest needs its own config because `vite.config.ts` sets `root: 'src'`, which would make Vitest look for tests there.
- Prettier is used as a **library** in the build to format rendered markup, not as a repo formatter for this package.
- **The dev server rewrites the CDN URL.** The partials always emit absolute production URLs
  (`https://cdn.ui.porsche.com/porsche-design-system/…`), regardless of how the monorepo was built. `npm run dev` starts
  `serve-cdn` alongside Vite, so [`vite.config.ts`](vite.config.ts) rewrites those URLs to `http://localhost:3001` —
  without it the browser loads the components from the production CDN and blocks the loader script with a CORS error.
  The same rewrite exists in the react/angular/vue/storefront dev servers. It is **dev only**; `scripts/build.ts` writes
  the production URLs unchanged.

## Adding a template (a whole page)

1. Create `src/templates/<name>/index.page.tsx` (plus `main.js` if it needs behaviour).
2. Default-export a component that renders `<BasePage>` with `basePath="../../"`, `title`, `description`, `currentPage`,
   and optionally `mainClass`, `showSearch`, `headerVariant`, `pageScript`, `navItems`.
3. Put the markup in `children`. Links go to `#`, unless they point at an id on the same page.
4. Add an entry to `templateItems` in `src/_data.ts` – that is what links it from the overview page.
5. Style with Tailwind utilities; touch `src/assets/styles.css` only for genuinely global defaults or theme values.
6. Run the build and confirm `dist/` contains no stray utilities in the CSS and renders as expected.

## Adding a pattern (a single section)

1. Create `src/patterns/<name>/index.page.tsx`.
2. Default-export a component that renders `<PatternPage>` with `basePath="../../"`, `title`, `description`, and the
   section itself as `beforeMain` (headers) or `afterMain` (footers). The page brings its own `<main id="main">` as
   `children`; the layout adds only the skip link and the link back to the overview.
3. Reuse the existing partial and add a prop for the variation instead of copying markup — `Header` takes
   `variant="overlay" | "stacked"`, which is exactly what `header-1` and `header-2` differ in.
4. Add an entry to `patternItems` in `src/_data.ts`.
5. If the pattern needs behaviour, put it in a plain `main.js` next to the page and reference it with
   `pageScript="main.js"` — the same prop `BasePage` has, and it also takes a list. A script that is only dropped into
   the folder is copied to `dist/` but never loaded. A pattern showing a header also has to list
   `"../../assets/header.js"`, which `BasePage` adds on its own.
6. Run the build; the unit tests assert the accessibility baseline for every page, patterns included.

## Accessibility baseline

Every example ships a skip link, a `main` landmark, labelled `nav` elements, `aria-current="page"` on the active nav
item only, visible `:focus-visible` outlines and a `forced-colors: active` block. Templates additionally carry the
`header` and `footer` landmarks; a pattern carries the landmark of the section it demonstrates. The overview page has no
chrome to skip, so it is a `main` landmark with two labelled navigations. These demos are documentation, so they have to
be correct by example — keep the baseline when adding examples. The unit tests assert it for every page.

## Status and open items

Point-in-time notes, last updated 2026-08-13.

Done:

- Full port of the three demo pages (`index`, `landing-page`, `contact-page`).
- Unit tests covering page URL resolution, escaping, optional props, navigation overrides, the accessibility baseline
  and the "no framework attribute names in the output" rule.
- **Engine decision made (2026-08-13): TSX wins.** `patterns-html` and `patterns-nunjucks` were deleted and this package
  is now the single implementation. [`COMPARISON.md`](COMPARISON.md) is kept as the decision record.
- **Renamed (2026-08-13)** from `patterns-jsx` to `examples` (`@porsche-design-system/examples`), now that there is
  nothing to disambiguate it from. The Tailwind entry was renamed with it, from `assets/patterns.css` to
  `assets/styles.css`.
- **Split into two categories (2026-08-13):** `templates/` for whole pages, `patterns/` for single sections, with their
  own lists in `_data.ts` and their own layouts (`BasePage` / `PatternPage`). The first two patterns are the `overlay`
  and `stacked` variants of `Header`. `isTemplateInput()` was renamed to `isBuildInput()` so "template" unambiguously
  means the category.
- **Links reduced to placeholders (2026-08-13):** the demo chrome links to `#`, the overview page dropped the chrome and
  became the single link list, and the per-category overview pages were removed as redundant. `Header` and `Footer` lost
  their `basePath` prop with it.
- **The header became a real PDS header (2026-08-13):** crest/wordmark, icon affordances and a `p-drilldown` behind a
  menu button, still driven by the shared `navItems`. With it came `assets/header.js` for its behaviour, `pageScript` on
  `PatternPage`, `pageScript` accepting a list, and the partial injection in `scripts/build.ts` — until then only the
  dev server injected the loader, so `dist/` never upgraded a single component.
- **Header deduplicated into blocks (2026-08-13):** both patterns had grown their own copy of the markup. `Header` is
  now a composition of `HeaderBar`, `Brand`, `MainNav`, `MetaActions`, `NoticeBar` and `CategoryTabs` in
  `_partials/header/`, the variants were renamed to `overlay`/`stacked`, and the navigation and the icon affordances
  come from `navItems` (now nestable) and `metaActionItems` in `_data.ts`. That removed the hardcoded drilldown of the
  stacked variant, the dead `Brand`/`MainNav`/`SearchForm` leftovers, the `p-divider` inside `p-tabs-bar` (which throws
  at runtime) and the raw `href="#"` literals. `BasePage` now loads `assets/header.js` for every variant, since all of
  them are a drilldown.
- **Scheme handling of the overlay header corrected (2026-08-13):** the deduplication had moved `scheme-dark` onto the
  `<header>`, which cascaded into the drilldown and opened it dark on a light page. The scheme is now passed to the
  blocks (`scheme` prop) so it reaches only the elements on the hero, with `_classes.ts` joining the optional class.

Open:

1. Consider dropping the Prettier formatting pass in favour of accepting dense output.
2. Revisit whether `_layouts`/`_partials` should become `components/`, and whether the `_` underscore rule is still the
   clearest way to mark build-time-only inputs now that only the `*.page.tsx` marker distinguishes pages.
3. Decide whether `PatternPage` should also offer a side-by-side comparison mode, so two variants can be seen at once
   without leaving the page.
4. Storefront hookup: copy `dist/` into `packages/storefront/public/` during prebuild so the demos ship with the docs.
