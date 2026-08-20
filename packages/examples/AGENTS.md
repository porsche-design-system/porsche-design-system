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

## `dist/` is source, not a website

The build does **not** emit a built site. It emits the **source of two standalone Vite projects**, one per category,
which replace the hand written `patterns` and `templates` workspaces of the
[examples repository](https://github.com/porsche-design-system/examples):

```text
dist/patterns/                 # workspace @porsche-design-system/patterns
├── package.json               # generated, dependency versions taken from this package
├── vite.config.ts             # generated: literal rollup inputs + PDS partial injection
├── public/                    # copied verbatim
└── src/                       # `root` of that Vite project
    ├── index.html             # overview of the category
    ├── main.js / style.css    # generated entry pair, one per page
    └── header/overlay/        # index.html + main.js + style.css
```

Consequences, and they are the point of the design:

- **A page's HTML contains no PDS partials, no stylesheet link and no loader script.** All three are added by the
  generated `vite.config.ts` when the project is built, exactly like in the hand written examples.
- **A page consists of three files: `index.html`, `main.js` and `style.css`.** The script **contains** the behaviour of
  the example and the stylesheet **is** the shared Tailwind entry, copied, so the markup, the utilities, the styles and
  the JavaScript of a pattern are read in one place. **A generated project has no `assets/` folder** – nothing is shared
  across its pages.
- **Opening `dist/**/index.html` in a browser shows unstyled markup.** Run `npm run build:verify`, which builds both
  generated projects into `dist-tmp/` and asserts the partials, the bundle and the stylesheet made it into the output.
- **Both projects are self contained** – `public/` is copied into each and everything shared is inlined, because the
  examples repository does not allow imports across its workspaces.

The depth of a page below its category root is identical in both trees (`src/patterns/header/overlay` and
`dist/patterns/src/header/overlay`), which is why every relative path a page uses carries over unchanged.

## Structure

```text
plugins/jsx.ts                    # renderPage() + page URL resolution + Vite plugin (dev server)
plugins/partials.ts               # PDS partials (loader, fonts, icons, chunks) – dev server only
plugins/projects.ts               # the two projects, their component chunks and the path arithmetic
plugins/entries.ts                # content of the generated main.js / style.css + the dev rewrite
scripts/build.ts                  # production build: render pages, generate entries, write both projects
scripts/generateProject.ts        # the generated vite.config.ts and package.json
scripts/buildGeneratedProject.ts  # runs `vite build` of one generated project into dist-tmp/
scripts/previewProject.ts         # that build, rewritten to the local CDN and served
scripts/verify.ts                 # builds both generated projects into dist-tmp/
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3010) + Tailwind plugin
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
tests/unit/jsx.spec.tsx           # tests describing the rendering contract
src/
├── index.page.tsx                # overview of the source tree – dev only, never emitted
├── _data.ts                      # templateItems, patternItems (URLs inside their project), chrome nav
├── _classes.ts                   # classes(): joins class names, dropping the unset optional ones
├── _ids.ts                       # the ids the dummy behaviour is wired on – markup, detection rules
│                                 # and `assets/*.js` all address the same elements through them
├── _layouts/
│   ├── BasePage.tsx              # full page shell, takes `children`
│   ├── PatternPage.tsx           # minimal shell for a single section (beforeMain / afterMain)
│   └── OverviewPage.tsx          # shell of the overview pages: a main landmark with link lists
├── _partials/                    # Head, Header, Footer, ExampleList – checked props
│   ├── header/                   # Header (variants) + the blocks it composes: HeaderBar, Brand,
│   │                             # MainNav, MetaActions, NoticeBar, CategoryTabs
│   └── feedback/                 # FeedbackForm: the flow both feedback patterns ask
├── _types/pds-jsx.d.ts           # JSX typings for the PDS web components (derived, type-only)
├── assets/styles.css             # Tailwind entry: @theme, global element defaults – copied next to every page
├── assets/header.js              # behaviour of the header drilldown – inlined into the entries, never emitted
├── assets/video.js               # behaviour of the hero video and its pause control – inlined, never emitted
├── templates/                    # → dist/templates
│   ├── index.page.tsx            # overview of that project
│   └── landing-page/             # index.page.tsx
└── patterns/                    # → dist/patterns
    ├── index.page.tsx            # overview of that project
    ├── header/overlay/           # Header in its `overlay` variant
    ├── header/stacked/           # Header in its `stacked` variant
    ├── footer/                   # Footer below the content
    ├── popover/                  # index.page.tsx + main.js each – the behaviour is per example
    │   ├── local-market-switch/  # popover open on load, becoming a p-sheet below `s`
    │   ├── priority-navigation/  # entries that no longer fit collapse into a popover
    │   └── feature-tour/         # a sequence of coachmarks, one open at a time
    └── feedback/                 # index.page.tsx + main.js each – the flow itself is a partial
        ├── inline/               # the flow in the page, confirming in place
        └── dialog/               # the same flow in a p-modal, reset once it has closed
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. **Page rule:** only
`*.page.tsx` is rendered, to `index.html` next to it; every other `.ts`/`.tsx` file is a build-time input, a `main.js`
next to a page is inlined into that page's generated entry, and all other files are copied verbatim.

## Links: only the overview navigates

The examples demonstrate chrome, they are not a website:

- Header, footer and example bodies link to `placeholderHref` (`"#"`). In-page anchors (`#features`) are real, because
  the target is on the page. Use the constant, not a bare `"#"`: Biome's `a11y/useValidAnchor` rejects the literal, and
  the constant says why the link goes nowhere.
- The overview pages are the only ones whose links go somewhere, and the only ones rendering **no** header and footer.
  Each project has one at its root; `src/index.page.tsx` adds the one of the source tree, which is the only page linking
  across categories and is therefore not emitted.
- Consequently `Header`, `Footer` and the layouts take no `basePath`: an example never links out of itself, not even
  back to the overview of its project. `ExampleList` is the only component with a `basePath`, because the overview pages
  are the only ones that navigate.

A test asserts that the overview pages contain no `href="#"` and that the chrome data contains nothing else.

## Commands

```bash
npm run start:examples      # dev server on http://localhost:3010
npm run build:examples      # writes ./dist (gitignored)
npm run test:unit:examples  # vitest

# build one generated project and serve the result against the local CDN
npm run preview:examples/patterns    # http://localhost:3011
npm run preview:examples/templates   # http://localhost:3012

# from within this package
npm run build:verify        # build + `vite build` of both generated projects into ./dist-tmp
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
- **Tailwind scans comments too.** The scanner reads whole files, so prose such as "`{% block content %}`" or "relative
  to the page" leaks `.block` and `.relative` into the compiled stylesheet. The same applies to string literals: the
  header variants are named `overlay`/`stacked` precisely because a display keyword would end up as an unused utility.
  Automatic source detection is on, rooted at the Vite project (`src/` here, `src/` of a generated project there), so
  everything below it is scanned and nothing above it is. Check the compiled CSS after larger comment edits.
- **`basePath` belongs to the overview pages only.** `ExampleList` takes it to link the examples of a project relative
  to that project's root; no layout does. Asset URLs are not built from it either — a page's `style.css` and `main.js`
  sit next to it and carry no path out of the page folder at all.
- **The shared stylesheet must stay free of relative paths.** It is copied next to every page, at every depth, so a
  `@source "../…"` or an `@import "./…"` would resolve differently in each copy. A unit test asserts it.
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
- **The ids the behaviour hooks on are a contract, kept in [`src/_ids.ts`](src/_ids.ts).** The look-up is the only
  coupling between a page and `assets/*.js`, so it is written once: the markup uses `ids.pauseButton` instead of a
  literal, [`plugins/entries.ts`](plugins/entries.ts) derives from the same constants which snippet a page needs, and
  the snippets address elements **by id only** — never by tag name or class, since they are inlined into pages they know
  nothing about. A snippet wires its ids **together**: rendering `id="pause-button"` without `id="hero-video"` fails the
  build instead of producing an example that silently does nothing. Unit tests assert all of it, including that no
  `.tsx` file writes one of those ids as a literal. **Only shared ids belong there** — the hooks of a page's own
  `main.js` (`market-popover`, `more-trigger`, …) stay literals in that page, because the registry test requires every
  registered id to be owned by exactly one snippet in `assets/`.
- **Scripts and styles are not declared, they are derived — and copied.** A page always references one entry, `main.js`,
  generated next to it by [`plugins/entries.ts`](plugins/entries.ts). It imports the page's `style.css` and then
  **contains** the behaviour of the example: the shared snippets the rendered markup asks for (`assets/header.js` when
  the page contains `id="nav-drilldown"`, `assets/video.js` when it contains `id="pause-button"`) followed by the
  `main.js` authored next to the page, each under a `// --- <source> ---` section comment. The `style.css` is
  `assets/styles.css` copied verbatim — it needs no assembling, which is why there is no `getStyleEntry()`. Nothing is
  imported from `assets/` — it is not emitted at all — so a consumer sees the markup, the Tailwind classes, the styles
  and the dummy JavaScript of a pattern without following imports. Anything used by more than one example still belongs
  in `src/assets/` (with a detection rule, for the scripts), not in one example folder — the file stays the single
  source, it is just not emitted.
- **Inlined snippets share one module scope.** `getScriptEntry()` fails the build when two of them (or a page's own
  `main.js`) declare the same top level name. Rename, or wrap the snippet in a block. In practice this is what stops a
  page from re-implementing shared behaviour: a `main.js` next to a header page cannot declare `navButton` again,
  because `assets/header.js` already did.
- **A page's `main.js` is a fragment, not an entry.** It must not `import './style.css'` and must not repeat the
  `DO NOT USE IN PRODUCTION` banner: the generated entry brings both, and in dev the file is served from the source tree
  where no `style.css` exists. A bare `import` of a real dependency is fine — `priority-navigation` imports
  `componentsReady`, because `p-link-pure` widths are only final once the components have upgraded. Unit tests assert
  the first two rules and run the build's own entry generation over every page, so a clash with an inlined snippet fails
  `test:unit` rather than only `build`.
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
- **The PDS partials are injected by the dev server and by the generated projects**, never by `scripts/build.ts`. The
  dev server uses [`plugins/partials.ts`](plugins/partials.ts); each generated `vite.config.ts` carries its own copy,
  written by [`scripts/generateProject.ts`](scripts/generateProject.ts), with the component chunks of that category.
  Without the loader script the `p-*` elements never upgrade and `:not(:defined)` keeps them invisible.

## Scope discipline (important)

TSX has no expressiveness ceiling — a page _could_ fetch data, keep state or pull in a component library. A template
engine refuses that by construction; TSX does not, so it has to be a review rule here. This is the main cost of the
approach, and it is paid on every review:

- Pages and partials are **pure, synchronous, presentational** functions. No hooks, no state, no effects, no async.
- No client-side hydration. If an example needs behaviour, ship a plain `main.js` next to the page and hook it on ids;
  the build inlines it into the generated entry.
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
  The same rewrite exists in the react/angular/vue/storefront dev servers. It is **dev only**; the generated projects
  keep the production URLs.
- **The dev server also rewrites the page entry — before Vite sees the HTML.** `main.js` and `style.css` only exist in
  the generated projects, so `rewriteEntriesForDev()` replaces that one tag with a link to `/assets/styles.css` and the
  shared scripts the page needs — as the separate modules they are authored as, where the build inlines them. Together
  with the CDN rewrite, these are the only two differences between dev and the emitted HTML. It happens in the
  middleware of [`plugins/jsx.ts`](plugins/jsx.ts), **not** in a `transformIndexHtml()` hook: Vite's own HTML hook
  resolves and warms up every `<script src>` of a page and runs ahead of the normal plugin hooks
  (`createDevHtmlTransformFn()` orders them `pre` → `devHtmlHook` → `normal` → `post`), so a page still carrying its
  entry tag makes the dev server log `Failed to load url /main.js` for a file that is never generated here. The partials
  need the opposite order and therefore stay in the hook — see [`vite.config.ts`](vite.config.ts).
- **Previewing a project builds it, it does not serve `dist/`.** `npm run preview:examples/patterns` (and `…/templates`)
  run the same `vite build` as `build:verify` via
  [`scripts/buildGeneratedProject.ts`](scripts/buildGeneratedProject.ts), rewrite the CDN origin in the emitted HTML in
  `dist-tmp/` and serve that with `vite preview`. So the name is literal: it is the built site, with bundled scripts and
  hashed assets, not the source tree and not `dist/`. `dist/` itself is never touched and keeps the production URLs. The
  ports (3011, 3012) live on the projects in [`plugins/projects.ts`](plugins/projects.ts) and are **not** part of the
  generated `vite.config.ts`.
- **`start` and `preview` mean what they mean elsewhere in the monorepo.** `npm start` is the dev server on the source,
  `preview:*` serves build output – the same split as `start` vs. `start-app` in the wrapper packages and as `preview`
  in `packages/styles`. A change that makes `preview:*` serve sources again should rename it.

## Adding a template (a whole page)

1. Create `src/templates/<name>/index.page.tsx` (plus `main.js` if it needs behaviour of its own).
2. Default-export a component that renders `<BasePage>` with `title`, `description`, `currentPage`, and optionally
   `showSearch`, `headerVariant`, `navItems`.
3. Put the markup in `children`, including the page's own `<main id="main">`. Links go to `#`, unless they point at an
   id on the same page.
4. Add an entry to `templateItems` in `src/_data.ts`, with an `href` relative to the root of the `templates` project –
   that is what links it from the overview page.
5. Style with Tailwind utilities; touch `src/assets/styles.css` only for genuinely global defaults or theme values.
6. Run `npm run build:verify` and confirm the project still builds and the CSS contains no stray utilities.

## Adding a pattern (a single section)

1. Create `src/patterns/<name>/index.page.tsx`.
2. Default-export a component that renders `<PatternPage>` with `title`, `description`, and the section itself as
   `beforeMain` (headers) or `afterMain` (footers). The page brings its own `<main id="main">` as `children`; the layout
   adds nothing around it but the page's script.
3. Reuse the existing partial and add a prop for the variation instead of copying markup — `Header` takes
   `variant="overlay" | "stacked"`, which is exactly what the two header patterns differ in.
4. Add an entry to `patternItems` in `src/_data.ts`, with an `href` relative to the root of the `patterns` project.
5. If the pattern needs behaviour of its own, put it in a plain `main.js` next to the page; the build inlines it into
   the generated entry, so it imports no stylesheet and carries no banner. Shared behaviour goes to `src/assets/*.js`
   and is inlined by its detection rule — hook it on ids from [`src/_ids.ts`](src/_ids.ts), add new ones there, and
   query them with `getElementById()`.
6. Run `npm run build:verify`; the unit tests assert the accessibility baseline for every page, patterns included.

## Accessibility baseline

Every example ships a `main` landmark, labelled `nav` elements, `aria-current="page"` on the active nav item only,
visible `:focus-visible` outlines and a `forced-colors: active` block. Templates additionally carry the `header` and
`footer` landmarks; a pattern carries the landmark of the section it demonstrates. The overview pages are each a `main`
landmark with labelled navigations. These demos are documentation, so they have to be correct by example — keep the
baseline when adding examples. The unit tests assert it for every page.

**A heading belongs to the content, not to the pattern.** Templates and the header patterns have exactly one first level
heading, because the content below the header is part of what they show. The footer pattern has none: its `main` is
empty and carries no spacing, so the footer is seen on its own instead of below a placeholder heading. The shared test
therefore asserts _at most_ one first level heading per example, and the per-pattern suites pin down which of the two a
page is — do not "fix" a missing heading by adding one back to a pattern that deliberately shows nothing above its
section.

## Status and open items

Point-in-time notes, last updated 2026-08-20.

Done:

- Full port of the demo pages, unit tests covering page URL resolution, escaping, optional props, navigation overrides,
  the accessibility baseline and the "no framework attribute names in the output" rule.
- **Engine decision made (2026-08-13): TSX wins.** `patterns-html` and `patterns-nunjucks` were deleted and this package
  is now the single implementation. [`COMPARISON.md`](COMPARISON.md) is kept as the decision record.
- **Renamed (2026-08-13)** from `patterns-jsx` to `examples` (`@porsche-design-system/examples`), now that there is
  nothing to disambiguate it from. The Tailwind entry was renamed with it, from `assets/patterns.css` to
  `assets/styles.css`.
- **Split into two categories (2026-08-13):** `templates/` for whole pages, `patterns/` for single sections, with their
  own lists in `_data.ts` and their own layouts (`BasePage` / `PatternPage`). `isTemplateInput()` was renamed to
  `isBuildInput()` so "template" unambiguously means the category.
- **Links reduced to placeholders (2026-08-13):** the demo chrome links to `#` and the overview page dropped the chrome.
- **The header became a real PDS header (2026-08-13):** crest/wordmark, icon affordances and a `p-drilldown` behind a
  menu button, driven by the shared `navItems`, with `assets/header.js` for its behaviour.
- **Header deduplicated into blocks (2026-08-13):** `Header` is a composition of `HeaderBar`, `Brand`, `MainNav`,
  `MetaActions`, `NoticeBar` and `CategoryTabs` in `_partials/header/`, with the variants named `overlay`/`stacked`.
- **Scheme handling of the overlay header corrected (2026-08-13):** the scheme is passed to the blocks (`scheme` prop)
  so it reaches only the elements on the hero and never cascades into the drilldown.
- **`dist/` became buildable source (2026-08-19).** The build emits two standalone Vite projects instead of a built
  site, so they can replace the hand written `patterns` and `templates` workspaces of the examples repository:
  - the rendered HTML lost the PDS partials, the stylesheet link and the loader script, which the generated
    `vite.config.ts` adds at build time instead;
  - each page got a generated `style.css` and `main.js` (`plugins/entries.ts`), and `pageScript` was dropped: the shared
    behaviour a page needs is derived from its markup, and `assets/video.js` was extracted along the way;
  - each project got a generated `package.json` and a category overview page, and `src/index.page.tsx` became the
    dev-only overview of the source tree;
  - `npm run build:verify` builds both generated projects into `dist-tmp/`;
  - the Tailwind CLI step disappeared, `@source` now covers `*.{tsx,html}`, and the `Footer` lost the `navItems` prop it
    never used.
- **The behaviour became part of the entry (2026-08-19).** `main.js` no longer imports `assets/header.js` and
  `assets/video.js`, it contains them, under a section comment naming their source. An example is documentation to be
  read, so the markup, the Tailwind classes and the dummy JavaScript of a pattern are now in two files instead of spread
  over four; `assets/` in a generated project holds the stylesheet only, and `getScriptEntry()` rejects two snippets
  declaring the same top level name, which one module scope cannot hold.
- **The styles became part of the page too (2026-08-20).** `style.css` no longer `@import`s `assets/styles.css`, it
  **is** that file, copied next to every page. `assets/` is therefore no longer emitted at all: a page in a generated
  project is `index.html`, `main.js` and `style.css`, nothing above it. The entry was simplified with it —
  `source(none)` and the explicit `@source` glob are gone, because Tailwind's automatic detection is rooted at the Vite
  project and covers exactly the pages (measured: two stray utilities from a doc comment in `src/_types/`, none from the
  package README). Consequences: the file carries no relative path (a unit test asserts it, since the copy lands at
  every depth), `getStyleEntry()` and `getRootRelativePath()` were dropped, and a page's CSS again contains the
  utilities of its whole project rather than only its own — about 1 kB uncompressed.
- **The dev entry rewrite moved ahead of Vite (2026-08-20).** It ran in a `transformIndexHtml()` hook, which Vite calls
  _after_ its own HTML hook has already resolved and warmed up every `<script src>` of the page — so the dev server
  logged `Failed to load url /main.js` for every page, for a file that only the generated projects have.
  `rewriteEntriesForDev()` is now applied in the middleware of [`plugins/jsx.ts`](plugins/jsx.ts), before the markup is
  handed to `server.transformIndexHtml()`; the partials stay in the hook, because they need exactly the opposite order.
  Side effect: the shared scripts and the stylesheet are now part of the module graph, so they hot-update instead of
  being fetched behind Vite's back.
- **The wiring ids became a contract (2026-08-20).** `src/_ids.ts` is the single source of the ids the dummy behaviour
  hooks on; the markup, the detection rules in `plugins/entries.ts` and `assets/*.js` now agree on them by construction.
  `assets/video.js` stopped selecting its video by tag name (`querySelector('video')` → `getElementById('hero-video')`),
  so every snippet addresses elements by id only, and `getSharedScripts()` throws when a page renders part of a
  snippet's ids — that used to be a script quietly doing nothing. Unit tests pin the rules down: id-only selectors, a
  snippet querying exactly the ids it is registered for, every registered id owned by one snippet, and no literal id
  left in a `.tsx` file.
- **Three popover patterns added (2026-08-20)**, in `patterns/popover/`, and with them the first examples carrying a
  `main.js` of their own: `local-market-switch` (open on load, becoming a `p-sheet` below `s`), `priority-navigation`
  (entries collapsing into a popover as the bar narrows) and `feature-tour` (a sequence of coachmarks). All three use
  the popover in **controlled** mode, so the page owns which disclosure is open and can mirror it onto the
  `aria-expanded` of the trigger. Notable along the way:
  - the local market switch is composed from `HeaderBar`, `MainNav` and `Brand` instead of a second copy of the bar, and
    its scheme sits on the popover **triggers** – on the wrapper it cascades into the flyouts;
  - it takes the shared `assets/header.js` and `assets/video.js` through `ids.navButton` … `ids.pauseButton` rather than
    repeating them, which the "one module scope" check enforces anyway;
  - `popover`, `sheet` and `tag` joined the preloaded chunks in [`plugins/projects.ts`](plugins/projects.ts);
  - they are the first pages with a `main.js` of their own, so the rules for it are now asserted: no stylesheet import,
    no repeated banner, and the build's entry generation is run over every page in `test:unit`.
- **Two feedback patterns added (2026-08-20)**, in `patterns/feedback/`: `inline` asks in the page and confirms in
  place, `dialog` asks the same thing in a `p-modal` opened from a button. Notable:
  - the flow is one partial, `_partials/feedback/FeedbackForm.tsx`, and the pages pass only what differs – the action
    next to the confirmation ("Give new feedback" / "Close"). It lives next to `header/` and `footer/` rather than in
    the pattern folder, because "a variant is a prop, not a copy" holds for a family of pages as much as for a header;
  - the rating scale is data, so the five items cannot drift apart, and each one names itself for assistive tech
    (`1 (very dissatisfied)`) while the label is hidden visually from `s` upwards, where the ends of the scale are
    labelled instead. The space in between is a `{'\u00a0'}`, because JSX drops whitespace between lines;
  - the flow moves focus to the confirmation heading (and back to the question when it starts over), with `aria-live`
    covering the case where focus cannot be moved – both headings are `tabindex={-1}` and carry the shared focus ring;
  - `p-modal` is used in **controlled** mode, which is what lets the dialog variant reset on `motionHiddenEnd` instead
    of snapping back while the dialog is still visible;
  - `modal`, `segmented-control` and `textarea` joined the preloaded chunks in
    [`plugins/projects.ts`](plugins/projects.ts).

Open:

1. Consider dropping the Prettier formatting pass in favour of accepting dense output.
2. Revisit whether `_layouts`/`_partials` should become `components/`, and whether the `_` underscore rule is still the
   clearest way to mark build-time-only inputs now that only the `*.page.tsx` marker distinguishes pages.
3. Decide whether `PatternPage` should also offer a side-by-side comparison mode, so two variants can be seen at once
   without leaving the page.
4. Storefront hookup: copy the built projects into `packages/storefront/public/` during prebuild so the demos ship with
   the docs.
5. Derive the preloaded component chunks per project from the rendered markup, instead of the hand kept lists in
   [`plugins/projects.ts`](plugins/projects.ts).
6. `public/` is copied into both projects in full; split it per category once the asset lists diverge.
